// Navigation on click or swipe
let currentPage = 1;
const totalPages = 4;

document.body.addEventListener('click', nextPage);
document.body.addEventListener('touchstart', handleTouchStart, false);

let xStart = null;

function handleTouchStart(evt) {
  xStart = evt.touches[0].clientX;
}
function handleTouchEnd(evt) {
  if (!xStart) return;
  let xEnd = evt.changedTouches[0].clientX;
  if (Math.abs(xEnd - xStart) > 50) {
    if (xEnd < xStart) {
      nextPage();
    }
  }
  xStart = null;
}
document.body.addEventListener('touchend', handleTouchEnd);

// Function to go to next page
function nextPage() {
  document.querySelector('.page' + currentPage).classList.remove('active');
  currentPage++;
  if (currentPage > totalPages) currentPage = 1; // cycle
  document.querySelector('.page' + currentPage).classList.add('active');

  if (currentPage === 2) initScratch(); // initialize scratch card
  if (currentPage === 3) animateDance();
  if (currentPage === 4) loadImages();
}

// Initialize scratch-off
function initScratch() {
  const canvas = document.querySelector('#scratchCard canvas');
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;

  ctx.fillStyle = '#999';
  ctx.fillRect(0, 0, width, height);

  // Scratch effect
  let isDrawing = false;
  canvas.addEventListener('mousedown', () => isDrawing = true);
  canvas.addEventListener('mouseup', () => isDrawing = false);
  canvas.addEventListener('mousemove', scratch);
  // for touch devices
  canvas.addEventListener('touchstart', () => isDrawing = true);
  canvas.addEventListener('touchend', () => isDrawing = false);
  canvas.addEventListener('touchmove', scratch);

  function scratch(e) {
    if (!isDrawing) return;
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Animate dancing figure
function animateDance() {
  const danceDiv = document.querySelector('.danceAnimation');
  danceDiv.style.backgroundColor = '#ff6699';
  // Optional: add more animations or GIFs
}

// Load images into gallery
function loadImages() {
  const gallery = document.querySelector('.gallery');
  const filenames = [
    "IMG-20251002-WA0003.jpg",
    "IMG-20251002-WA0004.jpg",
    ... // add rest of your filenames
    "IMG-20251002-WA0023.jpg"
  ];
  filenames.forEach(file => {
    const img = document.createElement('img');
    img.src = 'uploads/' + file;
    gallery.appendChild(img);
  });
}
