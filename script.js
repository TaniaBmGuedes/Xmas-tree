const audio = document.getElementById("bg-audio");
const toggle = document.getElementById("sound-toggle");
const snowCanvas = document.getElementById("snow");

if (audio && toggle) {
  audio.preload = "auto";
  audio.loop = true;

  const setState = (isPlaying) => {
    toggle.textContent = isPlaying ? "Pause music" : "Play music";
    toggle.setAttribute("aria-pressed", isPlaying ? "true" : "false");
  };

  const tryPlay = async () => {
    try {
      await audio.play();
      setState(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  };

  toggle.addEventListener("click", async () => {
    if (audio.paused) {
      await tryPlay();
    } else {
      audio.pause();
      setState(false);
    }
  });

  window.addEventListener(
    "pointerdown",
    () => {
      if (audio.paused) {
        tryPlay();
      }
    },
    { once: true }
  );

  audio.addEventListener("play", () => setState(true));
  audio.addEventListener("pause", () => setState(false));
}

if (snowCanvas) {
  const ctx = snowCanvas.getContext("2d");
  const flakes = [];
  const maxFlakes = 120;

  const resize = () => {
    snowCanvas.width = window.innerWidth;
    snowCanvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize);
  resize();

  for (let i = 0; i < maxFlakes; i++) {
    flakes.push({
      x: Math.random() * snowCanvas.width,
      y: Math.random() * snowCanvas.height,
      r: Math.random() * 1.8 + 0.6,
      speedY: Math.random() * 1.2 + 0.35,
      drift: Math.random() * 0.6 - 0.25,
    });
  }

  const tick = () => {
    ctx.clearRect(0, 0, snowCanvas.width, snowCanvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    flakes.forEach((f) => {
      f.y += f.speedY;
      f.x += f.drift;
      if (f.y > snowCanvas.height) f.y = -5;
      if (f.x > snowCanvas.width) f.x = 0;
      if (f.x < 0) f.x = snowCanvas.width;
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    });
    ctx.fill();
    requestAnimationFrame(tick);
  };
  tick();
}
