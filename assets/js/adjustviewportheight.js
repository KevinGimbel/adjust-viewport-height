function adjustViewportUnit(elements) {
  var body = document.body,
      html = document.documentElement,
      elements,
      allElements = [],
      newHeight,
      height = document.documentElement.clientHeight;
      //height = Math.max( body.scrollHeight, body.offsetHeight, 
      //                 html.clientHeight, html.scrollHeight, html.offsetHeight );

var hasViewportHeight = function() {
  // creating a ghost div 
  var ghost = document.createElement('div'),
      // getting the current window height
      clientHeight = window.innerHeight || document.documentElement.clientHeight;
  
  // setting the ghost's height to 100vh
  ghost.style.height = '100vh';
  // and adding it to the body
  document.body.appendChild(ghost);
  
  // next, we get the height of the element (computed, not the 100vh!)
  var computedHeight = window.getComputedStyle(ghost).getPropertyValue('height');
  // and remove the element so it doesn't hang around unwanted ;)
  document.body.removeChild(ghost);
  
  /* now we test if the computedHeight equals the client height, if
  it does the vieport unit is supported. 
  */ 
  if(computedHeight == clientHeight + 'px') {
    return true;
  }
}

    if(hasViewportHeight()) {
      // viewport height is supported, no need to do anything \o/
    } else {
  


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
    
    for(var i = 0; i <= allElements.length - 1; i++) {
     if(allElements[i].getAttribute('data-vheight') !== null || allElements[i].dataset.vheight) {
       var current = allElements[i],
           vheight = current.getAttribute('data-vheight');
       currentHeight =  parseInt(vheight);
            
       newHeight = ((height / 100) * currentHeight);
       newHeight = Math.round(newHeight);
            
         allElements[i].style.height = newHeight + "px";
       } else {
         allElements[i].style.height = height + "px";
       }  
     } // for loop
  } // end of support check
 } // end of function