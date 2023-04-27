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
}