$(document).ready(function(){
	$(".note-tabs ul li").each(function(index) {
        var count = index + 1;
        $(this).click(function() { 	
			$("html, body").animate({
				scrollTop: $(".note-tabs").offset().top
			}, 1000);							   
		    $(".note-tabs ul li").removeClass("active");            
			$(this).addClass("active");
			$(".note-box").hide();
            $("#box" + count).fadeIn();
			 
        });
    });
	
	
	 $(".numberbar .numcircle").hover(function(){
		console.log($(this).parent());
		//alert("hi");
		$(this).addClass("active");
		$(".noteho500").show();
        $(this).parent().next(".descbar").show()
		$(this).parent().find(".imgbar").fadeIn().addClass("animated zoomIn");
    }, function(){
		$(this).removeClass("active");
		$(".noteho500").hide();
         $(this).parent().next(".descbar").hide();
		$(this).parent().find(".imgbar").hide().removeClass("animated zoomIn");;
    });
})