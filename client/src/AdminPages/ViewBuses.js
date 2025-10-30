import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewBuses = () => {
     const location = useLocation();
    const Bus=location.state?.bus || {};
     const Driver=location.state?.driver;
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Buses Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Driver</th>
            <th>Bus Number</th>
            <th>Bus Type</th>
            <th>Bus Category</th>
            <th>Total Seats</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Bus._id}>
              <td>{index}</td>
              <td>{Driver.name}</td>
              <td>{Bus.bus_number}</td>
              <td>{Bus.bus_type}</td>
              <td>{Bus.bus_category}</td>
              <td>{Bus.total_seats}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewBuses
