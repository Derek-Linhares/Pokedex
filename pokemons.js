let currentIndex = 0;
let preloadedPokemons = [];
let isFirstLoad = true;

let statsVisible = true;
let maleVoice = null;
let narrationVolume = 0.4;

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const statsDiv = document.getElementById("stats");
const scrollStep = 40;
document.addEventListener("DOMContentLoaded", preloadBackgrounds);

const backgroundImages = {
  bug: "./assets/backgrounds/bug.png",
  dark: "./assets/backgrounds/dark.png",
  dragon: "./assets/backgrounds/dragon.png",
  electric: "./assets/backgrounds/electric.png",
  fairy: "./assets/backgrounds/fairy.png",
  fighting: "./assets/backgrounds/fighting.png",
  fire: "./assets/backgrounds/fire.png",
  flying: "./assets/backgrounds/flying.png",
  ghost: "./assets/backgrounds/ghost.png",
  grass: "./assets/backgrounds/grass.jpg",
  ground: "./assets/backgrounds/ground.png",
  ice: "./assets/backgrounds/ice.png",
  normal: "./assets/backgrounds/normal.png",
  poison: "./assets/backgrounds/poison.png",
  psychic: "./assets/backgrounds/psychic.png",
  rock: "./assets/backgrounds/rock.png",
  water: "./assets/backgrounds/water.png",
  startImage: "./assets/startImage.png"
};

function preloadBackgrounds() {
  for (const type in backgroundImages) {
    const img = new Image();
    img.src = backgroundImages[type];
  }
}
preloadBackgrounds();

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  maleVoice = voices.find(
    (v) =>
      v.lang.startsWith("en") &&
      (v.name.includes("Daniel") ||
        v.name.includes("Google US English") ||
        v.name.includes("Male"))
  );
}

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  setTimeout(() => speechSynthesis.getVoices(), 100);
}

function speakText(text) {
  if (canTalk && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.volume = narrationVolume;
    if (maleVoice) utterance.voice = maleVoice;

    utterance.onstart = () => startSpeakingLightEffect();
    utterance.onend = () => stopSpeakingLightEffect();

    window.speechSynthesis.speak(utterance);
  }
}

async function fetchPokemon(query) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

async function preloadInitial(centerId, skipSpeak = true) {
  const visor = document.getElementById("visor");
  const pokemonImage = document.getElementById("pokemonImage");

  if (!isFirstLoad) {
    visor.innerText = "Loading data...";
  }
  pokemonImage.style.visibility = "hidden";
  pokemonImage.src = "";

  const start = Math.max(1, centerId - 2);
  const ids = Array.from({ length: 5 }, (_, i) => start + i);

  try {
    const promises = ids.map((id) => fetchPokemon(id));
    preloadedPokemons = await Promise.all(promises);
    currentIndex = centerId - start;

    setTimeout(() => {
      displayPokemon(preloadedPokemons[currentIndex], skipSpeak);
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      console.error("Erro ao pré-carregar:", error);
    }, 2300);
  }
}

function displayPokemon(pokemon, skipSpeak = false) {
  const visor = document.getElementById("visor");
  const pokemonImage = document.getElementById("pokemonImage");
  const tela = document.getElementById("tela");


  
  if (isEaster) {
    visor.innerText = "EASTER EGG 🤣🤣🤣";
    pokemonImage.src = "";
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "hidden";
    return;
  }

  if (!isFirstLoad) {
    visor.innerText = "Loading data...";
  }

  if (!pokemon || !pokemon.id || !pokemon.name) return;

  visor.innerText = `#${pokemon.id} - ${pokemon.name}`;

  let spriteToUse;
  if (pokemon.id <= 649) {
    const animatedSprite =
      pokemon?.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
        ?.front_default;
    spriteToUse =
      animatedSprite ||
      pokemon?.sprites?.front_default ||
      "./assets/bulbasaur.gif";
  } else {
    spriteToUse = pokemon?.sprites?.front_default || "./assets/bulbasaur.gif";
  }

  pokemonImage.style.opacity = 0;
  pokemonImage.style.visibility = "hidden";

  const mainType = pokemon.types?.[0]?.type?.name;
  let backgroundToUse = backgroundImages[mainType] || backgroundImages["grass"];  
  tela.style.backgroundImage = `url('${backgroundToUse}')`;

  const imgLoader = new Image();
  imgLoader.src = spriteToUse;

  imgLoader.onload = () => {
  
  

   if (isFirstLoad) {
    setTimeout(() => {
      pokemonImage.src = spriteToUse;
      pokemonImage.style.opacity = 1;
      pokemonImage.style.transition= "opacity 0.6s ease-in-out"; 
      pokemonImage.style.visibility = "visible";
      isFirstLoad = false;
    }, 3000);
  } else {
    
    pokemonImage.src = spriteToUse;
    pokemonImage.style.transition= "none";
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "visible";
  }}

  showStats(pokemon, skipSpeak);
}

function displayNotFound() {
  const pokemonImage = document.getElementById("pokemonImage");
  tela.style.backgroundImage = "url(./assets/fundo.jpg)";
  pokemonImage.src = yoshiImage.src;
  pokemonImage.style.opacity = 1;
  pokemonImage.style.visibility = "visible";
  visor.innerText = "#??? - Not Found";

  const nameEl = document.getElementById("stat-name");
  const attackEl = document.getElementById("stat-attack");
  const defenseEl = document.getElementById("stat-defense");
  const typeEl = document.getElementById("stat-type");
  const moveEl = document.getElementById("stat-move");
  const imageEl = document.getElementById("stat-image");

  imageEl.src = yoshiImage.src;
  nameEl.textContent = `Name: ???`;
  attackEl.textContent = `Attack: ???`;
  defenseEl.textContent = `Defense: ???`;
  typeEl.textContent = `Type: ???`;
  moveEl.textContent = `Main Attack: ???`;
}

leftArrow.addEventListener("click", async () => {
  if (canPlaySound) playAudio(nextAudio);
  if (!canOn && canClick) {
    if (currentIndex > 0) {
      currentIndex--;
      displayPokemon(preloadedPokemons[currentIndex]);
    } else {
      const newId = preloadedPokemons[0].id - 1;
      if (newId >= 1) {
        try {
          const newPokemon = await fetchPokemon(newId);
          preloadedPokemons.pop();
          preloadedPokemons.unshift(newPokemon);
          displayPokemon(newPokemon);
        } catch (e) {
          displayNotFound();
        }
      }
    }
  }
});

rightArrow.addEventListener("click", async () => {
  if (canPlaySound) playAudio(nextAudio);
  if (!canOn && canClick) {
    if (preloadedPokemons[currentIndex].id === 1025) {
      return;
    }

    if (currentIndex < preloadedPokemons.length - 1) {
      currentIndex++;
      displayPokemon(preloadedPokemons[currentIndex]);
    } else {
      const newId = preloadedPokemons[preloadedPokemons.length - 1].id + 1;
      if (newId <= 1025) {
        try {
          const newPokemon = await fetchPokemon(newId);
          preloadedPokemons.shift();
          preloadedPokemons.push(newPokemon);
          displayPokemon(newPokemon);
        } catch (e) {
          displayNotFound();
        }
      }
    }
  }
});

async function showStats(pokemon, skipSpeak = false) {
  const nameEl = document.getElementById("stat-name");
  const attackEl = document.getElementById("stat-attack");
  const defenseEl = document.getElementById("stat-defense");
  const typeEl = document.getElementById("stat-type");
  const moveEl = document.getElementById("stat-move");
  const imageEl = document.getElementById("stat-image");

  const typeIcons = {
    normal: "⭐",
    fighting: "🥊",
    flying: "🕊️",
    poison: "☠️",
    ground: "🌍",
    rock: "🪨",
    bug: "🐛",
    ghost: "👻",
    steel: "⚙️",
    fire: "🔥",
    water: "💧",
    grass: "🍃",
    electric: "⚡",
    psychic: "🔮",
    ice: "❄️",
    dragon: "🐉",
    dark: "🌑",
    fairy: "🧚‍♀️",
    unknown: "❓",
    shadow: "👤",
  };

  const staticImage = pokemon?.sprites?.front_default || yoshiImage.src;
  imageEl.src = staticImage;
  nameEl.textContent = `Name: ${pokemon.name}`;

  const attack = pokemon.stats.find(
    (stat) => stat.stat.name === "attack"
  )?.base_stat;
  const defense = pokemon.stats.find(
    (stat) => stat.stat.name === "defense"
  )?.base_stat;
  attackEl.textContent = `Attack: ${attack}`;
  defenseEl.textContent = `Defense: ${defense}`;

  const typesWithIcons = pokemon.types
    .map((t) => {
      const icon = typeIcons[t.type.name] || "";
      return `${icon} ${t.type.name}`;
    })
    .join(" / ");
  typeEl.textContent = `Type: ${typesWithIcons}`;

  try {
    for (const move of pokemon.moves) {
      const moveData = await fetch(move.move.url).then((res) => res.json());
      if (moveData.power !== null) {
        moveEl.textContent = `Main Attack: ${moveData.name}`;
        if (statsVisible && !skipSpeak) {
          const speech = `${
            pokemon.name
          }. Attack ${attack}. Defense ${defense}. Type ${pokemon.types
            .map((t) => t.type.name)
            .join(" and ")}. Main Attack: ${moveData.name}.`;
          speakText(speech);
        }
        return;
      }
    }
    moveEl.textContent = `Main Attack: Not Found`;
  } catch (e) {
    moveEl.textContent = `Main Attack: Not Found`;
    console.error("Error finding main attack:", e);
  }
}

upArrow.addEventListener("click", () => {
  statsDiv.scrollTop -= scrollStep;
});

downArrow.addEventListener("click", () => {
  statsDiv.scrollTop += scrollStep;
});

preloadInitial(1);
