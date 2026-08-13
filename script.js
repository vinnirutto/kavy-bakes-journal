/* =========================================================
   KAVY BAKES FLIP BOOK
========================================================= */

const pages = document.querySelectorAll(".page");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

const currentPageDisplay =
    document.getElementById("currentPage");

let currentPage = 0;


/* =========================================================
   SET PAGE STACK
========================================================= */

function updateStack() {

    pages.forEach((page, index) => {

        if (index < currentPage) {

            page.classList.add("flipped");

            page.style.zIndex = index + 1;

        } else {

            page.classList.remove("flipped");

            page.style.zIndex =
                pages.length - index + 10;

        }

    });

}


/* =========================================================
   UPDATE CONTROLS
========================================================= */

function updateControls() {

    currentPageDisplay.textContent =
        String(currentPage + 1).padStart(2, "0");

    prevBtn.disabled =
        currentPage === 0;

    nextBtn.disabled =
        currentPage === pages.length - 1;

}


/* =========================================================
   NEXT
========================================================= */

function nextPage() {

    if (currentPage >= pages.length - 1) {
        return;
    }

    currentPage++;

    updateStack();

    updateControls();

}


/* =========================================================
   PREVIOUS
========================================================= */

function previousPage() {

    if (currentPage <= 0) {
        return;
    }

    currentPage--;

    updateStack();

    updateControls();

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {

        nextPage();

    }

    if (event.key === "ArrowLeft") {

        previousPage();

    }

});


/* =========================================================
   SWIPE
========================================================= */

let startX = 0;

let startY = 0;


document.getElementById("book").addEventListener(
    "touchstart",
    function(event) {

        startX =
            event.changedTouches[0].screenX;

        startY =
            event.changedTouches[0].screenY;

    },
    {
        passive: true
    }
);


document.getElementById("book").addEventListener(
    "touchend",
    function(event) {

        const endX =
            event.changedTouches[0].screenX;

        const endY =
            event.changedTouches[0].screenY;


        const differenceX =
            endX - startX;

        const differenceY =
            endY - startY;


        if (
            Math.abs(differenceX) >
            Math.abs(differenceY)
        ) {

            if (differenceX < -50) {

                nextPage();

            }

            if (differenceX > 50) {

                previousPage();

            }

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   WHATSAPP
========================================================= */
function orderWhatsApp(cakeName) {

    const phone = "254702361521";

    const message =
        `Hello Kavy Bakes! 👋 I am interested in ${cakeName}. I would like to make an inquiry.`;

    const url =
        `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

/* =========================================================
   START
========================================================= */

updateStack();

updateControls();

/* =========================================================
   KAVY BAKES — BIRTHDAY IMAGE SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const birthdaySlider =
        document.querySelector(".birthday-slider");

    if (!birthdaySlider) return;


    const images =
        birthdaySlider.querySelectorAll(".birthday-image");

    const dots =
        birthdaySlider.querySelectorAll(".birthday-dot");


    if (images.length <= 1) return;


    let currentImage = 0;

    let slideTimer;


    /* =====================================================
       SHOW IMAGE
    ===================================================== */

    function showBirthdayImage(index) {

        images.forEach((image, i) => {

            image.classList.toggle(
                "active",
                i === index
            );

        });


        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === index
            );

        });


        currentImage = index;
    }


    /* =====================================================
       NEXT IMAGE
    ===================================================== */

    function nextBirthdayImage() {

        let next =
            currentImage + 1;

        if (next >= images.length) {
            next = 0;
        }

        showBirthdayImage(next);
    }


    /* =====================================================
       AUTOMATIC SLIDE
    ===================================================== */

    function startBirthdaySlider() {

        clearInterval(slideTimer);

        slideTimer = setInterval(
            nextBirthdayImage,
            3500
        );
    }


    /* =====================================================
       DOT CLICK
    ===================================================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", (event) => {

            event.stopPropagation();

            showBirthdayImage(index);

            startBirthdaySlider();

        });

    });


    /* =====================================================
       MOUSE / CURSOR
       Move to next image when touching frame
    ===================================================== */

    birthdaySlider.addEventListener(
        "mouseenter",
        () => {

            nextBirthdayImage();

            startBirthdaySlider();

        }
    );


    /* =====================================================
       TOUCH / PHONE SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    birthdaySlider.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    birthdaySlider.addEventListener(
        "touchend",
        (event) => {

            touchEndX =
                event.changedTouches[0].screenX;

            handleBirthdaySwipe();

        },
        { passive: true }
    );


    function handleBirthdaySwipe() {

        const distance =
            touchEndX - touchStartX;


        /* SWIPE LEFT */

        if (distance < -40) {

            nextBirthdayImage();

            startBirthdaySlider();

        }


        /* SWIPE RIGHT */

        else if (distance > 40) {

            let previous =
                currentImage - 1;


            if (previous < 0) {
                previous = images.length - 1;
            }


            showBirthdayImage(previous);

            startBirthdaySlider();

        }

    }


    /* =====================================================
       START
    ===================================================== */

    showBirthdayImage(0);

    startBirthdaySlider();

});
/* =========================================================
   KAVY BAKES — WEDDING PHOTO STACK
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const stack =
        document.querySelector(".wedding-stack");

    if (!stack) return;


    const cards = [
        stack.querySelector(".wedding-card-1"),
        stack.querySelector(".wedding-card-2"),
        stack.querySelector(".wedding-card-3")
    ];


    const counter =
        stack.querySelector(".wedding-current");


    let current = 1;

    let moving = false;

    let hoverReady = true;


    /* =====================================================
       PREVENT BOOK FROM USING PHOTO AS PAGE TURN
    ===================================================== */

    [
        "pointerdown",
        "pointerup",
        "mousedown",
        "mouseup"
    ].forEach(type => {

        stack.addEventListener(
            type,
            event => {

                event.stopPropagation();

            },
            true
        );

    });


    /* =====================================================
       NEXT PHOTOGRAPH
    ===================================================== */

    function nextWeddingPhoto() {

        if (moving) return;

        moving = true;


        /*
         * Front photograph physically
         * leaves the stack.
         */

        stack.classList.add("show-next");


        /*
         * Wait until the front photograph
         * has completely moved away.
         */

        setTimeout(() => {


            /*
             * Move the front card to the back.
             */

            const first =
                cards.shift();


            cards.push(first);


            /*
             * Change the z-index order.
             */

            cards.forEach((card, index) => {

                card.style.zIndex =
                    index + 1;

            });


            /*
             * Remove animation class.
             */

            stack.classList.remove(
                "show-next"
            );


            /*
             * Reset the physical positions.
             */

            cards[0].style.transform =
                "rotate(-1deg)";

            cards[1].style.transform =
                "rotate(5deg) translate(25px,15px)";

            cards[2].style.transform =
                "rotate(-4deg) translate(-16px,8px)";


            /*
             * Update counter.
             */

            current++;

            if (current > 3) {

                current = 1;

            }


            if (counter) {

                counter.textContent =
                    String(current)
                    .padStart(2,"0");

            }


            moving = false;

        }, 800);

    }


    /* =====================================================
       DESKTOP
       
       CURSOR ENTERS PHOTO
    ===================================================== */

    stack.addEventListener(
        "mouseenter",
        () => {

            if (!hoverReady) return;


            hoverReady = false;


            nextWeddingPhoto();


            /*
             * Prevent rapid cycling while
             * cursor remains over the frame.
             */

            setTimeout(() => {

                hoverReady = true;

            }, 1200);

        }
    );


    /* =====================================================
       PHONE TAP
    ===================================================== */

    stack.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            nextWeddingPhoto();

        }
    );


    /* =====================================================
       PHONE SWIPE
    ===================================================== */

    let startX = 0;

    let startY = 0;


    stack.addEventListener(
        "touchstart",
        event => {

            event.stopPropagation();


            const touch =
                event.changedTouches[0];


            startX =
                touch.clientX;

            startY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    stack.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const touch =
                event.changedTouches[0];


            const endX =
                touch.clientX;

            const endY =
                touch.clientY;


            const differenceX =
                endX - startX;

            const differenceY =
                endY - startY;


            if (
                Math.abs(differenceX) >
                Math.abs(differenceY)
                &&
                Math.abs(differenceX) > 40
            ) {

                nextWeddingPhoto();

            }

        },
        {
            passive: false
        }
    );

});
/* =========================================================
   KAVY BAKES — GRADUATION SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const graduationSlider =
        document.querySelector(".graduation-slider");

    if (!graduationSlider) return;


    /* =====================================================
       GET SLIDES
    ===================================================== */

    const slides =
        graduationSlider.querySelectorAll(
            ".graduation-slide"
        );

    const counter =
        graduationSlider.querySelector(
            ".graduation-current"
        );


    if (slides.length === 0) return;


    let currentSlide = 0;

    let isChanging = false;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showGraduationSlide(index) {

        if (isChanging) return;

        isChanging = true;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;


        /* Update counter */

        if (counter) {

            counter.textContent =
                String(currentSlide + 1)
                .padStart(2, "0");

        }


        setTimeout(() => {

            isChanging = false;

        }, 700);

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextGraduationSlide() {

        let next =
            currentSlide + 1;


        if (next >= slides.length) {

            next = 0;

        }


        showGraduationSlide(next);

    }


    /* =====================================================
       AUTOMATIC CHANGE
       
       3000 = 3 SECONDS
    ===================================================== */

    const graduationTimer =
        setInterval(() => {

            nextGraduationSlide();

        }, 3000);


    /* =====================================================
       PC HOVER
       
       Moving onto the Graduation frame
       advances to the next image.

       IMPORTANT:
       It does NOT turn the journal page.
    ===================================================== */

    let hoverLocked = false;


    graduationSlider.addEventListener(
        "mouseenter",
        event => {

            event.stopPropagation();


            if (hoverLocked) return;


            hoverLocked = true;


            nextGraduationSlide();


            setTimeout(() => {

                hoverLocked = false;

            }, 1200);

        }
    );


    /* =====================================================
       PHONE TAP
    ===================================================== */

    graduationSlider.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            nextGraduationSlide();

        }
    );


    /* =====================================================
       PHONE SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchStartY = 0;


    graduationSlider.addEventListener(
        "touchstart",
        event => {

            event.stopPropagation();


            const touch =
                event.changedTouches[0];


            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    graduationSlider.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            event.stopPropagation();


            const touch =
                event.changedTouches[0];


            const touchEndX =
                touch.clientX;

            const touchEndY =
                touch.clientY;


            const distanceX =
                touchEndX - touchStartX;

            const distanceY =
                touchEndY - touchStartY;


            /*
             * Only react to horizontal swipes.
             */

            if (
                Math.abs(distanceX) >
                Math.abs(distanceY)
                &&
                Math.abs(distanceX) > 40
            ) {

                nextGraduationSlide();

            }

        },
        {
            passive: false
        }
    );


    /* =====================================================
       INITIAL SLIDE
    ===================================================== */

    showGraduationSlide(0);

});
/* =========================================================
   KAVY BAKES — BABY SHOWER SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const babySlider =
        document.querySelector(".baby-slider");

    if (!babySlider) return;


    const slides =
        babySlider.querySelectorAll(".baby-slide");

    const counter =
        babySlider.querySelector(".baby-current");


    if (!slides.length) return;


    let currentSlide = 0;

    let changing = false;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showBabySlide(index) {

        if (changing) return;

        changing = true;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;


        if (counter) {

            counter.textContent =
                String(currentSlide + 1)
                .padStart(2, "0");

        }


        setTimeout(() => {

            changing = false;

        }, 700);

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextBabySlide() {

        let next =
            currentSlide + 1;

        if (next >= slides.length) {
            next = 0;
        }

        showBabySlide(next);

    }


    /* =====================================================
       AUTOMATIC — 3 SECONDS
    ===================================================== */

    setInterval(() => {

        nextBabySlide();

    }, 3000);


    /* =====================================================
       DESKTOP HOVER
       Changes the BABY IMAGE only.
       It does NOT turn the journal page.
    ===================================================== */

    let hoverLocked = false;


    babySlider.addEventListener(
        "mouseenter",
        event => {

            event.stopPropagation();

            if (hoverLocked) return;

            hoverLocked = true;

            nextBabySlide();


            setTimeout(() => {

                hoverLocked = false;

            }, 1200);

        }
    );


    /* =====================================================
       PHONE / CLICK
    ===================================================== */

    babySlider.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            nextBabySlide();

        }
    );


    /* =====================================================
       SWIPE
    ===================================================== */

    let startX = 0;
    let startY = 0;


    babySlider.addEventListener(
        "touchstart",
        event => {

            event.stopPropagation();

            const touch =
                event.changedTouches[0];

            startX = touch.clientX;
            startY = touch.clientY;

        },
        { passive: true }
    );


    babySlider.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            event.stopPropagation();

            const touch =
                event.changedTouches[0];

            const endX = touch.clientX;
            const endY = touch.clientY;

            const distanceX =
                endX - startX;

            const distanceY =
                endY - startY;


            if (
                Math.abs(distanceX) >
                Math.abs(distanceY)
                &&
                Math.abs(distanceX) > 40
            ) {

                nextBabySlide();

            }

        },
        { passive: false }
    );


    /* =====================================================
       START
    ===================================================== */

    showBabySlide(0);

});
/* =========================================================
   KAVY BAKES — PROPOSAL SLIDER
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const proposalSlider =
        document.querySelector(".proposal-slider");

    if (!proposalSlider) return;


    const slides =
        proposalSlider.querySelectorAll(
            ".proposal-slide"
        );

    const counter =
        proposalSlider.querySelector(
            ".proposal-current"
        );


    if (!slides.length) return;


    let currentSlide = 0;

    let changing = false;


    /* =====================================================
       SHOW SLIDE
    ===================================================== */

    function showProposalSlide(index) {

        if (changing) return;

        changing = true;


        slides.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === index
            );

        });


        currentSlide = index;


        if (counter) {

            counter.textContent =
                String(currentSlide + 1)
                .padStart(2, "0");

        }


        setTimeout(() => {

            changing = false;

        }, 700);

    }


    /* =====================================================
       NEXT SLIDE
    ===================================================== */

    function nextProposalSlide() {

        let next =
            currentSlide + 1;

        if (next >= slides.length) {

            next = 0;

        }

        showProposalSlide(next);

    }


    /* =====================================================
       AUTOMATIC — EVERY 3 SECONDS
    ===================================================== */

    setInterval(() => {

        nextProposalSlide();

    }, 3000);


    /* =====================================================
       CLICK IMAGE
    ===================================================== */

    proposalSlider.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();

            nextProposalSlide();

        }
    );


    /* =====================================================
       DESKTOP HOVER
    ===================================================== */

    let hoverLocked = false;


    proposalSlider.addEventListener(
        "mouseenter",
        event => {

            event.stopPropagation();

            if (hoverLocked) return;

            hoverLocked = true;

            nextProposalSlide();


            setTimeout(() => {

                hoverLocked = false;

            }, 1200);

        }
    );


    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let startX = 0;

    let startY = 0;


    proposalSlider.addEventListener(
        "touchstart",
        event => {

            event.stopPropagation();

            const touch =
                event.changedTouches[0];

            startX = touch.clientX;

            startY = touch.clientY;

        },
        { passive: true }
    );


    proposalSlider.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

            event.stopPropagation();

            const touch =
                event.changedTouches[0];

            const endX = touch.clientX;

            const endY = touch.clientY;

            const distanceX =
                endX - startX;

            const distanceY =
                endY - startY;


            if (
                Math.abs(distanceX) >
                Math.abs(distanceY)
                &&
                Math.abs(distanceX) > 40
            ) {

                nextProposalSlide();

            }

        },
        { passive: false }
    );


    /* =====================================================
       INITIAL IMAGE
    ===================================================== */

    showProposalSlide(0);

});
/* =========================================================
   KAVY BAKES — KIDS BIRTHDAY VIDEO + CAKE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slider =
        document.querySelector(
            ".kids-birthday-slider"
        );

    if (!slider) return;


    const media =
        slider.querySelectorAll(
            ".kids-media"
        );

    const video =
        slider.querySelector(
            ".kids-video video"
        );

    const counter =
        slider.querySelector(
            ".kids-current"
        );


    let current = 0;

    let changing = false;


    /* =====================================================
       SHOW MEDIA
    ===================================================== */

    function showKidsMedia(index) {

        if (changing) return;

        changing = true;


        media.forEach((item, i) => {

            item.classList.toggle(
                "active",
                i === index
            );

        });


        current = index;


        if (counter) {

            counter.textContent =
                String(current + 1)
                .padStart(2, "0");

        }


        /* Stop video when showing cake */

        if (current !== 0 && video) {

            video.pause();

        }


        /* Play video when returning */

        if (current === 0 && video) {

            video.currentTime = 0;

            video.play().catch(() => {});

        }


        setTimeout(() => {

            changing = false;

        }, 800);

    }


    /* =====================================================
       SHOW CAKE
    ===================================================== */

    function showCake() {

        showKidsMedia(1);

    }


    /* =====================================================
       VIDEO ENDS
       → SHOW CAKE
    ===================================================== */

    if (video) {

        video.addEventListener(
            "ended",
            () => {

                showCake();

            }
        );

    }


    /* =====================================================
       AFTER CAKE — RETURN TO VIDEO
    ===================================================== */

    function restartStory() {

        setTimeout(() => {

            showKidsMedia(0);

        }, 3000);

    }


    /* =====================================================
       WATCH FOR CAKE
    ===================================================== */

    const observer =
        new MutationObserver(() => {

            if (
                current === 1 &&
                media[1].classList.contains("active")
            ) {

                restartStory();

                observer.disconnect();

            }

        });


    observer.observe(
        slider,
        {
            attributes: true,
            subtree: true,
            attributeFilter: ["class"]
        }
    );


    /* =====================================================
       CLICK
    ===================================================== */

    slider.addEventListener(
        "click",
        event => {

            event.preventDefault();

            event.stopPropagation();


            if (current === 0) {

                showCake();

            } else {

                showKidsMedia(0);

            }

        }
    );


    /* =====================================================
       START VIDEO
    ===================================================== */

    showKidsMedia(0);

});