  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
  import routeContext from '../context/routeContext'
  import busContext from '../context/busContext'
  import destinationContext from '../context/destinationContext'
  import { useNavigate,useLocation} from 'react-router-dom';
  import { FaSearch } from 'react-icons/fa';
  
  const AdminRoutes = () => {
      const context=useContext(routeContext);
      const {routes,deleteRoute,getRoutes}=context;
      const context2=useContext(busContext);
      const {buses,getBuses}=context2;
      const context3=useContext(destinationContext);
      const {destinations,getDestinations}=context3;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
      const handleClick = () => {
          navigate('addroute');
  
    };
    const handleSearchClick = () => {
          console.log("abc")
  
    };
    // useEffect(() => {
    //   const storedCount = localStorage.getItem("qcount");
    //   if (storedCount !== null) {
    //     setQcount(Number(storedCount));
    //   }
    // }, []);
    console.log(routes)
    const filteredData = routes.filter(item =>
        item.departure_time?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.arrival_time?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const handleView = (id,busId,startId,endId,index) => {
      const dataitem=routes.find(da => da._id ==id)
      const databus=getBusById(busId);
      const datastart=getDestinationById(startId);
      const dataend=getDestinationById(endId);
      navigate('getroute', { state: { route:dataitem,bus:databus,start:datastart,end:dataend,idx:index} });
       
    };
    const handleEdit = (id,busId,startId,endId) => {
      const dataitem=routes.find(da => da._id ==id)
      const databus=getBusById(busId);
      const datastart=getDestinationById(startId);
      const dataend=getDestinationById(endId);
      navigate('editroute', { state: { route:dataitem,bus:databus,start:datastart,end:dataend} });
    };
    const handleDelete = (id) => {
       const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteRoute(id);
      // Call your delete API or function here
      //console.log("Deleted item with ID:", id);
      //setQuestions(prev => prev.filter(q => q._id !== id));
    }
    };
    const getDestinationById = (id) => destinations.find(d => d._id === id);
    const getBusById = (id) => buses.find(d => d._id === id);

    useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          const result = await getRoutes();
          const result2 = await getDestinations();
          const result3 = await getBuses();

          //setMyData(result);                     // Set state in same file
        };
    
        fetchData();
        }, []); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Route</button>
        <div className="container d-flex justify-content-between">
          <h3 className="ms-2">Routes Data</h3>
          <div className="me-1" style={{display: 'flex',
        alignItems: 'center',
        border: '1px solid #ccc',
        borderRadius: '20px',
        padding: '0px 15px'}}>
          <input
            type="text"
            placeholder="Search..."
            className="me-2 mt-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{border: 'none',
        outline: 'none',
        flexGrow: '1',
        padding: '5px',
        fontSize: '16px'}}
          />
          <FaSearch style={{color: '#888',marginLeft: '0px',cursor:'pointer'}} onClick={handleSearchClick}/>
          </div>
        </div>
        <table  className="styled-table ms-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Start Destination</th>
              <th>End Destination</th>
              <th>Bus</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row,index) => {
              const startdestination = getDestinationById(row.start_destination_id);
              const enddestination = getDestinationById(row.end_destination_id);
              const bus = getBusById(row.bus_id);
               const formattedDepartureTime = new Date(row.departure_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
               const formattedArrivalTime = new Date(row.arrival_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
              return(
              <tr key={row._id}>
                <td>{index+1}</td>
                <td>{startdestination?.name}</td>
                <td>{enddestination?.name}</td>
                <td>{bus?.bus_number}</td>
                <td>{formattedDepartureTime}</td>
                <td>{formattedArrivalTime}</td>
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    handleView(row._id,row.bus_id,row.start_destination_id,row.end_destination_id,index+1)}>
                  View
                </button>
                <button onClick={() => handleEdit(row._id,row.bus_id,row.start_destination_id,row.end_destination_id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                  Delete
                </button>
                </td>
              </tr>)
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AdminRoutes
  