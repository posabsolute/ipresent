/*****************************************************
*   iPresent, a plugin to present mockup prototype
*   Creator: Cedric Dugas
*   Licenced under the MIT licence
******************************************/
var jQT;
var iPresent = (function() {

    var iPresent = this;
    var dockSrc, startupScreenSrc, screenOrientationChange;


    function init(){
        if( navigator.onLine){

            $.ajax({
              url: "yourPresentation.xml",
              type: "POST",
              cache: false,
              dataType: "xml",
              success: function(xml) {
                    var xmlstring = (new XMLSerializer()).serializeToString(xml);
                    localStorage.setItem('xmlFeed', xmlstring);
                    loadapp(xml);
                },
                error: function() {
                    var xml = localStorage.getItem('xmlFeed');
                    xml = (new DOMParser()).parseFromString(xml, "text/xml");
                    loadapp(xml);
                }
            });
        }else{
            var xml = localStorage.getItem('xmlFeed');
            xml = (new DOMParser()).parseFromString(xml, "text/xml");
            loadapp(xml);
        }

    }
    function loadapp(xml){
            dockSrc                 =   "images/"+$(xml).find("dockIcon").attr("src");
            startupScreenSrc        =   "images/"+$(xml).find("startupScreen").attr("src");
            screenOrientationChange =   $(xml).find("screenOrientationChange").attr("mode");
            width                   =   $(xml).find("size").attr("width");

            jQT = new $.jQTouch({
                icon: dockSrc,
                addGlossToIcon: false,
                startupScreen: startupScreenSrc,
                statusBar: 'black',
                useFastTouch: false,
                preloadImages: []
            });

            $(xml).find("interface").each(function(index) {
                var id = $(this).attr("id");
                var linkId = "#"+id;
                var srcImg = $(this).attr("src");
                var srcHhorizontal = $(this).attr("horizontal");
                var current;
                if(index == 0){
                    current = "current";
                }else{
                    current = "";
                }

                var interfaces = '<div id="'+id+'" class="'+current+'">\
                    <img src="images/'+srcImg+'" class="vertical" width="'+width+'" alt="Startscreen">\
                    <img src="images/'+srcHhorizontal+'" class="horizontal" width="'+width+'" alt="Startscreen">\
                    <a class="swiper" href="#main"></a><div class="currentDebug">Current slide: '+id+'\
                </div>   ';

                $("#jqt").append(interfaces);

                 $(this).find("links").each(function(index) {
                    var href = $(this).attr("href");
                    var anim = $(this).attr("animation");

                    var styling = $(this).attr("style");


                    var link = '<a href="#'+href+'" style="'+styling+'" class="links '+anim+'"> </a>   ';
                    $(linkId).append(link);
                 });

            });
            if($(xml).find("debug").attr("mode") == "true"){
                $("body").addClass("debug");
                $(".links").each(function(){
                    var linktext = $(this).attr("href");
                    console.log(linktext);
                    $(this).text(linktext);
                });
             }
            initalizejQT({
                width:width
            });
        }
    function initalizejQT(options){
        $(document).trigger('readyy');

        if(screenOrientationChange == "true"){

            window.onorientationchange = function() {
                if(window.orientation === 0){
                    $(".vertical").css("display","block");
                    $(".horizontal").css("display","none");
                        $(".swiper").css({
                            width:options.width
                        });
                }else{
                    $(".vertical").css("display","none");
                    $(".horizontal").css("display","block");
                        $(".swiper").css({
                            width:options.width
                        });
                }
            };
            if(window.orientation === 0){
                    $(".vertical").css("display","block");
                    $(".horizontal").css("display","none");
                        $(".swiper").css({
                            width:options.width
                        });
                }else{
                    $(".vertical").css("display","none");
                    $(".horizontal").css("display","block");
                        $(".swiper").css({
                            width:options.width
                        });
                }
        }else{
            $(".vertical").css("display","block");
            $(".swiper").css({
                width:options.width
            });
        }

      $('#jqt').swipe(function(evt, data) {

            if(data.direction =="left"){
                var nextPage ="#"+ $(".current").next().attr("id");
                if(nextPage !="#undefined") jQT.goTo(nextPage, 'slide', false);
            }else{
                jQT.goBack();
            }
        });
    }
    $(document).ready(function() {
        init();
    });
})();


