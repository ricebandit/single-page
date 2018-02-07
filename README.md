# Single Page App
Non-scrolling site component.

* Dependencies
	* jQuery
	* single-page.css

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
* transitionTime (Integer): Number in milliseconds before transition animation ends. (Default: 1500 ms)
* directionalTransition (Boolean): If set to true, sections transition in from the top, and out to the bottom. False, sections animate in/out in place. Default: false 

If *directionTransition* is set to true, classes are used to set element states in order to transition in and out correctly. These include: "active", "in", "up", and "down".

1) .slide-container's "natural" state is behind the currently displayed section (opacity: 0, z-index:-1).
2) When a new section is clicked, "active" class is added (z-index:1, transition timing via CSS).
3) The "in" class is also added (top:0).
4) Depending on which way the user input was (ie. scroll up, or scroll down), the "up" or "down" class is added, too. Either animate to above the screen or below ("up" sets end transition point at -100%, "down" sets it at 100%).
5) A TIMEOUT in the JavaScript removes the necessary all added classes, pushing it behind the current content, in it's original-natural position.













