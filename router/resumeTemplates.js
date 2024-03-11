const express =require('express')
const router = express.Router();
const ResumeTempController=  require('./../controller/ResumeTempController')


router.get('/',ResumeTempController.handleTemplates);
router.post('/',ResumeTempController.handleTemplatesaddition);

module.exports = router;