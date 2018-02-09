# Single Page App
Non-scrolling site component.

* Dependencies
	* jQuery
	* component-single-page.css

## Notes
* For the most part, JavaScript/jQuery only affects the mark-up by adding/removing class states.
* All transitions and positioning are done via CSS.

## HTML
Create a element (div, section, etc), give it an id. Each child should have the .slide-container class

```
<section id="app">
	<div class="slide-container" id="red">
		<div class="slide">
		</div>
	</div>
	<div class="slide-container" id="blue">
		<div class="slide">	
		</div>
	</div>
	<div class="slide-container active in" id="green">
		<div class="slide">	
		</div>
	</div>
	<div class="slide-container" id="yellow">
		<div class="slide">	
		</div>
	</div>
</section>
```


## JavaScript
```
var app;

$(document).ready(function(){

	var options = {
		transitionTime: 2000,
		directionalTransition: false
	}

	app = new SinglePage("app", options);
});
```

## Options
* **transitionTime** (Integer): Number in milliseconds before transition animation ends. (Default: 1500 ms)
* **directionalTransition** (Boolean): If set to true, sections transition in from the top, and out to the bottom. False, sections animate in/out in place. Default: false 

**directionTransition cycle:**
If *directionTransition* is set to true, classes are used to set element states in order to transition in and out correctly. These include: "active", "in", "up", and "down".

1) .slide-container's "natural" state is behind the currently displayed section (opacity: 0, z-index:-1).
2) When a new section is clicked, "active" class is added (z-index:1, transition timing via CSS).
3) The "in" class is also added (top:0, z-index:2).
4) Depending on which way the user input was (ie. scroll up, or scroll down), the "up" or "down" class is added, too. Either animate to above the screen or below ("up" sets end transition point at -100%, "down" sets it at 100%).
5) The "out" class is added to the old section.
6) A **timeout** in the JavaScript removes all added classes, pushing it behind the current content, back to it's original-natural position.


## Transition Animation
* Done via CSS transitions
* The "in" and "out" classes are added to next and previous section elements. These should be used to set the transitions. For example:

```
/* SET DEFAULT STATUS OF CONTENT */
#app #parent-div .temp-content{
	background:rgba(200, 0, 0, 0.25);
	color:#fff;
	display:inline-block;
	min-height:1000px;
	opacity:0;
	width:45%;
}

/* "IN" TRANSITION. DRILLED DOWN TO CHILD */
#app #parent-div.in .temp-content{
	opacity:1;
	transition:500ms opacity 2500ms;
}

/* "OUT" TRANSITION. DRILLED DOWN TO CHILD */
#app #parent-div.out .temp-content{
	opacity:0;
	transition:500ms opacity;
}
```










