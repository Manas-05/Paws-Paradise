                                                                                                                   $(document).ready(function(){
    // Set interval for sliding (in milliseconds)
    var slideInterval = 3000; // Change this value to set the interval
  
    // Function to start the slider
    function startSlider() {
      $(".ad-slider .ad-slide:first").fadeIn(1000).css('display','flex').delay(1000).fadeOut(1000, function(){
        $(this).appendTo(".ad-slider");
        startSlider();
      });
    }
  
    // Initial call to start the slider
    startSlider();
  });