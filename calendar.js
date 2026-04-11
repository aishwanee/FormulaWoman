// =====================================================
// CALENDAR.JS
// Depends on: races, next (globals from navbar.js)
// =====================================================

const calFlags = {
  "Australia":     "🇦🇺",
  "China":         "🇨🇳",
  "Japan":         "🇯🇵",
  "Bahrain":       "🇧🇭",
  "Saudi Arabia":  "🇸🇦",
  "Miami":         "🇺🇸",
  "Canada":        "🇨🇦",
  "Monaco":        "🇲🇨",
  "Barcelona":     "🇪🇸",
  "Austria":       "🇦🇹",
  "Great Britain": "🇬🇧",
  "Belgium":       "🇧🇪",
  "Hungary":       "🇭🇺",
  "Netherlands":   "🇳🇱",
  "Italy (Imola)": "🇮🇹",
  "Spain":         "🇪🇸",
  "Azerbaijan":    "🇦🇿",
  "Singapore":     "🇸🇬",
  "USA (COTA)":    "🇺🇸",
  "Mexico":        "🇲🇽",
  "Brazil":        "🇧🇷",
  "Las Vegas":     "🇺🇸",
  "Qatar":         "🇶🇦",
  "Abu Dhabi":     "🇦🇪"
};

// Fictional podium results for completed rounds (1–5)
const calPodiums = {
  1: { p1: "M. Verstappen", p2: "C. Leclerc",  p3: "L. Hamilton" },
  2: { p1: "L. Hamilton",   p2: "L. Norris",   p3: "M. Verstappen" },
  3: { p1: "C. Leclerc",    p2: "L. Hamilton", p3: "S. Russell" },
  4: { p1: "M. Verstappen", p2: "C. Leclerc",  p3: "O. Piastri" },
  5: { p1: "L. Norris",     p2: "L. Hamilton", p3: "C. Leclerc" }
};

document.addEventListener("DOMContentLoaded", () => {

  // ── NEXT RACE BANNER ────────────────────────────────────────
  const banner = document.getElementById("cal-next-banner");

  if (next && banner) {
    banner.innerHTML = `
      <div class="cal-next-inner">
        <div>
          <span class="cal-next-eyebrow">Next Race · Round ${next.round}</span>
          <span class="cal-next-flag">${calFlags[next.name] || "🏁"}</span>
          <h2 class="cal-next-name">${next.name}</h2>
          <p class="cal-next-meta">${next.display}</p>
        </div>
        <div class="cal-next-timer">
          <div class="cal-nt-unit"><span id="cnt-d">00</span><small>Days</small></div>
          <span class="cal-nt-sep">:</span>
          <div class="cal-nt-unit"><span id="cnt-h">00</span><small>Hours</small></div>
          <span class="cal-nt-sep">:</span>
          <div class="cal-nt-unit"><span id="cnt-m">00</span><small>Mins</small></div>
          <span class="cal-nt-sep">:</span>
          <div class="cal-nt-unit"><span id="cnt-s">00</span><small>Secs</small></div>
        </div>
      </div>
    `;

    function pad(n) { return String(n).padStart(2, "0"); }

    function tickBanner() {
      const diff = new Date(next.date) - new Date();
      if (diff <= 0) return;
      document.getElementById("cnt-d").textContent = pad(Math.floor(diff / 86400000));
      document.getElementById("cnt-h").textContent = pad(Math.floor((diff / 3600000) % 24));
      document.getElementById("cnt-m").textContent = pad(Math.floor((diff / 60000) % 60));
      document.getElementById("cnt-s").textContent = pad(Math.floor((diff / 1000) % 60));
    }

    tickBanner();
    setInterval(tickBanner, 1000);
  }

  // ── RACE CARDS ───────────────────────────────────────────────
  const grid = document.getElementById("cal-grid");
  if (!grid || typeof races === "undefined") return;

  const todayMs = new Date();

  races.forEach(race => {
    const raceDate  = new Date(race.date);
    const isDone    = raceDate < todayMs;
    const isNext    = next && race.round === next.round;
    const pod       = calPodiums[race.round];
    const flag      = calFlags[race.name] || "🏁";

    const card = document.createElement("div");
    card.className = [
      "cal-card",
      isDone   ? "cal-card-done" : "",
      isNext   ? "cal-card-next" : ""
    ].join(" ").trim();

    card.dataset.filter = isDone ? "completed" : "upcoming";

    // Badge
    let badge = "";
    if (isNext) {
      badge = `<span class="cal-badge cal-badge-next">Next Race</span>`;
    } else if (isDone) {
      badge = `<span class="cal-badge cal-badge-done">Completed</span>`;
    } else {
      badge = `<span class="cal-badge cal-badge-upcoming">Upcoming</span>`;
    }

    // Podium (only for completed races that have results)
    let podiumHTML = "";
    if (isDone && pod) {
      podiumHTML = `
        <div class="cal-podium">
          <div class="cal-pod-item cal-pod-1">
            <span class="cal-pod-pos">1st</span>
            <span class="cal-pod-name">${pod.p1}</span>
          </div>
          <div class="cal-pod-item cal-pod-2">
            <span class="cal-pod-pos">2nd</span>
            <span class="cal-pod-name">${pod.p2}</span>
          </div>
          <div class="cal-pod-item cal-pod-3">
            <span class="cal-pod-pos">3rd</span>
            <span class="cal-pod-name">${pod.p3}</span>
          </div>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="cal-card-header">
        <span class="cal-card-round">Round ${race.round}</span>
        <span class="cal-card-dates">${isDone ? "🏁 " : ""}${race.display}</span>
      </div>
      <div class="cal-card-body">
        <span class="cal-card-flag">${flag}</span>
        <h3 class="cal-card-name">${race.name}</h3>
        ${badge}
      </div>
      ${podiumHTML}
    `;

    grid.appendChild(card);
  });

  // ── FILTER BUTTONS ──────────────────────────────────────────
  document.querySelectorAll(".shop-filter-btn[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".shop-filter-btn[data-filter]").forEach(b =>
        b.classList.remove("active")
      );
      btn.classList.add("active");

      const f = btn.dataset.filter;
      document.querySelectorAll(".cal-card").forEach(c => {
        c.style.display = (f === "all" || c.dataset.filter === f) ? "" : "none";
      });
    });
  });

});
