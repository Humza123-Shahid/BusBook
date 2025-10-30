const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Expences = require('../../models/Expences');
const { body, validationResult } = require('express-validator');

router.get('/fetchexpencesbydatefilter',fetchuser,async (req,res)=>{

    try{
    const start_date=req.header('startDate');
    const end_date=req.header('endDate');
    const targetstartDate = new Date(req.header('startDate')); // YYYY-MM-DD
     const targetendDate = new Date(req.header('endDate'));
    const start = new Date(targetstartDate.setHours(0, 0, 0, 0));
    const end = new Date(targetendDate.setHours(23, 59, 59, 999));
    const result = await Expences.aggregate([
            // STAGE 1: Filter the documents (where condition is satisfied)
            {
                $match: {
                date: { $gte: start, $lte: end } // The condition: Only process documents where status is 'in stock'
                }
            },
            // STAGE 2: Group the filtered documents and calculate the sum
            {
                $group: {
                    _id: null, // Group all matched documents into a single result group
                    totalAmount: { 
                        $sum: "$amount" // $sum operator calculates the total of the 'price' field
                    }
                }
            }
        ]);
         
        // result[0].totalPrice;
        const totalExpences =result[0]?.totalAmount || 0
         
    // const orders = await Bookings.find({ booking_date: req.header('booking_date')});
    // const total = orders.reduce((sum, order) => sum + order.total_amount, 0)
         res.json({totalExpences});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
// ROUTE 1: Get All the Expences using :GET "/api/expences/fetchallexpences".Login required
router.get('/fetchallexpences',async (req,res)=>{
    try {
    
    const expences=await Expences.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(expences)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Expence using :POST "/api/expences/addexpences".Login required
router.post('/addexpences',fetchuser,[
    body('notes').isLength({ min: 3 })
],async (req,res)=>{
    try {
        
        let success = false;
        const {category_id,amount,notes}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const expences=new Expences({
            category_id,amount,notes
        })
        const savedExpence=await expences.save();
        success=true;
        res.json({success,data:savedExpence})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Expence using :PUT "/api/expences/updateexpences".Login required
router.put('/updateexpences/:id',fetchuser,async (req,res)=>{
    const {categroy_id,amount,notes}=req.body;
    const newExpence={};
    if(categroy_id){newExpence.categroy_id=categroy_id};
    if(amount){newExpence.amount=amount};
    if(notes){newExpence.notes=notes};

    
    let expences=await Expences.findById(req.params.id);
    if(!expences){return res.status(404).send("Not Found")}


    expences =await Expences.findByIdAndUpdate(req.params.id,{$set:newExpence},{new:true})
    res.json({success: true, data:expences});
})
// ROUTE 4: Delete an existing Expence using :DELETE "/api/expences/deleteexpences".Login required
router.delete('/deleteexpences/:id',fetchuser,async (req,res)=>{

    let expences=await Expences.findById(req.params.id);
    if(!expences){return res.status(404).send("Not Found")}

    

    expences =await Expences.findByIdAndDelete(req.params.id)
    res.json({"Success":"Expence has been deleted.",expences:expences});
})
module.exports = router