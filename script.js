// search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");

searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}


// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}


let slideIndex = 0;
const slides = document.getElementsByClassName("gallery-slide");
const dots = document.getElementsByClassName("dot");
const totalSlides = slides.length;
const slider = document.querySelector(".gallery-slider");
let isAnimating = false;
let autoSlideInterval;

function showSlide(index) {
    if (isAnimating) return; // Prevents quick successive slide changes
    isAnimating = true;

    // Calculate the slide offset and apply the transform for sliding
    const offset = -index * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Update dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[index].className += " active";

    // Update the slide index
    slideIndex = index;

    setTimeout(() => {
        isAnimating = false;
    }, 600); // Match the duration of the transition
}

function nextSlide() {
    if (slideIndex === totalSlides - 1) {
        // Slide to the last image, then jump to the first image
        slider.style.transition = "transform 0.6s ease-in-out"; // Enable transition
        slider.style.transform = `translateX(-${(totalSlides - 1) * 100}%)`;
        
        // After 1 second, jump to the first image
        setTimeout(() => {
            slider.style.transition = "none"; // Disable transition for instant jump
            slider.style.transform = `translateX(0%)`;
            setTimeout(() => {
                slider.style.transition = "transform 0.6s ease-in-out"; // Re-enable transition
                showSlide(0); // Move to the first image with smooth transition
            }, 50); // Short delay to ensure transition is re-applied
        }, 100); // 1 second delay for the last slide
    } else {
        showSlide(slideIndex + 1);
    }
}

function prevSlide() {
    if (slideIndex === 0) {
        // Slide to the last image with smooth animation
        slider.style.transition = "none"; // Disable transition for instant jump
        slider.style.transform = `translateX(-${(totalSlides - 1) * 100}%)`;
        setTimeout(() => {
            slider.style.transition = "transform 0.6s ease-in-out"; // Re-enable transition
            showSlide(totalSlides - 1); // Move to the last image with smooth transition
        }, 50); // Short delay to ensure transition is re-applied
    } else {
        showSlide(slideIndex - 1);
    }
}

// Auto-slide every 3 seconds
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000);
}

// Stop auto-slide and restart
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Dots click event
for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener('click', () => {
        stopAutoSlide(); // Stop auto-slide on user interaction
        showSlide(i);
    });
}

// Swipe functionality
let startX = 0;

document.querySelector('.gallery-image').addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.querySelector('.gallery-image').addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX;
    const difference = startX - moveX;

    if (difference > 50) { // Swipe left
        stopAutoSlide(); // Stop auto-slide on swipe
        nextSlide();
    } else if (difference < -50) { // Swipe right
        stopAutoSlide(); // Stop auto-slide on swipe
        prevSlide();
    }
});

// Initialize auto-slide
startAutoSlide();
