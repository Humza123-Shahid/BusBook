import React,{useEffect} from 'react'
import { Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {
  let navigate=useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location = useLocation()

  // useEffect(() => {
  //   // Google Analytics
  //   console.log(location.pathname);
  // }, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid" >
            
           
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
               
            </ul>
            {!localStorage.getItem('token')?<form className="d-flex" role="search">
                <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
            </form>:<button onClick={handleLogout}className='btn btn-primary'>Logout</button>}
            </div>
        </div>
    </nav>
  )
}

export default Navbar
