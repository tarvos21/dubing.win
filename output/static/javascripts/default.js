$(document).ready(function() {
  // put your code here.
  $('.ui.progress').progress();

  // navbar stick to the viewport's top
  $('nav.ui.borderless.menu')
    .sticky({
      context: '#content' 
    })
  ;

// active menu item when clicked, not working
/*
$('.ui.menu .ui.container a.item').on('click', function() {   
  $(this)
    .addClass('active')
    .siblings()
    .removeClass('active'); 
});
*/

// active menu item when clicked, working great
$(function () {
    setNavigation();
});

function setNavigation() {
    var path = window.location.pathname;
    path = path.replace(/\/$/, "");
    path = decodeURIComponent(path);

    $("nav.ui.menu > .ui.container > a.item:not('.header')").each(function () {
        var href = $(this).attr('href');
        if (path.substring(0, href.length) === href) {
            $(this).closest('.item').addClass('active');
        }
    });
};

$('.ui.modal').modal({blurring: true}).modal('attach events', '#contact', 'show');

});
