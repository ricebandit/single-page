function SinglePage(parent_id, options){
	var _this = this;
	var _animating = false;
	var _sectionIndex = getActiveSection();
	var _transitionTime = 1500;
	var _transitionDirectional = false;


	function setOptions(){
		if(options){

			if(options.transitionTime){
				_transitionTime = options.transitionTime;
			}

			if(options.directionalTransition){
				_transitionDirectional = options.directional;
			}

		}
	}

	function init(){
		setOptions();

		$("#" + parent_id).on("wheel", function(evt){
			evt.preventDefault();

			// If wheel scroll "NEXT"
			if( evt.originalEvent.deltaY > 0){
				gotoNextSection();
			}

			// If wheel scroll "PREV"
			if( evt.originalEvent.deltaY < 0){
				gotoPrevSection();
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