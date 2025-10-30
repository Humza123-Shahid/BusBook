import React,{useEffect, useState,useContext} from 'react'
import UserNavbar from '../components/UserNavbar'
import UserFooter from '../components/UserFooter'
  import faqsContext from '../context/faqsContext'

// eslint-disable-next-line no-unused-expressions
import CustomScripts from "./CustomScripts";
import InfoMessage from '../components/InfoMessage';
import { useNavigate, useLocation } from 'react-router-dom';
  import busContext from '../context/busContext'
// import '../js/index.js'
import testimonial_1 from '../images/testimonial-1.jpg'
import testimonials_1 from '../images/testimonials-1.jpg'
import testimonials_2 from '../images/testimonials-2.jpg'
import testimonials_3 from '../images/testimonials-3.jpg'


const ShowContact = () => {
  const [showToast,setShowToast]=useState(false)
      const [msg,setMsg]=useState('')
      const [type,setType]=useState('')
     const [credentials,setCredentials] =useState({name:"",email:"",details:""})
     const { pathname } = useLocation();
   const context=useContext(faqsContext);
    const {faqs,getFaqs}=context;
     const handleSubmit=async(e)=>{
      e.preventDefault();
      const {name,email,details}=credentials
      const response=await fetch("http://localhost:5000/api/contacts/addcontact",{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')

        },
        body:JSON.stringify({name,email,details})
      });
      const json=await response.json()
      console.log(json);
      if(json.success)
      {
         const popupMessage = document.getElementById("otherPopupMessage");
        popupMessage.style.display = "block";
        console.log('xyz')
        setTimeout(() => {
          popupMessage.style.display = "none";
        }, 3000);
      }
      else{
          setShowToast(true);
        setMsg("Invalid Data")
        setType("error")
        setTimeout(()=>{
          setShowToast(false)
        },1500)
    }
     
     }
      const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
       useEffect(() => {
                const fetchData = async () => {
                const result = await getFaqs();
              };
              fetchData();
              }, []);
              

          useEffect(() => {
            window.scrollTo(0, 0);
          }, [pathname]);

  return (
    <>
    <CustomScripts/>
    <div>
     <InfoMessage showToast={showToast} msg={msg} type={type}/>      
     <UserNavbar/>
    <div class="bg-banner">
      <div class="page-size">
        <p>
          Home<i class="fa-solid fa-angles-right fa-xs c-main mx-2"></i>Contact
        </p>
        <h1>Contact</h1>
      </div>
    </div>
    <div class="bg-white overflow-hidden">
      <div class="page-size">
        <div class="container-lg px-0">
          <div class="row">
            <div class="col-12 col-lg-8">
              <form action="#" method="post" class="fade-in-up" id="otherForm" onSubmit={handleSubmit}>
                <div class="bus-detail-contact-card">
                  <h3>Send Us Message</h3>
                  <div class="popup-message-3" id="otherPopupMessage">
                    <div>
                      <i class="fa-solid fa-check fa-2xl"></i>
                    </div>
                    Thank you! The form submitted successfully
                  </div>
                  <div class="mt-4">
                    <span class="input-label">Name</span>
                    <input
                      type="text"
                      id="name" name="name" onChange={onChange}
                      class="bus-detail-input mt-1"
                      placeholder="Jhon Doe"
                    />
                  </div>
                  {/* <div class="row row-cols-1 row-cols-sm-2 mt-4">
                    <div>
                      <span class="input-label">Telephone</span>
                      <input
                        type="number"
                        class="bus-detail-input mt-1"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div class="mt-4 mt-sm-0">
                      <span class="input-label">Email</span>
                      <input
                        type="email"
                        class="bus-detail-input mt-1"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                  </div> */}
                  <div class="mt-4">
                    <span class="input-label">Email</span>
                    <input
                      type="email"
                      id="email" name="email" onChange={onChange}
                      class="bus-detail-input mt-1"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  <div class="mt-4">
                    <span class="input-label">Details</span>
                    <textarea
                      class="bus-detail-input mt-1"
                      id="details" name="details" onChange={onChange} 
                      placeholder="I am reaching out to learn more about your services"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  <div class="row mt-3 mx-0">
                    <button disabled={credentials.name==""|| credentials.email=="" || credentials.details==""} type="submit" class="btn-subtle">
                      Submit Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="col-12 col-lg-4 mt-4 mt-lg-0">
              <div class="bus-detail-card-dark fade-in-right">
                <h5 class="c-white">Get In Touch</h5>
                <p class="c-text-2 mt-4 mb-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis,
                </p>
                <ul>
                  <li class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-phone c-subtle mb-3"></i>
                    <p class="c-text-2">+1-800-555-12345</p>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-envelope-open-text c-subtle mb-3"></i>
                    <p class="c-text-2"><a href="cdn-cgi/l/email-protection.html" class="__cf_email__" data-cfemail="8ae3e4ece5cae8fff9fee3e5e4e9e2ebf8feeff8a4e9e5e7">[email&#160;protected]</a></p>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <i class="fa-solid fa-location-dot c-subtle mb-3"></i>
                    <p class="c-text-2">456 Citytown, CA 90210 United States</p>
                  </li>
                </ul>
              </div>
              <div class="border-radius mt-4 fade-in-right">
                <div class="maps-wrapper">
                  <div class="maps-overlay"></div>
                  <iframe
                    loading="lazy"
                    class="maps"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d48346.62710714776!2d-73.78270764795138!3d40.76940999818811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sid!2sid!4v1732409507385!5m2!1sid!2sid"
                    title="US"
                    aria-label="US"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-accent overflow-hidden">
      <div class="page-size">
        <div class="container-lg px-0">
          <div class="row row-cols-1 row-cols-lg-2 g-5">
            <div class="col order-1 order-lg-0 fade-in-up">
              <img
                src={testimonial_1}
                alt="testimonial"
                class="testimonial-img"
              />
            </div>
            <div
              class="col d-flex flex-column justify-content-center order-0 order-lg-1"
            >
              <span class="text-subtitle ms-1 mt-0">testimonials</span>
              <h2 class="mt-4 mb-5">
                Heart From Our
                <span class="c-main">Client</span>
              </h2>
              <p class="mb-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
                tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <div class="swiper-container overflow-hidden">
                <div class="swiper-wrapper">
                  <div class="swiper-slide">
                    <div class="testimonial-card">
                      <div>
                        <i class="fa-solid fa-quote-right fs-50 c-main"></i>
                      </div>
                      <p class="my-4">
                        Bustion made our corporate retreat unforgettable. The
                        service was impeccable, on-time, and exceeded all our
                        expectations. Highly recommended!
                      </p>
                      <div class="d-flex pt-3">
                        <img
                          src={testimonials_1}
                          alt="testimonial"
                          class="testimonial-circle"
                        />
                        <div
                          class="d-flex flex-column justify-content-center ms-3"
                        >
                          <span class="testimonial-client-name">John Doe</span>
                          <span class="testimonial-client-label">Client</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="testimonial-card">
                      <div>
                        <i class="fa-solid fa-quote-right fs-50 c-main"></i>
                      </div>
                      <p class="my-4">
                        The executive coach from Bustion was perfect for our
                        team event. Spacious, comfortable, and affordable—highly
                        recommended for business travel
                      </p>
                      <div class="d-flex pt-3">
                        <img
                          src={testimonials_2}
                          alt="testimonial"
                          class="testimonial-circle"
                        />
                        <div
                          class="d-flex flex-column justify-content-center ms-3"
                        >
                          <span class="testimonial-client-name"
                            >Michael Johnson</span
                          >
                          <span class="testimonial-client-label">Client</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="testimonial-card">
                      <div>
                        <i class="fa-solid fa-quote-right fs-50 c-main"></i>
                      </div>
                      <p class="my-4">
                        Bustion’s service for our corporate event was
                        exceptional. Comfortable, punctual, and
                        professional—exactly what we needed for smooth
                        transportation
                      </p>
                      <div class="d-flex pt-3">
                        <img
                          src={testimonials_3}
                          alt="testimonial"
                          class="testimonial-circle"
                        />
                        <div
                          class="d-flex flex-column justify-content-center ms-3"
                        >
                          <span class="testimonial-client-name"
                            >Emily Davis</span
                          >
                          <span class="testimonial-client-label">Client</span>
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
    {/* <div class="bg-white overflow-hidden">
      <div class="page-size">
        <div class="d-lg-flex justify-content-between align-items-end">
          <div class="col-12 col-lg-6">
            <span class="text-subtitle ms-1 mt-0">FAQS</span>
            <h2 class="my-4">
              Everything You Need to Know About
              <span class="c-main fs-56">Bustion</span>
            </h2>
          </div>
          <div class="col-12 col-lg-5">
            <p class="mb-4 pb-3 mt-5 mt-lg-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
            <a href="faqs.html" class="btn-subtle mb-4 mb-lg-0">More Faqs</a>
          </div>
        </div>
        <div class="container-lg px-0 mt-5">
          <div class="row row-cols-1 row-cols-lg-2 g-1 g-lg-4">
            <div class="col fade-in-up">
              <div class="accordion" id="faqsAccordion">
                <div class="accordion-item">
                  <span class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What services does Bustion offer?
                    </button>
                  </span>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqsAccordion"
                  >
                    <div class="accordion-body">
                      We provide bus charter services for corporate events,
                      school trips, weddings, and airport transfers.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      How do I book a bus?
                    </button>
                  </span>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqsAccordion"
                  >
                    <div class="accordion-body">
                      You can book through our website, call us, or email our
                      customer service team.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      What are your payment options?
                    </button>
                  </span>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#faqsAccordion"
                  >
                    <div class="accordion-body">
                      We accept credit cards, bank transfers, and digital
                      payment platforms.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Can I customize my trip schedule?
                    </button>
                  </span>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#faqsAccordion"
                  >
                    <div class="accordion-body">
                      Yes, we offer flexible scheduling tailored to your
                      specific needs and itinerary.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col fade-in-up delay-1">
              <div class="accordion" id="faqsAccordion2">
                <div class="accordion-item">
                  <span class="accordion-header" id="headingOne2">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne2"
                      aria-expanded="false"
                      aria-controls="collapseOne2"
                    >
                      What safety measures do you follow?
                    </button>
                  </span>
                  <div
                    id="collapseOne2"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne2"
                    data-bs-parent="#faqsAccordion2"
                  >
                    <div class="accordion-body">
                      Our buses are regularly maintained, and all drivers are
                      certified professionals trained in safety protocols.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingThree2">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree2"
                      aria-expanded="false"
                      aria-controls="collapseThree2"
                    >
                      Do your buses have Wi-Fi and other amenities?
                    </button>
                  </span>
                  <div
                    id="collapseThree2"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree2"
                    data-bs-parent="#faqsAccordion2"
                  >
                    <div class="accordion-body">
                      Yes, many of our buses offer Wi-Fi, charging ports, air
                      conditioning, and reclining seats.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingFour2">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour2"
                      aria-expanded="false"
                      aria-controls="collapseFour2"
                    >
                      Is there a cancellation policy?
                    </button>
                  </span>
                  <div
                    id="collapseFour2"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour2"
                    data-bs-parent="#faqsAccordion2"
                  >
                    <div class="accordion-body">
                      Yes, we allow cancellations with a full or partial refund
                      based on our cancellation terms.
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <span class="accordion-header" id="headingFive2">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive2"
                      aria-expanded="false"
                      aria-controls="collapseFive2"
                    >
                      Do you accommodate small groups?
                    </button>
                  </span>
                  <div
                    id="collapseFive2"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive2"
                    data-bs-parent="#faqsAccordion2"
                  >
                    <div class="accordion-body">
                      Yes, we have mini-buses and shuttles perfect for small
                      group travel.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> */}
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
    <UserFooter/>
    </div>
    </>
  )
}

export default ShowContact
