document.addEventListener("DOMContentLoaded", () => {
  const tourBox = document.querySelector('.tour-box');
  const adultInput = document.getElementById('adult-tickets');
  const childInput = document.getElementById('child-tickets');
  const bookBtn = document.getElementById('book-button');
  const warning = document.getElementById('warning');
  const seatWarning = document.getElementById('seat-warning');
  const startInput = document.getElementById('start-date');
  const endInput = document.getElementById('end-date');
  const popupTotal = document.getElementById('confirm-total');

  const capacity = parseInt(tourBox.dataset.tourCapacity, 10);
  let joined = Math.floor(Math.random() * 21) + 5;
  tourBox.dataset.tourJoined = joined;
  tourBox.querySelector('.current-joined').textContent = joined;

  const tourDaysStr = document.body.dataset.tourDays || "3 ngày";
  const tourDays = parseInt(tourDaysStr);

  if (startInput && endInput) {
    startInput.addEventListener('change', () => {
      const startDate = new Date(startInput.value);
      if (!isNaN(startDate)) {
        const returnDate = new Date(startDate);
        returnDate.setDate(startDate.getDate() + tourDays);
        endInput.value = returnDate.toISOString().split('T')[0];
      }
    });
  }

  // ✅ Cập nhật tổng tiền và giá gốc
  window.updateTotal = () => {
    const priceAdult = parseInt(document.body.dataset.priceAdult);
    const discount = parseFloat(document.body.dataset.discountChild);
    const priceChild = Math.round(priceAdult * (1 - discount));

    const adults = parseInt(adultInput.value || '0');
    const children = parseInt(childInput.value || '0');

    const totalDiscounted = (adults * priceAdult) + (children * priceChild);
    document.getElementById('final-price').textContent = totalDiscounted.toLocaleString('vi-VN') + 'đ';
    document.getElementById('confirm-total').textContent = totalDiscounted.toLocaleString('vi-VN');

    updateOriginalPrice(); // Gọi luôn khi cập nhật tổng
  };

  // ✅ Tính giá gốc (dựa vào giá đã giảm và discount)
function updateOriginalPrice() {
  const priceOriginal = parseInt(document.body.dataset.priceOriginal); // giá gốc từ data
  const adults = parseInt(document.getElementById('adult-tickets').value || '0');
  const children = parseInt(document.getElementById('child-tickets').value || '0');

  const totalOriginal = (adults + children) * priceOriginal;
  document.getElementById('original-price').textContent = totalOriginal.toLocaleString('vi-VN') + 'đ';
}

  // ✅ Kiểm tra số chỗ
  const updateBookingStatus = () => {
    const adults = parseInt(adultInput.value || '0');
    const children = parseInt(childInput.value || '0');
    const totalRequested = adults + children;
    const remaining = capacity - joined;

    if (totalRequested > remaining) {
      warning.style.display = 'block';
      warning.textContent = `Vượt quá số chỗ còn lại (${remaining} chỗ)!`;
      seatWarning.style.display = 'block';
      bookBtn.disabled = true;
    } else {
      warning.style.display = 'none';
      seatWarning.style.display = 'none';
      bookBtn.disabled = false;
    }

    updateTotal();
  };

  adultInput.addEventListener('input', updateBookingStatus);
  childInput.addEventListener('input', updateBookingStatus);

  // ✅ Mở popup xác nhận
  bookBtn.addEventListener('click', () => {
    const startDate = startInput.value;
    const paymentMethod = document.getElementById('payment-method').value;
    const dateWarning = document.getElementById('date-warning');

    if (!paymentMethod) {
      document.getElementById('payment-popup').style.display = 'none';
      document.getElementById('warning-popup').style.display = 'flex';
      return;
    }

    if (!startDate) {
      dateWarning.style.display = 'block';
      return;
    } else {
      dateWarning.style.display = 'none';
    }

    updateTotal();
    document.getElementById('payment-popup').style.display = 'flex';
  });

  updateTotal(); // Tính toán ban đầu
});

// ✅ Các hàm bên ngoài DOMContentLoaded
function closePopup() {
  document.getElementById('payment-popup').style.display = 'none';
}

function processPayment() {
  document.getElementById('payment-popup').style.display = 'none';
  document.getElementById('loading-overlay').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('loading-overlay').style.display = 'none';
    document.getElementById('success-popup').style.display = 'flex';
  }, 1500);
}

function downloadReceipt() {
  const tourName = document.body.dataset.tourName;
  const tourCode = document.body.dataset.tourCode;
  const adults = document.getElementById('adult-tickets').value;
  const children = document.getElementById('child-tickets').value;
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  const totalPrice = document.getElementById('confirm-total').textContent;

  const content = `
===== BIÊN LAI THANH TOÁN =====

Mã tour: ${tourCode}
Tên tour: ${tourName}
Ngày khởi hành: ${startDate}
Ngày kết thúc: ${endDate}

Số vé người lớn: ${adults}
Số vé trẻ em: ${children}

Tổng tiền: ${totalPrice} VNĐ

Cảm ơn quý khách đã lựa chọn HutechTour!
  `;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `BienLai_${tourCode}.txt`;
  link.click();
}

function closeWarning() {
  document.getElementById('warning-popup').style.display = 'none';
  document.getElementById('payment-popup').style.display = 'none';
}
