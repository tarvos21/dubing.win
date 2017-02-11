// namespace
window.semantic = {
  handler: {}
};

// ready event
semantic.ready = function() {

  // selector cache
  var
    $document            = $(document),
    $container           = $('.row.article-body'),
    $allHeaders          = $('h2'),
    $sectionHeaders      = $document.find('h1'),
    $followMenu          = $container.find('.following.menu'),
    $sectionExample      = $container.find('h2'),
    $exampleHeaders      = $container.find('h2'),
    $footer              = $('.page > .footer'),
    $example             = $('h2'),
    $pageDropdown        = $('.ui.main.menu .page.dropdown'),

    expertiseLevel       = ($.cookie !== undefined)
      ? $.cookie('expertiseLevel') || 0
      : 0,
    languageDropdownUsed = false,

    requestAnimationFrame = window.requestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function(callback) { setTimeout(callback, 0); },


    // alias
    handler
  ;


  // event handlers
  handler = {

    createWaypoints: function() {
      $sectionHeaders
        .visibility({
          observeChanges: false,
          once: false,
          offset: 50,
          onTopPassed: handler.activate.section,
          onTopPassedReverse: handler.activate.previous
        })
      ;

      $sectionExample
        .visibility({
          observeChanges: false,
          once: false,
          offset: 200,
          onTopPassed: handler.activate.example,
          onBottomPassedReverse: handler.activate.example
        })
      ;

      $footer
        .visibility({
          observeChanges: false,
          once: false,
          onBottomVisible: function(calculations) {
            var
              $title = $followMenu.find('> .item > .title').last()
            ;
            $followMenu
              .accordion('open', $title)
            ;
          }
        })
      ;
    },

    activate: {
      previous: function() {
        var
          $menuItems  = $followMenu.children('.item'),
          $section    = $menuItems.filter('.active'),
          index       = $menuItems.index($section)
        ;
        if($section.prev().length > 0) {
          $section
            .removeClass('active')
            .prev('.item')
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index - 1)
          ;
        }
      },
      accordion: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $followSection = $followMenu.children('.item'),
          $activeSection = $followSection.eq(index)
        ;
      },
      section: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $followSection = $followMenu.children('.item'),
          $activeSection = $followSection.eq(index),
          isActive       = $activeSection.hasClass('active')
        ;
        if(!isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index)
          ;
        }
      },
      example: function() {
        var
          $section       = $(this),
          index          = $exampleHeaders.index($section),
          $followSection = $followMenu.find('.menu > .item'),
          $activeSection = $followSection.eq(index),
          isActive       = $activeSection.hasClass('active')
        ;
        if(index !== -1 && !isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
        }
      }
    },

    tryCreateMenu: function(event) {
      if($(window).width() > 640 && !$('body').hasClass('basic')) {
        if($container.length > 0 && $container.find('.following.menu').length === 0) {
          handler.createMenu();
          handler.createWaypoints();
          $(window).off('resize.menu');
        }
      }
    },

    createAnchors: function() {
      $allHeaders
        .each(function() {
          var
            $section = $(this),
            text     = handler.getText($section),
            safeName = text,
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          $section
            .append($anchor)
          ;
        })
      ;
      $example
        .each(function() {
          var
            $title   = $(this).eq(0),
            text     = handler.getText($title),
            safeName = text,
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          if($title.length > 0) {
            $title.after($anchor);
          }
        })
      ;

    },

    getPageTitle: function() {
      return $.trim($('h1').eq(0).contents().filter(function() { return this.nodeType == 3; }).text().toLowerCase());
    },
    getSafeName: function(text) {
      return text.replace(/\s+/g, '-').replace(/[^-,'A-Za-z0-9]+/g, '').toLowerCase();
    },

    getText: function($element) {
      $element = ($element.find('a').not('.label, .anchor').length > 0)
        ? $element.find('a')
        : $element
      ;
      var
        $text = $element.contents().filter(function(){
          return this.nodeType == 3;
        })
      ;
      return ($text.length > 0)
        ? $text[0].nodeValue.trim()
        : $element.find('a').text().trim()
      ;
    },

    createMenu: function() {
      // grab each h3
      var
        html      = '',
        pageTitle = handler.getPageTitle(),
        title     = pageTitle,
        $sticky,
        $rail
      ;
      $sectionHeaders
        .each(function(index) {
          var
            $currentHeader = $(this),
            $examples      = $container.find('h2'),
            activeClass    = (index === 0)
              ? 'active '
              : '',
            text     = handler.getText($currentHeader),
            safeName = text,
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          html += '<div class="item">';
          if($examples.length === 0) {
            html += '<a class="'+activeClass+'title" href="#'+ id +'"><b>' + $(this).text() + '</b></a>';
          }
          else {
            html += '<a class="'+activeClass+'title"><i class="dropdown icon"></i> <b>' + $(this).text() + '</b></a>';
          }
          if($examples.length > 0) {
            html += '<div class="'+activeClass+'content menu">';
            $examples
              .each(function() {
                var
                  $title   = $(this),
                  text     = handler.getText($title),
                  safeName = text,
                  id       = window.escape(safeName),
                  $anchor  = $('<a />').addClass('anchor').attr('id', id)
                ;
                if($title.length > 0) {
                  html += '<a class="item" href="#'+id+'">' + text + '</a>';
                }
              })
            ;
            html += '</div>';
          }
          html += '</div>';
        })
      ;
      $followMenu = $('<div />')
        .addClass('ui vertical following fluid accordion text menu')
        .html(html)
      ;
      /* Advert
      var $advertisement = $('<div />')
        .addClass('advertisement')
        .html('<script type="text/javascript" src="//cdn.carbonads.com/carbon.js?zoneid=1673&serve=C6AILKT&placement=semanticuicom" id="_carbonads_js"></script>')
      ;
      */
      $sticky = $('<div />')
        .addClass('ui sticky')
        .html($followMenu)
        //.prepend($advertisement)
        //.prepend('<h4 class="ui header"><a href="#content">' + title + '</a></h4>')
      ;
      $rail = $('<div />')
        .addClass('ui dividing right rail')
        .html($sticky)
        .prependTo($container)
      ;
      $sticky.sticky({
        silent: true,
        context: $('.row.article-body'),
        //context: $container,
        offset: 65
      });
      $followMenu
        .accordion({
          exclusive: false,
          animateChildren: false,
          onChange: function() {
            $('.ui.sticky').sticky('refresh');
          }
        })
        .find('.menu a[href], .title[href]')
          .on('click', handler.scrollTo)
      ;
    },

    scrollTo: function(event) {
      var
        id       = $(this).attr('href').replace('#', ''),
        $element = $('.tab.active .example:has(#' + id + ')'),
        position = $element.offset().top - 30
      ;
      $('#' + id)
        .addClass('active')
      ;
      $('html, body')
        .animate({
          scrollTop: position
        }, 500)
      ;
      location.hash = '#' + id;
      event.stopImmediatePropagation();
      event.preventDefault();
      return false;
    },

      refreshSticky: function() {
      $sectionHeaders.visibility('refresh');
      $sectionExample.visibility('refresh');
      $('.ui.sticky').sticky('refresh');
      $footer.visibility('refresh');
    },

  };

  semantic.handler = handler;

  // add anchors to docs headers
  handler.createAnchors();

  handler.tryCreateMenu();
  $(window).on('resize.menu', function() {
    handler.tryCreateMenu();
  });

  // register less files
  //window.less.registerStylesheets();

  $pageDropdown
    .dropdown({
      on       : 'hover',
      action   : 'nothing',
      allowTab : false
    })
  ;

  $('aside.column').clone().appendTo($('.right.rail .ui.sticky'));

};


// attach ready event
$(document)
  .ready(semantic.ready)
;
