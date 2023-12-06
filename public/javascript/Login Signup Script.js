// Selecting the main container, toggle buttons, input fields and form buttons
const main = document.querySelector("main");
const toggleBtn = document.querySelectorAll(".toggle");
const inputs = document.querySelectorAll(".input-field");

// Adding event listeners to input fields for focus and blur
inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.classList.add("active");
    });
    input.addEventListener("blur", () => {
        if (!input.value) {
            input.classList.remove("active");
        }
    });
});

// When the page loads, focus on the phone number field
window.addEventListener("load", () => {
    inputs[0].focus();
});

// Adding event listeners to toggle buttons to switch between sign-up and sign-in modes
toggleBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        main.classList.toggle("sign-up-mode");
    });
});

// Selecting the carousel container and bullets for the image slider
const carousel = document.querySelector(".carousel");
const bullets = document.querySelectorAll(".bullets span");

const images = [
    "https://res.cloudinary.com/dtwgxcqkr/image/upload/v1692887737/Kheti%20Sahayak%20Related%20Media/image_1.jpg",
    "https://res.cloudinary.com/dtwgxcqkr/image/upload/v1692887743/Kheti%20Sahayak%20Related%20Media/image_2.jpg",
    "https://res.cloudinary.com/dtwgxcqkr/image/upload/v1692887750/Kheti%20Sahayak%20Related%20Media/image_3.jpg",
    "https://res.cloudinary.com/dtwgxcqkr/image/upload/v1692887756/Kheti%20Sahayak%20Related%20Media/image_4.jpg"
];

// Function to automate image slider
function autoslider() {
    let index = 0;

    function nextSlide() {

        // Resetting index when all images have been cycled through
        index = (index + 1) % images.length;

        // Updating background image of the carousel
        carousel.style.backgroundImage = `url(${images[index]})`;

        // Updating active bullet and text slider position
        bullets.forEach(blt => blt.classList.remove("active"));
        bullets[index].classList.add("active");
        const textSlider = document.querySelector(".text-group");
        textSlider.style.transform = `translateY(${-(index) * 2.2}rem)`;
        setTimeout(nextSlide, 5000);
    }

    // Start the image slider
    nextSlide();
}

// Calling the autoslider function to start the image slider
autoslider();