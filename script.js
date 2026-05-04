/* ===== NAVIGATION ===== */
const navToggle = document.getElementById('nav-toggle');
const navMenu   = document.getElementById('nav-menu');
const header    = document.getElementById('header');
const navLinks  = document.querySelectorAll('.nav__link');

function closeMenu() {
  navMenu.classList.remove('open');
  const icon = navToggle.querySelector('i');
  icon.classList.add('fa-bars');
  icon.classList.remove('fa-xmark');
  document.body.style.overflow = '';
}

function openMenu() {
  navMenu.classList.add('open');
  const icon = navToggle.querySelector('i');
  icon.classList.remove('fa-bars');
  icon.classList.add('fa-xmark');
  document.body.style.overflow = 'hidden';
}

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

navLinks.forEach(link => link.addEventListener('click', () => closeMenu()));

document.addEventListener('click', (e) => {
  if (
    navMenu.classList.contains('open') &&
    !navMenu.contains(e.target) &&
    !navToggle.contains(e.target)
  ) closeMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) closeMenu();
});

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
  highlightNavLink();
}, { passive: true });

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav__link[href="#${id}"]`);
    if (link && scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active-link'));
      link.classList.add('active-link');
    }
  });
}

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const elements = document.querySelectorAll(
    '.about__card, .stat-card, .skill-card, .project-card, .contact-card, .section-tag, .section-title'
  );
  elements.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* ===== SKILL HOVER GLOW (desktop only) ===== */
function initSkillHover() {
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }
}

/* ===== SMOOTH ANCHOR SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ===== INIT ===== */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initSkillHover();
  highlightNavLink();
});
