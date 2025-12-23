const audio = document.getElementById("bg-audio");
const toggle = document.getElementById("sound-toggle");

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
