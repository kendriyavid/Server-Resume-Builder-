// const {Router} = require('express')
// const user= require('./../models/userModel')
// const router = Router();
// const handleLogout = async(req,res)=>{
//     console.log("inside the logout")   
    
//     const reftoken = req.cookies.jwt
//     console.log(reftoken)
//     if (!reftoken){
//         console.log("no refresh token")
//         return res.json({"message":"Logged out"})
//     }
//     try {
//         const userDB = await user.findOne({ refreshToken: reftoken });
//         if (!userDB) {
//             console.log("no User")
//             return res.json({"message":"User not found"});
//         } else {
//             console.log("Done")
//             userDB.refreshToken=""
//             userDB.save()
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json("Internal Server Error");
//     }
//     }
// module.exports={handleLogout};

const { Router } = require('express');
const user = require('./../models/userModel');
const router = Router();

const handleLogout = async (req, res) => {
    console.log("inside the logout");

    const reftoken = req.cookies.jwt;
    console.log(reftoken);

    if (!reftoken) {
        console.log("No refresh token");
        // Clear the cookie anyway if it exists, and respond with "Logged out"
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(204).json({ "message": "Logged out" }); // 204: No Content
    }

    try {
        // Find the user with the given refresh token
        const userDB = await user.findOne({ refreshToken: reftoken });
        if (!userDB) {
            console.log("User not found");
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
            return res.status(204).json({ "message": "User not found" });
        }

        // Clear the refresh token in the database
        userDB.refreshToken = "";
        await userDB.save(); // Make sure to await this

        // Clear the JWT cookie
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        console.log("User logged out successfully");

        // Send a success message
        return res.status(200).json({ "message": "Logged out successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Internal Server Error" });
    }
};

module.exports = { handleLogout };
