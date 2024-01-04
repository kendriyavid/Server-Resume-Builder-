const {Router} = require('express')
const user= require('./../models/userModel')
const router = Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const handleLogin = async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password)
    if (!email||!password){
        res.sendStatus(400).json({"message":"All fields are required"})
    }else{
        console.log(`${email},${password}`)
        const userDB = await user.findOne({email})
        if (!userDB){
            res.sendStatus(400).json({"message":"User not Found"})
        }else{
            try {
                const match = await bcrypt.compare(password,userDB.hpassword)
                if (!match){
                    res.sendStatus(400).json({"message":"Username or Password is wrong"})
                }else{
                    const accessToken = jwt.sign(
                        {"username": userDB.username},
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn:'120s'}
                    )
                    const refreshToken = jwt.sign(
                        {"username": userDB.username},
                        process.env.REFRESH_TOKEN_SECRET,
                        {expiresIn:'600s'}
                    )
                    userDB.refreshToken = refreshToken
                    const result = await userDB.save();
                    console.log(result)
                    res.cookie('jwt',refreshToken,{httpOnly:true, maxAge:10000,secure:true}).sendStatus(200);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

module.exports={handleLogin};