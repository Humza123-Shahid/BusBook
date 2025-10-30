const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Seats = require('../../models/Seats');
const { body, validationResult } = require('express-validator');

router.get('/fetchseatsbyId',fetchuser,async (req,res)=>{
    try {
        console.log(req.header('id'))
    const seat=await Seats.find({booking_id:req.header('id')});
    //const questions=await Questions.find({user:req.user.id});
    console.log(seat)
        res.json({seat})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addseat',fetchuser,[
    body('seat_number').isLength({ min: 1 }),
    body('seat_code').isLength({ min: 1 })
],async (req,res)=>{
    try {
        let success = false;
        const {booking_id,seat_number,seat_code,gender,fare}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const seat=new Seats({
            booking_id,seat_number,seat_code,gender,fare
        })
        const savedSeat=await seat.save();
        success=true;
        res.json({success,data:savedSeat})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router