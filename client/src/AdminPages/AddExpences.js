
import React,{useState,useContext,useEffect} from 'react'
import expenceContext from '../context/expenceContext'
import expencecategoryContext from '../context/expencecategoryContext'

import InfoMessage from '../components/InfoMessage';

const AddExpences = () => {
    const context=useContext(expenceContext);
    const {addExpence}=context;
    const context2=useContext(expencecategoryContext);
      const {expenceCategories,getExpenceCategories}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')

        const [amount, setAmount] = useState(0);
    const [notes, setNotes] = useState('');
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value); // <-- Get input value here
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value); // <-- Get input value here
  };
  const handleChangeCategory = (event) => {
    setSelectedCategoryValue(event.target.value); 
  };
  const addExpences=async (e)=>{
          e.preventDefault();
          const success= await addExpence(selectedCategoryValue,amount,notes)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Expence added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }
useEffect(() => {
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getExpenceCategories();
            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); 
  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addExpences}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="mySelect" className="form-label">Select Category Name:</label>
        <select id="mySelect" className="form-control "  value={selectedCategoryValue} onChange={handleChangeCategory}>
            <option value="">-Select-</option>
            {expenceCategories.map((row) => (
            <option value={row._id}>{row.name}</option>
            ))}
        </select>        
            </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="amount" className="form-label">Amount</label>
        <input type="number" className="form-control" id="amount" value={amount} name="amount" onChange={handleAmountChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="notes" className="form-label">Notes:</label>
        <input type="text" className="form-control" id="notes" value={notes} name="notes" onChange={handleNotesChange} />
    </div>
      </div>
      <button disabled={notes.length<1||selectedCategoryValue==''} type="submit" className="btn btn-primary" >Add Expence</button>
      </form>
    </div>
  )
}

export default AddExpences
