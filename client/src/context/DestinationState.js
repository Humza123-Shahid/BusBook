import DestinationContext from "./destinationContext";
import { useState, useEffect  } from "react";

const DestinationState=(props)=>{
  const host="http://localhost:5000"
  const destinationsInitial=[]

    const [destinations,setDestinations]=useState(destinationsInitial)
     const [destinations2,setDestinations2]=useState(destinationsInitial)

     const getDestinationbyId=async (id)=>{
      const response=await fetch(`${host}/api/destination/fetchdestinationbyId`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),
            'id':id
            }
      })
      const json=await response.json();
      console.log(json);
      //return json.name;
      //setDestinations(json)
     return json;
      //return json;
    }
     const getDeparturebyId=async (id)=>{
      const response=await fetch(`${host}/api/destination/fetchdestinationbyId`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),
            'id':id
            }
      })
      const json=await response.json();
      console.log(json);
      //return json.name;
      //setDestinations(json)
     return json;
      //return json;
    }
    const getArrivalbyId=async (id,dest)=>{
      const response=await fetch(`${host}/api/destination/fetchdestinationbyId`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token'),
            'id':id
            }
      })
      const json=await response.json();
      console.log(json);
      
        setDestinations2(json)
      //return json;
    }
    const getDestinations=async ()=>{
      const response=await fetch(`${host}/api/destination/fetchalldestinations`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setDestinations(json)
    }
    const addDestination=async (name,status)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/destination/adddestination`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({name,status})
      });
      const destination=await response.json();
      const normalizedData = Array.isArray(destination.savedDestination ) ? destination.savedDestination : [destination.savedDestination];
      //setBuses(buses.concat(bus.savedBus));
      setDestinations(prevDestinations => [...prevDestinations, normalizedData])
      return destination.success;
    }
    const deleteDestination= async(id)=>{
      const response=await fetch(`${host}/api/destination/deletedestination/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newDestinations=destinations.filter((destination)=>{return destination._id!==id})
      setDestinations(newDestinations)
    }
    const editDestination=async(id,name,status)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/destination/updatedestination/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({name,status})
      });
      const json=response.json();
      let newDestinations=JSON.parse(JSON.stringify(destinations));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newDestinations.length; index++) {
        const element = newDestinations[index];
        if(element._id===id)
        {
          newDestinations[index].name=name;
          newDestinations[index].status=status;
          break;
        }
      }

      let a=0
      setDestinations(newDestinations);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <DestinationContext.Provider value={{destinations,destinations2,addDestination,deleteDestination,editDestination,getDestinations,getDestinationbyId,getDeparturebyId,getArrivalbyId}}>
            {props.children}
        </DestinationContext.Provider>
    )
}
export default  DestinationState;