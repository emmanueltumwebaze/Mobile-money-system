document.addEventListener('DOMContentLoaded', function () {
  const data = JSON.parse(sessionStorage.getItem('transferData') || '{}');

  if (!data.amount) {
    window.location.href = 'dashboard.html';
    return;
  }

  function formatMoney(v) {
    return 'UGX ' + Number(v).toLocaleString('en-UG');
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }) + ' ' + now.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const newBalance = 152400 - data.total;

  document.getElementById('txId').textContent = 'MM-' + Date.now().toString().slice(-7);
  document.getElementById('txAmount').textContent = formatMoney(data.amount);
  document.getElementById('txTo').textContent = data.recipient;
  document.getElementById('txFee').textContent = formatMoney(data.fee);
  document.getElementById('txDate').textContent = dateStr;
  document.getElementById('txBalance').textContent = formatMoney(newBalance);

  document.getElementById('doneBtn').addEventListener('click', function () {
    sessionStorage.removeItem('transferData');
    sessionStorage.removeItem('transferSuccess');
    window.location.href = 'dashboard.html';
  });
});
