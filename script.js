const audio = document.getElementById("bg-audio");
const toggle = document.getElementById("sound-toggle");
const snowCanvas = document.getElementById("snow");
const aurora = document.getElementById("aurora");
const auroraToggle = document.getElementById("aurora-toggle");
const greetingEl = document.querySelector(".greeting");
const greetingPicker = document.getElementById("greeting-picker");
const stars = Array.from(document.querySelectorAll(".✴️"));

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

if (aurora && auroraToggle) {
  let isAuroraOn = true;

  const setAurora = (next) => {
    aurora.classList.toggle("is-on", next);
    auroraToggle.textContent = next ? "Aurora on" : "Aurora off";
    auroraToggle.setAttribute("aria-pressed", next ? "true" : "false");
    document.body.classList.toggle("aurora-on", next);
  };

  setAurora(isAuroraOn);

  auroraToggle.addEventListener("click", () => {
    isAuroraOn = !isAuroraOn;
    setAurora(isAuroraOn);
  });
}

const renderGreeting = (text) => {
  if (!greetingEl) return;
  greetingEl.innerHTML = "";
  greetingEl.setAttribute("aria-label", text);

  let letterIndex = 0;
  text.split("").forEach((ch) => {
    if (ch === " ") {
      const gap = document.createElement("span");
      gap.className = "gap";
      greetingEl.appendChild(gap);
      return;
    }
    const span = document.createElement("span");
    span.textContent = ch;
    span.style.setProperty("--i", letterIndex);
    greetingEl.appendChild(span);
    letterIndex += 1;
  });
};

if (greetingEl) {
  const savedChoice = localStorage.getItem("greeting-choice");
  const initialChoice =
    (savedChoice && savedChoice.length > 0) || savedChoice === ""
      ? savedChoice
      : greetingPicker?.value || greetingEl.textContent.trim();

  if (greetingPicker && savedChoice) {
    greetingPicker.value = savedChoice;
  }

  renderGreeting(initialChoice || "Merry Christmas!");

  if (greetingPicker) {
    greetingPicker.addEventListener("change", (event) => {
      const value = event.target.value;
      renderGreeting(value);
      localStorage.setItem("greeting-choice", value);
    });
  }
}

if (stars.length) {
  const twinkleBatch = Math.min(12, Math.max(6, Math.floor(stars.length * 0.12)));
  let activeTwinkles = [];

  const applyTwinkle = () => {
    activeTwinkles.forEach((el) => el.classList.remove("star-twinkle"));
    const shuffled = [...stars].sort(() => Math.random() - 0.5);
    activeTwinkles = shuffled.slice(0, twinkleBatch);
    activeTwinkles.forEach((el, idx) => {
      el.style.setProperty("--twinkle-delay", `${idx * 0.07}s`);
      el.classList.add("star-twinkle");
    });
  };

  applyTwinkle();
  setInterval(applyTwinkle, 2100);
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
