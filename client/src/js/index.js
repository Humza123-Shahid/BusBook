import Swiper from "../lib/js/swiper-bundle.min.js";

import bootstrap from "../lib/js/bootstrap.bundle.min.js";
window.addEventListener("load", () => {
console.log("✅ custom.js loaded")

var swiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 1,
    },
  },
});
var moreTestimonialSwiper = new Swiper(".more-testimonial-swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});
var busDetailSwiper = new Swiper(".bus-detail-swiper-container", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    575: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playButton");
  const videoModal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalClose = document.getElementById("modalClose");

  if (playButton) {
    playButton.addEventListener("click", function () {
      videoModal.style.display = "flex";
      modalVideo.play();
    });

    modalClose.addEventListener("click", function () {
      videoModal.style.display = "none";
      modalVideo.pause();
    });

    videoModal.addEventListener("click", function (e) {
      if (e.target === videoModal) {
        videoModal.style.display = "none";
        modalVideo.pause();
      }
    });
  }

  // Animation
  const fadeInElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-down, .fade-in-left, .fade-in-right"
  );

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  fadeInElements.forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
  });

  // Share

  const shareLinks = document.querySelectorAll(".share");
  const alertContainer = document.getElementById("alert-container");

  shareLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
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
  function showAlert(type, message) {
    const alert = document.createElement("div");
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = "alert";
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alert);

    setTimeout(() => {
      alert.classList.remove("show");
      alert.addEventListener("transitionend", () => alert.remove());
    }, 5000);
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    document
      .getElementById("newsletterForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const popupMessage = document.getElementById("popupMessage");
        popupMessage.style.display = "block";
        setTimeout(() => {
          popupMessage.style.display = "none";
        }, 3000);
      });
  }

  const otherForm = document.getElementById("otherForm");
  if (otherForm) {
    document
      .getElementById("otherForm")
      .addEventListener("submit", function (event) {
        event.preventDefault();
        const popupMessage = document.getElementById("otherPopupMessage");
        popupMessage.style.display = "block";
        setTimeout(() => {
          popupMessage.style.display = "none";
        }, 3000);
      });
  }
});

document.querySelectorAll(".nav-item.dropdown").forEach(function (dropdown) {
  dropdown.addEventListener("mouseover", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.show();
    }
  });

  dropdown.addEventListener("mouseleave", function () {
    const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]');
    if (toggle) {
      const instance = bootstrap.Dropdown.getOrCreateInstance(toggle);
      instance.hide();
    }
  });
});
// // Get the button and the collapsible content
// const accordionButton = document.getElementById('myButton');
// const collapsibleContent = document.getElementById('collapse1');

// // Add a click event listener
// accordionButton.addEventListener('click', () => {
//   console.log("abc1245");
//     collapsibleContent.classList.toggle('show');

//     //accordionButton.classList.toggle('active-button'); 
// });
});
