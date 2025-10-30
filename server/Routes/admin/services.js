const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Services = require('../../models/Services');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallservices',async (req,res)=>{
    try {
    
    const services=await Services.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(services)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addservice',fetchuser,[
    body('service_name').isLength({ min: 3 }),
    body('service_description').isLength({ min: 3 }),
    body('availability_status').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        // const {driver_id,service_name,service_description,availability_status}=req.body;
        const {service_name,service_description,availability_status}=req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const service=new Services({
            // driver_id,service_name,service_description,availability_status
            service_name,service_description,availability_status

        })
        const savedService=await service.save();
        success=true;
        res.json({success,data:savedService})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateservice/:id',fetchuser,async (req,res)=>{
    // const {driver_id,service_name,service_description,availability_status}=req.body;
    const {service_name,service_description,availability_status}=req.body;

    const newService={};
    //if(driver_id){newService.driver_id=driver_id};
    if(service_name){newService.service_name=service_name};
    if(service_description){newService.service_description=service_description};
    newService.availability_status=availability_status;
    
    let service=await Services.findById(req.params.id);
    if(!service){return res.status(404).send("Not Found")}


    service =await Services.findByIdAndUpdate(req.params.id,{$set:newService},{new:true})
    res.json({success: true, data:service});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteservice/:id',fetchuser,async (req,res)=>{

    let service=await Services.findById(req.params.id);
    if(!service){return res.status(404).send("Not Found")}

    

    service =await Services.findByIdAndDelete(req.params.id)
    res.json({"Success":"Route has been deleted.",service:service});
})
module.exports = router