"use strict";

(() => {

    const KEY = "portfolio-target";

    /* ---------------------------------------
       Save target before leaving case study
    --------------------------------------- */

    document.addEventListener("click", e => {

        const link = e.target.closest("a[href]");

        if (!link) return;

        const href = link.getAttribute("href");

        if (!href) return;

        if (!href.startsWith("index.html#")) return;

        const hash = href.split("#")[1];

        if (!hash) return;

        sessionStorage.setItem(KEY, hash);

    });


    /* ---------------------------------------
       Scroll after Home is ready
    --------------------------------------- */

    if (!location.pathname.endsWith("index.html") &&
        location.pathname !== "/") {

        return;

    }

    window.addEventListener("load", () => {

        const id = sessionStorage.getItem(KEY);

        if (!id) return;

        sessionStorage.removeItem(KEY);

        const target = document.getElementById(id);

        if (!target) return;

        const scroll = () => {

            const header =
                document.querySelector(".header");

            const offset =
                header?.offsetHeight || 80;

            const top =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                offset;

            window.scrollTo({

                top,

                behavior: "instant"

            });

        };

        scroll();

        requestAnimationFrame(scroll);

        setTimeout(scroll, 100);

        setTimeout(scroll, 300);

    });

})();