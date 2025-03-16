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

// Name validation
function validateName() {
    var name = document.getElementById('name').value.trim(); // Trim to remove extra spaces
    var nameError = document.getElementById('nameError');
    var nameRegex = /^[A-Za-z\s]+$/;
  
    if (!nameRegex.test(name)) {
      nameError.textContent = "Please enter a valid name. Only letters and spaces are allowed.";
      console.log('Invalid name entered');
    } else {
      nameError.textContent = '';
    }
  }
  

// Email validation
function validateEmail() {
    var email = document.getElementById('email').value.trim(); // Trim to handle extra spaces
    var emailError = document.getElementById('mailError');
    var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/;
  
    if (!emailRegex.test(email)) {
      emailError.textContent = "Please enter a valid email address. Ensure it ends with .com, .org, .net, .edu, or .gov.";
    } else {
      emailError.textContent = '';
    }
  }
  

  