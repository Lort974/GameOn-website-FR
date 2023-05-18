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

/**JE BLOQUE L'ENVOI DU FORMULAIRE POUR POUVOIR AFFICHER LA CONFIRMATION */


// prevent submit event
submitButton.addEventListener("click", preventSubmit);

// prevent submit function
function preventSubmit(event) {
  event.preventDefault();
  confirm();
}

function confirm() {
  //1-Vérifier que les champs soient remplis
  //1.1-Les textes (text, email, number)

  let emptyFieldNbr = 0;
  const fields = document.querySelectorAll(".formData > input");
  fields.forEach(field => {
    const type = field.getAttribute("type");
    switch (type) {
      case "text":
        if (field.value.length === 0) {
          emptyFieldNbr++;
        }
      break;
    
      case "email":
        if (field.value.length === 0) {
          emptyFieldNbr++;
        }
      break;

      case "number":
        if (field.value.length === 0) {
          emptyFieldNbr++;
        }
      break;
      
      case "radio":
        if(locationChecked.length === 0) {
          emptyFieldNbr++;
        }
      break;
      
      case "checkbox":
        if(field.hasAttribute('required') && field.checked === false) {
          emptyFieldNbr++;
        }
      break;

      default:
        break;
    }
  });
  //2-Trouver le nombre d'erreurs
  const errorsNbr = document.querySelectorAll(".formData[data-error-visible='true']");
  /**IF (CONDITIONS OK) {Envoyer la page de confirmation} */
  if (errorsNbr.length === 0 && emptyFieldNbr === 0)
  {
    form.setAttribute("validated", "true");
  }
  else {
    form.setAttribute("validated", "false");
    console.log("il y a "+errorsNbr.length+" erreur(s) et "+emptyFieldNbr+" champ(s) non rempli(s)");
  }
}