/* ============================================================
   Portfolio interactions: carousel, scroll reveal, footer year
   ============================================================ */

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Carousel (coverflow) ----
const slides = Array.from(document.querySelectorAll(".carousel__slide"));
const dotsWrap = document.querySelector(".carousel__dots");
const caption = document.querySelector(".carousel__caption");
const prevBtn = document.querySelector(".carousel__btn--prev");
const nextBtn = document.querySelector(".carousel__btn--next");
let active = 0;

slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", "Go to slide " + (i + 1));
  dot.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(dot);
});
const dots = Array.from(dotsWrap.children);

function layout() {
  slides.forEach((s, i) => {
    const off = i - active;
    const abs = Math.abs(off);
    s.style.transform =
      "translate(-50%, -50%) translateX(" + off * 74 + "%) scale(" +
      (abs === 0 ? 1 : 0.7) + ") rotateY(" + off * -20 + "deg)";
    s.style.zIndex = 20 - abs;
    s.style.opacity = abs > 2 ? "0" : String(1 - abs * 0.3);
    s.style.pointerEvents = abs <= 1 ? "auto" : "none";
  });
  caption.textContent = slides[active].dataset.caption || "";
  dots.forEach((d, i) => d.classList.toggle("active", i === active));
}

function goTo(i) {
  active = (i + slides.length) % slides.length;
  layout();
}

prevBtn.addEventListener("click", () => goTo(active - 1));
nextBtn.addEventListener("click", () => goTo(active + 1));
slides.forEach((s, i) => s.addEventListener("click", () => goTo(i)));
layout();

// ---- Scroll reveal ----
const revealTargets = document.querySelectorAll(
  ".section__title, .section__kicker, .terminal, .about__bio, .card, .link-card, .carousel"
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
