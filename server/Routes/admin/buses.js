const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Buses = require('../../models/Buses');
const { body, validationResult } = require('express-validator');

router.get('/fetchbusbyId',fetchuser,async (req,res)=>{
    try {
        console.log(req.header('id'))
    const bus=await Buses.findById(req.header('id'));
    //const questions=await Questions.find({user:req.user.id});
    console.log(bus)
        res.json(bus)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallbuses',async (req,res)=>{
    try {
    
    const buses=await Buses.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(buses)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addbus',fetchuser,[
    body('bus_number').isLength({ min: 1 }),
    body('bus_type').isLength({ min: 3 }),
    body('total_seats').isLength({ min: 1 }),
    body('bus_category').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {driver_id,bus_number,bus_type,bus_category,total_seats}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const bus=new Buses({
            driver_id,bus_number,bus_type,bus_category,total_seats
        })
        const savedBus=await bus.save();
        success=true;
        res.json({success,data:savedBus})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatebus/:id',fetchuser,async (req,res)=>{
    const {driver_id,bus_number,bus_type,bus_category,total_seats}=req.body;
    const newBus={};
    if(driver_id){newBus.driver_id=driver_id};
    if(bus_number){newBus.bus_number=bus_number};
    if(bus_type){newBus.bus_type=bus_type};
    if(bus_category){newBus.bus_category=bus_category};
    if(total_seats){newBus.total_seats=total_seats};
    
    let bus=await Buses.findById(req.params.id);
    if(!bus){return res.status(404).send("Not Found")}


    bus =await Buses.findByIdAndUpdate(req.params.id,{$set:newBus},{new:true})
    res.json({success: true, data:bus});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletebuses/:id',fetchuser,async (req,res)=>{

    let bus=await Buses.findById(req.params.id);
    if(!bus){return res.status(404).send("Not Found")}

    

    bus =await Buses.findByIdAndDelete(req.params.id)
    res.json({"Success":"Bus has been deleted.",bus:bus});
})
module.exports = router