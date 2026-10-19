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
    renderTimelines(lang);

    const navKeys = ['home', 'about', 'experience', 'studies', 'projects'];
    document.querySelectorAll('.nav-links, .hamburger-dropdown').forEach(menu => {
        menu.querySelectorAll('a').forEach((link, index) => {
            link.textContent = trans[navKeys[index]];
        });
    });

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
    updatePage(false);
}


const timelineTranslations = {
    hu: {
        experienceTitle: 'Tapasztalat', studiesTitle: 'Tanulmányok',
        experience: [
            ['Logisztikus specialista', 'Robert Bosch Kft., Budapest', '2025 – jelenleg'],
            ['Pultos', 'Cinema City, Arena Mall', '2024'],
            ['Animátor', 'Animacik Entertainment Kft., Füred Kemping & Üdülőfalu, Napfény Kemping', '2024'],
            ['Pincér', 'Sofia kávézó és bár, Komárno', '2022 – 2024'],
            ['Irodai asszisztens', 'Greenchem Hungary Kft.', '2022']
        ],
        studies: [
            ['University of Eastern Finland, Kuopio', 'Business studies, Computer science and statistics', '2026'],
            ['Budapesti Corvinus Egyetem', 'Gazdaságinformatika', '2024 – jelenleg'],
            ['Selye János Gimnázium, Komárno', '', '2016 – 2024']
        ]
    },
    en: {
        experienceTitle: 'Work experience', studiesTitle: 'Education',
        experience: [
            ['Logistics specialist', 'Robert Bosch Kft., Budapest', '2025 – present'],
            ['Counter attendant', 'Cinema City, Arena Mall', '2024'],
            ['Animator', 'Animacik Entertainment Kft.', '2024', 'Füred Kemping & Üdülőfalu, Napfény Kemping'],
            ['Waitress', 'Sofia kávézó és bár, Komárno', '2022 – 2024'],
            ['Office assistant', 'Greenchem Hungary Kft.', '2022']
        ],
        studies: [
            ['University of Eastern Finland, Kuopio', 'Business Studies, Computer Science and Statistics', '2026'],
            ['Corvinus University of Budapest', 'Business Informatics', '2024 – present'],
            ['Selye János Gimnázium, Komárno', '', '2016 – 2024']
        ]
    },
    de: {
        experienceTitle: 'Berufserfahrung', studiesTitle: 'Ausbildung',
        experience: [
            ['Logistikspezialistin', 'Robert Bosch Kft., Budapest', '2025 – heute'],
            ['Thekenmitarbeiterin', 'Cinema City, Arena Mall', '2024'],
            ['Animateurin', 'Animacik Entertainment Kft., Füred Kemping & Üdülőfalu, Napfény Kemping', '2024'],
            ['Kellnerin', 'Sofia kávézó és bár, Komárno', '2022 – 2024'],
            ['Büroassistentin', 'Greenchem Hungary Kft.', '2022']
        ],
        studies: [
            ['University of Eastern Finland, Kuopio', 'Business Studies, Computer Science and Statistics', '2026'],
            ['Corvinus University of Budapest', 'Business Informatics', '2024 – heute'],
            ['Selye János Gimnázium, Komárno', '', '2016 – 2024']
        ]
    }
};

function renderTimelines(lang) {
    const content = timelineTranslations[lang];
    ['experience', 'studies'].forEach(page => {
        const section = document.getElementById(page);
        const heading = document.createElement('h1');
        heading.id = `${page}-title`;
        heading.textContent = content[`${page}Title`];
        const list = document.createElement('ol');
        list.className = 'timeline';
        content[page].forEach(([title, subtitle, date, detail]) => {
            const item = document.createElement('li');
            item.className = 'timeline-card';
            const cardTitle = document.createElement('h2');
            cardTitle.textContent = title;
            item.append(cardTitle);
            [subtitle, detail].filter(Boolean).forEach(text => {
                const paragraph = document.createElement('p');
                paragraph.textContent = text;
                item.append(paragraph);
            });
            const dateText = document.createElement('span');
            dateText.className = 'timeline-date';
            dateText.textContent = date;
            item.append(dateText);
            list.append(item);
        });
        section.replaceChildren(heading, list);
    });
}

function updatePage(scroll = true) {
    const page = ['experience', 'studies'].includes(location.hash.slice(1))
        ? location.hash.slice(1) : 'home';
    ['home', 'experience', 'studies'].forEach(id => {
        document.getElementById(id).hidden = id !== page;
    });
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === `#${page}`) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
    const lang = document.documentElement.lang;
    document.title = page === 'home' ? translations[lang].title
        : `${timelineTranslations[lang][`${page}Title`]} | ${translations[lang].title}`;
    if (scroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

window.addEventListener('hashchange', () => updatePage());
renderTimelines(document.documentElement.lang);
updatePage(false);

const languageSelector = document.querySelector(".language-selector");
const currentLang = document.querySelector(".current-lang");

const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamburger = document.querySelector(".hamburger");

currentLang.addEventListener("click", function (event) {
    event.stopPropagation();

    languageSelector.classList.toggle("open");
    hamburgerMenu.classList.remove("open");
});

hamburger.addEventListener("click", function (event) {
    event.stopPropagation();

    hamburgerMenu.classList.toggle("open");
    languageSelector.classList.remove("open");
});

document.addEventListener("click", function () {
    languageSelector.classList.remove("open");
    hamburgerMenu.classList.remove("open");
});

document.querySelectorAll(".hamburger-dropdown a").forEach(function (link) {
    link.addEventListener("click", function () {
        hamburgerMenu.classList.remove("open");
    });
});

document.querySelectorAll(".dropdown-menu img").forEach(function (flag) {
    flag.addEventListener("click", function () {
        languageSelector.classList.remove("open");
    });
});
