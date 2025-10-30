
import React,{useState,useContext,useEffect} from 'react'
import expenceContext from '../context/expenceContext'
import expencecategoryContext from '../context/expencecategoryContext'
import { useLocation } from 'react-router-dom';
import InfoMessage from '../components/InfoMessage';

const EditExpences = () => {
    const context=useContext(expenceContext);
    const {editExpence}=context;
    const context2=useContext(expencecategoryContext);
      const {expenceCategories,getExpenceCategories}=context2;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const location = useLocation();
    const Expence=location.state?.expence || {};
    const Category=location.state?.category || {};
    const [amount, setAmount] = useState(Expence.amount);
    const [notes, setNotes] = useState(Expence.notes);
    const [selectedCategoryValue, setSelectedCategoryValue] = useState(Category._id);

  const handleAmountChange = (e) => {
    setAmount(e.target.value); // <-- Get input value here
  };
  const handleNotesChange = (e) => {
    setNotes(e.target.value); // <-- Get input value here
  };
  const handleChangeCategory = (event) => {
    setSelectedCategoryValue(event.target.value); 
  };
  const editExpences=async (e)=>{
          e.preventDefault();
          const success= editExpence(Expence._id,selectedCategoryValue,amount,notes)
          console.log(success);
          if(success)
          {
            setShowToast(true);
            setMsg("Expence updated successfully")
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
    <form onSubmit={editExpences}>

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
      <button disabled={notes.length<1||selectedCategoryValue==''} type="submit" className="btn btn-primary" >Edit Expence</button>
      </form>
    </div>
  )
}

export default EditExpences
