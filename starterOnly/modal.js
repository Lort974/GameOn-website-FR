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
  //AFFICHAGE DE LA PHRASE DE VALIDATION DES INPUTS
  //on supprime d'abord la phrase existante :
  //1-définir l'ID de la phrase
  const inputID = this.getAttribute("id");
  const validatorID = inputID+"-validator";
  //2-la sélectionner :
  const exValidator = document.getElementById(validatorID);
  //3-la supprimer si elle existe
  if (exValidator != null) {
    document.getElementById(validatorID).remove();
  }
  //on crée ensuite la nouvelle :
  let p = document.createElement('p');
  this.parentNode.appendChild(p);
  //on lui ajoute une classe et un id
  const newValidator = document.querySelector(".formData > p");
  newValidator.classList.add("validator");
  newValidator.setAttribute("id",validatorID);
  switch (type) {
    case "text":
      if(this.value.length >= 2) {
        document.getElementById(validatorID).remove();
      }
      else if(this.value.length === 0) {
        p.innerHTML = "Ce champ est obligatoire";
      }
      else {
        p.innerHTML = "Veuillez entrer au moins 2 caractères";
      }
      break;
      
    case "email":
      if(emailRegex.test(this.value)) {
        document.getElementById(validatorID).remove();
      }
      else if(this.value.length === 0) {
        p.innerHTML = "Ce champ est obligatoire";
      }
      else {
        p.innerHTML = "Veuillez entrer une adresse e-mail valide";
      }
      break;
      
    case "number":
      console.log(this.value.length);
      if(isNaN(this.value)) {
        p.innerHTML = "Veuillez entrer une valeur numérique";
      }
      else if(this.value.length === 0) {
        p.innerHTML = "Ce champ est obligatoire";
      }
      else {
        document.getElementById(validatorID).remove();
      }
      break;
      
    case "radio":
      if(locationChecked.length === 1) {
        document.getElementById(validatorID).remove();
      }
      else {
        p.innerHTML = "Veuillez choisir une option";
      }
      break;
      
    case "checkbox":
      if(this.hasAttribute('required') && this.checked === true) {
        document.getElementById(validatorID).remove();
      }
      else if(this.hasAttribute('required') && this.checked === false) {
        p.innerHTML = "Veuillez accepter les termes et conditions";
      }
      else {
        document.getElementById(validatorID).remove();
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