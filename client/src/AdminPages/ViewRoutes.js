import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewRoutes = () => {
     const location = useLocation();
    const Route=location.state?.route || {};
    const Bus=location.state?.bus || {};
    const Start=location.state?.start || {};
    const End=location.state?.end || {};
    const index=location.state?.idx;
    const formattedDepartureTime = new Date(Route.departure_time).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
     const formattedArrivalTime = new Date(Route.arrival_time).toLocaleString('en-US', {
      // year: 'numeric',
      // month: '2-digit',
      // day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Ensures AM/PM
    });
    const dateObject = new Date(Route.date);
     dateObject.setHours(dateObject.getHours() - 5);
    const formattedDate = dateObject.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false // Ensures AM/PM
    });

  return (
    <div>
      <h1 className="ms-4">Routes Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Start Destination</th>
            <th>End Destination</th>
            <th>Bus</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Date</th>
            <th>Fare</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Route._id}>
              <td>{index}</td>
              <td>{Start.name}</td>
              <td>{End.name}</td>
              <td>{Bus.bus_number}</td>
              <td>{formattedDepartureTime}</td>
              <td>{formattedArrivalTime}</td>
              <td>{formattedDate}</td>
              <td>{Route.fare}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewRoutes
