
import React,{useState,useContext,useEffect} from 'react'
import expencecategoryContext from '../context/expencecategoryContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditExpenceCategories = () => {
    const context=useContext(expencecategoryContext);
      const {editExpenceCategory}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const ExpenceCategory=location.state?.expencecategory || {};
        const [name, setName] = useState(ExpenceCategory.name);

  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };

  const editExpenceCategories=async (e)=>{
          e.preventDefault();
          const success= editExpenceCategory(ExpenceCategory._id,name)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Expence Category updated successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={editExpenceCategories}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" value={name} name="name" onChange={handleNameChange} />
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
      <button disabled={name.length<1} type="submit" className="btn btn-primary" >Edit Expence Category</button>
      </form>
    </div>
  )
}

export default EditExpenceCategories

 


