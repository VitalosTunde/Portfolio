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
        button2: "Projektek",
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
        button2: "Projects",
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
        button2: "Projekte",
        contactMe: "KONTAKTIERE MICH",
        programmingLanguages: "PROGRAMMIERSPRACHEN",
        socialMedia: "SOZIALE MEDIEN",
        resume: "LEBENSLAUF",
        download: "Herunterladen"
    }
};

// Hungarian text is kept in about.html; translated text is maintained here.
const aboutTranslations = {
    hu: Object.fromEntries(Array.from(document.querySelectorAll('[data-about]'), element => [element.dataset.about, element.textContent])),
    en: {
        introTitle: 'Introduction',
        intro1: 'I am a motivated and energetic Business Informatics student looking to gain professional experience alongside my university studies. I am interested in IT, data analysis and programming, and enjoy exploring new technologies and opportunities.',
        intro2: 'I learn quickly, adapt well to new situations, and enjoy working both independently and in a team. My strengths include mathematics and logical thinking. Accuracy, reliability and continuous development are important to me. I welcome new challenges and seek opportunities to put my knowledge and creativity into practice.',
        languagesTitle: 'Languages', hungarian: 'Hungarian', english: 'English', german: 'German', slovak: 'Slovak',
        native: 'native', englishLevel: 'professional working', germanLevel: 'limited working', slovakLevel: 'limited working',
        skillsTitle: 'Skills and other information', programmingLabel: 'Programming languages:',
        programming: 'Python, HTML5, C#, SQL, R – basic knowledge',
        softwareLabel: 'Other software:', software: 'MS Office, Carmnote – user level; SAP – basic knowledge',
        licenceLabel: 'Driving licence:', licence: 'Categories A1 and B (2022)',
        membershipLabel: 'Membership:',
    },
    de: {
        introTitle: 'Kurzvorstellung',
        intro1: 'Ich bin eine motivierte und engagierte Studentin der Wirtschaftsinformatik und möchte neben meinem Studium Berufserfahrung sammeln. Ich interessiere mich für Informatik, Datenanalyse und Programmierung und lerne gerne neue Technologien und Möglichkeiten kennen.',
        intro2: 'Ich lerne schnell, passe mich gut an neue Situationen an und arbeite sowohl selbstständig als auch gerne im Team. Zu meinen Stärken gehören Mathematik und logisches Denken. Genauigkeit, Zuverlässigkeit und kontinuierliche Weiterentwicklung sind mir wichtig. Ich bin offen für neue Herausforderungen und suche Möglichkeiten, mein Wissen und meine Kreativität einzusetzen.',
        languagesTitle: 'Sprachkenntnisse', hungarian: 'Ungarisch', english: 'Englisch', german: 'Deutsch', slovak: 'Slowakisch',
        native: 'muttersprachliches Niveau', englishLevel: 'professionelle Arbeitssprachkenntnisse', germanLevel: 'eingeschränkte Arbeitssprachkenntnisse', slovakLevel: 'eingeschränkte Arbeitssprachkenntnisse',
        skillsTitle: 'Kenntnisse und weitere Informationen', programmingLabel: 'Programmiersprachen:',
        programming: 'Python, HTML5, C#, SQL, R – Grundkenntnisse',
        softwareLabel: 'Weitere Software:', software: 'MS Office, Carmnote – Anwenderkenntnisse; SAP – Grundkenntnisse',
        licenceLabel: 'Führerschein:', licence: 'Klassen A1 und B (2022)',
        membershipLabel: 'Mitgliedschaft:',
    }
};

function translateAbout(lang) {
    document.querySelectorAll('[data-about]').forEach(element => {
        element.textContent = aboutTranslations[lang][element.dataset.about];
    });
}

function changeLanguage(lang) {
    if (!translations[lang]) lang = 'hu';
    savePreference('language', lang);
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
    translateAbout(lang);

    const navKeys = ['home', 'about', 'experience', 'studies', 'projects'];
    document.querySelectorAll('.nav-links, .hamburger-dropdown').forEach(menu => {
        menu.querySelectorAll('a').forEach((link, index) => {
            link.textContent = trans[navKeys[index]];
        });
    });

    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.querySelector('p').textContent = trans.greeting;
        heroText.querySelector('h1').textContent = trans.name;
        heroText.querySelector('h2').textContent = trans.titleText;
        heroText.querySelectorAll('p')[1].textContent = trans.description;

        const buttons = heroText.querySelectorAll('.btn');
        buttons[0].textContent = trans.button1;
        buttons[1].textContent = trans.button2;
    }

    const footerDivs = document.querySelectorAll('footer div');
    footerDivs[0].querySelector('h3').textContent = trans.contactMe;
    footerDivs[1].querySelector('h3').textContent = trans.programmingLanguages;
    footerDivs[2].querySelector('h3').textContent = trans.socialMedia;
    footerDivs[3].querySelector('h3').textContent = trans.resume;
    const resumeLink = footerDivs[3].querySelector('.btn');
    resumeLink.textContent = trans.download;
    resumeLink.href = lang === 'hu'
        ? 'cv/Vitalos_Tunde_HU.pdf'
        : 'cv/Tunde_Vitalos_EN.pdf';
    updatePageTranslation();
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
        if (!section) return;
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

function updatePageTranslation() {
    const page = document.body.dataset.page || 'home';
    const lang = document.documentElement.lang;
    const title = timelineTranslations[lang][`${page}Title`] || translations[lang][page];
    const heading = document.getElementById(`${page}-title`);
    if (heading) heading.textContent = title;
    document.title = page === 'home' ? translations[lang].title
        : `${title} | ${translations[lang].title}`;
}


changeLanguage(readPreference('language') || document.documentElement.lang);

const languageSelector = document.querySelector('.language-selector');
const currentLang = document.querySelector('.current-lang');

currentLang.addEventListener("click", function (event) {
    event.stopPropagation();

    languageSelector.classList.toggle("open");
    hamburgerMenu.classList.remove("open");
});


languageSelector.addEventListener('click', event => {
    if (event.target.closest('.dropdown-menu img')) {
        languageSelector.classList.remove('open');
    }
});
