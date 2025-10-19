

// Footer component
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Error loading footer:', error));


"use strict"

const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".navigation");

navToggle.addEventListener("click", () => {
    navigation.classList.toggle("show-nav");
    navToggle.classList.toggle("rotate");
})

var acc = document.getElementsByClassName("accordion");
      var i;
    //   var arrowImg = document.createElementID("toggle1");
      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active1");
          this.parentElement.classList.toggle("active");

          var pannel = this.nextElementSibling;

          if (pannel.style.display === "block") {
            pannel.style.display = "none";
          } else {
            pannel.style.display = "block";
            // arrowImg.src = "Assets/arrow-up.svg";
          }
        });
      }
  


      document.getElementById('getApp').addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
    
        // App store URLs
        const iosURL = "https://www.apple.com/in/app-store/";
        const androidURL = "https://play.google.com/store/games?hl=en_IN";
    
        // Detect platform
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
        if (/android/i.test(userAgent)) {
          // Android device
          window.location.href = androidURL;
        } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          // iOS device
          window.location.href = iosURL;
        } else {
          // Laptop/Desktop
          window.location.href = androidURL;
        }
      });



      // Carosel

      document.addEventListener("DOMContentLoaded", () => {
        const container = document.getElementById("heroCarousel");
        if (!container) return;
    
        const track = container.querySelector(".carousel-track");
        const items = Array.from(container.querySelectorAll(".carousel-item"));
        const prevBtn = container.querySelector(".carousel-control.prev");
        const nextBtn = container.querySelector(".carousel-control.next");
    
        if (!track || items.length === 0) return;
    
        let index = 0;
        const maxIndex = items.length - 1;
    
        // Ensure correct starting position / active class
        function update() {
          track.style.transform = `translateX(-${index * 100}%)`;
          items.forEach((it, i) => it.classList.toggle("active", i === index));
          // disable buttons at edges (optional)
          if (prevBtn) prevBtn.disabled = index === 0;
          if (nextBtn) nextBtn.disabled = index === maxIndex;
        }
        update();
    
        // Defensive slideTo
        function slideTo(newIndex) {
          if (newIndex < 0) newIndex = 0;
          if (newIndex > maxIndex) newIndex = maxIndex;
          if (newIndex === index) return;
          index = newIndex;
          update();
        }
    
        // Buttons
        if (prevBtn) prevBtn.addEventListener("click", () => slideTo(index - 1));
        if (nextBtn) nextBtn.addEventListener("click", () => slideTo(index + 1));
    
        // Touch + mouse drag support
        let startX = 0;
        let currentX = 0;
        let dragging = false;
        const threshold = 50; // px required to trigger slide
    
        function pointerDown(x) {
          dragging = true;
          startX = x;
          currentX = x;
          track.style.transition = "none";
        }
    
        function pointerMove(x) {
          if (!dragging) return;
          currentX = x;
          const delta = currentX - startX;
          // show partial translate while dragging for a natural feel
          track.style.transform = `translateX(calc(-${index * 100}% + ${delta}px))`;
        }
    
        function pointerUp() {
          if (!dragging) return;
          dragging = false;
          const delta = currentX - startX;
          track.style.transition = ""; // restore CSS transition
          if (delta < -threshold && index < maxIndex) slideTo(index + 1);
          else if (delta > threshold && index > 0) slideTo(index - 1);
          else update(); // snap back
        }
    
        // touch events
        track.addEventListener("touchstart", (e) => pointerDown(e.touches[0].clientX), { passive: true });
        track.addEventListener("touchmove", (e) => pointerMove(e.touches[0].clientX), { passive: true });
        track.addEventListener("touchend", () => pointerUp());
    
        // mouse events for desktop testing
        track.addEventListener("mousedown", (e) => { e.preventDefault(); pointerDown(e.clientX); });
        window.addEventListener("mousemove", (e) => pointerMove(e.clientX));
        window.addEventListener("mouseup", () => pointerUp());
    
        // Optional: keyboard arrows
        container.addEventListener("keydown", (e) => {
          if (e.key === "ArrowLeft") slideTo(index - 1);
          if (e.key === "ArrowRight") slideTo(index + 1);
        });
    
        // make container focusable for keyboard
        container.tabIndex = 0;
      });