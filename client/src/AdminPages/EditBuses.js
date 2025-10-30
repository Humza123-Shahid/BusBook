
import React,{useState,useEffect,useContext} from 'react'
import busContext from '../context/busContext'
import driverContext from '../context/driverContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditBuses = () => {
    const context=useContext(busContext);
    const {editBus}=context;
    const context2=useContext(driverContext);
    const {drivers,getDrivers}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
        const location = useLocation();
    const Bus=location.state?.bus || {};
    const Driver=location.state?.driver || {};
    const [busNumber, setBusNumber] = useState(Bus.bus_number);
    const [totalSeats, setTotalSeats] = useState(Bus.total_seats);
    const [selectedBTValue, setSelectedBTValue] = useState(Bus.bus_type);
    const [selectedBCValue, setSelectedBCValue] = useState(Bus.bus_category);
    const [selectedDriverValue, setSelectedDriverValue] = useState(Driver._id);
     

    const handleNumbersChange = (e) => {
    setBusNumber(e.target.value); // <-- Get input value here
  };
  const handleSeatsChange = (e) => {
    setTotalSeats(e.target.value); // <-- Get input value here
  };
  const handleChangeBT = (event) => {
    setSelectedBTValue(event.target.value);
  };
   const handleChangeBC = (event) => {
    setSelectedBCValue(event.target.value);
     
  };
   const handleChangeDriver = (event) => {
    setSelectedDriverValue(event.target.value);
     
  };
  const editBuses=()=>{
          const success=editBus(Bus._id,selectedDriverValue,busNumber,selectedBTValue,selectedBCValue,totalSeats)
          if(success)
          {
            setShowToast(true);
            setMsg("Bus updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
 useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getDrivers();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <div className='mx-0' style={{display:'flex'}}>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Driver:</label>
      <select id="mySelect" className="form-control " value={selectedDriverValue} onChange={handleChangeDriver}>
        <option value="">-Select-</option>
        {drivers.map((row) => (
        <option value={row._id}>{row.name}</option>
        ))}
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Bus Type:</label>
      <select id="mySelect" className="form-control "  value={selectedBTValue} onChange={handleChangeBT}>
        <option value="Seater">Seater</option>
        <option value="Sleeper">Sleeper</option>
        <option value="Semi-Sleeper">Semi-Sleeper</option>
        <option value="A/C / Non-A/C">A/C / Non-A/C</option>
        <option value="Mini-Bus">Mini-Bus</option>
        <option value="Double-Decker">Double-Decker</option>
      </select>
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
          <label htmlFor="bus_cat" className="form-label">Bus Category:</label>
          {/* <input type="text" className="form-control" id="user" name="user" onChange={onChange}  aria-describedby="emailHelp"/> */}
          <select id="mySelect" className="form-control "  name="bus_cat" value={selectedBCValue} onChange={handleChangeBC}>
            <option value="Economy / Standard">Economy / Standard</option>
            <option value="Deluxe / Executive">Deluxe / Executive</option>
             <option value="VIP / Luxury">VIP / Luxury</option>
            <option value="Shuttle Service">Shuttle Service</option>
          </select>
        </div>
      
      </div>
      
      <div className='mx-0' style={{display:'flex'}}>
        <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="quiz" className="form-label">Enter Bus Number:</label>
            <input type="text" className="form-control" id="quiz" value={busNumber} name="quiz" onChange={handleNumbersChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="quiz" className="form-label">Total Seats:</label>
            <input type="number" className="form-control" id="quiz" value={totalSeats} name="quiz" onChange={handleSeatsChange} />
      </div>
       <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
        </div>
      </div>
      <button disabled={busNumber.length<1|| totalSeats.length<1||selectedDriverValue==''} type="submit" className="btn btn-primary" onClick={() => {editBuses()}}>Edit Bus</button>
    
    </div>
  )
}

export default EditBuses
