function adjustViewportUnit(elements) {
  var body = document.body,
      html = document.documentElement,
      elements,
      allElements = [],
      newHeight,
      height = document.documentElement.clientHeight;
      //height = Math.max( body.scrollHeight, body.offsetHeight, 
      //                 html.clientHeight, html.scrollHeight, html.offsetHeight );
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
  
 } // end of function