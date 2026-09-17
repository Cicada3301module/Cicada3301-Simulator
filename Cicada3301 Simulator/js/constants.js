// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const USERS = ["Asew54321","Axodeau","Crazycaleb","Diffuse","Ghastly","Jacobo","redpenguin","TylerY2992"];
const WEBSITE_CHARS  = "abcdefghijklmnopqrstuvwxyz0123456789";
const RULESEED_CHARS = "abcdefghijklmnopqrstuvwxyz234567";
const PI_DIGITS       = "314159265358979323846264338327950288419716939937510582097494";
const PANGRAM         = "In the quiet village of Zenith, the quick brown fox jumps over a lazy dog near the edge of the woods. Meanwhile, a wizard with a quirky sense of humor conjures a dazzling array of multicolored lights, amusing the bystanders. Across the meadow, a zebra and an exotic bird exchange curious glances, each marveling at the other's striking appearance.";
const MESSAGE_CHARS   = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","dot","slash","-"];
const MORSE_ALPHA     = [".----","..---","...--","....-",".....","-....","--...","---..","----.","-----","--.-",".--",".",".-.","-","-.--","..-","..","---",".--.",".-","...","-..","..-.","--.","....",".---","-.-",".-..","--..","-..-","-.-.","...-","-...","-.","--",".-.-.-","-..-.","-....-"];
const TAP_CODES       = [["a","b","c","d","e","f","g"],["h","i","j","k","l","m","n"],["o","p","q","r","s","t","u"],["v","w","x","y","z","0","1"],["2","3","4","5","6","7","8"],["9","dot","slash","-"]];
const GEMATRIA_PRIMUS = ['ᚠ','ᚢ','ᚦ','ᚩ','ᚱ','ᚳ','ᚷ','ᚹ','ᚻ','ᚾ','ᛁ','ᛄ','ᛇ','ᛈ','ᛉ','ᛋ','ᛏ','ᛒ','ᛖ','ᛗ','ᚪ','ᚫ','ᚣ','ᛡ','ᛠ','ᛚ','ᛝ','ᛟ','ᛞ'];
const LIBER_LETTERS   = ["F","V","TH","O","R","C","G","W","H","N","I","J","EO","P","X","S","T","B","E","M","L","NG","OE","D","A","AE","Y","IA","EA"];
const GOOGLE_SITE     = ["reddit","4chan","imgur","pastebin","twitter","x","dropbox","nytimes","quizzington"];
const PIZZA_TOPPINGS = ["pepperoni","sausage","canadian bacon","bacon","chicken","beef","meatball","salami","anchovies","mushroom","onion","pineapple","olive","jalapeno","banana pepper","green pepper","tomato","spinach","garlic","artichoke hearts","zucchini","turkey","corn","cranberries","blueberries","kimchi","sauerkraut","apricot","clam","potato","peach","brussel sprouts","crab","Skittles","cicadas"];
const PIZZA_SIZES    = ["small","medium","large","extra-large"];
const PIZZA_PRICES   = [9.99, 12.99, 15.99, 21.99];
const DRINKS         = ["Coke","Pepsi","Starry","Sprite","Water","Doctor Pepper","Mister Pibb","Mountain Dew","Mello Yellow","Bleach","Bacon Grease","Pickle Juice","Beverly"];
const DRINK_IDS      = ["coke","pepsi","starry","sprite","water","drpepper","mrpibb","mountaindew","melloyello","bleach","bacongrease","picklejuice","beverly"];
const SIZE_IDS       = ["small","medium","large","extralarge"];
const TOPPING_IDS    = ["pepperoni","sausage","canadianbacon","bacon","chicken","beef","meatball","salami","anchovies","mushroom","onion","pineapple","olive","jalapeno","bananapepper","greenpepper","tomato","spinach","garlic","artichokehearts","zucchini","turkey","corn","cranberries","blueberries","kimchi","sauerkraut","apricot","clam","potato","peach","brusselsprouts","crab","skittles","cicadas"];
const LEADS = {
  onion:    ["messageInImageFile","qrCode","imageProductWebsite","pizzaOrder","catOutguess","rpgBattleLog","messageHiddenInImage"],
  reddit:   ["messageInImageFile","asciiCaesarCipher","imageProductWebsite","asciiPigpen","asciiPlayfairCipher","catOutguess","rpgBattleLog","messageHiddenInImage"],
  fourChan: ["imageProductWebsite","imageProductWebsite","asciiPigpen","hexToASCII","hexToASCII","pizzaOrder","catOutguess"],
  imgur:    ["messageInImageFile","qrCode","imageProductWebsite","imgurPage","messageHiddenInImage"],
  pastebin: ["asciiCaesarCipher","asciiCaesarCipher","hexToASCII","hexToASCII","asciiPlayfairCipher","asciiPlayfairCipher","pizzaOrder","rpgBattleLog"],
  twitter:  ["imageProductWebsite","imageProductWebsite","hexToASCII","hexToASCII","pizzaOrder","catOutguess"],
  dropbox:  ["imageProductWebsite","asciiCaesarCipher","messageInImageFile","qrCode","midiSubstitution","pgp","rpgBattleLog","messageHiddenInImage"],
};


const SKYPE_CONTACTS = [
  { name: "Asew54321",    number: "5554190022" },
  { name: "Axodeau",      number: "5554830147" },
  { name: "Crazycaleb",   number: "5550639284" },
  { name: "Diffuse",      number: "5557412093" },
  { name: "Ghastly",      number: "5553870561" },
  { name: "Jacobo",       number: "5558134729" },
  { name: "redpenguin",   number: "5551029384" },
  { name: "TylerY2992",   number: "5556283047" },
];

const PRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541];
const DIMENSION_PRIMES = [503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];