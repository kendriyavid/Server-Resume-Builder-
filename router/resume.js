const express =require('express')
const router = express.Router();
const resumeController = require('./../controller/resumeController')

router.get('/',resumeController.handleResume);
router.get('/download/:id',resumeController.downloadResume)
router.get('/getresumeURL/:id',resumeController.getResumeUrl)


module.exports = router;