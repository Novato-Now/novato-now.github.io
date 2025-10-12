

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
