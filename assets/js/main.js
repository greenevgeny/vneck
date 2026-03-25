// =========================================
// VNECK BROS — MAIN JS
// =========================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Nav scroll + dark mode ----
  const nav = document.querySelector('.nav');
  if (nav) {
    const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  // ---- Active nav link ----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ---- Scroll animations ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up, .fade-in, .stagger').forEach(el => io.observe(el));

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- Featured project switcher ----
  const featuredItems = document.querySelectorAll('.featured__item');
  const featuredVisual = document.getElementById('featuredVisual');

  featuredItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      featuredItems.forEach(fi => fi.classList.remove('active'));
      item.classList.add('active');
      if (featuredVisual) {
        const vid = item.dataset.videoId;
        if (vid) {
          featuredVisual.src = `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`;
          featuredVisual.alt = item.dataset.title || '';
        }
      }
      // Update counter
      const counter = document.getElementById('featuredCounter');
      if (counter) counter.textContent = `0${i+1} / 0${featuredItems.length}`;
    });
  });

  // ---- Video Modal ----
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('modalIframe');
  const modalTitle = document.getElementById('modalTitle');
  const modalClient = document.getElementById('modalClient');

  function openModal(videoId, title, client) {
    if (!modal) return;
    if (iframe) iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    if (modalTitle) modalTitle.textContent = title || '';
    if (modalClient) modalClient.textContent = client || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    setTimeout(() => { if (iframe) iframe.src = ''; }, 300);
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-id]').forEach(el => {
    el.addEventListener('click', () => {
      openModal(el.dataset.videoId, el.dataset.title, el.dataset.client);
    });
  });

  const closeBtn = document.getElementById('modalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

});
