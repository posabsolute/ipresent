(function($) {

  var methods = {
    init: function(options) {
      var self = this;
      if (navigator.onLine) {
        $.ajax({
          url: options.xml,
          type: "GET",
          cache: false,
          dataType: "xml",
          success: function(xml) {
            console.log(xml);
            var xmlstring = (new XMLSerializer()).serializeToString(xml);
            localStorage.setItem('xmlFeed', xmlstring);
            methods.loadapp(xml);
          },
          error: function() {
            console.log("cannot load xml");
          }
        });
      } else {
        var xml = localStorage.getItem('xmlFeed');
        xml = (new DOMParser()).parseFromString(xml, "text/xml");
        methods.loadapp(xml);
      }

    },
    loadapp: function(xml) {
      var $xml = $(xml),
        dockSrc = "images/" + $xml.find("dockIcon").attr("src"),
        startupScreenSrc = "images/" + $xml.find("startupScreen").attr("src"),
        screenOrientationChange = $xml.find("screenOrientationChange").attr("mode"),
        width = $xml.find("size").attr("width");

      var jQT = new $.jQTouch({
        icon: dockSrc,
        addGlossToIcon: false,
        startupScreen: startupScreenSrc,
        statusBar: 'black',
        useFastTouch: false,
        preloadImages: []
      });

      $xml.find("interface").each(function(index) {
        var id = $(this).attr("id");
        linkId = "#" + id,
        srcImg = $(this).attr("src"),
        srcHhorizontal = $(this).attr("horizontal");
        var current;

        if (index === 0) {
          current = "current";
        } else {
          current = "";
        }

        var interfaces = '<div id="' + id + '" class="' + current + '">\
              <img src="images/' + srcImg + '" class="vertical" width="' + width + '" alt="Startscreen">\
              <img src="images/' + srcHhorizontal + '" class="horizontal" width="' + width + '" alt="Startscreen">\
              <a class="swiper" href="#main"></a><div class="currentDebug">Current slide: ' + id + '\
          </div>   ';

        $("#jqt").append(interfaces);

        $(this).find("links").each(function(index) {
          var $el = $(this),
            href = $el.attr("href"),
            anim = $el.attr("animation"),
            styling = $el.attr("style");
          link = '<a href="#' + href + '" style="' + styling + '" class="links ' + anim + '"> </a>';

          $(linkId).append(link);
        });

      });
      if ($(xml).find("debug").attr("mode") == "true") {
        $("body").addClass("debug");
        $(".links").each(function() {
          var linktext = $(this).attr("href");
          $(this).text(linktext);
        });
      }

      methods.initalizejQT({
        width: width,
        orientation : screenOrientationChange
      });
    },
    initalizejQT: function(options) {
      $(document).trigger('readyy');

      if (options.orientation == "true") {
        window.onorientationchange = function() {
          methods.checkOrientation();
        };
        methods.checkOrientation();
      } else {
        $(".vertical").css("display", "block");
        $(".swiper").css({
          width: options.width
        });
      }
      // Swipe all page
      $('#jqt').swipe(function(evt, data) {
        if (data.direction == "left") {
          var nextPage = "#" + $(".current").next().attr("id");
          if (nextPage != "#undefined") jQT.goTo(nextPage, 'slide', false);
        } else {
          jQT.goBack();
        }
      });
    },

    checkOrientation: function(content) {
      if (window.orientation === 0) {
        methods.showVertical();
      } else {
        methods.showHorizontal();
      }
    },
    showVertical: function(content) {
      $(".vertical").css("display", "block");
      $(".horizontal").css("display", "none");
      $(".swiper").css({
        width: options.width
      });
    },
    showHorizontal: function(content) {
      $(".vertical").css("display", "none");
      $(".horizontal").css("display", "block");
      $(".swiper").css({
        width: options.width
      });
    }
  };

  $.fn.ipresent = function(method) {

    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  };
})(jQuery);