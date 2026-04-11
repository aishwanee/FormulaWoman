/**
 * FORMULA WOMAN — Subscribe JS (subscribe.js)
 * Handles: plan card selection, annual toggle, checkout modal,
 *          payment form interactions.
 */
(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  const PLANS = {
    pro: { name: 'Pole Position', monthly: 9.99,  annual: 7.99  },
    vip: { name: 'Victory Lap',   monthly: 19.99, annual: 15.99 },
  };

  let isAnnual      = false;
  let selectedPlan  = 'pro';

  /* ── Annual toggle ───────────────────────────────────────── */
  const annualCheck = $('annual-check');
  annualCheck && annualCheck.addEventListener('change', () => {
    isAnnual = annualCheck.checked;
    updatePrices();
  });

  function updatePrices() {
    // Pole Position button
    const proBtn = $('sub-pro-btn');
    if (proBtn) {
      const price = isAnnual ? PLANS.pro.annual : PLANS.pro.monthly;
      const period = isAnnual ? '/mo (billed annually)' : '/mo';
      proBtn.textContent = `Subscribe — £${price.toFixed(2)}${period}`;
    }
    // Victory Lap button
    const vipBtn = $('sub-vip-btn');
    if (vipBtn) {
      const price = isAnnual ? PLANS.vip.annual : PLANS.vip.monthly;
      const period = isAnnual ? '/mo (billed annually)' : '/mo';
      vipBtn.textContent = `Subscribe — £${price.toFixed(2)}${period}`;
    }
  }

  /* ── Open modal ──────────────────────────────────────────── */
  function openModal(planKey) {
    selectedPlan = planKey;
    const plan  = PLANS[planKey];
    const price = isAnnual ? plan.annual : plan.monthly;
    const period = isAnnual ? 'month (billed annually)' : 'month';

    const labelEl = $('modal-plan-label');
    if (labelEl) labelEl.textContent = `${plan.name} — £${price.toFixed(2)} / ${period}`;

    $('modal-backdrop')?.classList.add('is-open');
    $('checkout-modal')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Focus first input after transition
    setTimeout(() => { $('card-name')?.focus(); }, 260);
  }

  function closeModal() {
    $('modal-backdrop')?.classList.remove('is-open');
    $('checkout-modal')?.classList.remove('is-open');
    document.body.style.overflow = '';
    hideMsg('modal-error');
    hideMsg('modal-success');
  }

  /* ── Modal tabs ──────────────────────────────────────────── */
  document.querySelectorAll('.modal-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.modal-form').forEach(f => f.classList.add('hidden'));
      const target = document.getElementById('tab-' + tab.dataset.tab);
      if (target) target.classList.remove('hidden');
    });
  });

  /* ── CTA buttons ─────────────────────────────────────────── */
  $('sub-pro-btn') && $('sub-pro-btn').addEventListener('click', () => openModal('pro'));
  $('sub-vip-btn') && $('sub-vip-btn').addEventListener('click', () => openModal('vip'));

  /* ── Close modal ─────────────────────────────────────────── */
  $('modal-close') && $('modal-close').addEventListener('click', closeModal);
  $('modal-backdrop') && $('modal-backdrop').addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  /* ── Message helpers ─────────────────────────────────────── */
  function showMsg(id, text, type) {
    const el = $(id);
    if (!el) return;
    el.textContent = text;
    el.className = `auth-message auth-message-${type} show`;
  }

  function hideMsg(id) {
    const el = $(id);
    if (!el) return;
    el.className = 'auth-message auth-message-error';
    el.textContent = '';
  }

  /* ── Payment form validation ─────────────────────────────── */
  const payBtn = $('pay-btn');
  payBtn && payBtn.addEventListener('click', () => {
    hideMsg('modal-error');
    hideMsg('modal-success');

    const name  = ($('card-name')?.value  || '').trim();
    const num   = ($('card-num')?.value   || '').replace(/\s/g, '');
    const exp   = ($('card-exp')?.value   || '').replace(/\s/g, '');
    const cvc   = ($('card-cvc')?.value   || '').trim();
    const email = ($('card-email')?.value || '').trim();

    if (!name || !num || !exp || !cvc || !email) {
      showMsg('modal-error', 'Please fill in all payment details.', 'error'); return;
    }
    if (num.length !== 16 || !/^\d+$/.test(num)) {
      showMsg('modal-error', 'Please enter a valid 16-digit card number.', 'error'); return;
    }
    if (!/^\d{2}\/\d{2}$/.test(exp)) {
      showMsg('modal-error', 'Please enter a valid expiry date (MM/YY).', 'error'); return;
    }
    if (cvc.length < 3 || !/^\d+$/.test(cvc)) {
      showMsg('modal-error', 'Please enter a valid CVC.', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('modal-error', 'Please enter a valid email for your receipt.', 'error'); return;
    }

    // Simulate processing
    payBtn.disabled = true;
    payBtn.textContent = 'Processing…';

    setTimeout(() => {
      payBtn.disabled = false;
      payBtn.textContent = 'Pay now';
      // Replace with real Stripe / payment API call:
      showMsg('modal-success', '🎉 Payment successful! Welcome to Formula Woman TV.', 'success');
      setTimeout(() => {
        closeModal();
        location.href = 'index.html';
      }, 2000);
    }, 2000);
  });

  /* ── Init ────────────────────────────────────────────────── */
  updatePrices();

})();
