let welcome = document.getElementById("welcome");
let manual = document.getElementById("manual");
let ligando = document.getElementById("ligando");
let navigation = document.getElementById("navigation");
let statusSection = document.getElementById("status");
let searchSection = document.getElementById("searchSection");
let soundsSection = document.getElementById("soundsSection");
let desligandoSection = document.getElementById("desligandoSection");
let finalSection = document.getElementById("finalSection");
let language = "PT";

document.addEventListener("DOMContentLoaded", preloadImages);

function preloadImages() {
  const images = [
    "./assets/manualImage.png",
    "./assets/ligando.png",
    "./assets/navigation.png",
    "./assets/status.png",
    "./assets/search.png",
    "./assets/soundsMode.png",
    "./assets/spain.png",
    "./assets/usa.png",
    "./assets/brazil.png",

  ];

  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

preloadImages();

function changeLanguage(lang) {
  language = lang;
  updateMenuLanguage(language);
  showInstructions();
}

const allSections = [
  document.getElementById("welcome"),
  document.getElementById("manual"),
  document.getElementById("ligando"),
  document.getElementById("navigation"),
  document.getElementById("status"),
  document.getElementById("searchSection"),
  document.getElementById("soundsSection"),
  document.getElementById("desligandoSection"),
  document.getElementById("finalSection"),
];

function showSection(sectionId) {
  allSections.forEach((sec) => (sec.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showAllSections() {
  allSections.forEach((sec) => (sec.style.display = "block"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const menuTexts = {
  PT: {
    btnBack: "Inicio",
    btnAll: "Mostrar todos",
    btnWelcome: "Bem-vindo",
    btnManual: "Guia",
    btnLigando: "Ligando",
    btnNavigation: "Navegação",
    btnStatus: "Status",
    btnSearch: "Busca",
    btnSounds: "Sons",
    btnDesligando: "Desligando",
    btnFinal: "Final",
  },
  EN: {
    btnBack: "Home",
    btnAll: "Show all",
    btnWelcome: "Welcome",
    btnManual: "Guide",
    btnLigando: "Powering On",
    btnNavigation: "Navigation",
    btnStatus: "Status",
    btnSearch: "Search",
    btnSounds: "Sounds",
    btnDesligando: "Shutting Down",
    btnFinal: "Final",
  },
  ES: {
    btnBack: "Inicio",
    btnAll: "Mostrar todo",
    btnWelcome: "Bienvenido",
    btnManual: "Guía",
    btnLigando: "Encendiendo",
    btnNavigation: "Navegación",
    btnStatus: "Estado",
    btnSearch: "Búsqueda",
    btnSounds: "Sonido",
    btnDesligando: "Apagando",
    btnFinal: "Final",
  },
};

function updateMenuLanguage(lang) {
  const texts = menuTexts[lang];
  for (const id in texts) {
    const button = document.getElementById(id);
    if (button) button.innerText = texts[id];
  }
}



let instructionsData;

fetch("./instructions.json")
  .then(response => response.json())
  .then(data => {
    instructionsData = data;
  })
  .catch(error => console.error("Erro ao carregar o JSON de instruções:", error));

function showInstructions() {
  document.getElementById("language").style.display = "none";
  document.getElementById("instructions").style.display = "block";
  document.querySelector("header").style.display = "block";
  document.getElementById("container").style.display = "block";
  showSection("welcome");

  const langData = instructionsData[language] || instructionsData["EN"];

  welcome.innerHTML = langData.welcome;
  manual.innerHTML = langData.manual;
  ligando.innerHTML = langData.ligando;
  navigation.innerHTML = langData.navigation;
  statusSection.innerHTML = langData.status;
  searchSection.innerHTML = langData.search;
  soundsSection.innerHTML = langData.sounds;
  desligandoSection.innerHTML = langData.desligando;
  finalSection.innerHTML = langData.final;
}

updateMenuLanguage(language);


function destacarBotao(botaoClicado) {
  const botoes = document.querySelectorAll('.menuBtn');

  botoes.forEach(btn => {
    btn.style.backgroundColor = '#5c5b5b'; 
  });

  botaoClicado.style.backgroundColor = '#c02020'; }



 