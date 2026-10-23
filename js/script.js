/* ============================================================
   Portfolio interactions: carousel, scroll reveal, footer year
   ============================================================ */

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Click-to-copy (email card) ----
document.querySelectorAll("[data-copy]").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(el.dataset.copy);
    const cta = el.querySelector(".copy-cta");
    const original = cta.innerHTML;
    cta.textContent = "copied to clipboard \u2713";
    cta.style.color = "#3ddc78";
    setTimeout(() => {
      cta.innerHTML = original;
      cta.style.color = "";
    }, 1600);
  });
});

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll(
  ".section__title, .section__kicker, .terminal, .about__bio, .card, .link-card, .exp-card"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => observer.observe(el));

// ---- Starfield background ----
const starCanvas = document.getElementById("stars");
const sctx = starCanvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let stars = [];

function buildStars() {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  starCanvas.width = starCanvas.offsetWidth * dpr;
  starCanvas.height = starCanvas.offsetHeight * dpr;
  const count = Math.min(
    450,
    Math.floor((starCanvas.width * starCanvas.height) / (1000 * dpr))
  );
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    r: (Math.random() * 1.1 + 0.3) * dpr,
    a: Math.random() * 0.6 + 0.3,
    speed: Math.random() * 0.015 + 0.004,
    phase: Math.random() * Math.PI * 2,
    tint:
      Math.random() < 0.12
        ? Math.random() < 0.5
          ? "94,234,212"
          : "251,191,36"
        : "220,230,245",
  }));
}

function drawStars(t) {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  for (const s of stars) {
    const tw = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(s.phase + t * s.speed);
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fillStyle = "rgba(" + s.tint + "," + (s.a * tw).toFixed(3) + ")";
    sctx.fill();
  }
}

function animateStars(t) {
  drawStars(t);
  requestAnimationFrame(animateStars);
}

buildStars();
drawStars(0);
if (!reduceMotion) requestAnimationFrame(animateStars);
addEventListener("resize", () => {
  buildStars();
  drawStars(0);
});
