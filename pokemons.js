let currentIndex = 0;
let preloadedPokemons = [];
let isFirstLoad = true;

const leftArrow = document.getElementById("leftArrow");
const rightArrow = document.getElementById("rightArrow");
const upArrow = document.getElementById("upArrow");
const downArrow = document.getElementById("downArrow");
const statsDiv = document.getElementById("stats");

const scrollStep = 40;

async function fetchPokemon(query) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  if (!data.ok) throw new Error("Pokémon not found");
  return await data.json();
}

async function preloadInitial(centerId) {
  const start = Math.max(1, centerId - 2);
  const ids = [];

  for (let i = 0; i < 5; i++) {
    ids.push(start + i);
  }

  try {
    const promises = ids.map(id => fetchPokemon(id));
    preloadedPokemons = await Promise.all(promises);
    currentIndex = centerId - start;
    displayPokemon(preloadedPokemons[currentIndex]);
  } catch (error) {
    console.error("Erro ao pré-carregar:", error);
    displayNotFound();
  }
}

function displayPokemon(pokemon) {
  const visor = document.getElementById("visor");
  const pokemonImage = document.getElementById("pokemonImage");

  if (!pokemon || !pokemon.id || !pokemon.name) {
    displayNotFound();
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

  showStats(pokemon);
}

function displayNotFound() {
  const visor = document.getElementById("visor");
  const pokemonImage = document.getElementById("pokemonImage");

  visor.innerText = `#??? - Not Found`;
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

async function showStats(pokemon) {
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
        break;
      }
    }
  } catch (e) {
    moveEl.textContent = `Main Attack: Not Found`;
    console.error("Error finding main attack:", e);
  }
}

preloadInitial(1);

upArrow.addEventListener("click", () => {
  statsDiv.scrollTop -= scrollStep;
});

downArrow.addEventListener("click", () => {
  statsDiv.scrollTop += scrollStep;
});
