const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Contacts = require('../../models/Contacts');
const { body, validationResult } = require('express-validator');

router.get('/fetchallcontacts',fetchuser,async (req,res)=>{
    try {
    
    const contact=await Contacts.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(contact)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addcontact',fetchuser,[
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('details').isLength({ min: 3 })
],async (req,res)=>{
    let success=false;
        //If there are errors,return Bad request and the errors
     const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
        }
        //Check whether the user with this email exists already
        try{
    
        contact=await Contacts.create({
          
          name: req.body.name,
          
          email: req.body.email,
          details: req.body.details,
        })
  
        success=true;  
        console.log(success)
        //res.json(user) 
        res.json({success}) 
        }
        catch(error){
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }   
})
module.exports = router