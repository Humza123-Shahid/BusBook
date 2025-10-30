import BusContext from "./busContext";
import { useState, useEffect  } from "react";

const BusState=(props)=>{
  const host="http://localhost:5000"
  const busesInitial=[]

    const [buses,setBuses]=useState(busesInitial)

    const getBuses=async ()=>{
      const response=await fetch(`${host}/api/buses/fetchallbuses`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setBuses(json)
    }
    const addBus=async (driver_id,bus_number,bus_type,bus_category,total_seats)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/buses/addbus`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({driver_id,bus_number,bus_type,bus_category,total_seats})
      });
      const bus=await response.json();
      const normalizedData = Array.isArray(bus.savedBus) ? bus.savedBus : [bus.savedBus];
      //setBuses(buses.concat(bus.savedBus));
      setBuses(prevBuses => [...prevBuses, normalizedData])
      return bus.success;
    }
    const deleteBus= async(id)=>{
      const response=await fetch(`${host}/api/buses/deletebuses/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newBuses=buses.filter((bus)=>{return bus._id!==id})
      setBuses(newBuses)
    }
    const editBus=async(id,driver_id,bus_number,bus_type,bus_category,total_seats)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/buses/updatebus/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({driver_id,bus_number,bus_type,bus_category,total_seats})
      });
      const json=response.json();
      let newBuses=JSON.parse(JSON.stringify(buses));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newBuses.length; index++) {
        const element = newBuses[index];
        if(element._id===id)
        {
          newBuses[index].driver_id=driver_id;
          newBuses[index].bus_number=bus_number;
          newBuses[index].bus_type=bus_type;
          newBuses[index].bus_category=bus_category;
          newBuses[index].total_seats=total_seats;
          break;
        }
      }

      let a=0
      setBuses(newBuses);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <BusContext.Provider value={{buses,addBus,deleteBus,editBus,getBuses}}>
            {props.children}
        </BusContext.Provider>
    )
}
export default BusState;