const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const digitalKeyboard = document.getElementById("digitalKeyboard");
const search = document.getElementById("search");
let isEaster = false;
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const easter = document.getElementById("easter");
const configMenu = document.getElementById("config-menu")
const config = document.getElementById("config")
const easterEggs = {
  ramon: {
    gif: "./assets/ramon.gif",
    audio: audio1,
  },
  cj: {
    gif: "./assets/cj.gif",
    audio: audio2,
  },
  nemesis: {
    gif: "./assets/nemesis.gif",
    audio: audio3,
  },
};
const yoshiImage = new Image();
yoshiImage.src = "./assets/yoshi.gif";

Object.values(easterEggs).forEach((entry) => {
  const img = new Image();
  img.src = entry.gif;
});

const keys = [..."1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", "←", "OK", "ESP"];

keys.forEach((k) => {
  const btn = document.createElement("div");
  btn.textContent = k;
  btn.classList.add("key");

  if (k === "←") {
    btn.id = "key-backspace";
    btn.classList.add("wide");
  } else if (k === "ESP") {
    btn.id = "key-space";
    btn.classList.add("wide");
  } else if (k === "OK") {
    btn.id = "key-ok";
    btn.classList.add("wide");
  }

  btn.addEventListener("click", () => {
    if (canPlaySound) playAudio(typeAudio);

    if (k === "←") {
      output.textContent = output.textContent.slice(0, -1);
    } else if (k === "ESP") {
      output.textContent += " ";
    } else if (k === "OK") {
      const query = output.textContent.trim();
      buscarPokemon(query === "" ? "1" : query);
    } else {
      output.textContent += k;
    }
  });

  keyboard.appendChild(btn);
});

search.addEventListener("click", () => {
  if (canPlaySound) playAudio(selectAudio);

  if (!canOn && canClick) {
    if (digitalKeyboard.style.visibility === "visible") {
      digitalKeyboard.style.visibility = "hidden";
      canChange = true;
    } else {
      digitalKeyboard.style.visibility = "visible";
      canChange = false;
    }
  }
});
config.addEventListener("click", () => {
  const pokemonImage = document.getElementById("pokemonImage");
  if (canPlaySound) playAudio(selectAudio);

  if (!canOn && canClick) {
    if (configMenu.style.visibility === "visible") {
      configMenu.style.visibility = "hidden";
      canChange = true;
      canConfig = false;
       pokemonImage.style.visibility = "visible";
    } else {
      configMenu.style.visibility = "visible";
      canChange = false;
      canConfig = true;
      pokemonImage.style.visibility = "hidden";
    }
  }
});

function buscarPokemon(nome) {
  digitalKeyboard.style.visibility = "hidden";

  mostrarEasterEgg(nome);
  handleSearchInput(nome);
  displayPokemon(nome);
}

async function handleSearchInput(input) {
  const visor = document.getElementById("visor");
  const pokemonImage = document.getElementById("pokemonImage");

  if (!isFirstLoad) {
    visor.innerText = "Loading data...";
  }
  pokemonImage.style.visibility = "hidden";
  pokemonImage.src = "";
  let query = input.trim().toLowerCase();
  if (!query) return;

  try {
    let poke;

    if (!isNaN(query)) {
      poke = await fetchPokemon(Number(query));
    } else {
      poke = await fetchPokemon(query);
    }

    const shouldSkipSpeak = window.skipSpeakOnce === true;
    window.skipSpeakOnce = false;
    await preloadInitial(poke.id, shouldSkipSpeak);
  } catch (error) {
    setTimeout(() => {
      if (!isEaster) displayNotFound();
    }, 600);
  }
}

function mostrarEasterEgg(nome) {
  const nomeLower = nome.trim().toLowerCase();
  const egg = easterEggs[nomeLower];
  tela.style.backgroundImage = "url(./assets/fundo.jpg)";
  stopSpeakingLightEffect();

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (!egg) {
    isEaster = false;
    canChange = true
    return;
  }

  isEaster = true;

  const estadoAnterior = {
    numero: visor.innerText,
    imagemSrc: pokemonImage.src,
    alt: pokemonImage.alt,
  };

  easter.style.backgroundImage = `url('${egg.gif}')`;
  easter.style.display = "block";

  if (egg.audio) {
    playAudio(egg.audio);
  }

  setTimeout(() => {
    isEaster = false;
    easter.style.display = "none";

    visor.innerText = estadoAnterior.numero;
    pokemonImage.src = estadoAnterior.imagemSrc;
    pokemonImage.alt = estadoAnterior.alt || "";
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "visible";
    canChange = true;
  }, 3000);
}
