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
  //définit le name d'input pour savoir quel test passer
  const name = this.getAttribute("name");
  //regexp pour l'email
  const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
  const quantityRegex = /[0-9]{1,2}$/
  switch (name) {
    case "first": //dans le cas du prénom
    case "last":  //ou du nom de famille
      if(this.value.trim().length >= 2) { //si au moins 2 caractères
        this.parentNode.setAttribute("data-error-visible","false"); //pas de message
      }
      else {
        this.parentNode.setAttribute("data-error-visible","true"); //affichage de l'erreur
      }
      break;
      
    case "email":
      if(emailRegex.test(this.value)) {
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;

    case "birthdate":
      if(this.value.length >= 1) {
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "quantity":
      if(quantityRegex.test(this.value) && this.value >= 0) {
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "location":
      if(locationChecked.length === 1) {
        this.parentNode.setAttribute("data-error-visible","false");
      }
      else {
        this.parentNode.setAttribute("data-error-visible","true");
      }
      break;
      
    case "conditions":
      if(this.hasAttribute('required') && this.checked === false) {
        this.parentNode.setAttribute("data-error-visible","true");
      }
      else {
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

  let emptyFieldNbr = 0; //initialiser le compteur des erreurs
  const fields = document.querySelectorAll(".formData > input"); //sélectionner tous les champs
  fields.forEach(field => {
    const type = field.getAttribute("type"); //et pour chacun d'eux, en déterminer le type
    switch (type) {
      case "text":
        if (field.value.length === 0) {
          emptyFieldNbr++; //en cas de champ vide, 1 erreur s'incrémente
        }
      break;
    
      case "email":
        if (field.value.length === 0) {
          emptyFieldNbr++;
        }
      break;
    
      case "date":
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
          emptyFieldNbr++; //si aucun radio n'est choisi, erreur ++
        }
      break;
      
      case "checkbox":
        if(field.hasAttribute('required') && field.checked === false) {
          emptyFieldNbr++; //si un checkbox "required" n'est pas coché --> erreur++
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
    form.setAttribute("validated", "true"); //avec validated "true", le formulaire disparaît et la confirmation s'affiche
  }
  else //sinon...
  {
    submitButton.classList.add("submit-error");//...prévenir de l'erreur avec une classe css et un message descriptif
    if (errorsNbr.length >= 1 && emptyFieldNbr >= 1)
    {
      form.setAttribute("validated", "false");
      submitButton.setAttribute("value", "Il y a "+errorsNbr.length+" erreur(s) à corriger et "+emptyFieldNbr+" champ(s) non rempli(s)");
    }
    else if (errorsNbr.length >= 1)
    {
      form.setAttribute("validated", "false");
      submitButton.setAttribute("value", "Il y a "+errorsNbr.length+" erreur(s) à corriger");
    }

    else if (emptyFieldNbr >= 1)
    {
      form.setAttribute("validated", "false");
      submitButton.setAttribute("value", "Il y a "+emptyFieldNbr+" champ(s) non rempli(s)");
    }
    setTimeout(() => {
      submitButton.classList.remove("submit-error");
      submitButton.setAttribute("value", "C'est parti");
    }, 2000);
  }
}