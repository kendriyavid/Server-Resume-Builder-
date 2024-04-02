const {Router} = require('express')
const user = require('./../models/userModel')
const path = require('path')

const handleResume= async(req,res)=>{
    const reftoken = req.cookies.jwt
    console.log(reftoken)
    try {
        const userDB = await user.findOne({ refreshToken: reftoken });
        if (!userDB) {
            return res.json({"message":"User not found"});
        } else {
            const resdata = userDB.resume.genresume;
            return res.send(resdata);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
    }

const downloadResume = async(req,res)=>{
    console.log("yo here")
    const filepath = req.query.filepath
    const reftoken = req.cookies.jwt
    try{
        const userDB = await user.findOne({refreshToken:reftoken})
        if (!userDB){
            return res.sendStatus(400).json('user not found')
        }else{
            res.setHeader('Content-Disposition', `attachment; filename="${path.basename(filepath)}"`);
            res.setHeader('Content-Type', 'application/octet-stream');
            return res.download(filepath, (error) => {
                if (error) {
                    console.error("Error downloading file:", error);
                    return res.status(500).json("Internal Server Error");
                }
        })
    }} catch (error) {
        console.error("Error:", error);
        return res.status(500).json("Internal Server Error");
    }
}

const getResumeUrl = async (req, res) => {
    console.log(req.params)
    const { id } = req.params;
    console.log(id) // Assuming the id parameter is provided in the URL
    try {
        // Construct the URL using the provided id
        const resdata = `http://localhost:3000/googlefile/${id}`; // Replace "your-domain.com" with your actual domain
        return res.json({ "url": resdata }); // Return the URL
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}

module.exports = {handleResume, downloadResume, getResumeUrl}