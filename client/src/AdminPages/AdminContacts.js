import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import driverContext from '../context/driverContext'
import { useNavigate,useLocation} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminDriver = () => {
    const [allContacts,setAllContacts]=useState([])
    
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
  const handleSearchClick = () => {
        console.log("abc")

  };
  const filteredData = allContacts.filter(item =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())||
      item.details?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  useEffect(() => {
        const fetchData = async () => {
         const response=await fetch("http://localhost:5000/api/contacts/fetchallcontacts",{
                method:'GET',
                headers:{
                    'Content-Type':'application/json',
                    'auth-token':localStorage.getItem('token')
                }
            });
            const json=await response.json()
            setAllContacts(json);
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Contacts Data</h3>
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
            <th>Name</th>
            <th>Email</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => (
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{row.name}</td>
               <td>{row.email}</td>
               <td>{row.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDriver
