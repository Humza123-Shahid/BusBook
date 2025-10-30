const express=require('express');
const router= express.Router();
var fetchuser=require('../../middleware/fetchuser');
const Routes = require('../../models/Routes');
const { body, validationResult } = require('express-validator');

router.get('/fetchroutesbydate',fetchuser,async (req,res)=>{

    try{

      const query = {
      date: {
        $gte: req.header('start_date'),
        $lte: req.header('end_date')
      }
    };
    //   const bookingsCount = await Routes.countDocuments(query);
          const allRoutes = await Routes.find(query);
 console.log(allRoutes);
//    
         res.json({allRoutes});
    }
    catch(error){
      console.error(error.message+'error1234');
      res.status(500).send("Internal Server Error");
    }
})

// ROUTE 1: Get All the Questions using :GET "/api/questions/fetchallquestions".Login required
router.get('/fetchallroutes',fetchuser,async (req,res)=>{
    try {
    
    const routes=await Routes.find({});
    //const questions=await Questions.find({user:req.user.id});
        res.json(routes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
router.post('/fetchroutesbyinput',async (req,res)=>{
    try {
    const {departure,arrival,routedate}=req.body;
    
        //const routes=await Routes.find({});

    const routes=await Routes.find({start_destination_id:departure,end_destination_id:arrival,date:routedate});
    //const questions=await Questions.find({user:req.user.id});
        res.json(routes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 2: Add a new Question using :POST "/api/questions/addquestion".Login required
router.post('/addroute',fetchuser,[
    body('departure_time').isISO8601(),
    body('arrival_time').isISO8601(),
    body('date').isISO8601()
],async (req,res)=>{
    try {
        let success = false;
        const {start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare}=req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
        }
        const route=new Routes({
            start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare
        })
        const savedRoute=await route.save();
        success=true;
        res.json({success,data:savedRoute})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
// ROUTE 3: Update an existing Question using :PUT "/api/questions/updatequestion".Login required
router.put('/updateroute/:id',fetchuser,async (req,res)=>{
    const {start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare}=req.body;
    const newRoute={};
    if(start_destination_id){newRoute.start_destination_id=start_destination_id};
    if(end_destination_id){newRoute.end_destination_id=end_destination_id};
    if(bus_id){newRoute.bus_id=bus_id};
    if(departure_time){newRoute.departure_time=departure_time};
    if(arrival_time){newRoute.arrival_time=arrival_time};
    if(date){newRoute.date=date};
    if(fare){newRoute.fare=fare};

    
    let route=await Routes.findById(req.params.id);
    if(!route){return res.status(404).send("Not Found")}


    route =await Routes.findByIdAndUpdate(req.params.id,{$set:newRoute},{new:true})
    res.json({success: true, data:route});
})
// ROUTE 4: Delete an existing Question using :DELETE "/api/questions/deletequestion".Login required
router.delete('/deleteroute/:id',fetchuser,async (req,res)=>{

    let route=await Routes.findById(req.params.id);
    if(!route){return res.status(404).send("Not Found")}

    

    route =await Routes.findByIdAndDelete(req.params.id)
    res.json({"Success":"Route has been deleted.",route:route});
})
module.exports = router