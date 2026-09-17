// ─────────────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

const delay = ms => new Promise(res => setTimeout(res, ms));

function setCharAt(str, index, chr) {
  return index > str.length - 1 ? str : str.substring(0, index) + chr + str.substring(index + 1);
}


async function showInputError(input, message) {
  state.play = true;
  input.value    = message;
  input.disabled = true;
  await delay(1000);
  input.value    = "";
  input.disabled = false;
  state.play     = false;
}

// Single source of truth for the OS sniff used everywhere the mod adapts its
// chrome (window title bars, the desktop, the login screen, Network Monitor).
// Returns "mac", "linux", or "win" (the default/fallback).
//
// TESTING OVERRIDE: normally this just sniffs the real OS from the user
// agent, which makes the other two skins hard to see without switching
// machines or spoofing the UA in devtools. Call setOS("mac" | "linux" |
// "win") from the console (or open the page with ?os=mac in the URL) to
// pin a skin regardless of the real OS; call setOS(null), or setOS() with
// no argument, to go back to real detection. The override is stored in
// localStorage so it survives the login → desktop transition and page
// reloads, and it never affects a player who hasn't set it.
function detectOS() {
  const override = localStorage.getItem("cicada_os_override");
  if (override === "mac" || override === "linux" || override === "win") return override;

  const ua = navigator.userAgent;
  if (/Mac/.test(ua) && !/iPhone|iPad/.test(ua)) return "mac";
  if (/Linux/.test(ua) && !/Android/.test(ua))   return "linux";
  return "win";
}

// Console/testing helper — see the comment on detectOS() above.
function setOS(os) {
  if (os === "mac" || os === "linux" || os === "win") {
    localStorage.setItem("cicada_os_override", os);
    console.log(`[detectOS] Forced to "${os}". Reloading...`);
  } else {
    localStorage.removeItem("cicada_os_override");
    console.log("[detectOS] Override cleared — back to real OS detection. Reloading...");
  }
  location.reload();
}

// Picks up ?os=mac / ?os=linux / ?os=win from the URL on load, so a tester
// can just open main.html?os=mac instead of using the console.
(function applyOSOverrideFromURL() {
  const param = new URLSearchParams(location.search).get("os");
  if (param === "mac" || param === "linux" || param === "win") {
    localStorage.setItem("cicada_os_override", param);
  }
})();

function windowBar(closeFunc = "closeApp") {
  const os      = detectOS();
  const isMac   = os === "mac";
  const isLinux = os === "linux";
  const hasBack = state.history.length > 0;
  const backBtn = hasBack
    ? `<button class="win-back-btn" onclick="historyBack()" title="Back">&#8592;</button>`
    : `<button class="win-back-btn" style="opacity:0.25;cursor:default" disabled title="No history">&#8592;</button>`;

  if (isMac) {
    return `<div class="win-titlebar win-titlebar-mac">
      <div class="win-traffic-lights">
        <button class="win-tl win-tl-close"   onclick="${closeFunc}()" title="Close"></button>
        <button class="win-tl win-tl-minimize" title="Minimize"></button>
        <button class="win-tl win-tl-maximize" title="Maximize"></button>
      </div>
      ${backBtn}
      <div class="win-titlebar-title" id="win-title">CICADA_OS</div>
      <div style="width:52px"></div>
    </div>`;
  }

  if (isLinux) {
    return `<div class="win-titlebar win-titlebar-linux">
      ${backBtn}
      <div class="win-titlebar-title" id="win-title">CICADA_OS</div>
      <div class="win-linux-controls">
        <button class="win-linux-btn win-linux-close" onclick="${closeFunc}()" title="Close">&#10005;</button>
      </div>
    </div>`;
  }

  // Windows style (default)
  return `<div class="win-titlebar win-titlebar-win">
    <div class="win-titlebar-icon">&#128187;</div>
    ${backBtn}
    <div class="win-titlebar-title" id="win-title">CICADA_OS</div>
    <div class="win-controls">
      <button class="win-ctrl-btn win-ctrl-min"   title="Minimize">&#8211;</button>
      <button class="win-ctrl-btn win-ctrl-max"   title="Maximize">&#9633;</button>
      <button class="win-ctrl-btn win-ctrl-close" onclick="${closeFunc}()" title="Close">&#10005;</button>
    </div>
  </div>`;
}

// ── History helpers ───────────────────────────────────────────────────────────

function pushHistory(title, restoreFn) {
  state.history.push({ title, restore: restoreFn, traversals: state.traversals });
}

function historyBack() {
  if (!state.history.length) return;
  const entry = state.history.pop();
  state.traversals = entry.traversals;
  state.leadTarget = null;
  state.typable    = false;
  state.isWordle   = false;
  if (netMonInterval) { clearInterval(netMonInterval); netMonInterval = null; }
  if (desktopClockInterval) { clearInterval(desktopClockInterval); desktopClockInterval = null; }
  entry.restore();
}

function setWinTitle(title) {
  const el = document.getElementById("win-title");
  if (el) el.textContent = title;
}

function getLeadTarget() {
  if (state.leadTarget) {
    const el = document.getElementById(state.leadTarget);
    if (el) return el;
  }
  return document.getElementById("webApp") || html;
}

// Single source of truth for "which file types can be downloaded, and what
// extension does each get" — used by the real Dropbox download flow and by
// the test bench (prepDownloadTest) that stages one of each at once.
const DOWNLOAD_FILE_EXT = {
  midiSubstitution:     ".mid",
  pgp:                  ".pgp",
  imageProductWebsite:  ".png",
  messageInImageFile:   ".png",
  messageHiddenInImage: ".png",
  qrCode:               ".png",
  catOutguess:          ".png",
  asciiCaesarCipher:    ".txt",
  asciiPlayfairCipher:  ".txt",
  hexToASCII:           ".txt",
};

function generateDownloadName(fileType) {
  const ext = DOWNLOAD_FILE_EXT[fileType] || ".file";
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDay()}_${now.getHours()}.${now.getMinutes()}.${now.getSeconds()}${ext}`;
}

function fileTypeLabel(type) {
  switch (type) {
    case "midiSubstitution":    return "MIDI File";
    case "pgp":                 return "PGP Key File";
    case "imageProductWebsite":
    case "messageInImageFile":
    case "messageHiddenInImage":
    case "qrCode":
    case "catOutguess":         return "PNG Image";
    case "asciiCaesarCipher":
    case "asciiPlayfairCipher":
    case "hexToASCII":          return "Text Document";
    default:                    return "File";
  }
}

function fileTypeIcon(type) {
  switch (type) {
    case "midiSubstitution":    return "🎵";
    case "pgp":                 return "🔐";
    case "imageProductWebsite":
    case "messageInImageFile":
    case "messageHiddenInImage":
    case "qrCode":
    case "catOutguess":         return "🖼️";
    case "asciiCaesarCipher":
    case "asciiPlayfairCipher":
    case "hexToASCII":          return "📄";
    default:                    return "📦";
  }
}

// Which generic "viewer app" loadFileExplorer() should open a downloaded
// file into: a light document editor for anything fundamentally text
// (decoded cipher output, the MIDI download chip, the PGP tool — all of
// which already carry their own readable colors/branding once they're on
// a light surface instead of a bare black one), or a dark photo-viewer
// letterbox for anything fundamentally an image/canvas.
function fileViewerKind(type) {
  switch (type) {
    case "imageProductWebsite":
    case "messageInImageFile":
    case "messageHiddenInImage":
    case "qrCode":
    case "catOutguess":
      return "image";
    case "pgp":
      return "pgp";
    default:
      return "text";
  }
}

function showNotification(message, icon = "📥", title = "Download Complete") {
  const existing = document.getElementById("dl-notification");
  if (existing) existing.remove();
  const n = document.createElement("div");
  n.id = "dl-notification";
  n.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 16px;
    background: #1a1a2e;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 4px 20px rgba(0,0,0,0.6);
    color: #e0e0ff;
    font-family: 'Segoe UI', Arial, sans-serif;
    font-size: 10px;
    padding: 8px 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 8px;
    z-index: 99999;
    max-width: 240px;
    animation: notif-in 0.25s ease;
    letter-spacing: 0.3px;
    cursor: pointer;
  `;
  n.innerHTML = `
    <span style="font-size:16px;flex-shrink:0">${icon}</span>
    <div style="min-width:0">
      <div style="color:#9fc79f;font-size:8px;letter-spacing:2px;text-transform:uppercase;margin-bottom:2px">${title}</div>
      <div style="word-break:break-all;opacity:0.8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${message}</div>
    </div>
  `;
  n.onclick = () => n.remove();
  if (!document.getElementById("notif-style")) {
    const s = document.createElement("style");
    s.id = "notif-style";
    s.textContent = `
      @keyframes notif-in  { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
      @keyframes notif-out { from { opacity:1; transform:translateY(0); }    to { opacity:0; transform:translateY(12px); } }
    `;
    document.head.appendChild(s);
  }
  document.body.appendChild(n);
  setTimeout(() => {
    if (!n.isConnected) return;
    n.style.animation = "notif-out 0.3s ease forwards";
    setTimeout(() => n.remove(), 320);
  }, 4000);
}

function setButtons(ids, disabled) {
  ids.forEach(id => { const el = document.getElementById(id); if (el) el.disabled = disabled; });
}

// ─────────────────────────────────────────────────────────────────────────────
// LINK GENERATORS
// ─────────────────────────────────────────────────────────────────────────────

const LINK_GENERATORS = {
  onion:        r => { const rng = new MonoRandom(r.seed); return Array.from({length:16}, ()=>RULESEED_CHARS[rng.nextMax(RULESEED_CHARS.length)]).join("") + ".onion"; },
  liber:        r => { const rng = new MonoRandom(r.seed); return Array.from({length:56}, ()=>RULESEED_CHARS[rng.nextMax(RULESEED_CHARS.length)]).join("") + ".onion"; },
  phoneNumber:  r => { const rng = new MonoRandom(r.seed); let p = "("; for (let i=0;i<10;i++){p+="0123456789"[rng.nextMax(10)];if(i===2)p+=") ";if(i===5)p+="-";}return p; },
  coordinate:   r => { const rng = new MonoRandom(r.seed); const coord = (range,offset)=>{const to=rng.nextMax(range)-offset,from=rng.nextMax(range)-offset,fx=rng.nextMax(5),rand=rng.nextMax(1000); if(rand===0) return 0; return +((1/rand)*(to-from)+from).toFixed(fx);}; return coord(181,90)+"\n"+coord(361,180); },
  reddit:       r => { const rng = new MonoRandom(r.seed); return "www.reddit.com/r/"    + randChars(rng, WEBSITE_CHARS, rng.next(6,12)); },
  "4chan":       r => { const rng = new MonoRandom(r.seed); return "boards.4chan.org/"    + randChars(rng, WEBSITE_CHARS, rng.next(1,4)); },
  imgur:        r => { const rng = new MonoRandom(r.seed); return "imgur.com/gallery/"   + randChars(rng, WEBSITE_CHARS, rng.next(5,15)); },
  pastebin:     r => { const rng = new MonoRandom(r.seed); return "www.pastebin.com/"    + randChars(rng, WEBSITE_CHARS, 8); },
  twitter:      r => { const rng = new MonoRandom(r.seed); return "www.twitter.com/"     + randChars(rng, WEBSITE_CHARS, rng.next(5,15)); },
  x:            r => { const rng = new MonoRandom(r.seed); return "www.x.com/"           + randChars(rng, WEBSITE_CHARS, rng.next(5,15)); },
  dropbox:      r => { const rng = new MonoRandom(r.seed); return "www.dropbox.com/sh/"  + randChars(rng, WEBSITE_CHARS, rng.next(5,10)); },
  nytimes:       r => { const rng = new MonoRandom(r.seed); const types=["wordle/","crossword/","masyu/"]; return "www.nytimes.com/games/" + types[rng.next(0,3)] + randChars(rng, WEBSITE_CHARS, rng.next(8,12)); },
  quizzington:  r => { const rng = new MonoRandom(r.seed); const types=["sequence/","find8/","numbers/","static/","colorbynumber/"]; return "www.quizzington.org/fliers/" + types[rng.next(0,5)] + randChars(rng, WEBSITE_CHARS, rng.next(8,12)); },
};

function randChars(rng, chars, len) {
  return Array.from({length: len}, () => chars[rng.nextMax(chars.length)]).join("");
}

const NEXT_STEP_KEYS = [null,"onion","phoneNumber","coordinate","reddit","4chan","imgur","pastebin","twitter","x","dropbox","nytimes","quizzington"];

function nextStep(ruleseed) {
  let method = ruleseed.nextMax(13);
  if (method === 0) method = 1;
  if (state.traversals >= 20) method = 10;
  return LINK_GENERATORS[NEXT_STEP_KEYS[method]](ruleseed);
}

const NEXT_LINK_KEYS = [null,"reddit","4chan","imgur","pastebin","twitter","x","dropbox","nytimes","quizzington"];

function nextLink(ruleseed) {
  let method = ruleseed.nextMax(9);
  if (method === 0) method = 1;
  if (state.traversals >= 20) method = 6;
  return LINK_GENERATORS[NEXT_LINK_KEYS[method]](ruleseed);
}