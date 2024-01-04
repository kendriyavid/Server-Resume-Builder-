const express =require('express')
const router = express.Router();
const registerController=  require('./../controller/userController')


router.post('/',registerController.handleRegister);

module.exports = router;