// =====================================================
// NAVBAR INJECTION
// =====================================================

function loadNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  container.innerHTML = `
  <header class="site-header" id="site-header">
    <a href="index.html" class="header-brand">
      <span style="color:#fff">Formula</span><span style="color:rgb(245,53,170)"> Woman</span>
    </a>

    <nav class="navbar">
      <ul class="menu">
        <li class="item"><a href="index.html">Home</a></li>

        <li class="item dropdown">
          <a href="calendar.html">Calendar</a>
          <ul class="dropdown-menu">
            <li><a href="calendar.html">Full Schedule</a></li>
            <li><a href="calendar.html#previous">Previous Races</a></li>
            <li><a href="calendar.html#upcoming">Upcoming Races</a></li>
          </ul>
        </li>

        <li class="item dropdown">
          <a href="results.html">Results</a>
          <ul class="dropdown-menu">
            <li><a href="driverstandings.html">Driver Standings</a></li>
            <li><a href="teamstandings.html">Team Standings</a></li>
            <li><a href="archives.html">Archive</a></li>
          </ul>
        </li>

        <li class="item dropdown">
          <a href="drivers.html">Drivers</a>
          <ul class="dropdown-menu">
            <li><a href="hamilton.html">Louise Hamilton</a></li>
            <li><a href="leclerc.html">Charlotte Leclerc</a></li>
            <li><a href="drivers.html">All Drivers</a></li>
            <li><a href="halloffame.html">Hall Of Fame</a></li>
          </ul>
        </li>

        <li class="item dropdown">
          <a href="teams.html">Teams</a>
          <ul class="dropdown-menu">
            <li><a href="ferrari.html">Ferrari</a></li>
            <li><a href="mercedes.html">Mercedes</a></li>
            <li><a href="redbullracing.html">Red Bull Racing</a></li>
            <li><a href="mclaren.html">McLaren</a></li>
            <li><a href="williams.html">Williams</a></li>
            <li><a href="astonmartin.html">Aston Martin</a></li>
            <li><a href="alpine.html">Alpine</a></li>
            <li><a href="haas.html">Haas</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <div class="nav-buttons">
      <button onclick="location.href='signin.html'">Sign In</button>
      <button class="subscribe-btn" onclick="location.href='subscribe.html'">Subscribe</button>
    </div>
  </header>
  `;

  initNavbarFeatures();
}


// =====================================================
// HERO INTRO — runs after navbar is injected
// =====================================================

function initNavbarFeatures() {
  const hero   = document.getElementById("site-hero");
  const header = document.getElementById("site-header");

  if (!hero) {
    if (header) header.classList.add("visible");
    return;
  }

  function dismissHero() {
    hero.classList.add("fade-out");
    header.classList.add("visible");
    document.body.classList.remove("intro-active");
    setTimeout(() => hero.classList.add("gone"), 600);
  }

  setTimeout(dismissHero, 2200);
  hero.addEventListener("click", dismissHero);
  // Add this right inside initNavbarFeatures(), after the header reference:
document.querySelectorAll(".item.dropdown").forEach(item => {
  item.addEventListener("mouseenter", () => {
    item.classList.add("is-open");
    document.getElementById("site-header").classList.add("dropdown-open");
  });
  item.addEventListener("mouseleave", () => {
    item.classList.remove("is-open");
    document.getElementById("site-header").classList.remove("dropdown-open");
  });
});
}


// =====================================================
// RACE DATA
// =====================================================

const today = new Date();

const races = [
  { round: 1,  name: "Australia",     date: "2026-02-11", display: "11–13 FEB",       img: "australia.png" },
  { round: 2,  name: "China",         date: "2026-02-18", display: "18–20 FEB",       img: "china.png" },
  { round: 3,  name: "Japan",         date: "2026-03-06", display: "06–08 MAR",       img: "japan.png" },
  { round: 4,  name: "Bahrain",       date: "2026-03-20", display: "20–22 MAR",       img: "bahrain.png" },
  { round: 5,  name: "Saudi Arabia",  date: "2026-04-03", display: "03–05 APR",       img: "saudi.png" },
  { round: 6,  name: "Miami",         date: "2026-05-01", display: "01–03 MAY",       img: "miami.png" },
  { round: 7,  name: "Canada",        date: "2026-05-22", display: "22–24 MAY",       img: "canada.png" },
  { round: 8,  name: "Monaco",        date: "2026-06-05", display: "05–07 JUN",       img: "monaco.png" },
  { round: 9,  name: "Barcelona",     date: "2026-06-19", display: "19–21 JUN",       img: "barcelona.png" },
  { round: 10, name: "Austria",       date: "2026-06-26", display: "26–28 JUN",       img: "austria.png" },
  { round: 11, name: "Great Britain", date: "2026-07-10", display: "10–12 JUL",       img: "britain.png" },
  { round: 12, name: "Belgium",       date: "2026-09-18", display: "18–20 SEP",       img: "belgium.png" },
  { round: 13, name: "Hungary",       date: "2026-09-25", display: "25–27 SEP",       img: "hungary.png" },
  { round: 14, name: "Netherlands",   date: "2026-10-16", display: "16–18 OCT",       img: "netherlands.png" },
  { round: 15, name: "Italy (Imola)", date: "2026-10-30", display: "30 OCT – 01 NOV", img: "italy.png" },
  { round: 16, name: "Spain",         date: "2026-11-06", display: "06–08 NOV",       img: "spain.png" },
  { round: 17, name: "Azerbaijan",    date: "2026-11-19", display: "19–21 NOV",       img: "azerbaijan.png" },
  { round: 18, name: "Singapore",     date: "2026-11-27", display: "27–29 NOV",       img: "singapore.png" },
  { round: 19, name: "USA (COTA)",    date: "2026-12-04", display: "04–06 DEC",       img: "usa.png" },
  { round: 20, name: "Mexico",        date: "2026-12-11", display: "11–13 DEC",       img: "mexico.png" },
  { round: 21, name: "Brazil",        date: "2026-12-18", display: "18–20 DEC",       img: "brazil.png" },
  { round: 22, name: "Las Vegas",     date: "2026-12-25", display: "25–27 DEC",       img: "lasvegas.png" },
  { round: 23, name: "Qatar",         date: "2027-01-08", display: "08–10 JAN",       img: "qatar.png" },
  { round: 24, name: "Abu Dhabi",     date: "2027-01-15", display: "15–17 JAN",       img: "abudhabi.png" }
];

races.sort((a, b) => new Date(a.date) - new Date(b.date));

let next = null;

for (let i = 0; i < races.length; i++) {
  if (new Date(races[i].date) >= today) {
    next = races[i];
    break;
  }
}


// =====================================================
// HOMEPAGE COUNTDOWN
// =====================================================

function initHomepageCountdown() {
  if (!next) return;

  const nameEl = document.getElementById("countdown-race-name");
  if (!nameEl) return; // only runs on index.html

  document.getElementById("countdown-race-name").textContent = next.name;
  document.getElementById("countdown-date").textContent      = next.display;
  document.getElementById("countdown-round").textContent     = "ROUND " + next.round;

  const raceDate = new Date(next.date);

  function pad(n) { return String(n).padStart(2, "0"); }

  function tick() {
    const diff = raceDate - new Date();
    if (diff <= 0) {
      ["cd-days","cd-hours","cd-mins","cd-secs"].forEach(id => {
        document.getElementById(id).textContent = "00";
      });
      return;
    }
    document.getElementById("cd-days").textContent  = pad(Math.floor(diff / 86400000));
    document.getElementById("cd-hours").textContent = pad(Math.floor((diff / 3600000) % 24));
    document.getElementById("cd-mins").textContent  = pad(Math.floor((diff / 60000) % 60));
    document.getElementById("cd-secs").textContent  = pad(Math.floor((diff / 1000) % 60));
  }

  tick();
  setInterval(tick, 1000);
}


// =====================================================
// INIT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
  loadNavbar();            // inject navbar (and hero dismiss) everywhere
  initHomepageCountdown(); // only fires if countdown IDs exist (index.html)
});
