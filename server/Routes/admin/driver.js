const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Driver = require('../../models/Driver');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchdriverbyId',fetchuser,async (req,res)=>{
    try {
        console.log(req.header('id'))
    const drivers=await Driver.findById(req.header('id'));
    //const questions=await Questions.find({user:req.user.id});
    console.log(drivers)
        res.json(drivers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalldrivers',fetchuser,async (req,res)=>{
    try {
    
    const drivers=await Driver.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(drivers)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adddriver',fetchuser,[
    body('name').isLength({ min: 3 }),
    body('license_number').isLength({ min: 1 }),
    body('contact_number').isMobilePhone('any', { strictMode: false })
],async (req,res)=>{
    try {
        let success = false;
        const {name,license_number,contact_number}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const driver=new Driver({
            name,license_number,contact_number
        })
        const savedDriver=await driver.save();
        success=true;
        res.json({success,data:savedDriver})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatedriver/:id',fetchuser,async (req,res)=>{
    
    const {name,license_number,contact_number}=req.body;
    const newDriver={};
    if(name){newDriver.name=name};
    if(license_number){newDriver.license_number=license_number};
    if(contact_number){newDriver.contact_number=contact_number};
    
    let driver=await Driver.findById(req.params.id);
    if(!driver){return res.status(404).send("Not Found")}


    driver =await Driver.findByIdAndUpdate(req.params.id,{$set:newDriver},{new:true})
    res.json({success: true, data:driver});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletedriver/:id',fetchuser,async (req,res)=>{

    let driver=await Driver.findById(req.params.id);
    if(!driver){return res.status(404).send("Not Found")}

    

    driver =await Driver.findByIdAndDelete(req.params.id)
    res.json({"Success":"Destination has been deleted.",driver:driver});
})
module.exports = router