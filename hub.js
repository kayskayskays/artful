
"use strict"; 

// TODO:
// row 4 bug, since default row size is larger than height :(

var hiddenStyle, currentStyle, hidden, current, updatedHidden, updated;
var rowStart, bool, heights, image, defaultWidth;
var summary, details, detailList, index = 2;

var grid = document.getElementById("grid-container");

var main = document.querySelector('main');
var html = document.querySelector('html');
var body = document.querySelector('body');

var docHeight = getComputedStyle(main).getPropertyValue('height');

var current = ["60px"];

var toggle = document.getElementById('toggle');

var heights = [];
var maxHeights = [];


toggle.onclick = function() {
    toggle.classList.toggle('active');
    body.classList.toggle('active');
    html.classList.toggle('active');
}

function findMaxHeight(item, detail) {

    var maxHeight = 0;

    item.querySelectorAll('details').forEach(det => {

        var propHeight = getComputedStyle(det).getPropertyValue('height');

        if (det != detail) {
            if (parseFloat(propHeight) > maxHeight) {
                maxHeight = parseFloat(propHeight);
            } 
        }
    })

    return maxHeight;

}

function setDefaultHeights(item) {

    var main = item.getElementsByClassName('mn')[0];
    var summary = main.querySelector('summary');
    var defaultHeight = getComputedStyle(summary).getPropertyValue('height');
    defaultHeight = parseFloat(defaultHeight) + 5;
    item.setAttribute('default', defaultHeight + 'px');

}


function createRows(item) {

    defaultWidth = item.getAttribute("default");
    current.push(defaultWidth);

    current = current.join(" ");
    item.setAttribute("style", "grid-row: " + index + " / " + (index + 1) + "; grid-template-rows: " + defaultWidth);
    grid.setAttribute("style", "grid-template-rows: " + current);

    current = current.split(" ");
    index++;

}

function setStyle(item, detail) {

    if (bool == "false") {
        item.setAttribute("style", "grid-template-rows: " + updatedHidden + "; grid-row-start: " + rowStart + "; grid-row-end: " + (parseFloat(rowStart) + 1));
        grid.setAttribute("style", "grid-template-rows: " + updated);
        detail.getElementsByTagName('summary')[0].setAttribute("clicked", "true");
    } else {
        item.setAttribute("style", "grid-template-rows: " + hidden + "; grid-row-start: " + rowStart + "; grid-row-end: " + (parseFloat(rowStart) + 1));
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

}

function updateStyles(item, detail) {
    // updating the new style
    updated = [...current];
    if (heights[rowStart - 1]) {
        updated[rowStart - 1] = heights[rowStart - 1];
    } // condition may be unnecessary 
    updated = updated.join(" ");

    // updating the hidden style
    updatedHidden = [heights[rowStart - 1]];

    maxHeights[rowStart - 1] = findMaxHeight(item, detail);

    var defHeight = getComputedStyle(item.getElementsByClassName('mn')[0].querySelector('summary')).getPropertyValue('height');

    if (maxHeights[rowStart - 1] > parseFloat(defHeight)) {
        current[rowStart - 1] = maxHeights[rowStart - 1] + 'px';
        hidden[0] = maxHeights[rowStart - 1] + 'px';
    } else {
        current[rowStart - 1] = defHeight;
        hidden[0] = defHeight;
    }

    current = current.join(" ");
    hidden = hidden.join(" ");
}


document.querySelectorAll('.hidden').forEach(item => {

    setDefaultHeights(item);
    createRows(item);

    // listening for clicks on the summaries
    detailList = item.getElementsByTagName('details');
    Array.from(detailList).forEach(detail => {

        detail.getElementsByTagName('summary')[0].addEventListener('click', event => {
            
            getStyles(item, detail);

            if (detail.getElementsByClassName('hidden-image').length > 0) {
                var image = detail.getElementsByClassName('hidden-image')[0];
                var propHeight = getComputedStyle(item).getPropertyValue('height');

                if (parseFloat(propHeight) <= parseFloat(getComputedStyle(item.getElementsByClassName('mn')[0].querySelector('summary')).getPropertyValue('height'))) {
                    heights[rowStart - 1] = getComputedStyle(item.getElementsByClassName('mn')[0].querySelector('summary')).getPropertyValue('height');
                }

                if (parseFloat(image['height']) + parseFloat(getComputedStyle(detail.getElementsByTagName('summary')[0]).getPropertyValue('height') + 24) > parseFloat(propHeight)) {
                    heights[rowStart - 1] = parseFloat(image['height']) + parseFloat(getComputedStyle(detail.getElementsByTagName('summary')[0]).getPropertyValue('height')) + 24 + 'px';
                }

            } else if (detail.getElementsByClassName('hidden-text').length > 0) {
                var text = detail.getElementsByClassName('hidden-text')[0];
                var propHeight = getComputedStyle(item).getPropertyValue('height');

                if (parseFloat(propHeight) <= parseFloat(getComputedStyle(item.getElementsByClassName('mn')[0].querySelector('summary')).getPropertyValue('height'))) {
                    heights[rowStart - 1] = getComputedStyle(item.getElementsByClassName('mn')[0].querySelector('summary')).getPropertyValue('height');
                }

                if (parseFloat(text['clientHeight']) + parseFloat(getComputedStyle(detail.getElementsByTagName('summary')[0]).getPropertyValue('height')) + 16 > parseFloat(propHeight)) {
                    heights[rowStart - 1] = parseFloat(text['clientHeight']) + parseFloat(getComputedStyle(detail.getElementsByTagName('summary')[0]).getPropertyValue('height')) + 16 + 'px';
                }

            }

            updateStyles(item, detail);
            setStyle(item, detail);

            docHeight = getComputedStyle(main).getPropertyValue('height');
            html.setAttribute('style', 'height: ' + docHeight);
            body.setAttribute('style', 'height: ' + docHeight);

        }) 
    })
})
