import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewExpenceCategories = () => {
     const location = useLocation();
    const ExpenceCategory=location.state?.expencecategory || {};
    const index=location.state?.idx;
  return (
    <div>
      <h1 className="ms-4">Expence Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
            <tr key={ExpenceCategory._id}>
              <td>{index}</td>
              <td>{ExpenceCategory.name}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewExpenceCategories
 

