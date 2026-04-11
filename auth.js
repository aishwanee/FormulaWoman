/**
 * FORMULA WOMAN — Auth JS (auth.js)
 * Handles: sign in, register, password toggle, strength meter,
 *          form validation, message display.
 */
(function () {
  'use strict';

  /* ── helpers ─────────────────────────────────────────────── */
  function $(id) { return document.getElementById(id); }

  function showMsg(elId, text, type) {
    const el = $(elId);
    if (!el) return;
    el.textContent = text;
    el.className = `auth-message auth-message-${type} show`;
  }

  function hideMsg(elId) {
    const el = $(elId);
    if (!el) return;
    el.className = 'auth-message auth-message-error';
    el.textContent = '';
  }

  function setLoading(btn, loading) {
    btn.disabled = loading;
    btn.textContent = loading ? 'Please wait…' : btn.dataset.label;
  }

  /* ── password eye toggle ─────────────────────────────────── */
  function initEyeToggle(btnId, inputId) {
    const btn   = $(btnId);
    const input = $(inputId);
    if (!btn || !input) return;

    btn.dataset.label = btn.querySelector('svg') ? '' : btn.textContent;

    btn.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';

      // swap SVG eye / eye-off
      const svg = btn.querySelector('svg');
      if (svg) {
        if (isHidden) {
          svg.innerHTML = `
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
            <line x1="1" y1="1" x2="23" y2="23"/>`;
        } else {
          svg.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>`;
        }
      }
    });
  }

  /* ── password strength ───────────────────────────────────── */
  function initStrength(inputId, barId, fillId, labelId) {
    const input = $(inputId);
    const fill  = $(fillId);
    const label = $(labelId);
    if (!input || !fill || !label) return;

    function score(pw) {
      let s = 0;
      if (pw.length >= 8)  s++;
      if (pw.length >= 12) s++;
      if (/[A-Z]/.test(pw)) s++;
      if (/[0-9]/.test(pw)) s++;
      if (/[^A-Za-z0-9]/.test(pw)) s++;
      return s;
    }

    const levels = [
      { pct: '0%',   color: 'transparent', text: '' },
      { pct: '25%',  color: '#e63946',     text: 'Weak' },
      { pct: '50%',  color: '#f4a261',     text: 'Fair' },
      { pct: '75%',  color: '#2a9d8f',     text: 'Good' },
      { pct: '100%', color: '#57cc99',     text: 'Strong' },
    ];

    input.addEventListener('input', () => {
      const s = input.value ? Math.min(score(input.value), 4) : 0;
      const lvl = levels[s];
      fill.style.width    = lvl.pct;
      fill.style.background = lvl.color;
      label.textContent   = lvl.text;
      label.style.color   = lvl.color;
    });
  }

  /* ── card number formatting ──────────────────────────────── */
  function initCardFormat(id) {
    const input = $(id);
    if (!input) return;
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '').slice(0, 16);
      input.value = v.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  function initExpiryFormat(id) {
    const input = $(id);
    if (!input) return;
    input.addEventListener('input', () => {
      let v = input.value.replace(/\D/g, '').slice(0, 4);
      if (v.length >= 3) v = v.slice(0,2) + ' / ' + v.slice(2);
      input.value = v;
    });
  }

  /* ── SIGN IN ─────────────────────────────────────────────── */
  function initSignIn() {
    const btn = $('signin-btn');
    if (!btn) return;

    btn.dataset.label = 'Sign In';

    initEyeToggle('toggle-pw', 'password');

    btn.addEventListener('click', () => {
      hideMsg('auth-error');
      hideMsg('auth-success');

      const email = ($('email')?.value || '').trim();
      const pw    = ($('password')?.value || '');

      if (!email || !pw) {
        showMsg('auth-error', 'Please fill in all fields.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg('auth-error', 'Please enter a valid email address.', 'error'); return;
      }
      if (pw.length < 6) {
        showMsg('auth-error', 'Password must be at least 6 characters.', 'error'); return;
      }

      // Simulate async sign in
      setLoading(btn, true);
      setTimeout(() => {
        setLoading(btn, false);
        // Replace this block with a real API call:
        showMsg('auth-success', 'Signed in successfully! Redirecting…', 'success');
        setTimeout(() => { location.href = 'index.html'; }, 1200);
      }, 1400);
    });

    // Allow Enter key
    ['email', 'password'].forEach(id => {
      const el = $(id);
      el && el.addEventListener('keydown', e => {
        if (e.key === 'Enter') btn.click();
      });
    });
  }

  /* ── REGISTER ────────────────────────────────────────────── */
  function initRegister() {
    const btn = $('register-btn');
    if (!btn) return;

    btn.dataset.label = 'Create Account';

    initEyeToggle('toggle-pw',  'password');
    initEyeToggle('toggle-cpw', 'confirm-password');
    initStrength('password', 'pw-bar', 'pw-fill', 'pw-label');

    btn.addEventListener('click', () => {
      hideMsg('auth-error');
      hideMsg('auth-success');

      const first   = ($('first-name')?.value || '').trim();
      const last    = ($('last-name')?.value  || '').trim();
      const email   = ($('email')?.value      || '').trim();
      const pw      = ($('password')?.value   || '');
      const cpw     = ($('confirm-password')?.value || '');
      const terms   = $('terms')?.checked;

      if (!first || !last || !email || !pw || !cpw) {
        showMsg('auth-error', 'Please fill in all fields.', 'error'); return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showMsg('auth-error', 'Please enter a valid email address.', 'error'); return;
      }
      if (pw.length < 8) {
        showMsg('auth-error', 'Password must be at least 8 characters.', 'error'); return;
      }
      if (pw !== cpw) {
        showMsg('auth-error', 'Passwords do not match.', 'error'); return;
      }
      if (!terms) {
        showMsg('auth-error', 'Please accept the Terms of Service to continue.', 'error'); return;
      }

      setLoading(btn, true);
      setTimeout(() => {
        setLoading(btn, false);
        // Replace with real API call:
        showMsg('auth-success', 'Account created! Welcome to the grid 🏁', 'success');
        setTimeout(() => { location.href = 'index.html'; }, 1400);
      }, 1500);
    });
  }

  /* ── INIT on DOMContentLoaded ────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initSignIn();
    initRegister();
    initCardFormat('card-num');
    initExpiryFormat('card-exp');
  });

  // Expose for subscribe.js to call card formatters if needed
  window.FWAuth = { initCardFormat, initExpiryFormat };

})();
