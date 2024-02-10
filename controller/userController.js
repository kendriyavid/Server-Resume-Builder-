const {Router} = require('express')
const user = require('./../models/userModel')
const bcrypt = require('bcrypt')

const handleRegister = async(req,res)=>{
    const {username,email,password,confirmPassword,DOB}=req.body
    console.log("I am here")
    if (password!=confirmPassword){
        res.status(400).send('password dont match')
    }else if (!email||!password||!username||!confirmPassword||!DOB){
        res.sendStatus(400).json({"message":"All fields are required"})
    }else{
        const userDB = await user.findOne({email});
        if (userDB){
            res.redirect(301,"login")
        }else{
            try {
                const hpassword = await bcrypt.hash(password,10)
                const newUser = await user.create({username,email,hpassword,DOB})
                newUser.save()
                console.log(newUser)
                res.sendStatus(201)
            } catch (error) {
                res.sendStatus(500).json({'message':error.message})
            }
            
        }
    }
}

// const handleRegister = async (req, res) => {
//     const { username, email, password, confirmPassword, DOB } = req.body;
//     console.log("I am here");
//     if (password !== confirmPassword) {
//         res.status(400).send('passwords don\'t match');
//     } else if (!email || !password || !username || !confirmPassword || !DOB) {
//         res.status(400).json({ "message": "All fields are required" });
//     } else {
//         const userDB = await user.findOne({ email });
//         if (userDB) {
//             res.redirect(301, "login");
//         } else {
//             try {
//                 const hpassword = await bcrypt.hash(password, 10);
//                 const newUser = await user.create({ username, email, hpassword, DOB });
//                 newUser.save();
//                 console.log(newUser);
//                 res.sendStatus(201);
//             } catch (error) {
//                 res.status(500).json({ 'message': error.message });
//             }
//         }
//     }
// };



module.exports = {handleRegister};