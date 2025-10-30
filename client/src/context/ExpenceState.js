import ExpenceContext from "./expenceContext";
import { useState, useEffect  } from "react";

const ExpenceState=(props)=>{
  const host="http://localhost:5000"
  const expencesInitial=[]

    const [expences,setExpences]=useState(expencesInitial)

    const getExpences=async ()=>{
      const response=await fetch(`${host}/api/expences/fetchallexpences`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setExpences(json)
    }
    const addExpence=async (category_id,amount,notes)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/expences/addexpences`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({category_id,amount,notes})
      });
      const expences=await response.json();
      const normalizedData = Array.isArray(expences.savedExpence ) ? expences.savedExpence : [expences.savedExpence];
      //setBuses(buses.concat(bus.savedBus));
      setExpences(prevExpences => [...prevExpences, normalizedData])
      return expences.success;
    } 
    const deleteExpence= async(id)=>{
      const response=await fetch(`${host}/api/expences/deleteexpences/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newExpences=expences.filter((expences)=>{return expences._id!==id})
      setExpences(newExpences)
    }
    const editExpence=async(id,category_id,amount,notes)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/expences/updateexpences/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({category_id,amount,notes})
      });
      const json=response.json();
      let newExpences=JSON.parse(JSON.stringify(expences));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newExpences.length; index++) {
        const element = newExpences[index];
        if(element._id===id)
        {
          newExpences[index].category_id=category_id;
          newExpences[index].amount=amount;
          newExpences[index].notes=notes;
          break;
        }
      }

      let a=0
      setExpences(newExpences);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ExpenceContext.Provider value={{expences,addExpence,deleteExpence,editExpence,getExpences}}>
            {props.children}
        </ExpenceContext.Provider>
    )
}
export default ExpenceState;