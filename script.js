let currentLang = localStorage.getItem("lang") || "en";

document.addEventListener("DOMContentLoaded", () => {
    const langSelector = document.getElementById("lang-selector");
    langSelector.value = currentLang;

    langSelector.addEventListener("change", e => {
        currentLang = e.target.value;
        loadLanguage(currentLang);
    });

    loadLanguage(currentLang);

    // --- NAVIGATION PAR ONGLETS ---
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            navLinks.forEach(nav => nav.classList.remove("active"));
            link.classList.add("active");

            const targetId = link.getAttribute("href").substring(1);
            sections.forEach(sec => sec.classList.remove("active"));
            document.getElementById(targetId).classList.add("active");

            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});

function loadLanguage(lang) {
    fetch("lang/lang.json")
        .then(res => res.json())
        .then(data => {
            const t = data[lang];

            // --- HEADER ---
            document.querySelector('#profile p').textContent = t.header.title;

            // --- NAVIGATION ---
            document.querySelector('a[href="#home"]').textContent = t.nav.home;
            document.querySelector('a[href="#career"]').textContent = t.nav.career;
            document.querySelector('a[href="#engineering"]').textContent = t.nav.engineering;
            document.querySelector('a[href="#mobility"]').textContent = t.nav.mobility;
            document.querySelector('a[href="#civic"]').textContent = t.nav.civic;
            document.querySelector('a[href="#activities"]').textContent = t.nav.activities;

            // --- SECTIONS ---
            document.querySelector("#home h2").textContent = t.home.title;
            document.querySelector("#home .intro").textContent = t.home.intro;
            document.querySelector("#home .content1").textContent = t.home.p1;
            document.querySelector("#home .content2").textContent = t.home.p2;
            document.querySelector("#home .content3").textContent = t.home.p3;

            document.querySelector("#engineering h2").textContent = t.engineering.title;
            document.querySelector("#engineering p").textContent = t.engineering.content;

            document.querySelector("#mobility h2").textContent = t.mobility.title;
            document.querySelector("#mobility .intro").textContent = t.mobility.intro;

            document.querySelector("#civic h2").textContent = t.civic.title;
            document.querySelector("#civic p").textContent = t.civic.content;

            document.querySelector("#activities h2").textContent = t.activities.title;
            document.querySelector("#activities .intro").textContent = t.activities.intro;
            document.querySelector("#activities .conclusion").textContent = t.activities.conclusion; // ✅ ajout

            // --- ACTIVITIES CARDS ---
            const container = document.getElementById("activities-container");
            container.innerHTML = "";

            t.activities.cards.forEach(act => {
                const card = document.createElement("div");
                card.classList.add("activity-card");
                card.innerHTML = `<h3>${act.icon} ${act.title}</h3><p>${act.description}</p>`;
                container.appendChild(card);
            });

            // --- CAREER ---
            document.querySelector("#career h2").textContent = t.career.title;
            document.querySelector("#career p").textContent = t.career.content;

            // --- FOOTER ---
            document.querySelector("footer p").textContent = t.footer;

            // Sauvegarde de la langue
            localStorage.setItem("lang", lang);
        })
        .catch(err => console.error("Error loading language:", err));
}