const express =require('express')
const router = express.Router();
const checkController=  require('./../controller/checkController')


router.get('/',checkController.handleCheck);

module.exports = router;