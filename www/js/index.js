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
    
    var img_index = 1;

    $('.btn-war').click(function() {
        var img = $('<img />').attr({
            'id': 'myImage'+img_index,
            'src': 'img/wardrobe.svg',
            'class': 'myWardrobe',
            'width': 96.55,
            'height': 100,
            'href': '#wardrobe-cats'
        }).appendTo('.menu-wardrobe');
        
    $("#myImage"+img_index).wrap($('<a>',{
           href: '#wardrobe-cats'
            }));
        
        
        var someText = "Wardrobe "+img_index;
        $('.menu-wardrobe').append(someText);
        
        img_index++;
        
    });
    
    $('#war-nr').append(img_index);
    

    });
