const {JWT_SECRET} = requires('dotenv').config();   
const jwt = require('jsonwebtoken');

const authMiddlelware = (req,res,next) => {
    const authheader = req.header.authrization;
    
    if(!authheader || !authheader.startsWith('Bearer')){
        return res.status(401).json({
            message: "Authorization header missing or invalid"
        });
    }
    const token = authheader.split(' ')[1];

    try{
        const decode = jwt.verify(token,JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({
            message: "Invalid token"
        });
    }

};

module.export = authMiddlelware;