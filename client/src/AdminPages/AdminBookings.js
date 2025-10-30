import React,{useState,useContext, useRef, useEffect, startTransition} from 'react'
import '../styles/StyledTable.css';
import routeContext from '../context/routeContext'
import busContext from '../context/busContext'
import driverContext from '../context/driverContext'
import destinationContext from '../context/destinationContext'
import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
const { ObjectId } = require('bson').ObjectId;


const AdminBookings = () => {
     const context=useContext(routeContext);
      const {routes,deleteRoute,getRoutes}=context;
    const context1=useContext(busContext);
    const {buses,deleteBus,getBuses}=context1;
    const context2=useContext(driverContext);
    const {drivers,getDrivers}=context2;
     const context3=useContext(destinationContext);
      const {destinations,getDestinations}=context3;
     const [allBookings,setAllBookings]=useState([])
     const [allRoutes,setAllRoutes]=useState([])
     const [startDestination,setStartDestination]=useState([])
     const [endDestination,setEndDestination]=useState([])
    const [allDestinations,setAllDestinations]=useState([])
    const [allBuses,setAllBuses]=useState([])
    const [singleSeats, setSingleSeats] = useState([]);
    const [allSeats, setAllSeats] = useState([]);
    const [allStringSeats,setAllStringSeats]=useState([]);
    const initialized = useRef(false);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    
  const handleSearchClick = () => {
        //console.log("abc")

  };
  // useEffect(() => {
  //   const storedCount = localStorage.getItem("qcount");
  //   if (storedCount !== null) {
  //     setQcount(Number(storedCount));
  //   }
  // }, []);
  //console.log(buses)
  const getDestinationById = (id) => destinations.find(d => d._id === id);
  // const filteredData = allDestinations.filter(item =>{
  //         item.filter(element=>{
  //           element.toLowerCase().includes(searchTerm.toLowerCase()
  // )});
  //  const filteredData = allDestinations.map(innerArr => 
  //     innerArr.filter(item => 
  //       typeof item === "string" && item.toLowerCase().includes(searchTerm.toLowerCase())
  //     )
  //   )
  const matchingIndexes = new Set();

  allDestinations.forEach(inner => {
    inner.forEach((val, idx) => {
      if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
        matchingIndexes.add(idx);
      }
    });
  });

  // build new filtered arrays keeping only matching indexes
   if (Array.isArray(allDestinations)) {
  var filterOuterArray=allDestinations.map(inner =>
    inner.filter((_, idx) => matchingIndexes.has(idx))
  );
}
  const filtered1 = startDestination.filter(item =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    )
const filtered2 =endDestination.filter(item1 =>
      item1.toLowerCase().includes(searchTerm.toLowerCase())
)
  const array1 = filterOuterArray[0];
        const array2 = filterOuterArray[1];
            //const result2 = await getDrivers();
        //setMyData(result);                     // Set state in same file
       
// const filtered2 = endDestination.filter(item =>
//       item.toLowerCase().includes(searchTerm.toLowerCase()) 
//     );
// const combinedResults = [
//   ...filtered1, // Spread the results from the first filter
//   ...filtered2  // Spread the results from the second filter
// ];
  const handleView = (index) => {
    // const dataitem=buses.find(da => da._id ==id)
    // const datadriver=getDriverById(driverId);
    const formattedDepartureTime = new Date(allRoutes[index]?.departure_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
          const formattedDate = new Date(allRoutes[index]?.date).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
    const TotalFare=allRoutes[index].fare*allSeats[index].length;
    navigate('getbookings', { state: { busNumber:allBuses[index],departure:array1[index],arrival:array2[index],departureDate:formattedDate,departureTime:formattedDepartureTime,totalFare:TotalFare,totalSeats:allSeats[index],ticket_id:allBookings[index].booking_id,P_Name:allBookings[index].name,P_Cnic:allBookings[index].cnic,P_Email:allBookings[index].email,P_phoneNumber:allBookings[index].phone_number} });
     
  };
  
  
const getDriverById = (id) => drivers.find(d => d._id === id);
const getRouteById = (id) => routes.find(d => d._id == id);

  useEffect(() => {
    var abc=0;
   
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        if(abc==0){

        //console.log('12abc');
         const response=await fetch("http://localhost:5000/api/bookings/fetchallbookings",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json=await response.json()
            //console.log(json)
            setAllBookings(json);
            const result = await getRoutes();
             const result2 = await getDestinations();
            const result1 = await getBuses();
             //console.log(routes);
            //json.forEach((element) => {
              for (const element of json) {
                //console.log(element.route_id)
                 const fetchData1 = async () => {
                  //console.log('abc')
                  //console.log('id before ',element._id)
                // const response1=await fetch("http://localhost:5000/api/seats/fetchseatsbyId",{
                console.log(element._id);
                  fetch("http://localhost:5000/api/seats/fetchseatsbyId",{

                          method:'GET',
                          headers:{
                              'Content-Type':'application/json',
                              'auth-token':localStorage.getItem('token'),
                              'id':element._id
                          }
                        }).then(response => {
                            // Check if the response is OK, then parse the body as JSON
                            if (!response.ok) {
                              throw new Error('Network response was not ok');
                            }
                            return response.json(); // returns another promise
                          })
                        .then(data => {
                            // 🚀 THIS CODE RUNS ONLY AFTER the fetch is complete and JSON is parsed
                            //console.log('Fetched data:', data);
                            // //console.log(json1);
                            let singleSeats=[];
                            // json1.forEach(item => {
                            //   singleSeats.push(item.seat_number);
                            // });
                            //console.log(data);
                            if (Array.isArray(data.seat)) {
                            for (const item of data.seat) {
                              console.log(item);
                              singleSeats.push(item.seat_number);
                            }
                          }
                            //console.log('id later ',element._id)
                            //console.log(singleSeats)
                            setAllSeats(prevSeats => [...prevSeats, singleSeats]);
                                // Example: Update state in a React component
                            // setData(data); 

                            // Put your post-fetch logic here 
                            // e.g., calling another function, updating UI elements, etc.
                            //runCodeAfterFetch(data); 
                          })
                        //const json1=await response1.json()
                        // setAllBuses(prevBuses => {
                        //   return [...prevBuses,json.bus_number]});
                        //const [singleSeats, setSingleSeats] = useState([]);
                        // //console.log(json1);
                        // let singleSeats=[];
                        // // json1.forEach(item => {
                        // //   singleSeats.push(item.seat_number);
                        // // });
                        // for (const item of json1) {
                        //   singleSeats.push(item.seat_number);
                        // }
                        // //console.log('id later ',element._id)
                        // //console.log(singleSeats)
                        //  setAllSeats(prevSeats => [...prevSeats, singleSeats]);
                        
                      }
                await fetchData1();
                const routebyId=result.find(d => d._id == element.route_id);
                //const objectId = new ObjectId();
                //const objectId = new Types.ObjectId();
                //const routebyId=getRouteById(element.route_id);
                //console.log(routebyId);
                 const fetchData2 = async () => {
                const response=await fetch("http://localhost:5000/api/buses/fetchbusbyId",{
                          method:'GET',
                          headers:{
                              'Content-Type':'application/json',
                              'auth-token':localStorage.getItem('token'),
                              'id':routebyId.bus_id
                          }
                        });
                      
                        const json=await response.json()
                        setAllBuses(prevBuses => {
                          return [...prevBuses,json.bus_number]});
                      }
                await fetchData2();
               // setAllRoutes([...allRoutes,routebyId]);
                 setAllRoutes(prevRoutes => {
                  return [...prevRoutes,routebyId]
                 });
                const start_destination = getDestinationById(routebyId.start_destination_id);
                const end_destination = getDestinationById(routebyId.end_destination_id);
               //console.log(start_destination)
                //console.log(end_destination)
               console.log(startDestination.length)

                if(startDestination.length<=allBookings.length)
                {
                  setStartDestination(prevDestination => {
                  return [...prevDestination,start_destination.name]
                 });
                }
                
                setEndDestination(prevDestination => {
                  return[...prevDestination,end_destination.name]
            })
                //console.log(startDestination);
            };
          }
      };
      fetchData();
    
      
      abc=abc+1;
      }, []); //
      useEffect(() => {
        console.log(startDestination.length);
        //console.log(allBookings.length);
        //console.log(allDestinations[0].length);

       
        //    //startDestination.splice(allBookings.length); 
            //endDestination.splice(allBookings.length); 
            //startDestination.length = allBookings.length;
                   console.log(startDestination);
        console.log(endDestination);
 
        // setAllDestinations(prevDestinations => [
        //       // 1. Update the first inner array (index 0)
        //       [...prevDestinations[0], ...startDestination],

        //       // 2. Update the second inner array (index 1)
        //       [...prevDestinations[1], ...endDestination]
        //     ]);
        let nestedArray = [];
        nestedArray.push(
              // 1. Update the first inner array (index 0)
              startDestination
            );
            nestedArray.push(
              endDestination
            );
        setAllDestinations(
              // 1. Update the first inner array (index 0)
              nestedArray
            );
        //setAllDestinations(allDestinations[1].splice(11)); 
        
        
        

        ////console.log(startDestination);
        ////console.log(endDestination);
    //const arrayn=[...startDestination, ...endDestination];
     ////console.log(arrayn);
         //setAllDestinations (arrayn)

  }, [startDestination],[endDestination]); 
 
  useEffect(() => {
      // allSeats.forEach((element,index) => {
      //                     setAllStringSeats(allSeats[index].join(","))
      //                    })
      //console.log(allSeats);
  }, [allSeats]);
  return (
   <div>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Bookings Data</h3>
        <div className="me-1" style={{display: 'flex',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '20px',
      padding: '0px 15px'}}>
        <input
          type="text"
          placeholder="Search..."
          className="me-2 mt-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{border: 'none',
      outline: 'none',
      flexGrow: '1',
      padding: '5px',
      fontSize: '16px'}}
        />
        <FaSearch style={{color: '#888',marginLeft: '0px',cursor:'pointer'}} onClick={handleSearchClick}/>
        </div>
      </div>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Bus Number</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Total Fare</th>
            <th>Seats</th>
            <th>Name</th>
            <th>Cnic</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        
        {array1?.map((row,index) => {
          
          const formattedDepartureTime = new Date(allRoutes[index]?.departure_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
          const formattedDate = new Date(allRoutes[index]?.date).toLocaleString('en-US', {
             year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        // const myString=allSeats[index].join(",");
          //const myString="abc";

         //console.log(allSeats[index]);
          return(
          <tr>
            <td>{index+1}</td>
            <td>
              {allBuses[index]}
            </td>
            <td>
              {array1[index]}
            </td>
            <td>
              {array2[index]}
            </td>
            <td>
              {formattedDate}
            </td>
            <td>
              {formattedDepartureTime}
            </td>
            <td>
              {allRoutes[index]?.fare*allSeats[index].length}
            </td>
            <td>
              {allSeats[index]=== undefined?<></>:allSeats[index].join(',')}
              
            </td>
            <td>
              {allBookings[index]?.name}
            </td>
            <td>
              {allBookings[index]?.cnic}
            </td>
            <td>
              {allBookings[index]?.email}
            </td>
            <td>
              {allBookings[index]?.phone_number}
            </td>
            <td style={{width:"30%"}} >
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(index)}>
                View
              </button>
              </td>

          </tr>
          );
        })}
      
        </tbody>
      </table>
    </div>
  );
}

export default AdminBookings