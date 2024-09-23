const { Router } = require('express');
const user = require('./../models/userModel');
const jwt = require('jsonwebtoken');

const handleCheck = async (req, res, next) => {
    console.log("nigga here")
    const refreshToken = req.cookies.jwt; // Getting the refresh token from cookies
    console.log(refreshToken)


    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized: No token provided" }); // Unauthorized
    }

    try {
        // Verify the refresh token using the secret key
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        req.user = decoded.username; // Save the decoded username to the request

        // Find the user in the database using the username from the decoded token
        const userDB = await user.findOne({ refreshToken });
        console.log(userDB)

        if (!userDB) {
            console.log("I am here")
            return res.status(404).json({ message: "User not found" }); // User not found
        }

        // next(); // Proceed to the next middleware/route handler
        return res.status(200).json({message:"User is Present"})
    } catch (err) {
        // Handle token verification errors
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: "Forbidden: Refresh token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: "Forbidden: Invalid refresh token" });
        }
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {handleCheck};
