/**
 * FORMULA WOMAN — Merch JS (merch.js)
 * - Dual filter: by type AND by team (both active simultaneously)
 * - "Add to Bag" opens size picker modal (no quick-add hover)
 * - No size shown for items with no sizes
 * - Cart has +/- quantity controls per item
 */
(function () {
  'use strict';

  const PRODUCTS = [
    { id:1,  name:'Team Hamilton Cap',         cat:'headwear',     team:'Ferrari',         price:35,  sizes:['S/M','L/XL'],               img:'merch_cap_hamilton.png',  badge:'New'        },
    { id:2,  name:'Formula Woman Polo Shirt',  cat:'tops',         team:'',                price:65,  sizes:['XS','S','M','L','XL'],      img:'merch_polo.png',           badge:''           },
    { id:3,  name:'Leclerc Race Jacket',       cat:'tops',         team:'Ferrari',         price:120, sizes:['XS','S','M','L','XL'],      img:'merch_jacket_leclerc.png', badge:'Bestseller' },
    { id:4,  name:'FW Logo Hoodie',            cat:'tops',         team:'',                price:85,  sizes:['XS','S','M','L','XL','2XL'],img:'merch_hoodie.png',         badge:''           },
    { id:5,  name:'McLaren Tee',               cat:'tops',         team:'McLaren',         price:45,  sizes:['XS','S','M','L','XL'],      img:'merch_tee_mclaren.png',    badge:''           },
    { id:6,  name:'Season 2026 Programme',     cat:'collectibles', team:'',                price:22,  sizes:[],                           img:'merch_programme.png',      badge:''           },
    { id:7,  name:'FW Keyring',                cat:'accessories',  team:'',                price:12,  sizes:[],                           img:'merch_keyring.png',         badge:''           },
    { id:8,  name:'Mercedes Team Scarf',       cat:'accessories',  team:'Mercedes',        price:38,  sizes:[],                           img:'merch_scarf_mercedes.png', badge:''           },
    { id:9,  name:'Red Bull Racing Snapback',  cat:'headwear',     team:'Red Bull Racing', price:40,  sizes:['S/M','L/XL'],               img:'merch_cap_redbull.png',    badge:''           },
    { id:10, name:'FW Tote Bag',               cat:'accessories',  team:'',                price:28,  sizes:[],                           img:'merch_tote.png',           badge:'New'        },
    { id:11, name:'Driver Diecast Set (1:43)', cat:'collectibles', team:'',                price:89,  sizes:[],                           img:'merch_diecast.png',        badge:'Limited'    },
    { id:12, name:'Williams Rain Jacket',      cat:'tops',         team:'Williams',        price:110, sizes:['XS','S','M','L','XL'],      img:'merch_rain_williams.png',  badge:''           },
    { id:13, name:'Aston Martin Cap',          cat:'headwear',     team:'Aston Martin',    price:38,  sizes:['S/M','L/XL'],               img:'merch_cap_aston.png',      badge:''           },
    { id:14, name:'FW Water Bottle',           cat:'accessories',  team:'',                price:25,  sizes:[],                           img:'merch_bottle.png',         badge:''           },
    { id:15, name:'Championship Poster Print', cat:'collectibles', team:'',                price:30,  sizes:['A3','A2'],                  img:'merch_poster.png',         badge:''           },
    { id:16, name:'Alpine Puffer Vest',        cat:'tops',         team:'Alpine',          price:95,  sizes:['XS','S','M','L','XL'],      img:'merch_vest_alpine.png',    badge:''           },
    { id:17, name:'Haas Team Cap',             cat:'headwear',     team:'Haas',            price:36,  sizes:['S/M','L/XL'],               img:'merch_cap_haas.png',       badge:''           },
    { id:18, name:'McLaren Team Jacket',       cat:'tops',         team:'McLaren',         price:130, sizes:['XS','S','M','L','XL'],      img:'merch_jacket_mclaren.png', badge:''           },
  ];

  const TEAM_COLORS = {
    'Ferrari':'#DC0000','McLaren':'#FF8000','Mercedes':'#00D2BE',
    'Red Bull Racing':'#3671C6','Williams':'#005AFF','Aston Martin':'#358C75',
    'Alpine':'#FF87BC','Haas':'#B6BABD',
  };

  let cart           = [];
  let currentProduct = null;
  let filterType     = 'all';
  let filterTeam     = 'all';
  let currentSort    = 'featured';

  /* ── Filter + sort ───────────────────────────────────────── */
  function getFiltered() {
    let list = PRODUCTS.filter(p => {
      const typeMatch = filterType === 'all' || p.cat === filterType;
      const teamMatch = filterTeam === 'all' || p.team === filterTeam;
      return typeMatch && teamMatch;
    });
    if (currentSort === 'price-asc')  list = [...list].sort((a,b) => a.price - b.price);
    if (currentSort === 'price-desc') list = [...list].sort((a,b) => b.price - a.price);
    if (currentSort === 'name')       list = [...list].sort((a,b) => a.name.localeCompare(b.name));
    return list;
  }

  /* ── Render grid ─────────────────────────────────────────── */
  function renderGrid() {
    const grid  = document.getElementById('merch-grid');
    const count = document.getElementById('merch-count');
    if (!grid) return;

    const list = getFiltered();
    if (count) count.textContent = `${list.length} product${list.length !== 1 ? 's' : ''}`;

    if (list.length === 0) {
      grid.innerHTML = '<p style="color:#444;grid-column:1/-1;text-align:center;padding:60px 0;font-size:14px;">No products match your filters.</p>';
      return;
    }

    grid.innerHTML = list.map(p => {
      const tc = p.team ? TEAM_COLORS[p.team] || '#fff' : 'rgb(245,53,170)';
      return `
        <div class="merch-card" data-id="${p.id}" style="--tc:${tc}">
          <div class="merch-card-img" style="background-image:url(images/${p.img})">
            ${p.badge ? `<span class="merch-badge">${p.badge}</span>` : ''}
          </div>
          <div class="merch-card-body">
            ${p.team ? `<span class="merch-team-tag" style="color:${tc}">${p.team}</span>` : ''}
            <h3 class="merch-card-name">${p.name}</h3>
            <div class="merch-card-footer">
              <span class="merch-card-price">£${p.price.toFixed(2)}</span>
              <button class="shop-buy-btn merch-add-btn" data-id="${p.id}">Add to Bag</button>
            </div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.merch-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const p = PRODUCTS.find(p => p.id === +btn.dataset.id);
        if (!p) return;
        if (p.sizes && p.sizes.length > 0) {
          openSizeModal(p.id);
        } else {
          addToCart(p.id, null);
          openCart();
        }
      });
    });
  }

  /* ── Size picker modal ───────────────────────────────────── */
  function openSizeModal(id) {
    currentProduct = PRODUCTS.find(p => p.id === id);
    if (!currentProduct) return;
    const p  = currentProduct;
    const tc = p.team ? TEAM_COLORS[p.team] || '#fff' : 'rgb(245,53,170)';

    document.getElementById('merch-modal-inner').innerHTML = `
      <div class="merch-modal-img" style="background-image:url(images/${p.img})"></div>
      <div class="merch-modal-info">
        ${p.team ? `<span class="merch-team-tag" style="color:${tc}">${p.team}</span>` : ''}
        <h2 class="modal-title" style="margin-bottom:4px">${p.name}</h2>
        <p class="modal-plan-label">£${p.price.toFixed(2)}</p>
        <div class="auth-field" style="margin-top:18px">
          <label class="auth-label">Select Size</label>
          <div class="merch-size-grid">
            ${p.sizes.map((s,i) => `
              <button class="merch-size-btn${i===0?' active':''}" data-size="${s}">${s}</button>
            `).join('')}
          </div>
        </div>
        <button class="auth-submit merch-modal-add" style="margin-top:22px">Add to Bag</button>
      </div>
    `;

    document.querySelectorAll('.merch-size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.merch-size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.querySelector('.merch-modal-add')?.addEventListener('click', () => {
      const size = document.querySelector('.merch-size-btn.active')?.dataset.size || null;
      addToCart(currentProduct.id, size);
      closeSizeModal();
      openCart();
    });

    document.getElementById('merch-backdrop')?.classList.add('is-open');
    document.getElementById('merch-modal')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeSizeModal() {
    document.getElementById('merch-backdrop')?.classList.remove('is-open');
    document.getElementById('merch-modal')?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── Cart logic ──────────────────────────────────────────── */
  function cartKey(id, size) { return `${id}__${size || 'nosize'}`; }

  function addToCart(id, size) {
    const p = PRODUCTS.find(p => p.id === id);
    if (!p) return;
    const key      = cartKey(id, size);
    const existing = cart.find(i => cartKey(i.id, i.size) === key);
    if (existing) { existing.qty++; }
    else { cart.push({ ...p, size: size || null, qty: 1 }); }
    renderCart();
    updateCartBubble();
  }

  function changeQty(id, size, delta) {
    const key  = cartKey(id, size);
    const item = cart.find(i => cartKey(i.id, i.size) === key);
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) cart = cart.filter(i => cartKey(i.id, i.size) !== key);
    renderCart();
    updateCartBubble();
  }

  function removeFromCart(id, size) {
    cart = cart.filter(i => cartKey(i.id, i.size) !== cartKey(id, size));
    renderCart();
    updateCartBubble();
  }

  function renderCart() {
    const itemsEl  = document.getElementById('cart-items');
    const footerEl = document.getElementById('cart-footer');
    const totalEl  = document.getElementById('cart-total');
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '<p class="cart-empty">Your bag is empty.</p>';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    itemsEl.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-img" style="background-image:url(images/${i.img})"></div>
        <div class="cart-item-info">
          <p class="cart-item-name">${i.name}</p>
          ${i.size ? `<p class="cart-item-meta">${i.size}</p>` : ''}
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">£${(i.price * i.qty).toFixed(2)}</span>
          <div class="cart-qty-row">
            <button class="cart-qty-btn" data-id="${i.id}" data-size="${i.size || ''}" data-delta="-1">−</button>
            <span class="cart-qty-num">${i.qty}</span>
            <button class="cart-qty-btn" data-id="${i.id}" data-size="${i.size || ''}" data-delta="1">+</button>
            <button class="cart-remove" data-id="${i.id}" data-size="${i.size || ''}" title="Remove">&times;</button>
          </div>
        </div>
      </div>
    `).join('');

    itemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', () => changeQty(+btn.dataset.id, btn.dataset.size || null, +btn.dataset.delta));
    });
    itemsEl.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', () => removeFromCart(+btn.dataset.id, btn.dataset.size || null));
    });

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    if (totalEl)  totalEl.textContent = `£${total.toFixed(2)}`;
    if (footerEl) footerEl.style.display = 'block';
  }

  function updateCartBubble() {
    const count  = cart.reduce((s, i) => s + i.qty, 0);
    const el     = document.getElementById('cart-count');
    if (el) el.textContent = count;
    const bubble = document.getElementById('cart-bubble');
    if (bubble) bubble.classList.toggle('has-items', count > 0);
  }

  function openCart() {
    document.getElementById('cart-backdrop')?.classList.add('is-open');
    document.getElementById('cart-sidebar')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.getElementById('cart-backdrop')?.classList.remove('is-open');
    document.getElementById('cart-sidebar')?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── Event wiring ────────────────────────────────────────── */
  document.getElementById('merch-type-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.shop-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#merch-type-filter .shop-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterType = btn.dataset.type;
    renderGrid();
  });

  document.getElementById('merch-team-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.shop-filter-btn');
    if (!btn) return;
    document.querySelectorAll('#merch-team-filter .shop-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filterTeam = btn.dataset.team;
    renderGrid();
  });

  document.getElementById('merch-sort')?.addEventListener('change', e => {
    currentSort = e.target.value;
    renderGrid();
  });

  document.getElementById('merch-modal-close')?.addEventListener('click', closeSizeModal);
  document.getElementById('merch-backdrop')?.addEventListener('click', closeSizeModal);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('cart-backdrop')?.addEventListener('click', closeCart);
  document.getElementById('cart-bubble')?.addEventListener('click', openCart);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSizeModal(); closeCart(); } });

  renderGrid();

})();
