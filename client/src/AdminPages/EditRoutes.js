
import React,{useState,useEffect,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import routeContext from '../context/routeContext'
import busContext from '../context/busContext'
import destinationContext from '../context/destinationContext'

import InfoMessage from '../components/InfoMessage';

const EditRoutes = () => {
    const context=useContext(routeContext);
    const {editRoute}=context;
    const context2=useContext(busContext);
    const {buses,getBuses}=context2;
    const context3=useContext(destinationContext);
    const {destinations,getDestinations}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Route=location.state?.route || {};
     const Bus=location.state?.bus || {};
    const Start=location.state?.start || {};
    const End=location.state?.end || {};
    const hours =new Date( Route.departure_time).getHours();
    const minutes = new Date(Route.departure_time).getMinutes();
    const hours2 = new Date(Route.arrival_time).getHours();
    const minutes2 = new Date(Route.arrival_time).getMinutes();
    const formattedDepartureTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const formattedArrivalTime = `${hours2.toString().padStart(2, '0')}:${minutes2.toString().padStart(2, '0')}`;
    // const day = new Date(Route.date).getDate();
    // const month = new Date(Route.date).getMonth() + 1; // getMonth() returns 0-11
    // const year = new Date(Route.date).getFullYear();
    // const formattedDate = `"${year.toString()}-${'0'+month.toString()}-${'0'+day.toString()}"`; // Example format: MM/DD/YYYY
    // console.log(formattedDate);
    const [departureTime, setDepartureTime] = useState(formattedDepartureTime);
    const [arrivalTime, setArrivalTime] = useState(formattedArrivalTime);
    const [departureTime2, setDepartureTime2] = useState("");
    const [arrivalTime2, setArrivalTime2] = useState("");
     const formatDate = (date) => {
        return date.toISOString().split("T")[0]; // keeps only YYYY-MM-DD
    };
    const [date, setDate] = useState(formatDate(new Date(Route.date)))
    const [selectedStartValue, setSelectedStartValue] = useState(Start._id);
    const [selectedEndValue, setSelectedEndValue] = useState(End._id);
    const [selectedBusValue, setSelectedBusValue] = useState(Bus._id);
    const [fareAmount, setFareAmount] = useState(Route.fare);

    const handleDepartureChange = (e) => {
    setDepartureTime(e.target.value); // <-- Get input value here
    const newTime =`1970-01-01T${e.target.value}:00`
    setDepartureTime2(newTime);
  };
  const handleArrivalChange = (e) => {
    setArrivalTime(e.target.value); // <-- Get input value here
    const newTime = `1970-01-01T${e.target.value}:00`
    setArrivalTime2(newTime);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleChangeStart = (event) => {
    setSelectedStartValue(event.target.value);
     
  };
  const handleChangeEnd = (event) => {
    setSelectedEndValue(event.target.value);
     
  };
  const handleChangeBus = (event) => {
    setSelectedBusValue(event.target.value);
     
  };
   const handleFareChange = (event) => {
    setFareAmount(event.target.value); 
  };
  const editRoutes=(e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
         console.log(arrivalTime2);
          const success=editRoute(Route._id,selectedStartValue,selectedEndValue,selectedBusValue,departureTime2,arrivalTime2,date,fareAmount)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Route updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
 useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getBuses();
            const result2 = await getDestinations();

            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editRoutes}>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Start Destination:</label>
      <select id="mySelect" className="form-control "  value={selectedStartValue} onChange={handleChangeStart}>
        <option value="">-Select-</option>
        {destinations.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select End Destination:</label>
      <select id="mySelect" className="form-control "  value={selectedEndValue} onChange={handleChangeEnd}>
        <option value="">-Select-</option>
        {destinations.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Bus:</label>
      <select id="mySelect" className="form-control "  value={selectedBusValue} onChange={handleChangeBus}>
        <option value="">-Select-</option>
        {console.log(buses)}
        {buses.map((row) => (
        <option value={row._id}>{row.bus_number}</option>
        ))}
      </select>
    </div>
    </div>
    <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="departure" className="form-label">Select Departure Time:</label>
            <input type="time" className="form-control" id="departure" value={departureTime} name="departure" onChange={handleDepartureChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="arrival" className="form-label">Arrival Time:</label>
            <input type="time" className="form-control" id="arrival" value={arrivalTime} name="arrival" onChange={handleArrivalChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="date" className="form-label">Date:</label>
      <input type="date" className="form-control" id="date" value={date} name="date" onChange={handleDateChange} />

      </div>
    </div>
    
      <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="fare" className="form-label">Fare:</label>
            <input type="number" className="form-control" id="fare" value={fareAmount} name="fare" onChange={handleFareChange} />
      </div>
       <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
    </div>
      <button disabled={departureTime.length<1||arrivalTime.length<1||date.length<1||selectedStartValue==''||selectedEndValue==''||selectedBusValue==''} type="submit" className="btn btn-primary">Edit Route</button>
      </form>
    </div>
  )
}

export default EditRoutes
