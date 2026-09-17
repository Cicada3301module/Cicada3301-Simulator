const subjects = ["Sequence", "Find 8", "Numbers", "Static", "Color-By-Number"];
const emails   = ["quizzingtonj.puzzle@tormail.onion"];

function sendEmail() {
  const to      = document.getElementById("to").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const errorEl = document.getElementById("composeError");

  const subjectMatch = subjects.some(s => subject.toLowerCase().includes(s.toLowerCase()));
  const emailMatch   = emails.some(e => to.includes(e));

  if (!emailMatch || !subjectMatch) {
    errorEl.innerHTML = "&#9656; TRANSMISSION FAILED — INVALID RECIPIENT OR SUBJECT";
    return;
  }

  errorEl.innerHTML = "";
  window.opener.postMessage({ type: "emailData", to, subject, message }, "*");
}

window.addEventListener("message", event => {
  const errorEl = document.getElementById("composeError");
  if (event.data?.type === "emailError") {
    errorEl.innerHTML = "&#9656; " + event.data.error.toUpperCase();
  } else if (event.data?.type === "emailSuccess") {
    window.close();
  }
});