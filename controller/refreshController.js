const {Router} = require('express')
const user= require('./../models/userModel')
const router = Router();
const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleRefresh = async(req,res)=>{
    console.log("yeah")
    const cookies = req.cookies 
    if (!cookies?.jwt){
        res.sendStatus(401)
    }else{ 
        console.log(cookies.jwt)
        const refreshToken = cookies.jwt  
        const userDB = await user.findOne({refreshToken}).exec()
        if (!userDB){
            res.sendStatus(403)}
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err,decoded)=>{
                if (err||userDB.username != decoded.username){
                    return res.sendStatus(403)
                }
                const accessToken = jwt.sign(
                    // 35 mins segment
                    {"username":decoded.username},
                    process.env.ACCESS_TOKEN_SECRET,
                    {expiresIn:'30s'}
                );
                res.json({accessToken})
            } 
        )
        
        
    }}


module.exports={handleRefresh};