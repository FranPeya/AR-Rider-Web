jQuery('document').ready(function($){

    var menuBtn = $('.menu-icon'),
    menu = $('.Navegation ul');

    menuBtn.click(function(){

        if( menu.hasClass('Show')){
            menu.removeClass('Show');
        }
        else{
            menu.addClass('Show')
        }
        
    });

});

$(document).ready(function(){
       
    $(window).scroll(function(){
         if( $(this).scrollTop() > 0 ){
                $('header').addClass('header2');
             } else {
                 $('header').removeClass('header2');

             }

    });

});



