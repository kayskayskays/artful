
"use strict"; 

var hiddenStyle, currentStyle, hidden, current, updatedHidden, updated;
var rowStart, bool, height, image, defaultWidth, rows, docHeight = 0;
var summary, details, detailList, index = 2;

var grid = document.getElementById("grid-container");

var current = ["60px"];

var toggle = document.getElementById('toggle');
var body = document.querySelector('html');

toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
}


function createRows(item) {

    defaultWidth = item.getAttribute("default");
    current.push(defaultWidth);

    current = current.join(" ");
    item.setAttribute("style", "grid-row: " + index + " / " + (index + 1));
    grid.setAttribute("style", "grid-template-rows: " + current);

    current = current.split(" ");
    index++;

}

function setStyle(item, detail) {

    if (bool == "false") {
        item.setAttribute("style", "grid-template-rows: " + updatedHidden + "; grid-row-start: " + rowStart + "; grid-row-end: " + (parseInt(rowStart) + 1));
        grid.setAttribute("style", "grid-template-rows: " + updated);
        detail.getElementsByTagName('summary')[0].setAttribute("clicked", "true");
    } else {
        item.setAttribute("style", "grid-template-rows: " + hidden + "; grid-row-start: " + rowStart + "; grid-row-end: " + (parseInt(rowStart) + 1));
        grid.setAttribute("style", "grid-template-rows: " + current);
        detail.getElementsByTagName('summary')[0].setAttribute("clicked", "false");
    }

}

function getStyles(item, detail) {

    // stores information about the current grid style
    currentStyle = getComputedStyle(grid);
    current = currentStyle.getPropertyValue("grid-template-rows").split(" ");

    // stores information about the current main item style
    hiddenStyle = getComputedStyle(item);
    rowStart = hiddenStyle.getPropertyValue("grid-row-start");
    hidden = hiddenStyle.getPropertyValue("grid-template-rows").split(" ");
    
    // checks whether the item has been clicked 
    bool = detail.getElementsByTagName('summary')[0].getAttribute("clicked");

    // finds images // needs to be fixed
    image = detail.getElementsByTagName("img")[0];

}

function updateStyles(item) {
    // updating the new style
    updated = [...current];
    updated[rowStart - 1] = height;
    updated = updated.join(" ");

    // updating the hidden style
    updatedHidden = [height];

    // reverting current style
    current[rowStart - 1] = item.getAttribute('default');
    current = current.join(" ");

    // reverting hidden style
    hidden[0] = item.getAttribute('default');
    hidden = hidden.join(" ");
}


document.querySelectorAll('.hidden').forEach(item => {

    createRows(item);

    // listening for clicks on the summaries
    detailList = item.getElementsByTagName('details');
    Array.from(detailList).forEach(detail => {

        detail.getElementsByTagName('summary')[0].addEventListener('click', event => {
            
            getStyles(item, detail);

            if (image) { 
            // changes to row height are only necessary if an image is present
                height = image['height'] + 100 + 'px';
                
                updateStyles(item);
                
                setStyle(item, detail);
            }
        }) 
    })
})
