const initSound = new Audio("./assets/sound/classic.mp3");
const pathVideo = "./assets/movie/";
const pathSound = "./assets/sound/";
const idDisablePlaySoundBtn = "disablePlaySoundBtn";
const idPlaySoundBtn = "playSoundBtn";
const windowClass = ".window";
const video_backClass = ".video_back";
let isPlaySound = false;
let currentTitleId = "firstTitle";

const currentSound = {
  suround: null,
  music: initSound,
};

document.addEventListener("DOMContentLoaded", () => {
  showWindow();
  playSound();
  showTitle(currentTitleId);
});

window.addEventListener("blur", () => {
  if (isPlaySound) {
    stopSound();
  }
});

window.addEventListener("focus", () => {
  isBlur = false;
  if (isPlaySound) {
    playSound();
  }
});

function showWindow() {
  const playSoundBtn = document.getElementById(idPlaySoundBtn);
  const disablePlaySoundBtn = document.getElementById(idDisablePlaySoundBtn);

  const tl = gsap.timeline();
  tl.fromTo(
    windowClass,
    {
      opacity: 0,
      scale: 1.2,
      display: "flex",
    },
    {
      delay: 0,
      scale: 1,
      duration: 1,
      ease: "expo.out",
      opacity: 1,
      filter: "blur(0)",
    }
  );

  playSoundBtn.addEventListener("click", () => {
    hideWindow();
    isPlaySound = true;
    playSound();
  });

  disablePlaySoundBtn.addEventListener("click", () => {
    isPlaySound = false;
    stopSound();
    hideWindow();
  });

  function hideWindow() {
    tl.to(windowClass, {
      duration: 1,
      opacity: 0,
      userSelect: "none",
      onCompleteScope: this.target,
      onComplete: function () {
        tl.to(windowClass, { display: "none" });
      },
    });
  }
}

function playSound() {
  if (currentSound.suround) {
    currentSound.suround.loop = true;
    currentSound.suround.volume = 0.3;
    currentSound.suround.play();
  }
  if (currentSound.music) {
    currentSound.music.loop = true;
    currentSound.music.play();
  }
}

function stopSound() {
  if (currentSound.suround) {
    currentSound.suround.pause();
  }
  if (currentSound.music) {
    currentSound.music.pause();
  }
}

function selectTheme(video, music, suround) {
  const videoEl = document.querySelector(video_backClass);
  const videoPath = `${pathVideo}${video}`;
  const musicPath = `${pathSound}${music}`;
  videoEl.setAttribute("src", videoPath);
  stopSound();
  currentSound.music = new Audio(musicPath);
  if (suround) {
    const suroundPath = `${pathSound}${suround}`;
    currentSound.suround = new Audio(suroundPath);
  } else {
    currentSound.suround = null;
  }
  playSound();
}

function showTitle(titleId) {
  if (titleId !== currentTitleId) {
    gsap.fromTo(
      `#${currentTitleId}`,
      {
        y: 0,
        opacity: 1,
      },
      {
        duration: 1,
        opacity: 0,
        display: "none",
        y: 100,
      }
    );
  }

  gsap.fromTo(
    `#${titleId}`,
    {
      display: "flex",
      opacity: 0,
      y: 100,
    },
    {
      duration: 1,
      delay: 1,
      opacity: 1,
      y: 0,
    }
  );
  currentTitleId = titleId;
}
