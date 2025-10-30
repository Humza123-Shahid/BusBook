const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Faqs = require('../../models/Faqs');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallfaqs',async (req,res)=>{
    try {
    
    const faqs=await Faqs.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(faqs)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addfaqs',fetchuser,[
    body('question').isLength({ min: 1 }),
    body('answer').isLength({ min: 1 }),
    body('status').isLength({ min: 1 })
],async (req,res)=>{
    try {
        console.log("abc")
        let success = false;
        const {question,answer,status}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const faqs=new Faqs({
            question,answer,status
        })
        const savedFaqs=await faqs.save();
        success=true;
        res.json({success,data:savedFaqs})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updatefaqs/:id',fetchuser,async (req,res)=>{
    const {question,answer,status}=req.body;
    const newFaqs={};
    if(question){newFaqs.question=question};
    if(answer){newFaqs.answer=answer};
    newFaqs.status=status
    
    let faqs=await Faqs.findById(req.params.id);
    if(!faqs){return res.status(404).send("Not Found")}


    faqs =await Faqs.findByIdAndUpdate(req.params.id,{$set:newFaqs},{new:true})
    res.json({success: true, data:faqs});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deletefaqs/:id',fetchuser,async (req,res)=>{

    let faqs=await Faqs.findById(req.params.id);
    if(!faqs){return res.status(404).send("Not Found")}

    

    faqs =await Faqs.findByIdAndDelete(req.params.id)
    res.json({"Success":"Destination has been deleted.",faqs:faqs});
})
module.exports = router