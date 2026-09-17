window.opener?.postMessage({ type: "childReady" }, "*");

window.addEventListener("message", function(event) {
  const data = event.data;
  if (!data || data.type !== "emailReply") return;

  const fromEl       = document.getElementById("from");
  const subjectEl    = document.getElementById("subject");
  const messageEl    = document.getElementById("message");
  const attachEl     = document.getElementById("attachment");

  if (fromEl)    fromEl.innerHTML    = `FROM: <span>${data.from || "—"}</span>`;
  if (subjectEl) subjectEl.innerHTML = `SUBJECT: <span>${data.subject || "—"}</span>`;
  if (messageEl) messageEl.textContent = data.message || "—";

  if (data.attachment && attachEl) {
    attachEl.style.display = "";
    if (data.attachment.endsWith(".png") || data.attachment.endsWith(".jpg")) {
      attachEl.innerHTML = `&#128206; ATTACHMENT:<br><img src="${data.attachment}" alt="attachment">`;
    } else {
      attachEl.innerHTML = `&#128206; ATTACHMENT: ${data.attachment}`;
    }
  }
});