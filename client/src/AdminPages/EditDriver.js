
import React,{useState,useContext} from 'react'
import driverContext from '../context/driverContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditDriver = () => {
    const context=useContext(driverContext);
    const {editDriver}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Driver=location.state?.driver || {};
    const [name, setName] = useState(Driver.name);
    const [licenseNumber, setLicenseNumber] = useState(Driver.license_number);
    const [contactNumber, setContactNumber] = useState(Driver.contact_number);

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleLicenseChange = (e) => {
    setLicenseNumber(e.target.value); // <-- Get input value here
  };
  const handleContactChange = (e) => {
    setContactNumber(e.target.value); // <-- Get input value here
  };

  const editDrivers=(e)=>{
          e.preventDefault();
          const success=editDriver(Driver._id,name,licenseNumber,contactNumber)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Driver updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editDrivers}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="license" className="form-label">License Number:</label>
        <input type="text" className="form-control" id="license" value={licenseNumber} name="license" onChange={handleLicenseChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="contact" className="form-label">Contact Number:</label>
        <input type="text" className="form-control" id="contact" value={contactNumber} name="contact" onChange={handleContactChange} />
    </div>
      </div>
      <button disabled={name.length<1||licenseNumber.length<1||contactNumber.length<1} type="submit" className="btn btn-primary" >Edit Driver</button>
      </form>
    </div>
  )
}

export default EditDriver
