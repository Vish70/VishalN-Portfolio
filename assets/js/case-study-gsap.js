class CaseStudyGSAP {

    constructor() {

        if (typeof gsap === "undefined") return;

        gsap.registerPlugin(ScrollTrigger);

        this.root = document.querySelector(".case-study");

        if (!this.root) return;

        this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (this.reduceMotion) return;

        this.ctx = gsap.context(() => {

            this.setDefaults();

            this.heroAnimation();
            this.sectionHeaders();

            this.overviewAnimation();
            this.infoCardsAnimation();
            this.challengeAnimation();
            this.goalsAnimation();
            this.timelineAnimation();

            this.colorStrategyAnimation();
            this.showcaseAnimation();
            this.imageParallax();
            this.appointmentAnimation();

            this.highlightsAnimation();
            this.outcomeAnimation();
            this.nextProjectAnimation();


        }, this.root);

    }

    /* ==========================================================
       Defaults
    ========================================================== */

    setDefaults() {

        gsap.defaults({
            duration: 0.9,
            ease: "power3.out"
        });

    }

    /* ==========================================================
       Hero Animation
    ========================================================== */

    heroAnimation() {

        const hero = document.querySelector(".case-study__hero");

        if (!hero) return;

        const tl = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        tl.from(".case-study__badge", {
            opacity: 0,
            y: 20,
            duration: 0.5
        })

            .from(".case-study__title", {
                opacity: 0,
                y: 50,
                duration: 0.7
            }, "-=0.2")

            .from(".case-study__description", {
                opacity: 0,
                y: 30,
                duration: 0.6
            }, "-=0.35")

            .from(".case-study__actions", {
                opacity: 0,
                y: 25,
                duration: 0.5
            }, "-=0.3")

            .from(".case-study__hero-image", {
                opacity: 0,
                scale: 1.08,
                y: 40,
                duration: 1
            }, "-=0.6");

    }

    /* ==========================================================
       Section Headers
    ========================================================== */

    sectionHeaders() {

        gsap.utils.toArray(".case-study__section-header").forEach(header => {

            const tag = header.querySelector(".section-tag");
            const title = header.querySelector(".section-title");

            const tl = gsap.timeline({

                scrollTrigger: {
                    trigger: header,
                    start: "top 82%",
                    once: true
                }

            });

            if (tag) {

                tl.from(tag, {
                    opacity: 0,
                    y: 20
                });

            }

            if (title) {

                tl.from(title, {
                    opacity: 0,
                    y: 40
                }, "-=0.2");

            }

        });

    }
    /* ==========================================================
   Overview
========================================================== */

    overviewAnimation() {

        gsap.fromTo(

            ".case-study__overview-content",

            {
                opacity: 0,
                y: 50
            },

            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",

                scrollTrigger: {
                    trigger: ".case-study__overview",
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true
                }

            }

        );

    }
    /* ==========================================================
       Project Information
    ========================================================== */
infoCardsAnimation() {

    gsap.utils.toArray(
        ".case-study__project-info, .case-study__design-approach"
    ).forEach(section => {

        const cards = section.querySelectorAll(".case-study__info-card");

        if (!cards.length) return;

        gsap.fromTo(

            cards,

            {
                opacity: 0,
                y: 50
            },

            {
                opacity: 1,
                y: 0,

                stagger: .15,

                duration: .8,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: section,

                    start: "top 80%",

                    toggleActions: "play none none reverse",

                    invalidateOnRefresh: true

                }

            }

        );

    });

}




    /* ==========================================================
       goals Sections
    ========================================================== */


// goalsAnimation() {

//     gsap.utils.toArray(
//         ".case-study__design-goals, .case-study__design-approach"
//     ).forEach(section => {

//         const cards = section.querySelectorAll(".case-study__goal-card");

//         if (!cards.length) return;

//         gsap.fromTo(

//             cards,

//             {
//                 opacity: 0,
//                 y: 50,
//                 scale: 0.96
//             },

//             {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,

//                 duration: 0.8,

//                 ease: "power3.out",

//                 stagger: 0.12,

//                 scrollTrigger: {

//                     trigger: section,

//                     start: "top 80%",

//                     toggleActions: "play none none reverse",

//                     invalidateOnRefresh: true

//                 }

//             }

//         );

//     });

// }



    /* ==========================================================
       Showcase Sections
    ========================================================== */

    showcaseAnimation() {
        console.log("Showcase Animation Started");

        gsap.utils.toArray(".case-study__showcase").forEach(section => {

            const image = section.querySelector(".case-study__image");
            const text = section.querySelector(".case-study__text");

            const reverse = section.querySelector(".case-study__content--reverse");

            const imageX = reverse ? 60 : -60;
            const textX = reverse ? -60 : 60;

            const tl = gsap.timeline({

                scrollTrigger: {
                    trigger: section,
                    start: "top 72%",
                    invalidateOnRefresh: true
                }

            });

            if (image) {

                tl.fromTo(

                    image,

                    {
                        opacity: 0,
                        x: imageX,
                        scale: .96
                    },

                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: .9

                    }

                );

            }

            if (text) {

                tl.fromTo(

                    text,

                    {
                        opacity: 0,
                        x: textX
                    },

                    {
                        opacity: 1,
                        x: 0,
                        duration: .8

                    },

                    "-=0.55"

                );

            }

        });

    }

    /* ==========================================================
       Showcase Image Parallax
    ========================================================== */

    imageParallax() {

        gsap.utils.toArray(".case-study__image img").forEach(image => {

            gsap.to(image, {

                yPercent: -8,

                ease: "none",

                scrollTrigger: {

                    trigger: image,

                    start: "top bottom",

                    end: "bottom top",

                    scrub: true

                }

            });

        });

    }

    /* ==========================================================
       Appointment Section
    ========================================================== */

    /* ==========================================================
     Appointment Section
  ========================================================== */

    appointmentAnimation() {

        console.log("Appointment Started");

        const section = document.querySelector(".case-study__appointment");

        if (!section) return;

        const image = section.querySelector(".case-study__appointment-image");
        const content = section.querySelector(".case-study__appointment-content");
        const steps = section.querySelectorAll(".case-study__booking-step");

        if (!image || !content || !steps.length) return;

        const tl = gsap.timeline({

            scrollTrigger: {

                trigger: section,

                start: "top 75%",

                toggleActions: "play none none reverse",

                invalidateOnRefresh: true

            }

        });

        tl.fromTo(

            image,

            {
                opacity: 0,
                x: -70,
                scale: 0.96
            },

            {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out"
            }

        )

            .fromTo(

                content,

                {
                    opacity: 0,
                    x: 70
                },

                {
                    opacity: 1,
                    x: 0,
                    duration: 0.9,
                    ease: "power3.out"
                },

                "-=0.55"

            )

            .fromTo(

                steps,

                {
                    opacity: 0,
                    y: 25
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out"
                },

                "-=0.2"

            );

    }


    /* ==========================================================
       Highlights
    ========================================================== */
    /* ==========================================================
       Highlights
    ========================================================== */

    highlightsAnimation() {

        console.log("Highlights Started");

        const section = document.querySelector(".case-study__highlights");

        if (!section) return;

        const cards = section.querySelectorAll(".case-study__highlight-card");

        if (!cards.length) return;

        gsap.fromTo(

            cards,

            {
                opacity: 0,
                y: 40,
                scale: 0.95
            },

            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: {
                    each: 0.08
                },

                scrollTrigger: {

                    trigger: section,

                    start: "top 80%",

                    toggleActions: "play none none reverse",

                    invalidateOnRefresh: true

                }

            }

        );

    }

    /* ==========================================================
       Final Outcome
    ========================================================== */

    /* ==========================================================
       Final Outcome
    ========================================================== */

    outcomeAnimation() {

        const section = document.querySelector(".case-study__outcome");

        if (!section) return;

        const content = section.querySelector(".case-study__content");

        if (!content) return;

        gsap.fromTo(

            content,

            {
                opacity: 0,
                y: 50
            },

            {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: section,

                    start: "top 80%",

                    toggleActions: "play none none reverse",

                    invalidateOnRefresh: true

                }

            }

        );

    }

    /* ==========================================================
       Next Project
    ========================================================== */

    /* ==========================================================
       Next Project
    ========================================================== */

    nextProjectAnimation() {

        const section = document.querySelector(".case-study__next-project");

        if (!section) return;

        const card = section.querySelector(".case-study__next-card");

        if (!card) return;

        gsap.fromTo(

            card,

            {
                opacity: 0,
                scale: 0.94,
                y: 50
            },

            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.9,
                ease: "power3.out",

                scrollTrigger: {

                    trigger: section,

                    start: "top 80%",

                    toggleActions: "play none none reverse",

                    invalidateOnRefresh: true

                }

            }

        );

    }

    /* ==========================================================
       Destroy
    ========================================================== */

    destroy() {

        if (this.ctx) {

            this.ctx.revert();

        }

        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    }

} // End Class



/* ==========================================================
   Initialize
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    new CaseStudyGSAP();


    window.addEventListener("load", () => {

        if (typeof ScrollTrigger !== "undefined") {

            ScrollTrigger.refresh();

        }

    });

    let resizeTimer;

    window.addEventListener("resize", () => {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(() => {

            if (typeof ScrollTrigger !== "undefined") {

                ScrollTrigger.refresh();

            }

        }, 250);

    });

});

