import React,{ useState, useEffect}from 'react';
import { Link, useNavigate } from "react-router-dom";


const Sidebar = () => {
   let navigate=useNavigate();
   const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("activeTab") || "Buses"
  );
   useEffect(() => {
    localStorage.setItem("activeTab", selectedTab);
  }, [selectedTab]);

   const handleLogout = () => {
        localStorage.removeItem("token");
        sessionStorage.setItem("reloaded", "false");
        setSelectedTab("login")
         navigate('/login')
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
      const SelectedTab = (abc) => {
        
        setSelectedTab(abc)
        // Optionally, redirect to a login page or home page after logout
        // history.push('/login'); // If using useHistory hook
      };
  return(
  <div className="bg-dark text-white p-3 vh-100" style={{ width: '250px',backgroundColor: '#2c3e50',
        color: 'white',
        height: '100vh',
        position: 'sticky',
        top: 0,
        padding: '1rem',
        overflow: 'hidden',}}>
    <h4 className="mb-4">Admin Dashboard</h4>
    <ul className="nav flex-column">
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="dashboard" onClick={()=>SelectedTab("dashboard")}><i className="fas fa-tachometer-alt me-2"></i> Dashboard</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="bookings" onClick={()=>SelectedTab("bookings")}><i className="fas fa-book me-2"></i> Bookings</Link>
      </li>
       <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="contacts" onClick={()=>SelectedTab("contacts")}><i className="fas fa-book me-2"></i> Contacts</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="expences" onClick={()=>SelectedTab("expences")}><i className="fas fa-dollar-sign me-2"></i> Expences</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="expencecategories" onClick={()=>SelectedTab("expencecategories")}><i className="fas fa-tag me-2"></i> Expence Categories</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" style={{color:'white'}} to="buses" onClick={()=>SelectedTab("buses")}><i className="fas fa-bus me-2"></i> Buses</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="destination" onClick={()=>SelectedTab("destination")}><i className="fas fa-location-dot me-2"></i> Destination</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="driver" onClick={()=>SelectedTab("driver")}><i className="fas fa-car me-2"></i> Driver</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="routes" onClick={()=>SelectedTab("routes")}><i className="fas fa-route me-2"></i> Routes</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="services" onClick={()=>SelectedTab("services")}><i className="fas fa-cogs me-2"></i> Services</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="faqs" onClick={()=>SelectedTab("faqs")}><i className="fas fa-cogs me-2"></i> Faqs</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link text-white" to="login" onClick={handleLogout}><i className="fas fa-sign-out me-2"></i>Logout</Link>
      </li>
    </ul>
  </div>
  );
};

export default Sidebar;