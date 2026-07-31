/**
 * ==========================================================================
 * CASE STUDY
 * ==========================================================================
 */

class CaseStudy {

    constructor() {

        this.currentIndex = 0;

        this.touchStartX = 0;

        this.touchEndX = 0;

        this.activeTrigger = null;

        this.cacheDom();

        if (!this.lightbox || !this.images.length) {

            return;

        }

        this.bindEvents();

        this.prepareGallery();

    }

    /* ==========================================================================
       CACHE DOM
    ========================================================================== */

    cacheDom() {

        // this.gallery = [
        //     ...document.querySelectorAll(".case-study__image")
        // ];

        this.gallery = [
            ...document.querySelectorAll(".case-study__image, .case-study__appointment-image")
        ];

        this.images = this.gallery
            .map(item => item.querySelector("img, video"))
            .filter(Boolean);

        this.expandButtons = [
            ...document.querySelectorAll(".case-study__expand")
        ];

        this.lightbox = document.querySelector(".case-study__lightbox");

        if (!this.lightbox) return;

        this.lightboxImage = this.lightbox.querySelector(
            ".case-study__lightbox-image"
        );

        this.lightboxCaption = this.lightbox.querySelector(
            ".case-study__lightbox-caption"
        );

        this.lightboxCounter = this.lightbox.querySelector(
            ".case-study__lightbox-counter"
        );

        this.closeButton = this.lightbox.querySelector(
            ".case-study__lightbox-close"
        );

        this.prevButton = this.lightbox.querySelector(
            ".case-study__lightbox-prev"
        );

        this.nextButton = this.lightbox.querySelector(
            ".case-study__lightbox-next"
        );

    }

    /* ==========================================================================
       EVENTS
    ========================================================================== */

    bindEvents() {

        this.expandButtons.forEach((button, index) => {

            button.addEventListener("click", event => {

                event.preventDefault();

                this.open(index, button);

            });

        });

        this.closeButton?.addEventListener("click", () => {

            this.close();

        });

        this.prevButton?.addEventListener("click", () => {

            this.previous();

        });

        this.nextButton?.addEventListener("click", () => {

            this.next();

        });

        this.lightboxImage?.addEventListener(
            "touchstart",
            this.handleTouchStart,
            { passive: true }
        );

        this.lightboxImage?.addEventListener(
            "touchend",
            this.handleTouchEnd,
            { passive: true }
        );


        this.lightbox?.addEventListener("click", event => {

            if (event.target === this.lightbox) {

                this.close();

            }

        });

        document.addEventListener(
            "keydown",
            this.handleKeyboard
        );

    }

    /* ==========================================================================
       PREPARE
    ========================================================================== */

    prepareGallery() {

        this.images.forEach(image => {

            image.loading = "lazy";

            image.decoding = "async";

        });

    }

    /* ==========================================================================
   LIGHTBOX
========================================================================== */

    open(index, trigger) {
        console.log("OPEN CALLED", index);
        this.currentIndex = index;

        this.activeTrigger = trigger;

        this.update();

        this.lockScroll();

        this.lightbox.hidden = false;

        this.lightbox.classList.add("active");

        this.lightbox.setAttribute("aria-hidden", "false");

        this.closeButton?.focus();

    }

    close() {

        this.lightbox.classList.remove("active");

        this.lightbox.hidden = true;

        this.lightbox.setAttribute("aria-hidden", "true");

        this.unlockScroll();

        this.restoreFocus();

    }

    /* ==========================================================================
       UPDATE
    ========================================================================== */

    update() {

        console.log("UPDATE START");

        const image = this.images[this.currentIndex];

        if (!image) {

            return;

        }

        const source = image.currentSrc || image.src;

        console.log("IMAGE:", image);
        console.log("SOURCE:", source);
        console.log("LIGHTBOX IMG:", this.lightboxImage);

        if (image.tagName === "VIDEO") {

            if (this.lightboxImage.tagName === "IMG") {

                const video = document.createElement("video");

                video.className = this.lightboxImage.className;

                video.controls = true;

                video.autoplay = true;

                video.loop = true;

                video.playsInline = true;

                video.preload = "metadata";

                video.setAttribute("playsinline", "");

                video.setAttribute("webkit-playsinline", "");

                video.muted = true;
                video.src = source;
                video.load();
                video.play().catch(() => { });

                this.lightboxImage.replaceWith(video);

                this.lightboxImage = video;

            } else {

                this.lightboxImage.src = source;

                this.lightboxImage.load?.();

                this.lightboxImage.play?.().catch(() => { });

            }

        } else {

            if (this.lightboxImage.tagName === "VIDEO") {

                const img = document.createElement("img");

                img.className = this.lightboxImage.className;

                this.lightboxImage.replaceWith(img);

                this.lightboxImage = img;

            }

            this.lightboxImage.src = source;

            this.lightboxImage.alt = image.alt || "";

        }

        const caption =

            image.dataset.caption ||

            image.getAttribute("data-caption") ||

            image.alt ||

            "";

        if (this.lightboxCaption) {

            this.lightboxCaption.textContent = caption;

        }

        if (this.lightboxCounter) {

            this.lightboxCounter.textContent =
                `${this.currentIndex + 1} / ${this.images.length}`;

        }

        this.preload();

    }

    /* ==========================================================================
       SCROLL
    ========================================================================== */

    lockScroll() {

        document.body.classList.add("case-study-lock");

    }

    unlockScroll() {

        document.body.classList.remove("case-study-lock");

    }

    /* ==========================================================================
       FOCUS
    ========================================================================== */

    restoreFocus() {

        if (!this.activeTrigger) {

            return;

        }

        this.activeTrigger.focus();

    }

    /* ==========================================================================
   NAVIGATION
========================================================================== */

    next() {

        this.currentIndex =
            (this.currentIndex + 1) % this.images.length;

        this.update();

    }

    previous() {

        this.currentIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;

        this.update();

    }

    /* ==========================================================================
       PRELOAD
    ========================================================================== */

    preload() {

        if (this.images.length < 2) {

            return;

        }

        const nextIndex =
            (this.currentIndex + 1) % this.images.length;

        const previousIndex =
            (this.currentIndex - 1 + this.images.length) % this.images.length;

        [nextIndex, previousIndex].forEach(index => {

            const source =
                this.images[index]?.currentSrc ||
                this.images[index]?.src;

            if (!source) {

                return;

            }

            const image = new Image();

            image.src = source;

        });

    }

    /* ==========================================================================
       KEYBOARD
    ========================================================================== */

    handleKeyboard = event => {

        if (!this.lightbox.classList.contains("active")) {

            return;

        }

        switch (event.key) {

            case "Escape":

                this.close();

                break;

            case "ArrowRight":

                this.next();

                break;

            case "ArrowLeft":

                this.previous();

                break;

        }

    };

    /* ==========================================================================
       TOUCH
    ========================================================================== */

    handleTouchStart = event => {

        this.touchStartX =
            event.changedTouches[0].clientX;

    };

    handleTouchEnd = event => {

        this.touchEndX =
            event.changedTouches[0].clientX;

        this.handleSwipe();

    };

    handleSwipe() {

        const distance =
            this.touchStartX - this.touchEndX;

        const threshold = 60;

        if (Math.abs(distance) < threshold) {

            return;

        }

        if (distance > 0) {

            this.next();

            return;

        }

        this.previous();

    }

    /* ==========================================================================
   ACCESSIBILITY
========================================================================== */

    trapFocus = event => {

        if (!this.lightbox.classList.contains("active")) {

            return;

        }

        if (event.key !== "Tab") {

            return;

        }

        const focusable = this.lightbox.querySelectorAll(
            'button,[href],[tabindex]:not([tabindex="-1"])'
        );

        if (!focusable.length) {

            return;

        }

        const first = focusable[0];

        const last = focusable[focusable.length - 1];

        if (event.shiftKey) {

            if (document.activeElement === first) {

                event.preventDefault();

                last.focus();

            }

            return;

        }

        if (document.activeElement === last) {

            event.preventDefault();

            first.focus();

        }

    };

    /* ==========================================================================
       RESIZE
    ========================================================================== */

    handleResize = () => {

        if (!this.lightbox.classList.contains("active")) {

            return;

        }

        this.update();

    };

    /* ==========================================================================
       IMAGE ERROR
    ========================================================================== */

    handleImageError = () => {

        if (!this.lightboxImage) {

            return;

        }

        this.lightboxImage.alt = "Unable to load image.";

        if (this.lightboxCaption) {

            this.lightboxCaption.textContent = "Image unavailable.";

        }

    };

    /* ==========================================================================
       DESTROY
    ========================================================================== */

    destroy() {

        document.removeEventListener(
            "keydown",
            this.handleKeyboard
        );

        document.removeEventListener(
            "keydown",
            this.trapFocus
        );

        window.removeEventListener(
            "resize",
            this.handleResize
        );

        this.lightboxImage?.removeEventListener(
            "touchstart",
            this.handleTouchStart
        );

        this.lightboxImage?.removeEventListener(
            "touchend",
            this.handleTouchEnd
        );

        this.lightboxImage?.removeEventListener(
            "error",
            this.handleImageError
        );

    }

} // ✅ CaseStudy class ends here

/* ==========================================================================
   INITIALIZE
========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const caseStudy = new CaseStudy();

    if (!caseStudy.lightbox) {

        return;

    }

    document.addEventListener(
        "keydown",
        caseStudy.trapFocus
    );

    window.addEventListener(
        "resize",
        caseStudy.handleResize
    );

    caseStudy.lightboxImage?.addEventListener(
        "error",
        caseStudy.handleImageError
    );

    caseStudy.lightboxImage?.addEventListener(
        "touchstart",
        caseStudy.handleTouchStart,
        { passive: true }
    );

    caseStudy.lightboxImage?.addEventListener(
        "touchend",
        caseStudy.handleTouchEnd,
        { passive: true }
    );
});