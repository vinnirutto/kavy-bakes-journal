/*======================================
        KAVY BAKES FLIPBOOK
======================================*/

document.addEventListener("DOMContentLoaded", () => {

    // Check if the PageFlip library is loaded
    if (typeof St === "undefined") {
        console.error("PageFlip library not loaded.");
        return;
    }

    // Get the book
    const book = document.getElementById("book");

    if (!book) {
        console.error("Cannot find #book.");
        return;
    }

    // Get all pages
    const pages = book.querySelectorAll(".page");

    console.log("Pages found:", pages.length);

    if (pages.length < 2) {
        console.error("A flipbook needs at least 2 pages.");
        return;
    }

    // Create flipbook
    const pageFlip = new St.PageFlip(book, {

        width: 550,
        height: 700,

        size: "stretch",

        minWidth: 315,
        maxWidth: 1200,

        minHeight: 420,
        maxHeight: 1500,

        showCover: true,

        usePortrait: true,

        mobileScrollSupport: false,

        maxShadowOpacity: 0.5,

        flippingTime: 1000,

        drawShadow: true,

        autoSize: true

    });

    // Load pages
    pageFlip.loadFromHTML(pages);

    console.log("Flipbook initialized.");

});
/*==============================
    BIRTHDAY IMAGE FLIP
==============================*/

const birthdayImages = document.querySelectorAll(".birthday-image");

let birthdayIndex = 0;

setInterval(() => {

    birthdayImages[birthdayIndex].classList.remove("active");

    birthdayIndex++;

    if (birthdayIndex >= birthdayImages.length) {

        birthdayIndex = 0;

    }

    birthdayImages[birthdayIndex].classList.add("active");

},3000);