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
