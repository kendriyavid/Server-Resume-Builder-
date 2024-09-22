// const {Router} = require('express')
// const user = require('./../models/userModel')
// const bcrypt = require('bcryptjs')

// const handleRegister = async(req,res)=>{
//     const {username,email,password,confirmPassword,DOB}=req.body
//     console.log("I am here")
//     console.log(req.body)
//     if (password!=confirmPassword){
//         res.status(400).send('password dont match')
//         console.log("1")
//         return
//     }else if (!email||!password||!username||!confirmPassword||!DOB){
//         res.sendStatus(400).json({"message":"All fields are required"})
//         console.log("2")
//         return
//     }else{
//         console.log("3")
//         const userDB = await user.findOne({email});
//         if (userDB){
//             console.log(userDB)
//             res.json("redirect to login")
//             return
//         }else{
//             try {
//                 console.log("here")
//                 const hpassword = await bcrypt.hash(password,10)
//                 const newUser = await user.create({username,email,hpassword,DOB})
//                 newUser.save()
//                 console.log(newUser)
//                 res.sendStatus(201)
//             } catch (error) {
//                 res.sendStatus(500).json({'message':error.message})
//             }
            
//         }
//     }
// }

// module.exports = {handleRegister};


const { Router } = require('express');
const user = require('./../models/userModel');
const bcrypt = require('bcryptjs');

const handleRegister = async (req, res) => {
    const { username, email, password, confirmPassword, DOB } = req.body;
    console.log("I am here");
    console.log(req.body);

    // Password mismatch check
    if (password !== confirmPassword) {
        console.log("1");
        return res.status(400).send('Passwords do not match');
    }

    // Missing required fields check
    if (!email || !password || !username || !confirmPassword || !DOB) {
        console.log("2");
        return res.status(400).json({ message: "All fields are required" });
    }

    console.log("3");
    const userDB = await user.findOne({ email });
    
    // If user already exists, redirect to login
    if (userDB) {
        console.log(userDB);
        return res.status(200).json("redirect to login");
    } else {
        try {
            console.log("here");
            const hpassword = await bcrypt.hash(password, 10); // Hash password
            const newUser = new user({ username, email, hpassword, DOB }); // Create new user object
            await newUser.save(); // Save user to DB
            console.log(newUser);
            return res.sendStatus(201); // User created successfully
        } catch (error) {
            return res.status(500).json({ message: error.message }); // Return server error
        }
    }
};

module.exports = { handleRegister };
