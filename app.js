// ============================================================
// CURSOR GLOW
// ============================================================
const glow = document.createElement('div');
glow.classList.add('cursor-glow');
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// ============================================================
// NAV TOGGLE (mobile)
// ============================================================
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ============================================================
// MARK ACTIVE NAV LINK
// ============================================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// ============================================================
// TYPEWRITER (hero only)
// ============================================================
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
  const phrases = [
    ' that actually work.',
    ' from the ground up.',
    ' to understand them.',
    ' worth breaking.',
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  function type() {
    if (paused) return;
    const phrase = phrases[phraseIdx];

    if (!deleting) {
      typewriterEl.textContent = phrase.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === phrase.length) {
        deleting = true;
        paused = true;
        setTimeout(() => { paused = false; tick(); }, 2200);
        return;
      }
    } else {
      typewriterEl.textContent = phrase.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        paused = true;
        setTimeout(() => { paused = false; tick(); }, 400);
        return;
      }
    }
    tick();
  }

  function tick() {
    const speed = deleting ? 40 : 70;
    setTimeout(type, speed);
  }

  tick();
}

// ============================================================
// FADE IN ON SCROLL
// ============================================================
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => observer.observe(el));

// ============================================================
// STAGGER CARDS
// ============================================================
document.querySelectorAll('.project-card, .contact-item').forEach((el, i) => {
  el.style.transitionDelay = `${i * 60}ms`;
  el.classList.add('fade-in');
  setTimeout(() => observer.observe(el), 10);
});
