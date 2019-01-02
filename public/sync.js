const audio = document.getElementById("main-audio");
const songSelector$ = document.getElementById("song-selector");
const time$ = document.getElementById("time");
const correction$ = document.getElementById("correction");
const slider = document.getElementById("myRange");

let offset = 0;
// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  offset = slider.value / 10;
  correction$.innerHTML = offset;
};

setInterval(() => {
  syncTime(audio.currentTime + offset);
  correction$.innerHTML = offset;
  localStorage.setItem("ts", audio.currentTime);
}, 500);

setInterval(() => {
  time$.innerHTML = Math.round(audio.currentTime * 100) / 100;
}, 100);

function syncTime(currentTime) {
  fetch(`/sync?ts=${Date.now()}&d=${currentTime}`);
}

let isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
}
audio.onplaying = function() {
  isPlaying = true;
};
audio.onpause = function() {
  isPlaying = false;
};

document.addEventListener(
  "keydown",
  e => {
    switch (e.keyCode) {
      case 37:
        {
          audio.currentTime -= 1;
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 39:
        {
          audio.currentTime += 1;
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 38:
        {
          audio.currentTime += 10;
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 40:
        {
          audio.currentTime -= 10;
          e.preventDefault();
          e.stopPropagation();
        }
        break;
      case 32:
        {
          togglePlay();
          e.preventDefault();
          e.stopPropagation();
        }
        break;
    }
  },
  true
);

songSelector$.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", handleSongClick);
});

function handleSongClick(e) {
  setSong(e.target.dataset.src, e.target.dataset.timeline, 0);
}

function setSong(src, timeline, ts = 0) {
  localStorage.setItem("src", src);
  localStorage.setItem("timeline", timeline);
  fetch(`/loadfile?file=${timeline}`);
  audio.src = src;
  audio.currentTime = ts;
}

setSong(
  localStorage.getItem("src"),
  localStorage.getItem("timeline"),
  localStorage.getItem("ts")
);
