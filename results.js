/**
 * FORMULA WOMAN — Results / Standings JS (results.js)
 * Toggle between driver and constructor standings.
 * Hash routing: results.html#drivers / results.html#teams
 * Navbar links to driverstandings.html and teamstandings.html
 * are handled by thin redirect shims (or just update the links).
 */
(function () {
  'use strict';

  /* ── DATA ──────────────────────────────────────────────────── */

  const TEAM_COLORS = {
    'Ferrari':        '#DC0000',
    'McLaren':        '#FF8000',
    'Mercedes':       '#00D2BE',
    'Red Bull Racing':'#3671C6',
    'Williams':       '#005AFF',
    'Aston Martin':   '#358C75',
    'Alpine':         '#FF87BC',
    'Haas':           '#B6BABD',
    'Racing Bulls':   '#6692FF',
    'Cadillac':       '#C8C8C8',
    'Audi':           '#BB0000',
  };

  const DRIVERS = [
    { pos:1,  first:'Charlotte',  last:'Leclerc',    team:'Ferrari',         pts:119, wins:3, img:'leclerc.png'    },
    { pos:2,  first:'Linda',      last:'Norris',     team:'McLaren',         pts:107, wins:2, img:'norris.png'     },
    { pos:3,  first:'Louise',     last:'Hamilton',   team:'Ferrari',         pts:98,  wins:1, img:'hamilton.png'   },
    { pos:4,  first:'Ophelia',    last:'Piastri',    team:'McLaren',         pts:91,  wins:1, img:'piastri.png'    },
    { pos:5,  first:'Georgina',   last:'Russell',    team:'Mercedes',        pts:74,  wins:0, img:'russell.png'    },
    { pos:6,  first:'Maxine',     last:'Verstappen', team:'Red Bull Racing', pts:67,  wins:0, img:'verstappen.png' },
    { pos:7,  first:'Fernanda',   last:'Alonso',     team:'Aston Martin',    pts:53,  wins:0, img:'alonso.png'     },
    { pos:8,  first:'Kimberly',   last:'Antonelli',  team:'Mercedes',        pts:48,  wins:0, img:'antonelli.png'  },
    { pos:9,  first:'Isabell',    last:'Hadjar',     team:'Red Bull Racing', pts:39,  wins:0, img:'hadjar.png'     },
    { pos:10, first:'Carolina',   last:'Sainz',      team:'Williams',        pts:34,  wins:0, img:'sainz.png'      },
    { pos:11, first:'Pierette',   last:'Gasly',      team:'Alpine',          pts:28,  wins:0, img:'gasly.png'      },
    { pos:12, first:'Lia',        last:'Lawson',     team:'Racing Bulls',    pts:22,  wins:0, img:'lawson.png'     },
    { pos:13, first:'Lana',       last:'Stroll',     team:'Aston Martin',    pts:19,  wins:0, img:'stroll.png'     },
    { pos:14, first:'Alexandra',  last:'Albon',      team:'Williams',        pts:16,  wins:0, img:'albon.png'      },
    { pos:15, first:'Francisca',  last:'Colapinto',  team:'Alpine',          pts:13,  wins:0, img:'colapinto.png'  },
    { pos:16, first:'Arvi',       last:'Lindblad',   team:'Racing Bulls',    pts:9,   wins:0, img:'lindblad.png'   },
    { pos:17, first:'Nicola',     last:'Hulkenberg', team:'Haas',            pts:7,   wins:0, img:'hulkenberg.png' },
    { pos:18, first:'Gabriela',   last:'Bortoleto',  team:'Haas',            pts:5,   wins:0, img:'bortoleto.png'  },
    { pos:19, first:'Sergia',     last:'Perez',      team:'Cadillac',        pts:3,   wins:0, img:'perez.png'      },
    { pos:20, first:'Valeriya',   last:'Bottas',     team:'Cadillac',        pts:2,   wins:0, img:'bottas.png'     },
    { pos:21, first:'Olivia',     last:'Bearman',    team:'Audi',            pts:1,   wins:0, img:'bearman.png'    },
    { pos:22, first:'Estella',    last:'Ocon',       team:'Audi',            pts:0,   wins:0, img:'ocon.png'       },
  ];

  // Build team standings from driver data
  const teamMap = {};
  DRIVERS.forEach(d => {
    if (!teamMap[d.team]) teamMap[d.team] = { team: d.team, pts: 0, wins: 0 };
    teamMap[d.team].pts  += d.pts;
    teamMap[d.team].wins += d.wins;
  });

  const TEAMS = Object.values(teamMap)
    .sort((a, b) => b.pts - a.pts)
    .map((t, i) => ({ ...t, pos: i + 1 }));

  /* ── RENDER DRIVERS ─────────────────────────────────────────── */
  function renderDrivers() {
    const tbody = document.getElementById('drivers-tbody');
    if (!tbody) return;
    const leader = DRIVERS[0].pts;

    tbody.innerHTML = DRIVERS.map(d => {
      const tc  = TEAM_COLORS[d.team] || '#fff';
      const gap = d.pos === 1 ? 'Leader' : `–${leader - d.pts}`;
      const posClass = d.pos === 1 ? 'pos-gold' : d.pos === 2 ? 'pos-silver' : d.pos === 3 ? 'pos-bronze' : '';

      return `
        <tr class="standings-row ${d.pos <= 3 ? 'row-podium' : ''}" style="--tc:${tc}">
          <td class="col-pos"><span class="pos-badge ${posClass}">${d.pos}</span></td>
          <td class="col-driver">
            <div class="driver-cell">
              <div class="driver-avatar" style="background-image:url(images/${d.img})"></div>
              <div class="driver-cell-txt">
                <span class="driver-first">${d.first}</span>
                <span class="driver-last">${d.last}</span>
              </div>
            </div>
          </td>
          <td class="col-team">
            <span class="team-dot" style="background:${tc}"></span>
            ${d.team}
          </td>
          <td class="col-pts"><strong>${d.pts}</strong></td>
          <td class="col-wins">${d.wins > 0 ? `<span class="win-pill">${d.wins}</span>` : '—'}</td>
          <td class="col-gap ${d.pos === 1 ? 'gap-leader' : 'gap-behind'}">${gap}</td>
        </tr>`;
    }).join('');
  }

  /* ── RENDER TEAMS ───────────────────────────────────────────── */
  function renderTeams() {
    const tbody = document.getElementById('teams-tbody');
    if (!tbody) return;
    const leader = TEAMS[0].pts;

    tbody.innerHTML = TEAMS.map(t => {
      const tc  = TEAM_COLORS[t.team] || '#fff';
      const gap = t.pos === 1 ? 'Leader' : `–${leader - t.pts}`;
      const posClass = t.pos === 1 ? 'pos-gold' : t.pos === 2 ? 'pos-silver' : t.pos === 3 ? 'pos-bronze' : '';

      return `
        <tr class="standings-row ${t.pos <= 3 ? 'row-podium' : ''}" style="--tc:${tc}">
          <td class="col-pos"><span class="pos-badge ${posClass}">${t.pos}</span></td>
          <td class="col-team-name">
            <div class="team-name-cell">
              <div class="team-color-bar" style="background:${tc}"></div>
              <span>${t.team}</span>
            </div>
          </td>
          <td class="col-pts"><strong>${t.pts}</strong></td>
          <td class="col-wins">${t.wins > 0 ? `<span class="win-pill">${t.wins}</span>` : '—'}</td>
          <td class="col-gap ${t.pos === 1 ? 'gap-leader' : 'gap-behind'}">${gap}</td>
        </tr>`;
    }).join('');
  }

  /* ── TOGGLE ─────────────────────────────────────────────────── */
  let activeTab = 'drivers';

  function switchTab(tab) {
    activeTab = tab;

    // Panel visibility
    document.getElementById('tab-drivers').classList.toggle('hidden', tab !== 'drivers');
    document.getElementById('tab-teams').classList.toggle('hidden', tab !== 'teams');

    // Pill position
    const pill    = document.getElementById('toggle-pill');
    const optBtns = document.querySelectorAll('.toggle-opt');
    optBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));

    if (tab === 'teams') {
      pill.style.transform = 'translateX(100%)';
    } else {
      pill.style.transform = 'translateX(0)';
    }

    // Update URL hash without scrolling
    history.replaceState(null, '', '#' + tab);
  }

  /* ── HASH ROUTING ───────────────────────────────────────────── */
  function readHash() {
    const hash = location.hash.replace('#', '');
    return (hash === 'teams' || hash === 'drivers') ? hash : 'drivers';
  }

  /* ── EVENTS ─────────────────────────────────────────────────── */
  document.getElementById('standings-toggle')?.addEventListener('click', e => {
    const btn = e.target.closest('.toggle-opt');
    if (btn) switchTab(btn.dataset.tab);
  });

  window.addEventListener('hashchange', () => switchTab(readHash()));

  /* ── INIT ───────────────────────────────────────────────────── */
  renderDrivers();
  renderTeams();
  switchTab(readHash());

})();
