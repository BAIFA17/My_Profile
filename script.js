// Helper: qs
const $ = (s, el=document) => el.querySelector(s);

// Year
$('#year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = $('.nav-toggle');
const siteNav = $('#site-nav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Smooth scroll for internal links
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile nav after navigate
    siteNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
    history.replaceState(null, '', `#${id}`);
  }
});

// Back to top button
const toTop = $('#to-top');
const toggleTop = () => {
  if (window.scrollY > 400) toTop.classList.add('show');
  else toTop.classList.remove('show');
};
window.addEventListener('scroll', toggleTop);
toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Copy email
const copyBtn = $('#copy-email');
const email = $('#email')?.textContent?.trim() ?? '';
const hint = $('#copy-hint');
copyBtn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    hint.textContent = 'คัดลอกแล้ว ✔';
    setTimeout(() => (hint.textContent = ''), 2000);
  } catch {
    hint.textContent = 'คัดลอกไม่สำเร็จ';
    setTimeout(() => (hint.textContent = ''), 2000);
  }
});

// Fake form submit
const form = document.querySelector('form.form');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  alert(`ขอบคุณครับ คุณ ${data.name || ''}!\nระบบได้รับข้อความของคุณแล้ว (ตัวอย่าง)`);
  form.reset();
});

// Download CV (placeholder)
$('#download-cv')?.addEventListener('click', (e) => {
  e.preventDefault();
  alert('ระบบกำลังอยู่ในการปิดใช้งาน');
});

// Active nav on scroll (basic)
const sections = ['about','skills','projects','contact'].map(id => document.getElementById(id));
const navLinks = Array.from(document.querySelectorAll('#site-nav a'));
const onScroll = () => {
  let active = null;
  for (const sec of sections) {
    if (!sec) continue;
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom >= 120) { active = sec.id; break; }
  }
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + active));
};
window.addEventListener('scroll', onScroll);
onScroll();
