$('.draggable').each(function(index, element){

    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
        
    }
    
    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.ontouchend = null;
    
        document.onmousemove = null;
        document.ontouchmove = null;
    }
    
    function elementDrag(e) {
        if(e.type === "touchmove"){
            pos1 = pos3 - e.changedTouches[0].clientX;
            pos2 = pos4 - e.changedTouches[0].clientY;
            pos3 = e.changedTouches[0].clientX;
            pos4 = e.changedTouches[0].clientY;
    
        }else{
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            e.preventDefault();
        }
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
});


$('.patch').on('click touchstart', function(e){
    const element = $(e.currentTarget);
    var transformValue = element.css("transform");
    // Extract rotation degree from matrix transform value
    var values = transformValue.split('(')[1].split(')')[0].split(',');
    var rotationDegree = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));    
    $(e.currentTarget).css("transform", `rotateZ(${rotationDegree+30}deg)`);
});

