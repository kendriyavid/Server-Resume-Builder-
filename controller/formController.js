const {Router} = require("express")
const user=  require('./../models/userModel')
const router = Router();
const fs = require('fs')
const Docxtemplater = require('docxtemplater')
const PizZip = require('pizzip')
let date = new Date();
const base64  = require("base-64")
// const user = require('./../models/userModel')
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
    const refreshToken =req.cookies
    const userDB=  await user.findOne({refreshToken})
    if (!userDB){
        res.sendStatus(401).json({"message":"Unauthorized"})
    }else{
        userDB.resume.fname = Data.fname
        userDB.resume.lname = Data.lname
        userDB.resume.city = Data.city
        userDB.resume.country = Data.country
        userDB.resume.pincode = Data.pincode
        userDB.resume.phone = Data.phone
        userDB.resume.aboutuser = Data.aboutuser
        userDB.resume.degree = Data.degree
        userDB.resume.email = Data.email
        userDB.resume.endDate = Data.enddate
        userDB.resume.experience = Data.experience
        userDB.resume.fos = Data.fos
        userDB.resume.gdate = Data.date
        userDB.resume.location = Data.location
        userDB.resume.organization  =Data.organization
        userDB.resume.schoolName  =Data.schoolName
        userDB.resume.sLocation = Data.slocation
        userDB.resume.startDate = Data.startdate
        userDB.resume.title = Data.title
        const result = await userDB.save()

    }
    // find the user by ref token
    // then use save
    fs.writeFileSync(`./${req.body.fname}${req.body.lname}${date.getSeconds().toString()}${date.getMilliseconds().toString()}.docx`,generatedDoc)
}

module.exports=  {handleForm}