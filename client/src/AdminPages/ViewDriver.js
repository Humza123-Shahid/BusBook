import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewDriver = () => {
     const location = useLocation();
    const Driver=location.state?.driver || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Driver Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>License Number</th>
            <th>Contact Number</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Driver._id}>
              <td>{index}</td>
              <td>{Driver.name}</td>
              <td>{Driver.license_number}</td>
              <td>{Driver.contact_number}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewDriver
