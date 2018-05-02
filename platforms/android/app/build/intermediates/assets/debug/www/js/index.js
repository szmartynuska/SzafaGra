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

    if (password != "" && email != "") {
        cordova.plugins.firebase.auth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log("user id " + user.uid); //działa
                window.location.href = "#main";

            }).catch(function (error) {
                if (error == "There is no user record corresponding to this identifier. The user may have been deleted.") {
                    alert("Podano niewłaściwy mail");
                }
                else if (error == "The password is invalid or the user does not have a password.") {
                    alert("Niewłaściwe hasło");
                }
                else if (error == "The email address is badly formatted.") {
                    alert("Zły format maila");
                }
            });
    }
    else {
        alert("Uzupełnij wszystkie pola");
    }
});


//Login with Google
btnGoogleLogin.addEventListener('click', e => {
    console.log(firebase);
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    // console.log(firebase.auth().signInWithRedirect(provider));
    firebase.auth().signInWithRedirect(provider)
        .then(function () {
            const result = firebase.auth().getRedirectResult();
            console.log(result);
            return result;

        }).then(function (result) {
            alert("Coś");
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log('Hello');
            // console.log(user);
            window.location.href = "#main";
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
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