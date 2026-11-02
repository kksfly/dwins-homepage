/**
 * INS Corp. - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // 모바일 메뉴 배경 딤(오버레이) 요소 생성 및 body 추가
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeMobileMenu = () => {
    if (navMenu) navMenu.classList.remove('open');
    if (mobileToggle) {
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMobileMenu = () => {
    if (navMenu) navMenu.classList.add('open');
    if (mobileToggle) {
      mobileToggle.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
  };

  // 모바일 메뉴 열기/닫기 토글
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // 배경 딤(오버레이) 클릭 시 메뉴 닫기
  if (backdrop) {
    backdrop.addEventListener('click', closeMobileMenu);
  }

  // 모바일/태블릿 화면에서 드롭다운 서브메뉴 토글
  const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');
  dropdownItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link) {
      link.addEventListener('click', (e) => {
        // 모바일/태블릿 화면(1200px 이하)일 때 클릭으로 서브메뉴 토글
        if (window.innerWidth <= 1200) {
          e.preventDefault();
          const isOpen = item.classList.toggle('open');
          link.setAttribute('aria-expanded', isOpen);
        }
      });
    }
  });

  // ESC 키 누를 때 모바일 메뉴 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus();
    }
  });

  // 창 크기를 데스크톱 크기로 다시 키웠을 때 모바일 상태 자동 리셋
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1200 && navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });
});
