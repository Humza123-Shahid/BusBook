import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import busContext from '../context/busContext'
import driverContext from '../context/driverContext'
import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminBuses = () => {
    const context=useContext(busContext);
    const {buses,deleteBus,getBuses}=context;
    const context2=useContext(driverContext);
    const {drivers,getDrivers}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addbus');

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
  console.log(buses)
  const filteredData = buses.filter(item =>
      item.bus_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.bus_category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,driverId,index) => {
    const dataitem=buses.find(da => da._id ==id)
    const datadriver=getDriverById(driverId);
    navigate('getbus', { state: { bus:dataitem,driver:datadriver,idx:index+1} });
     
  };
  const handleEdit = (id,driverId) => {
    const dataitem=buses.find(da => da._id ==id)
    const datadriver=getDriverById(driverId);
    navigate('editbus', { state: { bus:dataitem,driver:datadriver} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteBus(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  // const getDriverName = (id) => {
  //   const result2= getDriverbyId(id);

  // };
  
const getDriverById = (id) => drivers.find(d => d._id === id);
  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getBuses();
        const result2 = await getDrivers();
        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
      
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Bus</button>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Buses Data</h3>
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
            <th>Driver</th>
            <th>Bus Number</th>
            <th>Bus Type</th>
            <th>Bus Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const driver = getDriverById(row.driver_id);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              {/* <td>{row.driver_id}</td> */}
              {/* {getDriverName(row.driver_id)}  */}
              
              <td>{driver?.name}</td>
              <td>{row.bus_number}</td>
              <td>{row.bus_type}</td>
              <td>{row.bus_category}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,row.driver_id,index)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.driver_id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                Edit
              </button>
              <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                Delete
              </button>
              </td>
            </tr>
            )
            })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminBuses
