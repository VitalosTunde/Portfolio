const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let time = 0;
let starColor = 'rgba(200, 220, 255, 1)'; // Default dark mode

function createStars() {
    stars = [];
    for (let i = 0; i < 150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * (canvas.height * 0.6),
            size: Math.random() * 2.5 + 0.2,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.15,
            baseOpacity: Math.random() * 0.5 + 0.3,
            pulseSpeed: Math.random() * 0.02 + 0.01
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    time++;

    stars.forEach(star => {

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.y > canvas.height) star.y = -5;
        if (star.y < -5) star.y = canvas.height;
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;

        const pulse = Math.sin(time * star.pulseSpeed) * 0.3 + 0.7;
        const opacity = star.baseOpacity * pulse;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = starColor.replace('1)', `${opacity})`);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

createStars();
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});


let isDarkMode = true;
const logoImg = document.querySelector('nav img');

function readPreference(key) {
    try { return localStorage.getItem(key); } catch { return null; }
}

function savePreference(key, value) {
    try { localStorage.setItem(key, value); } catch { /* Storage may be disabled. */ }
}

function toggleMode() {
    isDarkMode = !isDarkMode;
    const root = document.documentElement;
    if (isDarkMode) {
        root.classList.remove('light-mode');
        starColor = 'rgba(200, 220, 255, 1)';
        if (logoImg) logoImg.src = 'images/logo_sotet.svg';
    } else {
        root.classList.add('light-mode');
        starColor = 'rgba(100, 120, 155, 1)';
        if (logoImg) logoImg.src = 'images/logo_vilagos.svg';
    }
    savePreference('theme', isDarkMode ? 'dark' : 'light');
}

function updateActiveNavigation() {
    const page = document.body.dataset.page || 'home';
    const filename = page === 'home' ? 'index.html' : `${page}.html`;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === filename) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

updateActiveNavigation();

// Keep old links to the former tabs working.
if (document.body.dataset.page === 'home' && ['experience', 'studies'].includes(location.hash.slice(1))) {
    location.replace(`${location.hash.slice(1)}.html${location.search}`);
}
if (readPreference('theme') === 'light') {
    toggleMode();
    document.getElementById('mode-toggle').checked = true;
}

const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function (event) {
    event.stopPropagation();

    hamburgerMenu.classList.toggle("open");
    document.querySelector(".language-selector").classList.remove("open");
});

document.addEventListener("click", function () {
    document.querySelector(".language-selector").classList.remove("open");
    hamburgerMenu.classList.remove("open");
});

document.querySelectorAll(".hamburger-dropdown a").forEach(function (link) {
    link.addEventListener("click", function () {
        hamburgerMenu.classList.remove("open");
    });
});
