window.onload = () => {

//console.log('Hola!')

// document.querySelector('footer');
// document.querySelectorAll('li.item');
// document.getElementById('id')

let $ = (tag) => document.querySelector(tag);
let $$ = (tag) => document.querySelectorAll(tag);

let name = $('#name');
let lastName = $('#last_name');
let email = $('#email')
let password = $('#password')
let password2 = $('#password2')
let img = $("#image")
let form = $("#form")
let errorSubmit = $('#errorSubmit')

//console.log(img)

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
let regExpEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
let regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/
let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;

/*
password.addEventListener('keyup', (e) => {
    console.log("El tecleo")
    console.log(e.target.value)
})*/

let validationsErrors = false;

name.addEventListener('blur', (e) => {

    let value = e.target.value;

    // Validamos que no llegue vacio
    // Validamos que el no ingrese datos numericos

    switch (true) {
        case !value.trim():
            $('#errorName').innerHTML = "El nombre es obligatorio"
            name.classList.add('invalid')
            validationsErrors = true;
            break;
        case !regExAlpha.test(value):
            $('#errorName').innerHTML = "El nombre no debe contener datos numericos"
            name.classList.add('invalid')
            validationsErrors = true;
            break;
        default:
            $('#errorName').innerHTML = ""
            validationsErrors = false;
            name.classList.remove('invalid');
            name.classList.add('valid')
            break;
    }

})

lastName.addEventListener('blur', (e) => {

    let value = e.target.value;
    console.log(value)

    // Validamos que no llegue vacio
    // Validamos que el no ingrese datos numericos

    switch (true) {
        case !value.trim():
            lastName.classList.add('invalid')
            $('#errorLastName').innerHTML = "El apellido es obligatorio"
            validationsErrors = true;
            break;
        case !regExAlpha.test(value):
            lastName.classList.add('invalid')
            $('#errorLastName').innerHTML = "El apellido no debe contener datos numericos"
            validationsErrors = true;
            break;
        default:
            $('#errorLastName').innerHTML = ""
            lastName.classList.remove('invalid');
            lastName.classList.add('valid')
            validationsErrors = false
            break;
    }

})


email.addEventListener('blur', (e) => {

    let value = e.target.value;

    switch (true) {
        case !value.trim():
            email.classList.add('invalid')
            $('#errorEmail').innerHTML = "El email es obligatorio"
            validationsErrors = true;
            break;
        case !regExpEmail.test(value):
            email.classList.add('invalid')
            $('#errorEmail').innerHTML = "Debe ingresar un email valido"
            validationsErrors = true;
            break;
        default:
            $('#errorEmail').innerHTML = ""
            email.classList.remove('invalid');
            email.classList.add('valid')
            validationsErrors = false
            break;
    }
})

password.addEventListener("blur", (e) => {
    let value = e.target.value;
    switch (true) {
        case !value.trim():
            $("#errorPassword1").innerHTML = `La constraseña es requerida`
            password.classList.add('invalid')
            validationsErrors = true;
            break;
        case !regExPass.test(password.value):
            $("#errorPassword1").innerHTML = `"La contraseña debe tener entre 6 y 12 caracteres y debe contener una mayuscula, una minuscula y un numero"`
            password.classList.add('invalid')
            validationsErrors = true;
            break;
        default:
            $("#errorPassword1").innerHTML = ""
            password.classList.remove('invalid')
            password.classList.add('valid')
            validationsErrors = false;
            break;
    }
})
password2.addEventListener("blur", (e) => {
    let value = e.target.value;
    switch (true) {
        case !value.trim():
            $("#errorPassword2").innerHTML = `Debe confirmar la contraseña`
            password2.classList.add('invalid')
            validationsErrors = true;
            break;
        case password.value != value:
            $("#errorPassword2").innerHTML = `Las constraseñas no coinciden`
            password2.classList.add('invalid')
            validationsErrors = true;
            break;
        default:
            $("#errorPassword2").innerHTML = ""
            password2.classList.remove('invalid')
            password2.classList.add('valid')
            validationsErrors = false
            break;
    }
})
img.addEventListener('change', function() {
    switch (true) {
        case !regExExt.exec(img.value):
            $('#errorImage').innerHTML = "Solo se permite ingresar una imagen valida fomato (jpg|jpeg|png|jfif|gif|webp)"
            img.classList.add('invalid')
            validationsErrors = true;
            break;
        default:
            $('#errorImage').innerHTML = ""
            img.classList.remove('invalid')
            img.classList.add('valid')
            validationsErrors = false
            break;
    }
})


form.addEventListener('submit', function(e) {
    e.preventDefault()

    console.log(validationsErrors)
    console.log(this.elements)

    let elementsForm = this.elements;
    let error = false

    for (let i = 0; i < elementsForm.length -1; i++) {
       
        console.log('ingreso')
        if(elementsForm[i].value == "" && elementsForm[i].name != 'image')    {
            elementsForm[i].classList.add('invalid')
            errorSubmit.innerHTML = 'Los campos señalados son obligatorios'
            error = true
        }
        if (!error && !validationsErrors) {
            form.submit()
        }
    }

})








}



/* 
window.addEventListener('load', () => {

})*/