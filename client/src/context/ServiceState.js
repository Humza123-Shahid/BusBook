import ServiceContext from "./serviceContext";
import { useState, useEffect  } from "react";

const ServiceState=(props)=>{
  const host="http://localhost:5000"
  const servicesInitial=[]

    const [services,setServices]=useState(servicesInitial)

    const getServices=async ()=>{
      const response=await fetch(`${host}/api/services/fetchallservices`,{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
            }
      })
      const json=await response.json();
      console.log(json);
      setServices(json)
    }
    // const addService=async (driver_id,service_name,service_description,availability_status)=>{
    const addService=async (service_name,service_description,availability_status)=>{

      //console.log(qword,qoption1,qoption2,qoption3,tfvalue); 
      const response=await fetch(`${host}/api/services/addservice`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        // body:JSON.stringify({driver_id,service_name,service_description,availability_status})
          body:JSON.stringify({service_name,service_description,availability_status})

      });
      const service=await response.json();
      const normalizedData = Array.isArray(service.savedService) ? service.savedService : [service.savedService];
      //setBuses(services.concat(bus.savedBus));
      setServices(prevServices => [...prevServices, normalizedData])
      return service.success;
    }
    const deleteService= async(id)=>{
      const response=await fetch(`${host}/api/services/deleteservice/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
      });
      const json=response.json();
      const newServices=services.filter((service)=>{return service._id!==id})
      setServices(newServices)
    }
    // const editService=async(id,driver_id,service_name,service_description,availability_status)=>{
      const editService=async(id,service_name,service_description,availability_status)=>{

      console.log(localStorage.getItem('token'));
      const response=await fetch(`${host}/api/services/updateservice/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
          },
        // body:JSON.stringify({driver_id,service_name,service_description,availability_status})
        body:JSON.stringify({service_name,service_description,availability_status})

      });
      const json=response.json();
      let newServices=JSON.parse(JSON.stringify(services));
      //let newOptions= options.filter(item=>item.mcqId!==id);
      //let newOptions=JSON.parse(JSON.stringify(options));
      for (let index = 0; index < newServices.length; index++) {
        const element = newServices[index];
        if(element._id===id)
        {
          //newServices[index].driver_id=driver_id;
          newServices[index].service_name=service_name;
          newServices[index].service_description=service_description;
          newServices[index].availability_status=availability_status;
          break;
        }
      }

      let a=0
      setServices(newServices);
      return json.success;
    }
    return(
        //<QuestionContext.Provider value={{state,update}}>
        <ServiceContext.Provider value={{services,addService,deleteService,editService,getServices}}>
            {props.children}
        </ServiceContext.Provider>
    )
}
export default ServiceState;