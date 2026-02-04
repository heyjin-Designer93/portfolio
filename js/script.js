// work 클릭 → 모달 열기
document.querySelectorAll('.work').forEach(work => {
  work.addEventListener('click', () => {
    const modalId = work.dataset.modal;
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // ✅ 자동재생 제거
    // ❌ video.play() 절대 호출하지 않음
    modal.querySelectorAll('video').forEach(video => {
      video.currentTime = 0; // 처음 프레임으로만 초기화
    });
  });
});

// modal-close 버튼 클릭
document.querySelectorAll('.modal-close').forEach(button => {
  button.addEventListener('click', e => {
    e.stopPropagation();
    const modal = button.closest('.modal');
    if (!modal) return;

    closeModal(modal);
  });
});

// modal 배경 클릭 시 닫기
document.querySelectorAll('.modal').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target !== modal) return;
    closeModal(modal);
  });
});

// ✅ 모달 닫기 공통 처리
function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';

  // video 정지 + 초기화
  modal.querySelectorAll('video').forEach(video => {
    video.pause();
    video.currentTime = 0;
  });
}

// 🔹 모달 스크롤 → 상단 버튼 표시
document.querySelectorAll('.modal').forEach(modal => {
  const topBtn = modal.querySelector('.modal-top-btn');
  if (!topBtn) return;

  modal.addEventListener('scroll', () => {
    if (modal.scrollTop > 300) {
      topBtn.classList.add('show');
    } else {
      topBtn.classList.remove('show');
    }
  });

  // 🔹 상단으로 이동
  topBtn.addEventListener('click', e => {
    e.stopPropagation();
    modal.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
