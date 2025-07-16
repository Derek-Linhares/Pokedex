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

function preloadImages() {
  const images = [
    "./assets/manualImage.png",
    "./assets/ligando.png",
    "./assets/navigation.png",
    "./assets/status.png",
    "./assets/search.png",
    "./assets/soundsMode.png",
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

const welcomeEn = `
  <h1>Welcome to the user guide for your new Pokédex!</h2>
   <div class="text">
  <p>This guide will help you explore and understand all the features of your Pokédex, from searching Pokémon by name or ID, to unlocking hidden easter eggs.</p>
  <p>Get ready to begin your journey as a true Pokémon Trainer. Let’s dive in!</p>
    </div>
`;

const welcomePt = `
  <h1>Bem-vindo ao guia de usuário da sua nova Pokédex!</h2>
   <div class="text">
  <p>Este guia vai te ajudar a explorar e entender todos os recursos da sua Pokédex, desde buscar Pokémon por nome ou ID até desbloquear easter eggs escondidos.</p>
  <p>Prepare-se para começar sua jornada como um verdadeiro Treinador Pokémon. Vamos nessa!</p>
    </div>
`;

const welcomeEs = `
  <h1>¡Bienvenido a la guía de usuario de tu nueva Pokédex!</h2>
   <div class="text">
  <p>Esta guía te ayudará a explorar y comprender todas las funciones de tu Pokédex, desde buscar Pokémon por nombre o ID hasta descubrir huevos de pascua ocultos.</p>
  <p>Prepárate para comenzar tu aventura como un verdadero Entrenador Pokémon. ¡Vamos allá!</p>
    </div>
`;

const manualPt = `
  <h1>Guia Geral</h1>
    <img src="./assets/manualImage.png" alt="Manual da Pokédex" style="max-width: 100%; height: auto; margin: 1em 0;">
  <ul>
    <li>1-Ligar</li>
    <li>2-Desligar</li>
    <li>3-Mostrar e ocultar teclado</li>
    <li>4-Mostrar e ocultar status</li>
    <li>5-Visor</li>
    <li>6-LED luminoso</li>
    <li>7-Ligar e desligar sons</li>
    <li>8-Ligar e desligar narração</li>
    <li>9-Ligar e desligar música</li>
    <li>10-Tela</li>
    <li>11-Seta para cima</li>
    <li>12-Seta para a esquerda</li>
    <li>13-Seta para a direita</li>
    <li>14-Seta para baixo</li>
  </ul>
`;

const manualEn = `
  <h1>General Guide</h1>
      <img src="./assets/manualImage.png" alt="Manual da Pokédex" style="max-width: 100%; height: auto; margin: 1em 0;">
  <ul>
    <li>1-Power On</li>
    <li>2-Power Off</li>
    <li>3-Show and hide keyboard</li>
    <li>4-Show and hide status</li>
    <li>5-Display</li>
    <li>6-LED light</li>
    <li>7-Turn sounds on and off</li>
    <li>8-Turn narration on and off</li>
    <li>9-Turn music on and off</li>
    <li>10-Screen</li>
    <li>11-Up arrow</li>
    <li>12-Left arrow</li>
    <li>13-Right arrow</li>
    <li>14-Down arrow</li>
  </ul>
`;

const manualEs = `
  <h1>Guía General</h1>
      <img src="./assets/manualImage.png" alt="Manual da Pokédex" style="max-width: 100%; height: auto; margin: 1em 0;">
  <ul>
    <li>1-Encender</li>
    <li>2-Apagar</li>
    <li>3-Mostrar y ocultar teclado</li>
    <li>4-Mostrar y ocultar estado</li>
    <li>5-Visor</li>
    <li>6-Luz LED</li>
    <li>7-Encender y apagar sonidos</li>
    <li>8-Encender y apagar narración</li>
    <li>9-Encender y apagar música</li>
    <li>10-Pantalla</li>
    <li>11-Flecha hacia arriba</li>
    <li>12-Flecha hacia la izquierda</li>
    <li>13-Flecha hacia la derecha</li>
    <li>14-Flecha hacia abajo</li>
  </ul>
`;

const ligandoPt = `
  <h1>Ligando a Pokédex</h1>
  <img src="./assets/ligando.png" alt="Ligando a Pokédex" style="max-width:100%; border-radius:10px; margin-bottom:1rem;">
  <div class="text">
  <p>Ao pressionar o botão de ligar #1, você dá vida à sua Pokédex!</p>
  <p>Assim que ligar, uma animação divertida vai aparecer, e o primeiro Pokémon do índice (o número 1!) surge na tela ao som da clássica abertura do anime em gloriosos 8 bits.</p>
  <p>Prepare-se, Treinador! Sua jornada começa aqui. 😉</p>
  </div>
`;

const ligandoEn = `
  <h1>Powering On Your Pokédex</h1>
  <img src="./assets/ligando.png" alt="Powering on Pokédex" style="max-width:100%; border-radius:10px; margin-bottom:1rem;">
  <div class="text">
  <p>By pressing the power button #1, you bring your Pokédex to life!</p>
  <p>Once it turns on, a fun animation will play, and the first Pokémon (that’s number 1!) will pop up on screen, all while the classic anime theme blasts in glorious 8-bit.</p>
  <p>Get ready, Trainer! Your adventure starts now. 🚀</p>
`;

const ligandoEs = `
  <h1>Encendiendo la Pokédex</h1>
  <img src="./assets/ligando.png" alt="Encendiendo la Pokédex" style="max-width:100%; border-radius:10px; margin-bottom:1rem;">
  <div class="text">
  <p>Al presionar el botón de encendido #1, ¡le das vida a tu Pokédex!</p>
  <p>Una animación divertida aparecerá en la pantalla, y el primer Pokémon del índice (¡el número 1!) se mostrará acompañado del tema clásico del anime en gloriosos 8 bits.</p>
  <p>¡Prepárate, Entrenador! Tu aventura empieza ahora. 🎮</p>
  </div>
`;

const navigationPt = `
  <h1>Navegação</h1>
  <img src="./assets/navigation.png" alt="Imagem da navegação na Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Explorar Pokémon é fácil e divertido!</p>
    <p>Use as setas mágicas da sua Pokédex: pressione o botão #13 para avançar para o próximo Pokémon, e o botão #12 para voltar ao anterior.</p>
    <p>É quase como folhear um álbum de figurinhas — só que digital e com muito mais criaturas fofas (ou assustadoras)!</p>
  </div>
`;

const navigationEn = `
  <h1>Navigation</h1>
  <img src="./assets/navigation.png" alt="Pokédex navigation image" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Exploring Pokémon has never been easier—or more fun!</p>
    <p>Press the magic arrows on your Pokédex: tap button #13 to move forward through Pokémon IDs, and button #12 to go back.</p>
    <p>It’s like flipping through a Poké-card album—only cooler and way more high-tech!</p>
  </div>
`;

const navigationEs = `
  <h1>Navegación</h1>
  <img src="./assets/navigation.png" alt="Imagen de navegación de la Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>¡Explorar Pokémon es fácil y divertido!</p>
    <p>Usa las flechas mágicas de tu Pokédex: presiona el botón #13 para avanzar y el botón #12 para retroceder entre los Pokémon.</p>
    <p>¡Es como hojear un álbum de estampas, pero digital y lleno de criaturas increíbles!</p>
  </div>
`;

const statusPt = `
  <h1>Status</h1>
  <img src="./assets/status.png" alt="Imagem da tela de status da Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Quer saber se seu Pokémon é forte como um Onix ou rápido como um Jolteon? É só pressionar o botão 4 da sua Pokédex!</p>
    <p>Os status aparecem na tela e, se quiser ver tudo, use as teclas 11 e 14 para rolar a tela — 11 sobe, 14 desce. Fácil e divertido!</p>
  </div>
`;

const statusEn = `
  <h1>Status</h1>
  <img src="./assets/status.png" alt="Pokédex status screen image" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Wondering if your Pokémon is as strong as Onix or as fast as Jolteon? Just press button 4 on your Pokédex!</p>
    <p>The status screen will appear, and you can scroll through it using buttons 11 and 14 — 11 goes up, 14 goes down. Easy peasy!</p>
  </div>
`;

const statusEs = `
  <h1>Status</h1>
  <img src="./assets/status.png" alt="Imagen de la pantalla de estado de la Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>¿Quieres saber si tu Pokémon es fuerte como un Onix o rápido como un Jolteon? ¡Solo presiona el botón 4 de tu Pokédex!</p>
    <p>Verás la pantalla de estado, y puedes recorrerla usando los botones 11 y 14 — 11 hacia arriba, 14 hacia abajo. ¡Así de fácil!</p>
  </div>
`;

const searchPt = `
  <h1>Search</h1>
  <img src="./assets/search.png" alt="Imagem do teclado da Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Pressionando o botão 3 da sua Pokédex, o teclado aparece!</p>
    <p>Com ele, você pode pesquisar pelo nome ou número do ID do seu Pokémon favorito.</p>
    <p>Mas olha... aqui não tem easter eggs, viu? Então nunca, jamais, em hipótese alguma digite "nemesis", "cj" ou "ramon". 😉</p>
  </div>
`;

const searchEn = `
  <h1>Search</h1>
  <img src="./assets/search.png" alt="Pokédex keyboard image" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>By pressing button 3 on your Pokédex, the keyboard will pop up!</p>
    <p>Use it to search your favorite Pokémon by name or ID number.</p>
    <p>But hey... there are definitely no easter eggs here. So never, ever, under any circumstances type "nemesis", "cj", or "ramon". 😉</p>
  </div>
`;

const searchEs = `
  <h1>Búsqueda</h1>
  <img src="./assets/search.png" alt="Imagen del teclado de la Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Al presionar el botón 3 de tu Pokédex, ¡aparecerá el teclado!</p>
    <p>Con él puedes buscar a tu Pokémon favorito por nombre o número de ID.</p>
    <p>Pero oye... aquí no hay huevos de pascua, ¿ok? Así que nunca, jamás, bajo ninguna circunstancia escribas "nemesis", "cj" o "ramon". 😉</p>
  </div>
`;

const soundsModePt = `
  <h1>Sounds Mode</h1>
  <img src="./assets/soundsMode.png" alt="Modos de som da Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Pressionando os botões 7, 8 e 9 da sua Pokédex, você ativa ou desativa os modos de som!</p>
    <p>O botão 9 controla a música: quer silêncio ou curtir um chiptune? Você escolhe!</p>
    <p>O botão 8 liga ou desliga a narração dos status. Perfeito pra quem prefere ler no silêncio.</p>
    <p>Já o botão 7 ativa ou desativa os sons dos botões e do teclado. Ideal pra jogar escondido na aula (brincadeira... ou não?).</p>
  </div>
`;

const soundsModeEn = `
  <h1>Sounds Mode</h1>
  <img src="./assets/soundsMode.png" alt="Pokédex sound modes" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text" id="soundText">
    <p>By pressing buttons 7, 8, and 9 on your Pokédex, you can toggle between different sound modes!</p>
    <p>Button 9 controls the music: turn it off for stealth or jam to some sweet 8-bit beats!</p>
    <p>Button 8 toggles narration: perfect for quiet reading mode.</p>
    <p>And button 7 controls button and keyboard sounds — great if you're secretly playing during class (just kidding... or am I?).</p>
  </div>
`;

const soundsModeEs = `
  <h1>Modo de Sonido</h1>
  <img src="./assets/soundsMode.png" alt="Modos de sonido de la Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text" id="soundText">
    <p>Al presionar los botones 7, 8 y 9 de tu Pokédex, ¡puedes cambiar entre los modos de sonido!</p>
    <p>El botón 9 controla la música: siléncialo o disfruta de una melodía en 8 bits, tú decides.</p>
    <p>El botón 8 activa o desactiva la narración de los estados. Ideal si prefieres leer en silencio.</p>
    <p>Y el botón 7 controla los sonidos de los botones y del teclado. Perfecto si estás jugando a escondidas (¡es broma!... ¿o no?).</p>
  </div>
`;

const powerOffPt = `
  <h1>Desligando</h1>
  <img src="./assets/desligando.png" alt="Botão de desligar Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text" id="soundText">
    <p>Pressionando o botão 2 da sua Pokédex, você desliga o sistema por completo.</p>
    <p>Todas as luzes se apagam, a música para e a Pokédex tira um cochilo digital merecido.</p>
    <p>Mas não se preocupe! Quando quiser voltar à ação, é só apertar o botão 1 e mergulhar novamente no mundo Pokémon!</p>
  </div>
`;

const powerOffEn = `
  <h1>Powering Off</h1>
  <img src="./assets/desligando.png" alt="Pokédex power off button" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Pressing button 2 on your Pokédex will shut the whole system down.</p>
    <p>The lights go out, the music fades, and your Pokédex takes a well-deserved digital nap.</p>
    <p>But don't worry! Just hit button 1 to wake it up and dive right back into the Pokémon world!</p>
  </div>
`;

const powerOffEs = `
  <h1>Apagando</h1>
  <img src="./assets/desligando.png" alt="Botón de apagado de la Pokédex" style="max-width:100%; border-radius: 10px; margin-bottom: 1rem;">
  <div class="text">
    <p>Al presionar el botón 2, tu Pokédex se apaga completamente.</p>
    <p>Las luces se apagan, la música se detiene y tu Pokédex entra en modo siesta digital.</p>
    <p>Pero no te preocupes, ¡solo presiona el botón 1 para volver a la acción y seguir tu aventura Pokémon!</p>
  </div>
`;

const finalPt = `
  <h1>Fim da Jornada... ou o Início?</h1>
  <div class="text" id="finalText">
    <p>Bem, se você chegou até aqui, é porque agora você domina todas as funções da sua Pokédex!</p>
    <p>Obrigado por acompanhar esse guia e boa sorte em sua jornada Pokémon! Que você capture todos!</p>
    <p>Você pode <a href="index.html">voltar à página inicial!</a> </p>
  </div>
`;

const finalEn = `
  <h1>The End... or Just the Beginning?</h1>
  <div class="text" id="finalText">
    <p>Well, if you made it this far, it means you now master every function of your Pokédex!</p>
    <p>Thanks for following along this guide, and good luck on your Pokémon journey! Gotta catch 'em all!</p>
    <p>You can <a href="index.html">go back to the main page!</a></p>
  </div>
`;

const finalEs = `
  <h1>¿El Fin... o el Comienzo?</h1>
  <div class="text" id="finalText">
    <p>Bueno, si has llegado hasta aquí, ¡significa que ya dominas todas las funciones de tu Pokédex!</p>
    <p>Gracias por seguir esta guía y ¡mucha suerte en tu aventura Pokémon! ¡Atrápalos a todos!</p>
    <p>Puedes <a href="index.html">volver a la página principal!</a></p>
  </div>
`;

function showInstructions() {
  document.getElementById("language").style.display = "none";
  document.getElementById("instructions").style.display = "block";
  document.querySelector("header").style.display = "block";
  document.getElementById("container").style.display = "block";
  switch (language) {
    case "EN":
      welcome.innerHTML = welcomeEn;
      manual.innerHTML = manualEn;
      ligando.innerHTML = ligandoEn;
      navigation.innerHTML = navigationEn;
      statusSection.innerHTML = statusEn;
      searchSection.innerHTML = searchEn;
      soundsSection.innerHTML = soundsModeEn;
      desligandoSection.innerHTML = powerOffEn;
      finalSection.innerHTML = finalEn;
      break;
    case "PT":
      welcome.innerHTML = welcomePt;
      manual.innerHTML = manualPt;
      ligando.innerHTML = ligandoPt;
      navigation.innerHTML = navigationPt;
      statusSection.innerHTML = statusPt;
      searchSection.innerHTML = searchPt;
      soundsSection.innerHTML = soundsModePt;
      desligandoSection.innerHTML = powerOffPt;
      finalSection.innerHTML = finalPt;
      break;
    case "ES":
      welcome.innerHTML = welcomeEs;
      manual.innerHTML = manualEs;
      ligando.innerHTML = ligandoEs;
      navigation.innerHTML = navigationEs;
      statusSection.innerHTML = statusEs;
      searchSection.innerHTML = searchEs;
      soundsSection.innerHTML = soundsModeEs;
      desligandoSection.innerHTML = powerOffEs;
      finalSection.innerHTML = finalEs;
      break;
    default:
      welcome.innerHTML = welcomeEn;
      break;
  }
}

updateMenuLanguage(language);
