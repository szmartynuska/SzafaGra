
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
const txtEmailReset = document.getElementById('txtEmailReset');
const btnSendPass = document.getElementById('btnSendPass');
const btnAcceptImage = document.getElementById('btnAcceptImage');
var wardrobe;
var category;
var warName;
var selectedCategory;
var selectedWeather;
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
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
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
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (result) {
            window.location.href = "#main";
            loadWardrobes();
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
            window.location.href = "#main";
            loadWardrobes();
        }).catch(function (error) {
            alert(error.message);

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
                    window.location.href = "#main";
                    loadWardrobes();
                }
                var user = result.user;
            }).catch(function (error) {
                if (error.code === "auth/account-exists-with-different-credential") {
                    alert("This email is already used!");
                }
            });
        });
});

// Reset password
btnSendPass.addEventListener('click', e => {
    const email = txtEmailReset.value;
    var auth = firebase.auth();
    if (email == "") {
        alert("Fill in all fields");
        return 0;
    }
    auth.sendPasswordResetEmail(email).then(function () {
        alert("email sent");
    }).catch(function (error) {
        alert(error);
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
        //uploadToStorage(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

function openCamera(selection) {

    const srcType = Camera.PictureSourceType.CAMERA;
    const options = setOptions(srcType);

    navigator.camera.getPicture(function cameraSuccess(imageUri) {
        window.location.href = "#liamneeson";
        displayImage(imageUri);
        //uploadToStorage(imageUri);

    }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

    }, options);
}

// Option for openFilePicker() and openCamera()
function setOptions(srcType) {
    const options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    }
    return options;
}

// Show image in activity
function displayImage(imgUri) {
    const imgContainer = document.getElementById('containerImg');
    if (document.getElementById('addedImg') == null) {
        const img = document.createElement("img");
        img.id = "addedImg";
        img.src = 'data:image/png;base64,' + imgUri;
        img.style.width = "100%";
        containerImg.appendChild(img);
    } else {
        document.getElementById('addedImg').src = 'data:image/png;base64,' + imgUri;
    }
}

function setWardrobeName() {
    var name = prompt("Please enter wardrobe name, 10 characters max", "Ciuszki");
    if (name == '' || name.length > 10) {
        alert("Enter valid name!");
        return;
    }
    //console.log(warName);
    warName = name;
}
function uploadToDatabase(downloadURL) {
    var minTemp = $('#range-from').val();
    var maxTemp = $('#range-to').val();
    var postKey = firebase.database().ref('Users/' + getCurrentUser().uid + '/' + wardrobe + '/' + selectedCategory + '/').push().key;
    var updates = {};
    var postData = {
        url: downloadURL,
        //category: selectedCategory, // nwm czy to nie będzie potrzebne w tym miejscu do losowania??
        minTemp: minTemp,
        maxTemp: maxTemp,
        weather: selectedWeather
    };
    updates['Users/' + getCurrentUser().uid + '/' + wardrobe + '/' + selectedCategory + '/' + postKey] = postData;
    firebase.database().ref().update(updates);
    alert("successful send!");
}

// Takes the date and changes it to a unique name 
function uniqueNameFile() {
    const date = new Date();
    return date.getTime().toString()
}

// takes the logged-in user
function getCurrentUser() {
    return firebase.auth().currentUser;
}

function uploadToStorage(imgUri) {
    var imgStorage = imgUri;

    var storageRef = firebase.storage().ref(getCurrentUser().uid + '/' + 'Clothes/' + uniqueNameFile());
    var uploadTask = storageRef.putString(imgStorage, 'data_url');
    uploadTask.on('state_changed', function (snapshot) {

    }, function (error) {
        console.log(error)
    }, function () {
        var downloadURL = uploadTask.snapshot.downloadURL;
        uploadToDatabase(downloadURL);
    });
}

btnAcceptImage.addEventListener('click', function () {
    const imgUri = document.getElementById('addedImg').src;
    uploadToStorage(imgUri);
    window.location.href = '#wardrobe-cats';
});

function loadWardrobes() {

    var token = getCurrentUser().uid;
    if (getCurrentUser()) {
        // User is signed in.
        queryDatabseForWardrobes(token);
    } else {
        // No user is signed in.
    }
};
// display wardrobe name in wardrobe-cats, get wardrobe name for database
function moveToWardrobeCats(getElement) {
    const wardrobeButton = document.getElementById(getElement);
    wardrobeButton.addEventListener('click', function () {
        document.getElementById('war-nr').innerHTML = getElement;
        wardrobe = getElement;
        window.location.href = '#wardrobe-cats';
    });
}

// loading wardrobes to #main
function queryDatabseForWardrobes(token) {

    return firebase.database().ref('Users/' + token + '/').once('value').then(function (snapshot) {
        var postObject = snapshot.val();
        if (postObject == null) {
            return;
        }
        var warNum = Object.getOwnPropertyNames(postObject).toString();
        var wardrobeAmountArray = warNum.split(",");

        for (var i = 1; i <= wardrobeAmountArray.length; i++) {
            const img = $('<img />').attr({   // zrobić z tego może funkcje bo sie kod dubluje
                'id': wardrobeAmountArray[i - 1],
                'src': 'img/wardrobe.svg',
                'class': 'myWardrobe',
                'width': 96.55,
                'height': 100,
                'href': '#wardrobe-cats'
            }).appendTo('.menu-wardrobe');

            moveToWardrobeCats(wardrobeAmountArray[i - 1]);
            $('.menu-wardrobe').append(wardrobeAmountArray[i - 1]);
        }

    });
}


function loadClothes() {
    var token = getCurrentUser().uid;
    if (getCurrentUser()) {
        // User is signed in.
        queryDatabseForClothes(token);
    } else {
        // No user is signed in.
    }
}
// download and display clothes for particular wardrobe and category
function queryDatabseForClothes(token) {
    $("#putImage").empty();
    return firebase.database().ref('Users/' + getCurrentUser().uid + '/' + wardrobe + '/' + category + '/').on('value', function (snapshot) {
        var postObject = snapshot.val();
        if (postObject === null) {
            return;
        }
        var keys = Object.keys(postObject);
        for (var i = 0; i < keys.length; i++) {
            var currentObj = postObject[keys[i]];
            //displaying image on #clothes
            if (i % 3 == 0) {
                var div = document.createElement("div");
                $(div).addClass("i");
                // $(".i").css("width", 50);
                //$(".i").css("height", 50);
                $("#putImage").append(div);
            }

            var image = document.createElement("img");
            image.src = currentObj.url;
            $(image).addClass("contentImage");
            $(div).append(image);
        }

    });
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

    function createWardrobeImg(name) {
        return $('<div/>') //tutaj opakowuję każdą szafę wraz z podpisem, żeby łatwiej je pozycjonować
            .append($('<img />').attr({
                'id': warName,
                'src': 'img/wardrobe.svg',
                'class': 'myWardrobe',
                'href': '#wardrobe-cats',
                
            }))
            .append($('<div/>')
                .append(name))
    }

    // display wardrobe with given name
    $('.btn-war').click(function () {
        setWardrobeName();
        const checkName = document.getElementById(warName);
        if (checkName !== null) {
            alert('This name already exist!');
            return;
        } else if (warName == '' || warName.length > 10) {
            return;
        } else {
            warName = warName.replace(/\s/g, '');
            $('.menu-wardrobe').append(createWardrobeImg(warName));
            moveToWardrobeCats(warName);
            warName = '';
        }
    });

    // get the category name, launch function for loading clothes
    $('#wear span').click(function () {
        category = $(this).attr("id");
        loadClothes();
    });

    // get the selected by user category 
    $('#selectCategory').change(function () {
        selectedCategory = $('#selectCategory').val();
    });

    // get the selected by user weather
    $('#selectWeather').change(function () {
        selectedWeather = $('#selectWeather').val();
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
        // var canvas = document.getElementById('chart');
        // var ctx = document.getElementById('chart').getContext("2d");

        // ctx.clearRect(0, 0, canvas.width, canvas.height);

        // var oldcanv = document.getElementById('chart');
        // var divChart = document.getElementsByClassName('chartjs-size-monitor')[0];

        // console.log(oldcanv);
        // console.log(divChart);
        // if (oldcanv !== null) {
        //     document.getElementsByClassName('chartjs-size-monitor')[0].removeChild('chart');
        //     document.getElementById('divChart').removeChild(divChart);

        // }

        // var canv = document.createElement('canvas');
        // canv.id = 'chart';
        // document.getElementById('divChart').appendChild(canv);
        var city = $("#city").val();

        var key = '33dbe3b930c23ad2c7a0630b49f3e440';
        var url = "https://api.openweathermap.org/data/2.5/forecast";

        $.get(url, { q: city, appid: key, units: 'metric' }, function (data) {
            console.log("Data downloaded");
            dateUTC = [];
            temp = [];
            for (let i = 0; i < data.list.length; i += 8) {
                dateUTC.push(data.list[i].dt);
                temp.push(parseInt(data.list[i].main.temp));

            }

            daysOfWeek = [];
            if (dateUTC.length == 5 && temp.length == 5) {
                daysOfWeek = getDayOfWeek(dateUTC);
                plot(daysOfWeek, temp);
            }

        }, 'json');

    });
    // convert UNIX timestamp to day of the week
    function getDayOfWeek(dateUTC) {
        var daysOfWeek = [];
        var days = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
        for (let i = 0; i < dateUTC.length; i++) {
            var date = new Date();
            date.setTime(dateUTC[i] * 1000); // javascript timestamps are in milliseconds
            daysOfWeek.push(days[date.getUTCDay()]);
        }

        return daysOfWeek;
    };

    // chart    
    var myChart;
    function plot(date, temp) {

        var ctx = document.getElementById('chart').getContext("2d");
        if (myChart != null) {
            myChart.data.labels = [date[0], date[1], date[2], date[3], date[4]];
            myChart.data.datasets[0].data = [temp[0], temp[1], temp[2], temp[3], temp[4]];

            myChart.update();
        } else {
            myChart = new Chart(ctx, {

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
                        pointBorderWidth: 15,
                        pointHoverRadius: 10,
                        pointHoverBorderWidth: 10,
                        pointRadius: 4,
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
                    tooltips: {
                        displayColors: false,
                        bodyFontSize: 14,
                        callbacks: {
                            label: function (tooltipItems, data) {
                                return tooltipItems.yLabel + '°C';
                            }
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: "rgba(0,0,0,0.5)",
                                fontStyle: "bold",
                                beginAtZero: true,
                                maxTicksLimit: 5,
                                padding: 15
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
            })
        };

    };

});