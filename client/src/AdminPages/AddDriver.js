
import React,{useState,useContext} from 'react'
import driverContext from '../context/driverContext'
import InfoMessage from '../components/InfoMessage';

const AddDriver = () => {
    const context=useContext(driverContext);
    const {addDriver}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [name, setName] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleLicenseChange = (e) => {
    setLicenseNumber(e.target.value); // <-- Get input value here
  };
  const handleContactChange = (e) => {
    setContactNumber(e.target.value); // <-- Get input value here
  };

  const addDrivers=async (e)=>{
          e.preventDefault();
          const success= await addDriver(name,licenseNumber,contactNumber)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Driver added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addDrivers}>

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
      <button disabled={name.length<1||licenseNumber.length<1||contactNumber.length<1} type="submit" className="btn btn-primary" >Add Driver</button>
      </form>
    </div>
  )
}

export default AddDriver
