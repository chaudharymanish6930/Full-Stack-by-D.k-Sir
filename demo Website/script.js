// Button Alert
function showMessage(){
    alert("Our product page will launch soon!");
}

// Form Validation
function validateForm(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    if(name === "" || email === "" || message === ""){
        alert("Please fill all fields!");
        return false;
    }

    alert("Message Sent Successfully!");
    return true;
}

// Mobile Menu Toggle
const toggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(toggle){
    toggle.addEventListener("click", ()=>{
        navLinks.classList.toggle("active");
    });
}