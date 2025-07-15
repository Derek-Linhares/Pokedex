const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const digitalKeyboard = document.getElementById("digitalKeyboard");
const search = document.getElementById("search");
let isEaster = false;
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const easter = document.getElementById("easter");
const easterEggs = {
  ramon: {
    gif: "./assets/ramon.gif",
    audio: audio1
  },
  cj: {
    gif: "./assets/cj.gif",
    audio: audio2
  },
  nemesis: {
    gif: "./assets/nemesis.gif",
    audio: audio3
  }
};

// Pré-carrega os GIFs
Object.values(easterEggs).forEach(entry => {
  const img = new Image();
  img.src = entry.gif;
});

const keys = [
  ..."1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "←", "OK", "ESP"
];

keys.forEach(k => {
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
      buscarPokemon(output.textContent);
    } else {
      output.textContent += k;
    }
  });

  keyboard.appendChild(btn);
});

search.addEventListener("click", () => {
  if (canPlaySound) playAudio(selectAudio);

  if (!canOn && canClick) {
    if (digitalKeyboard.style.visibility === 'visible') {
      digitalKeyboard.style.visibility = 'hidden';
    } else {
      digitalKeyboard.style.visibility = 'visible';
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
  console.error("Erro ao buscar Pokémon:", error);
  if (!isEaster) displayNotFound();
}, 600);
    
  }
}

function mostrarEasterEgg(nome) {
  const nomeLower = nome.trim().toLowerCase();
  const egg = easterEggs[nomeLower];
  tela.style.backgroundImage = "url(./assets/fundo.jpg)"
  if (!egg) {
    isEaster = false;
    return;
  }

  isEaster = true;

  // Mostra o easter egg
  easter.style.backgroundImage = `url('${egg.gif}')`;
  easter.style.display = "block";

  if (egg.audio) {
    playAudio(egg.audio);
  }

  // Após 3 segundos, mostra o Yoshi
  setTimeout(() => {
    isEaster = false;
    easter.style.display = "none";

    visor.innerText = "#??? - Not Found";

    pokemonImage.src = "./assets/yoshi.gif";
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "visible";
  }, 3000);
}