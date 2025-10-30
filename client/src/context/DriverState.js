import DriverContext from "./driverContext";
import { useState, useEffect  } from "react";

const DriverState=(props)=>{
  const host="http://localhost:5000"
  const driversInitial=[]

    const [drivers,setDrivers]=useState(driversInitial)

    const getDriverbyId=async (id)=>{
      const response=await fetch(`${host}/api/driver/fetchdriverbyId`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),
            'id':id
            }
      })
      const json=await response.json();
      console.log(json);
      setDrivers(json)
    }
    const getDrivers=async ()=>{
      const response=await fetch(`${host}/api/driver/fetchalldrivers`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setDrivers(json)
    }
    const addDriver=async (name,license_number,contact_number)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/driver/adddriver`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,license_number,contact_number})
      });
      const driver=await response.json();
      const normalizedData = Array.isArray(driver.savedDriver) ? driver.savedDriver : [driver.savedDriver];
      //setBuses(driver.concat(bus.savedBus));
      setDrivers(prevDrivers => [...prevDrivers, normalizedData])
      console.log(driver)
      return driver.success;
    }
    const deleteDriver= async(id)=>{
      const response=await fetch(`${host}/api/driver/deletedriver/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newDrivers=drivers.filter((driver)=>{return driver._id!==id})
      setDrivers(newDrivers)
    }
    const editDriver=async(id,name,license_number,contact_number)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/driver/updatedriver/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,license_number,contact_number})
      });
      const json=response.json();
      let newDrivers=JSON.parse(JSON.stringify(drivers));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newDrivers.length; index++) {
        const element = newDrivers[index];
        if(element._id===id)
        {
          newDrivers[index].name=name;
          newDrivers[index].license_number=license_number;
          newDrivers[index].contact_number=contact_number;
          break;
        }
      }

      let a=0
      setDrivers(newDrivers);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <DriverContext.Provider value={{drivers,addDriver,deleteDriver,editDriver,getDrivers,getDriverbyId}}>
            {props.children}
        </DriverContext.Provider>
    )
}
export default DriverState;