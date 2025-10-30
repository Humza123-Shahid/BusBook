const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Destination = require('../../models/Destination');
const { body, validationResult } = require('express-validator');

router.get('/fetchdestinationbyId',fetchuser,async (req,res)=>{
    try {
        console.log(req.header('id'))
    const destination=await Destination.findById(req.header('id'));
    //const questions=await Questions.find({user:req.user.id});
    console.log(destination)
        res.json(destination)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchalldestinations',async (req,res)=>{
    try {
    
    const destinations=await Destination.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(destinations)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/adddestination',fetchuser,[
    body('name').isLength({ min: 1 }),
    body('status').isLength({ min: 1 })
],async (req,res)=>{
    try {
        console.log("abc")
        let success = false;
        const {name,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const destination=new Destination({
            name,status
        })
        const savedDestination=await destination.save();
        success=true;
        res.json({success,data:savedDestination})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatedestination/:id',fetchuser,async (req,res)=>{
    const {name,status}=req.body;
    const newDestination={};
    if(name){newDestination.name=name};
    newDestination.status=status
    
    let destination=await Destination.findById(req.params.id);
    if(!destination){return res.status(404).send("Not Found")}


    destination =await Destination.findByIdAndUpdate(req.params.id,{$set:newDestination},{new:true})
    res.json({success: true, data:destination});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletedestination/:id',fetchuser,async (req,res)=>{

    let destination=await Destination.findById(req.params.id);
    if(!destination){return res.status(404).send("Not Found")}

    

    destination =await Destination.findByIdAndDelete(req.params.id)
    res.json({"Success":"Destination has been deleted.",destination:destination});
})
module.exports = router