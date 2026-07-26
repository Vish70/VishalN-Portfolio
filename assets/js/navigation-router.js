"use strict";

class NavigationRouter {

    constructor() {

        this.init();

    }

    init() {

        document.addEventListener("click", this.handleClick.bind(this));

        window.addEventListener("load", this.handleInitialHash.bind(this));

    }

    handleClick(e) {

        const link = e.target.closest("a[href]");

        if (!link) return;

        const href = link.getAttribute("href");

        if (!href) return;

        // index.html#section
        if (href.startsWith("index.html#")) {

            e.preventDefault();

            sessionStorage.setItem(
                "portfolio-scroll-target",
                href.split("#")[1]
            );

            window.location.href = "index.html";

        }

    }

    handleInitialHash() {

        const id = sessionStorage.getItem("portfolio-scroll-target");

        if (!id) return;

        sessionStorage.removeItem("portfolio-scroll-target");

        requestAnimationFrame(() => {

            const target = document.getElementById(id);

            if (!target) return;

            const header = document.querySelector(".header");

            const offset = header ? header.offsetHeight : 0;

            const top =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top,

                behavior: "smooth"

            });

        });

    }

}

new NavigationRouter();