// ─────────────────────────────────────────────────────────────────────────────
// URL ROUTING
// ─────────────────────────────────────────────────────────────────────────────

const URL_ROUTES = [
  { prefix: "www.reddit.com/r/",              start: 17,  captureR: true,  handler: (n, r) => prepReddit(n, r) },
  { prefix: "www.dropbox.com/sh/",            start: 19,  handler: (n)    => prepDropbox(n) },
  { prefix: "www.twitter.com/",               start: 16,  captureR: true,  handler: (n, r) => prepTwitter(n, r) },
  { prefix: "www.x.com/",                     start: 10,  captureR: true,  handler: (n, r) => prepX(n, r) },
  { prefix: "www.pastebin.com/",              start: 17,  handler: (n)    => prepPastebin(n) },
  { prefix: "boards.4chan.org/",              start: 17, captureR: true, handler: (n, r) => prep4Chan(n, r) },
  { prefix: "imgur.com/gallery/",             start: 18,  captureR: true,  handler: (n, r) => prepImgur(n, r) },
  { prefix: "www.nytimes.com/games/wordle/",  start: 29,  handler: (n)    => prepWordle(n) },
  { prefix: "www.nytimes.com/games/crossword/",start:34,  handler: (n)    => prepCrossword(n) },
  { prefix: "www.nytimes.com/games/masyu/",    start: 28,  handler: (n)    => prepMasyu(n) },
  { prefix: "www.quizzington.org/fliers/sequence/", start: 36, captureR: true, handler: (n, r) => prepQuizzington(n, r, "sequence") },
  { prefix: "www.quizzington.org/fliers/find8/",    start: 33, captureR: true, handler: (n, r) => prepQuizzington(n, r, "find8") },
  { prefix: "www.quizzington.org/fliers/numbers/",  start: 35, captureR: true, handler: (n, r) => prepQuizzington(n, r, "numbers") },
  { prefix: "www.quizzington.org/fliers/static/",   start: 35, captureR: true, handler: (n, r) => prepQuizzington(n, r, "static") },
  { prefix: "www.quizzington.org/fliers/colorbynumber/",   start: 41, captureR: true, handler: (n, r) => prepQuizzington(n, r, "colorbynumber") },
];

async function parseURL(val, chars, routes, input) {
  if (state.play) return;

  const exactRoutes = {
    "www.cicada3301solved.com": toolTips,
    "www.asciicaesarcipher.com": prepCaesar,
    "pizza.net": prepPizza,
    "decryptpgp.com": prepDecryptPGP,
    "midi.helper": prepMidiHelper,
    "outguess.helper": prepOutguessHelper,
    "test.local": prepDownloadTest,
  };
  if (exactRoutes[val]) { exactRoutes[val](); return; }

  for (const { prefix, start, captureR, handler } of routes) {
    if (!val.startsWith(prefix)) continue;
    let seed = 0, r = "", valid = false;
    for (let i = start; i < val.length; i++) {
      if (chars.indexOf(val[i]) === -1) break;
      seed += chars.indexOf(val[i]);
      if (captureR) r += val[i];
      if (i === val.length - 1) valid = true;
    }
    if (valid) {
      const snap = html.innerHTML;
      const snapTitle = document.getElementById("win-title")?.textContent || "Back";
      pushHistory(snapTitle, () => { html.innerHTML = snap; });
      state.traversals++;
      handler(seed % 2147483647, r);
    }
    else await showInputError(input, "Link contains invalid character.");
    return;
  }

  const isNumCom = val.endsWith(".com") && /^\d+$/.test(val.slice(0, -4));
  if (isNumCom) {
    let seed = 0, valid = false;
    for (let i = 0; i < val.length - 4; i++) { seed += parseInt(val[i]); if (i === val.length - 5) valid = true; }
    if (valid) {
      const snap = html.innerHTML;
      const snapTitle = document.getElementById("win-title")?.textContent || "Back";
      pushHistory(snapTitle, () => { html.innerHTML = snap; });
      state.traversals++;
      prepProductWebsite(seed % 2147483647);
    }
    else await showInputError(input, "Link contains invalid character.");
    return;
  }

  await showInputError(input, "Not a valid link.");
}

async function searchGoogle() {
  if (state.play) return;
  const input = document.getElementById("googleLink");
  const val = input?.value.trim();
  if (!val) return;
  const app = document.getElementById("webApp");
  if (!app) return;

  // Validate the link before touching the DOM, so errors can be shown in the input field
  const isExact   = !!({
    "www.cicada3301solved.com": 1, "www.asciicaesarcipher.com": 1,
    "pizza.net": 1, "decryptpgp.com": 1, "midi.helper": 1, "outguess.helper": 1,
    "test.local": 1,
  }[val]);
  const isRoute   = URL_ROUTES.some(({ prefix }) => val.startsWith(prefix));
  const isNumCom  = val.endsWith(".com") && /^\d+$/.test(val.slice(0, -4));
  const isKnown   = isExact || isRoute || isNumCom;

  if (!isKnown) {
    await showInputError(input, "Not a valid link.");
    return;
  }

  // Link is navigable — show the SERP animation then route
  const serpSnippets = googleFakeSERP(val);
  app.innerHTML = `
    <div class="goog-serp-wrap">
      <div class="goog-serp-query">
        <span class="goog-search-icon" style="margin-right:6px">&#128269;</span>
        <span style="font-size:11px;color:#202124">${val}</span>
      </div>
      <div style="font-size:8px;color:#70757a;padding:4px 0 6px">About ${(Math.floor(Math.random()*900)+100).toLocaleString()},000 results (${(Math.random()*0.8+0.2).toFixed(2)} seconds)</div>
      ${serpSnippets}
    </div>`;

  await delay(1000);

  const snap = html.innerHTML;
  pushHistory("Google", () => { html.innerHTML = snap; });
  await parseURL(val, WEBSITE_CHARS, URL_ROUTES, input);
}

function googleFakeSERP(val) {
  // Derive a platform label and fake results from the URL
  const platform =
    val.includes("reddit.com")      ? { name: "Reddit",    color: "#ff4500" } :
    val.includes("4chan.org")        ? { name: "4chan",      color: "#006600" } :
    val.includes("imgur.com")        ? { name: "Imgur",     color: "#1bb76e" } :
    val.includes("pastebin.com")     ? { name: "Pastebin",  color: "#02a5e0" } :
    val.includes("twitter.com")      ? { name: "Twitter",   color: "#1d9bf0" } :
    val.includes("x.com")            ? { name: "X",         color: "#000"    } :
    val.includes("dropbox.com")      ? { name: "Dropbox",   color: "#0061ff" } :
    val.includes("nytimes.com")      ? { name: "NYT Games", color: "#000"    } :
    val.includes("quizzington.org")  ? { name: "Quizzington", color: "#4a6cf7" } :
    val.includes("pizza.net")        ? { name: "Pizza.NET", color: "#c0392b" } :
    val.includes("cicada3301solved") ? { name: "Cicada3301Solved", color: "#4aff4a" } :
    val.includes("asciicaesarcipher")? { name: "ASCIICaesarCipher", color: "#333" } :
    val.includes("decryptpgp")       ? { name: "DecryptPGP", color: "#333"   } :
    val.includes("midi.helper")      ? { name: "MIDI Helper", color: "#e74c3c" } :
    val.includes("outguess.helper")  ? { name: "Outguess Helper", color: "#8e44ad" } :
    val.includes("test.local")       ? { name: "Local Test Tool", color: "#666"    } :
                                       { name: val.split("/")[0], color: "#333" };

  const snippets = [
    { title: `${platform.name} — ${val}`, url: val, desc: `Visit the page at ${val}. Community-verified link shared across multiple ARG forums.` },
    { title: `${platform.name} ARG Discussion — cicada3301solved.com`, url: "www.cicada3301solved.com", desc: `Users have been tracking this link. See the wiki for known cipher methods and decoding tips.` },
    { title: `[Archived] ${val} — web.archive.org`, url: `web.archive.org/web/*/${val}`, desc: `Archived snapshots of this URL. Last crawled recently. May contain earlier versions of the content.` },
  ];

  return snippets.map(s => `
    <div class="goog-serp-result">
      <div class="goog-serp-site">
        <div class="goog-serp-favicon" style="background:${platform.color}">${platform.name[0]}</div>
        <div>
          <div class="goog-serp-domain">${s.url.split("/")[0]}</div>
          <div class="goog-serp-url">${s.url.length > 50 ? s.url.slice(0,50)+"…" : s.url}</div>
        </div>
      </div>
      <div class="goog-serp-title">${s.title}</div>
      <div class="goog-serp-desc">${s.desc}</div>
    </div>`).join("");
}

async function searchOnion() {
  const val   = document.getElementById("onionLink").value;
  const input = document.getElementById("onionLink");
  if (state.play || !val.endsWith(".onion")) { if (!state.play) await showInputError(input, "Not a valid link."); return; }

  if (val === "liberprimus.onion") {
    const snap = html.innerHTML;
    pushHistory("Tor Browser", () => { html.innerHTML = snap; });
    prepLiberHelp();
    return;
  }
  if (val === "tormail.onion") {
    const snap = html.innerHTML;
    pushHistory("Tor Browser", () => { html.innerHTML = snap; });
    prepTormail();
    return;
  }

  const slug = val.slice(0, -6);
  const chars = RULESEED_CHARS;
  const validLen = slug.length === 16 || slug.length === 56;
  if (!validLen) { await showInputError(input, "Not a valid .onion link."); return; }

  let seed = 0;
  for (let i = 0; i < slug.length; i++) {
    if (chars.indexOf(slug[i]) === -1) { await showInputError(input, "Link contains invalid character."); return; }
    seed += chars.indexOf(slug[i]);
  }
  seed %= 2147483647;

  // Read the slug value NOW before torCircuitAnimation wipes the DOM
  const displaySlug = val;

  // Tor circuit animation
  const snap = html.innerHTML;
  pushHistory("Tor Browser", () => { html.innerHTML = snap; });
  await torCircuitAnimation(val);

  if (slug.length === 16) { state.traversals++; prepOnion(seed, displaySlug); }
  else prepPrimus(seed);
}

// ─────────────────────────────────────────────────────────────────────────────
// TOR CIRCUIT ANIMATION
// ─────────────────────────────────────────────────────────────────────────────

async function torCircuitAnimation(destination) {
  const circuitHTML = `
    <div style="background:#0d0020;padding:14px;font-family:'Courier New',monospace;color:#c090ff;min-height:200px">
      <div style="font-size:9px;color:#9060d0;letter-spacing:2px;margin-bottom:12px">&#127376; ESTABLISHING TOR CIRCUIT...</div>
      <div id="tor-circuit-nodes" style="display:flex;flex-direction:column;gap:10px"></div>
      <div id="tor-circuit-dest" style="margin-top:12px;font-size:8px;color:#5a3080;letter-spacing:1px;word-break:break-all"></div>
    </div>`;
  const webApp = document.getElementById("webApp");
  if (webApp) {
    webApp.innerHTML = circuitHTML;
  } else {
    // Tor browser writes directly to html — preserve the titlebar, replace the body
    html.innerHTML = `${windowBar()}<div id="webApp" style="background:#0d0020">${circuitHTML}</div>`;
  }
  const relays = [
    { label: "Guard Node",  ip: fakeIP() },
    { label: "Middle Node", ip: fakeIP() },
    { label: "Exit Node",   ip: fakeIP() },
  ];
  const nodesEl = document.getElementById("tor-circuit-nodes");
  const destEl  = document.getElementById("tor-circuit-dest");
  for (let i = 0; i < relays.length; i++) {
    await delay(550);
    if (!nodesEl) break;
    nodesEl.innerHTML += `
      <div style="display:flex;align-items:center;gap:8px;animation:notif-in 0.2s ease">
        ${i > 0 ? `<div style="width:2px;height:10px;background:#5a3080;margin-left:10px;margin-top:-12px;margin-bottom:-2px"></div>` : ""}
        <div style="width:10px;height:10px;border-radius:50%;background:#7d00c8;box-shadow:0 0 6px #7d00c8;flex-shrink:0"></div>
        <div>
          <div style="font-size:9px;color:#c090ff">${relays[i].label}</div>
          <div style="font-size:8px;color:#5a3080">${relays[i].ip}</div>
        </div>
        <div style="margin-left:auto;font-size:8px;color:#4aaa4a">&#10003; encrypted</div>
      </div>`;
  }
  await delay(400);
  if (destEl) destEl.textContent = `\u2192 ${destination}`;
  await delay(300);
}

function fakeIP() {
  return Array.from({length:4}, () => Math.floor(Math.random()*255)+1).join(".");
}

function loadProgram(closeFunc = "closeApp") {
  html.innerHTML = `${windowBar(closeFunc)}<div id="webApp" style="background-color:#000000;"></div>`;
}

function startDesktopClock() {
  if (desktopClockInterval) { clearInterval(desktopClockInterval); desktopClockInterval = null; }
  desktopClockInterval = setInterval(() => {
    const el = document.getElementById("desktop-clock-time");
    if (!el) { clearInterval(desktopClockInterval); desktopClockInterval = null; return; }
    el.textContent = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  }, 1000);

  // Attach right-click context menu to wallpaper
  const wallpaper = document.querySelector(".dt-wallpaper");
  if (wallpaper) {
    wallpaper.addEventListener("contextmenu", e => {
      e.preventDefault();
      showDesktopContextMenu(e, wallpaper);
    });
  }
  // Dismiss context menu on any click
  document.addEventListener("click", dismissDesktopContextMenu, { once: false });
}

function showDesktopContextMenu(e, wallpaper) {
  dismissDesktopContextMenu();

  const items = [
    { label: "&#128260; Refresh Desktop",    action: "closeApp()" },
    { label: "&#128202; Network Monitor",     action: "loadNetworkMonitor()" },
    { label: "&#128193; Open Downloads",      action: "loadDownloads()" },
    { divider: true },
    { label: "&#8505;&#65039; About This PC", action: "showAboutPC()" },
  ];

  const os     = detectOS();
  const isMac  = os === "mac";
  const isLinux= os === "linux";
  const menuBg = isMac ? "rgba(40,40,40,0.97)" : isLinux ? "#2d2d2d" : "#2b2b2b";
  const border = isMac ? "rgba(255,255,255,0.15)" : isLinux ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.12)";
  // Hover accent matches that OS's real menu highlight instead of a shared
  // neon-green tint: macOS/Windows use a soft neutral hover, GNOME uses its
  // actual Adwaita blue.
  const hoverBg   = isLinux ? "#3584e4" : "rgba(255,255,255,0.1)";
  const hoverText = isLinux ? "#fff" : "#fff";

  const itemsHTML = items.map(item => {
    if (item.divider) return `<div style="border-top:1px solid ${border};margin:3px 0"></div>`;
    return `<div class="ctx-item" onclick="${item.action};dismissDesktopContextMenu()">${item.label}</div>`;
  }).join("");

  // Inject ctx-item style once, then keep its hover colors in sync with the
  // current OS via CSS variables set on the menu element itself.
  if (!document.getElementById("ctx-style")) {
    const s = document.createElement("style");
    s.id = "ctx-style";
    s.textContent = `
      .ctx-item { padding:5px 14px; cursor:pointer; color:#e0e0ff; white-space:nowrap; }
      .ctx-item:hover { background:var(--ctx-hover-bg, rgba(255,255,255,0.1)); color:var(--ctx-hover-text, #fff); }`;
    document.head.appendChild(s);
  }

  const menu = document.createElement("div");
  menu.id = "desktop-ctx-menu";
  menu.style.cssText = `
    position:absolute; z-index:999999;
    background:${menuBg}; border:1px solid ${border};
    border-radius:6px; padding:4px 0;
    box-shadow:0 8px 24px rgba(0,0,0,0.5);
    font-family:'Segoe UI',Arial,sans-serif; font-size:10px;
    min-width:160px; user-select:none;
    animation:notif-in 0.12s ease;
    --ctx-hover-bg:${hoverBg}; --ctx-hover-text:${hoverText};
  `;
  menu.innerHTML = itemsHTML;

  // Wallpaper must be positioned so absolute children are relative to it
  wallpaper.style.position = "relative";
  wallpaper.appendChild(menu);

  // Calculate click position relative to wallpaper
  const wrect = wallpaper.getBoundingClientRect();
  const mw    = menu.offsetWidth;
  const mh    = menu.offsetHeight;
  let   left  = e.clientX - wrect.left;
  let   top   = e.clientY - wrect.top;

  // Clamp so menu stays inside wallpaper
  if (left + mw > wrect.width)  left = wrect.width  - mw - 4;
  if (top  + mh > wrect.height) top  = wrect.height - mh - 4;
  if (left < 0) left = 4;
  if (top  < 0) top  = 4;

  menu.style.left = left + "px";
  menu.style.top  = top  + "px";
}

function dismissDesktopContextMenu() {
  const m = document.getElementById("desktop-ctx-menu");
  if (m) m.remove();
}

// A real About/System-Properties panel looks quite different per OS (macOS:
// centered icon + name + thin spec rows + one pill button; Windows: a plain
// left-aligned settings-style page with OK bottom-right; GNOME: a rounded
// Adwaita card, centered, one accent button) — so unlike the old version,
// which was one dark neon-terminal box everywhere, this now branches on
// detectOS() the same way the rest of the desktop chrome does.
function showAboutPC() {
  dismissDesktopContextMenu();
  const os      = detectOS();
  const upSecs  = Math.floor((Date.now() - (state.loginTime?.getTime() || Date.now())) / 1000);
  const upMins  = Math.floor(upSecs / 60), upS = upSecs % 60;
  const uptime  = `${upMins}m ${upS}s`;
  const user    = state.userID > 0 ? USERS[state.userID - 1] : "unknown";
  const rows = [
    ["Version", "3.3.01"],
    ["User", user],
    ["Uptime", uptime],
    ["Traversals", String(state.traversals)],
    ["Tor status", "Active"],
    ["Encryption", "AES-256 / PGP"],
  ];

  const overlay = document.createElement("div");
  overlay.id = "about-overlay";
  overlay.style.cssText = `position:fixed; inset:0; z-index:999998; background:rgba(0,0,0,0.4); display:flex; align-items:center; justify-content:center;`;
  overlay.innerHTML = `<div class="about-pc about-pc-${os}">${aboutPCContent(os, rows)}</div>`;
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function aboutPCContent(os, rows) {
  const rowsHTML = rows.map(([label, val]) => `<div class="about-pc-row"><span class="about-pc-label">${label}</span><span class="about-pc-val">${val}</span></div>`).join("");

  if (os === "mac") {
    return `
      <div class="about-pc-icon">&#128187;</div>
      <div class="about-pc-name">CICADA_OS</div>
      <div class="about-pc-sub">macOS Edition</div>
      <div class="about-pc-rows">${rowsHTML}</div>
      <button class="about-pc-btn" onclick="document.getElementById('about-overlay').remove()">OK</button>`;
  }

  if (os === "linux") {
    return `
      <div class="about-pc-icon">&#128187;</div>
      <div class="about-pc-name">CICADA_OS</div>
      <div class="about-pc-sub">Linux Edition</div>
      <div class="about-pc-rows">${rowsHTML}</div>
      <button class="about-pc-btn" onclick="document.getElementById('about-overlay').remove()">Close</button>`;
  }

  // Windows — a plain left-aligned "About" settings page, OK bottom-right.
  return `
    <div class="about-pc-title">About</div>
    <div class="about-pc-name-win">CICADA_OS</div>
    <div class="about-pc-sub-win">Windows Edition</div>
    <div class="about-pc-rows">${rowsHTML}</div>
    <div class="about-pc-btn-row"><button class="about-pc-btn" onclick="document.getElementById('about-overlay').remove()">OK</button></div>`;
}

function closeApp() {
  document.getElementsByClassName("monitor")[0].classList.remove("quizzingtonback");
  html = document.getElementsByClassName("monitor")[0];
  state.typable     = false;
  state.isWordle    = false;
  state.phoneDigits = 0;
  state.history          = [];
  state.leadTarget       = null;
  if (netMonInterval) { clearInterval(netMonInterval); netMonInterval = null; }
  if (desktopClockInterval) { clearInterval(desktopClockInterval); desktopClockInterval = null; }
  dismissDesktopContextMenu();
  html.innerHTML = appMenu(state.userID > 0 ? USERS[state.userID-1] : "");
  startDesktopClock();
}

function appMenu(username = "") {
  const now = new Date();
  const time = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  const os = detectOS();
  const isMac   = os === "mac";
  const isLinux = os === "linux";

  const apps = [
    { label: "Tor Browser",      icon: "🌐", color: "#7d00c8", onclick: "loadTor()" },
    { label: "Google",           icon: "🔍", color: "#4285f4", onclick: "loadGoogle()" },
    { label: "Skype",            icon: "📞", color: "#00aff0", onclick: "loadSkype()" },
    { label: "Maps",             icon: "📍", color: "#34a853", onclick: "loadMap()" },
    { label: "Downloads",        icon: "📁", color: "#f4a200", onclick: "loadDownloads()" },
    { label: "Network Monitor",  icon: "📡", color: "#00c896", onclick: "loadNetworkMonitor()" },
  ];

  const desktopIcons = apps.map(a => `
    <div class="dt-icon-wrap" ondblclick="${a.onclick}" title="${a.label}">
      <div class="dt-icon" style="--icon-color:${a.color}">
        <div class="dt-icon-gloss"></div>
        <span class="dt-icon-glyph">${a.icon}</span>
      </div>
      <div class="dt-icon-label">${a.label}</div>
    </div>`).join("");

  if (isMac) {
    const dockIcons = apps.map(a => `
      <div class="dock-item" ondblclick="${a.onclick}" title="${a.label}">
        <div class="dt-icon" style="--icon-color:${a.color}">
          <div class="dt-icon-gloss"></div>
          <span class="dt-icon-glyph">${a.icon}</span>
        </div>
        <span class="dock-label">${a.label}</span>
      </div>`).join("");

    return `<div class="desktop-wrap desktop-mac">
      <div class="mac-menubar">
        <span class="mac-apple">&#63743;</span>
        <span class="mac-menu-item">Finder</span>
        <span class="mac-menu-item">File</span>
        <span class="mac-menu-item">Edit</span>
        <span class="mac-menu-item">View</span>
        <div class="mac-menubar-right">
          <span class="mac-menu-item" id="desktop-clock-time">${time}</span>
          ${username ? `<span class="mac-menu-item">&#128100; ${username}</span>` : ""}
        </div>
      </div>
      <div class="dt-wallpaper dt-wallpaper-mac">
        <div class="dt-icons-grid">${desktopIcons}</div>
      </div>
      <div class="mac-dock">
        <div class="mac-dock-inner">${dockIcons}</div>
      </div>
    </div>`;
  }

  if (isLinux) {
    return `<div class="desktop-wrap desktop-linux">
      <div class="linux-panel">
        <div class="linux-panel-left">
          <button class="linux-panel-btn">Activities</button>
        </div>
        <div class="linux-panel-center" id="desktop-clock-time">${time}</div>
        <div class="linux-panel-right">
          ${username ? `<span class="linux-panel-user">&#128100; ${username}</span>` : ""}
        </div>
      </div>
      <div class="dt-wallpaper dt-wallpaper-linux">
        <div class="dt-icons-grid">${desktopIcons}</div>
      </div>
    </div>`;
  }

  // Windows style (default)
  const taskbarIcons = apps.map(a => `
    <button class="win-taskbar-app" ondblclick="${a.onclick}" title="${a.label}">
      <span>${a.icon}</span>
    </button>`).join("");

  return `<div class="desktop-wrap desktop-win">
    <div class="dt-wallpaper dt-wallpaper-win">
      ${username ? `<div class="win-username-tag">&#128100; ${username}</div>` : ""}
      <div class="dt-icons-grid">${desktopIcons}</div>
    </div>
    <div class="win-taskbar">
      <button class="win-start-btn">&#10064; Start</button>
      <div class="win-taskbar-apps">${taskbarIcons}</div>
      <div class="win-taskbar-clock" id="desktop-clock">
        <div id="desktop-clock-time">${time}</div>
        <div style="font-size:7px;opacity:0.7">${new Date().toLocaleDateString([], {month:'2-digit',day:'2-digit',year:'2-digit'})}</div>
      </div>
    </div>
  </div>`;
}

async function loadTor() {
  const snap = html.innerHTML;
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram();
  await delay(100);
  setWinTitle("Tor Browser");
  document.getElementById("webApp").style.background = "#fff";
  document.getElementById("webApp").innerHTML = `<div class="tor-wrap">
    <div class="tor-header">
      <span style="font-size:16px">&#127760;</span>
      <div><div class="tor-logo">Tor Browser</div><div class="tor-sub">ANONYMOUS &amp; SECURE</div></div>
    </div>
    <div class="tor-body">
      <span class="tor-shield">&#127376;</span>
      <div class="tor-tagline">You're ready for the world's most private browsing.</div>
      <div class="tor-input-row">
        <input class="tor-input" id="onionLink" placeholder="enter .onion address...">
        <button class="tor-btn" onclick="searchOnion()">Go</button>
      </div>
      <div class="tor-notice">All traffic is routed through the Tor network. Your identity is protected.</div>
    </div>
  </div>`;
  document.getElementById("webApp").innerHTML += `<div align="center" id="qrCode"></div><div align="center" id="qrCode2"></div>`;
  await delay(100);
  initialHTML = document.getElementsByClassName("monitor")[0].innerHTML;
}

async function loadGoogle() {
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram();
  await delay(100);
  setWinTitle("Google");
  const app = document.getElementById("webApp");
  app.style.background = "#fff";
  app.innerHTML = `<div class="goog-wrap">
    <div class="goog-header">
      <span class="goog-header-link">Gmail</span>
      <span class="goog-header-link">Images</span>
    </div>
    <div class="goog-body">
      <div class="goog-logo">
        <span class="goog-g">G</span><span class="goog-o1">o</span><span class="goog-o2">o</span><span class="goog-gl">g</span><span class="goog-e">l</span><span class="goog-o1">e</span>
      </div>
      <div class="goog-search-box">
        <span class="goog-search-icon">&#128269;</span>
        <input class="goog-input" id="googleLink" placeholder="Search or enter URL">
      </div>
      <div class="goog-btn-row">
        <button class="goog-btn" onclick="searchGoogle()">Google Search</button>
        <button class="goog-btn" onclick="window.open('http://www.youtube.com/watch?v=dQw4w9WgXcQ')">I'm Feeling Lucky</button>
      </div>
    </div>
  </div>`;
}

async function loadSkype() {
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram();
  await delay(100);
  setWinTitle("Skype");
  const app = document.getElementById("webApp");
  app.style.background = "#f5f5f5";
  skypeRender(app, "dialpad");
}

function skypeRender(app, activeTab) {
  const keys = [1,2,3,4,5,6,7,8,9,"*",0,"#"];
  const logHTML = state.callLog.length === 0
    ? `<div style="color:#aaa;font-size:9px;text-align:center;padding:8px 0">No recent calls</div>`
    : [...state.callLog].reverse().map(entry => `
        <div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid #eee">
          <span style="font-size:13px">${entry.connected ? "📞" : "❌"}</span>
          <div style="flex:1">
            <div style="font-size:10px;color:#333;font-weight:600">${entry.number}</div>
            <div style="font-size:8px;color:#888">${entry.time}</div>
          </div>
          <div style="font-size:8px;color:${entry.connected ? "#00aff0" : "#c00"}">${entry.connected ? "Connected" : "Failed"}</div>
        </div>`).join("");

  const contactsHTML = SKYPE_CONTACTS.map(c => {
    const fmt = `(${c.number.slice(0,3)}) ${c.number.slice(3,6)}-${c.number.slice(6)}`;
    return `<div class="sky-contact" onclick="skyDial('${c.number}','${fmt}')">
      <div class="sky-contact-avatar">${c.name[0].toUpperCase()}</div>
      <div style="flex:1">
        <div style="font-size:10px;color:#333;font-weight:600">${c.name}</div>
        <div style="font-size:8px;color:#888">${fmt}</div>
      </div>
      <button class="sky-contact-call" onclick="event.stopPropagation();skyDial('${c.number}','${fmt}');callNumber()">&#128222;</button>
    </div>`;
  }).join("");

  const tabStyle = (t) => `style="padding:5px 10px;font-size:9px;font-weight:600;border:none;background:${activeTab===t?'#fff':'transparent'};color:${activeTab===t?'#00aff0':'#888'};border-bottom:${activeTab===t?'2px solid #00aff0':'2px solid transparent'};cursor:pointer;letter-spacing:0.5px"`;

  app.innerHTML = `<div class="sky-wrap">
    <div class="sky-header">
      <span style="font-size:16px">&#128222;</span>
      <div class="sky-logo">Skype</div>
    </div>
    <div style="display:flex;border-bottom:1px solid #ddd;background:#f5f5f5">
      <button ${tabStyle("dialpad")} onclick="skypeRender(document.getElementById('webApp'),'dialpad')">DIAL PAD</button>
      <button ${tabStyle("contacts")} onclick="skypeRender(document.getElementById('webApp'),'contacts')">CONTACTS</button>
      <button ${tabStyle("recent")} onclick="skypeRender(document.getElementById('webApp'),'recent')">RECENT</button>
    </div>
    ${activeTab === "dialpad" ? `
    <div class="sky-body">
      <div class="sky-display" id="phoneNumberDisplay">Enter Number</div>
      <div class="sky-pad">
        ${keys.map(k => typeof k === 'number' || (k !== "*" && k !== "#")
          ? `<button class="sky-key" onclick="inputNumber(${k})">${k}</button>`
          : `<button class="sky-key" style="color:#aaa">${k}</button>`
        ).join("")}
      </div>
      <button class="sky-call-btn" onclick="callNumber()">&#128222;</button>
    </div>` : ""}
    ${activeTab === "contacts" ? `
    <div style="padding:6px 8px;overflow-y:auto">
      <div style="font-size:8px;color:#888;letter-spacing:1px;text-transform:uppercase;margin-bottom:6px">All Contacts</div>
      ${contactsHTML}
    </div>` : ""}
    ${activeTab === "recent" ? `
    <div style="padding:6px 10px">
      <div style="font-size:8px;color:#888;letter-spacing:1px;text-transform:uppercase;margin-bottom:4px">Recent Calls</div>
      <div>${logHTML}</div>
    </div>` : ""}
  </div>`;
}

function skyDial(number, formatted) {
  skypeRender(document.getElementById("webApp"), "dialpad");
  state.callerID    = number;
  state.phoneDigits = 10;
  const disp = document.getElementById("phoneNumberDisplay");
  if (disp) disp.innerHTML = formatted;
}

async function loadMap() {
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram();
  await delay(100);
  setWinTitle("Google Maps");
  const app = document.getElementById("webApp");
  app.style.background = "#fff";
  app.innerHTML = `<div class="map-wrap">
    <div class="map-header">
      <span style="font-size:16px">&#128205;</span>
      <div class="map-logo">Google Maps</div>
    </div>
    <div class="map-body">
      <div class="map-field"><label class="map-label">LATITUDE</label><input class="map-input" id="latitude" placeholder="e.g. 40.7128"></div>
      <div class="map-field"><label class="map-label">LONGITUDE</label><input class="map-input" id="longitude" placeholder="e.g. -74.0060"></div>
      <button class="map-btn" onclick="geosearch()">&#128269; Search</button>
    </div>
  </div>`;
}

async function loadDownloads() {
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram();
  await delay(100);
  setWinTitle("Downloads");
  const app = document.getElementById("webApp");
  app.style.background = "#fff";
  const items = state.downloads.length === 0
    ? `<div class="dl-empty">This folder is empty.</div>`
    : state.downloads.map((type, i) => `<div class="dl-item" id="download${i}">
        <div class="dl-item-icon">${fileTypeIcon(type)}</div>
        <div class="dl-item-name">${state.downloadNames[i] || "unnamed.file"}</div>
        <div class="dl-item-type">${fileTypeLabel(type)}</div>
      </div>`).join("");
  app.innerHTML = `<div class="dl-wrap">
    <div class="dl-toolbar">&#128193; This PC <span class="dl-breadcrumb-sep">&#8250;</span> Downloads</div>
    <div class="dl-columns"><span class="dl-col-name">Name</span><span class="dl-col-type">Type</span></div>
    <div class="dl-body">${items}</div>
  </div>`;
  state.downloads.forEach((_, i) =>
    document.getElementById(`download${i}`)?.addEventListener("click", () => loadFile(i))
  );
}

// Opening a downloaded file used to just be a bare black rectangle
// ("#webApp" with no other styling) regardless of what got dropped into
// it — fine for an image, but plain decoded text (color:inherit, per the
// same rule the RPG log/receipts follow) had nothing to inherit and
// rendered invisible. Now it opens into a real viewer shell matched to
// the file's kind: a light document editor (Notepad/TextEdit/Text
// Editor) for anything text-based, or a dark photo-viewer letterbox
// (Photos/Preview) for anything image-based — see fileViewerKind().
function loadFileExplorer(type, filename) {
  const os      = detectOS();
  const kind    = fileViewerKind(type);
  const appName = kind === "image" ? (os === "mac" ? "Preview" : "Photos")
                : kind === "pgp"   ? "GPG Keychain"
                : (os === "mac" ? "TextEdit" : os === "linux" ? "Text Editor" : "Notepad");
  html.innerHTML = `${windowBar("closeFile")}<div id="webApp" class="file-viewer file-viewer-${kind}"></div>`;
  setWinTitle(filename ? `${filename} — ${appName}` : appName);
}

// ─────────────────────────────────────────────────────────────────────────────
// IN-GAME FILE PICKER — a small "Open File" dialog that a helper site (e.g.
// midi.helper, outguess.helper) can pop up to load a file the player
// already has in Downloads, instead of a real <input type="file"> reaching
// out to the player's actual computer. Reuses the same .dl-* list styling
// loadDownloads() renders the Downloads folder with, filtered to whichever
// download type the caller is after.
// ─────────────────────────────────────────────────────────────────────────────

function openFilePicker(fileType, onSelect) {
  closeFilePicker();
  const matches = state.downloads
    .map((type, i) => ({ type, i }))
    .filter(m => m.type === fileType);

  const items = matches.length === 0
    ? `<div class="dl-empty">No matching files in Downloads.</div>`
    : matches.map(m => `<div class="dl-item" id="fp-item-${m.i}">
        <div class="dl-item-icon">${fileTypeIcon(m.type)}</div>
        <div class="dl-item-name">${state.downloadNames[m.i] || "unnamed.file"}</div>
        <div class="dl-item-type">${fileTypeLabel(m.type)}</div>
      </div>`).join("");

  const overlay = document.createElement("div");
  overlay.id = "fp-overlay";
  overlay.className = "fp-overlay";
  overlay.innerHTML = `
    <div class="fp-dialog">
      <div class="fp-titlebar">
        <span>Open File</span>
        <button type="button" class="fp-close" onclick="closeFilePicker()">&times;</button>
      </div>
      <div class="dl-wrap fp-dl-wrap">
        <div class="dl-toolbar">&#128193; This PC <span class="dl-breadcrumb-sep">&#8250;</span> Downloads</div>
        <div class="dl-columns"><span class="dl-col-name">Name</span><span class="dl-col-type">Type</span></div>
        <div class="dl-body">${items}</div>
      </div>
    </div>`;
  overlay.addEventListener("click", e => { if (e.target === overlay) closeFilePicker(); });
  document.body.appendChild(overlay);
  matches.forEach(m =>
    document.getElementById(`fp-item-${m.i}`)?.addEventListener("click", () => {
      closeFilePicker();
      onSelect(m.i);
    })
  );
}

function closeFilePicker() {
  document.getElementById("fp-overlay")?.remove();
}

let netMonInterval     = null;
let desktopClockInterval = null;

async function loadNetworkMonitor() {
  pushHistory("Desktop", () => { closeApp(); });
  loadProgram("closeNetworkMonitor");
  await delay(100);
  setWinTitle("Network Monitor");
  const app = document.getElementById("webApp");
  app.style.background = "#0a0a0f";
  app.style.padding = "0";

  const os = detectOS();
  const isMac   = os === "mac";
  const isLinux = os === "linux";
  const headerColor = isMac ? "#3a3a3a" : isLinux ? "#1a3a3a" : "#1a1a2e";

  app.innerHTML = `
    <div style="background:${headerColor};padding:5px 10px;display:flex;align-items:center;gap:8px;border-bottom:1px solid #263a26">
      <span style="font-size:14px">📡</span>
      <div style="color:#9fc79f;font-family:'Courier New',monospace;font-size:11px;font-weight:700;letter-spacing:2px">NETWORK MONITOR</div>
      <div style="margin-left:auto;display:flex;gap:12px;font-family:'Courier New',monospace;font-size:9px">
        <div style="color:#aaa">TRAVERSALS: <span id="nm-traversals" style="color:#9fc79f">${state.traversals}</span></div>
        <div style="color:#aaa">STATUS: <span style="color:#9fc79f">&#9679; ACTIVE</span></div>
      </div>
    </div>
    <div id="nm-log" style="font-family:'Courier New',monospace;font-size:8px;padding:6px;overflow-y:auto;height:280px;display:flex;flex-direction:column;gap:1px"></div>`;

  // Generate initial fake entries
  for (let i = 0; i < 12; i++) nmAddPacket();
  const log = document.getElementById("nm-log");
  if (log) log.scrollTop = log.scrollHeight;

  // Stream new packets
  if (netMonInterval) clearInterval(netMonInterval);
  netMonInterval = setInterval(() => {
    const log = document.getElementById("nm-log");
    if (!log) { clearInterval(netMonInterval); netMonInterval = null; return; }
    const traversalEl = document.getElementById("nm-traversals");
    if (traversalEl) traversalEl.textContent = state.traversals;
    nmAddPacket();
    log.scrollTop = log.scrollHeight;
  }, 2200);
}

function nmAddPacket() {
  const log = document.getElementById("nm-log");
  if (!log) return;

  // Read live history titles for real URL injection
  const realUrls = state.history
    .map(e => e.title)
    .filter(t => t && t !== "Desktop" && t !== "Google" && t !== "Tor Browser" && t !== "Back");

  const fakeHosts = [
    "guard-node-" + fakeIP(),
    "relay-" + Math.floor(Math.random()*999),
    "exit-node-" + fakeIP(),
    "tor-circuit-" + Math.floor(Math.random()*99),
    "middle-" + fakeIP(),
  ];
  const protocols = ["TCP","TLS","UDP","SOCKS5"];
  const types     = ["DATA","RELAY","CONTROL","CELL","RELAY_DATA"];
  const bytes     = Math.floor(Math.random()*1400)+64;

  const useReal = realUrls.length > 0 && Math.random() < 0.3;
  const dest    = useReal
    ? realUrls[Math.floor(Math.random() * realUrls.length)]
    : fakeHosts[Math.floor(Math.random() * fakeHosts.length)];
  const proto   = protocols[Math.floor(Math.random() * protocols.length)];
  const type    = types[Math.floor(Math.random() * types.length)];
  const color   = useReal ? "#9fc79f" : type === "CONTROL" ? "#ffaa00" : "#4a8a4a";
  const now     = new Date().toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",second:"2-digit"});

  const entry = document.createElement("div");
  entry.style.cssText = `color:${color};padding:1px 0;border-bottom:1px solid rgba(255,255,255,0.05);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex-shrink:0`;
  entry.innerHTML = `<span style="color:#555">${now}</span> <span style="color:#888">${proto}</span> <span style="color:#00aaff;display:inline-block;width:72px">${type}</span> <span style="color:${color}">${dest}</span> <span style="color:#555"> ${bytes}B</span>`;
  log.appendChild(entry);

  // Keep max 60 entries
  while (log.children.length > 60) log.removeChild(log.firstChild);
}

function closeNetworkMonitor() {
  if (netMonInterval) { clearInterval(netMonInterval); netMonInterval = null; }
  closeApp();
}

function closeFile() {
  html = document.getElementsByClassName("monitor")[0];
  loadDownloads();
}

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM PREP FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function dispatchLead(leads, ruleseedNumber, ruleseed, handlers) {
  const method = leads[ruleseed.nextMax(leads.length)];
  (handlers[method] || handlers._default || (() => {}))(ruleseed);
}

function contentHandlers(ruleseed) {
  return {
    messageInImageFile: r => messageInImageFile(r),
    qrCode:             r => { const app = getLeadTarget(); app.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`; generateQR(r); },
    imageProductWebsite:r => imageProductWebsite(r),
    pizzaOrder:         r => pizzaReceipt(r),
    asciiCaesarCipher:  r => asciiCaesarCipher(r),
    asciiPigpen:        r => asciiPigpen(r),
    asciiPlayfairCipher:r => asciiPlayfairCipher(r),
    hexToASCII:         r => hexToASCII(r),
    catOutguess:         r => catOutguess(r),
    rpgBattleLog:          r => rpgBattleLog(r),
    messageHiddenInImage: r => messageHiddenInImage(r),
  };
}

function prepOnion(n, dispSlug) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Tor Browser", () => { html.innerHTML = snap; });
  const rng = new MonoRandom(combinedSeed(n));
  const handlers = { ...contentHandlers(), pizzaOrder: r => pizzaReceipt(r) };
  dispSlug = dispSlug || "";
  html.innerHTML = `${windowBar()}
  <div class="on-wrap">
    <div class="on-header">
      <div class="on-addr">&#128274; ${dispSlug}</div>
      <div class="on-secure"><span class="on-lock">&#128274;</span>Secure connection via Tor</div>
    </div>
    <div class="on-content" id="onionContent"></div>
  </div>`;
  setWinTitle(dispSlug);
  initialHTML = html.innerHTML;
  state.leadTarget = "onionContent";
  dispatchLead(LEADS.onion, n, rng, handlers);
}

function prepReddit(n, r) {
  const user  = USERS[Math.floor(Math.random() * USERS.length)];
  const score = Math.floor(Math.random() * 900) + 12;
  const age   = Math.floor(Math.random() * 22) + 1;
  html.innerHTML = `${windowBar()}
  <div class="rd-wrap">
    <div class="rd-header">
      <span style="font-size:18px">&#129413;</span>
      <div><div class="rd-logo">reddit</div><div class="rd-sub">the front page of the internet</div></div>
    </div>
    <div class="rd-card">
      <div class="rd-votes">
        <span class="rd-arrow rd-arrow-up">&#9650;</span>
        <span class="rd-score">${score}</span>
        <span class="rd-arrow rd-arrow-down">&#9660;</span>
      </div>
      <div class="rd-body">
        <div class="rd-flair">ARG</div>
        <div class="rd-meta">Posted by <span class="rd-user">${user}</span> &middot; ${age}h ago</div>
        <div style="font-size:10px;color:#555;margin-bottom:6px">r/${r}</div>
        <div id="redditPost">
          <button class="rd-post-btn" id="redditButton">View Post</button>
        </div>
        <div class="rd-actions">
          <span class="rd-action">&#128172; ${Math.floor(score/10)} Comments</span>
          <span class="rd-action">&#8663; Share</span>
        </div>
      </div>
    </div>
  </div>`;
  setWinTitle("Reddit — r/" + r);
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  document.getElementById("redditButton").addEventListener("click", () => {
    const snap = html.innerHTML;
    pushHistory("Reddit — r/" + r, () => { html.innerHTML = snap; });
    html.innerHTML = initialHTML;
    state.leadTarget = "redditPost";
    dispatchLead(LEADS.reddit, n, rng, contentHandlers());
  });
}

const FC_GREENTEXT_FLAVOR = [
  "&gt;be me, browsing /x/ at 3am",
  "&gt;found this reposted from another thread",
  "&gt;samefagging but this checks out",
  "&gt;screencapped before it 404s",
  "&gt;solved 2 more lines of the book last night",
];

function prep4Chan(n, r) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  const flavor = FC_GREENTEXT_FLAVOR[Math.floor(Math.random() * FC_GREENTEXT_FLAVOR.length)];
  html.innerHTML = `${windowBar()}
  <div class="fc-wrap">
    <div class="fc-header">
      <div class="fc-header-text">4chan — /${r}/ — Cicada</div>
      <div class="fc-boards">[ <a href="#">a</a> / <a href="#">b</a> / <a href="#">c</a> / <a href="#">d</a> / <a href="#">e</a> / <a href="#">g</a> / <a href="#">gif</a> / <a href="#">h</a> / <a href="#">hr</a> / <a href="#">k</a> / <a href="#">m</a> / <a href="#">o</a> / <a href="#">p</a> / <a href="#">r</a> / <a href="#">s</a> / <a href="#">t</a> ]</div>
    </div>
    <div class="fc-post">
      <div class="fc-post-header">
        <span class="fc-post-name">Anonymous</span>
        <a class="fc-post-no" href="#">No.${Math.floor(Math.random()*90000000)+10000000}</a>
        <a class="fc-post-reply" href="#">[Reply]</a>
      </div>
      <div class="fc-post-body">
        <div class="fc-quote">${flavor}</div>
        <div id="fourChanPost"></div>
      </div>
    </div>
  </div>`;
  setWinTitle("4chan — /" + r + "/");
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  state.leadTarget = "fourChanPost";
  dispatchLead(LEADS.fourChan, n, rng, contentHandlers());
}

function prepPastebin(n) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  const user = USERS[Math.floor(Math.random() * USERS.length)];
  const pasteId = Math.random().toString(36).slice(2, 10);
  const gutter = Array.from({ length: 16 }, (_, i) => i + 1).join("<br>");
  html.innerHTML = `${windowBar()}
  <div class="pb-wrap">
    <div class="pb-header">
      <span style="font-size:16px;color:#fff">&#128196;</span>
      <div class="pb-logo">Pastebin</div>
    </div>
    <div class="pb-titlebar">Untitled — ${pasteId}</div>
    <div class="pb-toolbar">
      <span class="pb-meta">by ${user.toUpperCase()} &middot; a guest &middot; Never &middot; Plain Text</span>
      <div class="pb-actions">
        <span class="pb-action">Raw</span><span class="pb-toolbar-sep">|</span>
        <span class="pb-action">Download</span><span class="pb-toolbar-sep">|</span>
        <span class="pb-action">Clone</span>
      </div>
    </div>
    <div class="pb-content">
      <div class="pb-gutter">${gutter}</div>
      <div class="pb-code" id="fourChanPost"></div>
    </div>
  </div>`;
  setWinTitle("Pastebin");
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  const handlers = { ...contentHandlers(), pizzaOrder: r => pizzaReceiptText(r) };
  state.leadTarget = "fourChanPost";
  dispatchLead(LEADS.pastebin, n, rng, handlers);
}

function prepTwitter(n, placement) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="tw-wrap tw-legacy">
    <div class="tw-header">
      <div class="tw-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="#1d9bf0"><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733a4.67 4.67 0 0 0 2.048-2.578 9.3 9.3 0 0 1-2.958 1.13 4.66 4.66 0 0 0-7.938 4.25 13.229 13.229 0 0 1-9.602-4.868c-.4.69-.63 1.49-.63 2.342A4.66 4.66 0 0 0 3.96 9.824a4.647 4.647 0 0 1-2.11-.583v.06a4.66 4.66 0 0 0 3.737 4.568 4.69 4.69 0 0 1-2.104.08 4.661 4.661 0 0 0 4.352 3.234 9.348 9.348 0 0 1-5.786 1.995 9.5 9.5 0 0 1-1.112-.065 13.175 13.175 0 0 0 7.14 2.093c8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602a9.47 9.47 0 0 0 2.323-2.41z"/></svg></div>
      <div>
        <div class="tw-user-name">${placement}</div>
        <div class="tw-user-handle">@${placement}</div>
      </div>
    </div>
    <div class="tw-tweet">
      <div id="twitterPost"></div>
      <div class="tw-actions">
        <span class="tw-action tw-action-reply">&#128172; ${Math.floor(Math.random() * 40)}</span>
        <span class="tw-action tw-action-rt">&#128257; ${Math.floor(Math.random() * 120)}</span>
        <span class="tw-action tw-action-fav">&#9733; ${Math.floor(Math.random() * 300)}</span>
      </div>
    </div>
  </div>`;
  setWinTitle("Twitter — @" + placement);
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  state.leadTarget = "twitterPost";
  dispatchLead(LEADS.twitter, n, rng, contentHandlers());
}

function prepX(n, placement) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="tw-wrap">
    <div class="tw-header">
      <div class="x-icon" style="font-size:20px;font-weight:900">&#10005;</div>
      <div>
        <div class="tw-user-name">${placement}</div>
        <div class="tw-user-handle">@${placement}</div>
      </div>
    </div>
    <div class="tw-tweet">
      <div id="xPost"></div>
      <div class="tw-actions">
        <span class="tw-action">&#128172; ${Math.floor(Math.random() * 40)}</span>
        <span class="tw-action">&#128257; ${Math.floor(Math.random() * 120)}</span>
        <span class="tw-action">&#9829; ${Math.floor(Math.random() * 300)}</span>
      </div>
    </div>
  </div>`;
  setWinTitle("X — @" + placement);
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  state.leadTarget = "xPost";
  dispatchLead(LEADS.twitter, n, rng, contentHandlers());
}

function prepImgur(n, seed) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="ig-wrap">
    <div class="ig-header">
      <div class="ig-logo">im<span>gur</span></div>
    </div>
    <div id="imgur"></div>
  </div>`;
  setWinTitle("Imgur");
  const rng = new MonoRandom(combinedSeed(n));
  const method = LEADS.imgur[rng.nextMax(LEADS.imgur.length)];
  if (method !== "imgurPage") {
    const imgurEl = document.getElementById("imgur");
    imgurEl.innerHTML = `<div class="ig-post-wrap"><div class="ig-post-info">
      <div class="ig-post-title">${method}</div>
      <div class="ig-post-author">Anonymous</div>
      <div class="ig-stats">
        <span>&#128065; ${Math.floor(Math.random() * 900) + 100} views</span>
        <span class="ig-vote">
          <span class="ig-arrow ig-arrow-up">&#9650;</span>
          <span>${Math.floor(Math.random() * 300) + 20}</span>
          <span class="ig-arrow ig-arrow-down">&#9660;</span>
        </span>
      </div>
    </div></div>`;
    if (method === "qrCode") {
      imgurEl.innerHTML += `<div align="center" id="qrCode"></div><br><div align="center" id="qrCode2"></div>`;
    }
    initialHTML = html.innerHTML;
    state.leadTarget = "imgur";
    contentHandlers()[method](rng);
  } else {
    imgurPage(rng, seed);
  }
}

function imgurPage(ruleseed, seed) {
  const imgurEl = document.getElementById("imgur");
  if (imgurEl) {
    imgurEl.innerHTML = `<div class="ig-post-wrap">
      <div class="ig-img-wrap"><img src="https://picsum.photos/seed/${seed}/200/200" onerror="this.style.display='none'"></div>
      <div class="ig-post-info">
        <div class="ig-post-title" id="imgurTitle"></div>
        <div class="ig-post-author" id="author"></div>
        <div class="ig-stats">
          <span>&#128065; 1,337 views</span>
          <span class="ig-vote">
            <span class="ig-arrow ig-arrow-up">&#9650;</span>
            <span>420</span>
            <span class="ig-arrow ig-arrow-down">&#9660;</span>
          </span>
        </div>
      </div>
    </div>`;
  }
  initialHTML = html.innerHTML;
  const methods = ["phoneNumber","4chan","pastebin"];
  const method  = state.traversals >= 20 ? "dropbox" : methods[ruleseed.nextMax(3)];
  const next    = method === "dropbox"    ? LINK_GENERATORS.dropbox(ruleseed)
                : method === "phoneNumber"? LINK_GENERATORS.phoneNumber(ruleseed)
                : method === "4chan"      ? LINK_GENERATORS["4chan"](ruleseed)
                :                          LINK_GENERATORS.pastebin(ruleseed);
  const titleEl  = document.getElementById("imgurTitle");
  const authorEl = document.getElementById("author");
  ruleseed.nextMax(2) === 0
    ? (titleEl.innerHTML = next, authorEl.innerHTML = "Anonymous")
    : (titleEl.innerHTML = "imgur post", authorEl.innerHTML = next);
}

function prepDropbox(n) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  const combinedN = combinedSeed(n);
  const traversalsAtVisit = state.traversals;
  const rng = new MonoRandom(combinedN);
  const idx = traversalsAtVisit >= 20 ? 4 + rng.nextMax(2) : rng.nextMax(LEADS.dropbox.length);
  const slot = state.downloads.length;
  const fileType = LEADS.dropbox[idx];
  state.downloads.push(fileType);
  state.downloadRules.push(combinedN);
  state.downloadNames.push("");
  html.innerHTML = `${windowBar()}
  <div class="db-wrap">
    <div class="db-header">
      <span style="font-size:16px">&#128451;</span>
      <div class="db-logo">Dropbox</div>
    </div>
    <div class="db-body">
      <div class="db-file-card">
        <div class="db-file-icon">${fileTypeIcon(fileType)}</div>
        <div class="db-file-info">
          <div class="db-file-name">Shared file</div>
          <div class="db-file-meta">Shared with you</div>
        </div>
        <button class="db-btn" id="dropboxButton">&#11015; Download</button>
      </div>
      <div id="db-progress-wrap" style="display:none;margin-top:10px">
        <div style="font-size:8px;color:#9aa0b2;letter-spacing:1px;margin-bottom:4px">DOWNLOADING...</div>
        <div style="background:#e0e4ef;border-radius:4px;height:6px;overflow:hidden">
          <div id="db-progress-bar" style="height:100%;width:0%;background:#0061ff;border-radius:4px;transition:width 0.1s linear"></div>
        </div>
        <div id="db-progress-pct" style="font-size:8px;color:#9aa0b2;margin-top:3px;text-align:right">0%</div>
      </div>
    </div>
  </div>`;
  setWinTitle("Dropbox");
  initialHTML = html.innerHTML;
  document.getElementById("dropboxButton").addEventListener("click", () => {
    const snap = html.innerHTML;
    pushHistory("Dropbox", () => { html.innerHTML = snap; });
    downloadDropbox(combinedN, traversalsAtVisit, slot, fileType);
  });
}

async function downloadDropbox(combined, traversalsAtVisit, slot, fileType) {
  const btn       = document.getElementById("dropboxButton");
  const wrap      = document.getElementById("db-progress-wrap");
  const bar       = document.getElementById("db-progress-bar");
  const pct       = document.getElementById("db-progress-pct");
  if (btn)  btn.disabled = true;
  if (wrap) wrap.style.display = "";

  // Random duration 2000–6000ms, updated every 100ms
  const duration  = 2000 + Math.random() * 4000;
  const steps     = Math.floor(duration / 100);
  for (let i = 1; i <= steps; i++) {
    await delay(100);
    const p = Math.round((i / steps) * 100);
    if (bar) bar.style.width = p + "%";
    if (pct) pct.textContent = p + "%";
  }

  const name = generateDownloadName(fileType);
  state.downloadNames[slot] = name;

  // Sound + notification
  try { new Audio("audio/callend.mp3").play(); } catch(e) {}
  showNotification(name, fileTypeIcon(fileType));

  html.innerHTML = initialHTML;
}

// ─────────────────────────────────────────────────────────────────────────────
// DOWNLOAD TEST BENCH — dev-only QA tool, reached by typing "test.local" in
// the browser like any other site. Stages one (or all) downloadable puzzle
// file types straight into Downloads, using the exact same state entries a
// real Dropbox download would leave behind, so every file-viewer design can
// be reviewed without replaying the puzzles that normally unlock them.
// ─────────────────────────────────────────────────────────────────────────────

function prepDownloadTest() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  const rows = Object.keys(DOWNLOAD_FILE_EXT).map(type => `
    <div class="devtest-row">
      <div class="devtest-row-icon">${fileTypeIcon(type)}</div>
      <div class="devtest-row-info">
        <div class="devtest-row-name">${type}</div>
        <div class="devtest-row-meta">${fileTypeLabel(type)} &middot; ${DOWNLOAD_FILE_EXT[type]}</div>
      </div>
      <button class="devtest-btn" onclick="testDownload('${type}')">Download</button>
    </div>`).join("");
  html.innerHTML = `${windowBar()}
  <div class="devtest-wrap">
    <div class="devtest-hazard"></div>
    <div class="devtest-banner">TEST TOOL &mdash; not part of the game</div>
    <div class="devtest-header">
      <div class="devtest-title">Download Test Bench</div>
      <div class="devtest-sub">Stages downloadable puzzle files into Downloads, the same way a real in-game download would.</div>
    </div>
    <div class="devtest-actions">
      <button class="devtest-btn devtest-btn-primary" onclick="testDownloadAll()">Download All Types</button>
      <button class="devtest-btn devtest-btn-danger" onclick="testClearDownloads()">Clear Downloads</button>
      <span class="devtest-status" id="devtest-status">${state.downloads.length} file(s) currently in Downloads</span>
    </div>
    <div class="devtest-list">${rows}</div>
  </div>`;
  setWinTitle("Download Test Bench");
}

function testDownload(fileType) {
  const slot = state.downloads.length;
  const seed = Math.floor(Math.random() * 2147483646) + 1;
  const name = generateDownloadName(fileType);
  state.downloads.push(fileType);
  state.downloadRules.push(seed);
  state.downloadNames.push(name);
  try { new Audio("audio/callend.mp3").play(); } catch(e) {}
  showNotification(name, fileTypeIcon(fileType));
  updateDownloadTestStatus();
  return name;
}

async function testDownloadAll() {
  for (const type of Object.keys(DOWNLOAD_FILE_EXT)) {
    testDownload(type);
    await delay(200);
  }
}

function testClearDownloads() {
  state.downloads      = [];
  state.downloadRules  = [];
  state.downloadNames  = [];
  updateDownloadTestStatus();
}

function updateDownloadTestStatus() {
  const el = document.getElementById("devtest-status");
  if (el) el.textContent = `${state.downloads.length} file(s) currently in Downloads`;
}

function loadFile(num) {
  html = document.getElementsByClassName("monitor")[0];
  state.leadTarget = null;
  const type = state.downloads[num];
  loadFileExplorer(type, state.downloadNames[num]);
  const rng  = new MonoRandom(state.downloadRules[num]);
  const fileHandlers = {
    imageProductWebsite: r => imageProductWebsite(r),
    asciiCaesarCipher:   r => asciiCaesarCipher(r),
    asciiPlayfairCipher: r => asciiPlayfairCipher(r),
    hexToASCII:          r => hexToASCII(r),
    messageInImageFile:  r => messageInImageFile(r),
    messageHiddenInImage:r => messageHiddenInImage(r),
    qrCode:              r => { const app = getLeadTarget(); app.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`; generateQR(r); },
    midiSubstitution:    r => midiSubstitution(r),
    pgp:                 r => loadPGP(r),
    catOutguess:         async r => {
      const app = getLeadTarget();
      const url = await renderCatOutguessImage(r);
      app.innerHTML += `<img src="${url}" oncontextmenu="return false" style="max-width:100%;max-height:100%;-webkit-user-drag:none;user-drag:none;">`;
    },
  };
  (fileHandlers[type] || (() => {}))(rng);
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL PAGES
// ─────────────────────────────────────────────────────────────────────────────

function prepCaesar() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="cry-wrap">
    <div class="cry-topbar">
      <div class="cry-topbar-title">asciicaesarcipher.com</div>
      <span class="cry-topbar-sub">modular encoding &amp; decryption — 94-character printable ASCII alphabet</span>
    </div>
    <div class="cry-pipe">
      <div class="cry-brick">
        <div class="cry-brick-label">Text (ciphertext)</div>
        <input class="cry-input" id="asciiCaesar" placeholder="Enter ciphertext...">
      </div>
      <div class="cry-connector">&#8595;</div>
      <div class="cry-brick cry-brick-op">
        <div class="cry-brick-label">Caesar Cipher <span class="cry-brick-tag">brute-force — all shifts</span></div>
        <button class="cry-btn" onclick="cryptanalyzeCaesar()">Decode</button>
      </div>
      <div class="cry-connector">&#8595;</div>
      <div class="cry-brick">
        <div class="cry-brick-label">Text (results)</div>
        <div class="cry-output" id="result"><span class="cry-hint">Enter ciphertext above and click Decode.</span></div>
      </div>
    </div>
  </div>`;
  setWinTitle("ASCII Caesar Cipher");
}

function prepDecryptPGP() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="cic-wrap cic-theme-pgp">
    <div class="cic-header">
      <div class="cic-logo">DecryptPGP.com</div>
      <div class="cic-sub">PGP / OpenPGP Message Decryption Tool</div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Private Key</div>
      <textarea class="cic-input" id="pgpKey" placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----"></textarea>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Encrypted Message</div>
      <textarea class="cic-input" id="pgpMess" placeholder="-----BEGIN PGP MESSAGE-----"></textarea>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Passphrase</div>
      <input class="cic-input" id="pgpPass" type="password" placeholder="passphrase...">
      <div style="margin-top:7px">
        <button class="cic-btn" onclick="decryptPGP()">Decrypt Message</button>
      </div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Decrypted Output</div>
      <div class="cic-result-box" id="result"><span class="cic-hint">decrypted message will appear here</span></div>
    </div>
  </div>`;
  setWinTitle("DecryptPGP");
}

function decryptPGP() {
  decryptMessage(
    document.getElementById("pgpMess").value,
    document.getElementById("pgpKey").value,
    document.getElementById("pgpPass").value
  );
}

function prepProductWebsite(n) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="pw-wrap">
    <img class="pw-img" src="img/productWebIMG.jpg" title="Patience is a virtue.">
    <div class="pw-timer" id="timer">0:10</div>
    <div class="pw-timer-label" id="timer-label">TIME REMAINING</div>
  </div>`;
  setWinTitle("Product Website");
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  countdown(document.getElementById("timer"), 10, rng);
}

async function countdown(timerEl, t, rng) {
  if (t === 60)      { timerEl.innerHTML = "1:00"; }
  else if (t === 0)  { timerEl.className = "pw-coords"; timerEl.innerHTML = LINK_GENERATORS.coordinate(rng); const lbl = document.getElementById("timer-label"); if (lbl) lbl.textContent = "COORDINATES"; await delay(1000); return; }
  else if (t < 10)   { timerEl.innerHTML = `0:0${t}`; }
  else               { timerEl.innerHTML = `0:${t}`; }
  await delay(1000);
  countdown(timerEl, t - 1, rng);
}

async function geosearch() {
  state.traversals++;
  const lat = document.getElementById("latitude").value;
  const lng = document.getElementById("longitude").value;
  const latN = parseFloat(lat), lngN = parseFloat(lng);
  if (isNaN(latN) || isNaN(lngN)) return;
  const bbox = `${lngN-0.05},${latN-0.05},${lngN+0.05},${latN+0.05}`;
  html.innerHTML = `${windowBar()}
  <div class="map-wrap">
    <div class="map-header"><span style="font-size:16px">&#128205;</span><div class="map-logo">Google Maps</div></div>
    <div class="map-body">
      <div class="map-field"><label class="map-label">LATITUDE</label><input class="map-input" id="latitude" value="${latN}"></div>
      <div class="map-field"><label class="map-label">LONGITUDE</label><input class="map-input" id="longitude" value="${lngN}"></div>
      <button class="map-btn" onclick="geosearch()">&#128269; Search</button>
      <div style="margin-top:6px;border-radius:4px;overflow:hidden;border:1px solid #dfe1e5">
        <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latN},${lngN}" width="100%" height="200" style="display:block;border:none" loading="lazy"></iframe>
      </div>
      <div id="map-status" style="margin-top:6px;font-size:9px;color:#5f6368;display:flex;align-items:center;gap:4px">
        <span style="display:inline-block;width:8px;height:8px;border:2px solid #4285f4;border-top-color:transparent;border-radius:50%;animation:map-spin 0.8s linear infinite"></span>
        Searching location...
      </div>
      <style>@keyframes map-spin{to{transform:rotate(360deg)}}</style>
      <div id="qrCode" style="display:none;text-align:center;margin-top:6px"></div>
      <div id="qrCode2" style="display:none;text-align:center;margin-top:4px"></div>
    </div>
  </div>`;
  setWinTitle("Google Maps — " + latN + ", " + lngN);
  const seed = (Math.floor(latN * lngN) * state.userID) % 2147483647;
  const rng  = new MonoRandom(seed);
  await delay(5000);
  const statusEl = document.getElementById("map-status");
  if (statusEl) statusEl.innerHTML = `<span style="color:#34a853">&#10003;</span> <b style="color:#34a853">Poster found at this location.</b>`;
  await delay(5000);
  const qr1 = document.getElementById("qrCode");
  const qr2 = document.getElementById("qrCode2");
  if (qr1) qr1.style.display = "";
  if (qr2) qr2.style.display = "";
  await delay(100);
  generateQR(rng);
}

// ─────────────────────────────────────────────────────────────────────────────
// CIPHER / ENCODING DISPLAYS
// ─────────────────────────────────────────────────────────────────────────────

const ASCII_CHARS = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~'.split("");

function cryptanalyzeCaesar() {
  const inp     = document.getElementById("asciiCaesar").value;
  const results = document.getElementById("result");
  if (!inp.trim()) { results.innerHTML = `<span class="cry-hint">No input.</span>`; return; }
  results.innerHTML = ASCII_CHARS.map((_, shift) => {
    const decoded = inp.split("").map(c => {
      const i = ASCII_CHARS.indexOf(c);
      return i === -1 ? c : ASCII_CHARS[(i - shift + ASCII_CHARS.length) % ASCII_CHARS.length];
    }).join("");
    return `<div class="cry-shift-row"><b>${String(shift).padStart(2,'0')}</b>${decoded}</div>`;
  }).join("");
}

async function hexToASCII(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-hex" id="hexadecimal"></div></div></div>`;
  await delay(300);
  const el = document.getElementById("hexadecimal");
  if (el) el.textContent = generateHexReturn(ruleseed);
}

function generateHexReturn(ruleseed) {
  return nextLink(ruleseed).split("").map(c => Number(c.charCodeAt(0)).toString(16)).join("");
}

function generateCaesarReturn(ruleseed) {
  const link    = nextLink(ruleseed);
  const shift   = ruleseed.nextMax(ASCII_CHARS.length);
  const encoded = link.split("").map(c => {
    const i = ASCII_CHARS.indexOf(c);
    return i === -1 ? c : ASCII_CHARS[(i + shift) % ASCII_CHARS.length];
  }).join("");
  return `TIBERIVS CLAVDIVS CAESAR says "${encoded}"`;
}

async function asciiCaesarCipher(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-caesar" id="caesar"></div></div></div>`;
  await delay(300);
  const el = document.getElementById("caesar");
  if (el) el.textContent = generateCaesarReturn(ruleseed);
}

function generatePlayfairReturn(ruleseed) {
  const square = Array.from({length:10}, (_,i) => Array.from({length:9}, (_,j) => ASCII_CHARS[i + j*10]));
  const link   = nextLink(ruleseed);
  const coords = link.split("").map(c => {
    for (let i = 0; i < 10; i++) for (let j = 0; j < 9; j++) if (square[i][j] === c) return [i,j];
    return null;
  });
  let out = "";
  for (let i = 0; i < coords.length; i += 2) {
    const a = coords[i], b = coords[i+1];
    if (!a) continue;
    if (!b)                               { out += square[a[0]][a[1]]; }
    else if (a[0]===b[0] && a[1]===b[1]) { out += square[a[0]][a[1]] + square[b[0]][b[1]]; }
    else if (a[1]===b[1])                 { out += square[(a[0]+1)%10][a[1]] + square[(b[0]+1)%10][b[1]]; }
    else if (a[0]===b[0])                 { out += square[a[0]][(a[1]+1)%9] + square[b[0]][(b[1]+1)%9]; }
    else                                  { out += square[a[0]][b[1]] + square[b[0]][a[1]]; }
  }
  return `CHARLES WHEATSTONE AND LYON PLAYFAIR says "${out}"`;
}

async function asciiPlayfairCipher(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-playfair" id="playfair"></div></div></div>`;
  await delay(300);
  const el = document.getElementById("playfair");
  if (el) el.textContent = generatePlayfairReturn(ruleseed);
}

async function asciiPigpen(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-canvas-wrap"><canvas id="canvas" width="10000" height="10000"></canvas></div></div></div>`;
  await delay(500);
  generatePigpenMessage(ruleseed);
}

async function generatePigpenMessage(ruleseed) {
  await document.fonts.load("48px ASCIIPigpen-Regular");

  const canvas = document.getElementById("canvas");
  canvas.width = canvas.height = 2000;
  const ctx  = canvas.getContext("2d");
  const hex  = Array.from({length:6}, () => "0123456789ABCDEF"[ruleseed.nextMax(16)]).join("");
  ctx.fillStyle = `#${hex}`;

  const pigpenMethods = ["onion","reddit","4chan","imgur","pastebin","twitter","x","dropbox","phoneNumber","coordinates","hexToASCII","asciiCaesarCipher","asciiPigpenCipher","asciiPlayfairCipher","nytimes","quizzington"];
  const key     = pigpenMethods[ruleseed.nextMax(pigpenMethods.length)];
  const message = key === "phoneNumber"        ? LINK_GENERATORS.phoneNumber(ruleseed)
                : key === "coordinates"        ? LINK_GENERATORS.coordinate(ruleseed)
                : key === "hexToASCII"         ? generateHexReturn(ruleseed)
                : key === "asciiCaesarCipher"  ? generateCaesarReturn(ruleseed)
                : key === "asciiPlayfairCipher"? generatePlayfairReturn(ruleseed)
                : (LINK_GENERATORS[key] || LINK_GENERATORS.onion)(ruleseed);

  ctx.font = "48px ASCIIPigpen-Regular";
  const textWidth = ctx.measureText(message).width;
  const minWidth  = Math.max(2000, Math.ceil(textWidth) + 100);
  if (minWidth > canvas.width) {
    canvas.width = minWidth;
    ctx.fillStyle = `#${hex}`;
    ctx.font = "48px ASCIIPigpen-Regular";
  }
  ctx.fillText(message, canvas.width / 40, canvas.height / 40);
}

// ─────────────────────────────────────────────────────────────────────────────
// QR CODE / IMAGE / CANVAS GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

function generateQR(ruleseed) {
  const link  = nextStep(ruleseed);
  const parts = link.split("\n");
  new QRCode("qrCode", parts[0]);
  if (parts[1]) new QRCode("qrCode2", parts[1]);
}

async function messageInImageFile(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-canvas-wrap"><canvas id="canvas" width="200" height="200"></canvas></div></div></div>`;
  await delay(500);
  generateImage(ruleseed);
}

async function messageHiddenInImage(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-canvas-wrap"><canvas id="canvas-mhii" width="200" height="200"></canvas></div></div></div>`;
  await delay(500);
  generateHiddenInImage(ruleseed);
}

function generateHiddenInImage(ruleseed) {
  const canvas = document.getElementById("canvas-mhii");
  canvas.width = canvas.height = 800;
  const ctx = canvas.getContext("2d");
  const d = "0123456789ABCDEF";

  // Seeded background color — same RNG pattern as messageInImageFile
  const hex  = Array.from({length: 6}, () => ruleseed.nextMax(16));
  const bgHex = hex.map(x => d[x]).join("");
  ctx.fillStyle = `#${bgHex}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Message color follows the same four-branch logic as generateImage's altHex
  const hi = ruleseed.nextMax(50);
  let msgHex = bgHex;
  if      (hi < 15) msgHex = setCharAt(setCharAt(msgHex, 0, d[(hex[0]+1)%16]), 1, d[(hex[1]+1)%16]);
  else if (hi < 30) msgHex = setCharAt(setCharAt(msgHex, 2, d[(hex[2]+1)%16]), 3, d[(hex[3]+1)%16]);
  else if (hi < 45) msgHex = setCharAt(setCharAt(msgHex, 4, d[(hex[4]+1)%16]), 5, d[(hex[5]+1)%16]);
  else              msgHex = Array.from({length: 6}, () => d[ruleseed.nextMax(16)]).join("");

  // Get the next step URL — same method selection as messageInImageFile
  const imageContentKeys = [null,"onion","phoneNumber","coordinate","reddit","4chan","imgur","pastebin","twitter","x","dropbox","nytimes","quizzington"];
  let method = ruleseed.nextMax(13);
  if (method === 0) method = 1;
  if (state.traversals >= 20) method = 10;
  const url = LINK_GENERATORS[imageContentKeys[method]](ruleseed);

  // Message text position — always at canvas.height / 4, font size 28px
  const msgY    = Math.floor(canvas.height / 4);
  const msgSize = 28;
  const msgBand = { top: msgY - msgSize, bot: msgY + 4 }; // conservative band to avoid

  // Pixel Y position — seeded, must not land in the message band
  let pixelY = ruleseed.nextMax(canvas.height);
  if (pixelY >= msgBand.top && pixelY <= msgBand.bot)
    pixelY = msgBand.bot + 1 + ruleseed.nextMax(canvas.height - (msgBand.bot + 1));

  // Encode URL into pixels: R=char[i*3], G=char[i*3+1], B=char[i*3+2]
  const padded = url.padEnd(Math.ceil(url.length / 3) * 3, "\0");
  const pixelCount = padded.length / 3;
  const startX = 16;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < pixelCount; i++) {
    const r = padded.charCodeAt(i * 3);
    const g = padded.charCodeAt(i * 3 + 1);
    const b = padded.charCodeAt(i * 3 + 2);
    const idx = (pixelY * canvas.width + startX + i) * 4;
    imgData.data[idx]     = r;
    imgData.data[idx + 1] = g;
    imgData.data[idx + 2] = b;
    imgData.data[idx + 3] = 255;
  }
  ctx.putImageData(imgData, 0, 0);

  // Render the ambiguous message
  ctx.fillStyle = `#${msgHex}`;
  ctx.font = `${msgSize}px Consolas`;
  ctx.fillText("the image holds more than the eye allows", 16, msgY);
}

async function imageProductWebsite(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div><div class="lead-wrap"><div class="lead-canvas-wrap"><canvas id="canvas" width="200" height="200"></canvas></div></div></div>`;
  await delay(500);
  generateImageProduct(ruleseed);
}

function generateImage(ruleseed) {
  const canvas = document.getElementById("canvas");
  canvas.width = canvas.height = 800;
  const ctx  = canvas.getContext("2d");
  const hex  = Array.from({length:6}, (_, i) => { const d="0123456789ABCDEF"; return {ch:d[ruleseed.nextMax(16)],i}; });
  const hexStr = hex.map(x=>x.ch).join("");
  const idxs   = hex.map(x=>x.i);
  ctx.fillStyle = `#${hexStr}`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const hi = ruleseed.nextMax(50);
  let altHex = hexStr;
  const d = "0123456789ABCDEF";
  if      (hi < 15) altHex = setCharAt(setCharAt(altHex,0,d[(idxs[0]+1)%16]),1,d[(idxs[1]+1)%16]);
  else if (hi < 30) altHex = setCharAt(setCharAt(altHex,2,d[(idxs[2]+1)%16]),3,d[(idxs[3]+1)%16]);
  else if (hi < 45) altHex = setCharAt(setCharAt(altHex,4,d[(idxs[4]+1)%16]),5,d[(idxs[5]+1)%16]);
  else              altHex = Array.from({length:6}, ()=>d[ruleseed.nextMax(16)]).join("");
  ctx.fillStyle = `#${altHex}`;

  const imageContentKeys = [null,"onion","phoneNumber","coordinate","reddit","4chan","imgur","pastebin","twitter","x","dropbox","nytimes","quizzington"];
  let method = ruleseed.nextMax(13);
  if (method === 0) method = 1;
  if (state.traversals >= 20) method = 10;
  const key  = imageContentKeys[method];
  const text = LINK_GENERATORS[key](ruleseed);
  const size = 32;
  ctx.font = `${size}px Consolas`;
  const textWidth = ctx.measureText(text).width;
  const minWidth  = Math.max(800, Math.ceil(textWidth) + 32);
  if (minWidth > canvas.width) {
    canvas.width = minWidth;
    ctx.fillStyle = `#${hexStr}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `#${altHex}`;
    ctx.font = `${size}px Consolas`;
  }
  ctx.fillText(text, 16, canvas.height / (method <= 3 ? 4 : 2));
}

function generateImageProduct(ruleseed) {
  const canvas = document.getElementById("canvas");
  canvas.width  = DIMENSION_PRIMES[ruleseed.nextMax(DIMENSION_PRIMES.length)];
  canvas.height = DIMENSION_PRIMES[ruleseed.nextMax(DIMENSION_PRIMES.length)];
  const end = PRIMES[ruleseed.nextMax(PRIMES.length)];
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#FFFFFF";
  const small   = canvas.width < 693;
  ctx.font      = `${small ? 16 : 32}px Consolas`;
  const newline = canvas.height < 743 ? 25 : 32;
  const lines   = "Hello. We are looking for highly intelligent\nindividuals.  To find them, we have devised\na test.\n\nThere is a message hidden in this image.\n\nFind it, and it will lead you on the road to\nfinding us.  We look forward to meeting the\nfew that will make it all the way through.\n\nGood luck.\n\n".split("\n");
  const ox = canvas.width / 40, oy = canvas.height / 4;
  lines.forEach((line, i) => ctx.fillText(line, ox, oy + i * newline));
  ctx.fillText(end, ox, oy + lines.length * newline);
}

// ─────────────────────────────────────────────────────────────────────────────
// PIZZA
// ─────────────────────────────────────────────────────────────────────────────

function pzIdToName(id) {
  return id.replace(/canadianbacon/,"canadian bacon").replace(/artichokehearts/,"artichoke hearts")
    .replace(/bananapepper/,"banana pepper").replace(/greenpepper/,"green pepper")
    .replace(/brusselsprouts/,"brussel sprouts").replace(/picklejuice/,"pickle juice")
    .replace(/bacongrease/,"bacon grease").replace(/melloyello/,"mello yello")
    .replace(/mountaindew/,"mountain dew").replace(/mrpibb/,"mr. pibb")
    .replace(/drpepper/,"dr. pepper").replace(/extralarge/,"extra-large");
}

const TOPPING_COLORS = {
  pepperoni:"#c0392b",sausage:"#7d5a3c",canadianbacon:"#e07050",bacon:"#a0522d",
  chicken:"#f5deb3",beef:"#8b4513",meatball:"#6b3a2a",salami:"#cc3333",
  anchovies:"#4a7c59",mushroom:"#9b8760",onion:"#9b59b6",pineapple:"#f1c40f",
  olive:"#2c3e50",jalapeno:"#27ae60",bananapepper:"#f9ca24",greenpepper:"#1e8449",
  tomato:"#e74c3c",spinach:"#145a32",garlic:"#f8f9d2",artichokehearts:"#7fb347",
  zucchini:"#52be80",turkey:"#d5a85a",corn:"#f0c040",cranberries:"#c0392b",
  blueberries:"#2980b9",kimchi:"#e74c3c",sauerkraut:"#d4c07a",apricot:"#f39c12",
  clam:"#f0e6d3",potato:"#f5cba7",peach:"#f1948a",brusselsprouts:"#27ae60",
  crab:"#e74c3c",skittles:"#9b59b6",cicadas:"#2ecc71",
};

function pzDrawPizza() {
  const cv = document.getElementById("pz-canvas");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const W = cv.width, H = cv.height, cx = W/2, cy = H/2, r = Math.min(W,H)*0.42;

  ctx.clearRect(0,0,W,H);

  const sizeIdx = SIZE_IDS.indexOf(state.currentPizza[0]);
  const scale = sizeIdx === -1 ? 0 : [0.55, 0.72, 0.88, 1.0][sizeIdx] || 0.72;

  if (scale === 0) {
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 11px 'Times New Roman', Times, serif"; ctx.textAlign = "center";
    ctx.fillText("SELECT A SIZE", cx, cy-6); ctx.fillText("TO SEE YOUR PIZZA", cx, cy+10);
    return;
  }

  const pr = r * scale;

  ctx.beginPath(); ctx.arc(cx,cy,pr,0,Math.PI*2);
  ctx.fillStyle = "#e8a840"; ctx.fill();
  ctx.strokeStyle = "#c47a20"; ctx.lineWidth = pr*0.09; ctx.stroke();

  ctx.beginPath(); ctx.arc(cx,cy,pr*0.86,0,Math.PI*2);
  ctx.fillStyle = "#c0392b"; ctx.fill();

  ctx.beginPath(); ctx.arc(cx,cy,pr*0.80,0,Math.PI*2);
  ctx.fillStyle = "#f5d060"; ctx.fill();

  const cheeseRng = new MonoRandom(42);
  for (let i=0;i<18;i++) {
    const angle = cheeseRng.nextDouble()*Math.PI*2;
    const dist  = cheeseRng.nextDouble()*pr*0.65;
    const bx = cx + Math.cos(angle)*dist, by = cy + Math.sin(angle)*dist;
    const br = (cheeseRng.nextDouble()*0.12+0.06)*pr;
    ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2);
    ctx.fillStyle = `rgba(255,240,120,0.5)`; ctx.fill();
  }

  const toppings = state.currentPizza.filter(id => TOPPING_IDS.includes(id));
  toppings.forEach((tid, ti) => {
    const rng = new MonoRandom(ti * 1000 + tid.length * 37);
    const color = TOPPING_COLORS[tid] || "#888";
    const count = Math.min(3 + ti % 3, 8);
    for (let k=0; k<count; k++) {
      const angle = rng.nextDouble()*Math.PI*2;
      const dist  = rng.nextDouble()*pr*0.70;
      const tx = cx + Math.cos(angle)*dist, ty = cy + Math.sin(angle)*dist;
      const tr = pr * (0.06 + rng.nextDouble()*0.05);
      ctx.beginPath(); ctx.arc(tx,ty,tr,0,Math.PI*2);
      ctx.fillStyle = color; ctx.fill();
      ctx.strokeStyle = "rgba(0,0,0,0.3)"; ctx.lineWidth = 1; ctx.stroke();
    }
  });

  ctx.strokeStyle = "rgba(180,100,20,0.4)"; ctx.lineWidth = 1.5;
  for (let s=0;s<8;s++) {
    const angle = (s/8)*Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(angle)*pr, cy+Math.sin(angle)*pr);
    ctx.stroke();
  }
}

function pzRenderCart() {
  const el = document.getElementById("pz-cart");
  if (!el) return;
  if (state.pizzaOrders.length === 0) { el.innerHTML = '<span style="color:#555;font-size:10px">Cart is empty</span>'; return; }
  el.innerHTML = state.pizzaOrders.map((pizza, i) => {
    const sizeId = SIZE_IDS.includes(pizza[0]) ? pizza[0] : "";
    const lastItem = pizza[pizza.length-1];
    const drinkId = DRINK_IDS.includes(lastItem) ? lastItem : "";
    const tops = pizza.filter(id => TOPPING_IDS.includes(id));
    const label = sizeId
      ? `${pzIdToName(sizeId)} pizza${tops.length ? " / "+tops.map(pzIdToName).join(", ") : ""}${drinkId ? " + "+pzIdToName(drinkId) : ""}`
      : pzIdToName(drinkId);
    return `<div class="pz-cart-item">
      <span style="flex:1;font-size:9px;color:#000">${label}</span>
      <button class="pz-cart-edit" onclick="pzEditOrder(${i})">&#9998;</button>
      <button class="pz-cart-del"  onclick="pzDeleteOrder(${i})">&#10005;</button>
    </div>`;
  }).join("");
}

function pzEditOrder(i) {
  const pizza = state.pizzaOrders.splice(i, 1)[0];
  state.editingSlot = i;
  state.currentPizza = [];
  state.selectDrink = false;

  const sizeId = SIZE_IDS.includes(pizza[0]) ? pizza[0] : null;
  if (sizeId) addToOrder(sizeId);
  pizza.filter(id => TOPPING_IDS.includes(id)).forEach(id => addToOrder(id));
  const lastItem = pizza[pizza.length-1];
  if (DRINK_IDS.includes(lastItem)) addDrink(lastItem);

  pzRenderCart();
  pzDrawPizza();
  document.getElementById("compOrder").disabled = state.pizzaOrders.length === 0;
}

function pzDeleteOrder(i) {
  state.pizzaOrders.splice(i, 1);
  pzRenderCart();
  document.getElementById("compOrder").disabled = state.pizzaOrders.length === 0;
  updateCartPreview();
}

function prepPizza() {
  initialHTML = html.innerHTML;
  state.editingSlot = -1;
  const toppingBtns = TOPPING_IDS.map(id => `<button class="pz-topping" id="${id}" onclick="addTopping(this.id)" disabled><img src="img/toppings/${id}.png" width="36px" height="36px" onerror="this.style.display='none'"><br><span>${pzIdToName(id)}</span></button>`).join("");
  const drinkBtns   = DRINK_IDS.map(id => `<button class="pz-drink" id="${id}" onclick="addDrink(this.id)" disabled><img src="img/toppings/${id}.png" width="36px" height="36px" onerror="this.style.display='none'"><br><span>${pzIdToName(id)}</span></button>`).join("");
  html.innerHTML = `${windowBar()}
  <div class="pz-wrap">
    <div class="pz-header">
      <div class="pz-logo">&#127829; Pizza.NET &#127829;</div>
      <div class="pz-tagline">"We Deliver... Eventually!"</div>
      <span class="pz-star">&#10022;</span>
      <span style="font-size:10px;color:#330000"> HOT &amp; FRESH </span>
      <span class="pz-star" style="animation-direction:reverse">&#10022;</span>
    </div>
    <div class="pz-marquee"><span class="pz-marquee-inner">&#127829; ORDER NOW AND GET FREE DELIVERY &#127829; TODAY'S SPECIAL: CICADAS PIZZA 50% OFF &#127829; WE ACCEPT CASH, CARD, AND CRYPTO &#127829; CALL US AT (888) PIZ-ZNET &#127829;</span></div>
    <div class="pz-builder-row">
      <div class="pz-canvas-wrap">
        <canvas id="pz-canvas" width="130" height="130"></canvas>
        <div class="pz-canvas-label" id="pz-canvas-label">Pick a size!</div>
        <div id="pz-topping-tags" style="max-width:134px;margin-top:2px"></div>
      </div>
      <div class="pz-form-col">
        <div class="pz-section">
          <div class="pz-section-title">&#9658; STEP 1: Size</div>
          ${SIZE_IDS.map(s=>`<button class="pz-size-btn" id="${s}" onclick="addTopping(this.id)">${s.replace("extralarge","extra-large").toUpperCase()}</button>`).join("")}
        </div>
        <div class="pz-section">
          <div class="pz-section-title">&#9658; STEP 2: Toppings</div>
          <div class="pz-toppings-grid">${toppingBtns}</div>
        </div>
        <div class="pz-section">
          <div class="pz-section-title">&#9658; STEP 3: Drink (optional)</div>
          <div class="pz-toppings-grid">${drinkBtns}</div>
        </div>
      </div>
    </div>
    <div class="pz-cart-section">
      <div class="pz-section-title">&#128722; YOUR CART</div>
      <div id="pz-cart"><span style="color:#555;font-size:10px">Cart is empty</span></div>
    </div>
    <div style="text-align:center;margin-top:4px">
      <button class="pz-action-btn" id="addCart" onclick="addOrder()" disabled>&#10133; ADD TO CART</button>
      <button class="pz-action-btn pz-confirm-btn" id="compOrder" onclick="order()" disabled>&#9989; CONFIRM ORDER</button>
    </div>
    <div id="pz-cart-preview" style="font-size:10px;color:#333;text-align:center;min-height:14px;margin-top:2px"></div>
  </div>`;

  requestAnimationFrame(pzDrawPizza);
  pzRenderCart();
  setWinTitle("Pizza.NET");
  initialHTML = html.innerHTML;
}

function addTopping(id) { addToOrder(id); }

function updateCartPreview() {
  const el = document.getElementById("pz-cart-preview");
  if (!el) return;
  const count = state.pizzaOrders.length;
  const cur   = state.currentPizza.length;
  el.innerHTML = count > 0
    ? `&#127829; ${count} item${count>1?"s":""} in cart &nbsp;|&nbsp; building: ${cur} selection${cur!==1?"s":""}`
    : cur > 0 ? `Building order... ${cur} selection${cur!==1?"s":""}` : "";
}

function pzUpdateCanvasLabel() {
  const label = document.getElementById("pz-canvas-label");
  if (!label) return;
  const sizeIdx = SIZE_IDS.indexOf(state.currentPizza[0]);
  const tops = state.currentPizza.filter(id => TOPPING_IDS.includes(id));
  const drinkLast = state.currentPizza.length > 0 && DRINK_IDS.includes(state.currentPizza[state.currentPizza.length-1]);
  if (sizeIdx === -1) { label.textContent = "Pick a size!"; return; }
  const sizeName = ["Small","Medium","Large","Extra-Large"][sizeIdx];
  label.textContent = `${sizeName}${tops.length ? " · "+tops.length+" topping"+(tops.length>1?"s":"") : ""}${drinkLast ? " · drink" : ""}`;
}

function pzUpdateToppingTags() {
  const el = document.getElementById("pz-topping-tags");
  if (!el) return;
  const tops = state.currentPizza.filter(id => TOPPING_IDS.includes(id));
  el.innerHTML = tops.map(id =>
    `<span class="pz-topping-tag">${pzIdToName(id)} <button class="pz-remove-btn" onclick="pzRemoveTopping('${id}')">✕</button></span>`
  ).join("");
  const lastItem = state.currentPizza[state.currentPizza.length-1];
  if (DRINK_IDS.includes(lastItem)) {
    el.innerHTML += `<span class="pz-topping-tag" style="border-color:#88ccff;color:#88ccff">${pzIdToName(lastItem)} <button class="pz-remove-btn" onclick="addDrink('${lastItem}')">✕</button></span>`;
  }
}

function pzRemoveTopping(id) {
  const idx = state.currentPizza.indexOf(id);
  if (idx !== -1) state.currentPizza.splice(idx, 1);
  if (!state.currentPizza.includes(id)) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("selected");
  }
  pzDrawPizza();
  pzUpdateCanvasLabel();
  pzUpdateToppingTags();
  updateCartPreview();
  if (!SIZE_IDS.includes(state.currentPizza[0])) {
    const btn = document.getElementById("addCart");
    if (btn) btn.disabled = true;
  }
}

function addDrink(id) {
  const cartBtn = document.getElementById("addCart");
  const el = document.getElementById(id);
  if (!state.selectDrink) {
    cartBtn.disabled = false;
    setButtons(SIZE_IDS, true);
    DRINK_IDS.filter(d => d !== id).forEach(d => document.getElementById(d).disabled = true);
    state.currentPizza.push(id);
    if (el) el.classList.add("selected");
  } else {
    cartBtn.disabled = !state.currentPizza.some(i => SIZE_IDS.includes(i));
    setButtons(SIZE_IDS, false);
    DRINK_IDS.filter(d => d !== id).forEach(d => document.getElementById(d).disabled = false);
    state.currentPizza.pop();
    if (el) el.classList.remove("selected");
  }
  state.selectDrink = !state.selectDrink;
  pzUpdateToppingTags();
  updateCartPreview();
}

function addToOrder(id) {
  if (SIZE_IDS.includes(id)) {
    const prevSizeIdx = state.currentPizza.findIndex(i => SIZE_IDS.includes(i));
    if (prevSizeIdx !== -1) state.currentPizza.splice(prevSizeIdx, 1);
  }
  state.currentPizza.push(id);
  document.getElementById("addCart").disabled  = false;
  document.getElementById("compOrder").disabled = state.pizzaOrders.length === 0;
  if (SIZE_IDS.includes(id)) {
    SIZE_IDS.forEach(s => { const el = document.getElementById(s); if (el) { el.classList.toggle("selected", s === id); el.disabled = s !== id; } });
    setButtons(TOPPING_IDS, false);
    setButtons(DRINK_IDS, true);
  } else if (TOPPING_IDS.includes(id)) {
    const el = document.getElementById(id);
    if (el) el.classList.add("selected");
  }
  pzDrawPizza();
  pzUpdateCanvasLabel();
  pzUpdateToppingTags();
  updateCartPreview();
}

function addOrder() {
  [...SIZE_IDS, ...TOPPING_IDS, ...DRINK_IDS].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("selected");
  });
  setButtons(SIZE_IDS, false);
  setButtons(TOPPING_IDS, true);
  const isDrinkOnly = DRINK_IDS.includes(state.currentPizza[0]);
  setButtons(DRINK_IDS, isDrinkOnly);
  if (state.editingSlot >= 0 && state.editingSlot <= state.pizzaOrders.length) {
    state.pizzaOrders.splice(state.editingSlot, 0, [...state.currentPizza]);
    state.editingSlot = -1;
  } else {
    state.pizzaOrders.push([...state.currentPizza]);
  }
  state.currentPizza = [];
  state.selectDrink = false;
  document.getElementById("addCart").disabled  = true;
  document.getElementById("compOrder").disabled = false;
  pzRenderCart();
  pzDrawPizza();
  pzUpdateCanvasLabel();
  pzUpdateToppingTags();
  updateCartPreview();
}

function order() {
  // Build the full HTML string inside a variable
  let content = `<div id="webApp">
    <div class="pz-receipt-wrap">
      <div class="pz-receipt-header">
        <div class="pz-receipt-logo">&#127829; Pizza.NET &#127829;</div>
        <div class="pz-receipt-sub">Thank you for your order!</div>
      </div>
      <hr class="pz-receipt-divider">`;

  let rule = 0;
  for (const pizza of state.pizzaOrders) {
    const sizeId = SIZE_IDS.includes(pizza[0]) ? pizza[0] : "";
    const lastItem = pizza[pizza.length - 1];
    const drinkId = DRINK_IDS.includes(lastItem) ? lastItem : "";
    const toppingList = pizza.filter(item => TOPPING_IDS.includes(item));
    const idToName = id => id.replace(/canadianbacon/,"canadian bacon").replace(/artichokehearts/,"artichoke hearts").replace(/bananapepper/,"banana pepper").replace(/greenpepper/,"green pepper").replace(/brusselsprouts/,"brussel sprouts").replace(/picklejuice/,"pickle juice").replace(/bacongrease/,"bacon grease").replace(/melloyello/,"mello yello").replace(/mountaindew/,"mountain dew").replace(/mrpibb/,"mr. pibb").replace(/drpepper/,"dr. pepper").replace(/extralarge/,"extra-large");
    const sizeName = idToName(sizeId);
    const toppingStr = toppingList.length === 0 ? "nothing" : toppingList.map(idToName).join(", ");
    const drinkStr = drinkId ? ` with a ${idToName(drinkId)}` : "";
    if (!sizeId) {
      content += `<div class="pz-receipt-item">1 ${idToName(drinkId)}</div>`;
    } else {
      content += `<div class="pz-receipt-item">1 ${sizeName} pizza with ${toppingStr}${drinkStr}</div>`;
    }
    pizza.forEach(item => {
      if (SIZE_IDS.includes(item)) rule += SIZE_IDS.indexOf(item) * 2;
      if (TOPPING_IDS.includes(item)) rule += TOPPING_IDS.indexOf(item);
      if (DRINK_IDS.includes(item)) rule += DRINK_IDS.indexOf(item) * 5;
    });
  }

  content += `<hr class="pz-receipt-divider"><div class="pz-receipt-meta">Paid By: John Doe</div>`;
  const rng = new MonoRandom((rule * state.userID) % 2147483647);
  content += `<div class="pz-receipt-meta">Deliver To:</div><div class="pz-receipt-dest">${nextStep(rng)}</div>`;
  content += `<div class="pz-receipt-footer">&#127829; Thank you for dialing up to Pizza.NET! &#127829;</div>
    </div>
  </div>`;

  // Replace the whole monitor content at once
  html.innerHTML = windowBar() + content;
  setWinTitle("Pizza.NET — Receipt");

  state.currentPizza = [];
  state.pizzaOrders  = [];
}

function generatePizzaOrder(ruleseed, call = false) {
  const count   = ruleseed.nextMax(3) + 1;
  const parts   = [];
  let rule = 0;
  for (let c = 0; c < count; c++) {
    const size         = ruleseed.nextMax(PIZZA_SIZES.length);
    const toppingCount = ruleseed.nextMax(Math.floor(PIZZA_TOPPINGS.length / 4));
    rule += size * 2;
    let toppingStr;
    if (toppingCount === 0) {
      toppingStr = "nothing on it";
    } else {
      const tops = Array.from({length: toppingCount}, () => {
        const ti = ruleseed.nextMax(PIZZA_TOPPINGS.length);
        rule += ti;
        return PIZZA_TOPPINGS[ti];
      });
      toppingStr = (toppingCount === 1 ? tops[0] : tops.slice(0,-1).join(", ") + " and " + tops.at(-1))
                 + (call ? " on it" : "");
    }
    let line;
    if (call) {
      line = `a ${PIZZA_SIZES[size]} pizza with ${toppingStr}`;
    } else {
      line = `${PIZZA_SIZES[size]} pizza with ${toppingStr}  ${PIZZA_PRICES[size]}/`;
    }
    if (ruleseed.nextMax(2) === 1) {
      const di    = ruleseed.nextMax(DRINKS.length);
      const drink = DRINKS[di];
      rule += di * 5;
      line += call ? ` and a ${drink}/` : `${drink}:  2.99/`;
    } else if (call) {
      line += "/";
    }
    parts.push(line);
  }
  return parts.join(call ? " and " : "");
}

// A receipt is plain text, same as the RPG battle log — not an image — so
// it gets no boxed card and no colors of its own; it just inherits whatever
// page it lands on. pizzaReceipt and pizzaReceiptText were identical, kept
// as two names since other code calls each by name depending on context.
async function pizzaReceipt(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div id="receipt-container"></div>`;
  const order = generatePizzaOrder(ruleseed);
  await delay(300);
  const container = document.getElementById("receipt-container");
  if (!container) return;
  const lines = ("Pizza.NET\nORDER:\n" + order.replaceAll("/", "\n")).split("\n").filter(l => l.trim());
  container.innerHTML = `<div class="lead-receipt-wrap">
    <div class="lead-receipt-title">&#127829; Pizza.NET</div>
    ${lines.map(l => `<div class="lead-receipt-line">${l}</div>`).join("")}
    <div class="lead-receipt-line" style="border-top:1px dashed currentColor;opacity:0.9;margin-top:4px;padding-top:3px;text-align:center;font-size:8px">Thank you for dialing up to Pizza.NET!</div>
  </div>`;
}

async function pizzaReceiptText(ruleseed) {
  return pizzaReceipt(ruleseed);
}

// ─────────────────────────────────────────────────────────────────────────────
// PHONE / SKYPE
// ─────────────────────────────────────────────────────────────────────────────

function inputNumber(digit) {
  if (state.phoneDigits >= 10) return;
  const disp = document.getElementById("phoneNumberDisplay");
  if (state.phoneDigits === 0) { state.callerID = ""; disp.innerHTML = "("; }
  if (state.phoneDigits === 3) disp.innerHTML += ") ";
  if (state.phoneDigits === 6) disp.innerHTML += "-";
  disp.innerHTML += digit;
  state.phoneDigits++;
  state.callerID += String(digit);
}

async function callNumber() {
  if (state.callerID.length !== 10 || state.callerID === "undefined") {
    const displayNum = document.getElementById("phoneNumberDisplay")?.innerHTML || state.callerID;
    state.callLog.push({
      number: displayNum.replace(/<[^>]*>/g, ""),
      time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
      connected: false,
    });
    html.innerHTML = `${windowBar()}
    <div class="sky-wrap">
      <div class="sky-header"><span style="font-size:16px">&#128222;</span><div class="sky-logo">Skype</div></div>
      <div class="sky-body">
        <div class="sky-display" style="font-size:10px;color:#c00;text-align:center">${state.callerID}</div>
        <div style="text-align:center;font-size:9px;color:#999;margin-top:4px">Cannot connect to this number</div>
      </div>
    </div>`;
    await delay(100);
    audio = new Audio("audio/calling.mp3"); audio.play();
    await delay(3000);
    audio = new Audio("audio/cannotcomplete.mp3"); audio.play();
    await delay(20000);
    endCall();
    return;
  }

  const rule    = (parseInt(state.callerID) * state.userID) % 2147483647;
  const rng     = new MonoRandom(rule);
  const display = document.getElementById("phoneNumberDisplay").innerHTML;

  // Log the successful connection
  state.callLog.push({
    number: display.replace(/<[^>]*>/g, ""),
    time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}),
    connected: true,
  });

  html.innerHTML = `${windowBar()}
  <div class="sky-wrap">
    <div class="sky-header"><span style="font-size:16px">&#128222;</span><div class="sky-logo">Skype</div></div>
    <div class="sky-body">
      <div class="sky-display" id="display">${display}</div>
      <div style="text-align:center;font-size:9px;color:#00aff0;margin-top:4px" id="call-status">&#128222; Calling...</div>
    </div>
  </div>`;
  await delay(100);

  const isPizza = rng.nextMax(2) === 0;

  state.traversals++;
  audio = new Audio("audio/calling.mp3"); audio.play();
  await delay(3000);

  if (isPizza) {
    const order = generatePizzaOrder(rng, true);
    await pizza(order.toLowerCase());
  } else {
    const encodeMethods = ["spectro", "nato", "morse", "tap"];
    const encodeMethod = encodeMethods[rng.nextMax(encodeMethods.length)];
    const nextContent = nextStep(rng);
    const handler = CALL_HANDLERS[encodeMethod];
    await handler(nextContent.toLowerCase());
  }
}

const CALL_HANDLERS = { spectro, nato, morse, tap, pizza };

async function spectro(message) {
  for (const ch of message) {
    if (ch === "\n" || ch === " ") {
      await delay(500);
      continue;
    }
    let idx;
    if (ch === ".") idx = MESSAGE_CHARS.indexOf("dot");
    else if (ch === "/") idx = MESSAGE_CHARS.indexOf("slash");
    else if (ch === "-") idx = MESSAGE_CHARS.indexOf("-");
    else idx = MESSAGE_CHARS.indexOf(ch);
    if (idx !== -1) {
      const audio = new Audio(`audio/spectro/${MESSAGE_CHARS[idx]}.wav`);
      // Wait for the audio to finish playing
      await new Promise(resolve => {
        audio.onended = resolve;
        audio.play();
      });
    }
  }
  await delay(1000);
  endCall();
}

async function nato(message) {
  for (const ch of message) {
    if (ch === "\n") { await delay(1000); continue; }
    const key = ch === "." ? "dot" : ch === "/" ? "slash" : ch === "-" ? "dash" : ch;
    if (MESSAGE_CHARS.includes(key)) { audio = new Audio(`audio/nato/${key}.mp3`); audio.play(); await delay(500); }
  }
  await delay(1000); endCall();
}

async function morse(message) {
  for (const ch of message) {
    if (ch === "\n") { await delay(1000); continue; }
    const key = ch === "." ? "dot" : ch === "/" ? "slash" : ch;
    const idx = MESSAGE_CHARS.indexOf(key);
    if (idx !== -1) {
      for (const sym of MORSE_ALPHA[idx]) {
        audio = new Audio(sym === "." ? "audio/morse/dot.mp3" : "audio/morse/dash.mp3");
        audio.play(); await delay(sym === "." ? 200 : 400);
      }
    }
    await delay(600);
  }
  await delay(1000); endCall();
}

async function tap(message) {
  for (const ch of message) {
    if (ch === "\n") { await delay(1000); continue; }
    const key  = ch === "." ? "dot" : ch === "/" ? "slash" : ch;
    const taps = tapCodeDigits(key);
    if (taps) {
      for (const count of taps) {
        for (let k = 0; k < count; k++) { new Audio("audio/tapCode/tap.wav").play(); await delay(500); }
        await delay(500);
      }
    }
  }
  await delay(1000); endCall();
}

function tapCodeDigits(character) {
  for (let i = 0; i < TAP_CODES.length; i++)
    for (let j = 0; j < TAP_CODES[i].length; j++)
      if (character === TAP_CODES[i][j]) return [i+1, j+1];
  return null;
}

async function pizza(message) {
  const sentences = (`Thank you for calling Pizza.NET's hotline. My name is ${USERS[Math.floor(Math.random()*USERS.length)]}. How may I take your order?/` + message).split("/");
  for (const s of sentences) {
    const utt = new SpeechSynthesisUtterance(s);
    utt.voice = voices[0];
    await new Promise((res, rej) => { utt.onend = res; utt.onerror = rej; synth.speak(utt); });
  }
  await delay(1000); endCall();
}

function endCall() {
  new Audio("audio/callend.mp3").play();
  state.callerID    = "undefined";
  state.phoneDigits = 0;
  audio = {};
  loadSkype();
}

// ─────────────────────────────────────────────────────────────────────────────
// WORDLE
// ─────────────────────────────────────────────────────────────────────────────

function prepWordle(n) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; state.typable = false; state.isWordle = false; });

  // Inject Wordle CSS once
  if (!document.getElementById("wrd-style")) {
    const s = document.createElement("style");
    s.id = "wrd-style";
    s.textContent = `
      .wrd-col { display:inline-flex; flex-direction:column; align-items:center; margin:1px; }
      .wrd-tile {
        display:flex; align-items:center; justify-content:center;
        border:2px solid #d3d6da; background:#fff; color:#333;
        font-weight:700; box-sizing:border-box;
        transition:border-color 0.1s;
        backface-visibility:hidden;
      }
      .wrd-tile.filled  { border-color:#878a8c; }
      .wrd-tile.correct { border-color:#538d4e; background:#538d4e; color:#fff; animation:wrd-flip 0.5s ease forwards; }
      .wrd-tile.wrong   { border-color:#787c7e; background:#787c7e; color:#fff; animation:wrd-flip 0.5s ease forwards; }
      .wrd-fb {
        display:flex; align-items:center; justify-content:center;
        box-sizing:border-box; opacity:0; transition:opacity 0.2s;
        font-weight:700;
      }
      .wrd-fb.visible { opacity:1; }
      .wrd-fb.correct { color:#538d4e; }
      .wrd-fb.wrong   { color:#787c7e; }
      @keyframes wrd-flip {
        0%   { transform:scaleY(1); }
        50%  { transform:scaleY(0); }
        100% { transform:scaleY(1); }
      }
    `;
    document.head.appendChild(s);
  }

  html.innerHTML = `${windowBar()}
  <div class="wrd-wrap">
    <div class="wrd-header">
      <div class="wrd-title">Wordle</div>
      <div class="wrd-sub">Guess the hidden link — type and press Enter</div>
    </div>
    <div id="wrd-body" style="padding:8px"></div>
  </div>`;
  setWinTitle("Wordle");

  const rng  = new MonoRandom(combinedSeed(n));
  const link = nextLink(rng);
  state.eventLink  = link;
  state.linkLength = link.length;
  state.typable    = true;
  state.isWordle   = true;

  const count = String(state.wordleCounter).padStart(2,"0");
  wrdAppendGuessRow(count, link.length);
  initialHTML = html.innerHTML;
}

function prepCrossword(n) {
  const snap = html.innerHTML;
  pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; state.typable = false; state.isWordle = false; });

  // Get the numeric combined seed
  const combined = combinedSeed(n);
  const rng = new MonoRandom(combined);
  currentCompletionPhone = LINK_GENERATORS.phoneNumber(rng);

  // Add permanent highlight styles for crossword (only once)
  if (!document.getElementById("cw-style")) {
    const s = document.createElement("style");
    s.id = "cw-style";
    s.textContent = `
      .cell-input.correct {
        background-color: #c8e6c9;
        border-color: #4caf50;
        color: #1b5e20;
      }
      .cell-input.incorrect {
        background-color: #ffcdd2;
        border-color: #f44336;
        color: #c62828;
      }
      .cell.focused-cell > .cell-input {
        background-color: #f9d84a;
      }
    `;
    document.head.appendChild(s);
  }

  // Build HTML (same as before, but note the button row already only has Check and Reset)
  html.innerHTML = `${windowBar()}
  <div style="background:#f7f7f7;min-height:100%;font-family:Arial,sans-serif">
    <div style="background:#fff;text-align:center;padding:10px 8px 6px;border-bottom:1px solid #e0e0e0">
      <div style="font-family:'Times New Roman',serif;font-size:1.1rem;font-weight:700;color:#1a1a1a">The Mini</div>
      <div style="font-size:0.6rem;letter-spacing:0.12em;color:#6b6b6b;text-transform:uppercase;margin-top:2px">NY Times Crossword</div>
    </div>
    <div style="max-width:700px;margin:0 auto;padding:8px">
      <div id="cw-status" style="text-align:center;font-size:0.75rem;color:#6b6b6b;min-height:1rem;margin-bottom:6px"></div>
      <div id="cw-infoBar" style="display:none;text-align:center;margin-bottom:6px;font-size:0.65rem;color:#888;letter-spacing:0.06em">
        <span id="cw-chipSize"></span> &nbsp;·&nbsp;
        <span id="cw-chipWords"></span> &nbsp;·&nbsp;
        <span id="cw-chipEncrypt"></span>
      </div>
      <div id="cw-checkRow" style="display:none;text-align:center;margin-bottom:8px">
        <button onclick="cw_checkAnswers()" style="background:#1a1a1a;color:#fff;border:none;font-size:0.7rem;font-weight:700;padding:5px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;margin:0 3px">Check</button>
        <button onclick="cw_resetPuzzle()" style="background:#fff;color:#1a1a1a;border:1px solid #ccc;font-size:0.7rem;font-weight:700;padding:5px 14px;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;border-radius:2px;margin:0 3px">Reset</button>
      </div>
      <div id="cw-puzzleContainer" style="display:flex;flex-wrap:wrap;gap:16px;justify-content:center">
        <div>
          <div id="cw-gridTitle" style="font-size:0.75rem;color:#6b6b6b;margin-bottom:6px;text-align:center"></div>
          <div id="cw-crosswordGrid" style="display:inline-grid;border:2px solid #000;background:#000;gap:1px"></div>
        </div>
        <div style="min-width:220px;max-width:340px">
          <div style="margin-bottom:10px">
            <div style="font-family:Arial,sans-serif;font-size:0.65rem;font-weight:700;color:#000;border-bottom:2px solid #000;padding-bottom:3px;margin-bottom:6px;letter-spacing:0.08em;text-transform:uppercase">Across</div>
            <div id="cw-cluesAcross"></div>
          </div>
          <div>
            <div style="font-family:Arial,sans-serif;font-size:0.65rem;font-weight:700;color:#000;border-bottom:2px solid #000;padding-bottom:3px;margin-bottom:6px;letter-spacing:0.08em;text-transform:uppercase">Down</div>
            <div id="cw-cluesDown"></div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
  setWinTitle("NYT Crossword");
  initialHTML = html.innerHTML;

  // Pass the numeric combined seed, not the rng object
  cw_runPuzzle(combined);
}

let currentCompletionPhone = null;
let currentPuzzle = null;
let currentRng    = null;

async function cw_runPuzzle(seed) {
  cw_setStatus('Generating puzzle…');
  const rng = new MonoRandom(seed);
  currentRng = rng;

  const sizes    = [7, 9, 11, 13];
  const gridSize = sizes[rng.nextMax(sizes.length)];
  const wordCount = rng.next(8, Math.floor(gridSize * gridSize * 0.15) + 10);

  const maxLen  = Math.min(gridSize - 1, 12);
  const words   = rng.shuffleArray(WORD_BANK.filter(w => w.word.length >= 3 && w.word.length <= maxLen)).slice(0, wordCount + 15);

  if (words.length < 4) { cw_setStatus('Not enough words — try another link.'); return; }

  const puzzle = buildCrossword(rng, words, gridSize);
  if (!puzzle) { cw_setStatus('Could not generate puzzle — try another link.'); return; }

  currentPuzzle = puzzle;
  renderPuzzle(puzzle, rng, seed);
  cw_setStatus('');
}

function cwDialPhone(phone) {
  // Strip formatting to get 10 digits
  const digits = phone.replace(/\D/g, '');
  state.callerID    = digits;
  state.phoneDigits = 10;
  loadSkype();
  // Pre-fill display after Skype loads
  setTimeout(() => {
    const disp = document.getElementById("phoneNumberDisplay");
    if (disp) disp.innerHTML = phone;
  }, 200);
}