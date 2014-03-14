## AdjustViewportHeight.js

A small but effective piece of JavaScript to add support for the viewport unit (currently *only* viewport height). This scrip is in beta state. I ran some tests to see what the support is like but there's still a lot room for improvement. Feel free to help and contribute or build upon. 

### Browser Support 
Tested with [BrowserStack](http://browserstack.com) on Mac OS X and Windows:

* Chrome 14+
* Firefox 4+
* Safari 4+
* Opera 10.6+
* IE 8+*

*IE only works if a specific data-vheight attribute is set. Normally 100vh is standard but IE needs `data-vheight="100"` to work. 


### Usage
Include the adjustviewportheight.js, call the function with a data-attribute of your choice (I prefere data-vunit="adjust"), then set the data-vunit="adjust" attribute to the elements you want to adjust.

````
 <div data-vunit="adjust"><div>
````

For IE 8-10 support, use this on all elements.

````
<div data-vunit="adjust" data-vheight="100"><div>
````