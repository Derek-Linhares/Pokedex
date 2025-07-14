const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const digitalKeyboard = document.getElementById("digitalKeyboard");
const search = document.getElementById("search");
let isEaster = false;
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const easter = document.getElementById("easter");

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

  visor.innerText = "Loading data...";
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
    displayNotFound();
    }, 1000);
    
  }
}

function mostrarEasterEgg(nome) {
  const nomeLower = nome.trim().toLowerCase();
  let imagem = "";
  let audio = null;

  if (nomeLower === "ramon") {
    imagem = "url('./assets/ramon.gif')";
    audio = audio1;
    isEaster = true;
  } else if (nomeLower === "cj") {
    imagem = "url('./assets/cj.gif')";
    audio = audio2;
    isEaster = true;
  } else if (nomeLower === "nemesis") {
    imagem = "url('./assets/nemesis.gif')";
    audio = audio3;
    isEaster = true;
  } else {
    isEaster = false;
    return;
  }

  easter.style.backgroundImage = imagem;
  easter.style.display = "block";

  if (audio) {
    playAudio(audio);
  }

  setTimeout(() => {
    isEaster = false;
    visor.innerText = `#??? - Not Found`;
    easter.style.display = "none";
  }, 3000);
}
