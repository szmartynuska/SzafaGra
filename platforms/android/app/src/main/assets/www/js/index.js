function init() {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
}
const btnLogin = document.getElementById('btnLogin');
const txtEmailLogin = document.getElementById('txtEmailLogin');
const txtPasswordLogin = document.getElementById('txtPasswordLogin');
const btnGoogleLogin = document.getElementById('btnGoogleLogin');
const txtPasswordConfirmRegistration = document.getElementById('txtPasswordConfirmRegistration');
const txtPasswordRegistration = document.getElementById('txtPasswordRegistration');
const txtEmailRegistration = document.getElementById('txtEmailRegistration');
const btnSignUp = document.getElementById('btnSignUp');

// Sign up with email and password
btnSignUp.addEventListener('click', function () {
    const email = txtEmailRegistration.value;
    const password = txtPasswordRegistration.value;
    const passwordConfirm = txtPasswordConfirmRegistration.value;
    alert(password);

    if (password === passwordConfirm) {
        cordova.plugins.firebase.auth.createUserWithEmailAndPassword(email, password).then(function () {
            alert("You sign in!");
            window.location.href = "#login";
        });
    } else {
        alert("Wrong password");
    }

});


//Login with email and password
btnLogin.addEventListener('click', e => {
    const email = txtEmailLogin.value;
    const password = txtPasswordLogin.value;

    cordova.plugins.firebase.auth.signInWithEmailAndPassword(email, password)
        .then(function (userInfo) {
            window.location.href = "#main";

            alert(userInfo);
        });
});









//Mobile navigation
$(document).ready(function () {

    $('.navbar').click(function (event) {
        $('.nav').toggleClass('active');
    });

    /*
    function buttons() {
        var x = document.getElementById("buttons");
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    } */

    $(".btn-slide").click(function () {
        $("#buttons").slideToggle();
    });

});