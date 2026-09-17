// ─────────────────────────────────────────────────────────────────────────────
// STATE
// ─────────────────────────────────────────────────────────────────────────────

const state = {
  userID: 0,
  traversals: 0,
  play: false,
  typable: false,
  isWordle: false,
  phoneDigits: 0,
  callerID: "",
  attempt: 0,
  wordleCounter: 0,
  wordle1: 0,
  wordle2: 0,
  linkLength: 0,
  eventLink: "",
  eventIterate: "",
  eventCount: "",
  currentPizza: [],
  pizzaOrders: [],
  downloads: [],
  downloadRules: [],
  downloadNames: [],
  emails: [],
  selectDrink: false,
  editingSlot: -1,
  staticWord: "",
  frameCount: 0,
  staticTextCanvas: null,
  callLog: [],
  history: [],
  loginTime: null,
  leadTarget: null,
};

const passwords = new Array(USERS.length).fill("");
let html, initialHTML, audio = {};
const synth = window.speechSynthesis;
let voices = [];
if ("onvoiceschanged" in synth) synth.onvoiceschanged = () => { voices = synth.getVoices(); };
else voices = synth.getVoices();