'no strict'    
var container = document.querySelector('.grid');
//centered items
    if($(window).width()<1800) {

    var msnry = new Masonry( container, {
      // options
      itemSelector: '.grid-item',
      isFitWidth: true,
      gutter: 2
    })
    } else{

      var msnry = new Masonry( container, {
      // options
      itemSelector: '.grid-item',
      isFitWidth: false,
      gutter: 2                     
     })
    };

//show/hide main menu
var  $menuPos = $(".menu").offset();

$('.toogle-button').click( function(event){
        event.preventDefault();
        $('.user-menu').slideDown();
        $('.search-button').animate({
            right:$(".menu").outerWidth()+294
        });
});

$('.close-btn').click(function(event){
        event.preventDefault();
        $('.user-menu').slideUp();
        $('.search-button').animate({
            right:$(".menu").outerWidth()
        });
});

//to top
$('body').on('click', '#upPage', function(event) {
  event.preventDefault();
  $('html, body').animate({ scrollTop: 0 }, "slow");
  return false;
});