const users = ["TylerY2992","TracksJosh","TasThiluna","Deaf","Blananas2","Fish","Usernam3","EpicToast","Makebao","KavinKul","Crazycaleb","tandyCake","Fang","Vinco","Arceus","Xmaster","FredV","Kaito","SillyPuppy","Edan","Mythers","Procyon","eXish","RedPenguin","MCD573","MrPeanut","dicey"]
//const users = ["TracksJosh", "Axodeau","redpenguin", "Jacobo", "Ghastly", "Asew54321", "Diffuse", "TylerY2992"]
const passwords = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]
var downloads = [];
var downloadRules = [];
var downloadName = [];
const onionLeads = ["messageInImageFile","qrCode","imageProductWebsite"]
const redditLeads = ["messageInImageFile","asciiCaesarCipher","imageProductWebsite","asciiPigpen"]
const fourChanLeads = ["imageProductWebsite","imageProductWebsite","asciiPigpen","hexToASCII","hexToASCII"]
const imgurLeads = ["messageInImageFile","qrCode","imageProductWebsite","imgurPage"]
const pastebinLeads = ["asciiCaesarCipher","asciiCaesarCipher","hexToASCII","hexToASCII"]
const twitterLeads = ["imageProductWebsite","imageProductWebsite","hexToASCII","hexToASCII"]
const dropboxLeads = ["imageProductWebsite","asciiCaesarCipher","messageInImageFile","qrCode","midiSubstitution","pgp"]
var googleSite = ["reddit","4chan","imgur","pastebin","twitter","x","dropbox"];
var initialHTML = ``;
var user = null;
var pass = null;
var callend = false;
var play = false;
var userID = 0;
var attempt = 0;
var phoneDigits = 0;
var traversals = 0;
var phoneNumberDisplay;
var callerID = "";
var gematriaPrimus = ['ᚠ','ᚢ','ᚦ','ᚩ','ᚱ','ᚳ','ᚷ','ᚹ','ᚻ','ᚾ','ᛁ','ᛄ','ᛇ','ᛈ','ᛉ','ᛋ','ᛏ','ᛒ','ᛖ','ᛗ','ᛚ','ᛝ','ᛟ','ᛞ','ᚪ','ᚫ','ᚣ','ᛡ','ᛠ'];
var ruleseedChars = "abcdefghijklmnopqrstuvwxyz234567";
var websiteChars = "abcdefghijklmnopqrstuvwxyz0123456789";
var piDigits = "314159265358979323846264338327950288419716939937510582097494";
var pangram = "In the quiet village of Zenith, the quick brown fox jumps over a lazy dog near the edge of the woods. Meanwhile, a wizard with a quirky sense of humor conjures a dazzling array of multicolored lights, amusing the bystanders. Across the meadow, a zebra and an exotic bird exchange curious glances, each marveling at the other's striking appearance."
var messageChars = ["1","2","3","4","5","6","7","8","9","0","q","w","e","r","t","y","u","i","o","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","dot","slash"];
let audio = {};
var tapCodes = [["a","b","c","d","e","f","g"],["h","i","j","k","l","m","n"],["o","p","q","r","s","t","u"],["v","w","x","y","z","0","1"],["2","3","4","5","6","7","8"],["9","dot","slash"]]
var morseAlpha = [".----","..---","...--","....-",".....","-....","--...","---..","----.","-----","--.-",".--",".",".-.","-","-.--","..-","..","---",".--.",".-","...","-..","..-.","--.","....",".---","-.-",".-..","--..","-..-","-.-.","...-","-...","-.","--",".-.-.-","-..-."];
window.onload=function()
{
	user = document.getElementById("login");
	pass = document.getElementById("password");
	html = document.getElementsByClassName("monitor")[0];
	html.innerHTML = `<p>USERNAME:</p><input id="login"></input><p>PASSWORD:</p><input id="password"></input><div class="hi"><br><button type="button" id="ji" onclick="login()">Enter</button></div>`;
	generatePasswords();
}
function login()
{
	user = document.getElementById("login");
	pass = document.getElementById("password");
	if(user.value == "SELECT * FROM users WHERE 1=1" || pass.value == "SELECT * FROM users WHERE 1=1")
	{
		var temp = ``;
		for(var i = 0; i < users.length; i++)
		{
			temp += `<tr><th class="sqlInject">`+users[i]+`</th><th class="sqlInject">`+passwords[i]+`</th></tr>`;
		}
		html.innerHTML = `<p>Hello Admin :D</p>`;
		html.innerHTML += `<table class="sqlInject" align="center"><tbody><tr class="sqlInject"><th class="sqlInject">Users</th><th class="sqlInject">Passwords</th></tr>`+temp+`</tbody></table>`;
		html.height = (400+(users.length*25))+"px";
	}
	else
	{
		var enter = 0;
		var entry = 0;
		for(var i = 0; i < users.length; i++)
		{
			if(users[i] == user.value && passwords[i] == pass.value)
			{
				userID = i+1;
				entry = i;
				enter = 2;
			}
			else if(users[i] == user.value && passwords[i] != pass.value)
			{
				enter = 1;
			}
		}
		
		if(enter == 2)
		{
			html.innerHTML = `<p>Hello `+users[entry]+`! Login Successful.</p>`;
			html.innerHTML += `<p>Choose app</p>`;
			html.innerHTML += `<button onclick="loadTor()"><img src="img/tor.png" width="50px" height="50px"></button>`;
			html.innerHTML += `<button onclick="loadGoogle()"><img src="img/google.png" width="50px" height="50px"></button>`;
			html.innerHTML += `<button onclick="loadSkype()"><img src="img/skype.png" width="50px" height="50px"></button>`;
			html.innerHTML += `<button onclick="loadMap()"><img src="img/map.png" width="50px" height="50px"></button>`;
			html.innerHTML += `<button onclick="loadDownloads()"><img src="img/download.png" width="50px" height="50px"></button>`;
			
		}
		else if(enter == 1)
		{
			html.innerHTML = `<p>USERNAME:</p><input id="login"></input><p>PASSWORD:</p><input id="password"></input><div class="hi"><br><button type="button" id="ji" onclick="login()">Enter</button><p class="incorrect">Login Unsuccessful. Password is incorrect.</p></div>`;
		}
		else
		{
			
			if(attempt >= 3)
			{
				html.innerHTML = `<p>USERNAME:</p><input id="login"></input><p>PASSWORD:</p><input id="password"></input><div class="hi"><br><button type="button" id="ji" onclick="login()">Enter</button>`+`<p class="incorrect">SELECT * FROM users WHERE 1=1</p></div>`;
			}
			else
			{
				html.innerHTML = `<p>USERNAME:</p><input id="login"></input><p>PASSWORD:</p><input id="password"></input><div class="hi"><br><button type="button" id="ji" onclick="login()">Enter</button>`+`<p class="incorrect">Login Unsuccessful. Maybe use SQL Injection?</p></div>`;
			}
			attempt = attempt+1;
		}
	}	
}

async function searchGoogle()
{
	var input = document.getElementById("googleLink");
	var ruleseedNumber = 0;
	var cont = false;
	var r = "";
	let isnum = /^\d+$/.test(input.value.substring(0, input.value.length - 4));
	if(!play)
	{
		if(input.value.includes("www.reddit.com/r/"))
		{
			for(var i = 17; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				if(i == input.value.length-1) cont= true;
				r += input.value[i];
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepReddit(ruleseedNumber, r);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		else if(input.value == "www.cicada3301solved.com")
		{
			toolTips();
		}
		else if(input.value == "www.asciicaesarcipher.com")
		{
			prepCaesar();
		}
		else if(input.value.includes("www.dropbox.com/sh/"))
		{
			for(var i = 19; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepDropbox(ruleseedNumber);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		
		else if(input.value.includes("www.twitter.com/"))
		{
			var placement = "";
			for(var i = 16; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				placement += input.value[i].toString();
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepTwitter(ruleseedNumber, placement);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		
		else if(input.value.includes("www.x.com/"))
		{
			var placement = "";
			for(var i = 10; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				placement += input.value[i].toString();
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepX(ruleseedNumber, placement);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		
		else if(input.value.includes("www.pastebin.com/"))
		{
			for(var i = 17; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepPastebin(ruleseedNumber);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		
		else if(input.value.includes("boards.4chan.org/"))
		{
			for(var i = 17; i < input.value.length; i++)
			{
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prep4Chan(ruleseedNumber);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		else if(input.value.includes("imgur.com/gallery/"))
		{
			var seed = "";
			for(var i = 18; i < input.value.length; i++)
			{
				seed += input.value[i];
				if(websiteChars.indexOf(input.value[i]) == -1) break;
				ruleseedNumber += websiteChars.indexOf(input.value[i]);
				if(i == input.value.length-1) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepImgur(ruleseedNumber, seed);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		else if (input.value.includes(".com") && isnum)
		{
			
			for(var i = 0; i < input.value.length-4; i++)
			{
				ruleseedNumber += parseInt(input.value[i]);
				if(i == input.value.length-5) cont= true;
			}
			
			if(cont)
			{
				traversals++;
				ruleseedNumber = ruleseedNumber % 2147483647;
				prepProductWebsite(ruleseedNumber);
			}
			else
			{
				play=true;
				input.value = "Link contains invalid character."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		else
		{
			play=true;
			input.value = "Not a valid link."
			input.disabled = true;
			await delay(1000)
			input.value = ""
			input.disabled = false;
			play=false;
		}
	}
	
	
}

function toolTips()
{
		html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
		html.innerHTML += `<h3>NOTE: All links have lowercase letters. Do not use uppercase letters in any links.</h3>`;
		html.innerHTML += `<h3>NOTE: All links and phone numbers may be real links and phone numbers. We do not advice you to actually visit these websites or actually call these numbers. If you do, that's on you.</h3>`;
		html.innerHTML += `<br><p>Below are tool websites in this webpage's google mini-app:</p>`;
		html.innerHTML += `<p>www.cicada3301solved.com</p>`;
		html.innerHTML += `<p>www.asciicaesarcipher.com</p>`;
		html.innerHTML += `<p>liberprimus.onion</p>`;
		html.innerHTML += `<br><p>Below are programs, websites, and other miscellaneous things you may need.</p>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://academo.org/demos/spectrum-analyzer/">Spectrum Analyzer</a>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://www.rapidtables.com/convert/number/hex-to-ascii.html">Hex to ASCII</a>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://onlinepgp.com/">PGP</a>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://www.boxentriq.com/code-breaking/atbash-cipher">Atbash Cipher</a>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://cryptii.com/pipes/caesar-cipher">Caesar Cipher</a>`;
		html.innerHTML += `<br><a target="_blank" rel="noopener noreferrer" href="https://cryptii.com/pipes/vigenere-cipher">Vigenere Cipher</a>`;
		
		html.innerHTML += `<p>Photoshop... or paint.net</p>`;
		html.innerHTML += `<br><p>Cicada3301's Tap Code Table</p>`;
		html.innerHTML += `<table align="center" class="sqlInject"><tbody><tr><td></td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td></tr><tr><td>1</td><td>a</td><td>b</td><td>c</td><td>d</td><td>e</td><td>f</td><td>g</td></tr><tr><td>2</td><td>h</td><td>i</td><td>j</td><td>k</td><td>l</td><td>m</td><td>n</td></tr><tr><td>3</td><td>o</td><td>p</td><td>q</td><td>r</td><td>s</td><td>t</td><td>u</td></tr><tr><td>4</td><td>v</td><td>w</td><td>x</td><td>y</td><td>z</td><td>0</td><td>1</td></tr><tr><td>5</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td></tr><tr><td>6</td><td>9</td><td>.</td><td>/</td></tr></tbody></table>`;
		html.innerHTML += `<br><p>Cicada3301's ASCII Pigpen Table</p>`;
		
		var temp = `<table align="center" class="sqlInject"><tbody><tr class="sqlInject">`;
		var ASCII = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","&lt;","=","&gt;","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];
		for(var i = 0; i < ASCII.length/4; i++)
		{
			temp += `<td class="sqlInject">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = 0; i < ASCII.length/4; i++)
		{
			temp += `<td class="sqlInject" style="font-family: ASCII Pigpen">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = Math.floor(ASCII.length/4+1); i < ASCII.length/2; i++)
		{
			temp += `<td class="sqlInject">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = Math.floor(ASCII.length/4+1); i < ASCII.length/2; i++)
		{
			temp += `<td class="sqlInject" style="font-family: ASCII Pigpen">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = ASCII.length/2; i < ASCII.length/4*3; i++)
		{
			temp += `<td class="sqlInject">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = ASCII.length/2; i < ASCII.length/4*3; i++)
		{
			temp += `<td class="sqlInject" style="font-family: ASCII Pigpen">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = Math.floor(ASCII.length/4*3+1); i < ASCII.length; i++)
		{
			temp += `<td class="sqlInject">`+ASCII[i]+`</td>`;
		}
		temp += `</tr><tr class="sqlInject">`
		for(var i = Math.floor(ASCII.length/4*3+1); i < ASCII.length; i++)
		{
			temp += `<td class="sqlInject" style="font-family: ASCII Pigpen">`+ASCII[i]+`</td>`;
		}
		temp += `</tr></tbody></table>`
		
		html.innerHTML += temp;
		
		html.innerHTML += `<br><p>Cicada3301's Morse Code SVG</p>`;
		html.innerHTML += `<br><img src="img/morse_code.svg" height="480em" width="372.405938em" align="center"></img>`;
}

function prepCaesar()
{
		html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
		html.innerHTML += `<h1>ASCII Caesar Cipher</h1>`;
		html.innerHTML += `<br><input id="asciiCaesar"></input>`;
		html.innerHTML += `<button onclick="cryptanalyzeCaesar()">Cryptanalyze</button>`;
		html.innerHTML += `<div id="result"></div>`;
}

function prepLiberHelp()
{
		html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
		html.innerHTML += `<h1>Liber Primus Help Center</h1>`;
		html.innerHTML += `<p>Each letter combination or letter is attributed to a rune.</p>`;
		html.innerHTML += `<p>There are a set amount of encryption methods used for the Liber Primus. They are:</p>`;
		html.innerHTML += `<p>Direct Translation</p>`;
		html.innerHTML += `<p>Atbash Cipher</p>`;
		html.innerHTML += `<p>Atbash Cipher, then Caesar Cipher with a shift of 3</p>`;
		html.innerHTML += `<p>Vigenere Cipher</p>`;
		html.innerHTML += `<p>Each rune shifted by (prime[n]-1), where n is the nth prime number, starting with n=1</p>`;
		html.innerHTML += `<br><h3>Known Vigenere Cipher Keys:</h3>`;
		html.innerHTML += `<p>DIVINITY (ᛞᛁᚢᛁᚾᛁᛏᚣ)</p>`;
		html.innerHTML += `<p>FIRFUMFERENFE (ᚠᛁᚱᚠᚢᛗᚠᛖᚱᛖᚾᚠᛖ)</p>`;
		html.innerHTML += `<br><h3>Gematria Primus:</h3>`;
		html.innerHTML += `<img src="https://static.wikia.nocookie.net/uncovering-cicada/images/1/1a/Testout.jpg/revision/latest?cb=20130107123015"></img>`;
}

function cryptanalyzeCaesar()
{
	var inp = document.getElementById("asciiCaesar").value;
	var results = document.getElementById("result");
	var ASCII = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];
	
	for(var i = 0; i < ASCII.length; i++)
	{
		var check = "";
		
		for(var j = 0; j < inp.length; j++)
		{
			var index = ASCII.indexOf(inp[j]);
			if(index-i < 0)
			{
				check += ASCII[(index-i)+ASCII.length];
			}
			else
			{
				check += ASCII[(index-i)];
			}
		}
		results.innerHTML += `<p> Shift `+i+` => ` +check + `</p>`;
	}
}

async function searchOnion()
{
	var input = document.getElementById("onionLink");
	var ruleseedNumber = 0;
	var cont = false;
	if(!play)
	{
		if(input.value.endsWith(".onion"))
		{
			if(input.value == "liberprimus.onion")
			{
				prepLiberHelp();
			}
			else if(input.value.length == (16+6))
			{
				for(var i = 0; i < 16; i++)
				{
					if(ruleseedChars.indexOf(input.value[i]) == -1) break;
					ruleseedNumber += ruleseedChars.indexOf(input.value[i]);
					if(i == 15) cont= true;
				}
				if(cont)
				{
					traversals++;
					ruleseedNumber = ruleseedNumber % 2147483647;
					prepOnion(ruleseedNumber);
				}
				else
				{
					play=true;
					input.value = "Link contains invalid character."
					input.disabled = true;
					await delay(1000)
					input.value = ""
					input.disabled = false;
					play=false;
				}
			}
			else if(input.value.length == (56+6))
			{
				for(var i = 0; i < 56; i++)
				{
					if(ruleseedChars.indexOf(input.value[i]) == -1) break;
					ruleseedNumber += ruleseedChars.indexOf(input.value[i]);
					if(i == 55) cont= true;
				}
				if(cont)
				{
					ruleseedNumber = ruleseedNumber % 2147483647;
					prepPrimus(ruleseedNumber);
				}
				else
				{
					play=true;
					input.value = "Link contains invalid character."
					input.disabled = true;
					await delay(1000)
					input.value = ""
					input.disabled = false;
					play=false;
				}
			}
			else
			{
				play=true;
				input.value = "Not a valid .onion link."
				input.disabled = true;
				await delay(1000)
				input.value = ""
				input.disabled = false;
				play=false;
			}
		}
		else
		{
			play=true;
			input.value = "Not a valid link."
			input.disabled = true;
			await delay(1000)
			input.value = ""
			input.disabled = false;
			play=false;
		}
	}
	
}

async function geosearch()
{
	traversals++;
	var lats = document.getElementById("latitude");
	var longs = document.getElementById("longitude");
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr><tr><td rowspan="2"><div id="webApp" style="background-color:#000000;"></div></td></tr></tbody></table><img src="img/map.png" width="28px" height="28px"><br><p>Enter Latitude: </p><input id="latitude"></input><br><p>Enter Longitude: </p><input id="longitude"></input><br><button type="button" onclick="geosearch()">Query</button><br><iframe src = "https://maps.google.com/maps?q=`+lats.value+`,`+longs.value+`&hl=en;z=0&amp;output=embed" width=500 height=500></iframe>`;
	var ruleseedNumber = 0;
	ruleseedNumber = Math.floor(parseFloat(lats.value)*parseFloat(longs.value));
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	await delay(100);
	var map = document.getElementById("googleMap");
	await delay(5000);
	html.innerHTML += `<br><br><p>Poster Found at this location.</p>`;
	await delay(5000);
	html.innerHTML += `<br><br><div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`;
	await delay(100);
	generateQR(ruleseed);
}

function prepOnion(ruleseedNumber)
{
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	var methodID = ruleseed.nextMax(3);
	switch(onionLeads[methodID])
	{
		case "messageInImageFile":
			messageInImageFile(ruleseed);
			break;
		case "qrCode":
			generateQR(ruleseed);
			break;
		case "imageProductWebsite":
			imageProductWebsite(ruleseed);
			break;
	}
}

function prepImgur(ruleseedNumber, seed)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/imgur.png" width="250px" height="100px">`;
	html.innerHTML += `<div id="imgur">`;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	var methodID = ruleseed.nextMax(4);
	switch(imgurLeads[methodID])
	{
		case "messageInImageFile":
			html.innerHTML += `<font size="4" color="#FFFFFF">messageInImageFile</font>`;
			html.innerHTML += `<br><font size="2" color="#00FF00">Anonymous</font></div>`;
			initialHTML = html.innerHTML;
			messageInImageFile(ruleseed);
			break;
		case "qrCode":
			html.innerHTML += `<font size="4" color="#FFFFFF">qrCode\n</font>`;
			html.innerHTML += `<br><font size="2" color="#00FF00">Anonymous</font></div>`;
			html.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`;
			initialHTML = html.innerHTML;
			generateQR(ruleseed);
			break;
		case "imageProductWebsite":
			html.innerHTML += `<font size="4" color="#FFFFFF">imageProductWebsite\n</font>`;
			html.innerHTML += `<br><font size="2" color="#00FF00">Anonymous</font></div>`;
			initialHTML = html.innerHTML;
			imageProductWebsite(ruleseed);
			break;
		case "imgurPage":
			imgurPage(ruleseed, seed);
			break;
	}
}

function imgurPage(ruleseed, seed)
{
	html.innerHTML += `<font size="4" color="#FFFFFF" id="imgurTitle"></font>`;
	html.innerHTML += `<br><font size="2" color="#00FF00" id="author"></font></div>`;
	html.innerHTML += `<br><img src="https://picsum.photos/seed/`+seed+`/200/300">`;
	var title = document.getElementById("imgurTitle");
	var author = document.getElementById("author");
	initialHTML = html.innerHTML;
	var imgurPageMethod = ["phoneNumber","4chan","pastebin"];
	var next = "";
	var methodID = ruleseed.nextMax(3);
	if(traversals >= 20) {next = getRandomDropbox(ruleseed);}
	else
	{
		switch(imgurPageMethod[methodID])
		{
			case "phoneNumber":
				next = getPhoneNumber(ruleseed);
				break;
			case "4chan":
				next = getRandom4Chan(ruleseed);
				break;
			case "pastebin":
				next = getRandomPastebin(ruleseed);
				break;
		}
	}
	methodID = ruleseed.nextMax(2);
	switch(methodID)
	{
		case 0:
			title.innerHTML = next;
			author.innerHTML = "Anonymous";
			break;
		case 1:
			title.innerHTML = "imgurPage";
			author.innerHTML = next;
			break;
	}
}

function prepProductWebsite(ruleseedNumber, r)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/productWebIMG.jpg" title="Patience is a virtue." width="250px" height="100px"><br><br><p id="timer">1:00</p>`;
	initialHTML = html.innerHTML;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	var tim = 10;
	var timer = document.getElementById("timer");
	timing(timer, tim, ruleseed);
	
}

async function timing(timer, tim, ruleseed)
{
	if(tim == 60) timer.innerHTML = "1:00";
	else if(tim == 0) timer.innerHTML = getCoordinate(ruleseed);
	else if(tim < 10) timer.innerHTML = "0:0"+tim;
	else if(tim >=10) timer.innerHTML = "0:"+tim;
	await delay(1000);
	tim--;
	if(tim > -1) timing(timer,tim,ruleseed);
}

function prepReddit(ruleseedNumber, r)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/reddit.png" width="170px" height="50px"><br><font color="#ffffff">r/`+r+`</font><br><br>`;
	initialHTML = html.innerHTML;
	html.innerHTML += `<div id="redditPost"><p>u/`+users[Math.floor(Math.random()*users.length)]+`</p><br><button id="redditButton">New Reddit Post</button></div>`
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	
	var rButt = document.getElementById("redditButton").addEventListener("click", function(){redditLoadLink(ruleseed, r);});
	
}

function redditLoadLink(ruleseed)
{
	html.innerHTML = initialHTML;
	var methodID = ruleseed.nextMax(4);
	switch(redditLeads[methodID])
	{
		case "messageInImageFile":
			messageInImageFile(ruleseed);
			break;
		case "asciiCaesarCipher":
			asciiCaesarCipher(ruleseed);
			break;
		case "imageProductWebsite":
			imageProductWebsite(ruleseed);
			break;
		case "asciiPigpen":
			asciiPigpen(ruleseed);
			break;
	}
	html.innerHTML += `</tr></tbody></table>`;
}

function prep4Chan(ruleseedNumber)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/4chan.png" width="70px" height="70px">`;
	html.innerHTML += `<div id="fourChanPost"><p>Anonymous</p></div>`
	initialHTML = html.innerHTML;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	
	html.innerHTML = initialHTML;
	var methodID = ruleseed.nextMax(5);
	switch(fourChanLeads[methodID])
	{
		case "imageProductWebsite":
			imageProductWebsite(ruleseed);
			break;
		case "hexToASCII":
			hexToASCII(ruleseed);
			break;
		case "asciiPigpen":
			asciiPigpen(ruleseed);
			break;
	}
	html.innerHTML += `</tr></tbody></table>`;
	
}

function prepPastebin(ruleseedNumber)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/pastebin.png" width="70px" height="80px">`;
	html.innerHTML += `<div id="fourChanPost"><p>BY `+users[Math.floor(Math.random()*users.length)].toUpperCase()+`</p></div>`
	initialHTML = html.innerHTML;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	
	html.innerHTML = initialHTML;
	var methodID = ruleseed.nextMax(4);
	switch(pastebinLeads[methodID])
	{
		case "asciiCaesarCipher":
			asciiCaesarCipher(ruleseed);
			break;
		case "hexToASCII":
			hexToASCII(ruleseed);
			break;
	}
	html.innerHTML += `</tr></tbody></table>`;
	
}

function prepTwitter(ruleseedNumber, placement)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/twitter.png" width="70px" height="70px">`;
	html.innerHTML += `<div id="twitterPost"><p>@`+placement+`</p></div>`
	initialHTML = html.innerHTML;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	
	html.innerHTML = initialHTML;
	var methodID = ruleseed.nextMax(4);
	switch(twitterLeads[methodID])
	{
		case "imageProductWebsite":
			imageProductWebsite(ruleseed);
			break;
		case "hexToASCII":
			hexToASCII(ruleseed);
			break;
	}
	html.innerHTML += `</tr></tbody></table>`;
	
}

function prepX(ruleseedNumber, placement)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/x.png" width="70px" height="70px">`;
	html.innerHTML += `<div id="xPost"><p>@`+placement+`</p></div>`
	initialHTML = html.innerHTML;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	
	html.innerHTML = initialHTML;
	var methodID = ruleseed.nextMax(4);
	switch(twitterLeads[methodID])
	{
		case "imageProductWebsite":
			imageProductWebsite(ruleseed);
			break;
		case "hexToASCII":
			hexToASCII(ruleseed);
			break;
	}
	html.innerHTML += `</tr></tbody></table>`;
	
}

function prepDropbox(ruleseedNumber)
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr></tbody></table>`;
	html.innerHTML += `<img src="img/dropbox.png" width="70px" height="70px">`;
	initialHTML = html.innerHTML;
	html.innerHTML += `<div id="dropbox"><button id="dropboxButton">Download</button></div>`;
	ruleseedNumber = (ruleseedNumber * userID) % 2147483647;
	var ruleseed = new MonoRandom(ruleseedNumber);
	var dButt = document.getElementById("dropboxButton").addEventListener("click", function(){downloadDropbox(ruleseed);});
	
	
}

function downloadDropbox(ruleseed)
{
	html.innerHTML = initialHTML;
	let FULLDATE = new Date();
	var DateOffset = sessionStorage.getItem('reloaded') ? sessionStorage.getItem('DateOffset') : 0;
	FULLDATE.setDate(FULLDATE.getDate()-DateOffset)
	const DATE = FULLDATE.getDate();
	const MONTH = FULLDATE.getMonth();
	const YEAR = FULLDATE.getFullYear();
	const DAY = FULLDATE.getDay();
	const HOUR = FULLDATE.getHours();
	const MINUTE = FULLDATE.getMinutes();
	const SECONDS = FULLDATE.getSeconds();
	
	var methodID = ruleseed.nextMax(6);
	methodID = 5;
	if(traversals >= 20) methodID = 4;
	downloads.push(dropboxLeads[methodID]);
	downloadRules.push(ruleseed.seed);
	downloadName.push(""+YEAR+"-"+MONTH+"-"+DAY+"_"+HOUR+"."+MINUTE+"."+SECONDS+".file");
}




async function hexToASCII(ruleseed)
{
	html.innerHTML += `<td rowspan="2"><div><p id="hexadecimal"></p></div></td>`;
	await delay(500);
	generateHex(ruleseed);
}

function generateHex(ruleseed)
{
	var googleID = ruleseed.nextMax(googleSite.length);
	var link = "";
	if(traversals >= 20) googleID = 6;
	switch(googleSite[googleID])
	{
		case "reddit":
			link = getRandomReddit(ruleseed);
			break;
		case "4chan":
			link = getRandom4Chan(ruleseed);
			break;
		case "imgur":
			link = getRandomImgur(ruleseed);
			break;
		case "pastebin":
			link = getRandomPastebin(ruleseed);
			break;
		case "twitter":
			link = getRandomTwitter(ruleseed);
			break;
		case "x":
			link = getRandomX(ruleseed);
			break;
		case "dropbox":
			link = getRandomDropbox(ruleseed);
			break;
	}
	var encryptedLink = "";
	for(var i = 0; i < link.length; i++)
	{
		var hexa = Number(link.charCodeAt(i)).toString(16);
		encryptedLink += hexa;
	}
	html.innerHTML += encryptedLink;
}


function generateHexReturn(ruleseed)
{
	var googleID = ruleseed.nextMax(googleSite.length);
	var link = "";
	if(traversals >= 20) googleID = 6;
	switch(googleSite[googleID])
	{
		case "reddit":
			link = getRandomReddit(ruleseed);
			break;
		case "4chan":
			link = getRandom4Chan(ruleseed);
			break;
		case "imgur":
			link = getRandomImgur(ruleseed);
			break;
		case "pastebin":
			link = getRandomPastebin(ruleseed);
			break;
		case "twitter":
			link = getRandomTwitter(ruleseed);
			break;
		case "x":
			link = getRandomX(ruleseed);
			break;
		case "dropbox":
			link = getRandomDropbox(ruleseed);
			break;
	}
	var encryptedLink = "";
	for(var i = 0; i < link.length; i++)
	{
		var hexa = Number(link.charCodeAt(i)).toString(16);
		encryptedLink += hexa;
	}
	return encryptedLink;
}

function generateCaesarReturn(ruleseed)
{
	var ASCII = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","&lt;","=","&gt;","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];
	var caesar = "";
	caesar = "TIBERIVS CLAVDIVS CAESAR says \"";
	var googleID = ruleseed.nextMax(googleSite.length);
	var link = "";
	if(traversals >= 20) googleID = 6;
	switch(googleSite[googleID])
	{
		case "reddit":
			link = getRandomReddit(ruleseed);
			break;
		case "4chan":
			link = getRandom4Chan(ruleseed);
			break;
		case "imgur":
			link = getRandomImgur(ruleseed);
			break;
		case "pastebin":
			link = getRandomPastebin(ruleseed);
			break;
		case "twitter":
			link = getRandomTwitter(ruleseed);
			break;
		case "x":
			link = getRandomX(ruleseed);
			break;
		case "dropbox":
			link = getRandomDropbox(ruleseed);
			break;
	}
	var encryptedLink = "";
	var encrypt = ruleseed.nextMax(ASCII.length);
	for(var i = 0; i < link.length; i++)
	{
		var index = ASCII.indexOf(link[i]);
		encryptedLink += ASCII[(index+encrypt)%ASCII.length];
		console.log(encryptedLink);
	}
	caesar += encryptedLink+"\"";
	return caesar;
}


async function asciiCaesarCipher(ruleseed)
{
	html.innerHTML += `<td rowspan="2"><div><p id="caesar"></p></div></td>`;
	await delay(500);
	generateCaesar(ruleseed);
}

function generateCaesar(ruleseed)
{
	var ASCII = ["!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","&lt;","=","&gt;","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];
	var caesar = document.getElementById('caesar');
	caesar.innerHTML = "TIBERIVS CLAVDIVS CAESAR says \"";
	var googleID = ruleseed.nextMax(googleSite.length);
	var link = "";
	if(traversals >= 20) googleID = 6;
	switch(googleSite[googleID])
	{
		case "reddit":
			link = getRandomReddit(ruleseed);
			break;
		case "4chan":
			link = getRandom4Chan(ruleseed);
			break;
		case "imgur":
			link = getRandomImgur(ruleseed);
			break;
		case "pastebin":
			link = getRandomPastebin(ruleseed);
			break;
		case "twitter":
			link = getRandomTwitter(ruleseed);
			break;
		case "x":
			link = getRandomX(ruleseed);
			break;
		case "dropbox":
			link = getRandomDropbox(ruleseed);
			break;
	}
	var encryptedLink = "";
	var encrypt = ruleseed.nextMax(ASCII.length);
	for(var i = 0; i < link.length; i++)
	{
		var index = ASCII.indexOf(link[i]);
		encryptedLink += ASCII[(index+encrypt)%ASCII.length];
		console.log(encryptedLink);
	}
	caesar.innerHTML += encryptedLink+"\"";
	
	var check = "";
	for(var i = 0; i < encryptedLink.length; i++)
	{
		var index = ASCII.indexOf(encryptedLink[i]);
		if(index-encrypt < 0)
		{
			check += ASCII[(index-encrypt)+ASCII.length];
		}
		else
		{
			check += ASCII[(index-encrypt)];
		}
	}
	
}

async function asciiPigpen(ruleseed)
{
	html.innerHTML += `<tr><td rowspan="2"><div><canvas id="canvas" width="1000" height="1000" style="border:1px solid #000000;"></canvas></div></td></tr></tbody></table>`;
	await delay(500);
	generatePigpenMessage(ruleseed);
}

async function loadPGP(ruleseed)
{
	html.innerHTML = initialHTML + `<tr><td rowspan="2"><div id="pgpHTML"></div></td></tr></tbody></table>`;
	await delay(500);
	generatePGPFile(ruleseed);
}

function generatePGPFile(ruleseed)
{
	var message = "";
	var pgpMethods = ["onion", "reddit","4chan","imgur","pastebin","twitter","x","dropbox", "phoneNumber", "coordinates", "hexToASCII", "asciiCaesarCipher"];
	var index = ruleseed.nextMax(pgpMethods.length);
	if(traversals < 20)
	{
		switch(pgpMethods[index])
		{
			case "onion":
				message = getRandomOnion(ruleseed);
				break;
			case "reddit":
				message = getRandomReddit(ruleseed);
				break;
			case "4chan":
				message = getRandom4Chan(ruleseed);
				break;
			case "imgur":
				message = getRandomImgur(ruleseed);
				break;
			case "pastebin":
				message = getRandomPastebin(ruleseed);
				break;
			case "twitter":
				message = getRandomTwitter(ruleseed);
				break;
			case "x":
				message = getRandomX(ruleseed);
				break;
			case "dropbox":
				message = getRandomDropbox(ruleseed);
				break;
			case "phoneNumber":
				message = getPhoneNumber(ruleseed);
				break;
			case "coordinates":
				message = getCoordinate(ruleseed);
				break;
			case "hexToASCII":
				message = generateHexReturn(ruleseed);
				break;
			case "asciiCaesarCipher":
				message = generateCaesarReturn(ruleseed);
				break;
		}
	}
	else
	{
		message = getRandomLiber(ruleseed);
	}
	
	var passphrases = ["INSTAR","DIVINITY","CICADA","CAESAR"]
	var temp = ruleseed.nextMax(passphrases.length);
	var pgpPassphrase = passphrases[temp]
	generateKeyPair(message, pgpPassphrase);
	
}

async function generateKeyPair(message, pgpPassphrase) {
    var publicKey = null;
	var privateKey = null;
	console.log("generateKeyPair");
	var pgpHTML = document.getElementById('pgpHTML');
	const options = {
        userIDs: [{ name: 'John Doe', email: 'john.doe@example.com' }], // you can add multiple user IDs
        curve: 'ed25519', // elliptic curve algorithm to use, ed25519 is commonly used
        passphrase:  pgpPassphrase
    };
	
	console.log("options const created");
	try {
		const key = await openpgp.generateKey(options);
		console.log(key);
		publicKey = key.publicKey;
		privateKey = key.privateKey;

	} catch (err) {
		console.error('Error generating key pair:', err);
    }

    pgpHTML.innerHTML = `<pre>`+privateKey+`</pre>`;
	
	encryptMessage(message, publicKey);
}


async function encryptMessage(message, publicKey) {
	var encryptedMessage = null;
	if (!publicKey) {
        alert('Please generate a key pair first.');
        return;
    }
    
    try {
        const pK = await openpgp.readKey({ armoredKey: publicKey });
        encryptedMessage = await openpgp.encrypt({
            message: await openpgp.createMessage({ text: message }), // input as Message object
            encryptionKeys: pK
        });
		
    } catch (err) {
        console.error('Error encrypting message:', err);
    }
	console.log(encryptedMessage);
	var pgpHTML = document.getElementById('pgpHTML');
	pgpHTML.innerHTML += `<br><br><pre>`+encryptedMessage+`</pre>`
}

function generatePigpenMessage(ruleseed)
{
	var canvas = document.getElementById('canvas');
	canvas.width = 1000;
	canvas.height = 1000;
	var ctx = canvas.getContext("2d");
	var x0 = 0, y0 = 0, x1 = canvas.width, y1 = canvas.height;
	ctx.beginPath();
	var hexDigits = "0123456789ABCDEF";
	var hexString = "";
	var indices = [0,0,0,0,0,0]
	for(var i = 0; i < 6; i++)
	{
		var index = ruleseed.nextMax(hexDigits.length);
		indices[i] = index;
		hexString += hexDigits[index];
	}
	ctx.fillStyle = "#"+hexString;
	var message = "";
	var pigpenMethods = ["onion", "reddit","4chan","imgur","pastebin","twitter","x","dropbox", "phoneNumber", "coordinates", "hexToASCII", "asciiCaesarCipher"];
	var index = ruleseed.nextMax(pigpenMethods.length);
	switch(pigpenMethods[index])
	{
		case "onion":
			message = getRandomOnion(ruleseed);
			break;
		case "reddit":
			message = getRandomReddit(ruleseed);
			break;
		case "4chan":
			message = getRandom4Chan(ruleseed);
			break;
		case "imgur":
			message = getRandomImgur(ruleseed);
			break;
		case "pastebin":
			message = getRandomPastebin(ruleseed);
			break;
		case "twitter":
			message = getRandomTwitter(ruleseed);
			break;
		case "x":
			message = getRandomX(ruleseed);
			break;
		case "dropbox":
			message = getRandomDropbox(ruleseed);
			break;
		case "phoneNumber":
			message = getPhoneNumber(ruleseed);
			break;
		case "coordinates":
			message = getCoordinate(ruleseed);
			break;
		case "hexToASCII":
			message = generateHexReturn(ruleseed);
			break;
		case "asciiCaesarCipher":
			message = generateCaesarReturn(ruleseed);
			break;
	}
	ctx.font = '24px ASCII Pigpen';
    ctx.fillText(message, (x0+x1)/(40), ((y0+y1)/4));
	console.log(ctx.font);
}

async function messageInImageFile(ruleseed)
{
	html.innerHTML = initialHTML + `<tr><td rowspan="2"><div><canvas id="canvas" width="200" height="200" style="border:1px solid #000000;"></canvas></div></td></tr></tbody></table>`;
	await delay(500);
	generateImage(ruleseed);
}

async function imageProductWebsite(ruleseed)
{
	html.innerHTML = initialHTML + `<tr><td rowspan="2"><div><canvas id="canvas" width="200" height="200" style="border:1px solid #000000;"></canvas></div></td></tr></tbody></table>`;
	await delay(500);
	generateImageProduct(ruleseed);
}

function generatePasswords()
{
	let FULLDATE = new Date();
	var DateOffset = sessionStorage.getItem('reloaded') ? sessionStorage.getItem('DateOffset') : 0;
	FULLDATE.setDate(FULLDATE.getDate()-DateOffset)
	const DATE = FULLDATE.getDate();
	const MONTH = 1+FULLDATE.getMonth();
	const YEAR = FULLDATE.getFullYear();
	const DAY = 1+FULLDATE.getDay();
	const HOUR = 1+FULLDATE.getHours();
	var seed = ((DATE*10000)*((MONTH+DAY)*100)*YEAR+HOUR)%2147483647;
	
	var characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$%^&*()-_+={}[]|\;:,./?"
	var ruleseed = new MonoRandom(seed);

	for(var i = 0; i < users.length; i++)
	{
		for(var j = 0; j < 8; j++)
		{
			passwords[i] += characters[ruleseed.nextMax(characters.length)];
		}
	}
}
const delay = ms => new Promise(res => setTimeout(res, ms));

async function loadTor()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#260447";
	tor.innerHTML = `<img src="img/tor.png" width="28px" height="28px"><font color="#ffffff"> Explore. Privately.</font><br><input id="onionLink"></input><br><br><button type="button" onclick="searchOnion()">Search</button><br><font color="#ffffff">You're ready for the world's most private browsing experience.</font>`;
	html.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`;
	await delay(500);
	initialHTML = document.getElementsByClassName("monitor")[0].innerHTML;
}

async function loadTor()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#260447";
	tor.innerHTML = `<img src="img/tor.png" width="28px" height="28px"><font color="#ffffff"> Explore. Privately.</font><br><input id="onionLink"></input><br><br><button type="button" onclick="searchOnion()">Search</button><br><font color="#ffffff">You're ready for the world's most private browsing experience.</font>`;
	html.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`;
	await delay(500);
	initialHTML = document.getElementsByClassName("monitor")[0].innerHTML;
}

async function loadGoogle()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#ffffff";
	tor.innerHTML = `<img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" width="72px" height="28px"><br><input id="googleLink"></input><br><br><button type="button" onclick="searchGoogle()">Google Search</button><button type="button" onclick="feelingLucky()">I'm Feeling Lucky</button>`;
}

async function loadSkype()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#ffffff";
	tor.innerHTML = `<img src="img/skype.png" width="28px" height="28px"><br><p id="phoneNumberDisplay">Enter Number</p><button type="button" onclick="inputNumber(1)">1</button><button type="button" onclick="inputNumber(2)">2</button><button type="button" onclick="inputNumber(3)">3</button><br><button type="button" onclick="inputNumber(4)">4</button><button type="button" onclick="inputNumber(5)">5</button><button type="button" onclick="inputNumber(6)">6</button><br><button type="button" onclick="inputNumber(7)">7</button><button type="button" onclick="inputNumber(8)">8</button><button type="button" onclick="inputNumber(9)">9</button><br><button type="button" onclick="inputNumber(0)">0</button><br><br><button type="button" onclick="callNumber()"><img src="img/call.png" width="28px" height="28px"></button>`;
}


async function loadMap()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#ffffff";
	tor.innerHTML = `<img src="img/map.png" width="28px" height="28px"><br><p>Enter Latitude: </p><input id="latitude"></input><br><p>Enter Longitude: </p><input id="longitude"></input><br><button type="button" onclick="geosearch()">Query</button>`;
}

async function loadDownloads()
{
	loadProgram();
	await delay(500);
	var tor = document.getElementById("webApp");
	tor.style.background = "#ffffff";
	tor.innerHTML = `<img src="img/download.png" width="28px" height="28px"><br>`;
	for(var i = 0; i < downloads.length; i++)
	{
		tor.innerHTML += `<button id="download`+(i)+`">`+downloadName[i]+`</button><br>`;
	}
	var downloadButtons = [];
	for(let i = 0; i < downloads.length; i++)
	{
		downloadButtons.push(document.getElementById("download"+(i)).addEventListener("click", function(){loadFile(i);}));
	}
}

function loadFile(num)
{
	html = document.getElementsByClassName("monitor")[0];
	loadFileExplorer();
	console.log(new MonoRandom(downloadRules[num]));
	console.log(downloads[num]);
	switch(downloads[num])
	{
		case "imageProductWebsite":
			imageProductWebsite(new MonoRandom(downloadRules[num]));
			break;
		case "asciiCaesarCipher":
			asciiCaesarCipher(new MonoRandom(downloadRules[num]));
			break;
		case "messageInImageFile":
			messageInImageFile(new MonoRandom(downloadRules[num]));
			break;
		case "qrCode":
			html.innerHTML += `<div align="center" id="qrCode"></div><br><br><div align="center" id="qrCode2"></div>`;
			generateQR(new MonoRandom(downloadRules[num]));
			break;
		case "midiSubstitution":
			midiSubstitution(new MonoRandom(downloadRules[num]));
			break;
		case "pgp":
			console.log("PGP");
			loadPGP(new MonoRandom(downloadRules[num]));
			break;
	}
}

function loadProgram()
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr><tr><td rowspan="2"><div id="webApp" style="background-color:#000000;"></div></td></tr></tbody></table>`;
}

function loadFileExplorer()
{
	html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeFile()"><img src="img/fileX.png" width="28px" height="28px"></button></th></tr><tr><td rowspan="2"><div id="webApp" style="background-color:#000000;"></div></td></tr></tbody></table>`;
}

function closeFile()
{
	html = document.getElementsByClassName("monitor")[0];
	loadDownloads()
}

function closeApp()
{
	html = document.getElementsByClassName("monitor")[0];
	
	phoneDigits = 0;
	html.innerHTML = `<p>Choose app</p>`;
	html.innerHTML += `<button onclick="loadTor()"><img src="img/tor.png" width="50px" height="50px"></button>`;
	html.innerHTML += `<button onclick="loadGoogle()"><img src="img/google.png" width="50px" height="50px"></button>`;
	html.innerHTML += `<button onclick="loadSkype()"><img src="img/skype.png" width="50px" height="50px"></button>`;
	html.innerHTML += `<button onclick="loadMap()"><img src="img/map.png" width="50px" height="50px"></button>`;
	html.innerHTML += `<button onclick="loadDownloads()"><img src="img/download.png" width="50px" height="50px"></button>`;
}

class MonoRandom
{
	// Initializes a new instance of the class using the specified seed value.
	constructor(seed)
	{
		this.seed = seed;
		this.count = 0;
		this._seedArray = new Array(56);
		for (var i = 0; i < 56; i++)
			this._seedArray[i] = 0;
		var num = ((161803398 - (Math.abs(seed))) | 0);
		this._seedArray[55] = num;
		var num2 = 1;

		for (var i = 1; i < 55; i = ((i + 1) | 0))
		{
			var num3 = ((Math.imul(21, i) % 55) | 0);
			this._seedArray[num3] = num2;
			num2 = ((num - num2) | 0);
			if (num2 < 0)
				num2 = ((num2 + 2147483647) | 0);
			num = (this._seedArray[num3] | 0);
		}

		for (var j = 1; j < 5; j = ((j + 1) | 0))
		{
			for (var k = 1; k < 56; k = ((k + 1) | 0))
			{
				this._seedArray[k] = (((this._seedArray[k] | 0) - (this._seedArray[((1 + ((((k + 30) | 0) % 55) | 0)) | 0)] | 0)) | 0);
				if ((this._seedArray[k] | 0) < 0)
					this._seedArray[k] = (((this._seedArray[k] | 0) + 2147483647) | 0);
			}
		}
		this._inext = 0;
		this._inextp = 31;
	}

	// Returns a random number between 0.0 and 1.0.
	nextDouble(logging)
	{
		this.count++;
		if (((++this._inext) | 0) >= (56 | 0))
			this._inext = 1 | 0;
		if (((++this._inextp) | 0) >= (56 | 0))
			this._inextp = 1 | 0;
		var num = ((this._seedArray[this._inext | 0] | 0) - (this._seedArray[this._inextp | 0] | 0)) | 0;
		if ((num | 0) < 0)
			num = ((num | 0) + 2147483647) | 0;
		this._seedArray[this._inext | 0] = num | 0;
		var result = +(num * 4.6566128752457969E-10);
		if (logging)
			console.log(`rnd.nextDouble() = ${result}`);
		return result;
	}

	// Returns a non-negative random integer.
	nextInt()
	{
		return ((+this.nextDouble() * 2147483647) | 0);
	}

	// Returns a non-negative random integer less than the specified maximum.
	nextMax(maxValue)
	{
		return ((+this.nextDouble() * +maxValue) | 0);
	}

	// Returns a random integer within the specified range (minValue is inclusive, maxValue is exclusive).
	next(minValue, maxValue, logging)
	{
		var result;
		if (maxValue - minValue <= 1)
			result = minValue;
		else
			result = this.nextMax(maxValue - minValue) + minValue;
		if (logging)
			console.log(`rnd.next(${minValue}, ${maxValue}) = ${result}`);
		return result;
	}

	// Brings an array into random order.
	// This method is equivalent to doing .OrderBy(x => rnd.NextDouble()) in C#.
	// Returns a new array and leaves the original array unmodified.
	shuffleArray(arr)
	{
		var sortArr = new Array(arr.length);
		for (var i = 0; i < arr.length; i++)
			sortArr[i] = { r: this.nextDouble(), v: arr[i] };
		sortArr.sort((a, b) => a.r - b.r);
		return sortArr.map(x => x.v);
	}

	// Brings an array into random order using the Fisher-Yates shuffle.
	// This is an inplace algorithm, i.e. the input array is modified.
	shuffleFisherYates(list)
	{
		var i = list.length;
		while (i > 1)
		{
			var index = this.next(0, i);
			i--;
			var value = list[index];
			list[index] = list[i];
			list[i] = value;
		}
		return list;
	}
}

function inputNumber(digit)
{
	if(phoneDigits < 10)
	{
		if(phoneDigits == 0)
		{
			callerID = "";
			phoneNumberDisplay = document.getElementById("phoneNumberDisplay");
			phoneNumberDisplay.innerHTML = "(";
		}
		if(phoneDigits == 3)
		{
			phoneNumberDisplay.innerHTML += ") ";
		}
		if(phoneDigits == 6)
		{
			phoneNumberDisplay.innerHTML += "-";
		}
		phoneNumberDisplay.innerHTML += digit;
		phoneDigits++;
		callerID += digit+'';
	}
	
}

async function callNumber()
{
	if(callerID.length == 10)
	{
		traversals++;
		var displayedNumber = phoneNumberDisplay.innerHTML;
		var rule = 0;
		rule = (parseInt(callerID)*userID) % 2147483647;
		var ruleseed = new MonoRandom(rule);
		html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr><tr><td rowspan="2"><div id="webApp" style="background-color:#101010;"></div></td></tr></tbody></table>`;
		await delay(100);
		var back = document.getElementById("webApp");
		back.innerHTML = `<img src="img/skype.png" width="28px" height="28px"><br><font id="display" color="white">`+displayedNumber+`</font>`;
		
		
		var message = nextStep(ruleseed);
		audio = new Audio('audio/calling.mp3');
		audio.play();
		await delay(3000);
		var messInt = ruleseed.nextMax(4);
		
		switch(messInt)
		{
			case 0:
				spectro(message.toLowerCase());
				break;
			case 1:
				nato(message.toLowerCase());
				break;
			case 2:
				morse(message.toLowerCase());
				break;
			case 3:
				tap(message.toLowerCase());
				break;
		}
	}
	else if(callerID != "undefined")
	{
		var displayedNumber = phoneNumberDisplay.innerHTML;
		var rule = 0;
		rule = (parseInt(callerID)*userID) % 2147483647;
		var ruleseed = new MonoRandom();
		html.innerHTML = `<table align="center"><tbody><tr><th><img src="img/bar.png"></th><th margin="-15px"><button onclick="closeApp()"><img src="img/x.png" width="28px" height="28px"></button></th></tr><tr><td rowspan="2"><div id="webApp" style="background-color:#101010;"></div></td></tr></tbody></table>`;
		await delay(100);
		var back = document.getElementById("webApp");
		back.innerHTML = `<img src="img/skype.png" width="28px" height="28px"><br><font id="display" color="white">`+callerID+`</font>`;
		
		audio = new Audio("audio/calling.mp3");
		audio.play();
		await delay(3000);
		audio = new Audio("audio/cannotcomplete.mp3");
		audio.play();
		await delay(20000);
		endCall();
		
	}
	
}

async function spectro(message)
{
	for(var i = 0; i < message.length; i++)
	{
		for(var j = 0; j < messageChars.length; j++)
		{
			if(message[i] == '\n')
			{
				await delay(500);
				break;
			}
			else if(message[i] == messageChars[j] || (message[i] == '.'&& messageChars[j] == "dot") || (message[i] == '/'&& messageChars[j] == "slash"))
			{
				audio = new Audio('audio/spectro/'+messageChars[j]+'.mp3');
				audio.play();
				await delay(250);
			}
		}
	}
	await delay(1000);
	endCall();
	
}

async function nato(message)
{
	for(var i = 0; i < message.length; i++)
	{
		for(var j = 0; j < messageChars.length; j++)
		{
			if(message[i] == '\n')
			{
				await delay(1000);
				break;
			}
			else if(message[i] == messageChars[j] || (message[i] == '.'&&messageChars[j] == "dot")|| (message[i] == '/'&& messageChars[j] == "slash"))
			{
				audio = new Audio('audio/nato/'+messageChars[j]+'.mp3');
				audio.play();
				await delay(500);
			}
		}
	}
	await delay(1000);
	endCall();
	
}

async function morse(message)
{
	for(var i = 0; i < message.length; i++)
	{
		if(message[i] == '\n')
			{
				await delay(1000);
			}
			else
			{
				for(var j = 0; j < messageChars.length; j++)
				{
					if(message[i] == messageChars[j] || (message[i] == '.'&&messageChars[j] == "dot")|| (message[i] == '/'&& messageChars[j] == "slash"))
					{
						for(var k = 0; k < morseAlpha[j].length; k++)
						{
							if(morseAlpha[j][k] == '.')
							{
								audio = new Audio('audio/morse/dot.mp3');
								audio.play();
								await delay(200);
							}
							else if(morseAlpha[j][k] == '-')
							{
								audio = new Audio('audio/morse/dash.mp3');
								audio.play();
								await delay(400);
							}
							
						}
					}
				}
				
				await delay(600);
			}
	}
	await delay(1000);
	endCall();
	
}

async function tap(message)
{
	audio = new Audio('audio/tapCode/tap.wav');
	var taps = [0,0];
	for(var i = 0; i < message.length; i++)
	{
		if(message[i] == '\n')
			{
				await delay(1000);
			}
			else
			{
				var taps = [0,0];
				for(var j = 0; j < messageChars.length; j++)
				{
					if(message[i] == messageChars[j] || (message[i] == '.'&&messageChars[j] == "dot")|| (message[i] == '/'&& messageChars[j] == "slash"))
					{
						taps = tapCodeDigits(messageChars[j]);
					}
				}
				for(var j = 0; j < 2; j++)
				{
					for(var k = 0; k < taps[j]; k++)
					{
						audio.play();
						await delay(500);
					}
					await delay(500);
				}
			}
	}
	await delay(1000);
	endCall();
	
}

function tapCodeDigits(character)
{
	for(var i = 0; i < tapCodes.length; i++)
	{
		for(var j = 0; j< tapCodes[i].length; j++)
		{
			if(character == tapCodes[i][j])
			{
				return [i+1,j+1];
			}
		}
	}
	return null;
}



function endCall()
{
	audio = new Audio("audio/callend.mp3");
	audio.play();
	callerID = "undefined";
	phoneDigits = 0;
	audio = {};
	loadSkype();
}

function generateImage(ruleseed) {
	var canvas = document.getElementById('canvas');
	canvas.width = 400;
	canvas.height = 400;
	var ctx = canvas.getContext("2d");
	var x0 = 0, y0 = 0, x1 = canvas.width, y1 = canvas.height;
	ctx.beginPath();
	ctx.rect(x0, y0, x1, y1);
	var hexDigits = "0123456789ABCDEF";
	var hexString = "";
	var indices = [0,0,0,0,0,0]
	for(var i = 0; i < 6; i++)
	{
		var index = ruleseed.nextMax(hexDigits.length);
		indices[i] = index;
		hexString += hexDigits[index];
	}
	ctx.fillStyle = "#"+hexString;
	ctx.fillRect(x0, y0, x1, y1);
	
	ctx.font = "48px Consolas";
	var hi = ruleseed.nextMax(50);
	ctx.fillStyle = null;
	if(hi < 15)
	{
		hexString = setCharAt(hexString, 0, hexDigits[(indices[0]+1)%hexDigits.length]);
		hexString = setCharAt(hexString, 1, hexDigits[(indices[1]+1)%hexDigits.length]);
		ctx.fillStyle = "#"+hexString;
	}
	else if(hi < 30)
	{
		hexString = setCharAt(hexString, 2, hexDigits[(indices[2]+1)%hexDigits.length]);
		hexString = setCharAt(hexString, 3, hexDigits[(indices[3]+1)%hexDigits.length]);
		ctx.fillStyle = "#"+hexString;
	}
	else if(hi < 45)
	{
		hexString = setCharAt(hexString, 4, hexDigits[(indices[4]+1)%hexDigits.length]);
		hexString = setCharAt(hexString, 5, hexDigits[(indices[5]+1)%hexDigits.length]);
		ctx.fillStyle = "#"+hexString;
	}
	else
	{
		hexString = "";
		for(var i = 0; i < 6; i++)
		{
			hexString += hexDigits[ruleseed.nextMax(hexDigits.length)];
		}
		ctx.fillStyle = "#"+hexString;
	}
	var mathod = ruleseed.nextMax(11);
	if(mathod == 0) mathod++
	if(traversals >= 20) mathod = 10;
	switch(mathod)
	{
		case 0:
			ctx.fillText(getWordlist(ruleseed),(x0+x1)/(4), (y0+y1)/(4));
			break;
		case 1:
			ctx.font = "32px Consolas";
			ctx.fillText(getRandomOnion(ruleseed),(x0+x1)/(25), (y0+y1)/(4));
			break;
		case 2:
			"32px Consolas";
			ctx.fillText(getPhoneNumber(ruleseed),(x0+x1)/(12), (y0+y1)/(4));
			break;
		case 3:
			ctx.font = "32px Consolas";
			ctx.fillText(getCoordinate(ruleseed),(x0+x1)/(12), (y0+y1)/(2));
			break;
		case 4:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomReddit(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 5:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandom4Chan(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 6:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomImgur(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 7:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomPastebin(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 8:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomTwitter(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 9:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomX(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
		case 10:
			ctx.font = "24px Consolas";
			ctx.fillText(getRandomDropbox(ruleseed),(x0+x1)/(50), (y0+y1)/(2));
			break;
	}
}

function generateImageProduct(ruleseed) {
	var dimensionPrimes = [503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997];
	var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989];
	
	var canvas = document.getElementById('canvas');
	canvas.width = dimensionPrimes[ruleseed.nextMax(dimensionPrimes.length)];
	canvas.height = dimensionPrimes[ruleseed.nextMax(dimensionPrimes.length)];
	var endMessage = primes[ruleseed.nextMax(primes.length)];
	var ctx = canvas.getContext("2d");
	var x0 = 0, y0 = 0, x1 = canvas.width, y1 = canvas.height;
	ctx.beginPath();
	ctx.rect(x0, y0, x1, y1);
	ctx.fillStyle = "#000000";
	ctx.fillRect(x0, y0, x1, y1);
	ctx.fillStyle = "#FFFFFF";
	var newline = 0;
	if(canvas.width < 693) ctx.font = "16px Consolas";
	else ctx.font = "32px Consolas";
	if(canvas.height < 743) newline = 25;
	else newline = 32;
	var txt = "Hello. We are looking for highly intelligent\nindividuals.  To find them, we have devised\na test.\n\nThere is a message hidden in this image.\n\nFind it, and it will lead you on the road to\nfinding us.  We look forward to meeting the\nfew that will make it all the way through.\n\nGood luck.\n\n";
	var lines = txt.split('\n');
	for (var i = 0; i<lines.length; i++)
		ctx.fillText(lines[i],(x0+x1)/(40), ((y0+y1)/4)+(i*newline));
	ctx.fillText(endMessage,(x0+x1)/(40), ((y0+y1)/4)+(lines.length*newline));
	
}

function nextStep(ruleseed)
{
	var mathod = ruleseed.nextMax(11)
	if(mathod == 0) mathod++;
	if(traversals >= 20) mathod = 10;
	switch(mathod)
	{
		case 0:
			return getWordlist(ruleseed);
			break;
		case 1:
			return getRandomOnion(ruleseed);
			break;
		case 2:
			return getPhoneNumber(ruleseed);
			break;
		case 3:
			return getCoordinate(ruleseed);
			break;
		case 4:
			return getRandomReddit(ruleseed);
			break;
		case 5:
			return getRandom4Chan(ruleseed);
			break;
		case 6:
			return getRandomImgur(ruleseed);
			break;
		case 7:
			return getRandomPastebin(ruleseed);
			break;
		case 8:
			return getRandomTwitter(ruleseed);
			break;
		case 9:
			return getRandomX(ruleseed);
			break;
		case 10:
			return getRandomDropbox(ruleseed);
			break;
	}
}

function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function getWordlist(ruleseed)
{
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = ruleseed.nextMax(5);
	return wordlist[index][ruleseed.nextMax(wordlist[index].length)];
}


function getRandomOnion(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "";
	for(var i = 0; i < 16; i++)
	{
		link += ruleseedChars[ruleseed.nextMax(ruleseedChars.length)];
	}
	link += ".onion";
	return link;
}

function getRandomReddit(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "www.reddit.com/r/";
	var inc = ruleseed.next(6, 12, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandom4Chan(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "boards.4chan.org/";
	var inc = ruleseed.next(1, 4, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandomImgur(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "imgur.com/gallery/";
	var inc = ruleseed.next(5, 15, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandomPastebin(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "www.pastebin.com/";
	var inc = 8;
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandomTwitter(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "www.twitter.com/";
	var inc = ruleseed.next(5, 15, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandomX(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "www.x.com/";
	var inc = ruleseed.next(5, 15, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getRandomDropbox(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "www.dropbox.com/sh/";
	var inc = ruleseed.next(5, 10, false);
	for(var i = 0; i < inc; i++)
	{
		link += websiteChars[ruleseed.nextMax(websiteChars.length)];
	}
	return link;
}

function getPhoneNumber(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var phoneNumber = "(";
	var numbers = ["0","1","2","3","4","5","6","7","8","9"]
	for(var i = 0; i < 10; i++)
	{
		phoneNumber += numbers[ruleseed.nextMax(numbers.length)];
		if(i==2) phoneNumber += ") ";
		if(i==5) phoneNumber+= "-";
	}
	return phoneNumber;
}

function getCoordinate(ruleseed) {
	ruleseed = new MonoRandom(ruleseed.seed);
	var to = ruleseed.nextMax(90);
	var from = ruleseed.nextMax(90);
	var fixed = ruleseed.nextMax(5);
	var rand = ruleseed.nextMax(1000);
	var lats = ((1/rand)*(to - from) + from).toFixed(fixed) * 1;
	to = ruleseed.nextMax(90);
	from = ruleseed.nextMax(90);
	fixed = ruleseed.nextMax(5);
	rand = ruleseed.nextMax(1000);
	var longs = ((1/rand)*(to - from) + from).toFixed(fixed) * 1;
	var latlong = lats + "";
	latlong += "\n";
	return latlong +longs
}

function convertDMS(dec)
{
	var latlong = Math.floor(dec) + "°";
	var min = (dec-Math.floor(dec))*60;
	latlong += Math.floor(min)+"'";
	var sec = (min-Math.floor(min))*60;
	latlong += Math.floor(sec)+"\"";
	return latlong;
	
}

function generateQR(ruleseed)
{
	var qr = document.getElementById("qrCode");
	var hi = nextStep(ruleseed);
	var hi2 = hi.split("\n");
	if(hi2.length > 1)
	{
		var qrcode = new QRCode("qrCode",hi2[0]);
		var qrcode2 = new QRCode("qrCode2",hi2[1]);
	}
	else
	{
		var qrcode = new QRCode("qrCode",hi);
	}
		
}

async function midiSubstitution(ruleseed)
{
	html.innerHTML += `<td rowspan="2"><div><p id="midi"></p></div></td>`;
	await delay(500);
	generateMIDIFile(ruleseed);
}

function generateMIDIFile(ruleseed)
{
	var mid = document.getElementById("midi");
	const userText = getRandomLiber(ruleseed);
	const fullText = `${pangram} ${piDigits} ${userText}`;
	const midiData = generateMIDI(fullText);
	const url = createDownloadLink(midiData);
	mid.innerHTML = downloadableMIDI(url);
	
	logSubstitutions(fullText);
	console.log(userText);
}


const baseMIDINote = 60; // C4 (middle C)
const noteRange = 24; // Range for pitch variation
const baseLength = 480; // Base length in ticks for maximum length
const lengthRange = [30, 60, 90, 120, 150, 180]; // Range of lengths (in ticks)
const velocity = 100; // Constant velocity
const minTimeBetweenSameNote = 0.5; // Minimum time in beats between notes of the same pitch

function getUniqueLength(index) {
    const quotients = [4, 3, 2.5, 2, 1.5, 1.25, 1.2]; // Various quotients to divide base length
    const quotient = quotients[index % quotients.length];
    return Math.min(Math.max(Math.floor(baseLength / quotient), 30), 480); // Ensure length is within range
}

function getRandomPitch(base, range) {
    const pitch = base + Math.floor(Math.random() * range) - Math.floor(range / 2);
    return Math.min(127, Math.max(0, pitch)); // Ensure pitch is within 0-127
}

const notesList = [];
const lengthsList = [];

for (let i = 0; i < noteRange; i++) {
    const note = getRandomPitch(baseMIDINote - Math.floor(noteRange / 2), noteRange);
    if (!notesList.includes(note)) {
        notesList.push(note); // Unique note
    }
}
for (let i = 0; i < lengthRange.length; i++) {
    const length = getUniqueLength(i);
    if (!lengthsList.includes(length)) {
        lengthsList.push(length); // Unique length
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledNotes = shuffleArray([...notesList]);
const shuffledLengths = shuffleArray([...lengthsList]);

const uniqueCombinations = [];
for (let i = 0; i < websiteChars.length; i++) {
    const note = shuffledNotes[i % shuffledNotes.length];
    const length = shuffledLengths[i % shuffledLengths.length];
    uniqueCombinations.push({ note, length });
}

shuffleArray(uniqueCombinations);

const noteMap = {};
websiteChars.split('').forEach((char, index) => {
    noteMap[char] = {
        note: uniqueCombinations[index % uniqueCombinations.length].note,
        length: uniqueCombinations[index % uniqueCombinations.length].length,
        velocity: velocity
    };
});

function textToMIDINotes(text) {
    return text.split('').map(char => noteMap[char.toLowerCase()] || { note: 0, length: 60, velocity: velocity });
}

function logSubstitutions(text) {
    const substitutions = text.split('').map(char => {
        const mapped = noteMap[char.toLowerCase()];
		console.log(`${char}: ${mapped ? `Note ${mapped.note}, Length ${mapped.length}, Velocity ${mapped.velocity}` : 'No Mapping'}`);
    }).join('<br>');
}

function generateMIDI(text) {
    const notes = textToMIDINotes(text);
    const midi = new Midi();
    const track = midi.addTrack();

    const ticksPerBeat = 480; // Standard ticks per beat
    const noteSpacing = 0.1; // Amount of overlap between notes (in beats)
    const noteEndTimes = {}; // To track end times for each pitch

    let currentTime = 0;

    notes.forEach(({ note, length, velocity }) => {
        if (note !== 0) {
            const duration = length / ticksPerBeat;

            if (noteEndTimes[note] && currentTime < noteEndTimes[note]) {
                currentTime = noteEndTimes[note];
            }

            track.addNote({
                midi: note,
                time: currentTime, // Time in beats
                duration: duration, // Duration in beats
                velocity: velocity / 127 // Normalize velocity
            });

            noteEndTimes[note] = currentTime + duration + minTimeBetweenSameNote;

            currentTime += duration - noteSpacing; // Introduce overlap by reducing the time step
        }
    });

    return midi.toArray();
}

function createDownloadLink(midiData) {
    const blob = new Blob([midiData], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);
    return url;
}

function downloadableMIDI(url)
{
	return `<a href="${url}" download="midiFile.mid">Download MIDI File</a>`;
}

function getRandomLiber(ruleseed) {
	var ruleseed = new MonoRandom(ruleseed.seed);
	var index = 0;
	var link = "";
	for(var i = 0; i < 56; i++)
	{
		link += ruleseedChars[ruleseed.nextMax(ruleseedChars.length)];
	}
	link += ".onion";
	return link;
}

async function prepPrimus(ruleseedNumber)
{
	html.innerHTML = initialHTML + `<tr><td rowspan="2"><div><p id="gematria"></p><br><p class="gematriaLink"></p></div></td></tr></tbody></table>`;
	var gematria = document.getElementById("gematria");
	var gematriaLink = document.getElementsByClassName("gematriaLink")[0];
	for(var i = 0; i < gematriaPrimus.length; i++)
	{
		gematria.innerHTML += gematriaPrimus[i];
	}
	var ruleseed = new MonoRandom(ruleseedNumber);
	gematriaLink.innerHTML = await fetchModule(ruleseed);
}

const JSON_URL = "https://ktane.timwi.de/json/raw";

let allMods = [];

async function fetchModule(ruleseed) {
	var v = await fetch(JSON_URL);
	allMods = await v.json();
	const mod = allMods.KtaneModules[ruleseed.nextMax(allMods.KtaneModules.length)].Name;
	var name = mod.toString();
	var lol = translateLiber(ruleseed, name);
	return lol;
}

function translateLiber(ruleseed, name)
{
	var translation = "";
	var liberMethods = ["directTranslation","atbash","vigenereDIVINITY","shift3","vigenereFIRFUMFERENFE","subtractPrime-1"];
	var mathod = ruleseed.nextMax(liberMethods.length);
	switch(liberMethods[mathod])
	{
		case "directTranslation":
			translation = directTranslation(name.toUpperCase());
			break;
		case "atbash":
			translation = atbashTranslation(name.toUpperCase());
			break;
		case "vigenereDIVINITY":
			translation = vigenereTranslation(name.toUpperCase(), "DIVINITY");
			break;
		case "shift3":
			translation = shift3Translation(name.toUpperCase());
			break;
		case "vigenereFIRFUMFERENFE":
			translation = vigenereTranslation(name.toUpperCase(), "FIRFUMFERENFE");
			break;
		case "subtractPrime-1":
			translation = subPrimeTranslation(name.toUpperCase());
			break;
	}
	return translation;
}

var liberLetters = ["F","V","TH","O","R","C","G","W","H","N","I","J","EO","P","X","S","T","B","E","M","L","NG","OE","D","A","AE","Y","IA","EA"];

function directTranslation(name)
{
	var translate = "";
	for(var i = 0; i < name.length; i++)
	{
		if(i < name.length)
		{
			if(name[i] == 'Q')
			{
				 translate += ""+(gematriaPrimus[5]+gematriaPrimus[7])
			}
			else if(name[i] == 'T' && name[i+1] == 'H')
			{
				 translate += gematriaPrimus[2]
				 i++;
			}
			else if(name[i] == 'E' && name[i+1] == 'O')
			{
				 translate += gematriaPrimus[12]
				 i++;
			}
			else if(name[i] == 'N' && name[i+1] == 'G')
			{
				 translate += gematriaPrimus[21]
				 i++;
			}
			else if(name[i] == 'I' && name[i+1] == 'N' && name[i+2] == 'G')
			{
				 translate += gematriaPrimus[21]
				 i++;
				 i++;
			}
			else if(name[i] == 'O' && name[i+1] == 'E')
			{
				 translate += gematriaPrimus[22]
				 i++;
			}
			else if(name[i] == 'A' && name[i+1] == 'E')
			{
				 translate += gematriaPrimus[25]
				 i++;
			}
			else if(name[i] == 'I' && name[i+1] == 'A')
			{
				 translate += gematriaPrimus[27]
				 i++;
			}
			else if(name[i] == 'I' && name[i+1] == 'O')
			{
				 translate += gematriaPrimus[27]
				 i++;
			}
			else if(name[i] == 'E' && name[i+1] == 'A')
			{
				 translate += gematriaPrimus[28]
				 i++;
			}
			else if(name[i] == 'C' || name[i] == 'K')
			{
				 translate += gematriaPrimus[5];
			}
			else if(name[i] == 'S' || name[i] == 'Z')
			{
				translate += gematriaPrimus[15];
			}
			else if(name[i] == 'U')
			{
				translate += gematriaPrimus[1];
			}
			else if(liberLetters.indexOf(name[i]) != -1)
			{
				
				translate += gematriaPrimus[liberLetters.indexOf(name[i])];
			}
			else
			{
				translate += name[i];
			}
		}
	}
	return translate;
}

function atbashTranslation(name)
{
	var translate = "";
	var direct = directTranslation(name);
	for(var i = 0; i < direct.length; i++)
	{
		var index = 28-gematriaPrimus.indexOf(direct[i]);
		if(index >= 0 && index <= 28) 
		{
			translate += gematriaPrimus[index];
		}
		else
		{
			translate += direct[i];
		}
	}
	return translate;
}

function vigenereTranslation(name, key)
{
	var translate = "";
	var directName = directTranslation(name);
	var directKey = directTranslation(key);
	
	for(var i = 0; i < directName.length; i++)
	{
		var index = gematriaPrimus.indexOf(directName[i]);
		if(index >= 0 && index <= 28) 
		{
			translate += gematriaPrimus[(gematriaPrimus.indexOf(directName[i])+gematriaPrimus.indexOf(directKey[i]))%29]
		}
		else
		{
			translate += directName[i];
		}
		
	}
	
	return translate;
}

function shift3Translation(name)
{
	var translate = "";
	var direct = directTranslation(name);
	for(var i = 0; i < direct.length; i++)
	{
		var index = gematriaPrimus.indexOf(direct[i]);
		if(index == -1)
		{
			translate += direct[i];
		}
		else
		{
			index += 3;
			if(index > 28) index -= 29;
			translate += gematriaPrimus[index];
		}
	}
	translate = atbashTranslation(translate);
	return translate;
}

function subPrimeTranslation(name)
{
	var translate = "";
	var direct = directTranslation(name);
	var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997, 1009, 1013, 1019, 1021, 1031, 1033, 1039, 1049, 1051, 1061, 1063, 1069, 1087, 1091, 1093, 1097, 1103, 1109, 1117, 1123, 1129, 1151, 1153, 1163, 1171, 1181, 1187, 1193, 1201, 1213, 1217, 1223, 1229, 1231, 1237, 1249, 1259, 1277, 1279, 1283, 1289, 1291, 1297, 1301, 1303, 1307, 1319, 1321, 1327, 1361, 1367, 1373, 1381, 1399, 1409, 1423, 1427, 1429, 1433, 1439, 1447, 1451, 1453, 1459, 1471, 1481, 1483, 1487, 1489, 1493, 1499, 1511, 1523, 1531, 1543, 1549, 1553, 1559, 1567, 1571, 1579, 1583, 1597, 1601, 1607, 1609, 1613, 1619, 1621, 1627, 1637, 1657, 1663, 1667, 1669, 1693, 1697, 1699, 1709, 1721, 1723, 1733, 1741, 1747, 1753, 1759, 1777, 1783, 1787, 1789, 1801, 1811, 1823, 1831, 1847, 1861, 1867, 1871, 1873, 1877, 1879, 1889, 1901, 1907, 1913, 1931, 1933, 1949, 1951, 1973, 1979, 1987, 1993, 1997, 1999, 2003, 2011, 2017, 2027, 2029, 2039, 2053, 2063, 2069, 2081, 2083, 2087, 2089, 2099, 2111, 2113, 2129, 2131, 2137, 2141, 2143, 2153, 2161, 2179, 2203, 2207, 2213, 2221, 2237, 2239, 2243, 2251, 2267, 2269, 2273, 2281, 2287, 2293, 2297, 2309, 2311, 2333, 2339, 2341, 2347, 2351, 2357, 2371, 2377, 2381, 2383, 2389, 2393, 2399, 2411, 2417, 2423, 2437, 2441, 2447, 2459, 2467, 2473, 2477, 2503, 2521, 2531, 2539, 2543, 2549, 2551, 2557, 2579, 2591, 2593, 2609, 2617, 2621, 2633, 2647, 2657, 2659, 2663, 2671, 2677, 2683, 2687, 2689, 2693, 2699, 2707, 2711, 2713, 2719, 2729, 2731, 2741, 2749, 2753, 2767, 2777, 2789, 2791, 2797, 2801, 2803, 2819, 2833, 2837, 2843, 2851, 2857, 2861, 2879, 2887, 2897, 2903, 2909, 2917, 2927, 2939, 2953, 2957, 2963, 2969, 2971, 2999, 3001, 3011, 3019, 3023, 3037, 3041, 3049, 3061, 3067, 3079, 3083, 3089, 3109, 3119, 3121, 3137, 3163, 3167, 3169, 3181, 3187, 3191, 3203, 3209, 3217, 3221, 3229, 3251, 3253, 3257, 3259, 3271, 3299, 3301, 3307, 3313, 3319, 3323, 3329, 3331, 3343, 3347, 3359, 3361, 3371, 3373, 3389, 3391, 3407, 3413, 3433, 3449, 3457, 3461, 3463, 3467, 3469, 3491, 3499, 3511, 3517, 3527, 3529, 3533, 3539, 3541, 3547, 3557, 3559, 3571, 3581, 3583, 3593, 3607, 3613, 3617, 3623, 3631, 3637, 3643, 3659, 3671, 3673, 3677, 3691, 3697, 3701, 3709, 3719, 3727, 3733, 3739, 3761, 3767, 3769, 3779, 3793, 3797, 3803, 3821, 3823, 3833, 3847, 3851, 3853, 3863, 3877, 3881, 3889, 3907, 3911, 3917, 3919, 3923, 3929, 3931, 3943, 3947, 3967, 3989];
	
	for(var i = 0; i < direct.length; i++)
	{
		var index = gematriaPrimus.indexOf(direct[i]);
		if(index == -1)
		{
			translate += direct[i];
		}
		else
		{
			index += (primes[i]-1);
			if(index > 28) index = index % 29;
			translate += gematriaPrimus[index];
		}
	}
	return translate;
}