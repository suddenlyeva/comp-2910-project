"use strict";

// Adjusts game frame size. Mostly to fix scrollbars on Chrome.

function resizeIframe() {
    let iframe = document.getElementById("game-window");
    if(window.innerWidth > window.innerHeight) {
        iframe.style.width = window.innerWidth + "px";
        iframe.style.height = window.innerHeight + "px";
    } else {
        iframe.style.height = window.innerWidth + "px";
        iframe.style.width = window.innerHeight + "px";
    }
}

window.addEventListener("resize", resizeIframe);
window.addEventListener("orientationchange", resizeIframe);
