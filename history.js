document.addEventListener('DOMContentLoaded', function () {
  // Sample transactions matching the screenshot style
  const transactions = [
    {
      id: 1,
      type: 'sent',
      title: 'Sent to Sarah M',
      subtitle: 'Today, 10:30 AM',
      amount: -50000,
      status: 'success',
      period: 'today'
    },
    {
      id: 2,
      type: 'received',
      title: 'Received from MTN Bonus',
      subtitle: 'Yesterday, 6:45 PM',
      amount: 1000,
      status: 'success',
      period: 'week'
    },
    {
      id: 3,
      type: 'sent',
      title: 'Sent to Ron B',
      subtitle: 'Yesterday, 7:04 PM',
      amount: -20000,
      status: 'success',
      period: 'week'
    },
    {
      id: 4,
      type: 'received',
      title: 'Received from Jane Peth',
      subtitle: 'Today, 8:15 AM',
      amount: 5000,
      status: 'success',
      period: 'today'
    },
    {
      id: 5,
      type: 'sent',
      title: 'Sent to David K',
      subtitle: '3 days ago',
      amount: -15000,
      status: 'success',
      period: 'week'
    },
    {
      id: 6,
      type: 'received',
      title: 'Received from Mary N',
      subtitle: '5 days ago',
      amount: 25000,
      status: 'success',
      period: 'week'
    }
  ];

  let currentFilter = 'today';
  let searchQuery = '';

  const txList = document.getElementById('txList');
  const txCount = document.getElementById('txCount');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('searchInput');

  function formatMoney(value) {
    const abs = Math.abs(value);
    const formatted = 'UGX ' + abs.toLocaleString('en-UG');
    return value < 0 ? '- ' + formatted : '+ ' + formatted;
  }

  function getFiltered() {
    return transactions.filter(function (tx) {
      // Period filter
      if (currentFilter === 'today' && tx.period !== 'today') return false;
      if (currentFilter === 'week' && tx.period !== 'today' && tx.period !== 'week') return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchTitle = tx.title.toLowerCase().includes(q);
        const matchSub = tx.subtitle.toLowerCase().includes(q);
        if (!matchTitle && !matchSub) return false;
      }

      return true;
    });
  }

  function renderList() {
    const filtered = getFiltered();
    txList.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.style.display = 'block';
      txCount.textContent = '0 transactions';
      return;
    }

    emptyState.style.display = 'none';
    txCount.textContent = filtered.length + ' transaction' + (filtered.length !== 1 ? 's' : '');

    filtered.forEach(function (tx) {
      const iconSvg = tx.type === 'sent'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/><path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="#c0392b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 4V16M12 16L8 12M12 16L16 12" stroke="#1a8f3c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 20H20" stroke="#1a8f3c" stroke-width="2" stroke-linecap="round"/></svg>';

      const item = document.createElement('div');
      item.className = 'tx-item';
      item.innerHTML =
        '<div class="tx-icon ' + tx.type + '">' + iconSvg + '</div>' +
        '<div class="tx-details">' +
          '<p class="tx-title">' + tx.title + '</p>' +
          '<p class="tx-subtitle">' + tx.subtitle + '</p>' +
        '</div>' +
        '<div class="tx-right">' +
          '<p class="tx-amount ' + (tx.amount < 0 ? 'negative' : 'positive') + '">' + formatMoney(tx.amount) + '</p>' +
          '<span class="tx-status ' + tx.status + '">' + (tx.status === 'success' ? 'Success' : 'Pending') + '</span>' +
        '</div>';

      item.addEventListener('click', function () {
        alert(
          tx.title + '\n' +
          tx.subtitle + '\n' +
          formatMoney(tx.amount) + '\n' +
          'Status: ' + tx.status.charAt(0).toUpperCase() + tx.status.slice(1)
        );
      });

      txList.appendChild(item);
    });
  }

  // Tab filters
  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.tab').forEach(function (t) {
        t.classList.remove('active');
      });
      tab.classList.add('active');
      currentFilter = tab.getAttribute('data-filter');
      renderList();
    });
  });

  // Search
  searchInput.addEventListener('input', function () {
    searchQuery = searchInput.value.trim();
    renderList();
  });

  // Navigation
  document.getElementById('backBtn').addEventListener('click', function () {
    window.location.href = 'dashboard.html';
  });

  document.getElementById('navHome').addEventListener('click', function () {
    window.location.href = 'dashboard.html';
  });

  document.getElementById('navPay').addEventListener('click', function () {
    window.location.href = 'send-money.html';
  });

  document.getElementById('navHistory').addEventListener('click', function () {
    // Already on history
  });

  document.getElementById('navProfile').addEventListener('click', function () {
    alert('Profile page coming soon');
  });

  // Initial render
  renderList();
});
