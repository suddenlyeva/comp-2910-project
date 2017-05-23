"use strict";

// Adjusts game frame size. Mostly to fix scrollbars on Chrome.

function resizeIframe() {
    let iframe = document.getElementById("game-window");
    if(document.documentElement.clientWidth > document.documentElement.clientHeight) {
        iframe.style.width = document.documentElement.clientWidth + "px";
        iframe.style.height = document.documentElement.clientHeight + "px";
    } else {
        iframe.style.height = document.documentElement.clientWidth + "px";
        iframe.style.width = document.documentElement.clientHeight + "px";
    }
}

window.addEventListener("resize", resizeIframe);
window.addEventListener("orientationchange", resizeIframe);
