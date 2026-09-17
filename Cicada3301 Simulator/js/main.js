// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// ─────────────────────────────────────────────────────────────────────────────

window.onload = function () {
  html = document.getElementsByClassName("monitor")[0];
  const lastLogin = localStorage.getItem("cicada_last_login");
  const lastUser  = localStorage.getItem("cicada_last_user");
  const lastLoginHint = lastLogin && lastUser
    ? `<div class="os-login-hint">Last login: ${lastUser} — ${lastLogin}</div>`
    : "";
  html.innerHTML = loginForm(lastLoginHint);
  generatePasswords();
};

function login() {
  const username = document.getElementById("login").value;
  const password = document.getElementById("password").value;

  if (username === "SELECT * FROM users WHERE 1=1" || password === "SELECT * FROM users WHERE 1=1") {
    const rows = USERS.map((u, i) => `<tr><td>${u}</td><td>${passwords[i]}</td></tr>`).join("");
    html.innerHTML = `<div class="os-sql-dump"><div class="os-sql-dump-title">ACCESS GRANTED</div><p class="os-sql-dump-sub">Hello Admin :D</p><table class="os-sql-table"><thead><tr><th>User</th><th>Password</th></tr></thead><tbody>${rows}</tbody></table></div>`;
    return;
  }

  const userIndex = USERS.findIndex((u, i) => u === username && passwords[i] === password);
  const nameMatch = USERS.includes(username);

  if (userIndex !== -1) {
    state.userID    = userIndex + 1;
    state.loginTime = new Date();
    const loginStr  = state.loginTime.toLocaleString([], {month:'short', day:'numeric', hour:'2-digit', minute:'2-digit'});
    localStorage.setItem("cicada_last_login", loginStr);
    localStorage.setItem("cicada_last_user",  USERS[userIndex]);
    html.innerHTML = appMenu(USERS[userIndex]);
    startDesktopClock();
  } else if (nameMatch) {
    html.innerHTML = loginForm(`<div class="os-login-err">Incorrect password.</div>`);
  } else {
    const hint = state.attempt >= 3
      ? `<div class="os-login-err">SELECT * FROM users WHERE 1=1</div>`
      : `<div class="os-login-err">Unknown user.</div>`;
    html.innerHTML = loginForm(hint);
    state.attempt++;
  }
}

// Login screen now matches the detected OS the same way the desktop, taskbar,
// and every app window already do — a centered avatar circle plus a
// sign-in button styled and labeled like that OS's own (Windows "Sign in",
// macOS "Sign In", GNOME "Log In"). The username field stays visible in all
// three even though a real OS would only show it after picking an account,
// since guessing the username is part of the puzzle.
function loginForm(extra = "") {
  const os = detectOS();
  const signInLabel = os === "linux" ? "LOG IN" : "SIGN IN";
  return `<div class="os-login-wrap os-login-${os}">
    <div class="os-login-avatar">&#128100;</div>
    <div class="os-login-field"><label class="os-login-label">USERNAME</label><input class="os-login-input" id="login" autocomplete="off"></div>
    <div class="os-login-field"><label class="os-login-label">PASSWORD</label><input class="os-login-input" type="password" id="password"></div>
    <button class="os-login-btn" onclick="login()">${signInLabel}</button>
    ${extra}
  </div>`;
}

function generatePasswords() {
  const now    = new Date();
  const DATE   = now.getDate();
  const MONTH  = 1 + now.getMonth();
  const YEAR   = now.getFullYear();
  const DAY    = 1 + now.getDay();
  const HOUR   = 1 + now.getHours();
  const seed   = ((DATE * 10000) * ((MONTH + DAY) * 100) * YEAR + HOUR) % 2147483647;
  const chars  = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-_+={}[]|\\;:,./?\"";
  const rng    = new MonoRandom(seed);
  USERS.forEach((_, i) => {
    passwords[i] = Array.from({length: 8}, () => chars[rng.nextMax(chars.length)]).join("");
  });
}