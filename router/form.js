const express = require("express")
const router = express.Router();
const formController = require("./../controller/formController")
const verifyJWT = require('./../middleware/verifyJWT')

router.route("/")
            .post(verifyJWT,formController.handleForm)

module.exports = router;