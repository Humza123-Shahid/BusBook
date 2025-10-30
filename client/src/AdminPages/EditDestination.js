
import React,{useState,useContext} from 'react'
import { useLocation } from 'react-router-dom';
import destinationContext from '../context/destinationContext'
import InfoMessage from '../components/InfoMessage';

const EditDestination = () => {
    const context=useContext(destinationContext);
    const {editDestination}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
         const location = useLocation();
        const Destination=location.state?.destination || {};
    const [name, setName] = useState(Destination.name);
    const [selectedStatusValue, setSelectedStatusValue] = useState(Destination.status);

    const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };
  const handleStatusChange = (e) => {
    setSelectedStatusValue(e.target.value === 'true'); // <-- Get input value here
    console.log(selectedStatusValue)
  };

  const editDestinations=(e)=>{
          e.preventDefault();
            console.log(selectedStatusValue)
          const success=editDestination(Destination._id,name,selectedStatusValue)
          if(success)
          {
            setShowToast(true);
            setMsg("Destination updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editDestinations}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Enter Name:</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Status:</label>
      <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="true">Active</option>
        <option value="false">InActive</option>

      </select>
    </div>
     <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div>
      </div>
      <button disabled={name.length<1} type="submit" className="btn btn-primary" >Edit Destination</button>
      </form>
    </div>
  )
}

export default EditDestination
