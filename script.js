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


    if (cards.some(card => !card)) return;


    const counter =
        stack.querySelector(".wedding-current");


    let current = 1;

    let moving = false;


    /* =====================================================
       PREVENT BOOK FROM USING PHOTO AS PAGE TURN
    ===================================================== */

    [
        "pointerdown",
        "pointerup",
        "mousedown",
        "mouseup",
        "click"
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


        /* FRONT PHOTO LEAVES THE STACK */

        stack.classList.add("show-next");


        /* WAIT FOR CSS ANIMATION */

        setTimeout(() => {

            const first =
                cards.shift();

            cards.push(first);


            /* UPDATE Z-INDEX */

            cards.forEach((card, index) => {

                card.style.zIndex =
                    index + 1;

            });


            /* REMOVE ANIMATION */

            stack.classList.remove(
                "show-next"
            );


            /* RESET POSITIONS */

            cards[0].style.transform =
                "rotate(-1deg)";

            cards[1].style.transform =
                "rotate(5deg) translate(25px,15px)";

            cards[2].style.transform =
                "rotate(-4deg) translate(-16px,8px)";


            /* UPDATE COUNTER */

            current++;

            if (current > 3) {
                current = 1;
            }


            if (counter) {

                counter.textContent =
                    String(current)
                    .padStart(2, "0");

            }


            moving = false;

        }, 800);

    }


    /* =====================================================
       AUTOMATIC WEDDING SLIDER
       
       CHANGES EVERY 3 SECONDS
    ===================================================== */

    setInterval(() => {

        nextWeddingPhoto();

    }, 3000);


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

/* =========================================================
   KAVY BAKES — ASK KAVY CHATBOT
   Friendly cake assistant with Quick Help and Let's Chat
========================================================= */

(() => {
    function initAskKavy() {
        const root = document.getElementById("kb-chatbot");

        if (!root || root.dataset.initialized === "true") return;

        const toggle = root.querySelector("#kb-chat-toggle");
        const chatWindow = root.querySelector("#kb-chat-window");
        const close = root.querySelector("#kb-chat-close");
        const reset = root.querySelector("#kb-chat-reset");
        const messages = root.querySelector("#kb-chat-messages");
        const options = root.querySelector("#kb-chat-options");
        const form = root.querySelector("#kb-chat-form");
        const input = root.querySelector("#kb-chat-input");

        if (
            !toggle || !chatWindow || !messages ||
            !options || !form || !input
        ) {
            console.error("Ask Kavy: Check the chatbot HTML IDs.");
            return;
        }

        root.dataset.initialized = "true";

        // Update this number if your business WhatsApp changes.
        const managerNumber = "254702361521";

        const cakeCategories = [
            "Birthday Cakes",
            "Wedding Cakes",
            "Graduation Cakes",
            "Anniversary Cakes",
            "Baby Shower Cakes",
            "Cupcakes",
            "Other Cakes"
        ];

        const questions = [
            "What is the occasion?",
            "What cake size or number of servings do you need?",
            "Which flavour would you prefer?",
            "Describe your preferred design or theme.",
            "What is your budget?",
            "When do you need the cake?",
            "Would you prefer delivery or collection?"
        ];

        const labels = [
            "Occasion",
            "Size / servings",
            "Flavour",
            "Design / theme",
            "Budget",
            "Required date",
            "Delivery / collection"
        ];

        let mode = "menu";
        let answers = [];
        let questionIndex = 0;
        let selectedCake = "";

        // ---------------- OPEN AND CLOSE ----------------

        function openChat() {
            chatWindow.classList.add("kb-chat-open");
            chatWindow.setAttribute("aria-hidden", "false");
            toggle.setAttribute("aria-expanded", "true");
            input.focus();
        }

        function closeChat() {
            chatWindow.classList.remove("kb-chat-open");
            chatWindow.setAttribute("aria-hidden", "true");
            toggle.setAttribute("aria-expanded", "false");
        }

        toggle.addEventListener("click", () => {
            if (chatWindow.classList.contains("kb-chat-open")) {
                closeChat();
            } else {
                openChat();
            }
        });

        close?.addEventListener("click", closeChat);

        // ---------------- MESSAGES ----------------

        function addMessage(sender, text) {
            const message = document.createElement("div");

            message.className =
                sender === "user"
                    ? "kb-message kb-user-message"
                    : "kb-message kb-bot-message";

            // textContent keeps customer text from being interpreted as HTML.
            message.textContent = text;
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        }

        function showOptions(items) {
            options.replaceChildren();

            items.forEach(item => {
                const button = document.createElement("button");

                button.type = "button";
                button.dataset.message = item;
                button.textContent = item;

                options.appendChild(button);
            });
        }

        // ---------------- MAIN MENU ----------------

        function showMainMenu() {
            mode = "menu";

            showOptions([
                "Quick Help",
                "Let's Chat 🌸",
                "Browse Our Cakes",
                "Design My Custom Cake",
                "Chat with the Manager"
            ]);
        }

        // ---------------- WHATSAPP ----------------

        function sendToWhatsApp(message) {
            const url =
                "https://wa.me/" +
                managerNumber +
                "?text=" +
                encodeURIComponent(message);

            window.open(url, "_blank", "noopener,noreferrer");
        }

        // ---------------- QUICK HELP ----------------

        function showQuickHelp() {
            mode = "quick-help";

            addMessage(
                "bot",
                "Coming right up, sweet friend! ❤️ No long queue at this cake counter. What do you need?"
            );

            showOptions([
                "Cake Categories",
                "Ask About Prices",
                "Place an Order",
                "Our Location",
                "Contact Manager on WhatsApp",
                "Return to Main Menu"
            ]);
        }

        // ---------------- BROWSE CAKES ----------------

        function browseCakes() {
            mode = "browse";

            addMessage(
                "bot",
                "Ooh, you're in the right place! ❤️ Let's find a cake you'll love. Choose a category and I'll help you enquire about designs, flavours, and prices. 👀"
            );

            showOptions(cakeCategories);
        }

        function selectCake(category) {
            selectedCake = category;
            mode = "selected-cake";

            addMessage(
                "bot",
                `You've selected ${category}. Our manager can help confirm available designs, flavours, prices, and booking dates. ❤️`
            );

            showOptions([
                "Ask About This Cake on WhatsApp",
                "Browse More Cakes",
                "Return to Main Menu"
            ]);
        }

        // ---------------- CUSTOM CAKE REQUEST ----------------

        function startCustomCake() {
            mode = "custom";
            answers = [];
            questionIndex = 0;

            options.replaceChildren();

            addMessage(
                "bot",
                "Let's design your custom cake! ❤️ I'll ask a few quick questions so we can prepare your request. And don't worry, this isn't a school exam! 🌸"
            );

            askQuestion();
        }

        function askQuestion() {
            if (questionIndex < questions.length) {
                addMessage("bot", questions[questionIndex]);
                input.placeholder = "Type your answer...";
                input.focus();
            } else {
                reviewRequest();
            }
        }

        function reviewRequest() {
            mode = "review";

            let summary = "Here's your custom cake request:\n\n";

            labels.forEach((label, index) => {
                summary += `${label}: ${answers[index]}\n`;
            });

            addMessage("bot", summary);

            addMessage(
                "bot",
                "Have a look and make sure everything is correct. When you're happy, you can send it to our manager on WhatsApp. ❤️"
            );

            showOptions([
                "Approve & Continue to WhatsApp",
                "Start My Request Again",
                "Return to Main Menu"
            ]);
        }

        function buildRequestMessage() {
            let message =
                "Hello Kavy Bakes! I'd like to enquire about a custom cake.\n\n";

            labels.forEach((label, index) => {
                message += `${label}: ${answers[index]}\n`;
            });

            message +=
                "\nPlease confirm availability and the final price. Thank you!";

            return message;
        }

        // ---------------- MANAGER CONTACT ----------------

        function contactManager() {
            mode = "manager";

            addMessage(
                "bot",
                "Of course, sweet friend! ❤️ Our manager can help with orders, prices, custom designs, availability, and special requests. We're based in Kimumu, Eldoret, Kenya. Choose below when you're ready. 🌸"
            );

            showOptions([
                "Contact Manager on WhatsApp",
                "Return to Main Menu"
            ]);
        }

        // ---------------- FRIENDLY CHAT ----------------

        function startFriendlyChat() {
            mode = "conversation";

            addMessage(
                "bot",
                "Yesss, you've found your cake bestie! ❤️🌸 Welcome to the fun side of Kavy Bakes! No boring interviews here, promise. Although I might ask about cake... a lot. It's kind of my thing. 👀"
            );

            addMessage(
                "bot",
                "So, what are we celebrating today? And please don't say your diet... because cake might have other plans!"
            );

            showOptions([
                "Birthday 🎂",
                "Wedding 💍",
                "Graduation 🎓",
                "Anniversary 💕",
                "Baby Shower 🍼",
                "Just Exploring 🌸",
                "Surprise Someone ❤️",
                "Return to Main Menu"
            ]);
        }

        const friendlyReplies = {
            "Birthday 🎂":
                "Birthday cake? Now we're talking! 🎂❤️ Another year older, another reason to eat cake. Who's the lucky birthday star?",

            "Wedding 💍":
                "Ooh, wedding bells! 💍💕 Let's find a cake beautiful enough to make the guests take pictures before they take a bite. What's your dream wedding cake like?",

            "Graduation 🎓":
                "Congratulations to the graduate! 🎓❤️ All those books deserve a cake reward. Honestly, cake should be part of every graduation package. What's the celebration plan?",

            "Anniversary 💕":
                "Aww, love is in the air! 💕 Let's find a cake sweeter than those love messages. Don't worry, I won't ask to read them... unless they mention cake! 👀",

            "Baby Shower 🍼":
                "A tiny human and a very important cake? 🍼❤️ Sounds like a beautiful celebration! Are you thinking cute, elegant, colourful, or something unique?",

            "Just Exploring 🌸":
                "Window shopping for cakes? You're among your people! 🌸👀 We don't judge cake curiosity here. Even 'just looking' can turn into 'please add extra frosting'!",

            "Surprise Someone ❤️":
                "Ohooo, we're planning a surprise! ❤️👀 The mission is simple: make them smile, make the cake gorgeous, and try not to reveal the surprise!"
        };

        // ---------------- CAKE JOKES ----------------

        const cakeJokes = [
            "Why did the cake go to the doctor? Because it was feeling crumby! 😂",
            "What's a cake's favourite subject? Bake-ology! 👀",
            "Why was the cake so confident? It knew it was on another tier! 😂",
            "I told a cake to follow its dreams. It rolled straight into the frosting! ❤️",
            "What's the difference between a cake and a secret? Eventually, someone cuts into both! 😂"
        ];

        function tellCakeJoke() {
            const joke =
                cakeJokes[Math.floor(Math.random() * cakeJokes.length)];

            addMessage("bot", joke);

            showOptions([
                "Another Cake Joke 😂",
                "Design My Custom Cake",
                "Ask About Prices",
                "Return to Main Menu"
            ]);
        }

        // ---------------- OPTION CLICK HANDLER ----------------

        options.addEventListener("click", event => {
            const button = event.target.closest("button[data-message]");

            if (!button) return;

            const choice = button.dataset.message;

            addMessage("user", choice);

            // Review actions
            if (mode === "review") {
                if (choice === "Approve & Continue to WhatsApp") {
                    sendToWhatsApp(buildRequestMessage());
                    return;
                }

                if (choice === "Start My Request Again") {
                    startCustomCake();
                    return;
                }

                if (choice === "Return to Main Menu") {
                    showMainMenu();
                    return;
                }

                return;
            }

            // Main menu actions
            if (choice === "Quick Help") {
                showQuickHelp();
                return;
            }

            if (choice === "Let's Chat 🌸") {
                startFriendlyChat();
                return;
            }

            if (
                choice === "Browse Our Cakes" ||
                choice === "Cake Categories"
            ) {
                browseCakes();
                return;
            }

            if (choice === "Design My Custom Cake" ||
                choice === "Place an Order") {
                startCustomCake();
                return;
            }

            if (choice === "Chat with the Manager") {
                contactManager();
                return;
            }

            // Quick Help actions
            if (mode === "quick-help") {
                if (choice === "Ask About Prices") {
                    addMessage(
                        "bot",
                        "Let's talk budget! ❤️ Our homemade cake prices are negotiable. The final price depends on the cake size and design. Tell me what you have in mind, or contact our manager for a quote."
                    );

                    showOptions([
                        "Contact Manager on WhatsApp",
                        "Design My Custom Cake",
                        "Return to Main Menu"
                    ]);

                    return;
                }

                if (choice === "Our Location") {
                    addMessage(
                        "bot",
                        "Kavy Bakes is based in Kimumu, Eldoret, Kenya. ❤️ Contact our manager for directions and to confirm delivery or collection arrangements. 🌸"
                    );

                    showOptions([
                        "Contact Manager on WhatsApp",
                        "Return to Main Menu"
                    ]);

                    return;
                }
            }

            // Friendly conversation
            if (mode === "conversation") {
                if (choice === "Return to Main Menu") {
                    showMainMenu();
                    return;
                }

                if (choice === "Tell Me a Cake Joke 😂" ||
                    choice === "Another Cake Joke 😂") {
                    tellCakeJoke();
                    return;
                }

                if (friendlyReplies[choice]) {
                    addMessage("bot", friendlyReplies[choice]);

                    showOptions([
                        "Design My Custom Cake",
                        "Ask About Prices",
                        "Browse Our Cakes",
                        "Contact Manager on WhatsApp",
                        "Tell Me a Cake Joke 😂",
                        "Return to Main Menu"
                    ]);

                    return;
                }
            }

            // Cake category selected
            if (cakeCategories.includes(choice)) {
                selectCake(choice);
                return;
            }

            // Selected cake follow-up
            if (choice === "Ask About This Cake on WhatsApp") {
                sendToWhatsApp(
                    `Hello Kavy Bakes! I'd like to enquire about ${selectedCake}. Please share available options and prices.`
                );
                return;
            }

            if (choice === "Browse More Cakes") {
                browseCakes();
                return;
            }

            // WhatsApp actions
            if (choice === "Contact Manager on WhatsApp") {
                sendToWhatsApp(
                    "Hello Kavy Bakes! I'd like to speak with the manager about a cake order or enquiry."
                );
                return;
            }

            // Price enquiries from the friendly chat
            if (choice === "Ask About Prices") {
                addMessage(
                    "bot",
                    "Our homemade cake prices are negotiable! ❤️ The final price depends on your size and design. Want to tell me about your cake, or ask our manager for a quote?"
                );

                showOptions([
                    "Design My Custom Cake",
                    "Contact Manager on WhatsApp",
                    "Return to Main Menu"
                ]);

                return;
            }

            if (choice === "Tell Me a Cake Joke 😂" ||
                choice === "Another Cake Joke 😂") {
                tellCakeJoke();
                return;
            }

            // Return to main menu
            if (choice === "Return to Main Menu") {
                showMainMenu();
            }
        });

        // ---------------- TYPED CUSTOMER MESSAGES ----------------

        form.addEventListener("submit", event => {
            event.preventDefault();

            const answer = input.value.trim();

            if (!answer) return;

            input.value = "";
            addMessage("user", answer);

            // Collect custom cake details
            if (mode === "custom") {
                answers.push(answer);
                questionIndex++;
                askQuestion();
                return;
            }

            // Simple natural-language responses
            const text = answer.toLowerCase();

            if (
                text.includes("hello") ||
                text.includes("hi") ||
                text.includes("hey")
            ) {
                addMessage(
                    "bot",
                    "Heyyy, sweet friend! ❤️ Welcome to Kavy Bakes. I promise this conversation is sweeter than a plain biscuit. What can I help you with?"
                );
            } else if (
                text.includes("price") ||
                text.includes("cost") ||
                text.includes("how much") ||
                text.includes("budget")
            ) {
                addMessage(
                    "bot",
                    "Let's talk budget! ❤️ Our homemade cake prices are negotiable, and the final price depends on your cake size and design. I don't want to invent a price and surprise you for the wrong reason! Would you like to describe your cake or contact our manager?"
                );

                showOptions([
                    "Design My Custom Cake",
                    "Contact Manager on WhatsApp",
                    "Return to Main Menu"
                ]);

                return;
            } else if (
                text.includes("location") ||
                text.includes("where are you") ||
                text.includes("located")
            ) {
                addMessage(
                    "bot",
                    "We're based in Kimumu, Eldoret, Kenya. ❤️ Our manager can help with directions and delivery or collection arrangements. 🌸"
                );
            } else if (
                text.includes("joke") ||
                text.includes("make me laugh")
            ) {
                tellCakeJoke();
                return;
            } else if (
                text.includes("whatsapp") ||
                text.includes("manager") ||
                text.includes("contact")
            ) {
                contactManager();
                return;
            } else {
                addMessage(
                    "bot",
                    "Ooh, tell me more! ❤️ I'm here to help with cake ideas, custom designs, budgets, and orders. I'm a cake assistant, though, not a mind reader... yet! 👀"
                );
            }

            showOptions([
                "Quick Help",
                "Let's Chat 🌸",
                "Browse Our Cakes",
                "Design My Custom Cake",
                "Chat with the Manager"
            ]);
        });

        // ---------------- RESET CHAT ----------------

        reset?.addEventListener("click", () => {
            messages.replaceChildren();

            answers = [];
            questionIndex = 0;
            selectedCake = "";
            mode = "menu";

            input.value = "";
            input.placeholder = "Talk to your cake bestie...";

            addMessage(
                "bot",
                "Hey, cake lover! ❤️🌸 Guess who's here? Your favourite cake magicians at Kavy Bakes! Well, technically, it's your assistant... the magician is probably busy with the frosting. We're based in Kimumu, Eldoret, Kenya, and our homemade cake prices are negotiable. ❤️ So, what's the vibe today?"
            );

            showMainMenu();
        });

        // Display the main menu when chatbot initializes.
        showMainMenu();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initAskKavy, {
            once: true
        });
    } else {
        initAskKavy();
    }
})();
