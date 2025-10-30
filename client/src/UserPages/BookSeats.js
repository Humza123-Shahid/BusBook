import React,{useEffect, useState,useContext,useRef} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar'
import UserFooter from '../components/UserFooter'
// eslint-disable-next-line no-unused-expressions
import CustomScripts from "./CustomScripts";
//import window.bootstrap from "../lib/js/bootstrap.bundle.min.js";
//import window.bootstrap from "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js";
import "../styles/SeatingChart.css";
  import destinationContext from '../context/destinationContext'
//import { v4 as uuidv4 } from 'uuid';
import { nanoid } from "nanoid";


const BookSeats = () => {
  const context=useContext(destinationContext);
  const {destinations,destinations2,getDeparturebyId,getArrivalbyId}=context;
  const rows = 11;
  const cols = 5;
    const location = useLocation();
   const navigate = useNavigate();
   const departure=location.state?.dep1 || {};
    const arrival=location.state?.arr1 || {};
    const routedate=location.state?.routedt1 || {};
    const formattedDate = new Date(routedate).toLocaleString('en-US', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                });
    const departure_time=location.state?.dep_time || {};

    //const arrival_time=location.state?.arr_time || {};

    const fare=location.state?.route_fare || {};
    const route_id=location.state?.route_id || {};
const busNumber =location.state?.bus_number || {};
   const [departureName, setDepartureName] = useState('');
   const [arrivalName, setArrivalName] = useState('');
  const [selectedSeatsCode, setSelectedSeatsCode] = useState([]);
  const [selectedSeatsNumber, setSelectedSeatsNumber] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
const [occupiedSeatsNumber, setOccupiedSeatsNumber] = useState([]);
const [occupiedGender, setOccupiedGender] = useState([]);
const [seatInfo, setSeatInfo] = useState({});
  const modalRef = useRef(null);
  const ref=useRef(null)
  const [userInfo,setUserInfo]=useState({
    name:'',
    cnic:'',
    email:'',
    phone_number:''
  })
  const total_amount=fare * selectedSeatsNumber.length;
  const formattedDepartureTime = new Date(departure_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
  let seatCounter = 1; // seat numbers only for actual seats

  // Define seat layout: aisle at column index 2 (except last row)
  const isAisle = (row, col) => {
    if (row === rows - 1) return false; // last row has no gap
    return col === 2;
  };


  const toggleSeat = (seatNumberId,seatCodeId,gender2) => {
    console.log(seatNumberId,seatCodeId,gender2)
    if (selectedSeatsCode.includes(seatCodeId)) {
      setSelectedSeatsCode(selectedSeatsCode.filter((id) => id !== seatCodeId));
    } else {
      setSelectedSeatsCode([...selectedSeatsCode, seatCodeId]);
    }
    if (selectedSeatsNumber.includes(seatNumberId)) {
      setSelectedSeatsNumber(selectedSeatsNumber.filter((id) => id !== seatNumberId));
    } else {
      setSelectedSeatsNumber([...selectedSeatsNumber, seatNumberId]);
    }
    const index = selectedGender.findIndex(obj => obj['SeatsNumber'] === seatNumberId);

    if (index !== -1) {
      // Property value exists, remove the whole object
      selectedGender.splice(index, 1);
      //console.log(`Object with ${propertyName}: ${propertyValue} removed.`);
    } else {
      // Property value does not exist, append the new object
      const newObject = { SeatsNumber: seatNumberId, gender: gender2 }; 
      setSelectedGender(prevSelectedGender => [...prevSelectedGender, newObject]);
      //setSelectedGender.push(newObject);
      //console.log("New object appended.");
    }
  };
  const handlegendercheck = async (gender,seatid) => {
    // console.log(gender,seatid)
    // console.log(occupiedGender);
    // const index = occupiedGender.findIndex(occupied => occupied.seatnumber == seatid);
    // console.log(index);
    const letterPart = seatid.charAt(0); // or str[0] // 'S'

    // 2. Extract the number part as a string (from the second character onwards).
    const numberPartAsString = seatid.slice(1); // '15' (as a string)

    // 3. Convert the numeric string to a number.
    const numberPartAsNumber = parseInt(numberPartAsString, 10); // 15 (as a number)
    const leftseat= `S${numberPartAsNumber-1}`;
    const rightseat= `S${numberPartAsNumber+1}`;
    const leftUser = occupiedGender.find(user => user.seatnumber === leftseat);
    const rightUser = occupiedGender.find(user => user.seatnumber === rightseat);
    if(gender=='male')
    {
      if(leftUser?.gender=='female'||rightUser?.gender=='female')
      {
        alert("sorry this seat can be selected for female")
        return false;
      }
    }
    else if(gender=='female')
    {
      if(leftUser?.gender=='male'||rightUser?.gender=='male')
      {
         alert("sorry this seat can be selected for male")
         return false;
      }
    }
    toggleSeat(seatInfo.seatnumber,seatInfo.seatcode,gender);
    // if(gender!==occupiedGender[index-1]?.gender||gender!==occupiedGender[index+1]?.gender)
    // {
    //   alert("sorry this seat can be selected for "+gender)
    //   console.log("f")
    //   return false;
    // }
    // else{
    //    console.log("t")
    //   return true;
    // }
    
  }
  const setSeatingInfo = async (seatNumberId,seatCodeId) => {
    if(selectedSeatsNumber.includes(seatNumberId))
    {
      setSelectedSeatsNumber(selectedSeatsNumber.filter((id) => id !== seatNumberId));
      if (selectedSeatsCode.includes(seatCodeId)) {
       setSelectedSeatsCode(selectedSeatsCode.filter((id) => id !== seatCodeId));
      }
      const index = selectedGender.findIndex(obj => obj['SeatsNumber'] === seatNumberId);

      if (index !== -1) {
      // Property value exists, remove the whole object
        selectedGender.splice(index, 1);
      //console.log(`Object with ${propertyName}: ${propertyValue} removed.`);
      }
      return;
    }

console.log(modalRef.current)
    const newObject = { seatnumber: seatNumberId, seatcode: seatCodeId }; 
    setSeatInfo(newObject);
    // if (window.bootstrap && modalRef.current) {
    //         // Find the Modal instance associated with the element
    //         const myModal = new window.bootstrap.Modal(modalRef.current);
    //         // Call the 'show' method
    //         myModal.show();
    //         console.log("adf")
    // }
     const isOccupied2=occupiedSeatsNumber.includes(seatNumberId);
     if(!isOccupied2){
          ref.current.click();
     }
   // handleOpenModal();

  }
  
  const checkselectedseat = async (seatNumberId,seatCodeId) => {
    return false;

  }
  const getPayment = async () => {
    const name = document.getElementById('name').value;
    const cnic = document.getElementById('cnic').value;
    const email = document.getElementById('email').value;
    const phone_number = document.getElementById('phone_number').value;
     
    console.log(userInfo);
    if (selectedSeatsNumber.length<1) {
      alert("Please select seats to confirm your booking.")
    }
    else if (name.length<1 || cnic.length<1 || email.length<1 || phone_number.length<1) {
      alert("Please fill passenger info first!")
    }
    else{
      //const booking_id = Math.floor(Math.random() * 100000000) + 1; 
       //const booking_id = uuidv4();
       const booking_id = nanoid(10);
      let booking_date=new Date();
      //booking_date.setHours(0, 0, 0, 0);
      booking_date.setUTCHours(0, 0, 0, 0); 
      // const formattedBookingDate = new Date(booking_date).toLocaleString('en-US', {
      //             year: 'numeric',
      //             month: '2-digit',
      //             day: '2-digit',
      //           });
      const status="Booked";
      const discount=0;
      console.log(booking_date)
      //console.log(randomNum,nameValue,cnicValue,emailValue,phoneValue,booking_date,status:"Booked",routeId,totalFare)
      const response=await fetch("http://localhost:5000/api/bookings/addbooking",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({booking_id,name,cnic,email,phone_number,booking_date,status,route_id,discount,total_amount})
      });
      const json=await response.json()
      console.log(json);
      if(json.success)
      {
        console.log(json.data._id)
        let success=false;
        for (let i = 0; i < selectedSeatsNumber.length; i++) {
           console.log(json.data._id)
           const booking_id=json.data._id;
           const seat_number=selectedSeatsNumber[i];
           const seat_code=selectedSeatsCode[i];
           const gender=selectedGender[i]?.gender;
            const response2=await fetch("http://localhost:5000/api/seats/addseat",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body:JSON.stringify({booking_id,seat_number,seat_code,gender,fare})
          });
          const json2=await response2.json()
          console.log(json2);
          if(json2.success)
          {
            success=true;
          }

        }
        if(success)
        {
         navigate("/booksuccess", { state: {ticket_id:booking_id,bus_number:busNumber,dep_time:formattedDepartureTime,total_fare:total_amount,dep:departure,arr:arrival,routedt1:formattedDate,selectedSeats:selectedSeatsNumber,passengerInfo:userInfo} })

          //alert("booking data saved successfully");
        }
        
    }
    else{
      if(json.type=="email")
      {
        alert(json.error);
      }
      else{
        let result = "";
          for (const error of json.errors) {
          // Output: apple, banana, orange
          //combinedArray = combinedArray.concat(error.msg);
          result+=error.msg+"\n";
      }
      alert(result);
    }
      
  }
           
    }
       
    
  };

const handleChange = (e) => {
  const { name, value } = e.target;
  setUserInfo({
    ...userInfo,
    [name]: value,
  });
};
  //Please fill passenger info first!
//const context2=useContext(busContext);
  //const {buses,getBuses}=context2;
  //const [storeroutes,setStoreRoutes]=useState([]);
  //const location = useLocation();
    // const departure=location.state?.dep || {};
    // const arrival=location.state?.arr || {};
    // const routedate=location.state?.routedt || {};
    // const navigate = useNavigate();
    //  const getBusById = (id) => buses.find(d => d._id === id);
    useEffect(() => {
      //const departure_name=getDestinationbyId('68c92a1a30b534560ee6dd06');
      //const jsonObject = JSON.parse(departure_name);
      // console.log(departure)
      // const fetchData = async () => {
      //   await getDeparturebyId(departure,"departure");
      //  // setDepartureName(jsonObject.name)
      //  console.log(destinations.name)
      //  setDepartureName(destinations.name)
      // //const arrival_name=getDestinationbyId(arrival);
      // await getArrivalbyId(arrival,"arrival");
      // console.log(destinations2.name)
      // //setDepartureName(jsonObject.name)
      // setArrivalName(destinations2.name)
      // };
          
      //         fetchData();
       
          
              //fetchData();
      //console.log(Route);
    //   console.log(departure,arrival,routedate)
    //             const fetchData = async () => {
    //               const response=await fetch("http://localhost:5000/api/routes/fetchroutesbyinput",{
    //                 method:'POST',
    //                 headers:{
    //                     'Content-Type':'application/json',
    //                     'auth-token':localStorage.getItem('token')
    //                 },
    //                 body:JSON.stringify({departure,arrival,routedate})
    //               });
    //               const json=await response.json()
    //               console.log(json);
    //               setStoreRoutes(json)
    //               const result3 = await getBuses();
    //             //const result = await getQuizzes(); // Call context function
    //            // const result = await getRoutesbyinput();
    //             //setMyData(result);                     // Set state in same file
    //           };
          
    //           fetchData();
              }, []); 
    useEffect(() => {
      const loadData = async () => {
            try {
                    //const res = await axios.get(`/api/data?startDate=${startDate}&endDate=${endDate}`);
                    // Process data for Chart.js
                  //  const start_date=startDate;
                  //  const endDate=new Date();
                  //  const end_date=endDate;
                    const response=await fetch("http://localhost:5000/api/bookings/fetchbookingsbyrouteid2",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'routeID':route_id
                      },
                    });
                    const json=await response.json()
                    console.log(json.bookings);
                    const values = [];
                    const labels=[];
                    for (const book of json.bookings) {
            

                      const loadData2 = async () => {
                      const response2=await fetch("http://localhost:5000/api/seats/fetchseatsbyId",{
                      method:'GET',
                      headers:{
                          'Content-Type':'application/json',
                          'auth-token':localStorage.getItem('token'),
                          'id':book._id
                      },
                    });
                    const json2=await response2.json()
                    //console.log(json2.seat);
                    for (const seat of json2.seat) {
                      {
                        console.log(seat.seat_number);
                        setOccupiedSeatsNumber(prevOccupiedSeatsNumber =>[...prevOccupiedSeatsNumber,seat.seat_number])
                        const newObject = { seatnumber: seat.seat_number, gender: seat?.gender }; 
                        setOccupiedGender(prevOccupiedGender => [...prevOccupiedGender, newObject]);
                      }
                    //  values.push(json2.seat)
                    //  console.log(values);
                  
                  
                  }
                }
                  await loadData2();
                    // const labels1 = res.data.map(item => new Date(item.timestamp).toLocaleDateString());
                    // const values1 = res.data.map(item => item.value);
                    
                } 
              }
              catch (err) {
                    console.error(err);
                }
           }   
           loadData();
  }, []);
  useEffect(() => {
    console.log(occupiedSeatsNumber)
    }, [occupiedSeatsNumber]);
  return (
    <>
    <CustomScripts/>
    <div>
     <UserNavbar/>
    <div class="bg-banner">
      <div class="page-size">
        <p>
          Home<i class="fa-solid fa-angles-right fa-xs c-main mx-2"></i>Book Ticket
        </p>
        
        <h1>Book Ticket</h1>
      </div>
    </div>
    <div className='main-container'>
    <div className="passenger-container" style={{backgroundColor:"#ededed"}}>
      <h4 className="passenger-title">Passenger Info</h4>
      <hr/>
      <div >
        
        <div className="mb-3" style={{width:'260px'}}>
          <input type="text" className="form-control infoclass" id="name" name="name"  onChange={handleChange}   aria-describedby="emailHelp" placeholder='Name'/>
        </div>
        <div className="mb-3" style={{width:'260px'}}>
          
          <input type="text" className="form-control infoclass" id="cnic" name="cnic"  onChange={handleChange}  aria-describedby="emailHelp" placeholder='CNIC'/>
        </div>
        <div className="mb-3" style={{width:'260px'}}>

          <input type="email" className="form-control infoclass" id="email" name="email" onChange={handleChange}  aria-describedby="emailHelp" placeholder='Email'/>
        </div>
        <div className="mb-3" style={{width:'260px'}}>

          <input type="tel" className="form-control infoclass" id="phone_number" name="phone_number"   onChange={handleChange} aria-describedby="phoneHelp" placeholder='Mobile No'/>
        </div>
        </div>
      
    </div>
     <div className="chart-container" style={{backgroundColor:"#ededed"}}>
      <h4 className="chart-title">Bus Seating Chart</h4>
      <hr/>
     

      <div className="seats-grid">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="seat-row">
            {Array.from({ length: cols }).map((_, colIndex) => {
              if (isAisle(rowIndex, colIndex)) {
                return <div key={`aisle-${rowIndex}-${colIndex}`} className="aisle"></div>;
              }

              const seatNumberId = `S${seatCounter}`;
              const seatCodeId = `${rowIndex+1}_${colIndex+1}`; // use counter as seat ID
              const seatNumber = seatCounter;
              seatCounter++; // increment only if it's a real seat
              // let isOccupied=false;
              //  {occupiedSeatsNumber.map((seatnumber, index) => {
                
              //  isOccupied = seatnumber === seatNumberId
              //  if(isOccupied==true)
              //  {
              //   return null;
              //  }
              //  })}
              const isOccupied=occupiedSeatsNumber.includes(seatNumberId);
              //  console.log(seatNumberId)
              //  console.log(isOccupied);
              //const isOccupied = rowIndex === 3 && colIndex === 1; // Example

              return (
                <div>
                <div
                  key={seatNumberId}
                  className={`seat ${
                    isOccupied
                      ? "occupied"
                      : selectedSeatsNumber.includes(seatNumberId)
                      ? "selected"
                      : "available"
                  }`}
                  //{{!isOccupied && data-bs-toggle="modal"}}
                  //{...(!isOccupied && {data-bs-toggle="modal" })}
                  //  data-bs-toggle={!isOccupied && "modal"}
                  // data-bs-target={!isOccupied&&"#exampleModal"}
                  // onClick={() => !isOccupied && !checkcondition() && (toggleSeat(seatNumberId,seatCodeId))}
                  //onClick={() => !isOccupied && toggleSeat(seatNumberId,seatCodeId)}
                  onClick={() => setSeatingInfo(seatNumberId,seatCodeId)}
                >
                  {seatNumber}
                </div>
                {<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Launch demo modal
                </button>}
                {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}> */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >                   
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="bootbox-body">Select Gender</div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger bootbox-cancel" data-bs-dismiss="modal" onClick={()=>handlegendercheck("female",seatInfo.seatnumber)}>Female</button>
                          {/* <button type="button" className="btn btn-success bootbox-accept" data-bs-dismiss="modal" onClick={()=>handlegendercheck("male",seatInfo.seatnumber) && (toggleSeat(seatInfo.seatnumber,seatInfo.seatcode,'male'))}>Male</button> */}
                          <button type="button" className="btn btn-success bootbox-accept" data-bs-dismiss="modal" onClick={()=>handlegendercheck("male",seatInfo.seatnumber)}>Male</button>                        
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <hr/>
       <div className="legend">
        <div><span className="seat available"></span> Available</div>
        <div><span className="seat selected"></span> Selected</div>
        <div><span className="seat occupied"></span> Occupied</div>
      </div>
    </div>
    <div className="ticket-container" style={{backgroundColor:"#ededed"}}>
      <h4 className="ticket-title">Ticket Info</h4>
      <hr/>
      <div >
        
        <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Route:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>{departure}-{arrival}</div>

        </div>
        <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Selected Station:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>{departure}</div>

        </div>
         <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Departure Date:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>{formattedDate}</div>

        </div>
        <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Departure Time:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>{formattedDepartureTime}</div>

        </div>
         <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Seats:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>{selectedSeatsNumber.length}</div>

        </div>
        <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Ticket Fare:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}><strong>{fare}</strong>/Rs.
              <br/>  <span style={{fontSize:'11px'}}>(full price)</span></div>

        </div>
        <hr/>
         <div className="mb-3" style={{display:'flex',flexWrap:'wrap'}}>
            <div className='col-md-6'  style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}>Total Fare:</div>
            <div className='col-md-6' style={{textAlign:'start',paddingLeft:'15px',paddingRight:'15px'}}><strong>{total_amount}</strong>/Rs.</div>

        </div>
        <button style={{marginTop:'50px',width:'100%',backgroundColor:'#FF7550',color:'white'}} className="paymentbtn" onClick={() => getPayment()}>Confirm Booking</button>
        </div>
      
    </div>
    </div>
    <UserFooter/>
    </div>
    </>
  
  )
}

export default BookSeats
