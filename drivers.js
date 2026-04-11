// =====================================================
// DRIVERS.JS
// Builds the driver grid on drivers.html
// =====================================================

const driverData = [
  // Sorted by championship points (descending)
  { number: 1,  firstName: "Maya",      lastName: "Verstappen",  team: "Red Bull",     teamSlug: "redbullracing", color: "#3671C6", colorDark: "#1a2e70", nationality: "🇳🇱", points: 75 },
  { number: 16, firstName: "Charlotte", lastName: "Leclerc",     team: "Ferrari",      teamSlug: "ferrari",       color: "#E8002D", colorDark: "#7a0015", nationality: "🇲🇨", points: 61 },
  { number: 44, firstName: "Louise",    lastName: "Hamilton",    team: "Mercedes",     teamSlug: "mercedes",      color: "#27F4D2", colorDark: "#0a5e52", nationality: "🇬🇧", points: 52 },
  { number: 4,  firstName: "Lara",      lastName: "Norris",      team: "McLaren",      teamSlug: "mclaren",       color: "#FF8000", colorDark: "#6b3400", nationality: "🇬🇧", points: 44 },
  { number: 63, firstName: "Sofia",     lastName: "Russell",     team: "Mercedes",     teamSlug: "mercedes",      color: "#27F4D2", colorDark: "#0a5e52", nationality: "🇩🇪", points: 38 },
  { number: 81, firstName: "Olivia",    lastName: "Piastri",     team: "McLaren",      teamSlug: "mclaren",       color: "#FF8000", colorDark: "#6b3400", nationality: "🇦🇺", points: 33 },
  { number: 55, firstName: "Elena",     lastName: "Sainz",       team: "Ferrari",      teamSlug: "ferrari",       color: "#E8002D", colorDark: "#7a0015", nationality: "🇪🇸", points: 29 },
  { number: 22, firstName: "Yuki",      lastName: "Tanaka",      team: "Red Bull",     teamSlug: "redbullracing", color: "#3671C6", colorDark: "#1a2e70", nationality: "🇯🇵", points: 18 },
  { number: 10, firstName: "Eva",       lastName: "Gasly",       team: "Alpine",       teamSlug: "alpine",        color: "#FF87BC", colorDark: "#7a1040", nationality: "🇫🇷", points: 15 },
  { number: 14, firstName: "Alicia",    lastName: "Alonso",      team: "Aston Martin", teamSlug: "astonmartin",   color: "#229971", colorDark: "#0c4030", nationality: "🇪🇸", points: 12 },
  { number: 23, firstName: "Lucia",     lastName: "Albon",       team: "Williams",     teamSlug: "williams",      color: "#64C4FF", colorDark: "#0a3d60", nationality: "🇹🇭", points: 9  },
  { number: 18, firstName: "Valentina", lastName: "Stroll",      team: "Aston Martin", teamSlug: "astonmartin",   color: "#229971", colorDark: "#0c4030", nationality: "🇨🇦", points: 8  },
  { number: 20, firstName: "Nadia",     lastName: "Magnussen",   team: "Haas",         teamSlug: "haas",          color: "#B6BABD", colorDark: "#3a3c3e", nationality: "🇩🇰", points: 7  },
  { number: 31, firstName: "Chloe",     lastName: "Ocon",        team: "Alpine",       teamSlug: "alpine",        color: "#FF87BC", colorDark: "#7a1040", nationality: "🇫🇷", points: 6  },
  { number: 27, firstName: "Isabelle",  lastName: "Hulkenberg",  team: "Haas",         teamSlug: "haas",          color: "#B6BABD", colorDark: "#3a3c3e", nationality: "🇩🇪", points: 5  },
  { number: 2,  firstName: "Priya",     lastName: "Sargeant",    team: "Williams",     teamSlug: "williams",      color: "#64C4FF", colorDark: "#0a3d60", nationality: "🇺🇸", points: 4  },
];

document.addEventListener("DOMContentLoaded", () => {

  const grid    = document.getElementById("drv-grid");
  const filters = document.getElementById("drv-filters");
  if (!grid) return;

  // ── BUILD TEAM FILTER BUTTONS ────────────────────────────
  const teams = [...new Set(driverData.map(d => d.team))];
  teams.forEach(team => {
    const btn = document.createElement("button");
    btn.className = "shop-filter-btn";
    btn.dataset.team = team;
    btn.textContent = team;
    filters.appendChild(btn);
  });

  // ── BUILD DRIVER CARDS ───────────────────────────────────
  driverData.forEach(d => {
    // Gradient: dark team color bottom-left → team color top-right
    const bg = `linear-gradient(145deg, ${d.colorDark} 0%, ${d.color}55 55%, ${d.colorDark}cc 100%)`;

    const card = document.createElement("div");
    card.className = "drv-card";
    card.dataset.team = d.team;
    card.style.background = bg;

    card.innerHTML = `
      <div class="drv-card-overlay"></div>
      <div class="drv-number-bg">${d.number}</div>

      <div class="drv-points-badge">
        <span class="drv-points-num">${d.points}</span>
        <span class="drv-points-label">pts</span>
      </div>

      <div class="drv-card-content">
        <span class="drv-nat">${d.nationality}</span>
        <span class="drv-first-name">${d.firstName}</span>
        <span class="drv-last-name">${d.lastName}</span>
        <span class="drv-team-pill">
          <span class="drv-team-dot" style="background:${d.color}"></span>
          ${d.team}
        </span>
      </div>
    `;

    grid.appendChild(card);
  });

  // ── FILTER LOGIC ─────────────────────────────────────────
  document.querySelectorAll(".shop-filter-btn[data-team]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".shop-filter-btn[data-team]").forEach(b =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      const selectedTeam = btn.dataset.team;
      document.querySelectorAll(".drv-card").forEach(card => {
        card.dataset.hidden =
          (selectedTeam !== "all" && card.dataset.team !== selectedTeam)
            ? "true"
            : "false";
      });
    });
  });

});
