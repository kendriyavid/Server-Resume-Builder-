const {Router} = require('express')
const user= require('./../models/userModel')
const router = Router();
const handleLogout = async(req,res)=>{
    const cookies = req.cookies 
    if (!cookies?.jwt){
        res.sendStatus(204)
    }
    const refreshToken = cookies.jwt
    const userDB = await user.findOne({refreshToken}).exec()
    if (!userDB){
        res.clearCookie('jwt',{httpOnly:true})
        return res.sendStatus(204)
    }
    // del token

    userDB.refreshToken='';
    const result = await userDB.save();
    console.log("new information\n",result)
    // else{ 
    //     console.log(cookies.jwt)
    //     const refreshToken = cookie.jwt  
    //     const userDB = user.findOne({refreshToken}) 
    //     if (!userDB){
    //         res.clearCookie('jwt',{httpOnly:true})
    //         res.sendStatus(204)}
    //         } 
        
        
    }


module.exports={handleLogout};