const {Router} = require('express')
const user = require('./../models/userModel')
const bcrypt = require('bcrypt')

const handleRegister = async(req,res)=>{
    const {username,email,password,confirmPassword,DOB}=req.body
    console.log("I am here")
    console.log(req.body)
    if (password!=confirmPassword){
        res.status(400).send('password dont match')
        console.log("1")
        return
    }else if (!email||!password||!username||!confirmPassword||!DOB){
        res.sendStatus(400).json({"message":"All fields are required"})
        console.log("2")
        return
    }else{
        console.log("3")
        const userDB = await user.findOne({email});
        if (userDB){
            console.log("4")
            res.redirect(301,"login")
            return
        }else{
            try {
                console.log("here")
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

module.exports = {handleRegister};