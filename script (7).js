// ---------- Bad times / good times toggle ----------
const toggleWidget = document.getElementById('toggleWidget');
const toggleButtons = document.querySelectorAll('.toggle-btn');

toggleButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    toggleWidget.dataset.mode = mode;
    toggleButtons.forEach(b => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', active ? 'true' : 'false');
    });
  });
});
// set initial state
toggleWidget.dataset.mode = 'bad';

// ---------- Animated stat counters (trigger once, on scroll into view) ----------
const statNumbers = document.querySelectorAll('.stat-number');

function formatValue(el, value){
  const suffix = el.dataset.suffix || '';
  const isDecimal = el.dataset.count.includes('.');
  const display = isDecimal ? value.toFixed(1) : Math.round(value);
  return `${display}${suffix}`;
}

function animateCount(el){
  const target = parseFloat(el.dataset.count);
  const duration = 900;
  const start = performance.now();

  function step(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatValue(el, target * eased);
    if (progress < 1){
      requestAnimationFrame(step);
    } else {
      el.textContent = formatValue(el, target);
    }
  }
  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ---------- Video placeholders ----------
// Swap this handler once real testimonial videos are ready —
// point it at a video file, YouTube embed, or lightbox of your choice.
document.querySelectorAll('[data-video-placeholder]').forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Video coming soon — swap this button for a real testimonial clip in script.js.');
  });
});
