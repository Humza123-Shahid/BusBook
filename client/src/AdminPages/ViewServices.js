import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewServices = () => {
     const location = useLocation();
    const Service=location.state?.service || {};
    const index=location.state?.idx;
    const Status=Service.availability_status?"Active":"InActive";
  return (
    <div>
      <h1 className="ms-4">Services Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            {/* <th>Driver Id</th> */}
            <th>Service Name</th>
            <th>Service Description</th>
            <th>Availability Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Service._id}>
              <td>{index}</td>
              {/* <td>{Service.driver_id}</td> */}
              <td>{Service.service_name}</td>
              <td>{Service.service_description}</td>
              <td>{Status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewServices
