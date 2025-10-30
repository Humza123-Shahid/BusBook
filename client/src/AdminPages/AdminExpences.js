import React,{useState,useContext, useEffect} from 'react'
import '../styles/StyledTable.css';
import expenceContext from '../context/expenceContext'
import expencecategoryContext from '../context/expencecategoryContext'
import { useNavigate,useLocation, data} from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const AdminExpences = () => {
    const context=useContext(expenceContext);
    const {expences,deleteExpence,getExpences}=context;
     const context2=useContext(expencecategoryContext);
      const {expenceCategories,getExpenceCategories}=context2;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const handleClick = () => {
        navigate('addexpence');

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
  const filteredData = expences.filter(item =>
      item.notes?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const handleView = (id,index,catId) => {
    const dataitem=expences.find(da => da._id ==id)
     const datacat=getCategoryById(catId);
    navigate('getexpence', { state: { expence:dataitem,idx:index,category:datacat} });
     
  };
  const handleEdit = (id,catId) => {
    const dataitem=expences.find(da => da._id ==id)
    const datacat=getCategoryById(catId);
    navigate('editexpence', { state: { expence:dataitem,category:datacat} });
  };
  const handleDelete = (id) => {
     const confirmed = window.confirm("Are you sure you want to delete this?");
  if (confirmed) {
    deleteExpence(id);
    // Call your delete API or function here
    //console.log("Deleted item with ID:", id);
    //setQuestions(prev => prev.filter(q => q._id !== id));
  }
  };
  const getCategoryById = (id) => expenceCategories.find(d => d._id === id);

  useEffect(() => {
        const fetchData = async () => {
        //const result = await getQuizzes(); // Call context function
        const result = await getExpences();
        const result2 = await getExpenceCategories();

        //setMyData(result);                     // Set state in same file
      };
  
      fetchData();
      }, []); //
  return (
   <div>
      <button className="btn btn-primary mt-3 ms-4" onClick={handleClick}>Add Expence</button>
      <div className="container d-flex justify-content-between">
        <h3 className="ms-2">Expences Data</h3>
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
            <th>Category</th>
            <th>Amount</th>
            <th>Notes</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row,index) => {
            const CategoryName = getCategoryById(row.category_id);
            return(
            <tr key={row._id}>
              <td>{index+1}</td>
              <td>{CategoryName?.name}</td>
              <td>{row.amount}</td>
              <td>{row.notes}</td>
              <td style={{width:"30%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={()=>
                  handleView(row._id,index+1,row.category_id)}>
                View
              </button>
              <button onClick={() => handleEdit(row._id,row.category_id)} style={{ marginRight: "8px",color:"white",backgroundColor:"green" }}>
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

export default AdminExpences
