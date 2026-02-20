// ─── SLIDESHOW ────────────────────────────────────────────────────────────────

const slidesTrack = document.getElementById('slides');
const dotsContainer = document.getElementById('dots');
const allSlides = document.querySelectorAll('.slide');
const total = allSlides.length;
let current = 0;
let autoTimer;

// Build navigation dots dynamically based on slide count
allSlides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsContainer.appendChild(dot);
});

function goTo(n) {
  current = (n + total) % total;
  slidesTrack.style.transform = `translateX(-${current * 100}%)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function startAutoPlay() {
  autoTimer = setInterval(() => goTo(current + 1), 5000);
}

function stopAutoPlay() {
  clearInterval(autoTimer);
}

document.getElementById('prev').addEventListener('click', () => {
  stopAutoPlay();
  goTo(current - 1);
  startAutoPlay();
});

document.getElementById('next').addEventListener('click', () => {
  stopAutoPlay();
  goTo(current + 1);
  startAutoPlay();
});

// Pause auto-play when user hovers over slideshow
document.querySelector('.slideshow-wrapper').addEventListener('mouseenter', stopAutoPlay);
document.querySelector('.slideshow-wrapper').addEventListener('mouseleave', startAutoPlay);

startAutoPlay();