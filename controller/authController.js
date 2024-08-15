const {Router} = require('express')
const user= require('./../models/userModel')
const router = Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const handleLogin = async(req,res)=>{
    console.log("yeah") 
    console.log(req.body)
    const {email,password} = req.body;
    if (!email||!password){
        res.sendStatus(400).json({"message":"All fields are required"})
        return
    }else{
        console.log(`${email},${password}`)
        const userDB = await user.findOne({email})
        if (!userDB){
            res.json({"message":"User not Found"})
        }else{
            try { 
                const match = await bcrypt.compare(password,userDB.hpassword)
                if (!match){
                    res.sendStatus(400).json({"message":"Username or Password is wrong"})
                }else{
                    const accessToken = jwt.sign(
                        {"username": userDB.username},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn:'1d'}
                    )
                    const refreshToken = jwt.sign(
                        {"username": userDB.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn:'1d'}
                    )
                    userDB.refreshToken = refreshToken
                    const result = await userDB.save();
                    console.log(result) 
                    //saving the access token
                    res.cookie('jwt',refreshToken,{httpOnly:false, maxAge:24 * 60 * 60 * 1000,secure:false});
                    res.json({accessToken})
                    
                    console.log(accessToken)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports={handleLogin};