"use strict";

// Adjusts game frame size. Mostly to fix scrollbars on Chrome.

let resizeTimeout;

function resizeGameWindow() {
    let iframe = document.getElementById("game-window");
    if(window.innerWidth > window.innerHeight) {
        iframe.style.width = window.innerWidth + "px";
        iframe.style.height = window.innerHeight + "px";
    } else {
        iframe.style.height = window.innerWidth + "px";
        iframe.style.width = window.innerHeight + "px";
    }
}

function resizeTwice() {
    resizeGameWindow();
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeGameWindow, 500);
}

window.addEventListener("resize", resizeTwice);
window.addEventListener("orientationchange", resizeTwice);
