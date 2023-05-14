function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const formData = document.querySelectorAll(".formData");
const submitButton = document.querySelector(".btn-submit");
const form = document.querySelector("form[name='reserve']");
const dataInput = document.querySelectorAll(".formData > input");
const locationChecked = document.querySelectorAll("input[name='location']:checked");

//input listeners
dataInput.forEach((input) => input.addEventListener("input", validate));

//validation
function validate() {
  //définit le type d'input pour savoir quel test passer
  const type = this.getAttribute("type");
  //regexp pour l'email
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
  switch (type) {
    case "text":
      if(this.value.length >= 2) {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else if(this.value.length === 0) {
        this.parentNode.setAttribute("data-error","Ce champ est obligatoire");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else {
        this.parentNode.setAttribute("data-error","Veuillez entrer au moins 2 caractères");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "email":
      if(emailRegex.test(this.value)) {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else if(this.value.length === 0) {
        this.parentNode.setAttribute("data-error","Ce champ est obligatoire");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else {
        this.parentNode.setAttribute("data-error","Veuillez entrer une adresse e-mail valide");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "number":
      console.log(this.value.length);
      if(isNaN(this.value)) {
        this.parentNode.setAttribute("data-error","Veuillez entrer une valeur numérique");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else if(this.value.length === 0) {
        this.parentNode.setAttribute("data-error","Ce champ est obligatoire");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      break;
      
    case "radio":
      if(locationChecked.length === 1) {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        this.parentNode.setAttribute("data-error","Ce champ est obligatoire");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "checkbox":
      if(this.hasAttribute('required') && this.checked === true) {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else if(this.hasAttribute('required') && this.checked === false) {
        this.parentNode.setAttribute("data-error","Veuillez accepter les termes et conditions");
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else {
        this.parentNode.setAttribute("data-error","");
        this.parentNode.setAttribute("data-error-visible","false");
      }
      break;
  
    default:
      break;
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalClose.forEach((close) => close.addEventListener("click", closeModal));

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

/**JE BLOQUE L'ENVOI DU FORMULAIRE POUR POUVOIR LANCER LA VALIDATION */

/*
// prevent submit event
submitButton.addEventListener("click", preventSubmit);


// prevent submit function
function preventSubmit(event) {
  event.preventDefault();
  validate();
}

function validate() {
  const firstname = document.querySelector("#first").value;
  const lastname = document.querySelector("#last").value;
  const email = document.querySelector("#email").value;
  const birthdate = document.querySelector("#birthdate").value;
  const quantity = document.querySelector("#quantity").value;
  const location = document.querySelector(".checkbox-input[name='location']:checked").value;
  console.log(firstname);
  console.log(lastname);
  console.log(email);
  console.log(birthdate);
  console.log(quantity);
  console.log(location);
  /**IF (CONDITIONS OK) {ENVOYER LE FORMULAIRE VIA JS} */
  /*if (firstname === "azerty")
  {
    form.submit();
    console.log('submit');
  }*/
//}