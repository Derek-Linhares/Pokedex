if ("speechSynthesis" in window) {
  window.speechSynthesis.cancel();
}
let caindo = document.getElementById("caindo");
let tela = document.getElementById("tela");
let telaOff = document.getElementById("telaOff");
let theme = document.getElementById("theme");
let pokedex = document.getElementById("pokedex");
let canOn = true;
let canClick = false;
let visor = document.getElementById("visor");
let select = document.getElementById("select");
let stats = document.getElementById("stats");
let nextAudio = document.getElementById("nextAudio");
let canPlaySound = false;
let canPlayMusic = false;
let canTalk = false;
let canConfig = false;
let toggleSound = document.getElementById("toggleSound");
let toggleMusic = document.getElementById("toggleMusic");
let toggleTalk = document.getElementById("toggleTalk");
let startScreen = document.getElementById("start");
let typeAudio = document.getElementById("typeAudio");
let selectAudio = document.getElementById("selectAudio");
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
preloadBackgrounds();
    setTimeout(() => {
      startScreen.style.display = "none";
      window.skipSpeakOnce = true;
      handleSearchInput("1");
      visor.classList.add("visible");
      tela.classList.remove("on");
      void tela.offsetWidth;
      tela.style.backgroundPosition = "center";
      tela.classList.add("on");
      telaOff.style.visibility = "hidden";
      canPlayMusic = true;
      canPlaySound = true;
      canTalk = true;
      canChange = true
      document.querySelector('.mask').style.display = "block"
      toggleMusic.style.backgroundColor = "green";
      toggleSound.style.backgroundColor = "red";
      toggleTalk.style.backgroundColor = "yellow";
      playSound(theme);
      canOn = false;

      setTimeout(() => {
        canClick = true;
      }, 5000);
    }, 50);
  }
});

function turnOn() {
  if (canOn) {
    localStorage.setItem("autoTurnOn", "true");
    location.reload();
    preloadBackgrounds();
  }
}

function turnOff() {
  tela.classList.remove("on");
  tela.style.backgroundPosition = "left";
  visor.classList.remove("visible");
  telaOff.style.visibility = "visible";
  canClick = false;
  canPlayMusic = false;
  canPlaySound = false;
  canTalk = false;
  canOn = true;
  canChange = false
  document.querySelector('.mask').style.display = "none"
  stopAllSounds();
  stopSpeakingLightEffect();
  digitalKeyboard.style.visibility = "hidden";

  toggleMusic.style.backgroundColor = "black";
  toggleSound.style.backgroundColor = "black";
  toggleTalk.style.backgroundColor = "black";

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

function startPokedex() {
  startScreen.style.display = "none";
  pokedex.classList.add("pokedex-animation");
  caindo.play();
}

function stopAllSounds() {
  const audios = document.querySelectorAll("audio");
  audios.forEach((audio) => {
    audio.pause();
    audio.currentTime = 0;
  });
}

function playAudio(audio) {
  if (canPlaySound) {
    audio.currentTime = 0;
    audio.play();
  }
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

  if (!isSpeaking) {
    updateLightForAudio();
  }
}

let speakingLightInterval = null;
let isSpeaking = false;
let animationFrameId = null;

function updateLightForAudio() {
  if (isSpeaking) return;

  analyser.getByteFrequencyData(dataArray);

  const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

  const intensity = Math.min(average / 100, 1);

  const lightBlue = [75, 100, 255];
  const darkBlue = [0, 0, 0];

  const r = Math.floor(lerp(darkBlue[0], lightBlue[0], intensity));
  const g = Math.floor(lerp(darkBlue[1], lightBlue[1], intensity));
  const b = Math.floor(lerp(darkBlue[2], lightBlue[2], intensity));

  const light = document.getElementById("pokedex-light");
  light.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  animationFrameId = requestAnimationFrame(updateLightForAudio);
}

function startSpeakingLightEffect() {
  isSpeaking = true;
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  speakingLightInterval = setInterval(() => {
    const intensity = 0.4 + Math.random() * 0.6;
    const lightBlue = [75, 100, 255];
    const darkBlue = [0, 0, 0];
    const r = Math.floor(lerp(darkBlue[0], lightBlue[0], intensity));
    const g = Math.floor(lerp(darkBlue[1], lightBlue[1], intensity));
    const b = Math.floor(lerp(darkBlue[2], lightBlue[2], intensity));
    const light = document.getElementById("pokedex-light");
    light.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }, 100);
}

function stopSpeakingLightEffect() {
  isSpeaking = false;
  clearInterval(speakingLightInterval);
  speakingLightInterval = null;
  updateLightForAudio();
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function speak(text) {
  if (!canTalk) return;

  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.onstart = () => {
      startSpeakingLightEffect();
    };
    utterance.onend = () => {
      stopSpeakingLightEffect();
    };

    window.speechSynthesis.speak(utterance);
  }
}

select.addEventListener("click", () => {
  if (canPlaySound) {
    playAudio(selectAudio);
  }
  if (canClick && !canOn) {
    const currentVisibility = getComputedStyle(stats).visibility;
    stats.style.visibility =
      currentVisibility === "hidden" ? "visible" : "hidden";
  }
});






const options = document.querySelectorAll('#config-menu .option');
let currentConfig = 0;

const settings = {
  crt: true,
  sound: true,
  music: true,
  voice: true
};

function updateMenu() {
  if(canConfig){
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', i === currentConfig);
    const settingKey = opt.dataset.setting;
    opt.querySelector('span').textContent = settings[settingKey] ? 'ON' : 'OFF';
  });
}}

function toggleCurrentSetting() {
    if(canConfig){
  const settingKey = options[currentConfig].dataset.setting;
  settings[settingKey] = !settings[settingKey];
  updateMenu();

  if (settingKey === 'crt') {
    document.querySelector('.mask').style.display = settings.crt ? 'block' : 'none';
  }
  else if (settingKey === 'sound') {
    canPlaySound = !canPlaySound;
  }
  else if (settingKey === 'music') {
     if (canClick) {
    canPlayMusic = !canPlayMusic;
   

    if (canPlayMusic) {
      theme.loop = true;
      theme.play();
      updateLightForAudio();
    } else {
      theme.pause();
      theme.currentTime = 0;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      const light = document.getElementById("pokedex-light");
      light.style.backgroundColor = "black";
    }
  }
  }
  else if (settingKey === 'voice') {
    {
    canTalk = !canTalk;
  

    if (!canTalk && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();

      stopSpeakingLightEffect();
    }
  }
  }
}}


downArrow.addEventListener('click', () => {
  currentConfig = (currentConfig + 1) % options.length;
  updateMenu();
});

upArrow.addEventListener('click', () => {
  currentConfig = (currentConfig - 1 + options.length) % options.length;
  updateMenu();
});

leftArrow.addEventListener('click', toggleCurrentSetting);
rightArrow.addEventListener('click', toggleCurrentSetting);

updateMenu();