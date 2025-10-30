  import React,{useState,useContext, useEffect} from 'react'
  import '../styles/StyledTable.css';
  import serviceContext from '../context/serviceContext'
  import { useNavigate,useLocation} from 'react-router-dom';
  import { FaSearch } from 'react-icons/fa';
  
  const AdminServices = () => {
      const context=useContext(serviceContext);
      const {services,deleteService,getServices}=context;
      const navigate = useNavigate();
      const [searchTerm, setSearchTerm] = useState('');
      const handleClick = () => {
          navigate('addservice');
  
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
    console.log(services)
    const filteredData = services.filter(item =>
        item.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.service_description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const handleView = (id,index) => {
      const dataitem=services.find(da => da._id ==id)
      navigate('getservice', { state: { service:dataitem,idx:index} });
       
    };
    const handleEdit = (id) => {
      const dataitem=services.find(da => da._id ==id)
      navigate('editservice', { state: { service:dataitem} });
    };
    const handleDelete = (id) => {
       const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      deleteService(id);
      // Call your delete API or function here
      //console.log("Deleted item with ID:", id);
      //setQuestions(prev => prev.filter(q => q._id !== id));
    }
    };
    useEffect(() => {
          const fetchData = async () => {
          //const result = await getQuizzes(); // Call context function
          const result = await getServices();
          //setMyData(result);                     // Set state in same file
        };
    
        fetchData();
        }, []); //
    return (
     <div>
        <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Service</button>
        <div className="container d-flex justify-content-between">
          <h3 className="ms-2">Services Data</h3>
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
              {/* <th>Driver Id</th> */}
              <th>Service Name</th>
              <th>Service Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row,index) => (
              <tr key={row._id}>
                <td>{index+1}</td>
                {/* <td>{row.driver_id}</td> */}
                <td>{row.service_name}</td>
                <td>{row.service_description}</td>
                <td style={{width:"30%"}}>
                  <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                    handleView(row._id,index+1)}>
                  View
                </button>
                <button onClick={() => handleEdit(row._id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(row._id)} style={{ color:"white",backgroundColor:"red" }}>
                  Delete
                </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default AdminServices
  