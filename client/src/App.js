import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate
} from "react-router-dom";
import { useState,useEffect } from 'react';
import Admin from './AdminPages/Admin';
import AdminBuses from './AdminPages/AdminBuses';
import ViewBuses from './AdminPages/ViewBuses';
import BusState from './context/BusState';
import AddBuses from './AdminPages/AddBuses';
import EditBuses from './AdminPages/EditBuses';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import SignUp from './UserPages/SignUp';
import AdminDestination from './AdminPages/AdminDestination';
import DestinationState from './context/DestinationState';
import DriverState from './context/DriverState';
import RouteState from './context/RouteState';
import ServiceState from './context/ServiceState';
import AdminDriver from './AdminPages/AdminDriver';
import AdminRoutes from './AdminPages/AdminRoutes';
import AdminServices from './AdminPages/AdminServices';
import ViewDestination from './AdminPages/ViewDestination';
import ViewDriver from './AdminPages/ViewDriver';
import ViewRoutes from './AdminPages/ViewRoutes';
import ViewServices from './AdminPages/ViewServices';
import AddDestination from './AdminPages/AddDestination';
import EditDestination from './AdminPages/EditDestination';
import AddDriver from './AdminPages/AddDriver';
import EditDriver from './AdminPages/EditDriver';
import AddServices from './AdminPages/AddServices';
import EditServices from './AdminPages/EditServices';
import AddRoutes from './AdminPages/AddRoutes';
import EditRoutes from './AdminPages/EditRoutes';
import Home from './UserPages/Home';
import AdminFaqs from './AdminPages/AdminFaqs';
import FaqsState from './context/FaqsState';
import ViewFaqs from './AdminPages/ViewFaqs';
import AddFaqs from './AdminPages/AddFaqs';
import EditFaqs from './AdminPages/EditFaqs';
import ShowRoutes from './UserPages/ShowRoutes';
import BookSeats from './UserPages/BookSeats';
import BookSuccess from './UserPages/BookSuccess';
import AdminBookings from './AdminPages/AdminBookings';
import AdminContacts from './AdminPages/AdminContacts';

import ViewBookings from './AdminPages/ViewBookings';
import Dashboard from './AdminPages/Dashboard';
import ExpenceState from './context/ExpenceState';
import ExpenceCategoryState from './context/ExpenceCategoryState';
import AdminExpences from './AdminPages/AdminExpences';
import AddExpences from './AdminPages/AddExpences';
import ViewExpences from './AdminPages/ViewExpences';
import EditExpences from './AdminPages/EditExpences';
import AdminExpenceCategories from './AdminPages/AdminExpenceCategories';
import ViewExpenceCategories from './AdminPages/ViewExpenceCategories';
import AddExpenceCategories from './AdminPages/AddExpenceCategories';
import EditExpenceCategories from './AdminPages/EditExpenceCategories';
import ShowContact from './UserPages/ShowContact';

import UserNavbar from './components/UserNavbar.js';

function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  const location = useLocation();
  const navigate= useNavigate();
  //code to redirect to home page on reload at any other page
  useEffect(() => {
    if (location.pathname !== "/") {
      navigate("/");
      window.location.reload();
    }
  }, []);
  
  return (
    <>
        {/* <Alert alert={alert}/> */}
        {/*<Router> */}
        <BusState>
        <DestinationState>
        <DriverState>
        <RouteState>
        <ServiceState>
        <FaqsState>
        <ExpenceState>
        <ExpenceCategoryState>
        <div className="container"  style={{ maxWidth: "100vw",paddingLeft:"0px",paddingRight:"0px" }}>
          <Routes>
            <Route exact path="/admin" element={<Admin/>} >
              <Route path="dashboard" element={<Dashboard/>} />
              <Route path="buses" element={<AdminBuses/>} />
              <Route path="bookings" element={<AdminBookings/>} />
              <Route path="contacts" element={<AdminContacts/>} />
              <Route path="expences" element={<AdminExpences/>} /> 
              <Route path="expencecategories" element={<AdminExpenceCategories/>} />                           
              <Route path="destination" element={<AdminDestination/>} />
              <Route path="driver" element={<AdminDriver/>} />
              <Route path="routes" element={<AdminRoutes/>} />
              <Route path="services" element={<AdminServices/>} />
              <Route path="faqs" element={<AdminFaqs/>} />
              <Route path="bookings/getbookings" element={<ViewBookings/>}/>
              <Route path="expences/getexpence" element={<ViewExpences/>}/>
              <Route path="expences/addexpence" element={<AddExpences/>}/>
              <Route path="expences/editexpence" element={<EditExpences/>}/>
              <Route path="expencecategories/getexpencecategory" element={<ViewExpenceCategories/>}/>
              <Route path="expencecategories/addexpencecategory" element={<AddExpenceCategories/>}/>
              <Route path="expencecategories/editexpencecategory" element={<EditExpenceCategories/>}/>
              <Route path="buses/getbus" element={<ViewBuses/>} />
              <Route path="buses/addbus" element={<AddBuses/>} />
              <Route path="buses/editbus" element={<EditBuses/>} />
              <Route path="destination/getdestination" element={<ViewDestination/>} />
              <Route path="destination/adddestination" element={<AddDestination/>} />
              <Route path="destination/editdestination" element={<EditDestination/>} />
              <Route path="driver/getdriver" element={<ViewDriver/>} />
              <Route path="driver/adddriver" element={<AddDriver/>} />
              <Route path="driver/editdriver" element={<EditDriver/>} />
              <Route path="routes/getroute" element={<ViewRoutes/>} />
              <Route path="routes/addroute" element={<AddRoutes/>} />
              <Route path="routes/editroute" element={<EditRoutes/>} />
              <Route path="services/getservice" element={<ViewServices/>} />
              <Route path="services/addservice" element={<AddServices/>} />
              <Route path="services/editservice" element={<EditServices/>} />
              <Route path="faqs/getfaqs" element={<ViewFaqs/>} />
              <Route path="faqs/addfaqs" element={<AddFaqs/>} />
              <Route path="faqs/editfaqs" element={<EditFaqs/>} />
              
            </Route>
            <Route element={<MainLayout />}>
              <Route path="/login" element={<Login/>} />
              <Route path="/admin/login" element={<Login/>} />

              <Route path="/signup" element={<SignUp/>} />

            </Route>
             
             <Route path="/" element={<Home />}>
              
             </Route>
             <Route path="showroute" element={<ShowRoutes/>}/>
             <Route path="bookseats" element={<BookSeats/>}/>
             <Route path="booksuccess" element={<BookSuccess/>}/>
             <Route path="showcontact" element={<ShowContact/>}/>
            
          </Routes>
        </div>
        </ExpenceCategoryState>
        </ExpenceState>
        </FaqsState>
        </ServiceState>
        </RouteState>
        </DriverState>
        </DestinationState>
        </BusState>
                  {/*</Router> */}
        
    </>
  );
}

export default App;

