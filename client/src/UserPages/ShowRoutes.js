import React,{useEffect, useState,useContext} from 'react'
import UserNavbar from '../components/UserNavbar'
import UserFooter from '../components/UserFooter'
import faqsContext from '../context/faqsContext'
// eslint-disable-next-line no-unused-expressions
import CustomScripts from "./CustomScripts";
import { Link,useNavigate, useLocation } from 'react-router-dom';
import { HashLink as Link1 } from 'react-router-hash-link';

  import busContext from '../context/busContext'

import testimonial_1 from '../images/testimonial-1.jpg'
import testimonials_1 from '../images/testimonials-1.jpg'
import testimonials_2 from '../images/testimonials-2.jpg'
import testimonials_3 from '../images/testimonials-3.jpg'


const ShowRoutes = () => {
   const context=useContext(faqsContext);
    const {faqs,getFaqs}=context;
  const context2=useContext(busContext);
  const {buses,getBuses}=context2;
  const [storeroutes,setStoreRoutes]=useState([]);
  const location = useLocation();
    const departure=location.state?.dep || {};
    const arrival=location.state?.arr || {};
    const departure_name=location.state?.dep2 || {};
    const arrival_name=location.state?.arr2 || {};
    const routedate=location.state?.routedt || {};
    const navigate = useNavigate();
     const getBusById = (id) => buses.find(d => d._id === id);
    useEffect(() => {
      console.log(departure,arrival,routedate)
                const fetchData = async () => {
                  const response=await fetch("http://localhost:5000/api/routes/fetchroutesbyinput",{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({departure,arrival,routedate})
                  });
                  const json=await response.json()
                  console.log(json);
                  setStoreRoutes(json)
                  const result3 = await getBuses();
                //const result = await getQuizzes(); // Call context function
               // const result = await getRoutesbyinput();
                //setMyData(result);                     // Set state in same file
              };
          
              fetchData();
              }, []); 
            const BookCheck = async (id) => {
                   if(localStorage.getItem('token')){
                      
                      if(localStorage.getItem('utype')=="admin")
                      {
                        navigate("/admin");
                      }
                      else{
                        const dataitem=storeroutes.find(da => da._id ==id)
                        const response=await fetch("http://localhost:5000/api/buses/fetchbusbyId",{
                          method:'GET',
                          headers:{
                              'Content-Type':'application/json',
                              'auth-token':localStorage.getItem('token'),
                              'id':dataitem.bus_id
                          }
                        });
                        const json=await response.json()
                        
                        navigate("/bookseats", { state: {bus_number:json.bus_number,route_id:id,dep_time:dataitem.departure_time.toString(),arr_time:dataitem.arrival_time.toString(),route_fare:dataitem.fare,dep1:departure_name,arr1:arrival_name,routedt1:routedate.toString()} })
                      }
                    }
                       else
                      {
                      navigate("/login");
                       }
                   }; 
  return (
    <>
    <CustomScripts/>
    <div>
     <UserNavbar/>
    <div class="bg-banner2">
      <div class="page-size">
        <p style={{color:'white',paddingTop:'10px'}}>
          Home<i class="fa-solid fa-angles-right fa-xs c-main mx-2"></i>Routes
        </p>
        <h1 style={{color:'white'}}>Routes</h1>
      </div>
    </div>
    <table  className="styled-table ms-4">
        <thead>
          <tr>
            <th>#</th>
            <th>Bus Number</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Fare</th>            
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(storeroutes) && storeroutes.map((row,index) => {
             const bus = getBusById(row.bus_id);
            const formattedDepartureTime = new Date(row.departure_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
               const formattedArrivalTime = new Date(row.arrival_time).toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true // Ensures AM/PM
                });
                return(
            <tr key={row._id}  style={{}}>
              <td>{index+1}</td>
              <td>{bus?.bus_number}</td>
              <td>{formattedDepartureTime}</td>
              <td>{formattedArrivalTime}</td>
              <td>{row.fare}</td>

              <td style={{width:"15%"}}>
                <button style={{ marginRight: "8px", color: "white",backgroundColor:"blue"}} onClick={() => BookCheck(row._id)}>
                Book Now
              </button>
              
              </td>
        
            </tr>
                );
          })}
        </tbody>
    </table>
    <div className="bg-accent overflow-hidden">
        <div className="page-size">
        <div className="container-lg px-0">
            <div className="row row-cols-1 row-cols-lg-2 g-5">
            <div className="col order-1 order-lg-0">
                <img
                src={testimonial_1}
                alt="testimonial"
                className="testimonial-img"
                />
            </div>
            <div
                className="col d-flex flex-column justify-content-center order-0 order-lg-1"
            >
                <span className="text-subtitle ms-1 mt-0">testimonials</span>
                <h2 className="mt-4 mb-5">
                Heart From Our
                <span className="c-main">Client</span>
                </h2>
                <p className="mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
                </p>
                <div className="swiper-container overflow-hidden">
                <div className="swiper-wrapper">
                    <div className="swiper-slide">
                    <div className="testimonial-card">
                        <div>
                        <i className="fa-solid fa-quote-right fs-50 c-main"></i>
                        </div>
                        <p className="my-4">
                        Bustion made our corporate retreat unforgettable. The
                        service was impeccable, on-time, and exceeded all our
                        expectations. Highly recommended!
                        </p>
                        <div className="d-flex pt-3">
                        <img
                            src={testimonials_1}
                            alt="testimonial"
                            className="testimonial-circle"
                        />
                        <div
                            className="d-flex flex-column justify-content-center ms-3"
                        >
                            <span className="testimonial-client-name">John Doe</span>
                            <span className="testimonial-client-label">Client</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="swiper-slide">
                    <div className="testimonial-card">
                        <div>
                        <i className="fa-solid fa-quote-right fs-50 c-main"></i>
                        </div>
                        <p className="my-4">
                        The executive coach from Bustion was perfect for our
                        team event. Spacious, comfortable, and affordable—highly
                        recommended for business travel
                        </p>
                        <div className="d-flex pt-3">
                        <img
                            src={testimonials_2}
                            alt="testimonial"
                            className="testimonial-circle"
                        />
                        <div
                            className="d-flex flex-column justify-content-center ms-3"
                        >
                            <span className="testimonial-client-name"
                            >Michael Johnson</span
                            >
                            <span className="testimonial-client-label">Client</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="swiper-slide">
                    <div className="testimonial-card">
                        <div>
                        <i className="fa-solid fa-quote-right fs-50 c-main"></i>
                        </div>
                        <p className="my-4">
                        Bustion’s service for our corporate event was
                        exceptional. Comfortable, punctual, and
                        professional—exactly what we needed for smooth
                        transportation
                        </p>
                        <div className="d-flex pt-3">
                        <img
                            src={testimonials_3}
                            alt="testimonial"
                            className="testimonial-circle"
                        />
                        <div
                            className="d-flex flex-column justify-content-center ms-3"
                        >
                            <span className="testimonial-client-name"
                            >Emily Davis</span
                            >
                            <span className="testimonial-client-label">Client</span>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div className="bg-white overflow-hidden">
      <div className="page-size">
        <div className="d-lg-flex justify-content-between align-items-end">
          <div className="col-12 col-lg-6">
            <span className="text-subtitle ms-1 mt-0">FAQS</span>
            <h2 className="my-4">
              Everything You Need to Know About
              <span className="c-main fs-56">Bustion</span>
            </h2>
          </div>
          <div className="col-12 col-lg-5">
            <p className="mb-4 pb-3 mt-5 mt-lg-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            {/* <a href="faqs.html" className="btn-subtle mb-4 mb-lg-0">More Faqs</a> */}
          </div>
        </div>
        <div className="container-lg px-0 mt-5">
          <div className="row row-cols-1 row-cols-lg-2 g-1 g-lg-4">
            <div className="col fade-in-up">
              <div className="accordion" id="faqsAccordion">
            {Array.isArray(faqs) &&faqs.map((row,index) => (
             <> 
            {(index<4&&row.status==true)?<><div className="accordion-item">
                  <span className="accordion-header" id={`heading${index+1}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse${index+1}`}
                      aria-expanded="false"
                      aria-controls={`collapse${index+1}`}
                    >
                      {row.question}
                    </button>
                  </span>
                  <div
                    id={`collapse${index+1}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading${index+1}`}
                    data-bs-parent="#faqsAccordion"
                  >
                    <div className="accordion-body">
                      {row.answer}
                    </div>
                  </div>
                </div></>:<></>}</> 
                ))}
                
                </div>
                </div>
            <div className="col fade-in-up delay-1">
              <div className="accordion" id="faqsAccordion2">
                {Array.isArray(faqs) && faqs.map((row,index) => (
             <> 
            {(index>3&&row.status==true)?<><div className="accordion-item">
                  <span className="accordion-header" id={`heading2${index+1}`}>
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#collapse2${index+1}`}
                      aria-expanded="false"
                      aria-controls={`collapse2${index+1}`}
                    >
                      {row.question}
                    </button>
                  </span>
                  <div
                    id={`collapse2${index+1}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading2${index+1}`}
                    data-bs-parent="#faqsAccordion2"
                  >
                    <div className="accordion-body">
                      {row.answer}
                    </div>
                  </div>
                </div></>:<></>}</> 
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="page-size pt-0">
        <div class="bg-heading border-radius fade-in-up">
          <div class="container-lg px-0">
            <div class="row row-cols-1 row-cols-lg-2">
              <div class="col">
                <div class="get-started-card">
                  <span class="text-subtitle ms-1 mt-0 c-white"
                    >get started now</span
                  >
                  <h2 class="mt-4 mb-5 c-white">
                    Begin Your Journey with Us Get
                    <span class="c-subtle fs-56"><i>20% Off</i></span>
                  </h2>
                  <p class="c-text-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </p>
                  <div class="d-flex gap-4 mt-4">
                    {/* <a href="index-2.html" class="btn-main">Get Started</a> */}
                    <Link1 className="btn-main" to="/#services" smooth>Get Started</Link1>
                    <Link className="btn-white" to="/showcontact"> Contact Us</Link>                                                         
                    {/* <a href="contact.html" class="btn-white">Contact Us</a> */}
                  </div>
                </div>
              </div>
              <div class="col">
                <img
                  src="img/get-started-1.png"
                  alt="get started"
                  class="get-started-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UserFooter/>
    </div>
    </>
  )
}

export default ShowRoutes
