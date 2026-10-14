document.addEventListener('DOMContentLoaded', function () {
  const phoneInput = document.getElementById('phone');
  const pinInput = document.getElementById('pin');
  const loginBtn = document.getElementById('loginBtn');
  const errorBox = document.getElementById('errorBox');

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.display = 'block';
  }

  function hideError() {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  }

  function validate() {
    const phone = phoneInput.value.trim();
    const pin = pinInput.value.trim();

    hideError();

    // Both empty
    if (phone === '' && pin === '') {
      showError('Please enter your phone number and password');
      return false;
    }

    // Only phone empty
    if (phone === '') {
      showError('Please enter your phone number');
      return false;
    }

    // Only PIN empty
    if (pin === '') {
      showError('Please enter your pin number');
      return false;
    }

    // Both filled – go to dashboard
    window.location.href = 'dashboard.html';
    return true;
  }

  loginBtn.addEventListener('click', function () {
    validate();
  });

  // Allow pressing Enter in either field
  [phoneInput, pinInput].forEach(function (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        validate();
      }
    });
  });

  // Hide error when user starts typing
  phoneInput.addEventListener('input', hideError);
  pinInput.addEventListener('input', hideError);
});
