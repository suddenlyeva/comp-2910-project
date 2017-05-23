"use strict";

// Adjusts game frame size. Mostly to fix scrollbars on Chrome.

let resizeTimeout;

function resizeIframe() {
    let iframe = document.getElementById("game-window");
    if(window.innerWidth > window.innerHeight) {
        iframe.style.width = window.innerWidth + "px";
        iframe.style.height = window.innerHeight + "px";
    } else {
        iframe.style.height = window.innerWidth + "px";
        iframe.style.width = window.innerHeight + "px";
    }
    console.log("hello");
}

function waitToResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeIframe, 500);
}

window.addEventListener("resize", resizeIframe);
window.addEventListener("orientationchange", waitToResize);
