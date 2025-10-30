import React from 'react'
import { useLocation } from 'react-router-dom';

const ViewFaqs = () => {
     const location = useLocation();
    const Faqs=location.state?.faqs || {};
    const index=location.state?.idx;
    const Status=Faqs.status?"Active":"InActive";
  return (
    <div>
      <h1 className="ms-4">Faqs Data</h1>
      <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
            <tr key={Faqs._id}>
              <td>{index}</td>
              <td>{Faqs.question}</td>
              <td>{Faqs.answer}</td>
              <td>{Status}</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ViewFaqs
