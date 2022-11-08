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

//console.log(img)

let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;
let regExpEmail = /^[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
let regExExt = /\.(jpg|jpeg|png|jfif|gif|webp)$/
let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;


password.addEventListener('keyup', (e) => {
    console.log("El tecleo")
    console.log(e.target.value)
})


name.addEventListener('blur', (e) => {

    let value = e.target.value;

    // Validamos que no llegue vacio
    // Validamos que el no ingrese datos numericos

    switch (true) {
        case !value.trim():
            $('#errorName').innerHTML = "El nombre es obligatorio"
            break;
        case !regExAlpha.test(value):
            $('#errorName').innerHTML = "El nombre no debe contener datos numericos"
            break;
        default:
            $('#errorName').innerHTML = ""
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
            $('#errorLastName').innerHTML = "El apellido es obligatorio"
            break;
        case !regExAlpha.test(value):
            $('#errorLastName').innerHTML = "El apellido no debe contener datos numericos"
            break;
        default:
            $('#errorLastName').innerHTML = ""
            break;
    }

})










}



/* 
window.addEventListener('load', () => {

})*/