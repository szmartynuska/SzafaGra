$(document).ready(function(){

    $('.navbar').click(function(event) {
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

        $(".btn-slide").click(function(){
            $("#buttons").slideToggle();
        });

    });