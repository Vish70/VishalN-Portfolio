/* ==========================================================
   DOM CACHE
========================================================== */

const body = document.body;

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");

const menuToggle = document.getElementById("menu-toggle");
const menuClose = document.getElementById("menu-close");
const mobileMenu = document.getElementById("mobile-menu");

const navLinks = [...document.querySelectorAll(".nav__link")];
const mobileLinks = [...document.querySelectorAll(".mobile-nav a")];

const sections = [...document.querySelectorAll("main section[id]")];

const scrollProgressBar = document.querySelector(".scroll-progress__bar");
const scrollTopButton = document.getElementById("scroll-top");

const filterButtons = [...document.querySelectorAll(".creative__filter")];
const creativeCards = [...document.querySelectorAll(".creative-card")];

const videoCards = [...document.querySelectorAll(".creative-card--video")];

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor__dot");
const cursorOutline = document.querySelector(".cursor__outline");

const preloader = document.getElementById("preloader");


/* ==========================================================
   APP STATE
========================================================== */

const builderState = {

    menuOpen: false,

    currentFilter: "all",

    touchDevice:
        window.matchMedia("(pointer: coarse)").matches,

    scrollTicking: false,

    resizeTicking: false

};


/* ==========================================================
   UTILITIES
========================================================== */

const $ = (selector, scope = document) =>
    scope.querySelector(selector);

const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];


/* ==========================================================
   DEBOUNCE
========================================================== */

function debounce(callback, delay = 200) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}


/* ==========================================================
   THROTTLE
========================================================== */

function throttle(callback, delay = 16) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        requestAnimationFrame(() => {

            waiting = false;

        });

    };

}


/* ==========================================================
   HELPERS
========================================================== */

function scrollPercent() {

    const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (max <= 0) return 0;

    return (window.scrollY / max) * 100;

}


function lockBody(lock = true) {

    body.classList.toggle("menu-open", lock);

}


function isDesktop() {

    return !builderState.touchDevice;

}


function isMobile() {

    return builderState.touchDevice;

}


/* ==========================================================
   SAFE GSAP
========================================================== */

function refreshScrollTrigger() {

    if (
        window.ScrollTrigger &&
        typeof ScrollTrigger.refresh === "function"
    ) {

        requestAnimationFrame(() => {

            ScrollTrigger.refresh();

        });

    }

}


/* ==========================================================
   PRELOADER
========================================================== */

function hidePreloader() {

    if (!preloader) {

        startApplication();

        return;

    }

    body.classList.add("loading");

    requestAnimationFrame(() => {

        preloader.classList.add("hide");

        setTimeout(() => {

            preloader.remove();

            body.classList.remove("loading");

            startApplication();

        }, 600);

    });

}


/* ==========================================================
   START APPLICATION
========================================================== */

function startApplication() {

    initMobileMenu();

    initHeader();

    initScrollProgress();

    initScrollTop();

    initActiveNavigation();

    initSmoothScroll();

    initCursor();

    initCreativeFilter();

    initCreativeVideos();

    initImageLightbox();

    bindGlobalEvents();

    if (typeof initGSAP === "function") {

        requestAnimationFrame(() => {

            initGSAP();

            refreshScrollTrigger();

        });

    }

}


/* ==========================================================
   GLOBAL EVENTS
========================================================== */

function bindGlobalEvents() {

    window.addEventListener(

        "scroll",

        throttle(() => {

            updateHeader();

            updateScrollProgress();

            updateScrollTop();

            updateActiveNavigation();

        })

    );


    window.addEventListener(

        "resize",

        debounce(() => {

            updateScrollProgress();

            refreshScrollTrigger();

        }, 200)

    );

}


/* ==========================================================
   APP INIT
========================================================== */

window.addEventListener("load", () => {

    hidePreloader();

});


/* ==========================================================
   MOBILE MENU
========================================================== */

function openMenu() {

    if (!mobileMenu || builderState.menuOpen) return;

    builderState.menuOpen = true;

    mobileMenu.classList.add("active");

    menuToggle?.classList.add("active");

    body.classList.add("menu-open");

    menuToggle?.setAttribute("aria-expanded", "true");

}


function closeMenu() {

    if (!mobileMenu || !builderState.menuOpen) return;

    builderState.menuOpen = false;

    mobileMenu.classList.remove("active");

    menuToggle?.classList.remove("active");

    body.classList.remove("menu-open");

    menuToggle?.setAttribute("aria-expanded", "false");

}


function toggleMenu() {

    builderState.menuOpen
        ? closeMenu()
        : openMenu();

}


/* ==========================================================
   MOBILE MENU EVENTS
========================================================== */

function initMobileMenu() {

    if (!mobileMenu) return;

    menuToggle?.addEventListener("click", toggleMenu);

    menuClose?.addEventListener("click", closeMenu);


    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    document.addEventListener("keydown", e => {

        if (
            e.key === "Escape" &&
            builderState.menuOpen
        ) {

            closeMenu();

        }

    });


    document.addEventListener("click", e => {

        if (!builderState.menuOpen) return;

        const clickedInsideMenu =
            mobileMenu.contains(e.target);

        const clickedToggle =
            menuToggle?.contains(e.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMenu();

        }

    });


    window.addEventListener("resize",

        debounce(() => {

            if (window.innerWidth >= 992) {

                closeMenu();

            }

        }, 200)

    );

}

/* ==========================================================
   HEADER
========================================================== */

function updateHeader() {

    if (!header) return;

    const scrolled = window.scrollY > 40;

    header.classList.toggle("scrolled", scrolled);

}


/* ==========================================================
   INIT HEADER
========================================================== */

function initHeader() {

    updateHeader();

}


/* ==========================================================
   SCROLL PROGRESS
========================================================== */

function updateScrollProgress() {

    if (!scrollProgressBar) return;

    scrollProgressBar.style.width =
        `${scrollPercent()}%`;

}


function initScrollProgress() {

    updateScrollProgress();

}


/* ==========================================================
   SCROLL TOP
========================================================== */

function updateScrollTop() {

    if (!scrollTopButton) return;

    scrollTopButton.classList.toggle(

        "show-scroll",

        window.scrollY > 500

    );

}


function initScrollTop() {

    updateScrollTop();

    scrollTopButton?.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/* ==========================================================
   ACTIVE NAVIGATION
========================================================== */

function updateActiveNavigation() {

    const currentScroll = window.scrollY + 160;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        const sectionHeight = section.offsetHeight;

        const id = section.id;

        const active =
            currentScroll >= sectionTop &&
            currentScroll < sectionTop + sectionHeight;

        if (!active) return;

        navLinks.forEach(link => {

            link.classList.toggle(

                "active",

                link.getAttribute("href") === `#${id}`

            );

        });

        mobileLinks.forEach(link => {

            link.classList.toggle(

                "active",

                link.getAttribute("href") === `#${id}`

            );

        });

    });

}


/* ==========================================================
   INIT ACTIVE NAV
========================================================== */

function initActiveNavigation() {

    updateActiveNavigation();

}


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

function initSmoothScroll() {

    [...navLinks, ...mobileLinks].forEach(link => {

        link.addEventListener("click", e => {

            const href = link.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const target = document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            closeMenu();

            const offset = header?.offsetHeight ?? 80;

            window.scrollTo({

                top: target.offsetTop - offset,

                behavior: "smooth"

            });

        });

    });

}

/* ==========================================================
   CURSOR
========================================================== */

function initCursor() {

    if (isMobile()) return;

    if (!cursor || !cursorDot || !cursorOutline) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let outlineX = mouseX;
    let outlineY = mouseY;

    const speed = 0.18;

    window.addEventListener("mousemove", e => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.transform =
            `translate(${mouseX}px, ${mouseY}px)`;

    });

    function animateCursor() {

        outlineX += (mouseX - outlineX) * speed;
        outlineY += (mouseY - outlineY) * speed;

        cursorOutline.style.transform =
            `translate(${outlineX}px, ${outlineY}px)`;

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    $$(
        `
        a,
        button,
        .btn,
        .creative-card,
        .service-card,
        .project-card,
        .skill-card,
        .contact__card
        `
    ).forEach(item => {

        item.addEventListener("mouseenter", () => {

            cursor.classList.add("cursor-hover");

        });

        item.addEventListener("mouseleave", () => {

            cursor.classList.remove("cursor-hover");

        });

    });

}


/* ==========================================================
   CREATIVE FILTER
========================================================== */

function initCreativeFilter() {

    if (!filterButtons.length) return;

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.filter;

            if (builderState.currentFilter === category) return;

            builderState.currentFilter = category;

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            creativeCards.forEach(card => {

                const show =
                    category === "all" ||
                    card.dataset.category === category;

                if (show) {

                    card.classList.remove("hidden");

                    requestAnimationFrame(() => {

                        card.style.opacity = "1";
                        card.style.transform = "scale(1)";

                    });


                    requestAnimationFrame(() => {

                        ScrollTrigger.refresh();

                    });

                }

                else {

                    card.style.opacity = "0";
                    card.style.transform = "scale(.95)";

                    setTimeout(() => {

                        card.classList.add("hidden");

                    }, 220);


                    setTimeout(() => {

                        ScrollTrigger.refresh();

                    }, 260);

                }

            });

        });

    });

}


/* ==========================================================
   VIDEO HOVER
========================================================== */


function initCreativeVideos() {

    const playlist = videoCards
        .map(card => card.dataset.video)
        .filter(Boolean);

    videoCards.forEach(card => {

        const video = card.querySelector("video");

        if (!video) return;

        /* Hover Preview (Desktop) */

        card.addEventListener("mouseenter", () => {

            if (builderState.touchDevice) return;

            video.play().catch(() => { });

        });

        card.addEventListener("mouseleave", () => {

            if (builderState.touchDevice) return;

            video.pause();

            video.currentTime = 0;

        });

        /* Open Player */

        card.addEventListener("click", () => {

            const file = card.dataset.video;

            if (!file) return;

            sessionStorage.setItem(

                "creative-playlist",

                JSON.stringify(playlist)

            );

            sessionStorage.setItem(

                "creative-meta",

                JSON.stringify(

                    videoCards.map(card => ({

                        file: card.dataset.video,

                        title: card.dataset.title,

                        category: card.dataset.category,

                        description: card.dataset.description

                    }))

                )

            );

            location.href =
                `player.html?video=${encodeURIComponent(file)}`;

        });

    });

}
/* ==========================================================
   IMAGE LIGHTBOX
========================================================== */

function initImageLightbox() {

    const imageCards = $$(".creative-card:not(.creative-card--video)");

    if (!imageCards.length) return;

    // const images = imageCards.map(card => card.querySelector("img"));

    const images = imageCards.map(card => card.querySelector("img, video"));

    let currentIndex = 0;

    const overlay = document.createElement("div");
    overlay.className = "lightbox";

    overlay.innerHTML = `
        <button class="lightbox__close" aria-label="Close">
            <i class="ri-close-line"></i>
        </button>

        <button class="lightbox__prev" aria-label="Previous">
            <i class="ri-arrow-left-s-line"></i>
        </button>

        <img class="lightbox__image" alt="Preview">

        <button class="lightbox__next" aria-label="Next">
            <i class="ri-arrow-right-s-line"></i>
        </button>
    `;

    document.body.appendChild(overlay);

    const preview = overlay.querySelector(".lightbox__image");
    const closeBtn = overlay.querySelector(".lightbox__close");
    const prevBtn = overlay.querySelector(".lightbox__prev");
    const nextBtn = overlay.querySelector(".lightbox__next");

    function open(index) {

        currentIndex = index;

        const media = images[index];

        if (media.tagName === "VIDEO") {

            preview.innerHTML = `
            <video controls autoplay playsinline>
                <source src="${media.currentSrc || media.src}">
            </video>
        `;

        } else {

            preview.src = media.currentSrc || media.src;
            preview.alt = media.alt || "";

        }

        overlay.classList.add("active");

        body.classList.add("lightbox-open");

    }

    function close() {

        overlay.classList.remove("active");

        body.classList.remove("lightbox-open");

    }

    function next() {

        currentIndex = (currentIndex + 1) % images.length;

        open(currentIndex);

    }
    function prev() {

        currentIndex =
            (currentIndex - 1 + images.length) %
            images.length;

        open(currentIndex);

    }

    imageCards.forEach((card, index) => {

        card.addEventListener("click", () => {

            open(index);

        });

    });

    closeBtn.addEventListener("click", close);

    nextBtn.addEventListener("click", next);

    prevBtn.addEventListener("click", prev);

    overlay.addEventListener("click", (e) => {

        if (e.target === overlay) {

            close();

        }

    });

    document.addEventListener("keydown", (e) => {

        if (!overlay.classList.contains("active")) return;

        switch (e.key) {

            case "Escape":

                close();

                break;

            case "ArrowRight":

                next();

                break;

            case "ArrowLeft":

                prev();

                break;

        }

    });


    /* ---------- Touch Swipe (iOS + Android) ---------- */

    let startX = 0;

    overlay.addEventListener("touchstart", (e) => {

        startX = e.changedTouches[0].clientX;

    }, { passive: true });

    overlay.addEventListener("touchend", (e) => {

        const endX = e.changedTouches[0].clientX;

        const distance = endX - startX;

        if (Math.abs(distance) < 60) return;

        if (distance > 0) {

            prev();

        } else {

            next();

        }

    }, { passive: true });

}


/* ==========================================================
   GLOBAL EVENTS
========================================================== */

function handleScroll() {

    updateHeader();

    updateScrollProgress();

    updateScrollTop();

    updateActiveNavigation();

}


function handleResize() {

    updateHeader();

    refreshScrollTrigger();

}


/* ==========================================================
   PERFORMANCE
========================================================== */

function bindGlobalEvents() {

    window.addEventListener(

        "scroll",

        throttle(handleScroll, 16),

        { passive: true }

    );

    window.addEventListener(

        "resize",

        debounce(handleResize, 200),

        { passive: true }

    );

}


/* ==========================================================
   IOS / SAFARI FIXES
========================================================== */

function initIOSFixes() {

    const videos = $$("video");

    videos.forEach(video => {

        video.setAttribute("playsinline", "");

        video.setAttribute("webkit-playsinline", "");

        video.setAttribute("muted", "");

        video.muted = true;

        video.preload = "metadata";

    });

}


/* ==========================================================
   ANDROID FIXES
========================================================== */

function initAndroidFixes() {

    $$("video").forEach(video => {

        video.controlsList = "nodownload";

        video.disablePictureInPicture = true;

    });

}


/* ==========================================================
   INTERSECTION OBSERVER
========================================================== */

function initLazyAnimations() {

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add("is-visible");

                observer.unobserve(entry.target);

            });

        },

        {

            threshold: .15

        }

    );

    $$(
        `
        .project-card,
        .service-card,
        .skill-card,
        .timeline__item,
        .creative-card
        `
    ).forEach(el => observer.observe(el));

}


/* ==========================================================
   FINAL INIT
========================================================== */

function startApplication() {

    initMobileMenu();

    initHeader();

    initScrollProgress();

    initScrollTop();

    initActiveNavigation();

    initSmoothScroll();

    initCursor();

    initCreativeFilter();

    initCreativeVideos();

    initImageLightbox();

    initIOSFixes();

    initAndroidFixes();

    initLazyAnimations();

    bindGlobalEvents();

    if (typeof initGSAP === "function") {

        initGSAP();

    }

    refreshScrollTrigger();

}



