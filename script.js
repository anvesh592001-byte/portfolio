const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
menuToggle?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = '';
}));

const revealTargets = document.querySelectorAll('.reveal, .section-meta, .section-title, .statement-copy, .about-layout, .timeline > div, .skills-grid > div, .services-list > div, .contact-layout > div, #contact-form');
revealTargets.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  entry.target.classList.toggle('visible', entry.isIntersecting);
}), { threshold: .14, rootMargin: '0px 0px -7% 0px' });
revealTargets.forEach(el => observer.observe(el));

const orbit = document.querySelector('.scroll-orbit');
const orbitArrow = document.querySelector('.orbit-arrow');
const progress = document.querySelector('.scroll-progress span');
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (y / max) * 100 : 0;
  progress.style.height = `${percent}%`;
  document.documentElement.style.setProperty('--scroll-y', y);
  document.body.dataset.scrollDir = y > lastScrollY ? 'down' : 'up';
  orbit.classList.toggle('active', y > 180);
  orbitArrow.textContent = y > 180 && document.body.dataset.scrollDir === 'up' ? '↑' : '↓';
  lastScrollY = y;
}, { passive: true });
orbit?.addEventListener('click', () => { if (window.scrollY > 180) window.scrollTo({ top: 0, behavior: 'smooth' }); else document.querySelector('#intro')?.scrollIntoView({ behavior: 'smooth' }); });

const projectData = {
  heattroute: { number:'01', category:'AI × CLIMATE × WEB', year:'2026', status:'PROJECT / HACKATHON', title:'HEATROUTE', problem:'Walking directions usually optimize for distance. They rarely account for the heat a person will actually experience.', concept:'Find the safer route, not just the shortest.', solution:'An AI-assisted walking route analysis platform that reads route conditions and makes heat exposure easier to understand before a walk.', technology:'Next.js · TypeScript · Mapbox · Supabase · Gemini · Open-Meteo', learned:'Designing around a real-world constraint means making complex environmental data feel clear, useful and immediate.' },
  xfarm: { number:'02', category:'AI × AGRICULTURE', year:'2026', status:'EXPERIMENT', title:'X-FARM AI', problem:'Agricultural and environmental data can be difficult to interpret when it is spread across different tools and sources.', concept:'Make field information easier to understand.', solution:'An experimental platform exploring how AI can turn crop, soil and weather inputs into more approachable guidance.', technology:'Gemini · Firebase · Open-Meteo · Leaflet · Soil data', learned:'Good product ideas start with translation: helping people move from raw information to a decision.' },
  titan: { number:'03', category:'AI × LOCAL COMPUTING', year:'2026', status:'EXPERIMENT', title:'TITAN AI', problem:'A personal assistant should feel useful in the flow of work, not like another tab to manage.', concept:'A local-first assistant for computer interaction.', solution:'An experimental personal AI assistant concept exploring automation, computer vision and local models.', technology:'Python · AI Models · Automation · Computer Vision', learned:'The most interesting part of an assistant is not the chat interface. It is the small actions it can take.' },
  future: { number:'04', category:'AI × CODE × EXPERIMENTATION', year:'NEXT', status:'OPEN SLOT', title:'PERSONAL EXPERIMENTS', problem:'There is always another idea worth testing.', concept:'A flexible space for future work.', solution:'This section is intentionally open. New experiments will land here as they become real.', technology:'Whatever comes next.', learned:'Build, break, learn, repeat.' }
};
const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
function openProject(key) { const p = projectData[key]; if (!p) return; dialogContent.innerHTML = `<div class="dialog-inner"><div class="mono">${p.number} / ${p.category}</div><h2>${p.title}</h2><div class="dialog-detail"><dt>YEAR / STATUS</dt><dd>${p.year} · ${p.status}</dd></div><div class="dialog-detail"><dt>PROBLEM</dt><dd>${p.problem}</dd></div><div class="dialog-detail"><dt>CONCEPT</dt><dd>${p.concept}</dd></div><div class="dialog-detail"><dt>SOLUTION</dt><dd>${p.solution}</dd></div><div class="dialog-detail"><dt>TECHNOLOGY</dt><dd>${p.technology}</dd></div><div class="dialog-detail"><dt>WHAT I LEARNED</dt><dd>${p.learned}</dd></div></div>`; dialog.showModal(); }
document.querySelectorAll('.project').forEach(project => { project.addEventListener('click', () => openProject(project.dataset.project)); project.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openProject(project.dataset.project); } }); });
document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

const form = document.querySelector('#contact-form');
const status = document.querySelector('.form-status');
form?.addEventListener('submit', e => { e.preventDefault(); if (!form.checkValidity()) { form.reportValidity(); status.textContent = 'Please complete the required fields.'; return; } status.textContent = 'Thanks — the form is ready to connect once an email endpoint is added.'; status.style.color = 'var(--red)'; });
document.querySelector('#copyright').textContent = `© ${new Date().getFullYear()} ANVESH`;
document.querySelector('.about-portrait img')?.setAttribute('src', 'assets/anvesh-new.png');
const contactLinks = document.querySelector('.contact-links');
if (contactLinks && !contactLinks.querySelector('a[href^="mailto:"]')) {
  const emailLink = document.createElement('a');
  emailLink.href = 'mailto:anveshcreates@gmail.com';
  emailLink.innerHTML = '<span class="mono">EMAIL</span><b>anveshcreates@gmail.com</b><i>↗</i>';
  contactLinks.appendChild(emailLink);
}
const footerSocial = document.querySelector('.footer-social');
if (footerSocial && !footerSocial.querySelector('a[href^="mailto:"]')) {
  const footerEmail = document.createElement('a');
  footerEmail.href = 'mailto:anveshcreates@gmail.com';
  footerEmail.className = 'mono footer-phone';
  footerEmail.textContent = 'EMAIL ↗';
  footerSocial.appendChild(footerEmail);
}

const portrait = document.querySelector('.about-portrait');
const canRevealPortrait = window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (portrait) {
  const source = portrait.querySelector('img');
  const negative = source.cloneNode(true);
  const original = source.cloneNode(true);
  negative.className = 'portrait-negative';
  original.className = 'portrait-original';
  original.alt = '';
  original.setAttribute('aria-hidden', 'true');
  source.replaceWith(negative, original);

  if (canRevealPortrait) {
    const portraitRect = portrait.getBoundingClientRect();
    let targetX = portraitRect.width / 2, targetY = portraitRect.height / 2, currentX = targetX, currentY = targetY, active = false, frame = 0;
    const render = () => {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      portrait.style.setProperty('--x', `${currentX}px`);
      portrait.style.setProperty('--y', `${currentY}px`);
      if (active || Math.abs(targetX - currentX) > .1 || Math.abs(targetY - currentY) > .1) frame = requestAnimationFrame(render);
      else frame = 0;
    };
    portrait.addEventListener('pointerenter', event => { const rect = portrait.getBoundingClientRect(); targetX = event.clientX - rect.left; targetY = event.clientY - rect.top; active = true; portrait.classList.add('is-revealing'); if (!frame) frame = requestAnimationFrame(render); });
    portrait.addEventListener('pointermove', event => {
      const rect = portrait.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      if (!frame) frame = requestAnimationFrame(render);
    });
    portrait.addEventListener('pointerleave', () => { active = false; portrait.classList.remove('is-revealing'); targetX = portrait.clientWidth / 2; targetY = portrait.clientHeight / 2; if (!frame) frame = requestAnimationFrame(render); });
  }
}
