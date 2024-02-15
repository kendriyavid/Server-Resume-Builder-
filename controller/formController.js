const {Router} = require("express")
const user=  require('./../models/userModel')
const router = Router();
const fs = require('fs')
const Docxtemplater = require('docxtemplater')
const PizZip = require('pizzip')
let date = new Date();
const base64  = require("base-64")
// import userModel from "./../models/userModel";

const handleForm = async(req,res)=>{
    console.log(process.cwd())

    const template = fs.readFileSync('./controller/resume_001.docx')

    const zip = new PizZip(template)
    const doc =new Docxtemplater(zip)
    const Data = req.body
    doc.setData(Data)
    doc.render()
    const generatedDoc = doc.getZip().generate({type:'nodebuffer'})
    const gendoc_64 = generatedDoc.toString('base64')
    // console.log(gendoc_64)
    // console.log("here")
    const reftoken =req.cookies
    console.log(reftoken)
    // find the user by ref token
    // then use save
    fs.writeFileSync(`./${req.body.fname}${req.body.lname}${date.getSeconds().toString()}${date.getMilliseconds().toString()}.docx`,generatedDoc)
}

module.exports=  {handleForm}