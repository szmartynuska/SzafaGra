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

    if(password == "" || passwordConfirm == "" || email == "")
    {
        alert("Fill in all fields");
        return;
    }

    if ( password === passwordConfirm) {
        cordova.plugins.firebase.auth.createUserWithEmailAndPassword(email, password).then(function () {
            alert("Account created");
            window.location.href = "#login";
        }).catch(function(error) {
                alert(error);          
        });
    } else {
        alert("Wrong password");
    }

});


//Login with email and password
btnLogin.addEventListener('click', e => {
    const email = txtEmailLogin.value;
    const password = txtPasswordLogin.value;

    if(password == "" || email == "")
    {
        alert("Fill in all fields");
        return;
    }

    cordova.plugins.firebase.auth.signInWithEmailAndPassword(email, password)
    .then(function (user) {
        console.log("user id " + user.uid); //działa
        window.location.href = "#main";

    }).catch(function(error) {
            alert(error); 
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

    var img_index = 1;


    $('.btn-war').click(function () {
        var img = $('<img />').attr({
            'id': 'myImage' + img_index,
            'src': 'img/wardrobe.svg',
            'class': 'myWardrobe',
            'width': 96.55,
            'height': 100,
            'href': '#wardrobe-cats'
        }).appendTo('.menu-wardrobe');

        $("#myImage" + img_index).wrap($('<a>', {
            href: '#wardrobe-cats'
        }));


        var someText = "Wardrobe " + img_index;
        $('.menu-wardrobe').append(someText);

        img_index++;

    });

    $('#war-nr').append(img_index);

});