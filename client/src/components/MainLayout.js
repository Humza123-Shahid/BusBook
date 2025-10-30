import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      {/* <Navbar /> */}
      
        <Outlet /> {/* Where child routes render */}
      
    </>
  );
};

export default MainLayout;