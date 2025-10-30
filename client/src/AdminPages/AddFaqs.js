
import React,{useState,useContext} from 'react'
import faqsContext from '../context/faqsContext'
import InfoMessage from '../components/InfoMessage';

const AddFaqs = () => {
    const context=useContext(faqsContext);
    const {addFaqs}=context;
    const [showToast,setShowToast]=useState(false)
        const [msg,setMsg]=useState('')
        const [type,setType]=useState('')
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedStatusValue, setSelectedStatusValue] = useState(true);

    const handleQuestionChange = (e) => {
    setQuestion(e.target.value); // <-- Get input value here
  };
  const handleAnswerChange = (e) => {
    setAnswer(e.target.value); // <-- Get input value here
  };

  const handleStatusChange = (e) => {
    setSelectedStatusValue(e.target.value === 'true'); // <-- Get input value here
  };

  const addFaq=(e)=>{
          e.preventDefault();
          const success=addFaqs(question,answer,selectedStatusValue)
          if(success)
          {
            setShowToast(true);
            setMsg("Faqs added successfully")
            setType("success")
            setTimeout(()=>{
              setShowToast(false)
            },1500)
          }
    }

  return (
    <div className='ms-3'>
    <InfoMessage showToast={showToast} msg={msg} type={type}/>
    <form onSubmit={addFaq}>

    <div className='mx-0' style={{display:'flex'}}>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="question" className="form-label">Enter Question:</label>
        <input type="text" className="form-control" id="question" value={question} name="question" onChange={handleQuestionChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
        <label htmlFor="answer" className="form-label">Enter Answer:</label>
        <input type="text" className="form-control" id="answer" value={answer} name="answer" onChange={handleAnswerChange} />
    </div>
    <div className="mb-3 my-3 me-3" style={{width:'100%'}}>
      
      <label htmlFor="mySelect" className="form-label">Select Status:</label>
      <select id="mySelect" className="form-control " value={selectedStatusValue} onChange={handleStatusChange}>
        <option value="true">Active</option>
        <option value="false">InActive</option>

      </select>
    </div>
     {/* <div className="mb-3 ms-3" style={{width:'100%'}}>
          <label htmlFor="abc" className="form-label" style={{display:'none'}}>abc</label>
          <input type="text" className="form-control" style={{display:'none'}} id="abc" name="abc"/>
    </div> */}
      </div>
      <button disabled={question.length<1||answer.length<1} type="submit" className="btn btn-primary" >Add Faqs</button>
      </form>
    </div>
  )
}

export default AddFaqs
