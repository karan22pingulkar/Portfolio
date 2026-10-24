/* ============================================================
   Portfolio interactions: carousel, scroll reveal, footer year
   ============================================================ */

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Custom cursor (dot + trailing ring) ----
(function () {
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (!dot || !ring || matchMedia("(pointer: coarse)").matches) return;

  document.body.classList.add("cursor-hidden");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

  addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + "px";
    dot.style.top = my + "px";
  });

  (function follow() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
    requestAnimationFrame(follow);
  })();

  document.querySelectorAll("a, button, [data-copy]").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
  });

  document.addEventListener("mouseleave", () => {
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    dot.style.opacity = "1";
    ring.style.opacity = "";
  });
})();

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
  stars = Array.from({ length: count }, () => {
    const r = (Math.random() * 0.7 + 0.25) * dpr;
    return {
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r,
      a: Math.random() * 0.45 + 0.2,
      speed: Math.random() * 0.015 + 0.004,
      phase: Math.random() * Math.PI * 2,
      vx: (Math.random() * 0.02 + 0.01) * r,
      vy: (Math.random() * 0.05 + 0.02) * r,
      tint: "235,240,250",
    };
  });
}

function drawStars(t) {
  sctx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  for (const s of stars) {
    const tw = reduceMotion ? 1 : 0.7 + 0.3 * Math.sin(s.phase + t * s.speed);
    sctx.beginPath();
    sctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sctx.fillStyle = "rgba(" + s.tint + "," + (s.a * tw).toFixed(3) + ")";
    sctx.fill();
  }
}

function animateStars(t) {
  const w = starCanvas.width, h = starCanvas.height;
  for (const s of stars) {
    s.x += s.vx;
    s.y += s.vy;
    if (s.y - s.r > h) { s.y = -s.r; s.x = Math.random() * w; }
    if (s.x - s.r > w) { s.x = -s.r; s.y = Math.random() * h; }
  }
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
