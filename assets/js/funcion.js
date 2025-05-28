 document.addEventListener("DOMContentLoaded", function () {
    const scrollBtn = document.getElementById("scrollBtn");
    const target = document.getElementById("tourSection");

    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (target) {
        smoothScrollTo(target.offsetTop, 1000); // 1000 = thời gian ms
      }
    });

    function smoothScrollTo(targetY, duration) {
      const startY = window.scrollY;
      const distanceY = targetY - startY;
      const startTime = performance.now();

      function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startY + distanceY * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      requestAnimationFrame(animation);
    }
  });


   document.addEventListener("DOMContentLoaded", function () {
    const scrollBtn = document.getElementById("btndattour");
    const target = document.getElementById("dattour");

    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();

      if (target) {
        smoothScrollTo(target.offsetTop, 1000); // 1000 = thời gian ms
      }
    });

    function smoothScrollTo(targetY, duration) {
      const startY = window.scrollY;
      const distanceY = targetY - startY;
      const startTime = performance.now();

      function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        window.scrollTo(0, startY + distanceY * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      }

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      requestAnimationFrame(animation);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("newsletterEmail");
    const submitBtn = document.getElementById("newsletterBtn");
    const message = document.getElementById("newsletterMessage");

    submitBtn.addEventListener("click", function () {
      const email = emailInput.value.trim();

      // Kiểm tra định dạng email hợp lệ
      if (!validateEmail(email)) {
        message.textContent = "Vui lòng nhập email hợp lệ.";
        message.style.color = "red";
        return;
      }

      // Giả lập gửi thành công
      message.textContent = "Đăng ký thành công! Cảm ơn bạn.";
      message.style.color = "green";

      // Xoá nội dung sau vài giây (tuỳ chọn)
      setTimeout(() => {
        message.textContent = "";
        emailInput.value = "";
      }, 3000);
    });

    function validateEmail(email) {
      // Regex đơn giản để kiểm tra email
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }
  });
const popupButtons = document.querySelectorAll('.showPopupBtn');
const overlay = document.getElementById('popupOverlay');
const closeBtn = document.getElementById('closePopupBtn');

popupButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.style.display = 'flex';
    closeBtn.focus();
  });
});

closeBtn.addEventListener('click', () => {
  overlay.style.display = 'none';
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape" && overlay.style.display === 'flex') {
    overlay.style.display = 'none';
  }
});
const noTourBtn = document.getElementById('noTourBtn');
const overlayNoTour = document.getElementById('popupOverlay_noTour');
const closeBtnNoTour = document.getElementById('closePopupBtn_noTour');

noTourBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlayNoTour.style.display = 'flex';
});

closeBtnNoTour.addEventListener('click', () => {
  overlayNoTour.style.display = 'none';
});

overlayNoTour.addEventListener('click', (e) => {
  if (e.target === overlayNoTour) {
    overlayNoTour.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlayNoTour.style.display === 'flex') {
    overlayNoTour.style.display = 'none';
  }
});
