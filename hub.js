
"use strict";

var grid = document.getElementById("grid-container");
var gridStyle = getComputedStyle(grid);

var gridRows = gridStyle.getPropertyValue("grid-template-rows").split(" ");
var mainElements = document.getElementsByClassName("mn").length;

var style, rowStart, bool, height, image, current, currentStyle, updated;


// maybe change to setPropertyValue
document.querySelectorAll('.mn').forEach(item => {

    item.addEventListener('click', event => {
        
        currentStyle = getComputedStyle(grid);
        current = currentStyle.getPropertyValue("grid-template-rows").split(" ");

        style = getComputedStyle(item);
        rowStart = style.getPropertyValue("grid-row-start");
    
        bool = item.getAttribute("clicked");
        image = item.getElementsByTagName("img")[0];
    
        if (image) {
            height = image['height'] + 100 + 'px';

            updated = [...current];
    
            updated[rowStart - 1] = height;
            updated = updated.join(" ");
            current[rowStart - 1] = item.getAttribute('default');
            current = current.join(" ");
    
            if (bool == "true") {
                grid.setAttribute("style", "grid-template-rows: " + updated);
                item.setAttribute("clicked", "false");
            } else {
                grid.setAttribute("style", "grid-template-rows: " + current);
                item.setAttribute("clicked", "true");
            }
        }

    })
  })