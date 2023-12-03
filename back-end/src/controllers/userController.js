import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { checkEmail, checkUsername } from '../utils/sanitizer.js';
import { sendEmail } from '../utils/email.js'
import crypto from 'crypto';

const requestCallbacks = {};

export async function login(req, res) {
    const {username, password} = req.body;

    if(!username || typeof(username) !== 'string' || !password || typeof(password) !== 'string')
        return res.status(422).json({status: 'error', error: 'Missing username or password field'});
    
    // Check the username before querying the DB, so if the username is invalid we don't have to access the database
    if(!checkUsername(username)) 
        return res.status(401).json({status: 'error', error: 'Invalid username or password'});

    let user = null;

    try {
        user = await User.findOne(
            { 'username': {
                $regex: `^${username}$`,
                $options: "i"
            }}
        ).exec();
    } catch {
        return res.status(400).json({status: 'error', error: 'Error connecting to the database'});
    }
    
    if(user === null) return res.status(401).json({status: 'error', error: 'Invalid username or password'});

    bcrypt.compare(password, user.passwordCrypt, (err, response) => {
        if(err) return res.status(400).json({status: 'error', error: 'Error checking password'});
        if(!response) return res.status(401).json({status: 'error', error: 'Invalid username or password'});
        
        const token = 'Bearer ' + jwt.sign({
            userId: user._id,
            username: user.username,
            privilege: user.privilege
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).header('Authorization', token).json({
            'status': 'ok'
        });
    });
}

export async function register(req, res) {
    let { username, password, email } = req.body;
    
    if(!username || typeof(username) !== 'string' || !password || typeof(password) !== 'string' || !email || typeof(email) !== 'string')
        return res.status(422).json({status: 'error', error: 'Missing username, password or email field'});

    email = email.toLowerCase();

    if(!checkEmail(email))
        return res.status(400).json({status: 'error', error: 'Invalid email format'});

    if(!checkUsername(username))
        return res.status(400).json({status: 'error', error: 'Invalid username. It must contain only letters, numbers and underscore, and must have a max size of 30 characters'});

    User.findOne({
        $or: [
            { 'username': {
                $regex: `^${username}$`,
                $options: "i"
            }},
            { 'email': email }
        ]
    }).then(async (user) => {
        if(user !== null)
            return res.status(400).json({status: 'error', error: `${user.email === email ? 'Email' : 'Username'} already registered`});

        const code = crypto.randomBytes(64).toString('hex');
        const link = `${process.env.FRONTEND_CONFIRM_EMAIL_URL}?code=${code}`;

        sendEmail({
            to: email,
            subject: 'Confirmação de Cadastro',
            html: `<b>Se você não solicitou um cadastro na livraria Acervo Digital, ignore este email.<b>
            <br>
            <b>Clique neste link para confirmar seu cadastro: </b> <a href="${link}">${link}</a>`
        });

        requestCallbacks[code] = async (req, res) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                
                User.create({
                    username,
                    email,
                    passwordCrypt: hash
                }).then(() => res.status(200).json({
                    status: 'ok'
                })).catch(() => res.status(400).json({status: 'error', error: 'Error storing the user'}));
    
            } catch {
                return res.status(400).json({status: 'error', error: 'Error hashing the password'});
            }
            requestCallbacks[code] = undefined;
        }

        // Code will expires in 10 minutes
        setTimeout(() => requestCallbacks[code] = undefined, 60000 * 10);
        return res.status(200).json({status: 'ok', message: 'Confirm your email'});
    });
}

export function getSelfProfile(req, res) {
    User.findById(req.userId)
        .then((user) => {
            if(user === null) return res.status(400).json({status: 'error', error: 'User does not exist'});
            return res.status(200).json({status: 'ok', user: {
                'email': user.email,
                'username': user.username,
                'privilege': user.privilege
            }});
        })
        .catch(() => res.status(400).json({status: 'error', error: 'Error loading the user'}));
}

export function get(req, res) {
    const { username, email, id } = req.query;

    if(!username && !email && !id) 
        return res.status(422).json({status: 'error', error: 'Missing username, email or id field'});


    const query = [];
    if(username) {
        query.push({ 'username': {
            $regex: `^${username}$`,
            $options: "i"
        }});
    }

    if(email)
        query.push({ 'email': email.toLowerCase() });

    if(id)
        query.push({ '_id': id });

    User.findOne({
        $and: query
    })
    .then((user) => {
        if(user === null) return res.status(400).json({status: 'error', error: 'User does not exist'});
        return res.status(200).json({status: 'ok', user: {
            'email': user.email,
            'username': user.username,
            'privilege': user.privilege,
            'id': user._id
        }});
    })
    .catch(() => res.status(400).json({status: 'error', error: 'Error loading the user'}));
}

export async function requestChangeEmail(req, res) {
    let user = null;

    try {
        user = await User.findById(req.userId).exec();
    } catch {
        return res.status(400).json({status: 'error', error: 'Error connecting to the database'});
    }

    let code = crypto.randomBytes(64).toString('hex');
    let link = `${process.env.FRONTEND_CHANGE_EMAIL_URL}?code=${code}`;
    const userId = user._id;

    sendEmail({
        to: user.email,
        subject: 'Requisição de alteração de endereço de email',
        html: `<b>Se você não solicitou uma alteração de endereço de email, ignore este email.<b>
        <br>
        <b>Clique neste link para alterar seu endereço de email: </b> <a href="${link}">${link}</a>`
    });
    requestCallbacks[code] = async (req, res) => {
        let { email } = req.body;

        if(!email || typeof(email) !== 'string')
            return res.status(422).json({status: 'error', error: 'Missing field email'});
        
        email = email.toLocaleLowerCase();
        
        if(!checkEmail(email))
            return res.status(400).json({status: 'error', error: 'Invalid email format'});


        requestCallbacks[code] = undefined;

        code = crypto.randomBytes(64).toString('hex');
        link = `${process.env.FRONTEND_CONFIRM_EMAIL_URL}?code=${code}`;
        sendEmail({
            to: email,
            subject: 'Confirmação de Email',
            html: `<b>Se você não solicitou uma alteração para este endereço de email, ignore este email.<b>
            <br>
            <b>Clique neste link para alterar seu endereço de email: </b> <a href="${link}">${link}</a>`
        });
        // Code will expires in 10 minutes
        setTimeout(() => requestCallbacks[code] = undefined, 60000 * 10);

        requestCallbacks[code] = async (req, res) => {
            try {
                user = await User.findById(userId).exec();
            } catch {
                return res.status(400).json({status: 'error', error: 'Error connecting to the database'});
            }
    
            if(user === null)
                return res.status(400).json({status: 'error', error: 'Error finding user'});
    
            try {
                user.email = email;
                await user.save();
            } catch {
                return res.status(400).json({status: 'error', error: 'Error hashing or saving the password'});
            }
            
            requestCallbacks[code] = undefined;
            return res.status(200).json({status: 'ok'});
        }
        
        return res.status(200).json({ status: 'ok' });
    }

    // Code will expires in 10 minutes
    setTimeout(() => requestCallbacks[code] = undefined, 60000 * 10);

    if(user === null) return res.status(400).json({status: 'error', error: 'User not found'});
    return res.status(200).json({status: 'ok'})
}

export async function requestChangePassword(req, res) {
    let email = req.body.email;

    if((!email || typeof(email) !== 'string')) 
        return res.status(422).json({status: 'error', error: 'Missing field email'});

    email = email.toLocaleLowerCase();

    if(!checkEmail(email))
        return res.status(400).json({status: 'error', error: 'Invalid email format'});

    let user = null;

    try {
        user = await User.findOne({
            email
        }).exec();
    } catch {
        return res.status(400).json({status: 'error', error: 'Error connecting to the database'});
    }

    if(user !== null) {
        const code = crypto.randomBytes(64).toString('hex');
        const link = `${process.env.FRONTEND_CHANGE_PASSWORD_URL}?code=${code}`;
        const userId = user._id;
        sendEmail({
            to: email,
            subject: 'Requisição de alteração de senha',
            html: `<b>Se você não solicitou uma alteração de senha, ignore este email.<b>
            <br>
            <b>Clique neste link para alterar sua senha: </b> <a href="${link}">${link}</a>`
        });
        requestCallbacks[code] = async (req, res) => {
            const { password } = req.body;

            if(!password || typeof(password) !== 'string')
                return res.status(422).json({status: 'error', error: 'Missing field password'});
            
            let user = null;
            try {
                user = await User.findById(userId).exec();
            } catch(e) {
                return res.status(400).json({status: 'error', error: 'Error connecting to the database'});
            }

            if(user === null)
                return res.status(400).json({status: 'error', error: 'Error finding user'});

            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                user.passwordCrypt = hash;
                await user.save();
            } catch {
                return res.status(400).json({status: 'error', error: 'Error hashing or saving the password'});
            }

            requestCallbacks[code] = undefined;
            return res.status(200).json({ status: 'ok' });
        }

        // Code will expires in 10 minutes
        setTimeout(() => requestCallbacks[code] = undefined, 60000 * 10);
    }

    return res.status(200).json({status: 'ok', error: 'If there is an user with this email address, we have sent an confirmation request'});
}

export async function requestCodeExists(req, res) {
    const { code } = req.query;
    if(!code || typeof(code) !== 'string') 
        return res.status(422).send({status: 'error', error: 'Missing field code'});

    return res.status(200).send({status: 'ok', response: requestCallbacks[code] !== undefined});
}

export async function confirmRequest(req, res) {
    const { code } = req.body;
    if(!code || typeof(code) !== 'string') 
        return res.status(422).send({status: 'error', error: 'Missing field code'});
    
    if(requestCallbacks[code] === undefined) 
        return res.status(400).send({status: 'error', error: 'Code is invalid or expired'});
    return requestCallbacks[code](req, res);
}
