
import React,{useState,useEffect,useContext} from 'react'
import routeContext from '../context/routeContext'
import busContext from '../context/busContext'
import destinationContext from '../context/destinationContext'

import InfoMessage from '../components/InfoMessage';

const AddRoutes = () => {
    const context=useContext(routeContext);
    const {addRoute}=context;
    const context2=useContext(busContext);
    const {buses,getBuses}=context2;
    const context3=useContext(destinationContext);
    const {destinations,getDestinations}=context3;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [departureTime, setDepartureTime] = useState("");
    const [arrivalTime, setArrivalTime] = useState("");
    const [departureTime2, setDepartureTime2] = useState("");
    const [arrivalTime2, setArrivalTime2] = useState("");
    const [date, setDate] = useState("");
    const [date2, setDate2] = useState("");
    const [selectedStartValue, setSelectedStartValue] = useState('');
    const [selectedEndValue, setSelectedEndValue] = useState('');
    const [selectedBusValue, setSelectedBusValue] = useState('');
    const [fareAmount, setFareAmount] = useState(0);

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
    const newTime = `${event.target.value}T05:00:00`
    setDate2(newTime);
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
   
  const addRoutes=async (e)=>{
         e.preventDefault();
        //  const utcArrTime = new Date(arrivalTime2.getTime() - arrivalTime2.getTimezoneOffset() * 60000)
        //  const utcDepTime = new Date(departureTime2.getTime() - departureTime2.getTimezoneOffset() * 60000)

        //  setDepartureTime("1970-09-03T"+departureTime);
        //  setArrivalTime("1970-09-03T"+arrivalTime);
         console.log(arrivalTime2);
         console.log(date2);
          const success=await addRoute(selectedStartValue,selectedEndValue,selectedBusValue,departureTime2,arrivalTime2,date2,fareAmount)
          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Route added successfully")
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
    <form onSubmit={addRoutes}>
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
      
      <button disabled={departureTime.length<1||arrivalTime.length<1||date.length<1||selectedStartValue==''||selectedEndValue==''||selectedBusValue==''} type="submit" className="btn btn-primary">Add Route</button>
      </form>
    </div>
  )
}

export default AddRoutes
