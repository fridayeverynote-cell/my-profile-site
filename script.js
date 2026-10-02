// ===== 데이터 (여기만 수정하면 내용이 바뀝니다) =====
const skills = ['HTML', 'Python', 'MySQL'];

const projects = [
  {
    title: '나만의 증권사 만들기',
    description: '증권 20년 경력을 바탕으로 직접 설계하는 나만의 증권사 프로젝트. 화면부터 데이터베이스까지 직접 구현합니다.',
    tags: ['HTML', 'Python', 'MySQL'],
    link: 'https://github.com/fridayeverynote-cell',
  },
  {
    title: '주문·체결 시스템',
    description: '매수·매도 주문을 접수하고 체결 내역을 기록하는 핵심 거래 기능.',
    status: '진행중',
    tags: ['Python', 'MySQL'],
    link: 'https://github.com/fridayeverynote-cell',
  },
  {
    title: '시세·포트폴리오 화면',
    description: '종목 시세와 보유 자산을 한눈에 보여주는 대시보드.',
    status: '진행중',
    tags: ['HTML', 'Python'],
    link: 'https://github.com/fridayeverynote-cell',
  },
];

// ===== 렌더링 =====
const skillsEl = document.getElementById('skills-list');
skills.forEach((s) => {
  const chip = document.createElement('span');
  chip.className = 'rounded-full bg-blue-50 px-5 py-2 font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300';
  chip.textContent = s;
  skillsEl.appendChild(chip);
});

const projectsEl = document.getElementById('projects-list');
projects.forEach((p) => {
  const card = document.createElement('a');
  card.href = p.link;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.className = 'reveal group block rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:hover:shadow-blue-500/10';

  const title = document.createElement('h3');
  title.className = 'text-xl font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400';
  title.textContent = p.title;

  const desc = document.createElement('p');
  desc.className = 'mt-3 text-slate-500 dark:text-slate-400';
  desc.textContent = p.description;

  const tags = document.createElement('div');
  tags.className = 'mt-5 flex flex-wrap gap-2';
  p.tags.forEach((t) => {
    const tag = document.createElement('span');
    tag.className = 'rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium dark:bg-slate-800';
    tag.textContent = t;
    tags.appendChild(tag);
  });

  card.append(title, desc, tags);
  if (p.status) {
    const badge = document.createElement('span');
    badge.className = 'mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300';
    badge.innerHTML = '<span class="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500"></span>';
    badge.append(p.status);
    card.prepend(badge);
  }
  projectsEl.appendChild(card);
});

document.getElementById('year').textContent = new Date().getFullYear();

// ===== 다크모드 =====
document.getElementById('theme-toggle').addEventListener('click', () => {
  const dark = document.documentElement.classList.toggle('dark');
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
});

// ===== 모바일 메뉴 =====
const mobileMenu = document.getElementById('mobile-menu');
document.getElementById('menu-toggle').addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
mobileMenu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') mobileMenu.classList.add('hidden');
});

// ===== 스크롤 페이드인 =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ===== 현재 섹션 네비게이션 강조 =====
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach((s) => sectionObserver.observe(s));
