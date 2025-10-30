const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const ExpenceCategories = require('../../models/ExpenceCategory');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get All the Expence Categories using :GET "/api/expencecategory/fetchallexpencecategories".Login required
router.get('/fetchallexpencecategories',async (req,res)=>{
    try {
    
    const expencecategories=await ExpenceCategories.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(expencecategories)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Expence Category using :POST "/api/expencecategory/addexpencecategories".Login required
router.post('/addexpencecategories',fetchuser,[
    body('name').isLength({ min: 3 })
],async (req,res)=>{
    try {
        let success = false;
        const {name}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const expencecategories=new ExpenceCategories({
            name
        })
        const savedExpenceCategory=await expencecategories.save();
        success=true;
        res.json({success,data:savedExpenceCategory})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Expence Category using :PUT "/api/expencecategory/updateexpencecategories".Login required
router.put('/updateexpencecategories/:id',fetchuser,async (req,res)=>{
    const {name}=req.body;
    const newExpenceCategory={};
    if(name){newExpenceCategory.name=name};

    
    let expencecategories=await ExpenceCategories.findById(req.params.id);
    if(!expencecategories){return res.status(404).send("Not Found")}


    expencecategories =await ExpenceCategories.findByIdAndUpdate(req.params.id,{$set:newExpenceCategory},{new:true})
    res.json({success: true, data:expencecategories});
})
// ROUTE 4: Delete an existing Expence Category using :DELETE "/api/expencecategory/deleteexpencecategories".Login required
router.delete('/deleteexpencecategories/:id',fetchuser,async (req,res)=>{

    let expencecategories=await ExpenceCategories.findById(req.params.id);
    if(!expencecategories){return res.status(404).send("Not Found")}

    

    expencecategories =await ExpenceCategories.findByIdAndDelete(req.params.id)
    res.json({"Success":"Expence Category has been deleted.",expencecategories:expencecategories});
})
module.exports = router