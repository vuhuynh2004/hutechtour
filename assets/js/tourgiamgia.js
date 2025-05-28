// tour-slider.js (hoặc sửa đổi tourgiamgia.js)

// --- Logic cho Tour Giá Sập Sàn ---
const slider1 = document.getElementById('slider');
const leftBtn1 = document.getElementById('leftBtn');
const rightBtn1 = document.getElementById('rightBtn');

let index1 = 0;
const total1 = 6; // Cập nhật tổng số tour
const tourWidth1 = 300; // Chiều rộng của mỗi tour card
let autoScroll1 = true;
let timeout1;

function updateTransform1() {
    slider1.style.transform = `translateX(${-index1 * tourWidth1}px)`;
}

function next1() {
    index1 = (index1 + 1) % total1;
    updateTransform1();
}

function prev1() {
    index1 = (index1 - 1 + total1) % total1;
    updateTransform1();
}

leftBtn1.addEventListener('click', () => {
    prev1();
    pauseAutoScroll1();
});

rightBtn1.addEventListener('click', () => {
    next1();
    pauseAutoScroll1();
});

function pauseAutoScroll1() {
    autoScroll1 = false;
    clearTimeout(timeout1);
    timeout1 = setTimeout(() => {
        autoScroll1 = true;
    }, 10000);
}

setInterval(() => {
    if (autoScroll1) {
        next1();
    }
}, 3000);

// --- Logic cho Tour Phổ Biến Nhất ---
const slider2 = document.getElementById('hot');  // Đổi 'hot' thành 'slider' nếu bạn sửa HTML
const leftBtn2 = document.getElementById('leftBtn1');
const rightBtn2 = document.getElementById('rightBtn1');

let index2 = 0;
const total2 = 3; // Cập nhật tổng số tour
const tourWidth2 = 300; // Chiều rộng của mỗi tour card
let autoScroll2 = true;
let timeout2;

function updateTransform2() {
    slider2.style.transform = `translateX(${-index2 * tourWidth2}px)`;
}

function next2() {
    index2 = (index2 + 1) % total2;
    updateTransform2();
}

function prev2() {
    index2 = (index2 - 1 + total2) % total2;
    updateTransform2();
}

leftBtn2.addEventListener('click', () => {
    prev2();
    pauseAutoScroll2();
});

rightBtn2.addEventListener('click', () => {
    next2();
    pauseAutoScroll2();
});

function pauseAutoScroll2() {
    autoScroll2 = false;
    clearTimeout(timeout2);
    timeout2 = setTimeout(() => {
        autoScroll2 = true;
    }, 10000);
}

setInterval(() => {
    if (autoScroll2) {
        next2();
    }
}, 3000);



const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.tour-card').forEach(card => {
  observer.observe(card);
});