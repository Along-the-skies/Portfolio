/* =========================================================
   VASUDEV — PORTFOLIO SCRIPT
   Table of contents:
   1. Data (skills / projects / timeline)
   2. DOM render helpers
   3. Navbar (scroll state, active link, hamburger)
   4. Smooth scroll
   5. Hero background (stars, spotlight)
   6. Typing effect
   7. Scroll progress bar
   8. Reveal-on-scroll (IntersectionObserver)
   9. Skill bar + counter animation
   10. Contact form
   11. Back to top
   12. Init
   ========================================================= */

(() => {
  'use strict';

  /* ---------- 1. DATA ---------- */
  const SKILLS = [
    { name: 'Scratch', short: '😺', percent: 99.99 },
    { name: 'Python', short: 'Py', percent: 90 },
    { name: 'Django', short: 'Dj', percent: 85 },
    { name: 'HTML', short: 'H', percent: 95 },
    { name: 'CSS', short: 'C', percent: 88 },
    { name: 'JavaScript', short: 'Js', percent: 78 },
    { name: 'Git', short: 'Git', percent: 82 },
    { name: 'SQL', short: 'SQL', percent: 75 },
    { name: 'Flask', short: 'Fl', percent: 70 },
    { name: 'Godot', short: 'Gd', percent: 65 },
  ];

const PROJECTS = [
  {
    title: "Toolify AI",
    tag: "AI",
    desc: "An all-in-one AI toolkit featuring multiple productivity tools in a clean, modern web interface. Designed to provide quick access to AI-powered utilities from a single platform.",
    tech: ["HTML", "CSS", "JavaScript", "Vercel"],
    github: "https://github.com/Along-the-skies/ToolifyAi-Deployment",
    demo: "https://toolify-ai-deployment.vercel.app/",
  },

  {
    title: "Viscord",
    tag: "VC",
    desc: "A Discord-inspired desktop chat application built with Python and MQTT, supporting chat rooms, messaging, and a modern desktop interface.",
    tech: ["Python", "MQTT", "SQLite", "Tkinter"],
    github: "https://github.com/Along-the-skies/VISCORD",
    demo: "#",
  },

  {
    title: "Blox Fruits Services",
    tag: "BF",
    desc: "A Django-powered platform for managing Blox Fruits services, allowing players to browse available services and submit requests through a modern web interface.",
    tech: ["Python", "Django", "HTML", "CSS"],
    github: "#",
    demo: "#",
  },

  {
    title: "CloudFile",
    tag: "CF",
    desc: "A cloud-based file sharing and storage project focused on making file uploads and downloads simple through an intuitive web interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/Along-the-skies/CloudFile",
    demo: "#",
  },

  {
    title: "AGVP Library Quiz",
    tag: "LQ",
    desc: "An interactive quiz platform developed for a school library program with question management, scoring, and a user-friendly interface.",
    tech: ["Python", "Flask", "HTML", "JavaScript"],
    github: "https://github.com/Along-the-skies/AGVP-Library-backend",
    demo: "#",
  },

  {
    title: "Word Chain Game",
    tag: "WC",
    desc: "A multiplayer word association game where each new word begins with the final letter of the previous word, featuring real-time gameplay.",
    tech: ["Python", "Tkinter", "MQTT"],
    github: "https://github.com/Along-the-skies/WordChainGame",
    demo: "#",
  },
];

  const TIMELINE = [
    { year: '2020', title: 'Started Programming - Scratch 😺' },
    { year: '2022', title: 'Started Python' },
    { year: '2026', title: 'Learned Flask' },
    { year: '2026', title: 'Learned Django' },
    { year: '2026', title: 'Built Viscord' },
    { year: '2026', title: 'Built Library Quiz' },
    { year: '2026', title: 'Built Blox Fruits Website' },
    { year: 'Now', title: 'Learning AI' },
  ];

  const ROLE_TEXT = 'Python • Django • Full Stack Developer';

  /* ---------- 2. DOM RENDER HELPERS ---------- */
  function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    const html = SKILLS.map((s, i) => `
      <div class="skill-card reveal-up" style="--delay:${i % 3}">
        <div class="skill-top">
          <span class="skill-icon">${s.short}</span>
          <span class="skill-name">${s.name}</span>
          <span class="skill-percent">${s.percent}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-percent="${s.percent}"></div>
        </div>
      </div>
    `).join('');
    grid.innerHTML = html;
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const html = PROJECTS.map((p, i) => `
      <article class="project-card reveal-up" style="--delay:${i % 3}">
        <div class="project-image"><span>${p.tag}</span></div>
        <div class="project-body">
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.desc}</p>
          <div class="tech-badges">
            ${p.tech.map(t => `<span class="badge">${t}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${p.github}" class="btn btn-ghost" target="_blank" rel="noopener">GitHub</a>
            <a href="${p.demo}" class="btn btn-primary" target="_blank" rel="noopener">Live Demo</a>
          </div>
        </div>
      </article>
    `).join('');
    grid.innerHTML = html;
  }

  function renderTimeline() {
    const track = document.getElementById('timelineTrack');
    const html = TIMELINE.map(t => `
      <div class="timeline-item">
        <span class="timeline-dot"></span>
        <div class="timeline-card">
          <span class="timeline-year">${t.year}</span>
          <h3 class="timeline-title">${t.title}</h3>
        </div>
      </div>
    `).join('');
    track.innerHTML = html;
  }

  /* ---------- 3. NAVBAR ---------- */
  function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('[data-nav-link]').forEach(el => {
      el.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Active link highlighting via IntersectionObserver
    const sections = ['home', 'about', 'skills', 'projects', 'timeline', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    const activate = (id) => {
      links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) activate(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(sec => sectionObserver.observe(sec));
  }

  /* ---------- 4. SMOOTH SCROLL ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('[data-nav-link]').forEach(el => {
      el.addEventListener('click', (e) => {
        const href = el.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const navHeight = document.getElementById('navbar').offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 1;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }

  /* ---------- 5. HERO BACKGROUND ---------- */
  function initStars() {
    const container = document.getElementById('stars');
    const count = window.innerWidth < 640 ? 45 : 90;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.width = star.style.height = `${Math.random() < 0.2 ? 3 : 2}px`;
      frag.appendChild(star);
    }
    container.appendChild(frag);
  }

  function initSpotlight() {
    const spotlight = document.getElementById('cursorSpotlight');
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = null;
    window.addEventListener('mousemove', (e) => {
      spotlight.classList.add('active');
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      });
    });

    window.addEventListener('mouseleave', () => spotlight.classList.remove('active'));
  }

  /* ---------- 6. TYPING EFFECT ---------- */
  function initTyping() {
    const el = document.getElementById('typedRole');
    if (!el || !window.matchMedia) {
      el.textContent = ROLE_TEXT;
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.textContent = ROLE_TEXT;
      return;
    }

    let i = 0;
    const type = () => {
      el.textContent = ROLE_TEXT.slice(0, i);
      i++;
      if (i <= ROLE_TEXT.length) {
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 500);
  }

  /* ---------- 7. SCROLL PROGRESS BAR ---------- */
  function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${percent}%`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  /* ---------- 8. REVEAL ON SCROLL ---------- */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal-up, .reveal-left, .timeline-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    targets.forEach(t => observer.observe(t));
  }

  /* ---------- 9. SKILL BARS + COUNTERS ---------- */
  function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          bar.style.width = `${bar.dataset.percent}%`;
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.4 });
    bars.forEach(b => observer.observe(b));
  }

  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animate = (el) => {
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1600;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach(c => observer.observe(c));
  }

  /* ---------- 10. CONTACT FORM ---------- */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    const label = document.getElementById('sendBtnLabel');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        status.textContent = 'Please fill in all fields correctly.';
        return;
      }

      label.textContent = 'Sending...';
      status.textContent = '';

      // Simulated send — replace with a real endpoint (e.g. a Django view) later.
      setTimeout(() => {
        label.textContent = 'Send Message';
        status.textContent = `Thanks! I'll get back to you soon.`;
        form.reset();
      }, 1100);
    });
  }

  /* ---------- 11. BACK TO TOP ---------- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- 12. INIT ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').textContent = new Date().getFullYear();

    renderSkills();
    renderProjects();
    renderTimeline();

    initNavbar();
    initSmoothScroll();
    initStars();
    initSpotlight();
    initTyping();
    initScrollProgress();
    initReveal();
    initSkillBars();
    initCounters();
    initContactForm();
    initBackToTop();
  });
})();