import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { checkEmail, checkUsername } from '../utils/sanitizer.js';

export async function login(req, res) {
    const {username, password} = req.body

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
    })


}

export async function register(req, res) {
    let { username, password, email } = req.body
    
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
            res.status(400).json({status: 'error', error: 'Error hashing the password'});
        }
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
