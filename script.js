let currentLang = localStorage.getItem("lang") || "en";

document.addEventListener("DOMContentLoaded", () => {
    loadLanguage(currentLang);

    const langSelector = document.getElementById("lang-selector");
    langSelector.value = currentLang;

    langSelector.addEventListener("change", (e) => {
        const newLang = e.target.value;
        loadLanguage(newLang);
    });
});

function loadLanguage(lang) {
    fetch("lang/lang.json")
        .then((response) => response.json())
        .then((data) => {
            const t = data[lang];

        // Header
            document.querySelector('#profile p').textContent = t.header.title; 

        // Navigation
            document.querySelector('a[href="#home"]').textContent = t.nav.home;
            document.querySelector('a[href="#career"]').textContent = t.nav.career;
            document.querySelector('a[href="#engineering"]').textContent = t.nav.engineering;
            document.querySelector('a[href="#mobility"]').textContent = t.nav.mobility;
            document.querySelector('a[href="#civic"]').textContent = t.nav.civic;
            document.querySelector('a[href="#activities"]').textContent = t.nav.activities;

      // Sections
            document.querySelector("#home h2").textContent = t.home.title;
            document.querySelector("#home p").textContent = t.home.intro;
            document.querySelector("#engineering h2").textContent = t.engineering.title;
            document.querySelector("#engineering p").textContent = t.engineering.content;
            document.querySelector("#mobility h2").textContent = t.mobility.title;
            document.querySelector("#mobility p").textContent = t.mobility.content;
            document.querySelector("#civic h2").textContent = t.civic.title;
            document.querySelector("#civic p").textContent = t.civic.content;
            document.querySelector("#activities h2").textContent = t.activities.title;
            document.querySelector("#activities p").textContent = t.activities.content;
            document.querySelector("#career h2").textContent = t.career.title;
            document.querySelector("#career p").textContent = t.career.content;

        // Footer
            document.querySelector("footer p").textContent = t.footer;

        // Sauvegarder la langue
            localStorage.setItem("lang", lang);
        })
    .catch((err) => console.error("Error loading language:", err));
}

// --- NAVIGATION PAR ONGLETS ---
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("main section");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // empêche le scroll automatique vers l'ancre

            // Retire "active" de tous les liens
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Ajoute "active" au lien cliqué
            link.classList.add("active");

            // Récupère l'ID de la section correspondante (#home, #engineering, etc.)
            const targetId = link.getAttribute("href").substring(1);

            // Masque toutes les sections
            sections.forEach(sec => sec.classList.remove("active"));

            // Affiche la bonne section
            const targetSection = document.getElementById(targetId);
            targetSection.classList.add("active");

            // (Optionnel) Scroll doux vers le haut
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    });
});

