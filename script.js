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

function orderWhatsApp(product) {

    /*
       CHANGE THIS TO YOUR REAL
       KAVY BAKES WHATSAPP NUMBER.

       Example:
       254712345678
    */

    const phoneNumber = "254700000000";


    const message =
        `Hello Kavy Bakes! 👋\n\n` +
        `I am interested in ${product}.\n\n` +
        `I would like to make an inquiry. 🎂`;


    const whatsapp =
        `https://wa.me/${phoneNumber}?text=` +
        encodeURIComponent(message);


    window.open(
        whatsapp,
        "_blank"
    );

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