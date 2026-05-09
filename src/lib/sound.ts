let played = false;

export function playPop() {
  if (played) return;
  played = true;

  const el = document.createElement("audio");
  el.src = "/pop.mp3";
  el.volume = 0.25;
  el.preload = "auto";
  document.body.appendChild(el);

  el.play().catch(() => {});
  el.onended = () => el.remove();
}

export function initSound() {
  if (typeof window === "undefined") return;

  const trigger = () => {
    playPop();
    cleanup();
  };

  const cleanup = () => {
    window.removeEventListener("mousemove", trigger);
    window.removeEventListener("touchstart", trigger);
    window.removeEventListener("scroll", trigger);
    window.removeEventListener("click", trigger);
  };

  window.addEventListener("mousemove", trigger);
  window.addEventListener("touchstart", trigger);
  window.addEventListener("scroll", trigger);
  window.addEventListener("click", trigger);
}
