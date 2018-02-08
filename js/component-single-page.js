function SinglePage(parent_id, options){
	var _this = this;
	var _animating = false;
	var _sectionIndex = getActiveSection();
	var _transitionTime = 1500;
	var _transitionDirectional = false;
	var _touchActive = true;


	function setOptions(){
		if(options){

			if(options.transitionTime){
				_transitionTime = options.transitionTime;
			}

			if(options.directionalTransition){
				_transitionDirectional = options.directionalTransition;
			}

		}
	}

	function init(){
		// Prevent overscroll on touch devices. May require retooling if need to scroll with outside sections.
		$(document).on("touchmove", function(evt){
			if(_touchActive == false){
				evt.preventDefault();
			}

		})


		setOptions();

		activateInputs();
	}

	function activateInputs(){

		activateMouse();

		activateTouch();

		activateDirectionalKeys();
	}

	function activateDirectionalKeys(){

		// Arrow keys
		$(document).on("keydown", function(evt){

			switch(evt.keyCode){
				case 40:
					// Next
					gotoNextSection();
				break;
				case 38:
					// Prev
					gotoPrevSection();
				break;
			}
			
		})
	}

	function activateMouse(){

		// Wheel scroll (MOUSE)
		$("#" + parent_id).on("wheel", function(evt){
			var contentHeight = $("#" + parent_id + " .slide-container.active.in .slide").children().height();
			var parentHeight = $("#" + parent_id + " .slide-container.active.in").height();

			// Check if scrolling within section is necessary. Else, proceed to new section
			if( parentHeight < contentHeight ){
				_touchActive = true;
				var currentScrollPos = $("#" + parent_id + " .slide-container.active.in .slide").scrollTop();
				var scrollMax = contentHeight - parentHeight;

				if( currentScrollPos >= scrollMax ){
					// If scrolled to end of content
					gotoNextSection();
				}else if (currentScrollPos == 0 && evt.originalEvent.deltaY < 0){
					// If wheel scroll up, AND currentScrollPos is equal to 0
					gotoPrevSection();
				}

			}else{
				_touchActive = false;
				evt.preventDefault();
				// If wheel scroll "NEXT"
				if( evt.originalEvent.deltaY > 0){
					gotoNextSection();
				}

				// If wheel scroll "PREV"
				if( evt.originalEvent.deltaY < 0){
					gotoPrevSection();
				}
			}
			
		})
	}

	function activateTouch(){

		// Activate mouse (TOUCH)
		$("#" + parent_id).on("touchstart", function(evt){
			var contentHeight = $("#" + parent_id + " .slide-container.active.in .slide").children().height();
			var parentHeight = $("#" + parent_id + " .slide-container.active.in").height();

			// Record initial touch position
			var startY = $("#" + parent_id + " .slide").scrollTop();

			// Check if scroll CONTENT. Else, proceed to NEW SECTION.
			if( parentHeight < contentHeight ){
				_touchActive = true;

				// Listen for "scroll" event (mobile devices fire this when content momentum stops completely), and "touchend" event.
				$("#" + parent_id + " .slide").on("scroll touchend", function(evt){
				
					var currentScrollPos = $("#" + parent_id + " .slide-container.active.in .slide").scrollTop();
					var scrollMax = contentHeight - parentHeight;

					if( currentScrollPos >= scrollMax ){
						_touchActive = false;

						// Kill leave, move, and end listeners
						$("#" + parent_id + " .slide").unbind("scroll");
						$("#" + parent_id + " .slide").unbind("touchend");
						$("#" + parent_id).unbind("touchmove");
						$("#" + parent_id).unbind("touchend");

						// If scrolled to end of content
						gotoNextSection();
					}else if (currentScrollPos == 0){
						_touchActive = false;

						// Kill leave, move, and end listeners
						$("#" + parent_id + " .slide").unbind("scroll");
						$("#" + parent_id + " .slide").unbind("touchend");
						$("#" + parent_id).unbind("touchmove");
						$("#" + parent_id).unbind("touchend");
						
						// If wheel scroll up, AND currentScrollPos is equal to 0
						gotoPrevSection();
					}
				})
			}else{
				_touchActive = false;

				// Record initial touch position
				var startY;

				if(evt.touches){
					startY = evt.touches[0].pageY;
				}else{
					startY = evt.pageY;
				}

				// Activate touch end.
				$("#" + parent_id).on("touchend", function(evt){
					
					// Record touch end position
					var endY;

					endY = evt.pageY;

					// Calculate delta shift
					var delta = endY - startY;

					// Prevent page from changing by simple click at end of page.
					if( delta == 0){
						return false;
					}

					// Based off of delta shift, go to next or previous section
					if(delta < 0){
						gotoNextSection();
					}else{
						gotoPrevSection();
					}

					// Kill leave, move, and end listeners
					$("#" + parent_id).unbind("touchend");
					
				})

			}
		})
	}

	function gotoNextSection(){
		if(_animating === true){ return; }

		_animating = true;

		// Storeindex before changing
		var oldSectionIndex = _sectionIndex;

		// Set new index
		_sectionIndex ++;

		if(_sectionIndex == $("#" + parent_id + " .slide-container").length ){
			_sectionIndex = 0;
		}

		// Set up transition
		if( _transitionDirectional ){

			$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).addClass("up");

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("down");

			setTimeout(function(){
				
				$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).removeClass("down");
			}, 1);

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("active");
			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("in");

			// Allow time for animated transition (1500ms) before re-enabling scrolling.
			setTimeout(function(){
				_animating = false;

				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("active");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("in");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("up");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("down");
			}, _transitionTime);

		}else{

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("active");
			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("in");
			$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("in");

			// Allow time for animated transition (1500ms) before re-enabling scrolling.
			setTimeout(function(){
				_animating = false;

				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("active");
				
			}, _transitionTime);

		}


	}

	function gotoPrevSection(){
		if(_animating === true){ return; }

		_animating = true;

		// Storeindex before changing
		var oldSectionIndex = _sectionIndex;

		// Set new index
		_sectionIndex --;

		if(_sectionIndex < 0 ){
			_sectionIndex = $("#" + parent_id + " .slide-container").length - 1;
		}

		// Set up transition
		if( _transitionDirectional ){

			$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).addClass("down");

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("up");

			setTimeout(function(){
				
				$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).removeClass("up");
			}, 1);

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("active");
			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("in");

			// Allow time for animated transition (1500ms) before re-enabling scrolling.
			setTimeout(function(){
				_animating = false;

				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("active");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("in");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("up");
				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("down");
			}, _transitionTime);

		}else{

			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("active");
			$( $("#" + parent_id + " .slide-container")[_sectionIndex] ).addClass("in");
			$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("in");

			// Allow time for animated transition (1500ms) before re-enabling scrolling.
			setTimeout(function(){
				_animating = false;

				$( $("#" + parent_id + " .slide-container")[oldSectionIndex] ).removeClass("active");
				
			}, _transitionTime);

		}
	}

	function getActiveSection(){

		for(var i = 0; i < $("#" + parent_id + " .slide-container").length; i ++){
			var slideContainer = $( $("#" + parent_id + " .slide-container")[i] );
			
			if( slideContainer.hasClass("active") ){
				return i;
			}
			
		}

		console.warn("None of the .slide-container instances include '.active' class. Index is set to 0 by default.")
		return 0;
	}

	init();

	return _this;
}