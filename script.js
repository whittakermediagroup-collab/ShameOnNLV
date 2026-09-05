// ---------- Photo pop-ups ----------
// Drop your real photos in an /images folder and update the `src` values below.
// Keep 8-10 entries in the pool -- each page load randomly shows 5-6 of them.
const photoPool = [
  { src: 'images/photo-01.jpg', caption: 'Route crew, morning shift' },
  { src: 'images/photo-02.jpg', caption: 'Water division' },
  { src: 'images/photo-03.jpg', caption: 'Fleet yard' },
  { src: 'images/photo-04.jpg', caption: 'Sanitation route' },
  { src: 'images/photo-05.jpg', caption: 'Streets & roads crew' },
  { src: 'images/photo-06.jpg', caption: 'Parks & facilities' },
  { src: 'images/photo-07.jpg', caption: 'Night shift dispatch' },
  { src: 'images/photo-08.jpg', caption: 'Local 14 members, NLV' },
  { src: 'images/photo-09.jpg', caption: 'Equipment maintenance' },
  { src: 'images/photo-10.jpg', caption: 'On the job, every day' },
];

function shuffle(array){
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function renderPhotoBoard(){
  const board = document.getElementById('photoBoard');
  if (!board) return;

  const count = Math.random() < 0.5 ? 5 : 6; // 5 or 6 photos per load
  const chosen = shuffle(photoPool).slice(0, count);

  board.innerHTML = '';
  chosen.forEach((photo, i) => {
    const card = document.createElement('figure');
    card.className = 'photo-pop';
    card.style.setProperty('--delay', `${i * 0.1}s`);

    // Placeholder frame -- swap this div for <img src="${photo.src}" alt="${photo.caption}">
    // once real photos are ready.
    card.innerHTML = `
      <div class="photo-pop-frame">${photo.src}</div>
      <figcaption class="photo-pop-caption">${photo.caption}</figcaption>
    `;
    board.appendChild(card);
  });
}

renderPhotoBoard();

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
