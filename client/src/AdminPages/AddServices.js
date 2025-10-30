
import React,{useState,useContext} from 'react'
import serviceContext from '../context/serviceContext'
import InfoMessage from '../components/InfoMessage';

const AddServices = () => {
    const context=useContext(serviceContext);
    const {addService}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [serviceName, setServiceName] = useState('');
    const [serviceDesc, setServiceDesc] = useState('');
    const [selectedASValue, setSelectedASValue] = useState(true);

    const handleNameChange = (e) => {
    setServiceName(e.target.value); // <-- Get input value here
  };
  const handleDescChange = (e) => {
    setServiceDesc(e.target.value); // <-- Get input value here
  };
  const handleChangeAS = (event) => {
    setSelectedASValue(event.target.value === 'true');
  };
   
  const addServices=(e)=>{
         e.preventDefault();
          // const success=addService("652c785718a3a0e6b5e0c5f8",serviceName,serviceDesc,selectedASValue)
          const success=addService(serviceName,serviceDesc,selectedASValue)

          console.log(success)
          if(success)
          {
            console.log("abc");
            setShowToast(true);
            setMsg("Service added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addServices}>
    <div className='mx-0' style={{display:'flex'}}>

      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="name" className="form-label">Enter Service Name:</label>
            <input type="text" className="form-control" id="name" value={serviceName} name="name" onChange={handleNameChange} />
      </div>
       <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
            <label htmlFor="desc" className="form-label">Enter Service Description:</label>
            <input type="text" className="form-control" id="desc" value={serviceDesc} name="desc" onChange={handleDescChange} />
      </div>
      <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      <label htmlFor="mySelect" className="form-label">Select Availability Status:</label>
       <select id="mySelect" className="form-control " value={selectedASValue} onChange={handleChangeAS}>
        <option value="true">Active</option>
        <option value="false">InActive</option>
      </select>
      {/* <select id="mySelect" className="form-control " value={selectedASValue} onChange={handleChangeAS}>
        <option value="Available">Available</option>
        <option value="Booked">Booked</option>
        <option value="Sold Out">Sold Out</option>
        <option value="Cancelled">Cancelled</option>
      </select> */}
      </div>
    </div>
    
      
      <button disabled={serviceName.length<1|| serviceDesc.length<1} type="submit" className="btn btn-primary">Add Service</button>
      </form>
    </div>
  )
}

export default AddServices
