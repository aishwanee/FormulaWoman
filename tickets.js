/**
 * FORMULA WOMAN — Tickets JS (tickets.js)
 * - Dual filter: region + ticket type
 * - Pit Walk and Paddock Club have standout card styling
 * - All cards use "Book Now" (no Enquire)
 */
(function () {
  'use strict';

  /* tickettype values: 'general' | 'grandstand' | 'pitwalk' | 'paddock' */
  const TICKETS = [
    { id:1,  name:'Australian GP',      region:'europe',   date:'11–13 Feb', venue:'Albert Park Circuit',           tickettype:'general',    price:149, badge:'',             img:'australia.png'  },
    { id:2,  name:'Monaco GP',          region:'europe',   date:'05–07 Jun', venue:'Circuit de Monaco',             tickettype:'general',    price:149, badge:'',             img:'monaco.png'     },
    { id:3,  name:'Monaco GP',          region:'europe',   date:'05–07 Jun', venue:'Circuit de Monaco',             tickettype:'grandstand', price:249, badge:'',             img:'monaco.png'     },
    { id:4,  name:'Great Britain GP',   region:'europe',   date:'10–12 Jul', venue:'Silverstone Circuit',           tickettype:'general',    price:129, badge:'',             img:'britain.png'    },
    { id:5,  name:'Great Britain GP',   region:'europe',   date:'10–12 Jul', venue:'Silverstone Circuit',           tickettype:'grandstand', price:229, badge:'Fast Selling', img:'britain.png'    },
    { id:6,  name:'Italy (Imola) GP',   region:'europe',   date:'30 Oct–1 Nov',venue:'Autodromo Enzo Ferrari',     tickettype:'general',    price:99,  badge:'',             img:'italy.png'      },
    { id:7,  name:'Belgium GP',         region:'europe',   date:'18–20 Sep', venue:'Spa-Francorchamps',             tickettype:'general',    price:119, badge:'',             img:'belgium.png'    },
    { id:8,  name:'Miami GP',           region:'americas', date:'01–03 May', venue:'Miami International Autodrome', tickettype:'grandstand', price:299, badge:'Limited',      img:'miami.png'      },
    { id:9,  name:'Canada GP',          region:'americas', date:'22–24 May', venue:'Circuit Gilles Villeneuve',     tickettype:'general',    price:179, badge:'',             img:'canada.png'     },
    { id:10, name:'USA GP (COTA)',       region:'americas', date:'04–06 Dec', venue:'Circuit of the Americas',       tickettype:'general',    price:189, badge:'',             img:'usa.png'        },
    { id:11, name:'Mexico City GP',     region:'americas', date:'11–13 Dec', venue:'Autodromo Hermanos Rodriguez',  tickettype:'grandstand', price:219, badge:'',             img:'mexico.png'     },
    { id:12, name:'Las Vegas GP',       region:'americas', date:'25–27 Dec', venue:'Las Vegas Strip Circuit',        tickettype:'general',    price:349, badge:'Hot 🔥',       img:'lasvegas.png'   },
    { id:13, name:'Brazil GP',          region:'americas', date:'18–20 Dec', venue:'Autodromo Jose Carlos Pace',    tickettype:'general',    price:149, badge:'',             img:'brazil.png'     },
    { id:14, name:'Japan GP',           region:'asia',     date:'06–08 Mar', venue:'Suzuka Circuit',                tickettype:'general',    price:139, badge:'',             img:'japan.png'      },
    { id:15, name:'Bahrain GP',         region:'asia',     date:'20–22 Mar', venue:'Bahrain International Circuit', tickettype:'grandstand', price:199, badge:'',             img:'bahrain.png'    },
    { id:16, name:'Saudi Arabia GP',    region:'asia',     date:'03–05 Apr', venue:'Jeddah Corniche Circuit',        tickettype:'general',    price:229, badge:'',             img:'saudi.png'      },
    { id:17, name:'Singapore GP',       region:'asia',     date:'27–29 Nov', venue:'Marina Bay Street Circuit',     tickettype:'grandstand', price:269, badge:'Fast Selling', img:'singapore.png'  },
    { id:18, name:'Qatar GP',           region:'asia',     date:'08–10 Jan', venue:'Lusail International Circuit',  tickettype:'general',    price:179, badge:'',             img:'qatar.png'      },
    { id:19, name:'Abu Dhabi GP',       region:'asia',     date:'15–17 Jan', venue:'Yas Marina Circuit',             tickettype:'general',    price:259, badge:'Season Finale 🏁', img:'abudhabi.png' },

    /* ── PIT WALK ── */
    { id:20, name:'Pit Lane Walk',      region:'europe',   date:'Selected dates', venue:'Silverstone · Monaco · Spa', tickettype:'pitwalk',  price:199, badge:'Experience',   img:'britain.png'    },
    { id:21, name:'Pit Lane Walk',      region:'americas', date:'Selected dates', venue:'Miami · COTA · Las Vegas',   tickettype:'pitwalk',  price:199, badge:'Experience',   img:'miami.png'      },
    { id:22, name:'Pit Lane Walk',      region:'asia',     date:'Selected dates', venue:'Singapore · Abu Dhabi',      tickettype:'pitwalk',  price:199, badge:'Experience',   img:'singapore.png'  },

    /* ── PADDOCK CLUB ── */
    { id:23, name:'Paddock Club — Europe',    region:'europe',   date:'All European rounds', venue:'All European circuits',    tickettype:'paddock', price:850, badge:'VIP',  img:'monaco.png'    },
    { id:24, name:'Paddock Club — Americas',  region:'americas', date:'All Americas rounds', venue:'All Americas circuits',   tickettype:'paddock', price:850, badge:'VIP',  img:'miami.png'     },
    { id:25, name:'Paddock Club — Asia',      region:'asia',     date:'All Asia rounds',     venue:'All Asia & ME circuits',  tickettype:'paddock', price:850, badge:'VIP',  img:'singapore.png' },
  ];

  let filterRegion = 'all';
  let filterType   = 'all';
  let currentTicket = null;

  /* ── Filter ──────────────────────────────────────────────── */
  function getFiltered() {
    return TICKETS.filter(t => {
      const regionMatch = filterRegion === 'all' || t.region === filterRegion;
      const typeMatch   = filterType   === 'all' || t.tickettype === filterType;
      return regionMatch && typeMatch;
    });
  }

  /* ── Render ──────────────────────────────────────────────── */
  function renderGrid() {
    const grid = document.getElementById('tickets-grid');
    if (!grid) return;

    const list = getFiltered();

    if (list.length === 0) {
      grid.innerHTML = '<p style="color:#444;grid-column:1/-1;text-align:center;padding:60px 0;font-size:14px;">No tickets match your filters.</p>';
      return;
    }

    grid.innerHTML = list.map(t => {
      const isPitWalk  = t.tickettype === 'pitwalk';
      const isPaddock  = t.tickettype === 'paddock';
      const extraClass = isPaddock ? ' ticket-card-paddock' : isPitWalk ? ' ticket-card-pitwalk' : '';

      return `
        <div class="ticket-card${extraClass}" data-id="${t.id}">
          ${isPaddock ? '<div class="paddock-crown">♛</div>' : ''}
          ${isPitWalk ? '<div class="pitwalk-icon">🔧</div>' : ''}
          <div class="ticket-card-img" style="background-image:url(images/${t.img})">
            <div class="ticket-card-img-overlay"></div>
            ${t.badge ? `<span class="ticket-badge${isPaddock?' ticket-badge-vip':''}">${t.badge}</span>` : ''}
          </div>
          <div class="ticket-card-body">
            <p class="ticket-card-date">${t.date}</p>
            <h3 class="ticket-card-name">${t.name}</h3>
            <p class="ticket-card-venue">${t.venue}</p>
            <p class="ticket-card-cat">${
              isPaddock ? '✦ Paddock Club · VIP Hospitality'
            : isPitWalk ? '✦ Pit Lane Walk · Exclusive Access'
            : t.tickettype === 'grandstand' ? 'Grandstand'
            : 'General Admission'
            }</p>
            <div class="ticket-card-footer">
              <span class="ticket-card-price">£${t.price.toFixed(2)}<span class="ticket-price-per">${isPaddock||isPitWalk?' / person':''}</span></span>
              <button class="shop-buy-btn${isPaddock?' shop-buy-btn-vip':''}" data-id="${t.id}">Book Now</button>
            </div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.shop-buy-btn').forEach(btn => {
      btn.addEventListener('click', () => openModal(+btn.dataset.id));
    });
  }

  /* ── Modal ───────────────────────────────────────────────── */
  function openModal(id) {
    currentTicket = TICKETS.find(t => t.id === id);
    if (!currentTicket) return;

    document.getElementById('ticket-modal-title').textContent = currentTicket.name;
    document.getElementById('ticket-modal-sub').textContent   =
      `${currentTicket.tickettype === 'paddock' ? 'VIP Hospitality' : currentTicket.tickettype === 'pitwalk' ? 'Pit Lane Walk' : currentTicket.tickettype === 'grandstand' ? 'Grandstand' : 'General Admission'} · ${currentTicket.date} · ${currentTicket.venue}`;

    updateTotal();

    document.getElementById('ticket-backdrop')?.classList.add('is-open');
    document.getElementById('ticket-modal')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('t-name')?.focus(), 260);
  }

  function closeModal() {
    document.getElementById('ticket-backdrop')?.classList.remove('is-open');
    document.getElementById('ticket-modal')?.classList.remove('is-open');
    document.body.style.overflow = '';
    hideMsg('ticket-error');
    hideMsg('ticket-success');
  }

  function updateTotal() {
    if (!currentTicket) return;
    const qty = +document.getElementById('t-qty')?.value || 1;
    document.getElementById('t-total').textContent = `£${(currentTicket.price * qty).toFixed(2)}`;
  }

  /* ── Messages ────────────────────────────────────────────── */
  function showMsg(id, text, type) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = text;
    el.className = `auth-message auth-message-${type} show`;
  }

  function hideMsg(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'auth-message auth-message-error';
    el.textContent = '';
  }

  /* ── Book Now ────────────────────────────────────────────── */
  document.getElementById('ticket-pay-btn')?.addEventListener('click', () => {
    hideMsg('ticket-error');
    hideMsg('ticket-success');

    const name  = document.getElementById('t-name')?.value.trim();
    const email = document.getElementById('t-email')?.value.trim();

    if (!name || !email) {
      showMsg('ticket-error', 'Please fill in your name and email.', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMsg('ticket-error', 'Please enter a valid email address.', 'error'); return;
    }

    const btn = document.getElementById('ticket-pay-btn');
    btn.disabled = true;
    btn.textContent = 'Processing…';

    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = 'Book Now';
      showMsg('ticket-success', '🎉 Booking confirmed! Check your email for details.', 'success');
      setTimeout(closeModal, 2200);
    }, 1600);
  });

  /* ── Events ──────────────────────────────────────────────── */
  document.getElementById('ticket-region-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.shop-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#ticket-region-filter .shop-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterRegion = btn.dataset.region;
    renderGrid();
  });

  document.getElementById('ticket-type-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.shop-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#ticket-type-filter .shop-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterType = btn.dataset.tickettype;
    renderGrid();
  });

  document.getElementById('ticket-modal-close')?.addEventListener('click', closeModal);
  document.getElementById('ticket-backdrop')?.addEventListener('click', closeModal);
  document.getElementById('t-qty')?.addEventListener('change', updateTotal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  renderGrid();

})();
