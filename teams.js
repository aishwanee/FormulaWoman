// =====================================================
// TEAMS.JS
// Builds the constructor grid on teams.html
// =====================================================

const teamData = [
  // Sorted by constructor points (descending)
  {
    name:      "Red Bull Racing",
    slug:      "redbullracing",
    color:     "#3671C6",
    colorDark: "#0a1540",
    initial:   "RB",
    drivers:   ["Maya Verstappen", "Yuki Tanaka"],
    points:    93
  },
  {
    name:      "Ferrari",
    slug:      "ferrari",
    color:     "#E8002D",
    colorDark: "#4d0010",
    initial:   "SF",
    drivers:   ["Charlotte Leclerc", "Elena Sainz"],
    points:    90
  },
  {
    name:      "Mercedes",
    slug:      "mercedes",
    color:     "#27F4D2",
    colorDark: "#052e28",
    initial:   "M",
    drivers:   ["Louise Hamilton", "Sofia Russell"],
    points:    90
  },
  {
    name:      "McLaren",
    slug:      "mclaren",
    color:     "#FF8000",
    colorDark: "#3d1e00",
    initial:   "MC",
    drivers:   ["Lara Norris", "Olivia Piastri"],
    points:    77
  },
  {
    name:      "Alpine",
    slug:      "alpine",
    color:     "#FF87BC",
    colorDark: "#2a0520",
    initial:   "A",
    drivers:   ["Eva Gasly", "Chloe Ocon"],
    points:    21
  },
  {
    name:      "Aston Martin",
    slug:      "astonmartin",
    color:     "#229971",
    colorDark: "#061e16",
    initial:   "AM",
    drivers:   ["Alicia Alonso", "Valentina Stroll"],
    points:    20
  },
  {
    name:      "Williams",
    slug:      "williams",
    color:     "#64C4FF",
    colorDark: "#031828",
    initial:   "W",
    drivers:   ["Lucia Albon", "Priya Sargeant"],
    points:    13
  },
  {
    name:      "Haas",
    slug:      "haas",
    color:     "#B6BABD",
    colorDark: "#1a1c1e",
    initial:   "H",
    drivers:   ["Nadia Magnussen", "Isabelle Hulkenberg"],
    points:    12
  }
];

document.addEventListener("DOMContentLoaded", () => {

  const grid = document.getElementById("team-grid");
  if (!grid) return;

  teamData.forEach(t => {
    // Rich gradient: dark at bottom, colour accent in upper-middle
    const bg = `linear-gradient(155deg, ${t.colorDark} 0%, ${t.color}44 50%, ${t.colorDark}ee 100%)`;

    const card = document.createElement("div");
    card.className = "team-card";
    card.style.background = bg;

    // Optional: link to individual team page if it exists
    // card.onclick = () => location.href = `${t.slug}.html`;

    const driversHTML = t.drivers.map(name => `
      <div class="team-driver">
        <span class="team-driver-dot" style="background:${t.color}99"></span>
        ${name}
      </div>
    `).join("");

    card.innerHTML = `
      <div class="team-card-overlay"></div>
      <div class="team-big-name">${t.name.split(" ")[0].toUpperCase()}</div>

      <div class="team-card-logo" style="border-color:${t.color}55; color:${t.color}cc;">${t.initial}</div>

      <div class="team-card-content">
        <span class="team-name">${t.name}</span>
        <div class="team-drivers">${driversHTML}</div>
        <div class="team-points-row">
          <span class="team-pts-num" style="color:${t.color}">${t.points}</span>
          <span class="team-pts-label">pts</span>
        </div>
      </div>

      <div class="team-card-stripe" style="background:${t.color}"></div>
    `;

    grid.appendChild(card);
  });

});
