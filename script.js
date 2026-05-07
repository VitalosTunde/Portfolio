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

// Mode toggle
let isDarkMode = true;
const logoImg = document.querySelector('nav img');

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
}

const translations = {
    hu: {
        title: "Vitálos Tünde Eszter",
        home: "Kezdőlap",
        about: "Rólam",
        experience: "Tapasztalat",
        studies: "Tanulmányok",
        projects: "Projektek",
        greeting: "ÜDVÖZÖLLEK!",
        name: "Vitálos Tünde Eszter",
        titleText: "Egyetemista",
        description: "Motivált és elhivatott gazdaságinformatikus hallgató vagyok, aki gyakornoki munkát keres IT területen.",
        button1: "Többet rólam",
        button2: "Kapcsolat",
        contactMe: "KERESS MEG",
        programmingLanguages: "PROGRAMOZÁSI NYELVEK",
        socialMedia: "KÖZÖSSÉGI OLDALAK",
        resume: "ÖNÉLETRAJZ",
        download: "Letöltés"
    },
    en: {
        title: "Tünde Eszter Vitálos",
        home: "Home",
        about: "About",
        experience: "Experience",
        studies: "Studies",
        projects: "Projects",
        greeting: "WELCOME!",
        name: "Tünde Eszter Vitálos",
        titleText: "University Student",
        description: "I am a motivated and dedicated economics informatics student looking for an internship in the IT field.",
        button1: "More about me",
        button2: "Contact",
        contactMe: "CONTACT ME",
        programmingLanguages: "PROGRAMMING LANGUAGES",
        socialMedia: "SOCIAL MEDIA",
        resume: "RESUME",
        download: "Download"
    },
    de: {
        title: "Tünde Eszter Vitálos",
        home: "Startseite",
        about: "Über mich",
        experience: "Erfahrung",
        studies: "Studien",
        projects: "Projekte",
        greeting: "WILLKOMMEN!",
        name: "Tünde Eszter Vitálos",
        titleText: "Studentin",
        description: "Ich bin eine motivierte und engagierte Studentin der Wirtschaftsinformatik, die ein Praktikum im IT-Bereich sucht.",
        button1: "Mehr über mich",
        button2: "Kontakt",
        contactMe: "KONTAKTIERE MICH",
        programmingLanguages: "PROGRAMMIERSPRACHEN",
        socialMedia: "SOZIALE MEDIEN",
        resume: "LEBENSLAUF",
        download: "Herunterladen"
    }
};

function changeLanguage(lang) {
    const currentLang = document.querySelector('.current-lang');
    const dropdown = document.querySelector('.dropdown-menu');
    const trans = translations[lang];

    if (lang === 'hu') {
        currentLang.textContent = 'HUN';
        dropdown.innerHTML = `
            <img src="images/english.svg" alt="English" onclick="changeLanguage('en')">
            <img src="images/german.svg" alt="Deutsch" onclick="changeLanguage('de')">
        `;
    } else if (lang === 'en') {
        currentLang.textContent = 'ENG';
        dropdown.innerHTML = `
            <img src="images/hungarian.svg" alt="Magyar" onclick="changeLanguage('hu')">
            <img src="images/german.svg" alt="Deutsch" onclick="changeLanguage('de')">
        `;
    } else if (lang === 'de') {
        currentLang.textContent = 'GER';
        dropdown.innerHTML = `
            <img src="images/hungarian.svg" alt="Magyar" onclick="changeLanguage('hu')">
            <img src="images/english.svg" alt="English" onclick="changeLanguage('en')">
        `;
    }

    document.documentElement.lang = lang;
    document.title = trans.title;

    const navLinks = document.querySelectorAll('nav a');
    navLinks[0].textContent = trans.home;
    navLinks[1].textContent = trans.about;
    navLinks[2].textContent = trans.experience;
    navLinks[3].textContent = trans.studies;
    navLinks[4].textContent = trans.projects;

    const heroText = document.querySelector('.hero-text');
    heroText.querySelector('p').textContent = trans.greeting;
    heroText.querySelector('h1').textContent = trans.name;
    heroText.querySelector('h2').textContent = trans.titleText;
    heroText.querySelectorAll('p')[1].textContent = trans.description;

    const buttons = document.querySelectorAll('.btn');
    buttons[0].textContent = trans.button1;
    buttons[1].textContent = trans.button2;

    const footerDivs = document.querySelectorAll('footer div');
    footerDivs[0].querySelector('h3').textContent = trans.contactMe;
    footerDivs[1].querySelector('h3').textContent = trans.programmingLanguages;
    footerDivs[2].querySelector('h3').textContent = trans.socialMedia;
    footerDivs[3].querySelector('h3').textContent = trans.resume;
    footerDivs[3].querySelector('.btn').textContent = trans.download;
}