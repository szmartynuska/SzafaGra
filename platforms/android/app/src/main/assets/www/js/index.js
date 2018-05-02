var user;
var wardrobe;
var category;


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
const btnFacebookLogin = document.getElementById('btnFacebookLogin');
const btnLogOut = document.getElementById('btnLogOut');

// Sign up with email and password
btnSignUp.addEventListener('click', function () {
    const email = txtEmailRegistration.value;
    const password = txtPasswordRegistration.value;
    const passwordConfirm = txtPasswordConfirmRegistration.value;


    if (password == "" || passwordConfirm == "" || email == "") {
        alert("Fill in all fields");
        return;
    }

    if (password === passwordConfirm) {
        cordova.plugins.firebase.auth.createUserWithEmailAndPassword(email, password).then(function () {

            alert("Account created");
            window.location.href = "#login";


        }).catch(function (error) {
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

    if (password == "" || email == "") {
        alert("Fill in all fields");
        return;
    }
    cordova.plugins.firebase.auth.signInWithEmailAndPassword(email, password)
        .then(function (result) {
        	user = result.uid;
            window.location.href = "#main";             
        }).catch(function (error) {
            alert(error);
        });

});


//Login with Google
btnGoogleLogin.addEventListener('click', e => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider)
        .then(function () {
            return firebase.auth().getRedirectResult();;

        }).then(function (result) {
            // This gives you a Google Access Token.
            // You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // console.log(user);
            window.location.href = "#main";
            // ...
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
});

//Login with Facebook
btnFacebookLogin.addEventListener('click', e => {
    var provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider);
    firebase.auth().signInWithRedirect(provider).then(function () {
        return firebase.auth().getRedirectResult()
            .then(function (result) {
                if (result.credential) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    // ...
                }
                // The signed-in user info.
                var user = result.user;
                window.location.href = "#main";
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    })

});

//Sign out
btnLogOut.addEventListener('click', e => {
    const sign = firebase.auth().signOut();
    console.log(sign);
    sign.then(function () {
        // Sign-out successful.
        window.location.href = "#login";
    }).catch(function (error) {
        // An error happened.
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


        wardrobe  = "Wardrobe " + img_index;
       
        $('.menu-wardrobe').append(wardrobe);

        img_index++;

    });

    $('#war-nr').append(img_index);

    $('#wear span').click(function () {
      	 
      	category = $(this).attr("id");
      	
    });

    $('#addImage').click(function () { // dodawanie zdjecia, wysyłka do bazy? 
        
      console.log(user);
      console.log(wardrobe);
      console.log(category);
    });

});