/* Script para barra de navegación */
/* const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.menu');

menuIcon.addEventListener('click', () => {
  menu.classList.toggle('show-menu');
}); */
/* Script para botón ver más */
document.getElementById("view-more").addEventListener("click", function() {
  var hiddenText = document.getElementById("hidden-text");
  hiddenText.classList.toggle("hidden");
  if (hiddenText.classList.contains("hidden")) {
    this.textContent = "Ver más";
  } else {
    this.textContent = "Ver menos";
  }
});
/*Llamando todos los inputs*/
const inputs = document.querySelectorAll("input,textarea");

inputs.forEach((input) => {

    input.addEventListener("keyup",validarFormulario);
    input.addEventListener("blur",validarFormulario);
    input.addEventListener("focus",(input) =>{
        expresionesRegulares(input.target);
    })

    const formulario = document.querySelector(".formulario");
    const btn = document.querySelector(".enviar");
    btn.disabled = true;

    formulario.addEventListener("input",() => {
        btn.disabled = !formulario.checkValidity();
    })
});
/*Funcion textarea*/
document.querySelector(".textarea").addEventListener("input",autoheight,false);

/* Formulario */
const tipoDeInput = input.dataset.tipo;
    const reg = expresiones[tipoDeInput];
    input.setAttribute("pattern",reg);


const expresiones = {
    nombreCompleto: "^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$",

    email: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}",

    asunto: "^[s\\S ][^<>${}]{0,100}",

    mensaje: "[s\\S]{0,500}",
}
function autoheight(){

  this.style.height = this.scrollHeight + 'px';
}

/* Validaciones */
const validarFormulario = (inputTipo) => {
  const input = inputTipo.target;
  const tipoDeInput = input.dataset.tipo;

  if(input.validity.valid){
      input.parentElement.classList.remove("formulario__grupo-incorrecto");
      input.parentElement.classList.add("formulario__grupo-correcto");
      input.parentElement.querySelector(".formulario__validacion-estado").classList.remove("fa-circle-xmark");
      input.parentElement.querySelector(".formulario__validacion-estado").classList.add("fa-circle-check");
      input.parentElement.querySelector(".formulario__input-error").classList.remove("formulario__input-error-activo");
  }else{
      input.parentElement.classList.add("formulario__grupo-incorrecto");
      input.parentElement.classList.remove("formulario__grupo-correcto");
      input.parentElement.querySelector(".formulario__validacion-estado").classList.remove("fa-circle-check");
      input.parentElement.querySelector(".formulario__validacion-estado").classList.add("fa-circle-xmark");
      input.parentElement.querySelector(".formulario__input-error").innerHTML = mostrarMensajeDeError(tipoDeInput,input);
  }

}

const tipoDeErrores =[
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
]

const mensajesDeError = {
  nombreCompleto: {
      valueMissing: "Ingrese su nombre por favor",
      patternMismatch: "Solo se acepta letras",
  },
  email: {
      valueMissing: "Ingrese algun correo electrónico",
      typeMismatch: "El correo no es válido",
      patternMismatch: "Se permite ._%+-,no letras mayúsculas",
  },
  asunto: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "Máximo se aceptan 50 caracteres",
  },
  mensaje: {
      valueMissing: "Este campo no puede estar vacio",
      patternMismatch: "Máximo se aceptan 300 caracteres",
  },
}

function mostrarMensajeDeError(tipoDeInput,input){
  let mensaje = "";
  tipoDeErrores.forEach(error => {
      if(input.validity[error]){
          console.log(tipoDeInput,error);
          console.log(input.validity[error]);
          console.log(mensajesDeError[tipoDeInput][error]);
          mensaje = mensajesDeError[tipoDeInput][error];
      }
  })
  return mensaje
}