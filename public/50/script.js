/*********************
//* jQuery Drop Line Menu- By Dynamic Drive: http://www.dynamicdrive.com/
//* Last updated: May 9th, 11'
//* Menu avaiable at DD CSS Library: http://www.dynamicdrive.com/style/
*********************/

var droplinemenu={

arrowimage: {classname: 'downarrowclass', src: 'img/down.gif', leftpadding: 5}, //customize down arrow image
animateduration: {over: 200, out: 100}, //duration of slide in/ out animation, in milliseconds

buildmenu:function(menuid){
	jQuery(document).ready(function($){
		var $mainmenu=$("#"+menuid+">ul")
		var $headers=$mainmenu.find("ul").parent()
		$headers.each(function(i){
			var $curobj=$(this)
			var $subul=$(this).find('ul:eq(0)')
			this._dimensions={h:$curobj.find('a:eq(0)').outerHeight()}
			this.istopheader=$curobj.parents("ul").length==1? true : false
			if (!this.istopheader)
				$subul.css({left:0, top:this._dimensions.h})
			var $innerheader=$curobj.children('a').eq(0)
			$innerheader=($innerheader.children().eq(0).is('span'))? $innerheader.children().eq(0) : $innerheader //if header contains inner SPAN, use that
			$innerheader.append(
				'<img src="'+ droplinemenu.arrowimage.src
				+'" class="' + droplinemenu.arrowimage.classname
				+ '" style="border:0; padding-left: '+droplinemenu.arrowimage.leftpadding+'px" />'
			)
			$curobj.hover(
				function(e){
					var $targetul=$(this).children("ul:eq(0)")
					if ($targetul.queue().length<=1) //if 1 or less queued animations
						if (this.istopheader)
							$targetul.css({left: $mainmenu.position().left, top: $mainmenu.position().top+this._dimensions.h})
						if (document.all && !window.XMLHttpRequest) //detect IE6 or less, fix issue with overflow
							$mainmenu.find('ul').css({overflow: (this.istopheader)? 'hidden' : 'visible'})
						$targetul.dequeue().slideDown(droplinemenu.animateduration.over)
				},
				function(e){
					var $targetul=$(this).children("ul:eq(0)")
					$targetul.dequeue().slideUp(droplinemenu.animateduration.out)
				}
			) //end hover
		}) //end $headers.each()
		$mainmenu.find("ul").css({display:'none', visibility:'visible', width:$mainmenu.width()})
	}) //end document.ready
}
}

/***********************************************************************************************************************
DOCUMENT: includes/javascript.js
DEVELOPED BY: Ryan Stemkoski
COMPANY: Zipline Interactive
EMAIL: ryan@gozipline.com
PHONE: 509-321-2849
DATE: 3/26/2009
UPDATED: 3/25/2010
DESCRIPTION: This is the JavaScript required to create the accordion style menu.  Requires jQuery library
NOTE: Because of a bug in jQuery with IE8 we had to add an IE stylesheet hack to get the system to work in all browsers. I hate hacks but had no choice :(.
************************************************************************************************************************/
$(document).ready(function() {
	
	
	
	//$(".accordionButton").hide();
   
   //$(".accordionButton:first").show();	
	
	
	 
	//ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton, .menuButtonDrop, .menuButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton, .menuButtonDrop, .menuButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent, .submenu').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			
			
	  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accordionButton, .menuButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accordionContent, .submenu').hide();
	
	//$(".accordionButton:first").addClass('on');
	
	$(".accordionButton:first").addClass('over');
	
	$(".accordionContent:first").show();

});

//TABS

(function($) {

    $.organicTabs = function(el, options) {
    
        var base = this;
        base.$el = $(el);
        base.$nav = base.$el.find(".nav");
                
        base.init = function() {
        
            base.options = $.extend({},$.organicTabs.defaultOptions, options);
            
            // Accessible hiding fix
            $(".hide").css({
                "position": "relative",
                "top": 0,
                "left": 0,
                "display": "none"
            }); 
            
            base.$nav.delegate("li > a", "click", function() {
            
                // Figure out current list via CSS class
                var curList = base.$el.find("a.current").attr("href").substring(1),
                
                // List moving to
                    $newList = $(this),
                    
                // Figure out ID of new list
                    listID = $newList.attr("href").substring(1),
                
                // Set outer wrapper height to (static) height of current inner list
                    $allListWrap = base.$el.find(".list-wrap"),
                    curListHeight = $allListWrap.height();
                $allListWrap.height(curListHeight);
                                        
                if ((listID != curList) && ( base.$el.find(":animated").length == 0)) {
                                            
                    // Fade out current list
                    base.$el.find("#"+curList).fadeOut(base.options.speed, function() {
                        
                        // Fade in new list on callback
                        base.$el.find("#"+listID).fadeIn(base.options.speed);
                        
                        // Adjust outer wrapper to fit new list snuggly
                        var newHeight = base.$el.find("#"+listID).height();
                        $allListWrap.animate({
                            height: newHeight
                        });
                        
                        // Remove highlighting - Add to just-clicked tab
                        base.$el.find(".nav li a").removeClass("current");
                        $newList.addClass("current");
                            
                    });
                    
                }   
                
                // Don't behave like a regular link
                // Stop propegation and bubbling
                return false;
            });
            
        };
        base.init();
    };
    
    $.organicTabs.defaultOptions = {
        "speed": 300
    };
    
    $.fn.organicTabs = function(options) {
        return this.each(function() {
            (new $.organicTabs(this, options));
        });
    };
    
})(jQuery);

//TABS HEAD
$(function() {
    
            $("#example-one").organicTabs();
            
            $("#example-two").organicTabs({
                "speed": 200
            });
    
        });

//WEB TICKER
$(function(){
	$("#webticker").webTicker();
	$("#webticker2").webTicker({travelocity: 0.2, direction: -1});

	$("#stop").click(function(){
		$("#webticker").webTicker('stop');
	});

	$("#continue").click(function(){
		$("#webticker").webTicker('cont');
	});

	$("#stop2").click(function(){
		$("#webticker2").webTicker('stop');
	});

	$("#continue2").click(function(){
		$("#webticker2").webTicker('cont');
	});
});

//ORBIT SLIDESHOW

	$(window).load(function() {
		$('#featured').orbit({
			 animationSpeed: 1200,  // how fast animtions are
		});
		
	});

//DROP DOWN MENU	
droplinemenu.buildmenu("mydroplinemenu")