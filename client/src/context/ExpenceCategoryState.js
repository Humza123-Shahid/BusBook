import ExpenceCategoryContext from "./expencecategoryContext";
import { useState, useEffect  } from "react";

const ExpenceCategoryState=(props)=>{
  const host="http://localhost:5000"
  const expencecategoriesInitial=[]

    const [expenceCategories,setExpenceCategories]=useState(expencecategoriesInitial)

    const getExpenceCategories=async ()=>{
      const response=await fetch(`${host}/api/expencecategory/fetchallexpencecategories`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setExpenceCategories(json)
    }
    const addExpenceCategory=async (name)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/expencecategory/addexpencecategories`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name})
      });
      const expencecategories=await response.json();
      const normalizedData = Array.isArray(expencecategories.savedExpenceCategory ) ? expencecategories.savedExpenceCategory : [expencecategories.savedExpenceCategory];
      //setBuses(buses.concat(bus.savedBus));
      setExpenceCategories(prevExpenceCategories => [...prevExpenceCategories, normalizedData])
      return expencecategories.success;
    } 
    const deleteExpenceCategory= async(id)=>{
      const response=await fetch(`${host}/api/expencecategory/deleteexpencecategories/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newExpenceCategories=expenceCategories.filter((expenceCategories)=>{return expenceCategories._id!==id})
      setExpenceCategories(newExpenceCategories)
    }
    const editExpenceCategory=async(id,name)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/expencecategory/updateexpencecategories/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name})
      });
      const json=response.json();
      let newExpenceCategories=JSON.parse(JSON.stringify(expenceCategories));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newExpenceCategories.length; index++) {
        const element = newExpenceCategories[index];
        if(element._id===id)
        {
          newExpenceCategories[index].name=name;
          break;
        }
      }

      let a=0
      setExpenceCategories(newExpenceCategories);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ExpenceCategoryContext.Provider value={{expenceCategories,addExpenceCategory,deleteExpenceCategory,editExpenceCategory,getExpenceCategories}}>
            {props.children}
        </ExpenceCategoryContext.Provider>
    )
}
export default ExpenceCategoryState;