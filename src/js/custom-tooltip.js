var tooltipContent = document.getElementsByClassName("tooltip-content");

/**
 * Horizontally centers the tooltip-box and places it above the assigned div.
 */
for(var i = 0; i < tooltipContent.length; i++) {
    var parentWidth = tooltipContent[i].parentElement.clientWidth;
    tooltipContent[i].style.top = -(tooltipContent[i].clientHeight + 5) + "px";
    tooltipContent[i].style.left = ((parentWidth - tooltipContent[i].clientWidth) / 2) + "px";

}
