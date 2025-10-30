import FaqsContext from "./faqsContext";
import { useState, useEffect  } from "react";

const FaqsState=(props)=>{
  const host="http://localhost:5000"
  const faqsInitial=[]

    const [faqs,setFaqs]=useState(faqsInitial)

    const getFaqs=async ()=>{
      const response=await fetch(`${host}/api/faqs/fetchallfaqs`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setFaqs(json)
    }
    const addFaqs=async (question,answer,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/faqs/addfaqs`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({question,answer,status})
      });
      const faqs=await response.json();
      const normalizedData = Array.isArray(faqs.savedFaqs ) ? faqs.savedFaqs : [faqs.savedFaqs];
      //setBuses(buses.concat(bus.savedBus));
      setFaqs(prevFaqs => [...prevFaqs, normalizedData])
      return faqs.success;
    }
    const deleteFaqs= async(id)=>{
      const response=await fetch(`${host}/api/faqs/deletefaqs/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newFaqs=faqs.filter((faqs)=>{return faqs._id!==id})
      setFaqs(newFaqs)
    }
    const editFaqs=async(id,question,answer,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/faqs/updatefaqs/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({question,answer,status})
      });
      const json=response.json();
      let newFaqs=JSON.parse(JSON.stringify(faqs));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newFaqs.length; index++) {
        const element = newFaqs[index];
        if(element._id===id)
        {
          newFaqs[index].question=question;
          newFaqs[index].answer=answer;
          newFaqs[index].status=status;
          break;
        }
      }

      let a=0
      setFaqs(newFaqs);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <FaqsContext.Provider value={{faqs,addFaqs,deleteFaqs,editFaqs,getFaqs}}>
            {props.children}
        </FaqsContext.Provider>
    )
}
export default FaqsState;