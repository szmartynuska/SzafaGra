var user;
var wardrobe;


function init() {
    document.addEventListener('deviceready', onDeviceReady, false);
}

function onDeviceReady() {
    console.log(navigator.camera);
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
            return firebase.auth().getRedirectResult();
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
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
        .then(function () {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithRedirect(provider).then(function () {
                return firebase.auth().getRedirectResult();
            }).then(function (result) {
                if (result.credential) {
                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var token = result.credential.accessToken;
                    window.location.href = "#main";
                    // ...
                }
                // The signed-in user info.
                var user = result.user;
            }).catch(function (error) {
                // Handle Errors here.
                if (error.code === "auth/account-exists-with-different-credential") {
                    alert("This email is already used!");
                }
            });
        });
});


//Sign out
function logOut() {
    firebase.auth().signOut()
        .then(function () {
            // Sign-out successful.
            window.location.href = "#login";
        }).catch(function (error) {
            console.log(error.message);
        });
}



//Take picture from gallery
function openFilePicker(selection) {

    const srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
    const options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        window.location.href = "#liamneeson";
        displayImage(imageUri);
    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function setOptions(srcType) {
    const options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}
function openCamera(selection) {

    const srcType = Camera.PictureSourceType.CAMERA;
    const options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        window.location.href = "#liamneeson";
        displayImage(imageUri);
        // You may choose to copy the picture, save it somewhere, or upload.

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}
function displayImage(imgUri) {

    const imgContainer = document.getElementById('containerImg');
    const img = document.createElement("img");
    img.src = imgUri;
    img.style.width = "100%";
    containerImg.appendChild(img);
}


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
        $("#btnFloatingAction").slideToggle();
    });

    let img_index = 1;


    $('.btn-war').click(function () {
        const img = $('<img />').attr({
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



        wardrobe = "Wardrobe " + img_index;
        $('.menu-wardrobe').append(wardrobe);

        img_index++;

    });

    $('#war-nr').append(img_index);

    $('#addImage').click(function () { // dodawanie zdjecia, wysyłka do bazy? 

        console.log(user);
        console.log(wardrobe);
       
    });


    //dodawanie list z tagami do zdjecia

    var target = $("div#target");
    var n = function () {
        return $("div.col-xs-2").length;
    };
    var newInput = function () {
        var div = $("<div/>", {
            "class": "input-group"
        });
        var input = $("<select><option>Select</option><option>1</option><option> 2</option></select>", {
            "class": "form-control",
            "name": "",

        });
        var span = $("<span/>", {
            "class": "input-group-btn"
        });
        var button = $("<button/>", {
            "class": "removeBtn btn btn-sm btn-link",
            type: "button",
            id: n()
        });
        var glyph = $("<span/>", {
            "class": "fas fa-times"
        });
        var col = $("<div/>", {
            "class": "form-group col-xs-2",
            id: "newInput-" + n()
        });

        $(glyph).appendTo(button);
        $(button).appendTo(span);
        $(input).appendTo(div);
        $(span).appendTo(div);
        $(div).appendTo(col);
        return col;
    };

    $('button#add').on('click', function () {
        $(newInput()).appendTo(target);
    });

    $('#target').on('click', 'button', function () {
        var target = $("#target").find("#newInput-" + this.id);
        $(target).remove();
    });



   // get data for chart
    var dateUTC = [];
    var temp = [];
    var daysOfWeek;
    $("#getWeather").click(function () {
        var city = $("#city").val();
        
        var key = '33dbe3b930c23ad2c7a0630b49f3e440';
        var url = "https://api.openweathermap.org/data/2.5/forecast";

        $.get(url, { q: city, appid: key, units: 'metric' }, function (data) {

            for (let i = 0; i < data.list.length; i += 8) {
                dateUTC.push(data.list[i].dt);
                temp.push(parseInt(data.list[i].main.temp));

            }

            if (dateUTC.length == 5 && temp.length == 5) {
                daysOfWeek = getDayOfWeek(dateUTC);
                plot(daysOfWeek, temp);
            }

        }, 'json');

    });
    // convert UNIX timestamp to day of the week
    function getDayOfWeek(dateUTC){
        var daysOfWeek = [];
        var days = ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'];
        for(let i = 0; i < dateUTC.length; i++)
        {
            var date = new Date();
            date.setTime(dateUTC[i]*1000); // javascript timestamps are in milliseconds
            daysOfWeek.push( days[date.getUTCDay()] );
        }

        return daysOfWeek;
    };

    // chart    
    function plot(date, temp) {

        var ctx = document.getElementById('chart').getContext("2d");
       
        var myChart = new Chart(ctx, {
            
            type: 'line',
            data: {
                labels: [date[0], date[1], date[2], date[3], date[4]],
                datasets: [{
                    label: "Temperature",
                    borderColor: "#80b6f4",
                    pointBorderColor: "#80b6f4",
                    pointBackgroundColor: "#80b6f4",
                    pointHoverBackgroundColor: "#80b6f4",
                    pointHoverBorderColor: "#80b6f4",
                    pointBorderWidth: 10,
                    pointHoverRadius: 10,
                    pointHoverBorderWidth: 1,
                    pointRadius: 3,
                    fill: false,
                    borderWidth: 4,
                    data: [temp[0], temp[1], temp[2], temp[3], temp[4]]
                }]
            },
            options: {
               
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold",
                            beginAtZero: true,
                            maxTicksLimit: 5,
                            padding: 10
                        },
                        gridLines: {
                            drawTicks: false,
                            display: false
                        }

                    }],
                    xAxes: [{
                        gridLines: {
                            zeroLineColor: "transparent"
                        },
                        ticks: {
                            padding: 10,
                            fontColor: "rgba(0,0,0,0.5)",
                            fontStyle: "bold"
                        }
                    }]
                }
            }
        });

    };

});