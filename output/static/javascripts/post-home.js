$(document).ready(function() {

  // change style and add arrow icon when hovered 
  $('.centered.column > .ui.raised.segment')
    .hover(
        function() {
          $(this).addClass('black inverted bigger');
          $('.sub.header').addClass('ui grey');
          $("<div class='ui right floated basic segment'><i class='huge inverted yellow angle right icon'></i></div>").insertAfter($(this).find('h1.ui.header'));
        },
        function() {
          $(this).removeClass('black inverted bigger');
          $('.sub.header').removeClass('ui grey');
          $(".ui.right.floated.segment").remove();
        });

  // load the blog page when the entire segment is clicked 
  $('.centered.column > .ui.raised.segment')
    .click(
        function() {
          window.location = $(this).find("h1.ui.header a").attr("href");
          return false;
        });

});
