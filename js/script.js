/* ============================================================
   Portfolio interactions: carousel, scroll reveal, footer year
   ============================================================ */

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();

// ---- Carousel ----
const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const dotsWrap = document.querySelector(".carousel__dots");
const prevBtn = document.querySelector(".carousel__btn--prev");
const nextBtn = document.querySelector(".carousel__btn--next");

// Build one dot per slide
slides.forEach((_, i) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", "Go to photo " + (i + 1));
  dot.addEventListener("click", () => scrollToSlide(i));
  dotsWrap.appendChild(dot);
});
const dots = Array.from(dotsWrap.children);

function scrollToSlide(i) {
  const target = slides[Math.max(0, Math.min(i, slides.length - 1))];
  track.scrollTo({ left: target.offsetLeft - track.offsetLeft, behavior: "smooth" });
}

function currentIndex() {
  const slideWidth = slides[0].offsetWidth + 16; // width + gap
  return Math.round(track.scrollLeft / slideWidth);
}

prevBtn.addEventListener("click", () => scrollToSlide(currentIndex() - 1));
nextBtn.addEventListener("click", () => scrollToSlide(currentIndex() + 1));

track.addEventListener("scroll", () => {
  const i = currentIndex();
  dots.forEach((d, j) => d.classList.toggle("active", j === i));
});
dots[0].classList.add("active");

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
    340,
    Math.floor((starCanvas.width * starCanvas.height) / (1400 * dpr))
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
