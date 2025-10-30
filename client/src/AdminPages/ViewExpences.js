import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewExpences = () => {
     const location = useLocation();
    const Expence=location.state?.expence || {};
    const index=location.state?.idx;
     const Category=location.state?.category || {};
  return (
    <div>
      <h1 className="ms-4">Expence Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Amount</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Expence._id}>
              <td>{index}</td>
              <td>{Category.name}</td>
              <td>{Expence.amount}</td>
              <td>{Expence.notes}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewExpences
