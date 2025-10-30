/* eslint-disable no-unused-expressions */ 
import React,{ useState, useEffect,useContext} from 'react'
import { Link,useNavigate,useLocation} from 'react-router-dom';
import '../styles/style.css';
import '../styles/border.css';
import '../styles/swiper.css';
//import "../lib/js/bootstrap.bundle.min.js";
// eslint-disable-next-line no-unused-expressions
 import "../cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js";
 import serviceContext from '../context/serviceContext'
 import destinationContext from '../context/destinationContext'
  import faqsContext from '../context/faqsContext'
// eslint-disable-next-line no-unused-expressions
 import CustomScripts from "./CustomScripts";
import logo_light from '../images/logo-light.png'
import hero_1 from '../images/hero-1.png'
import hero from '../images/hero.jpg'
import hero_video from '../video/hero.mp4'
import about from '../images/about.jpg'
import service_1 from '../images/service-1.jpg'
import service_4 from '../images/service-4.jpg'
import service_2 from '../images/service-2.jpg'
import service_5 from '../images/service-5.jpg'
import bus_1 from '../images/bus-1.png'
import bus_2 from '../images/bus-2.png'
import bus_3 from '../images/bus-3.png'
import bus_4 from '../images/bus-4.png'
import bus_5 from '../images/bus-5.png'
import bus_6 from '../images/bus-6.png'
import why_choose_us_1 from '../images/why-choose-us-1.jpg'
import testimonial_1 from '../images/testimonial-1.jpg'
import testimonials_1 from '../images/testimonials-1.jpg'
import testimonials_2 from '../images/testimonials-2.jpg'
import testimonials_3 from '../images/testimonials-3.jpg'
import destination_1 from '../images/destination-1.jpg'
import destination_2 from '../images/destination-2.jpg'
import destination_3 from '../images/destination-3.jpg'
import destination_4 from '../images/destination-4.jpg'
import blog_post_1 from '../images/blog-post-1.jpg'
import blog_post_2 from '../images/blog-post-2.jpg'
import blog_post_3 from '../images/blog-post-3.jpg'
import get_started_1 from '../images/get-started-1.png'
import logo_dark from '../images/logo-dark.png'
import UserNavbar from '../components/UserNavbar.js';
import UserFooter from '../components/UserFooter.js';

const Home = () => {
  const context=useContext(serviceContext);
  const {services,getServices}=context;
  const context2=useContext(destinationContext);
    const {destinations,getDestinations}=context2||{};
     const context3=useContext(faqsContext);
    const {faqs,getFaqs}=context3;
  const [selectedStartValue, setSelectedStartValue] = useState('');
  const [selectedEndValue, setSelectedEndValue] = useState('');
 const navigate = useNavigate();
// const accordionButton = document.getElementById('myButton');
// const collapsibleContent = document.getElementById('collapse1');

// // Add a click event listener
// accordionButton.addEventListener('click', () => {
//   console.log("abc1245");
//     collapsibleContent.classList.toggle('show');

//     //accordionButton.classList.toggle('active-button'); 
// });
// const [isActive, setIsActive] = useState(false);

//       const toggleClass = () => {
//         setIsActive(!isActive);
//       };
  const handleChangeStart = (event) => {
    console.log(event.target.value)
    setSelectedStartValue(event.target.value);
     
  };
  const handleChangeEnd = (event) => {
    setSelectedEndValue(event.target.value);
     
  };
  const dispRoutes = (event) => {
    event.preventDefault(); 
    const departure = document.getElementById('mySelect').value;
    const arrival = document.getElementById('mySelect2').value;
    const routedate = document.getElementById('formdate').value;
    const selectElement = document.getElementById('mySelect');

// Get the text of the selected option
const selectedText = selectElement.options[selectElement.selectedIndex].text;
const selectElement2 = document.getElementById('mySelect2');

// Get the text of the selected option
const selectedText2 = selectElement2.options[selectElement2.selectedIndex].text;
    if (routedate) {
    // Now 'selectedDateString' holds the date entered by the user.
    // You can use this string directly or convert it to a Date object if needed.

    // Example of converting to a Date object:
      const selectedroutedate = new Date(routedate);
      navigate("/showroute",{
          state: { dep: departure,arr:arrival,dep2: selectedText,arr2:selectedText2,routedt:selectedroutedate}});
    // Call a function to fetch data using the date
    } 

     
     
  };
  // useEffect(() => {
  //    if(localStorage.getItem('token')){
        
  //       if(localStorage.getItem('utype')=="admin")
  //       {
  //         navigate("/admin");
  //       }
  //     }
  //        else
  //       {
  //       navigate("/login");
  //        }
  //    }, []); //
           useEffect(() => {
        //     if(localStorage.getItem('utype')=="admin")
        // {
        //   navigate("/admin");
        // }
            const fetchData = async () => {
            //const result = await getQuizzes(); // Call context function
            const result = await getServices();
            const result2 = await getDestinations();
            const result3 = await getFaqs();


            //setMyData(result);                     // Set state in same file
          };
      
          fetchData();
          }, []); //
  return (
    <>
    <CustomScripts/>
    <div>
    <UserNavbar/>
    
    
    <div className="bg-hero overflow-hidden">
      <div className="page-size">
        <div className="container-lg px-0">
          <div className="row mt-5">
            <div className="col-12 col-lg-8">
              <span className="text-subtitle">bustion transport company</span>
              <h1 className="mt-4 mb-5">
                Expertly Connecting People and
                <span className="c-main">Destinations</span>
              </h1>
              <p>
                Group travel redefined with modern buses, expert drivers, and
                personalized service for every trip.
              </p>
              <div className="d-flex gap-4 mt-4 mb-5">
                <a href="#services" className="btn-subtle">Get Started</a
                ><a href="#about" className="btn-dark">Our Story</a>
              </div>
              <img
                src={hero_1}
                alt="hero"
                className="hero-img fade-in-left delay-2"
              />
            </div>
            <div className="col-12 col-lg-4 mt-4 mt-lg-0">
              <div className="video-wrapper fade-in-right">
                <video poster={hero} className="hero-video" id="video">
                  <source src={hero_video} title="Video" type="video/mp4" />
                </video>
                <i className="fas fa-play-circle play-button" id="playButton"></i>
              </div>
              <div className="hero-card mt-4">
                <form onSubmit={dispRoutes} method="post" id="otherForm">
                  {/* <div className="popup-message-2" id="otherPopupMessage">
                    <div>
                      <i className="fa-solid fa-check fa-2xl"></i>
                    </div>
                    Thank you! The form submitted successfully
                  </div> */}
                  <h4>Pick your Journey</h4>
                  {/* <input
                    type="text"
                    placeholder="Travel From"
                    className="hero-input mt-4 mb-3"
                  /> */}
                  <select id="mySelect" className="form-control hero-input mt-4 mb-3"  value={selectedStartValue} onChange={handleChangeStart}>
                    <option value="">-Travel From-</option>
                    {Array.isArray(destinations) && destinations.map((row) => (
                    <option value={row._id}>{row.name}</option>
                    ))}
                  </select>
                  <select id="mySelect2" className="form-control hero-input mb-3 "  value={selectedEndValue} onChange={handleChangeEnd}>
                    <option value="">-Travel To-</option>
                    {Array.isArray(destinations) && destinations.map((row) => (
                    <option value={row._id}>{row.name}</option>
                    ))}
                  </select>
                  {/* <input
                    type="text"
                    placeholder="Travel To"
                    className="hero-input mb-3"
                  /> */}
                  <input type="date" id="formdate" className="form-control hero-input mb-3" />
                  {/* <input
                    type="number"
                    placeholder="Seat Number"
                    className="hero-input mb-3"
                  /> */}
                  <div className="row mx-0">
                    <button className="btn-subtle">Book Now</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video-modal" id="videoModal" style={{"display": "none"}}>
        <video controls id="modalVideo">
          <source src={hero_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <i className="fas fa-times video-modal-close" id="modalClose"></i>
      </div>
    </div>
    <section id="about">
    <div className="bg-white overflow-hidden">
      <div className="page-size">
        <div className="container-lg px-0">
          <div className="row g-5">
            <div className="col-12 col-lg-6 order-1 order-lg-0 position-relative">
              <img
                src={about}
                alt="about"
                className="about-img fade-in-up"
              />
              <div className="about-card fade-in-left delay-2" id="quote">
                <i className="fa-solid fa-quote-right fa-2xl c-subtle"></i>
                <p className="c-text-2 my-3">
                  At Bustion, we don't just transport people—we connect
                  destinations and create memorable journeys
                </p>
                <p className="c-white fw-bolder mb-0">John A. Carter</p>
                <span className="small-text">CEO Bustion</span>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-0 order-lg-1">
              <span className="text-subtitle ms-1 mt-0">about us</span>
              <h1 className="mt-4 my-5">
                Driven to Deliver
                <span className="c-main">Excellence</span>
              </h1>
              <p>
                At Bustion, we specialize in safe, reliable, and comfortable
                group transport. From corporate events to school trips, our
                modern buses and professional service ensure every journey is
                seamless and stress-free
              </p>
              <div className="d-flex gap-1 gap-sm-5 mt-5 mb-4">
                <ul className="px-0">
                  <li>
                    <i className="fa-solid fa-check fa-sm c-main me-2"></i>Reliable
                    Service
                  </li>
                  <li className="mt-1">
                    <i className="fa-solid fa-check fa-sm c-main me-2"></i
                    >Comfortable Rides
                  </li>
                  <li className="mt-1">
                    <i className="fa-solid fa-check fa-sm c-main me-2"></i
                    >Affordable Pricing
                  </li>
                </ul>
                <ul>
                  <li>
                    <i className="fa-solid fa-check c-main c-main me-2"></i
                    >Professional Drivers
                  </li>
                  <li className="mt-1">
                    <i className="fa-solid fa-check fa-sm c-main me-2"></i>Custom
                    Solutions
                  </li>
                  <li className="mt-1">
                    <i className="fa-solid fa-check fa-sm c-main me-2"></i
                    >Exceptional Support
                  </li>
                </ul>
              </div>
              {/* <a href="about.html" className="btn-subtle">Learn More</a> */}
              <div
                className="about-card d-block d-sm-flex mt-5 justify-content-between fade-in-right delay-2"
              >
                <div>
                  <h2 className="c-white">460+</h2>
                  <span className="text-subtitle c-text-2">active driver</span>
                </div>
                <div className="mt-4 mt-sm-0">
                  <h2 className="c-white">90%</h2>
                  <span className="text-subtitle c-text-2">happy client</span>
                </div>
                <div className="mt-4 mt-sm-0">
                  <h2 className="c-white">15+</h2>
                  <span className="text-subtitle c-text-2">years experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section id="services">
    <div className="bg-white overflow-hidden">
      <div className="page-size">
        <div className="d-lg-flex justify-content-between align-items-end">
          <div className="col-12 col-lg-8">
            <span className="text-subtitle ms-1 mt-0">our service</span>
            <h2 className="my-4">
              Reliable Solution for every
              <span className="c-main fs-56">Journey</span>
            </h2>
          </div>
          {/* <a href="services.html" className="btn-subtle mb-4 mb-lg-0">All Services</a> */}
        </div>
        <div className="container-sm px-0 mt-4">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
           
              {Array.isArray(services) &&services.map((row,index) => {
               return (row.availability_status==true && index<4) ?<> <div className="col"><img src={service_1} alt="service" className="service-img" />
              <div className="service-card" style={{'height':'450px'}}>
                <h3 className="c-white">{row.service_name}</h3>
                <p className="mb-5 mt-4 c-text-2">
                  {row.service_description}
                </p>
                <span className="text-subtitle c-white">suitable for</span>
                <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Business
                    trips
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Employee
                    shuttles
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Event
                    transportation
                  </span>
                </div>
                {/* <div className="my-4 pt-1 pt-lg-4">
                  <a href="services-detail.html" className="btn-main">Learn More</a>
                </div> */}
              </div></div></>:<></>
              
              })}
            
              
          </div>
        </div>
        {/* <div className="container-sm px-0 mt-4">
          <div className="row row-cols-1 row-cols-sm-2 g-4">
            <div className="col">
              <img src={service_1} alt="service" className="service-img" />
              <div className="service-card">
                <h3 className="c-white">Corporate Transport</h3>
                <p className="mb-5 mt-4 c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <span className="text-subtitle c-white">suitable for</span>
                <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Business
                    trips
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Employee
                    shuttles
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Event
                    transportation
                  </span>
                </div>
                <div className="my-4 pt-1 pt-lg-4">
                  <a href="services-detail.html" className="btn-main">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col">
              <img src={service_4} alt="service" className="service-img" />
              <div className="service-card">
                <h3 className="c-white">School Trips</h3>
                <p className="mb-5 mt-4 c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <span className="text-subtitle c-white">suitable for</span>
                <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Fields trips
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Sports
                    events
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Educational
                    excursions
                  </span>
                </div>
                <div className="my-4 pt-1 pt-lg-4">
                  <a href="services-detail.html" className="btn-main">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col">
              <img src={service_2} alt="service" className="service-img" />
              <div className="service-card">
                <h3 className="c-white">Event Shuttles</h3>
                <p className="mb-5 mt-4 c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <span className="text-subtitle c-white">suitable for</span>
                <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>City tours
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Concerts
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Festivals
                  </span>
                </div>
                <div className="my-4 pt-1 pt-lg-4">
                  <a href="services-detail.html" className="btn-main">Learn More</a>
                </div>
              </div>
            </div>
            <div className="col">
              <img src={service_5} alt="service" className="service-img" />
              <div className="service-card">
                <h3 className="c-white">Airport Transfers</h3>
                <p className="mb-5 mt-4 c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                  leo.
                </p>
                <span className="text-subtitle c-white">suitable for</span>
                <div className="d-flex gap-3 mt-4 mb-4 flex-wrap">
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Group
                    pickups
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Drop-offs
                  </span>
                  <span className="c-text-2"
                    ><i className="fa-solid fa-check c-subtle me-2"></i>Airport
                    pickups
                  </span>
                </div>
                <div className="my-4 pt-1 pt-lg-4">
                  <a href="services-detail.html" className="btn-main">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
    </section>
    <section id="ourbus">
    <div className="bg-heading overflow-hidden">
      <div className="page-size">
        <div className="d-flex flex-column align-items-center">
          <span className="text-subtitle ms-1 mt-0 c-white">our bus</span>
          <h2 className="my-4 c-white text-center">
            Modern, Comfortable, and
            <span className="c-subtle fs-56">Reliable</span>
          </h2>
          <p className="c-text-2 my-4 pt-2 col-12 col-lg-6 text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <div className="container-lg px-0">
          <div className="row row-cols-1 row-cols-lg-3 g-4 mt-lg-5 fade-in-up">
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Voyager 600</h4>
                  <span className="text-subtitle c-text-1">economy</span>
                </div>
                <img src={bus_1} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >50 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$89.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Tourer 400</h4>
                  <span className="text-subtitle c-text-1">executive</span>
                </div>
                <img src={bus_2} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >40 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$125.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Metro 200</h4>
                  <span className="text-subtitle c-text-1">shuttle</span>
                </div>
                <img src={bus_3} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >20 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$250.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Horizon 350</h4>
                  <span className="text-subtitle c-text-1">economy</span>
                </div>
                <img src={bus_4} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >55 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$89.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Mover 150</h4>
                  <span className="text-subtitle c-text-1">executive</span>
                </div>
                <img src={bus_5} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >45 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$125.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="bus-card">
                <div className="d-flex justify-content-between align-items-end">
                  <h4 className="c-heading">Luxe 617</h4>
                  <span className="text-subtitle c-text-1">shuttle</span>
                </div>
                <img src={bus_6} alt="bus" className="my-4" />
                <div className="row row-cols-3 my-4">
                  <span className="border-right"
                    ><i className="fa-solid fa-gas-pump c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >200 liters</span
                      ></i
                    >
                  </span>
                  <span className="border-right"
                    ><i className="fa-solid fa-users c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >25 Seats</span
                      ></i
                    >
                  </span>
                  <span
                    ><i className="fa-solid fa-bus-simple c-main"
                      ><span className="small-text c-text-1 c-main ms-2 fw-bolder"
                        >Manual</span
                      ></i
                    >
                  </span>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-end">
                    <h3>$250.00/</h3>
                    <span className="mb-2 ms-1">Day</span>
                  </div>
                  {/* <a href="bus-detail.html" className="btn-subtle">Rent Now</a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bus-button fade-in-right mt-4 delay-1">
          <p className="c-text-2 mb-0">
            Explore Our Fleet: A Bus for Every Journey
            <a href="bus-detail.html" className="c-white">x More Busses</a>
          </p>
        </div>
      </div>
    </div>
    </section>
    <section id="whychooseus">
    <div className="bg-white overflow-hidden">
      <div className="page-size">
        <div className="d-flex justify-content-center">
          <span className="text-subtitle ms-1 mt-0">why choose us</span>
        </div>
        <h2 className="my-4 text-center">
          Your Trusted Partner in
          <span className="c-main">Excellence</span>
        </h2>
        <div className="container-lg px-0">
          <div className="row row-cols-1 row-cols-lg-3">
            <div
              className="col d-flex flex-column justify-content-center fade-in-left"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="order-1 order-lg-0">
                  <h4 className="choose-align mb-3">Expert Team</h4>
                  <p className="choose-align">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0 order-lg-1">
                  <i className="fa-solid fa-gear fs-50 c-subtle"></i>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="order-1 order-lg-0">
                  <h4 className="choose-align mb-3">Client Centered</h4>
                  <p className="choose-align">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0 order-lg-1">
                  <i className="fa-solid fa-face-smile-wink fs-50 c-subtle"></i>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="order-1 order-lg-0">
                  <h4 className="choose-align mb-3">Affordable Services</h4>
                  <p className="choose-align">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0 order-lg-1">
                  <i className="fa-regular fa-credit-card fs-50 c-subtle"></i>
                </div>
              </div>
            </div>
            <div className="col my-4 fade-in-up">
              <img
                src={why_choose_us_1}
                alt="why choose us"
                className="choose-img"
              />
            </div>
            <div
              className="col d-flex flex-column justify-content-center fade-in-right"
            >
              <div className="d-flex align-items-center gap-3">
                <div className="order-1">
                  <h4 className="choose-align-2 mb-3">Reliable Support</h4>
                  <p className="choose-align-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0">
                  <i className="fa-solid fa-screwdriver-wrench fs-50 c-subtle"></i>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="order-1">
                  <h4 className="choose-align-2 mb-3">Proven Excellence</h4>
                  <p className="choose-align-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0">
                  <i className="fa-solid fa-bus-simple fs-50 c-subtle"></i>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3 mt-4">
                <div className="order-1">
                  <h4 className="choose-align-2 mb-3">Complete Care</h4>
                  <p className="choose-align-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elitus
                    leo.
                  </p>
                </div>
                <div className="choose-card order-0">
                  <i className="fa-solid fa-certificate fs-50 c-subtle"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section id="testimonial">
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
    </section>
    <section id="topdestination">
    <div className="bg-white overflow-hidden">
      <div className="page-size">
        <div className="d-lg-flex justify-content-between align-items-end">
          <div className="col-12 col-lg-4">
            <span className="text-subtitle ms-1 mt-0">top destination</span>
            <h2 className="mt-4">
              Discover Our Top
              <span className="c-main">Destination</span>
            </h2>
          </div>
          <div className="col-12 col-lg-1"></div>
          <div className="d-flex col-12 col-lg-4 mt-4">
            <p className="mb-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis
            </p>
          </div>
          <div className="col-12 col-lg-1"></div>
          {/* <div className="col-12 col-lg-2">
            <a href="services.html" className="btn-subtle mb-4 mb-lg-0 mt-4 mt-lg-0">
              All Destintation
            </a>
          </div> */}
        </div>
        <div className="container-sm px-0 mt-5">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 fade-in-up">
            <div className="col destination-col1">
              <div className="destination-img-wrapper">
                <img
                  src={destination_1}
                  alt="destination"
                  className="destination-img"
                />
              </div>
              <div className="destination-card">
                <h5 className="c-white my-4">New York</h5>
                <p className="c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="services-detail.html" className="destination-link">&gt; Learn More</a>
              </div>
            </div>
            <div className="col destination-col2">
              <div className="destination-img-wrapper">
                <img
                  src={destination_2}
                  alt="destination"
                  className="destination-img"
                />
              </div>
              <div className="destination-card">
                <h5 className="c-white my-4">California</h5>
                <p className="c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="services-detail.html" className="destination-link">&gt; Learn More</a>
              </div>
            </div>
            <div className="col destination-col3">
              <div className="destination-img-wrapper">
                <img
                  src={destination_3}
                  alt="destination"
                  className="destination-img"
                />
              </div>
              <div className="destination-card">
                <h5 className="c-white my-4">Los Angeles</h5>
                <p className="c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="services-detail.html" className="destination-link">&gt; Learn More</a>
              </div>
            </div>
            <div className="col destination-col4">
              <div className="destination-img-wrapper">
                <img
                  src={destination_4}
                  alt="destination"
                  className="destination-img"
                />
              </div>
              <div className="destination-card">
                <h5 className="c-white my-4">San Francisco</h5>
                <p className="c-text-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <a href="services-detail.html" className="destination-link">&gt; Learn More</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section id="blogpost">
    <div className="bg-accent overflow-hidden">
      <div className="page-size">
        <div className="d-lg-flex justify-content-between align-items-end">
          <div className="col-12 col-lg-6">
            <span className="text-subtitle ms-1 mt-0">blog post</span>
            <h2 className="my-4">
              Explore Our Latest
              <span className="c-main">Articles</span>
            </h2>
          </div>
          {/* <a href="blog.html" className="btn-subtle mb-4 mb-lg-0">More Articles</a> */}
        </div>
        <div className="container-sm px-0 mt-5">
          <div
            className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4 fade-in-up"
          >
            <div className="col blog-col1">
              <a href="single-post.html">
                <div className="blog-img-wrapper">
                  <img src={blog_post_1} alt="blog" className="blog-img" />
                </div>
              </a>
              <div className="blog-card">
                <span className="blog-meta"
                  >zaderonstudio
                  <i className="fa-solid fa-angles-right c-subtle mx-2"></i>
                  November 23, 2024</span
                >
                <a href="single-post.html"
                  ><h5 className="c-white my-4">
                    A Look Inside Our Premium Bus Features
                  </h5></a
                >
              </div>
            </div>
            <div className="col blog-col2">
              <a href="single-post.html">
                <div className="blog-img-wrapper">
                  <img src={blog_post_2} alt="blog" className="blog-img" />
                </div>
              </a>
              <div className="blog-card">
                <span className="blog-meta"
                  >zaderonstudio
                  <i className="fa-solid fa-angles-right c-subtle mx-2"></i>
                  November 23, 2024</span
                >
                <a href="single-post.html"
                  ><h5 className="c-white my-4">
                    How to Make Long Bus Rides More Enjoyable
                  </h5></a
                >
              </div>
            </div>
            <div className="col blog-col3">
              <a href="single-post.html">
                <div className="blog-img-wrapper">
                  <img src={blog_post_3} alt="blog" className="blog-img" />
                </div>
              </a>
              <div className="blog-card">
                <span className="blog-meta"
                  >zaderonstudio
                  <i className="fa-solid fa-angles-right c-subtle mx-2"></i>
                  November 23, 2024</span
                >
                <a href="single-post.html"
                  ><h5 className="c-white my-4">
                    The Benefits of Daily Commutes with a Shuttle Service
                  </h5></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    <section id="faqs">
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
                      //onClick={toggleClass}
                      id='myButton'
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
                   // className={isActive ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'}
                    
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
    </section>
    <div className="bg-white overflow-hidden">
      <div className="page-size pt-0">
        <div className="bg-heading border-radius fade-in-up">
          <div className="container-lg px-0">
            <div className="row row-cols-1 row-cols-lg-2">
              <div className="col">
                <div className="get-started-card">
                  <span className="text-subtitle ms-1 mt-0 c-white"
                    >get started now</span
                  >
                  <h2 className="mt-4 mb-5 c-white">
                    Begin Your Journey with Us Get
                    <span className="c-subtle fs-56"><i>20% Off</i></span>
                  </h2>
                  <p className="c-text-2 pb-3">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                    elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus
                    leo.
                  </p>
                  <div className="d-flex gap-4 mt-4">
                    <a href="#services" className="btn-main">Get Started</a>
                    {/* <a href="contact.html" className="btn-white">Contact Us</a> */}
                    <Link className="btn-white" to="/showcontact"> Contact Us</Link>                                       
                  </div>
                </div>
              </div>
              <div className="col">
                <img
                  src={get_started_1}
                  alt="get started"
                  className="get-started-img"
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

export default Home


