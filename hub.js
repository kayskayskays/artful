
"use strict";

var style, rowStart, bool, height, image, current, currentStyle, updated;

var grid = document.getElementById("grid-container");

// adding an event listener to each main element
document.querySelectorAll('.mn').forEach(item => {
    
    // listening for clicks on the summary
    var summary = item.getElementsByTagName("summary")[0];
    summary.addEventListener('click', event => {
        
        // stores information about the current grid style
        currentStyle = getComputedStyle(grid);
        current = currentStyle.getPropertyValue("grid-template-rows").split(" ");

        // stores information about the current main item style
        style = getComputedStyle(item);
        rowStart = style.getPropertyValue("grid-row-start");
        
        // checks whether the item has been clicked 
        bool = item.getAttribute("clicked");

        // finds images
        image = item.getElementsByTagName("img")[0];
        
        if (image) { 
        // changes to row height are only necessary if and image is present
            height = image['height'] + 100 + 'px';

            // updating the new style
            updated = [...current];
            updated[rowStart - 1] = height;
            updated = updated.join(" ");

            // reverting current style
            current[rowStart - 1] = item.getAttribute('default');
            current = current.join(" ");
            
            // setting the style
            if (bool == "false") {
                grid.setAttribute("style", "grid-template-rows: " + updated);
                item.setAttribute("clicked", "true");
            } else {
                grid.setAttribute("style", "grid-template-rows: " + current);
                item.setAttribute("clicked", "false");
            }
        }
    })
  })
