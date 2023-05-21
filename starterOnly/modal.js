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

//validation
function validate(field) {
  //1-Vérifier si les champs sont correctement remplis
  //définit le name d'input pour savoir quel test passer
  const name = field.getAttribute("name");
  //regexp pour l'email et la quantité
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  const quantityRegex = /[0-9]{1,2}$/
  switch (name) {
    case "first": //dans le cas du prénom
    case "last":  //ou du nom de famille
      if(field.value.trim().length >= 2) { //si au moins 2 caractères non vides
        field.parentNode.setAttribute("data-error-visible","false"); //pas de message
      }
      else {
        field.parentNode.setAttribute("data-error-visible","true"); //affichage de l'erreur
      }
      break;
      
    case "email":
      if(emailRegex.test(field.value)) {
        field.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        field.parentNode.setAttribute("data-error-visible","true");
      }
      break;

    case "birthdate":
      if(field.value.length >= 1) {
        field.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        field.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "quantity":
      if(quantityRegex.test(field.value) && field.value >= 0) {
        field.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        field.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "location":
      if(locationChecked.length === 1) {
        field.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        field.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "conditions":
      if(field.hasAttribute('required') && field.checked === false) {
        field.parentNode.setAttribute("data-error-visible","true");
      }
      else {
        field.parentNode.setAttribute("data-error-visible","false");
      }
      break;
  
    default:
      break;
  }
  //2-Trouver le nombre d'erreurs
  const errorsNbr = document.querySelectorAll(".formData[data-error-visible='true']");
  /**IF (CONDITIONS OK) {Envoyer la page de confirmation} */
  if (errorsNbr.length === 0)
  {
    form.setAttribute("validated", "true"); //avec validated "true", le formulaire disparaît et la confirmation s'affiche
  }
  else //sinon...
  {
    submitButton.classList.add("submit-error");//...prévenir de l'erreur avec une classe css et un message descriptif
    form.setAttribute("validated", "false"); //avec validated = false, le formulaire ne disparaît pas
    submitButton.setAttribute("value", "Il y a "+errorsNbr.length+" erreur(s) à corriger"); //message à afficher
    setTimeout(() => {//au bout de 2 secondes, le message sur le bouton submit disparaît
      submitButton.classList.remove("submit-error");
      submitButton.setAttribute("value", "C'est parti");
    }, 2000);
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

/**JE BLOQUE L'ENVOI DU FORMULAIRE POUR POUVOIR AFFICHER LA CONFIRMATION */

// prevent submit event
submitButton.addEventListener("click", preventSubmit);

// prevent submit function
function preventSubmit(event) {
  event.preventDefault();
  dataInput.forEach((field) => validate(field));
}