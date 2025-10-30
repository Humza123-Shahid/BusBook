import React,{useEffect, useState,useContext} from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import UserNavbar from '../components/UserNavbar'
import UserFooter from '../components/UserFooter'
// eslint-disable-next-line no-unused-expressions
import CustomScripts from "./CustomScripts";
import { FaBus, FaMapMarkerAlt, FaUser, FaChair } from 'react-icons/fa';
import "../styles/BusDetails.css";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BookSuccess = () => {
    const location = useLocation();
       const navigate = useNavigate();
       const departure=location.state?.dep || {};
        const arrival=location.state?.arr || {};
        const routedate=location.state?.routedt1 || {};
        const departure_time=location.state?.dep_time || {};
        const ticket_number=location.state?.ticket_id || {};
        //const arrival_time=location.state?.arr_time || {};
     const busNumber=location.state?.bus_number || {};
        const total_amount=location.state?.total_fare || {};
    
        const seatNumbers=location.state?.selectedSeats||{};
      const PassengerInformation=location.state?.passengerInfo||{};
    const handleDownloadTicket = () => {
    // 1. Get the target HTML element by its ID
      const input = document.getElementById('ticket-section');

      if (!input) {
          console.error("Ticket section element not found.");
          return;
      }

      // 2. Convert the HTML element to a canvas (image)
      html2canvas(input, { scale: 2 }).then((canvas) => { // Use scale: 2 for better resolution
        const imgData = canvas.toDataURL('image/png');
        
        // Determine page size (A4 is standard)
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for units
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // 3. Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // 4. Download the PDF file
        pdf.save(`Ticket_${ticket_number}.pdf`);
      });
  };
  return (
     <>
    <CustomScripts/>
    <div>
    <UserNavbar/>
    <div id="ticket-section" className="bus-details-container">
      <div className="header-card">
        <h1>Bus Seat Booking Successfull!!</h1>
        <p>Confirmation: #{ticket_number}</p>
      </div>

      <div className="details-card">
        <div className="section-header">
          <FaBus className="icon" />
          <h2>Trip Details</h2>
        </div>
        <div className="details-grid">
          <div className="detail-item">
            <span className="label">Bus Number:</span>
            <span className="value">{busNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Origin:</span>
            <span className="value">{departure}</span>
          </div>
          <div className="detail-item">
            <span className="label">Destination:</span>
            <span className="value">{arrival}</span>
          </div>
          <div className="detail-item">
            <span className="label">Date:</span>
            <span className="value">{routedate}</span>
          </div>
          <div className="detail-item">
            <span className="label">Time:</span>
            <span className="value">{departure_time}</span>
          </div>
          <div className="detail-item">
            <span className="label">Total Fare:</span>
            <span className="value">{total_amount}</span>
          </div>
        </div>
      </div>

      <div className="details-card">
        <div className="section-header">
          <FaUser className="icon" />
          <h2>Passenger Information</h2>
        </div>
        <div className="details-grid">
          
            <div className="detail-item">
              <span className="label">Name:</span>
              <span className="value">{PassengerInformation.name}</span>
            </div>
            <div className="detail-item">
              <span className="label">Cnic:</span>
              <span className="value">{PassengerInformation.cnic}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{PassengerInformation.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Phone Number:</span>
              <span className="value">{PassengerInformation.phone_number}</span>
            </div>
          
        </div>
      </div>

      <div className="details-card seat-section">
        <div className="section-header">
          <FaChair className="icon" />
          <h2>Your Seats</h2>
        </div>
        <div className="seat-grid">
          {seatNumbers.map((seat, index) => (
            <div key={index} className="seat-chip">
              <FaChair className="seat-icon" />
              <span>Seat {seat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <button className="download-button" onClick={handleDownloadTicket}>Download Ticket</button>
      </div>
    </div>
     <UserFooter/>
    </div>
    </>
  )
}

export default BookSuccess
