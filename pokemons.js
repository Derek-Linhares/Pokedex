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

function loadVoices() {
  const voices = window.speechSynthesis.getVoices();
  maleVoice = voices.find(v =>
    v.lang.startsWith("en") &&
    (v.name.includes("Daniel") || v.name.includes("Google US English") || v.name.includes("Male"))
  );
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadVoices;
  loadVoices();
  setTimeout(() => speechSynthesis.getVoices(), 100); 
}

function speakText(text) {
  if(canTalk){
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.volume = narrationVolume; // <- controle de volume
    if (maleVoice) utterance.voice = maleVoice;

    // Acende a luz azul
    utterance.onstart = () => {
      const light = document.getElementById("pokedex-light");
      light.style.backgroundColor = "rgb(75, 100, 255)";
    };

    // Apaga a luz azul
    utterance.onend = () => {
      const light = document.getElementById("pokedex-light");
      light.style.backgroundColor = "rgb(0, 0, 0)";
    };

   utterance.onstart = () => {
  startSpeakingLightEffect();
};

utterance.onend = () => {
  stopSpeakingLightEffect();
};

window.speechSynthesis.speak(utterance);
  }
}else{
  return
}}

async function fetchPokemon(query) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  if (!data.ok) throw new Error("Pokémon not found");
  return await data.json();
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
  const ids = [];

  for (let i = 0; i < 5; i++) {
    ids.push(start + i);
  }

  try {
    const promises = ids.map(id => fetchPokemon(id));
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

  if (isEaster) {
    visor.innerText = "EASTER EGG 🤣🤣🤣";
    
    // Exibe imagem especial de easter egg se desejar
    pokemonImage.src = "./assets/yoshi.gif";
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "visible";
    
    return;
  }

  if (!isFirstLoad) {
  visor.innerText = "Loading data...";
}

  if (!pokemon || !pokemon.id || !pokemon.name) {
    return;
  }

  visor.innerText = `#${pokemon.id} - ${pokemon.name}`;

  let spriteToUse;
  if (pokemon.id <= 649) {
    const animatedSprite = pokemon?.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default;
    spriteToUse = animatedSprite || pokemon?.sprites?.front_default || "./assets/bulbasaur.gif";
  } else {
    spriteToUse = pokemon?.sprites?.front_default || "./assets/bulbasaur.gif";
  }

  pokemonImage.style.opacity = 0;
  pokemonImage.style.visibility = "hidden";

  if (isFirstLoad) {
    setTimeout(() => {
      pokemonImage.src = spriteToUse;
      pokemonImage.style.opacity = 1;
      pokemonImage.style.visibility = "visible";
      isFirstLoad = false;
    }, 3500);
  } else {
    pokemonImage.src = spriteToUse;
    pokemonImage.style.opacity = 1;
    pokemonImage.style.visibility = "visible";
  }

  showStats(pokemon, skipSpeak);
}



function displayNotFound() {

  const pokemonImage = document.getElementById("pokemonImage");

  

  pokemonImage.src = "./assets/yoshi.gif";
  pokemonImage.style.opacity = 1;
  pokemonImage.style.visibility = "visible";

  const nameEl = document.getElementById("stat-name");
  const attackEl = document.getElementById("stat-attack");
  const defenseEl = document.getElementById("stat-defense");
  const typeEl = document.getElementById("stat-type");
  const moveEl = document.getElementById("stat-move");
  const imageEl = document.getElementById("stat-image");

  imageEl.src = "./assets/yoshi.gif";
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
          console.error("Erro ao carregar anterior", e);
          displayNotFound();
        }
      }
    }
  }
});

rightArrow.addEventListener("click", async () => {
  if (canPlaySound) playAudio(nextAudio);
  if (!canOn && canClick) {
    if (currentIndex < preloadedPokemons.length - 1) {
      currentIndex++;
      displayPokemon(preloadedPokemons[currentIndex]);
    } else {
      const newId = preloadedPokemons[preloadedPokemons.length - 1].id + 1;
      try {
        const newPokemon = await fetchPokemon(newId);
        preloadedPokemons.shift();
        preloadedPokemons.push(newPokemon);
        displayPokemon(newPokemon);
      } catch (e) {
        console.error("Erro ao carregar próximo", e);
        displayNotFound();
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
    normal: "⭐", fighting: "🥊", flying: "🕊️", poison: "☠️", ground: "🌍",
    rock: "🪨", bug: "🐛", ghost: "👻", steel: "⚙️", fire: "🔥", water: "💧",
    grass: "🍃", electric: "⚡", psychic: "🔮", ice: "❄️", dragon: "🐉",
    dark: "🌑", fairy: "🧚‍♀️", unknown: "❓", shadow: "👤",
  };

  const staticImage = pokemon?.sprites?.front_default || "./assets/yoshi.gif";
  imageEl.src = staticImage;
  nameEl.textContent = `Name: ${pokemon.name}`;

  const attack = pokemon.stats.find(stat => stat.stat.name === "attack")?.base_stat;
  const defense = pokemon.stats.find(stat => stat.stat.name === "defense")?.base_stat;
  attackEl.textContent = `Attack: ${attack}`;
  defenseEl.textContent = `Defense: ${defense}`;

  const typesWithIcons = pokemon.types.map(t => {
    const icon = typeIcons[t.type.name] || "";
    return `${icon} ${t.type.name}`;
  }).join(" / ");
  typeEl.textContent = `Type: ${typesWithIcons}`;

  try {
    for (const move of pokemon.moves) {
      const moveData = await fetch(move.move.url).then(res => res.json());
      if (moveData.power !== null) {
        moveEl.textContent = `Main Attack: ${moveData.name}`;
        if (statsVisible && !skipSpeak) {
          const speech = `${pokemon.name}. Attack ${attack}. Defense ${defense}. Type ${pokemon.types.map(t => t.type.name).join(" and ")}. Main Attack: ${moveData.name}.`;
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
