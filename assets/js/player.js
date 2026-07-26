"use strict";

/* ============================================================
   DOM
============================================================ */

const video = document.getElementById("player-video");

const backButton = document.getElementById("back-button");

const prevButton = document.getElementById("player-prev");

const nextButton = document.getElementById("player-next");

const title = document.getElementById("player-title");

const category = document.getElementById("player-category");

const description = document.getElementById("player-description");



/* ============================================================
   PLAYLIST
============================================================ */

const playlist = JSON.parse(

    sessionStorage.getItem("creative-playlist") ||

    "[]"

);


if (!playlist.length) {

    console.warn("Playlist not found.");

}


/* ============================================================
   URL
============================================================ */

const params = new URLSearchParams(location.search);

const currentVideo = params.get("video");

let currentIndex = playlist.indexOf(currentVideo);

if (currentIndex < 0) {

    currentIndex = 0;

}

/* ============================================================
   LOAD VIDEO
============================================================ */

async function playVideo(index) {

    if (index < 0) {

        index = playlist.length - 1;

    }

    if (index >= playlist.length) {

        index = 0;

    }

    currentIndex = index;

    const file = playlist[currentIndex];

    const meta = JSON.parse(

        sessionStorage.getItem("creative-meta") ||

        "[]"

    );

    const current = meta.find(

        item => item.file === file

    );

    if (current) {

        title.textContent = current.title;

        category.textContent = current.category;

        description.textContent = current.description;

        document.title = current.title;

    }

    video.src = `assets/videos/${file}`;

    history.replaceState(

        {},

        "",

        `player.html?video=${encodeURIComponent(file)}`

    );

    video.load();

    try {

        await video.play();

    }

    catch (e) {

        console.log("Autoplay blocked");

    }

}

playVideo(currentIndex);

/* ============================================================
   BUTTONS
============================================================ */

backButton.addEventListener("click", () => {

    history.back();

});

prevButton.addEventListener("click", () => {

    playVideo(currentIndex - 1);

});

nextButton.addEventListener("click", () => {

    playVideo(currentIndex + 1);

});

/* ============================================================
   KEYBOARD
============================================================ */

document.addEventListener("keydown", e => {

    switch (e.key) {

        case "ArrowLeft":

            playVideo(currentIndex - 1);

            break;

        case "ArrowRight":

            playVideo(currentIndex + 1);

            break;

        case " ":

            e.preventDefault();

            video.paused

                ? video.play()

                : video.pause();

            break;

        case "m":

        case "M":

            video.muted = !video.muted;

            break;

        case "f":

        case "F":

            if (document.fullscreenElement) {

                document.exitFullscreen();

            }

            else {

                video.requestFullscreen();

            }

            break;

        case "Escape":

            if (document.fullscreenElement) {

                document.exitFullscreen();

            }

            break;

    }

});

/* ============================================================
   TOUCH SWIPE
============================================================ */

let startX = 0;

video.addEventListener(

    "touchstart",

    e => {

        startX = e.changedTouches[0].clientX;

    },

    {

        passive: true

    }

);

video.addEventListener(

    "touchend",

    e => {

        const endX = e.changedTouches[0].clientX;

        const diff = endX - startX;

        if (Math.abs(diff) < 70) return;

        if (diff > 0) {

            playVideo(currentIndex - 1);

        }

        else {

            playVideo(currentIndex + 1);

        }

    },

    {

        passive: true

    }

);

/* ============================================================
   IOS
============================================================ */

video.setAttribute("playsinline", "");

video.setAttribute("webkit-playsinline", "");

/* ============================================================
   END
============================================================ */