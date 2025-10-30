const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Bookings = require('../../models/Bookings');
const { body, validationResult } = require('express-validator');

router.get('/fetchbookingsbyrouteid',fetchuser,async (req,res)=>{

    try{
      
      const bookingsCount = await Bookings.countDocuments({ 
            route_id: req.header('routeID')
    });
         res.json({bookingsCount});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchbookingsbyrouteid2',fetchuser,async (req,res)=>{

    try{
      
      const bookings= await Bookings.find({ 
            route_id: req.header('routeID')
    });
         res.json({bookings});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
router.get('/fetchbookingpaymentsbydatefilter',fetchuser,async (req,res)=>{

    try{
    const start_date=req.header('startDate');
    const end_date=req.header('endDate');
    const targetstartDate = new Date(req.header('startDate')); // YYYY-MM-DD
     const targetendDate = new Date(req.header('endDate'));
    const start = new Date(targetstartDate.setHours(0, 0, 0, 0));
    const end = new Date(targetendDate.setHours(23, 59, 59, 999));
    const result = await Bookings.aggregate([
            // STAGE 1: Filter the documents (where condition is satisfied)
            {
                $match: {
                booking_date: { $gte: start, $lte: end } // The condition: Only process documents where status is 'in stock'
                }
            },
            // STAGE 2: Group the filtered documents and calculate the sum
            {
                $group: {
                    _id: null, // Group all matched documents into a single result group
                    totalAmount: { 
                        $sum: "$total_amount" // $sum operator calculates the total of the 'price' field
                    }
                }
            }
        ]);
         
        // result[0].totalPrice;
        const totalPayment =result[0]?.totalAmount || 0
         
    // const orders = await Bookings.find({ booking_date: req.header('booking_date')});
    // const total = orders.reduce((sum, order) => sum + order.total_amount, 0)
         res.json({totalPayment});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})
router.get('/fetchbookingsbydate',fetchuser,async (req,res)=>{

    try{
    //   const count = await Bookings
    //   .distinct("_id", { booking_date: req.header('booking_date') }) // condition here
    //   .then(bookings => bookings.length);
      // const userId=req.user.id;
      // const user=await User.findById(userId).select("-password")
      // res.send(user);
      
      const bookingsCount = await Bookings.countDocuments({ 
            booking_date: req.header('booking_date')
    });
   const bookingDate=req.header('booking_date');
   const targetDate = new Date(req.header('booking_date')); // YYYY-MM-DD
const start = new Date(targetDate.setHours(0, 0, 0, 0));
const end = new Date(targetDate.setHours(23, 59, 59, 999));
    const result = await Bookings.aggregate([
            // STAGE 1: Filter the documents (where condition is satisfied)
            {
                $match: {
                booking_date: { $gte: start, $lte: end } // The condition: Only process documents where status is 'in stock'
                }
            },
            // STAGE 2: Group the filtered documents and calculate the sum
            {
                $group: {
                    _id: null, // Group all matched documents into a single result group
                    totalAmount: { 
                        $sum: "$total_amount" // $sum operator calculates the total of the 'price' field
                    }
                }
            }
        ]);
         
        // result[0].totalPrice;
        const totalSum =result[0]?.totalAmount || 0
         
    // const orders = await Bookings.find({ booking_date: req.header('booking_date')});
    // const total = orders.reduce((sum, order) => sum + order.total_amount, 0)
         res.json({bookingsCount,totalSum});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})

router.get('/fetchbookingpaymentsbymonth',fetchuser,async (req,res)=>{

    try{
    const start_date=req.header('startDate');
    const end_date=req.header('endDate');
    const start_date2=new Date(start_date);
    const end_date2=new Date(end_date);
   //const targetDate = new Date(req.header('booking_date')); // YYYY-MM-DD
    const start = new Date(start_date2.setHours(0, 0, 0, 0));
    const end = new Date(end_date2.setHours(23, 59, 59, 999));
    const result = await Bookings.aggregate([
            // STAGE 1: Filter the documents (where condition is satisfied)
            {
                $match: {
                booking_date: { $gte: start, $lte: end } // The condition: Only process documents where status is 'in stock'
                }
            },
            // STAGE 2: Group the filtered documents and calculate the sum
            {
                $group: {
                    _id: null, // Group all matched documents into a single result group
                    totalAmount: { 
                        $sum: "$total_amount" // $sum operator calculates the total of the 'price' field
                    }
                }
            }
        ]);
         
        // result[0].totalPrice;
        const totalPayment =result[0]?.totalAmount || 0
         
    // const orders = await Bookings.find({ booking_date: req.header('booking_date')});
    // const total = orders.reduce((sum, order) => sum + order.total_amount, 0)
         res.json({totalPayment});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
})


router.get('/fetchallbookings',fetchuser,async (req,res)=>{
    try {
    
    const book=await Bookings.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(book)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addbooking',fetchuser,[
    body('name').isLength({ min: 3 }).withMessage("Enter a valid name"),
    body('cnic').isLength({ min: 3 }),
    body('email').isEmail(),
    body('phone_number').isMobilePhone('any', { strictMode: false }).withMessage("Enter a valid phone Number")
],async (req,res)=>{
    try {
        let success = false;
        const {booking_id,name,cnic,email,phone_number,booking_date,status,route_id,discount,total_amount}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array()});
        }
        let user=await Bookings.findOne({email:email})
        if(user){
                return res.status(400).json({success,type:'email',error:"Sorry a user with this email already exists"})
        }
        const book=new Bookings({
            booking_id,name,cnic,email,phone_number,booking_date,status,route_id,discount,total_amount
        })
        const savedBook=await book.save();
        console.log(savedBook);
        success=true;
        res.json({success,data:savedBook})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router