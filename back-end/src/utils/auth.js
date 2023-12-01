import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export function isAuthenticatedAsAdmin(req, res, next) {
    const fullToken = req.headers.authorization;
    if(!fullToken || !fullToken.startsWith('Bearer ') || fullToken.length === 7) 
        return res.status(403).json({status: 'error', error: 'Invalid token format'});

    const jwtToken = fullToken.slice(7, fullToken.length);
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, result) => {
        if (err)
            return res.status(403).json({status: 'error', error: 'Invalid or expired token'});
        

        if(result.privilege !== 'admin')
            return res.status(403).json({status: 'error', error: 'Forbidden access'});

        // We have to check if the user still has admin rights, otherwise invalidate the token
        User.exists({
            _id: result.userId,
            privilege: 'admin'
        }).then((user) => {
            if(!user) return res.status(403).json({status: 'error', error: 'This token is no longer valid'});
            req.userId = result.userId;
            req.username = result.username;
            req.privilege = 'admin';
            next();
        }).catch(err => res.status(400).json({status: 'error', error: 'Error accessing database'}))
    });
}

export function isAuthenticated(req, res, next) {
    const fullToken = req.headers.authorization;
    if(!fullToken || !fullToken.startsWith('Bearer ') || fullToken.length === 7) 
        return res.status(403).json({status: 'error', error: 'Invalid token format'});

    const jwtToken = fullToken.slice(7, fullToken.length);
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, result) => {
        if (err)
            return res.status(403).json({status: 'error', error: 'Invalid or expired token'});
        
        req.userId = result.userId;
        req.username = result.username;
        req.privilege = result.privilege;
        return next();
    });
}