<?php
// No permitir el acceso directo al archivo
defined('_JEXEC') or die;

?>

<script>
        jssor_slider1_starter = function (containerId) {
            var options = {
                jQueryAutoPlay: true,
                jQueryAutoPlaySteps: 3,
                jQueryAutoPlayInterval: 4000,
                jQuerySlideDuration: 160,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
                jQueryMinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
                jQuerySlideWidth: 300,                                   //[Optional] Width of every slide in pixels, default value is width of 'slides' container
                //jQuerySlideHeight: 150,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
                jQuerySlideSpacing: 3, 					                //[Optional] Space between each slide in pixels, default value is 0
                jQueryDisplayPieces: 3,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
                
            };

            var jssor_slider1 = new jQueryJssorSliderjQuery(containerId, options);

            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizes
            function ScaleSlider() {
                var bodyWidth = document.body.clientWidth;
                if (bodyWidth)
                    jssor_slider1.jQueryScaleWidth(Math.min(bodyWidth, 900));
                else
                    window.setTimeout(ScaleSlider, 30);
            }

            ScaleSlider();
            jQueryJssorjQuery.jQueryAddEvent(window, "load", ScaleSlider);

            jQueryJssorjQuery.jQueryAddEvent(window, "resize", jQueryJssorjQuery.jQueryWindowResizeFilter(window, ScaleSlider));
            jQueryJssorjQuery.jQueryAddEvent(window, "orientationchange", ScaleSlider);
            ////responsive code end
        };
    </script>
    <div id="slider1_container" style="position: relative; top: 0px; left: 0px; width: 900px; height: 150px; overflow: hidden;margin:auto; ">
        <div u="slides" style="cursor: move; position: absolute; left: 0px; top: 0px; width: 900px; height: 150px; overflow: hidden;">
            <div><img u="image" src="images/carrousel/Slide_1.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_2.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_3.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_4.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_5.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_7.jpg" /></div>
            <div><img u="image" src="images/carrousel/Slide_8.jpg" /></div>            
        </div>

        <script>
            jssor_slider1_starter('slider1_container');
        </script>
    </div>