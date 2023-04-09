# artful 
## A sample website created to demonstrate a tab based design.

### Description

The most significant part of this project is the Javascript that was used in order to alter the grid template that the website was designed using. 

A design using one larger grid, and subgrids for each row, was implemented. This project enables extra rows and elements to be automatically sized correctly and for tabs to function properly with very little overhead (in terms of required HTML code). 

### Usage

Each row has been formatted to support a 'sidebar' item, a 'main' item, and a 'sidemain' item - at least a 'main' element should be included. In order to create a new row, one might use the following sample syntax: 

```
<!--hidden item-->
<div class = "hidden">

    <!--sidebar item-->
    <div class = "sb">
        <details closed>
            <summary clicked = "false"> [text] </summary>
            <p class = "hidden-text"> [text] </p>
        </details>  
    </div>
    
    <!--main item-->
    <div class = "mn">
        <details closed>
            <summary clicked = "false"> [text] </summary>
            <img class = "hidden-image" src = <"source"> height = <"height"> width = "auto">
        </details>
    </div>
    
    <!--sidemain item-->
    <div class = "sm">
        <details closed>
            <summary clicked = "false"> [text] </summary>
            <p class = "hidden-text"> [text] </p>
        </details>
    </div>

</div>
```

The ``` "hidden-text" ``` and ``` "hidden-image" ``` CSS classes are made to adjust the design of the concealed elements, and should be provided depending on whether the item being concealed contains an image or text.

### Credits

Inspiration was drawn from https://www.pg-lang.com/. <br>
Project was curated by https://github.com/kayskayskays.




 

