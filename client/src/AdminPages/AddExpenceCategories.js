
import React,{useState,useContext,useEffect} from 'react'
import expencecategoryContext from '../context/expencecategoryContext'

import InfoMessage from '../components/InfoMessage';

const AddExpenceCategories = () => {
    const context=useContext(expencecategoryContext);
      const {addExpenceCategory}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

        const [name, setName] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value); // <-- Get input value here
  };

  const addExpenceCategories=async (e)=>{
          e.preventDefault();
          const success= await addExpenceCategory(name)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Expence Category added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addExpenceCategories}>

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
      <button disabled={name.length<1} type="submit" className="btn btn-primary" >Add Expence Category</button>
      </form>
    </div>
  )
}

export default AddExpenceCategories

 
