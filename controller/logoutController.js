const {Router} = require('express')
const user= require('./../models/userModel')
const router = Router();
const handleLogout = async(req,res)=>{
    console.log("inside the logout")   
    
    const reftoken = req.cookies.jwt
    console.log(reftoken)
    if (!reftoken){
        console.log("no refresh token")
        return res.json({"message":"Logged out"})
    }
    try {
        const userDB = await user.findOne({ refreshToken: reftoken });
        if (!userDB) {
            console.log("no User")
            return res.json({"message":"User not found"});
        } else {
            console.log("Done")
            userDB.refreshToken=""
            userDB.save()
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
    }
module.exports={handleLogout};