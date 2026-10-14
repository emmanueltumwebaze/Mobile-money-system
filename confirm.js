document.addEventListener('DOMContentLoaded', function () {
  const data = JSON.parse(sessionStorage.getItem('transferData') || '{}');

  if (!data.amount) {
    window.location.href = 'send-money.html';
    return;
  }

  function formatMoney(v) {
    return 'UGX ' + Number(v).toLocaleString('en-UG');
  }

  // Extract a display name from reason or use phone
  // For demo we use a friendly name if available, otherwise phone
  const displayName = data.recipientName || data.recipient;

  // Fill confirm page
  document.getElementById('displayAmount').textContent = formatMoney(data.amount);
  document.getElementById('displayName').textContent = displayName;
  document.getElementById('displayRecipient').textContent = data.recipient;
  document.getElementById('displayFee').textContent = formatMoney(data.fee);
  document.getElementById('displayTotal').textContent = formatMoney(data.total);
  document.getElementById('displayReason').textContent = data.reason;

  // Modal elements
  const pinModal = document.getElementById('pinModal');
  const confirmPinInput = document.getElementById('confirmPin');
  const pinError = document.getElementById('pinError');
  const modalAmount = document.getElementById('modalAmount');
  const modalName = document.getElementById('modalName');
  const modalPhone = document.getElementById('modalPhone');

  // Open PIN modal
  document.getElementById('confirmBtn').addEventListener('click', function () {
    modalAmount.textContent = formatMoney(data.amount);
    modalName.textContent = displayName;
    modalPhone.textContent = data.recipient;
    confirmPinInput.value = '';
    pinError.style.display = 'none';
    pinModal.classList.add('active');
    setTimeout(function () {
      confirmPinInput.focus();
    }, 200);
  });

  // Close modal
  function closeModal() {
    pinModal.classList.remove('active');
    confirmPinInput.value = '';
    pinError.style.display = 'none';
  }

  document.getElementById('modalCancelBtn').addEventListener('click', closeModal);

  // Click outside modal to close
  pinModal.addEventListener('click', function (e) {
    if (e.target === pinModal) {
      closeModal();
    }
  });

  // Confirm with PIN
  document.getElementById('modalConfirmBtn').addEventListener('click', function () {
    const pin = confirmPinInput.value.trim();

    if (pin === '') {
      pinError.textContent = 'Please enter your PIN';
      pinError.style.display = 'block';
      return;
    }

    if (pin.length < 4) {
      pinError.textContent = 'PIN must be at least 4 digits';
      pinError.style.display = 'block';
      return;
    }

    // PIN accepted – go to receipt
    sessionStorage.setItem('transferSuccess', 'true');
    window.location.href = 'receipt.html';
  });

  // Enter key on PIN input
  confirmPinInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      document.getElementById('modalConfirmBtn').click();
    }
  });

  // Hide error when typing
  confirmPinInput.addEventListener('input', function () {
    pinError.style.display = 'none';
  });

  // Back and Cancel
  document.getElementById('cancelBtn').addEventListener('click', function () {
    window.location.href = 'send-money.html';
  });

  document.getElementById('backBtn').addEventListener('click', function () {
    window.location.href = 'send-money.html';
  });
});
