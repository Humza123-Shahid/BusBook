import RouteContext from "./routeContext";
import { useState, useEffect  } from "react";

const RouteState=(props)=>{
  const host="http://localhost:5000"
  const routesInitial=[]

    const [routes,setRoutes]=useState(routesInitial)

    const getRoutes=async ()=>{
      const response=await fetch(`${host}/api/routes/fetchallroutes`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
            }
      })
      const json=await response.json();
      console.log(json);
      setRoutes(json)
      return json;
    }
    const addRoute=async (start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare)=>{
      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/routes/addroute`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body:JSON.stringify({start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare})
      });
      const route=await response.json();
      const normalizedData = Array.isArray(route.savedRoute) ? route.savedRoute : [route.savedRoute];
      //setBuses(routes.concat(bus.savedBus));
      console.log(route)
      setRoutes(prevRoutes => [...prevRoutes, normalizedData])
      return route.success;
    }
    const deleteRoute= async(id)=>{
      const response=await fetch(`${host}/api/routes/deleteroute/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newRoutes=routes.filter((route)=>{return route._id!==id})
      setRoutes(newRoutes)
    }
    const editRoute=async(id,start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare)=>{
      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/routes/updateroute/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        body:JSON.stringify({start_destination_id,end_destination_id,bus_id,departure_time,arrival_time,date,fare})
      });
      const json=response.json();
      let newRoutes=JSON.parse(JSON.stringify(routes));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newRoutes.length; index++) {
        const element = newRoutes[index];
        if(element._id===id)
        {
          newRoutes[index].start_destination_id=start_destination_id;
          newRoutes[index].end_destination_id=end_destination_id;
          newRoutes[index].bus_id=bus_id;
          newRoutes[index].departure_time=departure_time;
          newRoutes[index].arrival_time=arrival_time;
          newRoutes[index].date=date;
          newRoutes[index].fare=fare;
          break;
        }
      }

      let a=0
      setRoutes(newRoutes);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <RouteContext.Provider value={{routes,addRoute,deleteRoute,editRoute,getRoutes}}>
            {props.children}
        </RouteContext.Provider>
    )
}
export default RouteState;