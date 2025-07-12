const output = document.getElementById("output");
const keyboard = document.getElementById("keyboard");
const digitalKeyboard = document.getElementById("digitalKeyboard");
const search =  document.getElementById("search");

const keys = [
  ..."1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "←", "OK", "ESP" 
];

keys.forEach(k => {
  const btn = document.createElement("div");
  btn.textContent = k;
  btn.classList.add("key");

  // Atribui classes e IDs para teclas especiais
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
      if(canPlaySound){playAudio(typeAudio);}
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


function buscarPokemon(nome) {
  digitalKeyboard.style.visibility = "hidden"  
  console.log("buscando: " + nome)
  handleSearchInput(nome)  
  displayPokemon(nome)
}


search.addEventListener("click", () => {

  if(canPlaySound){playAudio(selectAudio);}
  if (!canOn && canClick) {
    if (digitalKeyboard.style.visibility === 'visible') {
      digitalKeyboard.style.visibility = 'hidden';
    } else {
      digitalKeyboard.style.visibility = 'visible';
    }
  }
});

function handleSearchInput(input) {
  let query = input.trim().toLowerCase();

  if (!query) return;

  if (!isNaN(query)) {
    // É um ID numérico
  preloadInitial(Number(query));
  } else {
    
    fetchPokemon(query)
     .then(poke => preloadInitial(poke.id))
      .catch(err => alert("Pokémon não encontrado"));
  }
}

