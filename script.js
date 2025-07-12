let tela = document.getElementById("tela")
let telaOff = document.getElementById("telaOff")
let theme = document.getElementById("theme")

let canOn = true;
let canClick = false;
let visor = document.getElementById("visor");
let select = document.getElementById("select");
let stats = document.getElementById("stats");
let nextAudio = document.getElementById("nextAudio");
let canPlaySound = false;

let typeAudio = document.getElementById("typeAudio")
let selectAudio = document.getElementById("selectAudio")
theme.volume = 0.03;
selectAudio.volume = 0.15;
nextAudio.volume = 0.2;
typeAudio.volume = 0.5;

const audioContext = new AudioContext();
let analyser = audioContext.createAnalyser();
analyser.fftSize = 256; 
let source = null;
let dataArray = new Uint8Array(analyser.frequencyBinCount);



window.addEventListener("load", () => {
  if (localStorage.getItem("autoTurnOn") === "true") {
    localStorage.removeItem("autoTurnOn");

    setTimeout(() => {
      handleSearchInput("1");
      displayPokemon("1");
      visor.classList.add("visible");
      tela.classList.remove("on");
      void tela.offsetWidth;
      tela.style.backgroundPosition = "center";
      tela.classList.add("on");
      telaOff.style.visibility = "hidden";
      playSound(theme);
      canOn = false;
     

     
      setTimeout(() => {
        canClick = true;
        console.log("pode Clicar");
      }, 5000);
       canPlaySound = true
      console.log("ligou via autoTurnOn");
    }, 50);
  }
});




function turnOn() {
  if (canOn) {
    localStorage.setItem("autoTurnOn", "true");
    location.reload(); 
  }
}


function turnOff() {
  tela.classList.remove("on");
  tela.style.backgroundPosition = "left";
  visor.classList.remove("visible");
  telaOff.style.visibility = "visible";
  console.log("desligou")
  canOn = true;
  stopAllSounds()
   digitalKeyboard.style.visibility = "hidden";
   canPlaySound = false;
}

function stopAllSounds() {
  const audios = document.querySelectorAll('audio');
  audios.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;  
  });
}

function playAudio(audio){
  if(canPlaySound){
  audio.currentTime = 0;
  audio.play()}
}

async function playSound(audio) {
  if (audioContext.state === "suspended") {
    await audioContext.resume();
  }


  if (!source || source.mediaElement !== audio) {
    source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
  }

  audio.currentTime = 0;

  try {
    await audio.play();
  } catch (err) {
    console.error("Erro ao tocar o áudio:", err);
  }

  visualizeLight();
}


function visualizeLight() {
  const light = document.getElementById("pokedex-light");

  function update() {
    analyser.getByteFrequencyData(dataArray);

   
    const average = dataArray.reduce((a, b) => a + b, 1) / dataArray.length;

   
    const intensity = Math.min(average / 100, 1); // 0 a 1

    
   const lightBlue = [75, 100, 255];
const darkBlue = [0, 0, 0];      

    const r = Math.floor(lerp(darkBlue[0], lightBlue[0], intensity));
    const g = Math.floor(lerp(darkBlue[1], lightBlue[1], intensity));
    const b = Math.floor(lerp(darkBlue[2], lightBlue[2], intensity));

    light.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    requestAnimationFrame(update);
  }

  update();
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

select.addEventListener("click", () => {
  if(canPlaySound){playAudio(selectAudio);}
  if (canClick && !canOn) {
    stats.style.visibility = 
      stats.style.visibility === "hidden" ? "visible" : "hidden";
        
  }
});