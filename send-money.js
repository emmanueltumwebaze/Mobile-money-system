document.addEventListener('DOMContentLoaded', function () {
  const AVAILABLE_BALANCE = 152400;

  const recipientInput = document.getElementById('recipient');
  const amountInput = document.getElementById('amount');
  const reasonInput = document.getElementById('reason');
  const feeDisplay = document.getElementById('feeDisplay');
  const totalDisplay = document.getElementById('totalDisplay');
  const feeNote = document.getElementById('feeNote');
  const errorBox = document.getElementById('errorBox');
  const successBox = document.getElementById('successBox');
  const continueBtn = document.getElementById('continueBtn');
  const backBtn = document.getElementById('backBtn');

  // Fee calculation based on amount tiers
  function calculateFee(amount) {
    if (amount <= 0) return 0;
    if (amount <= 5000) return 200;
    if (amount <= 15000) return 350;
    if (amount <= 30000) return 500;
    if (amount <= 50000) return 750;
    if (amount <= 100000) return 1000;
    if (amount <= 200000) return 1500;
    return 2000;
  }

  function formatMoney(value) {
    return 'UGX ' + Number(value).toLocaleString('en-UG');
  }

  function updateSummary() {
    const amount = parseFloat(amountInput.value) || 0;
    const fee = calculateFee(amount);
    const total = amount + fee;

    feeDisplay.textContent = formatMoney(fee);
    totalDisplay.textContent = formatMoney(total);

    if (amount > 0) {
      feeNote.textContent = 'Fee for sending ' + formatMoney(amount) + ' is ' + formatMoney(fee);
    } else {
      feeNote.textContent = 'Fee is calculated based on the amount you send';
    }

    // Visual feedback if total exceeds balance
    if (total > AVAILABLE_BALANCE && amount > 0) {
      totalDisplay.style.color = '#c0392b';
    } else {
      totalDisplay.style.color = '#0052CC';
    }
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
    successBox.style.display = 'none';
  }

  function hideError() {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  }

  function showSuccess(message) {
    successBox.textContent = message;
    successBox.style.display = 'block';
    errorBox.style.display = 'none';
  }

  function validate() {
    const recipient = recipientInput.value.trim();
    const amount = parseFloat(amountInput.value) || 0;
    const reason = reasonInput.value.trim();
    const fee = calculateFee(amount);
    const total = amount + fee;

    hideError();

    // Check empty fields
    if (recipient === '' && amount <= 0) {
      showError('Please enter recipient phone number and amount');
      return false;
    }

    if (recipient === '') {
      showError('Please enter the recipient phone number');
      return false;
    }

    // Basic phone validation
    const phoneDigits = recipient.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      showError('Please enter a valid phone number');
      return false;
    }

    if (amount <= 0) {
      showError('Please enter the amount you want to send');
      return false;
    }

    if (amount < 500) {
      showError('Minimum amount you can send is UGX 500');
      return false;
    }

    // Balance check – cannot send more than available
    if (total > AVAILABLE_BALANCE) {
      showError(
        'Insufficient balance. You need ' + formatMoney(total) +
        ' (including fee) but you only have ' + formatMoney(AVAILABLE_BALANCE)
      );
      return false;
    }

    // All good – go to confirmation
    // Store data for next page
    const transferData = {
      recipient: recipient,
      amount: amount,
      fee: fee,
      total: total,
      reason: reason || 'No reason provided'
    };
    sessionStorage.setItem('transferData', JSON.stringify(transferData));

    window.location.href = 'confirm.html';
    return true;
  }

  // Live fee update as user types amount
  amountInput.addEventListener('input', function () {
    hideError();
    updateSummary();
  });

  recipientInput.addEventListener('input', hideError);
  reasonInput.addEventListener('input', hideError);

  continueBtn.addEventListener('click', function () {
    validate();
  });

  // Enter key support
  [recipientInput, amountInput, reasonInput].forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        validate();
      }
    });
  });

  backBtn.addEventListener('click', function () {
    window.location.href = 'dashboard.html';
  });

  // Initial state
  updateSummary();
});
