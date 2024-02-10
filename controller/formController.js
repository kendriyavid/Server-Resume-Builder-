const {Router} = require("express")
const user=  require('./../models/userModel')
const router = Router();
const fs = require('fs')
const Docxtemplater = require('docxtemplater')
const PizZip = require('pizzip')

const handleForm = async(req,res)=>{
    console.log(process.cwd())
    const template = fs.readFileSync('./controller/resume_001.docx')

    const zip = new PizZip(template)
    const doc =new Docxtemplater(zip)
    const Data = req.body
    doc.setData(Data)
    doc.render()
    const generatedDoc = doc.getZip().generate({type:'nodebuffer'})
    fs.writeFileSync('./newdoc.docx',generatedDoc)
}

module.exports=  {handleForm}