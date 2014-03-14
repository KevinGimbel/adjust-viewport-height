/*
 * AdjustViewportHeight
 *
 * This script checks for viewport height support. 
 * If viewport height is not supported it sets the 
 * correct height of the element. If it is supported, 
 * it does nothing.
 * 
 * @version 0.1 - beta
 * @author Kevin Gimbel
 * @date 2014-03-12
 * @url http://kevingimbel.com
*/
function adjustViewportHeight(elements) {
  /*
    Defining all variables we use at the beginning.
    allElements   all elements that get fetched by the script
    newHeight     obviously the newHeight
    height        the current height of the viewport
  */
  var allElements = [],
      newHeight,
      height = document.documentElement.clientHeight;

/*
  IE fallback for getComputedStyle. 
  Taken from http://snipplr.com/view.php?codeview&id=13523
*/

if (!window.getComputedStyle) {
    window.getComputedStyle = function(el, pseudo) {
        this.el = el;
        this.getPropertyValue = function(prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';
            if (re.test(prop)) {
                prop = prop.replace(re, function () {
                    return arguments[2].toUpperCase();
                });
            }
            return el.currentStyle[prop] ? el.currentStyle[prop] : null;
        }
        return this;
    }
}

  /*
    hasViewportHeight()

    This function creates an empty div, applies 100vh to it and then checks if the 
    computed Style represents the current window height. If so, it return true (vh is
    supported), if not false.

    @return boolean
  */
var hasViewportHeight = function() {
  /*
    IE8 returns an error and stops the script when checking
    support via a ghost div and 100vh. That said I decided to
    stop checking for support if the IE version is older than IE 10.
    Becaue window.attachEvent is an IE only event and has been removed in
    IE 11 we can figure that the IE version is older than IE 11 when checking for
    attachEvent support. 
  */
  if(window.attachEvent) {
    return 0;
  }
  else 
  {
  // creating a ghost div 
  var ghost = document.createElement('div');  
  // setting the ghost's height to 100vh
  ghost.style.height = '100vh';
  // and adding it to the body
  document.body.appendChild(ghost);
  
  // next, we get the height of the element (computed, not the 100vh!)
  var computedHeight = window.getComputedStyle(ghost).getPropertyValue('height');
  // and remove the element so it doesn't hang around unwanted
  document.body.removeChild(ghost);
  }
  /* now we test if the computedHeight equals the client height, if
  it does the vieport unit is supported. 
  */ 
  if(computedHeight == height + 'px') {
    return true;
  }
}

/*
  Using the previously defined hasViewportHeight function to check if the vh unit is supported.
*/
    if(hasViewportHeight()) {
      // viewport height is supported, no need to do anything \o/
    } else {
  
/*
  If the viewport height is not supported the actual work begins.
  First we make sure if we can use querySelectorAll to fetch all elements
  if not we need to take the dirty road and fetch the whole DOM. 
  This is, in fact, slow and bad - I'd rather like to handle it in another way. 

  @return Array 
*/
    if(document.querySelectorAll) {
      allElements = document.querySelectorAll(elements);
    } else {
      var wholeDOM = document.getElementsByTagName('*');
      for(var i = 0; i <= wholeDOM.length - 1; i++) {
      if(wholeDOM[i].getAttribute('data-vunit')) {
           allElements.push(wholeDOM[i]);
         }
      }
      return allElements;
    } // getElements
    
    /*
      After we fetched all elements and pushed them into an array we need to set the correct heights.
    */
    for(var i = 0; i <= allElements.length - 1; i++) {
      // checking if there is a specific vheight set.
     if(allElements[i].getAttribute('data-vheight') !== null || allElements[i].dataset.vheight) {
       // asigning the var current to the current element
       var current = allElements[i],
          // getting the current height set via data-vheight
           vheight = current.getAttribute('data-vheight');
           /* parsing it with paseInt to make sure it IS an integer
              otherwise error could occure */
        currentHeight =  parseInt(vheight);
        /* Because we deal with a specific height that is not 100 we need to calculate 
           the height. The logic here is:

           viwportHeight / 100 = 1/x of the viewport
           1/x * currentHeight = Pixel value of 1/x vh 

           e.g.
           750 / 100 = 7.5
           7.5 * 15 = 112.5

           15vh equals 112.5px
        */
        newHeight = ((height / 100) * currentHeight);
        newHeight = Math.round(newHeight + 1);
            
         allElements[i].style.height = newHeight + "px";
       } else {
        // if no special vheight is set we set it to 100vh or the height of the window.
         allElements[i].style.height = height + "px";
       }  
     } // for loop
  } // end of support check
 } // end of function