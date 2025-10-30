/* eslint-disable no-unused-expressions */ 
import { useEffect } from "react";
import "../styles/swiper.css";
// eslint-disable-next-line no-unused-expressions 
import bootstrap from "../lib/js/bootstrap.bundle.min.js";
// eslint-disable-next-line no-unused-expressions
import Swiper from "../lib/js/swiper-bundle.min.js";

export default function CustomScripts() {
  useEffect(() => {
    // ============================
    // Swiper Initializations
    // ============================
    new Swiper(".swiper-container", {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      pagination: { el: ".swiper-pagination", clickable: true },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: { 575: { slidesPerView: 2 }, 992: { slidesPerView: 1 } },
    });

    new Swiper(".more-testimonial-swiper-container", {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      pagination: { el: ".swiper-pagination", clickable: true },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: { 575: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
    });

    new Swiper(".bus-detail-swiper-container", {
      loop: true,
      autoplay: { delay: 3000, disableOnInteraction: false },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      pagination: { el: ".swiper-pagination", clickable: true },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: { 575: { slidesPerView: 2 }, 992: { slidesPerView: 3 } },
    });

    // ============================
    // Video Modal
    // ============================
    const playButton = document.getElementById("playButton");
    const videoModal = document.getElementById("videoModal");
    const modalVideo = document.getElementById("modalVideo");
    const modalClose = document.getElementById("modalClose");

    if (playButton && videoModal && modalVideo && modalClose) {
      playButton.addEventListener("click", () => {
        videoModal.style.display = "flex";
        modalVideo.play();
      });

      modalClose.addEventListener("click", () => {
        videoModal.style.display = "none";
        modalVideo.pause();
      });

      videoModal.addEventListener("click", (e) => {
        if (e.target === videoModal) {
          videoModal.style.display = "none";
          modalVideo.pause();
        }
      });
    }

    // ============================
    // Fade In Animations
    // ============================
    const fadeInElements = document.querySelectorAll(
      ".fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
    );

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.animationPlayState = "running";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    fadeInElements.forEach((el) => {
      el.style.animationPlayState = "paused";
      observer.observe(el);
    });

    // ============================
    // Share Buttons
    // ============================
    const shareLinks = document.querySelectorAll(".share");
    const alertContainer = document.getElementById("alert-container");

    function showAlert(type, message) {
      const alert = document.createElement("div");
      alert.className = `alert alert-${type} alert-dismissible fade show`;
      alert.role = "alert";
      alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      `;
      alertContainer?.appendChild(alert);
      setTimeout(() => {
        alert.classList.remove("show");
        alert.addEventListener("transitionend", () => alert.remove());
      }, 5000);
    }

    shareLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const platform = link.getAttribute("share-to");
        const currentUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent("Check this out!");
        let shareUrl = "";

        switch (platform) {
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            break;
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${shareText}`;
            break;
          case "linkedin":
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
            break;
          case "youtube":
            shareUrl = `https://www.youtube.com/results?search_query=${shareText}`;
            break;
          case "whatsapp":
            shareUrl = `https://api.whatsapp.com/send?text=${shareText} ${currentUrl}`;
            break;
          case "instagram":
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => {
                showAlert(
                  "success",
                  "Link copied! Share this on Instagram by pasting it into a post or story."
                );
              })
              .catch((err) => {
                showAlert("danger", "Failed to copy the link. Please try again.");
                console.error("Clipboard error: ", err);
              });
            return;
          default:
            console.error("Unsupported platform:", platform);
            return;
        }

        window.open(shareUrl, "_blank");
      });
    });

    // ============================
    // Newsletter Form
    // ============================
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const popupMessage = document.getElementById("popupMessage");
        popupMessage.style.display = "block";
        setTimeout(() => {
          popupMessage.style.display = "none";
        }, 3000);
      });
    }

    // ============================
    // Other Form
    // ============================
    // const otherForm = document.getElementById("otherForm");
    // if (otherForm) {
    //   otherForm.addEventListener("submit", (event) => {
    //     event.preventDefault();
    //     const popupMessage = document.getElementById("otherPopupMessage");
    //     popupMessage.style.display = "block";
    //     setTimeout(() => {
    //       popupMessage.style.display = "none";
    //     }, 3000);
    //   });
    // }

    // ============================
    // Dropdown Hover
    // ============================
    document.querySelectorAll(".nav-item.dropdown").forEach((dropdown) => {
      const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
      dropdown.addEventListener("mouseover", () => {
        if (toggle) {
          bootstrap.Dropdown.getOrCreateInstance(toggle).show();
        }
      });
      dropdown.addEventListener("mouseleave", () => {
        if (toggle) {
          bootstrap.Dropdown.getOrCreateInstance(toggle).hide();
        }
      });
    });
      //     // Get the button and the collapsible content
      // const accordionButton = document.getElementById('myButton');
      // const collapsibleContent = document.getElementById('collapse1');

      // // Add a click event listener
      // accordionButton.addEventListener('click', () => {
      //   console.log("abc1245");
      //     collapsibleContent.classList.toggle('show');  
      //     accordionButton.classList.toggle('collapsed');    
      //     //accordionButton.classList.toggle('active-button'); 
      // });
  }, []); // runs once after mount

  return null; // this component only runs scripts, doesn't render anything
}