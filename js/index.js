$(document).ready(function(){
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

var ias = $.ias({
      container: ".grid",
      item: ".grid-item",
      pagination: "#pagination",
      next: ".next a",
      delay: 1200
    });

    ias.on('render', function(items) {
      $(items).css({ opacity: 0 });
    });

    ias.on('rendered', function(items) {
      msnry.appended(items);
    });



    ias.extension(new IASSpinnerExtension());
    ias.extension(new IASNoneLeftExtension({html:'<footer class="footer"><div class="container"><div class="go-up" id="upPage"><span class="footer-big-text">Ты достиг дна</span><span class="footer-small-text">а возможно дно достигло тебя,<br>НО кому какая разница</span></div><div class="copiryght"><span class="footer-logo-text">Just Show</span><div class="copyright-text footer-hover"><a href="#"><span>paren s budushego</span> © 2112</a></div></div></div><div class="footer-line"></div></footer>'}));
  });


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
