// ─────────────────────────────────────────────────────────────────────────────
// CROSSWORD GENERATOR (embedded)
// ─────────────────────────────────────────────────────────────────────────────

const WORD_BANK = [
  {word:'ACE',defs:['n\tA playing card with a single spot'],syns:['champion', 'expert', 'star'],ants:['novice', 'amateur', 'beginner']},
  {word:'AGE',defs:['n\tThe length of time something has existed'],syns:['era', 'epoch', 'period'],ants:['youth', 'infancy', 'newness']},
  {word:'AID',defs:['n\tHelp given to someone in need'],syns:['help', 'assist', 'support'],ants:['hinder', 'harm', 'obstruct']},
  {word:'AIM',defs:['v\tTo point at a target'],syns:['goal', 'target', 'purpose'],ants:['miss', 'ignore', 'avoid']},
  {word:'AIR',defs:['n\tThe invisible gas surrounding earth'],syns:['atmosphere', 'breeze', 'sky'],ants:['earth', 'ground', 'water']},
  {word:'ANT',defs:['n\tA small insect that lives in colonies'],syns:['insect', 'bug', 'worker'],ants:[]},
  {word:'APE',defs:['n\tA large primate without a tail'],syns:['primate', 'mimic', 'copy'],ants:[]},
  {word:'ARC',defs:['n\tA curved line; part of a circle'],syns:['curve', 'bow', 'arch'],ants:['line', 'straight']},
  {word:'ARM',defs:['n\tThe upper limb of the human body'],syns:['limb', 'branch', 'weapon'],ants:['disarm', 'leg']},
  {word:'ART',defs:['n\tThe expression of human creativity'],syns:['craft', 'skill', 'creation'],ants:['science', 'nature']},
  {word:'AXE',defs:['n\tA tool with a heavy blade for chopping'],syns:['hatchet', 'blade', 'cleaver'],ants:[]},
  {word:'BAD',defs:['adj\tOf poor quality; unpleasant'],syns:['awful', 'poor', 'terrible'],ants:['good', 'great', 'excellent']},
  {word:'BAG',defs:['n\tA flexible container with an opening at the top'],syns:['sack', 'pouch', 'pack'],ants:[]},
  {word:'BAN',defs:['v\tTo officially forbid something'],syns:['forbid', 'prohibit', 'bar'],ants:['allow', 'permit', 'approve']},
  {word:'BAR',defs:['n\tA long rigid piece of metal or wood'],syns:['rod', 'block', 'obstruct'],ants:['allow', 'open', 'free']},
  {word:'BAT',defs:['n\tA stick for hitting a ball; a nocturnal flying mammal'],syns:['club', 'stick', 'paddle'],ants:[]},
  {word:'BED',defs:['n\tA piece of furniture for sleeping'],syns:['cot', 'bunk', 'mattress'],ants:[]},
  {word:'BIG',defs:['adj\tOf considerable size or extent'],syns:['large', 'huge', 'giant'],ants:['small', 'tiny', 'little']},
  {word:'BOW',defs:['n\tA weapon for shooting arrows'],syns:['bend', 'arch', 'yield'],ants:['straighten', 'rise', 'resist']},
  {word:'BOX',defs:['n\tA rigid container with flat sides'],syns:['container', 'case', 'crate'],ants:[]},
  {word:'BOY',defs:['n\tA male child'],syns:['lad', 'youth', 'kid'],ants:['girl', 'woman', 'adult']},
  {word:'BUD',defs:['n\tA compact growth on a plant before opening'],syns:['sprout', 'bloom', 'pal'],ants:['wither', 'decay']},
  {word:'BUG',defs:['n\tA small insect; a fault in a program'],syns:['insect', 'flaw', 'annoy'],ants:['fix', 'repair', 'soothe']},
  {word:'BUS',defs:['n\tA large motor vehicle for passengers'],syns:['coach', 'vehicle', 'transport'],ants:[]},
  {word:'CAB',defs:['n\tA taxi; the driver\'s compartment in a truck'],syns:['taxi', 'car', 'vehicle'],ants:[]},
  {word:'CAN',defs:['n\tA metal container; to be able to'],syns:['tin', 'container', 'able'],ants:['cannot', 'unable']},
  {word:'CAP',defs:['n\tA flat head covering; an upper limit'],syns:['hat', 'lid', 'limit'],ants:['base', 'minimum', 'floor']},
  {word:'CAR',defs:['n\tA road vehicle powered by an engine'],syns:['vehicle', 'auto', 'automobile'],ants:[]},
  {word:'CAT',defs:['n\tA small domesticated carnivorous mammal'],syns:['feline', 'kitten', 'tabby'],ants:['dog']},
  {word:'COW',defs:['n\tA fully grown female domestic bovine animal'],syns:['bovine', 'heifer', 'intimidate'],ants:['encourage', 'embolden']},
  {word:'CRY',defs:['v\tTo shed tears; to call out loudly'],syns:['weep', 'sob', 'wail'],ants:['laugh', 'smile', 'cheer']},
  {word:'CUP',defs:['n\tA small container for drinking'],syns:['mug', 'glass', 'vessel'],ants:[]},
  {word:'CUT',defs:['v\tTo make an opening with a sharp tool'],syns:['slice', 'sever', 'trim'],ants:['join', 'attach', 'mend']},
  {word:'DEN',defs:['n\tA wild animal\'s lair; a private room'],syns:['lair', 'cave', 'study'],ants:[]},
  {word:'DIG',defs:['v\tTo break up and move earth'],syns:['excavate', 'burrow', 'delve'],ants:['fill', 'bury', 'cover']},
  {word:'DIP',defs:['v\tTo put briefly into liquid'],syns:['plunge', 'dunk', 'lower'],ants:['raise', 'lift', 'ascend']},
  {word:'DOG',defs:['n\tA domesticated carnivorous mammal'],syns:['hound', 'canine', 'mutt'],ants:['cat']},
  {word:'DOT',defs:['n\tA small round mark or spot'],syns:['spot', 'point', 'speck'],ants:['line', 'blank']},
  {word:'DUO',defs:['n\tA pair of people who do something together'],syns:['pair', 'couple', 'twosome'],ants:['solo', 'one', 'single']},
  {word:'DYE',defs:['n\tA substance used to color something'],syns:['color', 'tint', 'stain'],ants:['bleach', 'fade']},
  {word:'EAR',defs:['n\tThe organ of hearing'],syns:['hearing', 'lug', 'auricle'],ants:[]},
  {word:'EAT',defs:['v\tTo put food in the mouth and swallow it'],syns:['consume', 'devour', 'dine'],ants:['fast', 'starve', 'abstain']},
  {word:'EEL',defs:['n\tA snake-like fish'],syns:['fish', 'serpent'],ants:[]},
  {word:'EGG',defs:['n\tAn oval object laid by a female bird'],syns:['ovum', 'spawn', 'urge'],ants:[]},
  {word:'ELK',defs:['n\tA large deer of northern forests'],syns:['deer', 'stag', 'moose'],ants:[]},
  {word:'ELM',defs:['n\tA tall deciduous tree'],syns:['tree', 'timber'],ants:[]},
  {word:'EMU',defs:['n\tA large flightless Australian bird'],syns:['bird', 'ratite'],ants:[]},
  {word:'ERA',defs:['n\tA long distinct period of history'],syns:['age', 'epoch', 'period'],ants:['moment', 'instant']},
  {word:'EYE',defs:['n\tThe organ of sight'],syns:['gaze', 'watch', 'observe'],ants:['ignore', 'overlook']},
  {word:'FAN',defs:['n\tA device for creating airflow; an enthusiast'],syns:['admirer', 'devotee', 'enthusiast'],ants:['critic', 'detractor']},
  {word:'FAT',defs:['adj\tHaving too much flesh; a greasy substance'],syns:['plump', 'obese', 'grease'],ants:['thin', 'lean', 'slim']},
  {word:'FIG',defs:['n\tA soft pear-shaped fruit'],syns:['fruit', 'food'],ants:[]},
  {word:'FIT',defs:['adj\tIn good health; suitable for a purpose'],syns:['healthy', 'suited', 'match'],ants:['unfit', 'unsuited', 'unhealthy']},
  {word:'FLY',defs:['v\tTo travel through the air; a common insect'],syns:['soar', 'glide', 'dart'],ants:['crawl', 'walk', 'fall']},
  {word:'FOG',defs:['n\tThick cloud of water droplets near the ground'],syns:['mist', 'haze', 'murk'],ants:['clarity', 'sunshine', 'clear']},
  {word:'FOX',defs:['n\tA carnivorous mammal with a bushy tail'],syns:['canid', 'sly', 'cunning'],ants:[]},
  {word:'FRY',defs:['v\tTo cook in hot fat or oil'],syns:['cook', 'sauté', 'grill'],ants:['freeze', 'refrigerate']},
  {word:'FUR',defs:['n\tThe short fine hair of an animal'],syns:['coat', 'pelt', 'hair'],ants:['bare', 'naked', 'smooth']},
  {word:'GAP',defs:['n\tA break or hole in an object'],syns:['hole', 'space', 'opening'],ants:['closure', 'seal', 'fill']},
  {word:'GAS',defs:['n\tA substance that expands to fill any container'],syns:['vapor', 'fuel', 'fume'],ants:['solid', 'liquid']},
  {word:'GEM',defs:['n\tA precious or semiprecious stone'],syns:['jewel', 'stone', 'treasure'],ants:['junk', 'trash']},
  {word:'GIN',defs:['n\tA colorless spirit with juniper flavoring'],syns:['spirit', 'liquor', 'trap'],ants:[]},
  {word:'GOD',defs:['n\tA superhuman being worshipped as having power'],syns:['deity', 'divine', 'creator'],ants:['mortal', 'human']},
  {word:'GUM',defs:['n\tA sticky substance; the tissue in the mouth'],syns:['resin', 'paste', 'chew'],ants:[]},
  {word:'GUN',defs:['n\tA weapon that discharges bullets'],syns:['weapon', 'firearm', 'pistol'],ants:[]},
  {word:'GYM',defs:['n\tA room with equipment for exercise'],syns:['fitness', 'arena', 'studio'],ants:[]},
  {word:'HAM',defs:['n\tMeat from the upper part of a pig\'s leg'],syns:['pork', 'bacon', 'overact'],ants:[]},
  {word:'HAT',defs:['n\tA shaped covering for the head'],syns:['cap', 'bonnet', 'headgear'],ants:[]},
  {word:'HEN',defs:['n\tA female domestic fowl'],syns:['fowl', 'bird', 'female'],ants:['rooster', 'cock']},
  {word:'HIT',defs:['v\tTo bring one\'s hand against with force'],syns:['strike', 'smash', 'blow'],ants:['miss', 'dodge', 'avoid']},
  {word:'HOP',defs:['v\tTo jump on one foot'],syns:['jump', 'leap', 'skip'],ants:['stay', 'remain', 'land']},
  {word:'HOT',defs:['adj\tHaving a high temperature'],syns:['warm', 'blazing', 'scorching'],ants:['cold', 'cool', 'freezing']},
  {word:'HUB',defs:['n\tThe center of a wheel; a central point of activity'],syns:['center', 'core', 'axis'],ants:['edge', 'rim', 'periphery']},
  {word:'HUG',defs:['v\tTo hold tightly in one\'s arms'],syns:['embrace', 'clasp', 'cuddle'],ants:['shove', 'push', 'reject']},
  {word:'ICE',defs:['n\tFrozen water'],syns:['frost', 'freeze', 'chill'],ants:['melt', 'thaw', 'warm']},
  {word:'ILL',defs:['adj\tNot in good health; sick'],syns:['sick', 'unwell', 'ailing'],ants:['healthy', 'well', 'fit']},
  {word:'INN',defs:['n\tA pub or small hotel providing lodgings'],syns:['hotel', 'tavern', 'lodge'],ants:[]},
  {word:'ION',defs:['n\tAn atom that has lost or gained electrons'],syns:['particle', 'charge', 'atom'],ants:[]},
  {word:'IVY',defs:['n\tA woody evergreen climbing plant'],syns:['vine', 'plant', 'creeper'],ants:[]},
  {word:'JAM',defs:['n\tA preserve of fruit boiled with sugar'],syns:['preserve', 'squeeze', 'clog'],ants:['free', 'clear', 'release']},
  {word:'JAR',defs:['n\tA cylindrical glass container'],syns:['container', 'jolt', 'shock'],ants:['soothe', 'calm']},
  {word:'JET',defs:['n\tA fast aircraft propelled by jet engines'],syns:['aircraft', 'plane', 'dart'],ants:[]},
  {word:'JOB',defs:['n\tA paid position of regular employment'],syns:['work', 'task', 'career'],ants:['leisure', 'unemployment', 'rest']},
  {word:'JOY',defs:['n\tA feeling of great pleasure and happiness'],syns:['happiness', 'delight', 'bliss'],ants:['sorrow', 'grief', 'misery']},
  {word:'KEY',defs:['n\tA metal instrument for operating a lock'],syns:['crucial', 'essential', 'opener'],ants:['trivial', 'minor', 'lock']},
  {word:'KIT',defs:['n\tA set of articles or equipment for a purpose'],syns:['set', 'gear', 'equipment'],ants:[]},
  {word:'LAB',defs:['n\tA laboratory for scientific research'],syns:['laboratory', 'studio', 'workshop'],ants:[]},
  {word:'LAW',defs:['n\tA rule recognized by a community'],syns:['rule', 'statute', 'regulation'],ants:['crime', 'chaos', 'disorder']},
  {word:'LAY',defs:['v\tTo put something down carefully'],syns:['place', 'set', 'put'],ants:['lift', 'remove', 'take']},
  {word:'LEG',defs:['n\tEach of the limbs on which a person walks'],syns:['limb', 'shank', 'support'],ants:['arm']},
  {word:'LID',defs:['n\tA removable or hinged cover for a container'],syns:['cover', 'cap', 'top'],ants:['base', 'bottom', 'opening']},
  {word:'LOG',defs:['n\tA part of a felled tree; a record of events'],syns:['record', 'timber', 'chronicle'],ants:[]},
  {word:'LOW',defs:['adj\tNot high; at a small height from the ground'],syns:['short', 'deep', 'reduced'],ants:['high', 'tall', 'elevated']},
  {word:'MAD',defs:['adj\tMentally ill; very angry'],syns:['angry', 'crazy', 'furious'],ants:['sane', 'calm', 'content']},
  {word:'MAP',defs:['n\tA diagrammatic representation of an area'],syns:['chart', 'plan', 'diagram'],ants:[]},
  {word:'MAT',defs:['n\tA piece of protective material on a floor'],syns:['rug', 'pad', 'tangled'],ants:[]},
  {word:'MOB',defs:['n\tA large disorderly crowd of people'],syns:['crowd', 'gang', 'horde'],ants:['individual', 'solitude']},
  {word:'MOP',defs:['n\tAn implement for cleaning floors'],syns:['clean', 'swab', 'wipe'],ants:['dirty', 'soil', 'mess']},
  {word:'MUD',defs:['n\tSoft sticky matter from water and earth'],syns:['muck', 'silt', 'slime'],ants:['dry', 'dust', 'clean']},
  {word:'MUG',defs:['n\tA large cylindrical cup'],syns:['cup', 'rob', 'face'],ants:[]},
  {word:'NAP',defs:['n\tA short sleep during the day'],syns:['doze', 'rest', 'snooze'],ants:['waken', 'rise', 'awake']},
  {word:'NET',defs:['n\tA fabric of open mesh; remaining after deductions'],syns:['mesh', 'web', 'catch'],ants:['gross', 'lose', 'miss']},
  {word:'NIT',defs:['n\tA louse egg attached to hair'],syns:['louse', 'egg', 'parasite'],ants:[]},
  {word:'NOD',defs:['v\tTo lower and raise the head as a greeting'],syns:['agree', 'bow', 'gesture'],ants:['shake', 'disagree', 'refuse']},
  {word:'NUN',defs:['n\tA woman living in a convent under vows'],syns:['sister', 'monk', 'religious'],ants:['layperson']},
  {word:'NUT',defs:['n\tA fruit with a hard shell; a small metal fastener'],syns:['kernel', 'seed', 'eccentric'],ants:[]},
  {word:'OAK',defs:['n\tA large tree bearing acorns'],syns:['tree', 'timber', 'hardwood'],ants:[]},
  {word:'OAR',defs:['n\tA pole with a flat blade for rowing'],syns:['paddle', 'blade', 'scull'],ants:[]},
  {word:'ODD',defs:['adj\tDifferent from what is usual; not divisible by two'],syns:['strange', 'unusual', 'bizarre'],ants:['even', 'normal', 'ordinary']},
  {word:'OIL',defs:['n\tA viscous liquid used for fuel or lubrication'],syns:['grease', 'petroleum', 'lubricant'],ants:['dry', 'water']},
  {word:'OLD',defs:['adj\tHaving lived for a long time'],syns:['ancient', 'aged', 'elderly'],ants:['new', 'young', 'fresh']},
  {word:'ORB',defs:['n\tA spherical object or shape'],syns:['sphere', 'globe', 'ball'],ants:['cube', 'flat']},
  {word:'ORE',defs:['n\tMaterial from which metal is extracted'],syns:['mineral', 'metal', 'rock'],ants:[]},
  {word:'OWL',defs:['n\tA nocturnal bird of prey with large eyes'],syns:['bird', 'raptor', 'nocturnal'],ants:[]},
  {word:'PAN',defs:['n\tA metal container used for cooking'],syns:['skillet', 'pot', 'criticize'],ants:['praise', 'compliment']},
  {word:'PAW',defs:['n\tThe foot of an animal'],syns:['foot', 'claw', 'handle'],ants:[]},
  {word:'PAY',defs:['v\tTo give money for goods or services'],syns:['wage', 'compensate', 'settle'],ants:['owe', 'charge', 'withhold']},
  {word:'PEA',defs:['n\tA small spherical green seed eaten as a vegetable'],syns:['legume', 'seed', 'vegetable'],ants:[]},
  {word:'PEN',defs:['n\tAn instrument for writing with ink'],syns:['write', 'enclosure', 'biro'],ants:['erase', 'free']},
  {word:'PIE',defs:['n\tA baked dish with a pastry crust'],syns:['pastry', 'tart', 'dish'],ants:[]},
  {word:'PIG',defs:['n\tA domesticated omnivorous mammal'],syns:['swine', 'hog', 'boar'],ants:[]},
  {word:'PIT',defs:['n\tA large hole in the ground'],syns:['hole', 'grave', 'hollow'],ants:['peak', 'summit', 'hill']},
  {word:'POD',defs:['n\tA long seed vessel of a plant'],syns:['shell', 'vessel', 'group'],ants:[]},
  {word:'POT',defs:['n\tA round container for cooking'],syns:['pan', 'vessel', 'cauldron'],ants:[]},
  {word:'PUB',defs:['n\tAn establishment selling alcoholic drinks'],syns:['bar', 'tavern', 'inn'],ants:[]},
  {word:'PUN',defs:['n\tA play on words exploiting multiple meanings'],syns:['wordplay', 'joke', 'quip'],ants:[]},
  {word:'RAG',defs:['n\tA piece of old cloth used for cleaning'],syns:['cloth', 'scrap', 'tatter'],ants:[]},
  {word:'RAN',defs:['v\tPast tense of run'],syns:['fled', 'sprinted', 'dashed'],ants:['walked', 'stayed', 'crawled']},
  {word:'RAP',defs:['v\tTo strike sharply; a genre of music'],syns:['knock', 'tap', 'music'],ants:[]},
  {word:'RAT',defs:['n\tA rodent with a long tail'],syns:['rodent', 'traitor', 'snitch'],ants:[]},
  {word:'RAW',defs:['adj\tNot cooked; in a natural state'],syns:['uncooked', 'rough', 'crude'],ants:['cooked', 'refined', 'smooth']},
  {word:'RAY',defs:['n\tA narrow beam of light or radiation'],syns:['beam', 'shaft', 'gleam'],ants:['shadow', 'darkness']},
  {word:'RED',defs:['adj\tOf the color of blood'],syns:['crimson', 'scarlet', 'ruby'],ants:['green', 'blue']},
  {word:'RIB',defs:['n\tEach of the bones forming the chest wall'],syns:['bone', 'tease', 'ridge'],ants:[]},
  {word:'ROD',defs:['n\tA thin straight bar or stick'],syns:['stick', 'pole', 'bar'],ants:[]},
  {word:'ROT',defs:['v\tTo decompose; to cause to decay'],syns:['decay', 'decompose', 'putrefy'],ants:['preserve', 'grow', 'fresh']},
  {word:'ROW',defs:['n\tA line of people or things; to propel a boat'],syns:['line', 'queue', 'quarrel'],ants:['column', 'peace', 'harmony']},
  {word:'RUG',defs:['n\tA small carpet'],syns:['carpet', 'mat', 'toupee'],ants:[]},
  {word:'RUN',defs:['v\tTo move at a speed faster than walking'],syns:['sprint', 'dash', 'jog'],ants:['walk', 'stop', 'halt']},
  {word:'RYE',defs:['n\tA hardy cereal plant; whiskey made from rye'],syns:['grain', 'cereal', 'whiskey'],ants:[]},
  {word:'SAP',defs:['n\tThe fluid from a plant'],syns:['juice', 'fluid', 'weaken'],ants:['strengthen', 'energize']},
  {word:'SAW',defs:['n\tA cutting tool with a toothed blade'],syns:['blade', 'tool', 'observed'],ants:[]},
  {word:'SAY',defs:['v\tTo utter words; to express in speech'],syns:['speak', 'state', 'utter'],ants:['hush', 'silence', 'listen']},
  {word:'SET',defs:['v\tTo put in a specific place; a collection of things'],syns:['place', 'group', 'fixed'],ants:['remove', 'loose', 'unfixed']},
  {word:'SEW',defs:['v\tTo join with thread using a needle'],syns:['stitch', 'mend', 'tailor'],ants:['tear', 'rip', 'unsew']},
  {word:'SHY',defs:['adj\tBeing reserved or reluctant around others'],syns:['timid', 'bashful', 'reserved'],ants:['bold', 'confident', 'outgoing']},
  {word:'SIN',defs:['n\tAn act considered immoral by religious law'],syns:['transgression', 'evil', 'wrongdoing'],ants:['virtue', 'goodness', 'piety']},
  {word:'SIP',defs:['v\tTo drink by taking small mouthfuls'],syns:['taste', 'swig', 'drink'],ants:['gulp', 'guzzle', 'pour']},
  {word:'SIT',defs:['v\tTo be in a position with the body resting'],syns:['rest', 'perch', 'remain'],ants:['stand', 'rise', 'leave']},
  {word:'SIX',defs:['n\tThe number 6'],syns:['half-dozen', 'hexad'],ants:[]},
  {word:'SKY',defs:['n\tThe region of the atmosphere above the earth'],syns:['heaven', 'firmament', 'blue'],ants:['ground', 'earth']},
  {word:'SOB',defs:['v\tTo cry making gasping sounds'],syns:['weep', 'cry', 'whimper'],ants:['laugh', 'cheer', 'smile']},
  {word:'SON',defs:['n\tA boy or man in relation to his parents'],syns:['boy', 'heir', 'child'],ants:['daughter', 'parent', 'mother']},
  {word:'SOW',defs:['v\tTo plant seeds; a female pig'],syns:['plant', 'seed', 'scatter'],ants:['reap', 'harvest', 'gather']},
  {word:'SPA',defs:['n\tA place for health and beauty treatments'],syns:['resort', 'retreat', 'bath'],ants:[]},
  {word:'SPY',defs:['n\tA person employed to gather secret information'],syns:['agent', 'mole', 'watch'],ants:['ignore', 'reveal', 'expose']},
  {word:'SUM',defs:['n\tA particular amount of money; the total'],syns:['total', 'amount', 'add'],ants:['difference', 'subtract', 'part']},
  {word:'SUN',defs:['n\tThe star at the center of our solar system'],syns:['star', 'light', 'solar'],ants:['moon', 'darkness', 'night']},
  {word:'TAB',defs:['n\tA small flap; a bill to be paid'],syns:['bill', 'label', 'flap'],ants:[]},
  {word:'TAG',defs:['n\tA label attached to something'],syns:['label', 'mark', 'follow'],ants:['lose', 'unmark', 'remove']},
  {word:'TAN',defs:['adj\tA yellowish-brown color from sun exposure'],syns:['brown', 'bronze', 'beige'],ants:['pale', 'white', 'bleach']},
  {word:'TAP',defs:['v\tTo strike lightly; a device for controlling flow'],syns:['knock', 'touch', 'faucet'],ants:['thump', 'pour', 'release']},
  {word:'TAR',defs:['n\tA dark thick flammable liquid from coal'],syns:['pitch', 'asphalt', 'blacken'],ants:['clean', 'whiten']},
  {word:'TEN',defs:['n\tThe number 10'],syns:['decade', 'dime'],ants:[]},
  {word:'TIP',defs:['n\tThe pointed end of something'],syns:['point', 'peak', 'hint'],ants:['base', 'bottom', 'withhold']},
  {word:'TOE',defs:['n\tEach of the digits of the foot'],syns:['digit', 'toe-cap', 'foot'],ants:[]},
  {word:'TON',defs:['n\tA unit of weight'],syns:['weight', 'load', 'mass'],ants:['ounce', 'gram']},
  {word:'TOP',defs:['n\tThe highest point or uppermost layer'],syns:['peak', 'summit', 'best'],ants:['bottom', 'base', 'worst']},
  {word:'TUG',defs:['v\tTo pull something hard'],syns:['pull', 'drag', 'haul'],ants:['push', 'shove', 'release']},
  {word:'TWO',defs:['n\tThe number 2'],syns:['pair', 'duo', 'couple'],ants:['one', 'solo', 'single']},
  {word:'VAN',defs:['n\tA medium-sized road vehicle for goods'],syns:['vehicle', 'truck', 'wagon'],ants:[]},
  {word:'VOW',defs:['n\tA solemn promise'],syns:['promise', 'oath', 'pledge'],ants:['break', 'renounce', 'deny']},
  {word:'WAR',defs:['n\tA state of armed conflict between nations'],syns:['conflict', 'battle', 'combat'],ants:['peace', 'truce', 'harmony']},
  {word:'WAX',defs:['n\tA soft mouldable substance made by bees'],syns:['polish', 'grow', 'increase'],ants:['wane', 'decrease', 'shrink']},
  {word:'WAY',defs:['n\tA method for achieving something; a route'],syns:['path', 'route', 'method'],ants:['obstacle', 'blockage']},
  {word:'WEB',defs:['n\tA network of threads spun by spiders'],syns:['network', 'mesh', 'trap'],ants:[]},
  {word:'WIG',defs:['n\tA covering of false hair for the head'],syns:['hairpiece', 'toupee', 'hairdo'],ants:[]},
  {word:'WIN',defs:['v\tTo be successful in a contest'],syns:['triumph', 'succeed', 'beat'],ants:['lose', 'fail', 'forfeit']},
  {word:'WIT',defs:['n\tMental sharpness and inventiveness'],syns:['humor', 'intelligence', 'cleverness'],ants:['stupidity', 'dullness', 'ignorance']},
  {word:'WOE',defs:['n\tGreat sorrow or distress'],syns:['grief', 'misery', 'sorrow'],ants:['joy', 'happiness', 'bliss']},
  {word:'YAK',defs:['n\tA large ox of Tibet with long shaggy hair'],syns:['ox', 'bovine', 'chatter'],ants:['silence', 'quiet']},
  {word:'YAM',defs:['n\tA large starchy vegetable'],syns:['tuber', 'vegetable', 'sweet potato'],ants:[]},
  // 4-letter words
  {word:'ABLE',defs:['adj\tHaving the power to do something'],syns:['capable', 'competent', 'skilled'],ants:['unable', 'incapable', 'incompetent']},
  {word:'ACID',defs:['n\tA substance with pH less than seven'],syns:['sour', 'corrosive', 'sharp'],ants:['base', 'alkaline', 'sweet']},
  {word:'AREA',defs:['n\tA region or part of a place'],syns:['region', 'zone', 'space'],ants:[]},
  {word:'ARMY',defs:['n\tA large organized armed force'],syns:['force', 'troops', 'legion'],ants:['civilians', 'peace']},
  {word:'ATOM',defs:['n\tThe smallest unit of a chemical element'],syns:['particle', 'element', 'unit'],ants:['universe', 'whole']},
  {word:'AUNT',defs:['n\tThe sister of one\'s parent'],syns:['relative', 'kin', 'auntie'],ants:['uncle', 'nephew']},
  {word:'BARE',defs:['adj\tNaked; not covered'],syns:['naked', 'empty', 'plain'],ants:['covered', 'clothed', 'full']},
  {word:'BARN',defs:['n\tA large farm building for storing crops'],syns:['stable', 'shed', 'farmhouse'],ants:[]},
  {word:'BEAR',defs:['n\tA large heavy mammal with thick fur'],syns:['carry', 'endure', 'animal'],ants:['drop', 'release', 'avoid']},
  {word:'BEAT',defs:['v\tTo strike repeatedly'],syns:['hit', 'defeat', 'rhythm'],ants:['lose', 'miss', 'silence']},
  {word:'BELT',defs:['n\tA strip of leather worn around the waist'],syns:['strap', 'band', 'hit'],ants:[]},
  {word:'BEST',defs:['adj\tOf the most excellent quality'],syns:['finest', 'greatest', 'top'],ants:['worst', 'poorest', 'bottom']},
  {word:'BIRD',defs:['n\tA warm-blooded egg-laying vertebrate with feathers'],syns:['fowl', 'avian', 'feathered'],ants:[]},
  {word:'BITE',defs:['v\tTo cut into something with one\'s teeth'],syns:['chew', 'gnaw', 'sting'],ants:['release', 'kiss', 'soothe']},
  {word:'BLOW',defs:['v\tTo send out a current of air'],syns:['gust', 'strike', 'blast'],ants:['calm', 'inhale', 'soothe']},
  {word:'BLUE',defs:['adj\tOf a color like the sky on a clear day'],syns:['azure', 'cerulean', 'sad'],ants:['red', 'yellow', 'happy']},
  {word:'BLUR',defs:['v\tTo make something less clear'],syns:['smear', 'cloud', 'haze'],ants:['clear', 'focus', 'sharpen']},
  {word:'BOLD',defs:['adj\tShowing courage or confidence'],syns:['brave', 'daring', 'confident'],ants:['timid', 'cowardly', 'shy']},
  {word:'BONE',defs:['n\tRigid connective tissue forming the skeleton'],syns:['skeleton', 'spine', 'study'],ants:[]},
  {word:'BOOK',defs:['n\tA written or printed work consisting of pages'],syns:['volume', 'tome', 'reserve'],ants:['cancel', 'unbook']},
  {word:'BORE',defs:['v\tTo make someone feel uninterested'],syns:['dull', 'tire', 'drill'],ants:['excite', 'entertain', 'interest']},
  {word:'BORN',defs:['v\tHaving come into existence through birth'],syns:['created', 'natural', 'innate'],ants:['died', 'unnatural', 'made']},
  {word:'BOWL',defs:['n\tA round deep dish for food or liquid'],syns:['dish', 'basin', 'throw'],ants:[]},
  {word:'BULL',defs:['n\tAn adult uncastrated male bovine'],syns:['male', 'push', 'nonsense'],ants:['cow', 'female', 'truth']},
  {word:'BURN',defs:['v\tTo be on fire'],syns:['blaze', 'scorch', 'flame'],ants:['extinguish', 'cool', 'freeze']},
  {word:'BUSY',defs:['adj\tHaving a great deal to do'],syns:['occupied', 'active', 'hectic'],ants:['idle', 'free', 'quiet']},
  {word:'CAKE',defs:['n\tA sweet baked food made from flour and sugar'],syns:['pastry', 'dessert', 'crust'],ants:[]},
  {word:'CALL',defs:['v\tTo cry out or speak loudly'],syns:['shout', 'phone', 'name'],ants:['whisper', 'silence', 'ignore']},
  {word:'CALM',defs:['adj\tNot showing nervousness or anxiety'],syns:['peaceful', 'serene', 'tranquil'],ants:['agitated', 'stormy', 'anxious']},
  {word:'CAMP',defs:['n\tA place with temporary accommodation'],syns:['tent', 'base', 'rustic'],ants:['home', 'city']},
  {word:'CARD',defs:['n\tA small piece of stiff paper with information'],syns:['ticket', 'note', 'board'],ants:[]},
  {word:'CARE',defs:['v\tTo feel concern or interest'],syns:['concern', 'tend', 'nurture'],ants:['neglect', 'ignore', 'abandon']},
  {word:'CART',defs:['n\tA vehicle with wheels pulled by an animal'],syns:['wagon', 'trolley', 'carry'],ants:[]},
  {word:'CASE',defs:['n\tAn instance of a particular situation'],syns:['instance', 'box', 'situation'],ants:[]},
  {word:'CASH',defs:['n\tMoney in coins or notes'],syns:['money', 'currency', 'funds'],ants:['debt', 'credit']},
  {word:'CAVE',defs:['n\tA large natural underground chamber'],syns:['cavern', 'hollow', 'yield'],ants:['mountain', 'resist', 'stand']},
  {word:'CELL',defs:['n\tThe smallest structural unit of an organism']},
  {word:'CHAT',defs:['v\tTo talk in a friendly and informal way']},
  {word:'CHEF',defs:['n\tA professional cook in a restaurant']},
  {word:'CHIN',defs:['n\tThe protruding part of the face below the mouth']},
  {word:'CHIP',defs:['n\tA small piece broken off a larger object']},
  {word:'CITE',defs:['v\tTo quote as evidence or example']},
  {word:'CITY',defs:['n\tA large and permanent human settlement']},
  {word:'CLAW',defs:['n\tA curved pointed nail on an animal\'s foot']},
  {word:'CLAY',defs:['n\tA stiff sticky earth used in making ceramics']},
  {word:'CLUE',defs:['n\tA piece of evidence that helps solve a mystery']},
  {word:'COAL',defs:['n\tA black rock used as fuel']},
  {word:'COAT',defs:['n\tAn outer garment worn to keep warm']},
  {word:'CODE',defs:['n\tA system of words used to represent something secret']},
  {word:'COIN',defs:['n\tA flat metal disc used as money']},
  {word:'COLD',defs:['adj\tOf or at a low temperature'],syns:['frigid', 'chilly', 'icy'],ants:['hot', 'warm', 'heated']},
  {word:'COMB',defs:['n\tA toothed strip for arranging hair']},
  {word:'COOK',defs:['v\tTo prepare food by heating']},
  {word:'COOL',defs:['adj\tOf a moderately low temperature']},
  {word:'COPY',defs:['n\tA thing made to be identical to another'],syns:['duplicate', 'imitate', 'replicate'],ants:['original', 'create', 'invent']},
  {word:'CORD',defs:['n\tThin flexible string or rope']},
  {word:'CORE',defs:['n\tThe central or most important part'],syns:['center', 'heart', 'essence'],ants:['edge', 'exterior', 'shell']},
  {word:'CORN',defs:['n\tA cereal plant bearing large kernels on a cob']},
  {word:'COST',defs:['n\tThe amount paid or required in payment'],syns:['price', 'expense', 'fee'],ants:['free', 'gain', 'profit']},
  {word:'COVE',defs:['n\tA small sheltered bay in the coastline']},
  {word:'CRAB',defs:['n\tA crustacean with a broad carapace and claws']},
  {word:'CREW',defs:['n\tA group of people working on a vessel']},
  {word:'CROP',defs:['n\tA plant cultivated on a large scale for food'],syns:['harvest', 'trim', 'yield'],ants:['plant', 'seed', 'grow']},
  {word:'CROW',defs:['n\tA large black bird with a harsh call'],syns:['raven', 'boast', 'brag'],ants:['humble', 'mourn']},
  {word:'CUBE',defs:['n\tA symmetrical three-dimensional shape with six faces']},
  {word:'CURE',defs:['n\tA treatment that eliminates disease'],syns:['heal', 'remedy', 'fix'],ants:['harm', 'disease', 'sicken']},
  {word:'CURL',defs:['v\tTo form a curved or spiral shape']},
  {word:'DAMP',defs:['adj\tSlightly wet']},
  {word:'DARK',defs:['adj\tWith little or no light'],syns:['gloomy', 'dim', 'shadowy'],ants:['bright', 'light', 'illuminated']},
  {word:'DASH',defs:['v\tTo move rapidly']},
  {word:'DATA',defs:['n\tFacts and statistics for reference or analysis']},
  {word:'DATE',defs:['n\tThe day month and year of an event']},
  {word:'DAWN',defs:['n\tThe beginning of daylight in the morning'],syns:['sunrise', 'daybreak', 'begin'],ants:['dusk', 'sunset', 'end']},
  {word:'DEAD',defs:['adj\tNo longer alive'],syns:['lifeless', 'extinct', 'dull'],ants:['alive', 'living', 'vibrant']},
  {word:'DEAL',defs:['v\tTo distribute cards to players in a game']},
  {word:'DEAR',defs:['adj\tRegarded with deep affection'],syns:['beloved', 'costly', 'precious'],ants:['cheap', 'hated', 'worthless']},
  {word:'DEBT',defs:['n\tSomething owed especially money']},
  {word:'DECK',defs:['n\tA floor of a ship']},
  {word:'DEED',defs:['n\tAn action performed intentionally']},
  {word:'DEEP',defs:['adj\tExtending far down from the surface'],syns:['profound', 'vast', 'intense'],ants:['shallow', 'surface', 'superficial']},
  {word:'DENY',defs:['v\tTo state something is not true'],syns:['refuse', 'reject', 'negate'],ants:['admit', 'accept', 'confirm']},
  {word:'DESK',defs:['n\tA piece of furniture used for writing'],syns:['table', 'bureau', 'workspace'],ants:[]},
  {word:'DICE',defs:['n\tSmall cubes used in games of chance']},
  {word:'DIET',defs:['n\tThe food and drink regularly consumed'],syns:['nutrition', 'fast', 'regiment'],ants:['feast', 'gorge', 'overeat']},
  {word:'DIRE',defs:['adj\tExtremely serious or urgent']},
  {word:'DIRT',defs:['n\tSubstance that soils; earth or soil']},
  {word:'DISK',defs:['n\tA flat circular object']},
  {word:'DOCK',defs:['n\tA platform for loading and unloading ships']},
  {word:'DOME',defs:['n\tA rounded vault forming a roof']},
  {word:'DOOR',defs:['n\tA hinged barrier for closing an entrance']},
  {word:'DOSE',defs:['n\tA quantity of medicine taken at one time']},
  {word:'DOVE',defs:['n\tA stocky bird often symbolizing peace']},
  {word:'DOWN',defs:['adv\tFrom top to bottom; in a lower position']},
  {word:'DRAW',defs:['v\tTo produce a picture with a pencil or pen']},
  {word:'DRIP',defs:['v\tTo fall in small drops']},
  {word:'DROP',defs:['v\tTo let something fall']},
  {word:'DRUM',defs:['n\tA percussion instrument struck with sticks']},
  {word:'DUAL',defs:['adj\tConsisting of two parts or elements']},
  {word:'DULL',defs:['adj\tLacking interest or excitement'],syns:['boring', 'blunt', 'dim'],ants:['sharp', 'bright', 'exciting']},
  {word:'DUNE',defs:['n\tA mound of sand formed by wind'],syns:['hill', 'mound', 'sand'],ants:['valley', 'hollow']},
  {word:'DUSK',defs:['n\tThe darker stage of twilight']},
  {word:'DUST',defs:['n\tFine dry powder from the ground'],syns:['powder', 'grime', 'sprinkle'],ants:['clean', 'polish']},
  {word:'DUTY',defs:['n\tA moral or legal obligation'],syns:['obligation', 'task', 'responsibility'],ants:['freedom', 'right', 'choice']},
  {word:'EARN',defs:['v\tTo obtain money in return for work'],syns:['gain', 'deserve', 'make'],ants:['lose', 'spend', 'waste']},
  {word:'EASE',defs:['n\tAbsence of difficulty; freedom from worry'],syns:['comfort', 'relieve', 'simplicity'],ants:['difficulty', 'strain', 'complicate']},
  {word:'EAST',defs:['n\tThe direction toward the sunrise']},
  {word:'EDGE',defs:['n\tThe outside limit of an object or area']},
  {word:'EDIT',defs:['v\tTo prepare written material for publication']},
  {word:'EMIT',defs:['v\tTo produce and discharge something']},
  {word:'EPIC',defs:['adj\tHeroic or grand in scale'],syns:['grand', 'heroic', 'legend'],ants:['trivial', 'minor', 'mundane']},
  {word:'EVEN',defs:['adj\tFlat and smooth; divisible by two'],syns:['level', 'equal', 'smooth'],ants:['odd', 'uneven', 'rough']},
  {word:'EVIL',defs:['adj\tProfoundly immoral and wicked'],syns:['wicked', 'corrupt', 'malicious'],ants:['good', 'virtuous', 'righteous']},
  {word:'EXAM',defs:['n\tA formal test of knowledge or ability']},
  {word:'FACE',defs:['n\tThe front part of the head'],syns:['front', 'confront', 'visage'],ants:['back', 'avoid', 'flee']},
  {word:'FACT',defs:['n\tA thing known to be true'],syns:['truth', 'reality', 'certainty'],ants:['fiction', 'lie', 'myth']},
  {word:'FADE',defs:['v\tTo gradually grow faint and disappear'],syns:['dim', 'wane', 'diminish'],ants:['brighten', 'grow', 'intensify']},
  {word:'FAIL',defs:['v\tTo be unsuccessful in achieving a goal'],syns:['flunk', 'miss', 'collapse'],ants:['succeed', 'pass', 'triumph']},
  {word:'FAIR',defs:['adj\tTreating people equally'],syns:['just', 'impartial', 'pale'],ants:['unfair', 'biased', 'dark']},
  {word:'FALL',defs:['v\tTo move downward under gravity'],syns:['drop', 'tumble', 'autumn'],ants:['rise', 'climb', 'spring']},
  {word:'FAME',defs:['n\tThe state of being known by many people'],syns:['glory', 'renown', 'celebrity'],ants:['obscurity', 'infamy', 'anonymity']},
  {word:'FARM',defs:['n\tAn area of land used for cultivating crops']},
  {word:'FAST',defs:['adj\tMoving with high speed'],syns:['quick', 'rapid', 'swift'],ants:['slow', 'sluggish', 'steady']},
  {word:'FATE',defs:['n\tThe development of events beyond one\'s control']},
  {word:'FEAR',defs:['n\tAn unpleasant emotion caused by threat'],syns:['dread', 'terror', 'fright'],ants:['courage', 'bravery', 'calm']},
  {word:'FEAT',defs:['n\tAn achievement requiring great courage or skill']},
  {word:'FEEL',defs:['v\tTo be aware of something through touch'],syns:['sense', 'touch', 'experience'],ants:['ignore', 'numb']},
  {word:'FILE',defs:['n\tA folder for keeping documents'],syns:['record', 'folder', 'tool'],ants:[]},
  {word:'FILL',defs:['v\tTo make full; to occupy the whole of'],syns:['pack', 'stuff', 'load'],ants:['empty', 'drain', 'hollow']},
  {word:'FILM',defs:['n\tA motion picture']},
  {word:'FIND',defs:['v\tTo discover or locate something'],syns:['discover', 'locate', 'uncover'],ants:['lose', 'miss', 'overlook']},
  {word:'FIRE',defs:['n\tCombustion producing heat and light'],syns:['flame', 'blaze', 'dismiss'],ants:['water', 'hire', 'extinguish']},
  {word:'FIRM',defs:['adj\tHaving a solid and stable structure'],syns:['solid', 'rigid', 'resolute'],ants:['soft', 'flexible', 'wavering']},
  {word:'FISH',defs:['n\tA cold-blooded aquatic vertebrate'],syns:['angle', 'hunt', 'seafood'],ants:[]},
  {word:'FLAG',defs:['n\tA piece of cloth representing a country']},
  {word:'FLAT',defs:['adj\tSmooth and even; having no raised areas'],syns:['level', 'plain', 'dull'],ants:['hilly', 'rounded', 'exciting']},
  {word:'FLIP',defs:['v\tTo turn over with a quick movement']},
  {word:'FLOW',defs:['v\tTo move steadily and continuously'],syns:['stream', 'current', 'run'],ants:['stop', 'block', 'stagnate']},
  {word:'FOAM',defs:['n\tA mass of small bubbles formed in liquid'],syns:['froth', 'bubble', 'lather'],ants:[]},
  {word:'FOLD',defs:['v\tTo bend something over on itself'],syns:['bend', 'crease', 'collapse'],ants:['unfold', 'open', 'flatten']},
  {word:'FOND',defs:['adj\tHaving an affection or liking for']},
  {word:'FONT',defs:['n\tA set of type of one style; a basin for baptism']},
  {word:'FOOD',defs:['n\tAny substance consumed for nutrition'],syns:['nourishment', 'meal', 'sustenance'],ants:['poison', 'starvation', 'fast']},
  {word:'FOOL',defs:['n\tA person who acts unwisely'],syns:['idiot', 'trick', 'deceive'],ants:['genius', 'wise', 'enlighten']},
  {word:'FOOT',defs:['n\tThe lower extremity of the leg']},
  {word:'FORK',defs:['n\tA utensil with prongs for eating food']},
  {word:'FORM',defs:['n\tThe shape or arrangement of something']},
  {word:'FORT',defs:['n\tA fortified building or strategic position']},
  {word:'FOUR',defs:['n\tThe number 4']},
  {word:'FREE',defs:['adj\tNot under the control of another'],syns:['liberate', 'loose', 'gratis'],ants:['imprison', 'bind', 'costly']},
  {word:'FUEL',defs:['n\tMaterial burned as a source of energy']},
  {word:'FULL',defs:['adj\tContaining as much as possible'],syns:['packed', 'complete', 'satiated'],ants:['empty', 'partial', 'hungry']},
  {word:'FUND',defs:['n\tA sum of money saved for a purpose'],syns:['finance', 'resource', 'capital'],ants:['debt', 'bankrupt']},
  {word:'FUSE',defs:['n\tA safety device that stops excess current'],syns:['merge', 'blend', 'combine'],ants:['separate', 'split', 'divide']},
  {word:'GAIN',defs:['v\tTo obtain or secure something desired'],syns:['earn', 'acquire', 'profit'],ants:['lose', 'forfeit', 'sacrifice']},
  {word:'GALE',defs:['n\tA very strong wind'],syns:['storm', 'wind', 'blast'],ants:['calm', 'breeze', 'stillness']},
  {word:'GAME',defs:['n\tAn activity for entertainment with rules'],syns:['sport', 'play', 'contest'],ants:['work', 'serious', 'reality']},
  {word:'GAZE',defs:['v\tTo look steadily at something'],syns:['stare', 'look', 'peer'],ants:['glance', 'ignore', 'overlook']},
  {word:'GEAR',defs:['n\tA toothed wheel for transmitting motion']},
  {word:'GENE',defs:['n\tA unit of heredity in a living organism']},
  {word:'GIFT',defs:['n\tA thing given willingly without payment'],syns:['present', 'talent', 'donation'],ants:['curse', 'punishment', 'penalty']},
  {word:'GIVE',defs:['v\tTo freely transfer possession of something'],syns:['donate', 'offer', 'bestow'],ants:['take', 'receive', 'withhold']},
  {word:'GLAD',defs:['adj\tFeeling pleasure or happiness'],syns:['happy', 'pleased', 'joyful'],ants:['sad', 'unhappy', 'gloomy']},
  {word:'GLOW',defs:['v\tTo emit a steady light without flame'],syns:['shine', 'radiate', 'gleam'],ants:['darken', 'fade', 'dim']},
  {word:'GLUE',defs:['n\tAn adhesive substance for sticking things']},
  {word:'GOAL',defs:['n\tThe object of a person\'s ambition']},
  {word:'GOLD',defs:['n\tA yellow precious metal'],syns:['precious', 'wealth', 'yellow'],ants:['cheap', 'poor', 'base']},
  {word:'GOLF',defs:['n\tA game played by hitting a ball into holes']},
  {word:'GOOD',defs:['adj\tTo be desired or approved of'],syns:['great', 'fine', 'virtuous'],ants:['bad', 'evil', 'poor']},
  {word:'GRAB',defs:['v\tTo seize suddenly and roughly'],syns:['seize', 'snatch', 'grasp'],ants:['release', 'let go', 'drop']},
  {word:'GRID',defs:['n\tA network of lines crossing at right angles']},
  {word:'GRIM',defs:['adj\tVery serious or gloomy'],syns:['harsh', 'stern', 'bleak'],ants:['cheerful', 'bright', 'pleasant']},
  {word:'GRIP',defs:['v\tTo grasp or seize firmly'],syns:['grasp', 'hold', 'clutch'],ants:['release', 'loose', 'drop']},
  {word:'GROW',defs:['v\tTo increase in size or amount'],syns:['expand', 'develop', 'increase'],ants:['shrink', 'wither', 'decrease']},
  {word:'GULF',defs:['n\tA deep inlet of the sea'],syns:['bay', 'gap', 'divide'],ants:['union', 'bridge', 'connection']},
  {word:'GUST',defs:['n\tA sudden strong rush of wind'],syns:['blast', 'wind', 'burst'],ants:['calm', 'stillness', 'lull']},
  {word:'HALL',defs:['n\tA corridor or large room in a building']},
  {word:'HALT',defs:['v\tTo bring to an abrupt stop'],syns:['stop', 'pause', 'cease'],ants:['continue', 'proceed', 'advance']},
  {word:'HAND',defs:['n\tThe end part of an arm below the wrist'],syns:['palm', 'help', 'worker'],ants:['foot', 'hinder']},
  {word:'HANG',defs:['v\tTo suspend from above'],syns:['suspend', 'droop', 'linger'],ants:['drop', 'fall', 'remove']},
  {word:'HARD',defs:['adj\tSolid and firm; requiring effort'],syns:['tough', 'difficult', 'solid'],ants:['soft', 'easy', 'simple']},
  {word:'HARM',defs:['n\tPhysical or mental damage'],syns:['hurt', 'damage', 'injure'],ants:['help', 'heal', 'protect']},
  {word:'HARP',defs:['n\tA triangular stringed instrument']},
  {word:'HATE',defs:['v\tTo feel intense dislike for'],syns:['despise', 'loathe', 'detest'],ants:['love', 'adore', 'cherish']},
  {word:'HAVE',defs:['v\tTo possess or own']},
  {word:'HAWK',defs:['n\tA bird of prey with broad wings']},
  {word:'HEAD',defs:['n\tThe upper part of the body']},
  {word:'HEAL',defs:['v\tTo become healthy or whole again'],syns:['cure', 'mend', 'recover'],ants:['harm', 'wound', 'sicken']},
  {word:'HEAP',defs:['n\tAn untidy pile of things'],syns:['pile', 'mound', 'stack'],ants:['scatter', 'spread', 'level']},
  {word:'HEAT',defs:['n\tThe quality of being hot; high temperature'],syns:['warmth', 'temperature', 'passion'],ants:['cold', 'cool', 'freeze']},
  {word:'HEEL',defs:['n\tThe back part of the human foot']},
  {word:'HELP',defs:['v\tTo make it easier for someone to do something'],syns:['assist', 'aid', 'support'],ants:['hinder', 'harm', 'obstruct']},
  {word:'HERE',defs:['adv\tIn at or to this place']},
  {word:'HERO',defs:['n\tA person admired for courage or achievements']},
  {word:'HIGH',defs:['adj\tOf great vertical extent'],syns:['tall', 'elevated', 'lofty'],ants:['low', 'short', 'deep']},
  {word:'HILL',defs:['n\tA naturally raised area of land']},
  {word:'HINT',defs:['n\tA slight or indirect indication']},
  {word:'HIRE',defs:['v\tTo employ for wages'],syns:['employ', 'recruit', 'rent'],ants:['fire', 'dismiss', 'release']},
  {word:'HOLE',defs:['n\tA hollow space in a solid object'],syns:['gap', 'cavity', 'opening'],ants:['plug', 'solid', 'fill']},
  {word:'HOME',defs:['n\tThe place where one lives permanently'],syns:['house', 'residence', 'dwelling'],ants:['abroad', 'away', 'foreign']},
  {word:'HOOK',defs:['n\tA curved piece of metal for catching things'],syns:['snag', 'catch', 'crook'],ants:['release', 'straight', 'unhook']},
  {word:'HOPE',defs:['n\tA feeling that something good will happen'],syns:['wish', 'expect', 'aspire'],ants:['despair', 'dread', 'fear']},
  {word:'HORN',defs:['n\tA hard pointed growth on an animal\'s head']},
  {word:'HOST',defs:['n\tA person who receives guests']},
  {word:'HOUR',defs:['n\tA period of sixty minutes']},
  {word:'HOWL',defs:['v\tTo make a long loud wailing sound']},
  {word:'HUGE',defs:['adj\tExceptionally large'],syns:['enormous', 'vast', 'massive'],ants:['tiny', 'small', 'minute']},
  {word:'HUNT',defs:['v\tTo chase and kill wild animals for food'],syns:['chase', 'pursue', 'seek'],ants:['flee', 'hide', 'avoid']},
  {word:'HURL',defs:['v\tTo throw with great force']},
  {word:'ICON',defs:['n\tA symbol representing something']},
  {word:'IDEA',defs:['n\tA thought or suggestion for a possible action']},
  {word:'IDLE',defs:['adj\tNot working or active'],syns:['lazy', 'inactive', 'unused'],ants:['busy', 'active', 'working']},
  {word:'INCH',defs:['n\tA unit of length equal to one twelfth of a foot']},
  {word:'IRON',defs:['n\tA strong magnetic metallic element'],syns:['press', 'metal', 'firm'],ants:['flexible', 'soft', 'wrinkle']},
  {word:'ITEM',defs:['n\tAn individual article or unit']},
  {word:'JADE',defs:['n\tA hard green precious stone']},
  {word:'JEST',defs:['n\tA thing said or done for amusement']},
  {word:'JOIN',defs:['v\tTo link or become linked'],syns:['connect', 'unite', 'link'],ants:['separate', 'divide', 'split']},
  {word:'JOKE',defs:['n\tA thing said to cause amusement']},
  {word:'JOLT',defs:['v\tTo push or shake abruptly']},
  {word:'JUMP',defs:['v\tTo propel oneself upward off a surface'],syns:['leap', 'spring', 'bound'],ants:['fall', 'land', 'crawl']},
  {word:'JUST',defs:['adj\tBased on fairness and rightness'],syns:['fair', 'righteous', 'only'],ants:['unjust', 'unfair', 'biased']},
  {word:'KEEN',defs:['adj\tHaving a sharp edge; enthusiastic'],syns:['eager', 'sharp', 'enthusiastic'],ants:['dull', 'indifferent', 'blunt']},
  {word:'KIND',defs:['adj\tHaving a friendly and generous nature'],syns:['gentle', 'type', 'generous'],ants:['cruel', 'mean', 'unkind']},
  {word:'KING',defs:['n\tA male sovereign head of state']},
  {word:'KNEE',defs:['n\tThe joint between the thigh and the lower leg']},
  {word:'KNOT',defs:['n\tA fastening made by tying string']},
  {word:'LACK',defs:['v\tTo be without something needed'],syns:['need', 'shortage', 'absence'],ants:['have', 'abundance', 'excess']},
  {word:'LAKE',defs:['n\tA large body of water surrounded by land']},
  {word:'LAMB',defs:['n\tA young sheep']},
  {word:'LAMP',defs:['n\tA device for giving light']},
  {word:'LAND',defs:['n\tThe solid part of earth\'s surface'],syns:['earth', 'ground', 'nation'],ants:['sea', 'water', 'sky']},
  {word:'LANE',defs:['n\tA narrow road or division of a road']},
  {word:'LAST',defs:['adj\tComing after all others'],syns:['final', 'endure', 'persist'],ants:['first', 'begin', 'yield']},
  {word:'LATE',defs:['adj\tDoing something after the expected time'],syns:['overdue', 'delayed', 'recent'],ants:['early', 'prompt', 'punctual']},
  {word:'LAVA',defs:['n\tHot molten rock from a volcano']},
  {word:'LAWN',defs:['n\tAn area of closely mown grass']},
  {word:'LEAD',defs:['v\tTo be in charge; a heavy metallic element'],syns:['guide', 'direct', 'front'],ants:['follow', 'trail', 'rear']},
  {word:'LEAF',defs:['n\tA flattened structure of a plant']},
  {word:'LEAK',defs:['v\tTo accidentally pass liquid through a hole']},
  {word:'LEAN',defs:['v\tTo incline from the vertical'],syns:['thin', 'tilt', 'slim'],ants:['fat', 'straight', 'plump']},
  {word:'LEAP',defs:['v\tTo jump or spring a long distance'],syns:['jump', 'spring', 'bound'],ants:['fall', 'drop', 'crawl']},
  {word:'LEFT',defs:['adj\tOn or toward the west when facing north'],syns:['remaining', 'departed', 'sinister'],ants:['right', 'arrived', 'stayed']},
  {word:'LEND',defs:['v\tTo grant temporary use of something'],syns:['loan', 'give', 'provide'],ants:['borrow', 'withhold', 'keep']},
  {word:'LENS',defs:['n\tA piece of glass for concentrating light']},
  {word:'LIFE',defs:['n\tThe condition that distinguishes living organisms'],syns:['existence', 'vitality', 'being'],ants:['death', 'decay', 'end']},
  {word:'LIFT',defs:['v\tTo raise to a higher position'],syns:['raise', 'hoist', 'elevate'],ants:['lower', 'drop', 'sink']},
  {word:'LIKE',defs:['v\tTo find agreeable or pleasing'],syns:['enjoy', 'prefer', 'similar'],ants:['dislike', 'hate', 'different']},
  {word:'LIME',defs:['n\tA green citrus fruit; calcium oxide']},
  {word:'LINE',defs:['n\tA long thin mark or stroke']},
  {word:'LINK',defs:['n\tA connection between two things'],syns:['connect', 'bond', 'tie'],ants:['separate', 'divide', 'disconnect']},
  {word:'LION',defs:['n\tA large wild cat native to Africa']},
  {word:'LIST',defs:['n\tA number of items written one below another']},
  {word:'LIVE',defs:['v\tTo remain alive; to have one\'s home somewhere'],syns:['exist', 'dwell', 'active'],ants:['die', 'dead', 'inactive']},
  {word:'LOAD',defs:['n\tA heavy or bulky thing being carried']},
  {word:'LOAN',defs:['n\tA thing that is borrowed for temporary use']},
  {word:'LOCK',defs:['n\tA fastening device operated by a key'],syns:['secure', 'fasten', 'bolt'],ants:['unlock', 'open', 'free']},
  {word:'LONE',defs:['adj\tHaving no companions; solitary'],syns:['solitary', 'single', 'alone'],ants:['multiple', 'together', 'paired']},
  {word:'LONG',defs:['adj\tMeasuring a great distance from end to end'],syns:['extended', 'lengthy', 'crave'],ants:['short', 'brief', 'brief']},
  {word:'LOOK',defs:['v\tTo direct one\'s gaze in a direction'],syns:['see', 'glance', 'appearance'],ants:['ignore', 'overlook', 'blind']},
  {word:'LOOP',defs:['n\tA shape produced by a curve crossing itself']},
  {word:'LORE',defs:['n\tA body of traditions and knowledge'],syns:['knowledge', 'tradition', 'wisdom'],ants:['ignorance', 'myth']},
  {word:'LOSE',defs:['v\tTo be deprived of or cease to have'],syns:['misplace', 'fail', 'forfeit'],ants:['find', 'win', 'gain']},
  {word:'LOSS',defs:['n\tThe fact of no longer having something']},
  {word:'LOST',defs:['adj\tUnable to find one\'s way; missing']},
  {word:'LOUD',defs:['adj\tProducing much noise'],syns:['noisy', 'booming', 'shrill'],ants:['quiet', 'soft', 'silent']},
  {word:'LOVE',defs:['n\tAn intense feeling of deep affection'],syns:['adore', 'cherish', 'affection'],ants:['hate', 'despise', 'loathe']},
  {word:'LUCK',defs:['n\tSuccess brought by chance rather than actions'],syns:['fortune', 'chance', 'fate'],ants:['misfortune', 'skill', 'plan']},
  {word:'LURE',defs:['v\tTo tempt with something desirable'],syns:['attract', 'tempt', 'bait'],ants:['repel', 'deter', 'warn']},
  {word:'MADE',defs:['v\tPast tense of make; formed or constructed']},
  {word:'MAIL',defs:['n\tLetters and parcels sent by post']},
  {word:'MAIN',defs:['adj\tChief in size or importance']},
  {word:'MAKE',defs:['v\tTo form by putting parts together'],syns:['create', 'build', 'produce'],ants:['destroy', 'demolish', 'break']},
  {word:'MALE',defs:['adj\tOf the sex that produces sperm']},
  {word:'MANE',defs:['n\tLong hair around the neck of a lion or horse']},
  {word:'MANY',defs:['det\tA large number of']},
  {word:'MARK',defs:['n\tA small area on a surface with a different color'],syns:['sign', 'stamp', 'note'],ants:['erase', 'ignore', 'overlook']},
  {word:'MASK',defs:['n\tA covering worn over the face']},
  {word:'MASS',defs:['n\tA large quantity or body of matter'],syns:['bulk', 'quantity', 'crowd'],ants:['individual', 'tiny', 'sparse']},
  {word:'MAST',defs:['n\tA tall upright post on a ship']},
  {word:'MATE',defs:['n\tA partner or companion']},
  {word:'MAZE',defs:['n\tA confusing network of paths or passages']},
  {word:'MEAL',defs:['n\tAny of the occasions for eating food']},
  {word:'MEAN',defs:['adj\tUnkind; to intend to convey']},
  {word:'MEAT',defs:['n\tThe flesh of an animal as food']},
  {word:'MEET',defs:['v\tTo come into the presence of someone']},
  {word:'MELT',defs:['v\tTo become liquid when heated'],syns:['dissolve', 'thaw', 'soften'],ants:['freeze', 'harden', 'solidify']},
  {word:'MEMO',defs:['n\tA written message between colleagues']},
  {word:'MENU',defs:['n\tA list of dishes available in a restaurant']},
  {word:'MESH',defs:['n\tMaterial made of a network of wire or thread']},
  {word:'MILD',defs:['adj\tNot severe or extreme'],syns:['gentle', 'soft', 'calm'],ants:['harsh', 'severe', 'intense']},
  {word:'MILE',defs:['n\tA unit of length equal to 1760 yards']},
  {word:'MILK',defs:['n\tA white liquid produced by female mammals']},
  {word:'MILL',defs:['n\tA building fitted with machinery for grinding grain']},
  {word:'MIND',defs:['n\tThe element enabling thought and feeling'],syns:['brain', 'intellect', 'care'],ants:['body', 'ignore', 'neglect']},
  {word:'MINE',defs:['n\tAn excavation for extracting minerals']},
  {word:'MINT',defs:['n\tAn aromatic plant used as flavoring']},
  {word:'MISS',defs:['v\tTo fail to hit or reach something'],syns:['fail', 'skip', 'long for'],ants:['hit', 'find', 'catch']},
  {word:'MIST',defs:['n\tA cloud of tiny water droplets']},
  {word:'MODE',defs:['n\tA way or manner in which something occurs']},
  {word:'MOLE',defs:['n\tA small burrowing mammal; a dark skin spot']},
  {word:'MOOD',defs:['n\tA temporary state of mind or feeling']},
  {word:'MOON',defs:['n\tThe natural satellite of the earth']},
  {word:'MORE',defs:['det\tA greater or additional amount']},
  {word:'MOSS',defs:['n\tA small flowerless plant growing in damp habitats']},
  {word:'MOVE',defs:['v\tTo change position'],syns:['shift', 'transfer', 'motivate'],ants:['stay', 'halt', 'freeze']},
  {word:'MUCH',defs:['det\tA large amount of something'],syns:['plenty', 'abundant', 'greatly'],ants:['little', 'scarce', 'barely']},
  {word:'MULE',defs:['n\tThe offspring of a donkey and a horse']},
  {word:'MUST',defs:['modal\tUsed to express obligation or necessity']},
  {word:'MYTH',defs:['n\tA traditional story explaining a natural phenomenon'],syns:['legend', 'fable', 'tale'],ants:['fact', 'truth', 'reality']},
  {word:'NAIL',defs:['n\tA small metal spike driven in with a hammer']},
  {word:'NAME',defs:['n\tA word by which a person or thing is known']},
  {word:'NAVY',defs:['n\tThe branch of armed forces that serves at sea']},
  {word:'NEAR',defs:['adj\tAt a short distance away']},
  {word:'NEAT',defs:['adj\tArranged in an orderly tidy way']},
  {word:'NEED',defs:['v\tTo require something as essential'],syns:['require', 'lack', 'necessity'],ants:['have', 'surplus', 'excess']},
  {word:'NEST',defs:['n\tA structure built by birds to hold eggs']},
  {word:'NEWS',defs:['n\tNewly received information about events'],syns:['report', 'update', 'information'],ants:['silence', 'secret', 'old']},
  {word:'NEXT',defs:['adj\tComing immediately after in time or order'],syns:['following', 'subsequent', 'adjacent'],ants:['previous', 'past', 'former']},
  {word:'NICE',defs:['adj\tPleasant or agreeable'],syns:['pleasant', 'kind', 'agreeable'],ants:['nasty', 'mean', 'disagreeable']},
  {word:'NODE',defs:['n\tA point of intersection in a network']},
  {word:'NOOK',defs:['n\tA corner or recess offering seclusion']},
  {word:'NORM',defs:['n\tSomething usual typical or standard'],syns:['standard', 'average', 'rule'],ants:['exception', 'extreme', 'deviant']},
  {word:'NOSE',defs:['n\tThe facial organ for smelling and breathing']},
  {word:'NOTE',defs:['n\tA brief written record or message'],syns:['observe', 'record', 'memo'],ants:['ignore', 'overlook', 'forget']},
  {word:'NOUN',defs:['n\tA word referring to a person place or thing']},
  {word:'NULL',defs:['adj\tHaving no legal force; zero value']},
  {word:'OATH',defs:['n\tA solemn promise']},
  {word:'OBOE',defs:['n\tA woodwind instrument with a double reed']},
  {word:'ONCE',defs:['adv\tOne single time']},
  {word:'OPEN',defs:['adj\tAllowing access or passage; not closed'],syns:['unlock', 'begin', 'clear'],ants:['close', 'shut', 'block']},
  {word:'ORCA',defs:['n\tA large black-and-white toothed whale']},
  {word:'OVEN',defs:['n\tAn enclosed compartment for cooking food']},
  {word:'OVER',defs:['prep\tExtending above; finished']},
  {word:'PACE',defs:['n\tA single step taken when walking'],syns:['speed', 'rate', 'stride'],ants:['halt', 'crawl', 'stop']},
  {word:'PACK',defs:['v\tTo fill a bag or container tightly'],syns:['bundle', 'fill', 'group'],ants:['unpack', 'scatter', 'empty']},
  {word:'PAGE',defs:['n\tOne side of a leaf of a book']},
  {word:'PAIN',defs:['n\tPhysical suffering caused by illness or injury'],syns:['hurt', 'ache', 'suffer'],ants:['pleasure', 'comfort', 'ease']},
  {word:'PAIR',defs:['n\tA set of two things used together']},
  {word:'PALE',defs:['adj\tLight in color or shade'],syns:['faint', 'light', 'wan'],ants:['vivid', 'dark', 'flushed']},
  {word:'PALM',defs:['n\tThe inner surface of the hand'],syns:['hand', 'tree', 'conceal'],ants:[]},
  {word:'PARK',defs:['n\tA large public green area in a town'],syns:['garden', 'lot', 'place'],ants:[]},
  {word:'PART',defs:['n\tA piece or segment of something larger'],syns:['piece', 'section', 'separate'],ants:['whole', 'total', 'unite']},
  {word:'PASS',defs:['v\tTo move past something'],syns:['go by', 'succeed', 'permit'],ants:['fail', 'stop', 'block']},
  {word:'PAST',defs:['n\tTime that has gone by'],syns:['former', 'previous', 'history'],ants:['future', 'current', 'present']},
  {word:'PATH',defs:['n\tA way or track laid for walking'],syns:['route', 'trail', 'course'],ants:['obstacle', 'barrier', 'wall']},
  {word:'PEAK',defs:['n\tThe pointed top of a mountain'],syns:['summit', 'top', 'maximum'],ants:['valley', 'bottom', 'minimum']},
  {word:'PEEL',defs:['v\tTo remove the outer covering of a fruit'],syns:['strip', 'skin', 'remove'],ants:['cover', 'wrap', 'protect']},
  {word:'PEER',defs:['n\tA person of the same age or standing']},
  {word:'PERK',defs:['n\tA benefit attached to a job']},
  {word:'PICK',defs:['v\tTo select from a number of alternatives'],syns:['choose', 'select', 'pluck'],ants:['reject', 'avoid', 'discard']},
  {word:'PIER',defs:['n\tA structure extending into water for docking']},
  {word:'PILE',defs:['n\tA heap of things laid on top of each other'],syns:['heap', 'stack', 'accumulate'],ants:['scatter', 'spread', 'level']},
  {word:'PINE',defs:['n\tAn evergreen tree with needlelike leaves']},
  {word:'PINK',defs:['adj\tOf a pale red color']},
  {word:'PIPE',defs:['n\tA tube through which liquid or gas flows']},
  {word:'PLAN',defs:['n\tAn intention or decision about what to do'],syns:['scheme', 'design', 'intend'],ants:['improvise', 'neglect', 'ignore']},
  {word:'PLAY',defs:['v\tTo engage in activity for enjoyment'],syns:['sport', 'perform', 'amuse'],ants:['work', 'rest', 'serious']},
  {word:'PLOT',defs:['n\tA plan for a story; a small piece of land']},
  {word:'PLUG',defs:['n\tA device for making an electrical connection']},
  {word:'PLUM',defs:['n\tA fleshy oval fruit with a smooth skin']},
  {word:'POEM',defs:['n\tA piece of writing in verse form']},
  {word:'POET',defs:['n\tA person who writes poems']},
  {word:'POLE',defs:['n\tA long slender rounded piece of wood']},
  {word:'POND',defs:['n\tA small body of still water']},
  {word:'POOL',defs:['n\tA small area of liquid; a swimming pool']},
  {word:'POOR',defs:['adj\tLacking sufficient money to live comfortably'],syns:['needy', 'inferior', 'destitute'],ants:['rich', 'wealthy', 'excellent']},
  {word:'PORT',defs:['n\tA town or city with a harbor']},
  {word:'POSE',defs:['v\tTo present a problem or question']},
  {word:'POST',defs:['n\tA long upright piece of wood; the mail system']},
  {word:'POUR',defs:['v\tTo cause to flow in a stream'],syns:['flow', 'stream', 'rain'],ants:['trickle', 'absorb', 'stop']},
  {word:'PREY',defs:['n\tAn animal hunted or killed by another'],syns:['victim', 'target', 'hunt'],ants:['predator', 'hunter', 'protect']},
  {word:'PULL',defs:['v\tTo exert force on something to move it'],syns:['tug', 'draw', 'attract'],ants:['push', 'repel', 'shove']},
  {word:'PUMP',defs:['n\tA device for moving liquid or gas'],syns:['force', 'boost', 'inflate'],ants:['deflate', 'drain', 'reduce']},
  {word:'PURE',defs:['adj\tNot mixed with any other substance'],syns:['clean', 'clear', 'innocent'],ants:['dirty', 'corrupt', 'mixed']},
  {word:'PUSH',defs:['v\tTo exert force on something to move it away'],syns:['shove', 'thrust', 'press'],ants:['pull', 'attract', 'draw']},
  {word:'QUIT',defs:['v\tTo leave or stop doing something'],syns:['stop', 'leave', 'resign'],ants:['continue', 'persist', 'stay']},
  {word:'QUIZ',defs:['n\tA test of knowledge or information']},
  {word:'RACK',defs:['n\tA framework for holding or storing things']},
  {word:'RAGE',defs:['n\tViolent uncontrollable anger'],syns:['fury', 'anger', 'wrath'],ants:['calm', 'peace', 'serenity']},
  {word:'RAIN',defs:['n\tMoisture condensed from the atmosphere'],syns:['shower', 'drizzle', 'pour'],ants:['sunshine', 'drought', 'dry']},
  {word:'RAKE',defs:['n\tA gardening tool with a toothed bar'],syns:['gather', 'comb', 'scrape'],ants:['scatter', 'distribute']},
  {word:'RANK',defs:['n\tA position in a hierarchy'],syns:['position', 'grade', 'foul'],ants:['unranked', 'fresh', 'clean']},
  {word:'RARE',defs:['adj\tNot occurring very often'],syns:['scarce', 'uncommon', 'unique'],ants:['common', 'frequent', 'ordinary']},
  {word:'RATE',defs:['n\tA measure of speed or frequency']},
  {word:'READ',defs:['v\tTo look at and comprehend written text']},
  {word:'REAL',defs:['adj\tActually existing as a thing'],syns:['actual', 'genuine', 'true'],ants:['fake', 'false', 'imaginary']},
  {word:'REAP',defs:['v\tTo cut and gather a crop'],syns:['harvest', 'collect', 'gain'],ants:['sow', 'plant', 'lose']},
  {word:'REEF',defs:['n\tA ridge of rock or coral near the sea surface']},
  {word:'REEL',defs:['n\tA cylindrical device for winding thread or film']},
  {word:'RENT',defs:['n\tPayment for the use of property'],syns:['lease', 'hire', 'tear'],ants:['own', 'buy', 'mend']},
  {word:'REST',defs:['n\tA period of relaxation or sleep']},
  {word:'RICE',defs:['n\tA cereal grain widely consumed as food']},
  {word:'RICH',defs:['adj\tHaving a great deal of money or wealth'],syns:['wealthy', 'abundant', 'fertile'],ants:['poor', 'barren', 'scarce']},
  {word:'RIDE',defs:['v\tTo sit on and control a horse or bicycle'],syns:['travel', 'mount', 'journey'],ants:['walk', 'dismount']},
  {word:'RING',defs:['n\tA small circular band worn on a finger']},
  {word:'RIOT',defs:['n\tA violent disturbance of the peace']},
  {word:'RIPE',defs:['adj\tFully mature and ready to be eaten'],syns:['mature', 'ready', 'developed'],ants:['unripe', 'immature', 'raw']},
  {word:'RISE',defs:['v\tTo move upward; to increase'],syns:['ascend', 'grow', 'climb'],ants:['fall', 'decline', 'descend']},
  {word:'RISK',defs:['n\tA situation involving exposure to danger'],syns:['danger', 'hazard', 'chance'],ants:['safety', 'certainty', 'security']},
  {word:'ROAD',defs:['n\tA wide way for vehicles to travel on'],syns:['path', 'street', 'route'],ants:[]},
  {word:'ROAM',defs:['v\tTo travel unsystematically over an area'],syns:['wander', 'stray', 'drift'],ants:['stay', 'settle', 'remain']},
  {word:'ROAR',defs:['v\tTo make a full loud sound']},
  {word:'ROBE',defs:['n\tA long loose outer garment']},
  {word:'ROCK',defs:['n\tThe hard mineral material forming the earth'],syns:['stone', 'sway', 'music'],ants:['soil', 'steady', 'calm']},
  {word:'ROLE',defs:['n\tAn actor\'s part in a play or film'],syns:['part', 'function', 'character'],ants:[]},
  {word:'ROLL',defs:['v\tTo move by turning over and over'],syns:['rotate', 'spin', 'tumble'],ants:['halt', 'stop', 'unfurl']},
  {word:'ROOF',defs:['n\tThe structure forming the upper covering of a building']},
  {word:'ROOM',defs:['n\tA space that can be occupied']},
  {word:'ROOT',defs:['n\tThe part of a plant that attaches it to the ground']},
  {word:'ROPE',defs:['n\tThick cord made of twisted fibers']},
  {word:'ROSE',defs:['n\tA prickly bush with fragrant flowers']},
  {word:'RUBY',defs:['n\tA precious red gemstone']},
  {word:'RUDE',defs:['adj\tOffensively impolite or ill-mannered']},
  {word:'RUIN',defs:['n\tThe physical destruction of something'],syns:['destroy', 'demolish', 'wreck'],ants:['build', 'restore', 'save']},
  {word:'RULE',defs:['n\tA regulation governing conduct or procedure'],syns:['govern', 'law', 'dominate'],ants:['obey', 'follow', 'serve']},
  {word:'RUSH',defs:['v\tTo move with urgent haste'],syns:['hurry', 'dash', 'surge'],ants:['delay', 'dawdle', 'stroll']},
  {word:'RUST',defs:['n\tA reddish-brown flaky coating on iron'],syns:['corrode', 'decay', 'oxide'],ants:['preserve', 'protect', 'shine']},
  {word:'SAFE',defs:['adj\tProtected from danger or harm'],syns:['secure', 'protected', 'harmless'],ants:['dangerous', 'risky', 'harmful']},
  {word:'SAGE',defs:['n\tAn aromatic herb; a profoundly wise person']},
  {word:'SAIL',defs:['n\tA piece of fabric that catches wind to propel a vessel']},
  {word:'SALE',defs:['n\tThe exchange of something for money']},
  {word:'SALT',defs:['n\tA white crystalline substance used as seasoning']},
  {word:'SAND',defs:['n\tLoose granular material from eroded rock'],syns:['grit', 'gravel', 'smooth'],ants:['rough', 'mud', 'stone']},
  {word:'SANE',defs:['adj\tOf sound mind; reasonable']},
  {word:'SAVE',defs:['v\tTo keep safe from harm or danger'],syns:['rescue', 'preserve', 'keep'],ants:['waste', 'destroy', 'lose']},
  {word:'SCAN',defs:['v\tTo look at quickly but thoroughly']},
  {word:'SCAR',defs:['n\tA mark left on skin after a wound heals'],syns:['mark', 'blemish', 'wound'],ants:['heal', 'smooth', 'clear']},
  {word:'SEAL',defs:['n\tA device for closing something; a marine mammal'],syns:['close', 'stamp', 'secure'],ants:['open', 'unseal', 'break']},
  {word:'SEAT',defs:['n\tA thing made for sitting on']},
  {word:'SEED',defs:['n\tA plant\'s unit of reproduction']},
  {word:'SEEK',defs:['v\tTo attempt to find something'],syns:['search', 'look for', 'pursue'],ants:['find', 'hide', 'avoid']},
  {word:'SELF',defs:['n\tA person\'s essential being']},
  {word:'SELL',defs:['v\tTo give something in exchange for money'],syns:['trade', 'vend', 'market'],ants:['buy', 'purchase', 'keep']},
  {word:'SEND',defs:['v\tTo cause to go or be taken somewhere'],syns:['dispatch', 'transmit', 'deliver'],ants:['receive', 'keep', 'retain']},
  {word:'SHED',defs:['n\tA simple roofed structure for storage'],syns:['drop', 'lose', 'release'],ants:['keep', 'retain', 'absorb']},
  {word:'SHIP',defs:['n\tA large boat for transporting people or goods'],syns:['vessel', 'send', 'transport'],ants:['receive', 'land', 'keep']},
  {word:'SHOE',defs:['n\tA covering for the foot']},
  {word:'SHOP',defs:['n\tA building for retail sale of goods']},
  {word:'SHOT',defs:['n\tThe firing of a gun; an attempt']},
  {word:'SHOW',defs:['v\tTo make visible; a public entertainment'],syns:['display', 'reveal', 'demonstrate'],ants:['hide', 'conceal', 'suppress']},
  {word:'SHUT',defs:['v\tTo move into a closed position'],syns:['close', 'seal', 'bar'],ants:['open', 'reveal', 'unlock']},
  {word:'SICK',defs:['adj\tAffected by illness']},
  {word:'SIDE',defs:['n\tA position to the left or right']},
  {word:'SIGN',defs:['n\tAn object or notice conveying information'],syns:['signal', 'mark', 'symbol'],ants:['ignore', 'blank']},
  {word:'SILK',defs:['n\tA fine strong soft lustrous fiber']},
  {word:'SING',defs:['v\tTo make musical sounds with the voice']},
  {word:'SINK',defs:['v\tTo go down below the surface of water'],syns:['submerge', 'fall', 'drop'],ants:['float', 'rise', 'ascend']},
  {word:'SITE',defs:['n\tAn area of ground on which something is located']},
  {word:'SIZE',defs:['n\tThe relative extent of something'],syns:['dimension', 'magnitude', 'extent'],ants:[]},
  {word:'SKIN',defs:['n\tThe thin outer layer of the human body']},
  {word:'SKIP',defs:['v\tTo move along lightly'],syns:['jump', 'omit', 'hop'],ants:['include', 'trudge', 'add']},
  {word:'SLAM',defs:['v\tTo shut forcefully and loudly'],syns:['bang', 'crash', 'criticize'],ants:['open', 'praise', 'gentle']},
  {word:'SLIM',defs:['adj\tGracefully thin; having little width'],syns:['thin', 'slender', 'reduce'],ants:['fat', 'thick', 'increase']},
  {word:'SLIP',defs:['v\tTo slide unintentionally'],syns:['slide', 'fall', 'error'],ants:['grip', 'catch', 'correct']},
  {word:'SLOT',defs:['n\tA narrow opening for something to be inserted']},
  {word:'SLOW',defs:['adj\tMoving at a low speed'],syns:['sluggish', 'gradual', 'delayed'],ants:['fast', 'quick', 'rapid']},
  {word:'SNAP',defs:['v\tTo break with a sharp sound'],syns:['break', 'click', 'irritable'],ants:['bend', 'calm', 'gentle']},
  {word:'SNOW',defs:['n\tAtmospheric water vapor frozen into flakes']},
  {word:'SOAK',defs:['v\tTo make thoroughly wet']},
  {word:'SOAR',defs:['v\tTo fly high in the air'],syns:['rise', 'ascend', 'fly'],ants:['fall', 'plunge', 'sink']},
  {word:'SOFT',defs:['adj\tEasy to mold; gentle or low'],syns:['gentle', 'flexible', 'tender'],ants:['hard', 'rigid', 'rough']},
  {word:'SOIL',defs:['n\tThe upper layer of earth in which plants grow']},
  {word:'SOLE',defs:['adj\tOne and only; the underside of a foot or shoe'],syns:['only', 'unique', 'bottom'],ants:['multiple', 'shared', 'top']},
  {word:'SONG',defs:['n\tA short poem or verse set to music']},
  {word:'SORT',defs:['v\tTo arrange systematically in groups'],syns:['arrange', 'classify', 'type'],ants:['disorder', 'mix', 'scatter']},
  {word:'SOUL',defs:['n\tThe spiritual part of a human being']},
  {word:'SOUP',defs:['n\tA liquid dish made by cooking meat or vegetables']},
  {word:'SOUR',defs:['adj\tHaving an acid taste; resentful'],syns:['tart', 'bitter', 'unpleasant'],ants:['sweet', 'pleasant', 'fresh']},
  {word:'SPAN',defs:['n\tThe full extent of something from end to end'],syns:['range', 'extend', 'bridge'],ants:['narrow', 'shorten', 'limit']},
  {word:'SPIN',defs:['v\tTo turn around rapidly'],syns:['rotate', 'whirl', 'turn'],ants:['stop', 'halt', 'straighten']},
  {word:'SPOT',defs:['n\tA small round mark or stain']},
  {word:'STAR',defs:['n\tA fixed luminous point seen in the night sky'],syns:['celebrity', 'luminary', 'excel'],ants:['nobody', 'amateur', 'fail']},
  {word:'STAY',defs:['v\tTo remain in the same place'],syns:['remain', 'linger', 'halt'],ants:['leave', 'go', 'depart']},
  {word:'STEM',defs:['n\tThe main stalk of a plant'],syns:['stop', 'stalk', 'origin'],ants:['encourage', 'spread', 'end']},
  {word:'STEP',defs:['n\tA pace taken when walking'],syns:['pace', 'stage', 'move'],ants:['halt', 'stop', 'leap']},
  {word:'STEW',defs:['n\tA dish of meat and vegetables cooked slowly']},
  {word:'STIR',defs:['v\tTo move a liquid in circles'],syns:['mix', 'move', 'excite'],ants:['calm', 'settle', 'still']},
  {word:'STOP',defs:['v\tTo cease moving or operating'],syns:['halt', 'cease', 'end'],ants:['start', 'begin', 'continue']},
  {word:'SUCH',defs:['det\tOf the type about to be mentioned']},
  {word:'SUIT',defs:['n\tA set of outer clothes made of the same fabric'],syns:['outfit', 'match', 'fit'],ants:['clash', 'mismatch', 'disagree']},
  {word:'SWAN',defs:['n\tA large waterbird with a long neck']},
  {word:'SWAP',defs:['v\tTo exchange something for another thing'],syns:['exchange', 'trade', 'switch'],ants:['keep', 'hoard', 'retain']},
  {word:'SWAY',defs:['v\tTo move slowly from side to side']},
  {word:'SWIM',defs:['v\tTo move through water using the body']},
  {word:'TAIL',defs:['n\tThe hindmost part of an animal']},
  {word:'TALE',defs:['n\tA fictitious or true narrative or story']},
  {word:'TALL',defs:['adj\tOf great or above average height'],syns:['high', 'lofty', 'towering'],ants:['short', 'low', 'small']},
  {word:'TANK',defs:['n\tA large container for liquid; an armored vehicle']},
  {word:'TAPE',defs:['n\tA narrow strip of material with an adhesive side']},
  {word:'TASK',defs:['n\tA piece of work to be done'],syns:['job', 'duty', 'assignment'],ants:['leisure', 'play', 'rest']},
  {word:'TEAM',defs:['n\tA group of people working together']},
  {word:'TEAR',defs:['n\tA drop of liquid from the eye; to rend apart'],syns:['rip', 'cry', 'split'],ants:['mend', 'join', 'smile']},
  {word:'TELL',defs:['v\tTo communicate information to someone'],syns:['inform', 'narrate', 'reveal'],ants:['hide', 'conceal', 'silence']},
  {word:'TEND',defs:['v\tTo regularly care for or attend to'],syns:['care for', 'incline', 'nurse'],ants:['neglect', 'ignore', 'abandon']},
  {word:'TENT',defs:['n\tA portable shelter made of cloth']},
  {word:'TERM',defs:['n\tA word or phrase used in a particular context'],syns:['period', 'word', 'name'],ants:[]},
  {word:'TEST',defs:['n\tA procedure for critical evaluation'],syns:['exam', 'trial', 'evaluate'],ants:['ignore', 'accept', 'trust']},
  {word:'TEXT',defs:['n\tWritten or printed words']},
  {word:'THEN',defs:['adv\tAt that time; after that']},
  {word:'THIN',defs:['adj\tHaving opposite surfaces close together']},
  {word:'TIDY',defs:['adj\tArranged neatly and in order'],syns:['neat', 'orderly', 'clean'],ants:['messy', 'cluttered', 'dirty']},
  {word:'TILL',defs:['prep\tUp to the point in time mentioned']},
  {word:'TILT',defs:['v\tTo move into a sloping position']},
  {word:'TIME',defs:['n\tThe indefinite continued progress of existence']},
  {word:'TINY',defs:['adj\tVery small'],syns:['small', 'minute', 'petite'],ants:['huge', 'enormous', 'vast']},
  {word:'TIRE',defs:['v\tTo feel in need of rest'],syns:['exhaust', 'fatigue', 'weary'],ants:['energize', 'refresh', 'invigorate']},
  {word:'TOAD',defs:['n\tA tailless amphibian with a dry warty skin']},
  {word:'TOLL',defs:['n\tA charge for using a road or bridge'],syns:['cost', 'fee', 'ring'],ants:['free', 'silence']},
  {word:'TOME',defs:['n\tA large heavy scholarly book']},
  {word:'TONE',defs:['n\tA musical or vocal sound; a color shade']},
  {word:'TOOL',defs:['n\tA device used to carry out a function']},
  {word:'TORN',defs:['adj\tRipped apart or split'],syns:['ripped', 'split', 'divided'],ants:['mended', 'whole', 'united']},
  {word:'TOSS',defs:['v\tTo throw lightly or casually'],syns:['throw', 'flip', 'fling'],ants:['catch', 'hold', 'keep']},
  {word:'TOUR',defs:['n\tA journey for pleasure visiting places'],syns:['trip', 'journey', 'visit'],ants:['stay', 'remain', 'home']},
  {word:'TOWN',defs:['n\tA built-up area smaller than a city'],syns:['village', 'city', 'settlement'],ants:['countryside', 'rural', 'wilderness']},
  {word:'TRAP',defs:['n\tA device for catching animals'],syns:['snare', 'catch', 'trick'],ants:['free', 'release', 'escape']},
  {word:'TRAY',defs:['n\tA flat container for carrying small items']},
  {word:'TREE',defs:['n\tA woody perennial plant with a trunk']},
  {word:'TREK',defs:['n\tA long arduous journey']},
  {word:'TRIM',defs:['v\tTo make neat by cutting'],syns:['neat', 'cut', 'prune'],ants:['overgrown', 'messy', 'add']},
  {word:'TRIO',defs:['n\tA group of three people']},
  {word:'TRIP',defs:['n\tA journey or excursion']},
  {word:'TRUE',defs:['adj\tIn accordance with fact or reality'],syns:['accurate', 'genuine', 'loyal'],ants:['false', 'fake', 'disloyal']},
  {word:'TUNE',defs:['n\tA melody; to adjust for optimal performance']},
  {word:'TUSK',defs:['n\tA long pointed tooth of an elephant or walrus']},
  {word:'TWIN',defs:['n\tEach of a pair of children born at the same time']},
  {word:'TYPE',defs:['n\tA category of things with common characteristics']},
  {word:'UGLY',defs:['adj\tUnpleasant or repulsive in appearance'],syns:['hideous', 'unattractive', 'vile'],ants:['beautiful', 'lovely', 'attractive']},
  {word:'UNIT',defs:['n\tAn individual thing or group as a whole']},
  {word:'USER',defs:['n\tA person who uses a computer or service']},
  {word:'VAIN',defs:['adj\tProducing no result; excessively proud'],syns:['proud', 'futile', 'conceited'],ants:['humble', 'modest', 'successful']},
  {word:'VALE',defs:['n\tA valley']},
  {word:'VASE',defs:['n\tA decorative container used for holding flowers']},
  {word:'VAST',defs:['adj\tOf very great extent or quantity'],syns:['huge', 'immense', 'enormous'],ants:['tiny', 'small', 'limited']},
  {word:'VEIL',defs:['n\tA piece of fine cloth worn to protect the face']},
  {word:'VEIN',defs:['n\tAny of the tubes forming part of the blood circulation']},
  {word:'VERB',defs:['n\tA word expressing action or state']},
  {word:'VEST',defs:['n\tA sleeveless garment worn under a shirt']},
  {word:'VIEW',defs:['n\tThe ability to see something from a place'],syns:['see', 'perspective', 'scene'],ants:['ignore', 'overlook', 'hide']},
  {word:'VINE',defs:['n\tA climbing plant with a woody stem']},
  {word:'VOID',defs:['n\tA completely empty space'],syns:['empty', 'null', 'blank'],ants:['full', 'valid', 'occupied']},
  {word:'VOTE',defs:['n\tA formal indication of a choice']},
  {word:'WADE',defs:['v\tTo walk through water or mud'],syns:['trudge', 'walk through', 'labor'],ants:['float', 'glide', 'avoid']},
  {word:'WAGE',defs:['n\tA fixed regular payment for work']},
  {word:'WAKE',defs:['v\tTo emerge or cause to emerge from sleep'],syns:['rouse', 'arouse', 'trail'],ants:['sleep', 'calm', 'slumber']},
  {word:'WALK',defs:['v\tTo move at a regular pace by lifting the feet']},
  {word:'WALL',defs:['n\tA continuous vertical brick or stone structure']},
  {word:'WANT',defs:['v\tTo have a desire for something']},
  {word:'WARD',defs:['n\tA room in a hospital for a number of patients']},
  {word:'WARM',defs:['adj\tOf or at a moderately high temperature']},
  {word:'WAVE',defs:['n\tA long body of water curling into shore']},
  {word:'WEAK',defs:['adj\tLacking the power to perform physically'],syns:['feeble', 'frail', 'delicate'],ants:['strong', 'powerful', 'sturdy']},
  {word:'WEED',defs:['n\tA wild plant growing where it is not wanted'],syns:['unwanted plant', 'eliminate', 'thin'],ants:['cultivate', 'grow', 'keep']},
  {word:'WELL',defs:['adv\tIn a good way; a deep hole for water']},
  {word:'WEST',defs:['n\tThe direction of the sunset']},
  {word:'WIDE',defs:['adj\tOf great or more than average width'],syns:['broad', 'extensive', 'vast'],ants:['narrow', 'thin', 'limited']},
  {word:'WILD',defs:['adj\tLiving or growing in the natural environment'],syns:['untamed', 'fierce', 'unruly'],ants:['tame', 'calm', 'domestic']},
  {word:'WILL',defs:['modal\tExpressing a future action'],syns:['determination', 'desire', 'resolve'],ants:['reluctance', 'weakness', 'inability']},
  {word:'WIND',defs:['n\tMoving air; to turn or twist']},
  {word:'WINE',defs:['n\tAn alcoholic drink made from fermented grapes']},
  {word:'WING',defs:['n\tA limb or organ for flight']},
  {word:'WISE',defs:['adj\tHaving experience knowledge and good judgment'],syns:['smart', 'intelligent', 'sage'],ants:['foolish', 'naive', 'ignorant']},
  {word:'WISH',defs:['v\tTo desire something that is not achievable'],syns:['desire', 'hope', 'want'],ants:['dread', 'fear', 'reject']},
  {word:'WOLF',defs:['n\tA wild carnivorous mammal of the dog family']},
  {word:'WOOD',defs:['n\tThe hard fibrous material from trees']},
  {word:'WOOL',defs:['n\tThe fine soft hair forming a sheep\'s fleece']},
  {word:'WORD',defs:['n\tA single distinct unit of language']},
  {word:'WORM',defs:['n\tAn invertebrate with a long slender body']},
  {word:'WREN',defs:['n\tA small brown songbird']},
  {word:'YARD',defs:['n\tA unit of linear measure; an enclosed area'],syns:['garden', 'court', 'measure'],ants:[]},
  {word:'YARN',defs:['n\tSpun thread used for knitting; a long story']},
  {word:'YELL',defs:['v\tTo shout in a loud sharp way']},
  {word:'YOGA',defs:['n\tA Hindu discipline aiming to still the mind']},
  {word:'ZERO',defs:['n\tThe number 0; nothing']},
  {word:'ZINC',defs:['n\tA bluish-white metallic chemical element']},
  {word:'ZONE',defs:['n\tAn area or stretch of land with a particular feature']},
  {word:'ZOOM',defs:['v\tTo move quickly; to enlarge an image']},
  // 5-letter words
  {word:'ABOUT',defs:['prep\tOn the subject of']},
  {word:'ABOVE',defs:['prep\tAt a higher level or position than']},
  {word:'ACUTE',defs:['adj\tPresent or experienced to a severe degree']},
  {word:'ADMIT',defs:['v\tTo confess to be true']},
  {word:'ADULT',defs:['n\tA person who is fully grown']},
  {word:'AFTER',defs:['prep\tIn the time following']},
  {word:'AGAIN',defs:['adv\tAnother time; once more']},
  {word:'AGENT',defs:['n\tA person who acts on behalf of another']},
  {word:'AGREE',defs:['v\tTo have the same opinion about something']},
  {word:'AHEAD',defs:['adv\tFurther forward in space or time']},
  {word:'ALARM',defs:['n\tAn anxious awareness of danger']},
  {word:'ALBUM',defs:['n\tA collection of recordings issued as a single item']},
  {word:'ALERT',defs:['adj\tQuick to notice unusual or dangerous things']},
  {word:'ALIEN',defs:['n\tA foreigner; a being from another world']},
  {word:'ALIVE',defs:['adj\tLiving; not dead']},
  {word:'ALLEY',defs:['n\tA narrow passageway between buildings']},
  {word:'ALLOW',defs:['v\tTo permit something to happen']},
  {word:'ALONE',defs:['adj\tHaving no one else present']},
  {word:'ANGEL',defs:['n\tA spiritual being believed to act as messenger of God']},
  {word:'ANGER',defs:['n\tA strong feeling of annoyance or displeasure']},
  {word:'ANGLE',defs:['n\tThe space between two meeting lines or surfaces']},
  {word:'ANGRY',defs:['adj\tFeeling strong annoyance or displeasure']},
  {word:'ANVIL',defs:['n\tA heavy iron block for shaping metal on']},
  {word:'APPLE',defs:['n\tThe round fruit of a tree']},
  {word:'APPLY',defs:['v\tTo make a formal request for something']},
  {word:'ARENA',defs:['n\tA level area surrounded by seating']},
  {word:'ARGUE',defs:['v\tTo give reasons for or against something']},
  {word:'ARISE',defs:['v\tTo emerge; to get up']},
  {word:'ARMOR',defs:['n\tMetal coverings worn for protection in battle']},
  {word:'AROMA',defs:['n\tA pleasant and distinctive smell']},
  {word:'ARROW',defs:['n\tA shaft shot from a bow']},
  {word:'ASSET',defs:['n\tA useful or valuable thing or person']},
  {word:'ATLAS',defs:['n\tA book of maps or charts']},
  {word:'ATTIC',defs:['n\tA space or room inside the roof of a building']},
  {word:'AVOID',defs:['v\tTo keep away from something']},
  {word:'AWAKE',defs:['adj\tNot asleep']},
  {word:'AWARD',defs:['n\tA prize given for achievement']},
  {word:'AWARE',defs:['adj\tHaving knowledge or perception of something']},
  {word:'AWFUL',defs:['adj\tVery bad or unpleasant']},
  {word:'BADGE',defs:['n\tA small piece of metal or plastic with information']},
  {word:'BAKER',defs:['n\tA person who makes and sells bread']},
  {word:'BASIC',defs:['adj\tForming an essential foundation']},
  {word:'BASIN',defs:['n\tA bowl-shaped depression; a washbasin']},
  {word:'BATCH',defs:['n\tA quantity of goods produced at one time']},
  {word:'BEACH',defs:['n\tA pebbly or sandy shore']},
  {word:'BEARD',defs:['n\tHair growing on the chin and lower cheeks']},
  {word:'BEAST',defs:['n\tA large or frightening animal']},
  {word:'BEGIN',defs:['v\tTo start to do something']},
  {word:'BEING',defs:['n\tExistence; a living creature']},
  {word:'BENCH',defs:['n\tA long seat for several people']},
  {word:'BERRY',defs:['n\tA small roundish juicy fruit']},
  {word:'BLACK',defs:['adj\tOf the very darkest color']},
  {word:'BLADE',defs:['n\tThe flat cutting edge of a knife or sword']},
  {word:'BLAME',defs:['v\tTo assign responsibility for a fault']},
  {word:'BLAND',defs:['adj\tLacking strong features; uninteresting']},
  {word:'BLANK',defs:['adj\tNot written or printed on']},
  {word:'BLAZE',defs:['n\tA very large or fierce fire']},
  {word:'BLEAK',defs:['adj\tLooking cold and forbidding; not hopeful']},
  {word:'BLEED',defs:['v\tTo lose blood from the body']},
  {word:'BLIND',defs:['adj\tUnable to see']},
  {word:'BLOCK',defs:['n\tA large solid piece of a hard material']},
  {word:'BLOOD',defs:['n\tThe red liquid that circulates in the body']},
  {word:'BLOOM',defs:['n\tA flower or mass of flowers']},
  {word:'BOARD',defs:['n\tA long thin flat piece of wood']},
  {word:'BONUS',defs:['n\tAn extra payment given for good work']},
  {word:'BOOST',defs:['v\tTo help or encourage something to increase']},
  {word:'BOUND',defs:['adj\tRestricted; certain to happen']},
  {word:'BOXER',defs:['n\tA person who fights in the sport of boxing']},
  {word:'BRACE',defs:['n\tA device that holds parts together']},
  {word:'BRAKE',defs:['n\tA device for slowing a vehicle']},
  {word:'BRAND',defs:['n\tA type of product made by a company']},
  {word:'BRAVE',defs:['adj\tReady to face danger or pain'],syns:['bold', 'courageous', 'daring'],ants:['cowardly', 'timid', 'fearful']},
  {word:'BREAD',defs:['n\tFood made of baked dough']},
  {word:'BREAK',defs:['v\tTo separate into pieces; a pause in activity'],syns:['shatter', 'pause', 'fracture'],ants:['fix', 'mend', 'continue']},
  {word:'BREED',defs:['n\tA stock of animals within a species']},
  {word:'BRICK',defs:['n\tA small rectangular block of baked clay']},
  {word:'BRIDE',defs:['n\tA woman on her wedding day']},
  {word:'BRIEF',defs:['adj\tOf short duration; a summary'],syns:['short', 'concise', 'quick'],ants:['long', 'lengthy', 'extended']},
  {word:'BRING',defs:['v\tTo carry something to a place']},
  {word:'BRISK',defs:['adj\tActive and energetic'],syns:['lively', 'swift', 'energetic'],ants:['slow', 'sluggish', 'dull']},
  {word:'BROAD',defs:['adj\tLarge in extent from side to side'],syns:['wide', 'vast', 'extensive'],ants:['narrow', 'thin', 'limited']},
  {word:'BROOK',defs:['n\tA small stream']},
  {word:'BROOM',defs:['n\tA brush with a long handle for sweeping']},
  {word:'BROWN',defs:['adj\tOf a color between red and yellow']},
  {word:'BRUSH',defs:['n\tAn implement with bristles for cleaning']},
  {word:'BUILD',defs:['v\tTo construct by putting parts together'],syns:['construct', 'create', 'develop'],ants:['destroy', 'demolish', 'ruin']},
  {word:'BULGE',defs:['v\tTo swell outward']},
  {word:'BUNCH',defs:['n\tA number of things grouped together']},
  {word:'BURST',defs:['v\tTo break open suddenly']},
  {word:'BUYER',defs:['n\tA person who purchases something']},
  {word:'CABLE',defs:['n\tThick ropes or wires; electrical wire'],syns:['wire', 'rope', 'send'],ants:[]},
  {word:'CAMEL',defs:['n\tA large long-necked animal with humps']},
  {word:'CANDY',defs:['n\tA sweet food made with sugar']},
  {word:'CARGO',defs:['n\tGoods carried on a ship or aircraft']},
  {word:'CARRY',defs:['v\tTo hold and support while moving'],syns:['bear', 'transport', 'hold'],ants:['drop', 'leave', 'abandon']},
  {word:'CATCH',defs:['v\tTo intercept and hold something moving'],syns:['grab', 'snare', 'capture'],ants:['miss', 'release', 'throw']},
  {word:'CAUSE',defs:['n\tA person or thing that gives rise to something'],syns:['reason', 'produce', 'origin'],ants:['effect', 'result', 'consequence']},
  {word:'CEASE',defs:['v\tTo come to an end; to stop'],syns:['stop', 'halt', 'end'],ants:['begin', 'continue', 'start']},
  {word:'CHAIR',defs:['n\tA separate seat for one person']},
  {word:'CHAOS',defs:['n\tComplete disorder and confusion'],syns:['disorder', 'confusion', 'turmoil'],ants:['order', 'calm', 'harmony']},
  {word:'CHARM',defs:['n\tThe power to attract or delight people']},
  {word:'CHART',defs:['n\tA sheet of information in the form of a diagram']},
  {word:'CHASE',defs:['v\tTo pursue someone or something'],syns:['pursue', 'follow', 'hunt'],ants:['flee', 'avoid', 'escape']},
  {word:'CHEAP',defs:['adj\tLow in price; of poor quality'],syns:['inexpensive', 'low-cost', 'stingy'],ants:['expensive', 'costly', 'generous']},
  {word:'CHEAT',defs:['v\tTo act dishonestly to gain an advantage']},
  {word:'CHECK',defs:['v\tTo examine to verify accuracy']},
  {word:'CHESS',defs:['n\tA board game for two players']},
  {word:'CHEST',defs:['n\tThe front of the body between neck and abdomen']},
  {word:'CHIEF',defs:['n\tA leader or ruler; most important']},
  {word:'CHILD',defs:['n\tA young human being below puberty'],syns:['kid', 'youth', 'offspring'],ants:['adult', 'parent', 'elder']},
  {word:'CHILL',defs:['v\tTo make cold; a feeling of cold'],syns:['cool', 'freeze', 'relax'],ants:['warm', 'heat', 'excite']},
  {word:'CIVIC',defs:['adj\tRelating to a city or town']},
  {word:'CIVIL',defs:['adj\tRelating to ordinary citizens']},
  {word:'CLAIM',defs:['v\tTo state as a fact without proof'],syns:['assert', 'demand', 'right'],ants:['deny', 'disclaim', 'release']},
  {word:'CLASS',defs:['n\tA set or category with shared characteristics']},
  {word:'CLEAN',defs:['adj\tFree from dirt or impurities'],syns:['pure', 'spotless', 'tidy'],ants:['dirty', 'filthy', 'messy']},
  {word:'CLEAR',defs:['adj\tEasy to perceive or understand'],syns:['obvious', 'transparent', 'remove'],ants:['cloudy', 'obscure', 'block']},
  {word:'CLICK',defs:['v\tTo make a short sharp sound']},
  {word:'CLIFF',defs:['n\tA steep rock face at the edge of the sea']},
  {word:'CLIMB',defs:['v\tTo go up or ascend something']},
  {word:'CLOCK',defs:['n\tA device for measuring and indicating time']},
  {word:'CLONE',defs:['n\tAn organism genetically identical to another']},
  {word:'CLOSE',defs:['adj\tNear in space or time; to shut'],syns:['near', 'shut', 'end'],ants:['distant', 'open', 'begin']},
  {word:'CLOUD',defs:['n\tA visible mass of condensed water in the sky']},
  {word:'COACH',defs:['n\tA person who trains athletes']},
  {word:'COAST',defs:['n\tThe land beside the sea']},
  {word:'COBRA',defs:['n\tA large venomous snake']},
  {word:'COMIC',defs:['adj\tCausing or meant to cause laughter']},
  {word:'COMET',defs:['n\tAn icy body orbiting the sun with a tail']},
  {word:'CORAL',defs:['n\tA hard substance formed by sea creatures']},
  {word:'COUNT',defs:['v\tTo determine the total number of'],syns:['tally', 'number', 'matter'],ants:['ignore', 'discount', 'dismiss']},
  {word:'COURT',defs:['n\tA place where legal cases are heard']},
  {word:'COVER',defs:['v\tTo put something over another to protect it']},
  {word:'CRACK',defs:['n\tA line of breakage without separation']},
  {word:'CRAFT',defs:['n\tAn activity involving skill in making things']},
  {word:'CRANE',defs:['n\tA tall machine for moving heavy objects']},
  {word:'CRASH',defs:['v\tTo collide violently with something']},
  {word:'CRAVE',defs:['v\tTo feel a powerful desire for something']},
  {word:'CRAWL',defs:['v\tTo move on hands and knees']},
  {word:'CREEK',defs:['n\tA stream or minor tributary of a river']},
  {word:'CREST',defs:['n\tThe top of a mountain or wave']},
  {word:'CRISP',defs:['adj\tFirm and brittle']},
  {word:'CROSS',defs:['n\tA mark or structure in the form of a plus sign']},
  {word:'CROWD',defs:['n\tA large group of people gathered together']},
  {word:'CROWN',defs:['n\tA circular ornament worn on the head by royalty']},
  {word:'CRUEL',defs:['adj\tWilfully causing pain or suffering'],syns:['vicious', 'brutal', 'merciless'],ants:['kind', 'gentle', 'merciful']},
  {word:'CRUSH',defs:['v\tTo compress with force to break or damage']},
  {word:'CRUST',defs:['n\tThe tough outer part of bread']},
  {word:'CURVE',defs:['n\tA line that gradually deviates from straight']},
  {word:'CYCLE',defs:['n\tA series of events regularly repeated']},
  {word:'DAILY',defs:['adj\tDone or occurring every day'],syns:['regular', 'routine', 'each day'],ants:['rare', 'occasional', 'sporadic']},
  {word:'DANCE',defs:['v\tTo move rhythmically to music'],syns:['move', 'sway', 'perform'],ants:['freeze', 'stand', 'sit']},
  {word:'DECAY',defs:['v\tTo rot or decompose through natural processes'],syns:['rot', 'decompose', 'decline'],ants:['grow', 'flourish', 'preserve']},
  {word:'DECOY',defs:['n\tA person or thing used to lure others into danger']},
  {word:'DELAY',defs:['n\tA period of time by which something is late'],syns:['postpone', 'defer', 'wait'],ants:['hasten', 'advance', 'expedite']},
  {word:'DELTA',defs:['n\tA triangular tract of land at a river mouth']},
  {word:'DENSE',defs:['adj\tClosely compacted in substance'],syns:['thick', 'compact', 'crowded'],ants:['sparse', 'thin', 'spread']},
  {word:'DEPTH',defs:['n\tThe distance from the top or surface downward']},
  {word:'DIGIT',defs:['n\tAny of the numerals from 0 to 9']},
  {word:'DIRTY',defs:['adj\tCovered with dirt'],syns:['filthy', 'soiled', 'corrupt'],ants:['clean', 'pure', 'honest']},
  {word:'DODGE',defs:['v\tTo avoid by a sudden movement']},
  {word:'DOUBT',defs:['n\tA feeling of uncertainty'],syns:['question', 'uncertainty', 'distrust'],ants:['trust', 'certainty', 'faith']},
  {word:'DRAFT',defs:['n\tA preliminary version of a piece of writing']},
  {word:'DRAIN',defs:['n\tA channel for carrying off surplus liquid']},
  {word:'DRAMA',defs:['n\tA play for theatre or television']},
  {word:'DREAD',defs:['n\tGreat fear or apprehension'],syns:['fear', 'terror', 'apprehension'],ants:['courage', 'calm', 'anticipation']},
  {word:'DREAM',defs:['n\tA series of images experienced during sleep'],syns:['vision', 'aspire', 'fantasy'],ants:['nightmare', 'reality', 'despair']},
  {word:'DRESS',defs:['n\tA one-piece garment for a woman']},
  {word:'DRIFT',defs:['v\tTo be carried slowly by currents']},
  {word:'DRILL',defs:['n\tA rotating tool for boring holes']},
  {word:'DRIVE',defs:['v\tTo operate and control a vehicle']},
  {word:'DRONE',defs:['n\tA low continuous humming sound; an unmanned aircraft']},
  {word:'DROWN',defs:['v\tTo die by submersion in water']},
  {word:'DWARF',defs:['n\tA person of unusually small stature']},
  {word:'DWELL',defs:['v\tTo live in or at a place']},
  {word:'EAGER',defs:['adj\tWanting to do something keenly'],syns:['keen', 'enthusiastic', 'willing'],ants:['reluctant', 'indifferent', 'apathetic']},
  {word:'EAGLE',defs:['n\tA large bird of prey with keen eyesight']},
  {word:'EARLY',defs:['adv\tBefore the expected time'],syns:['prompt', 'initial', 'soon'],ants:['late', 'delayed', 'final']},
  {word:'EARTH',defs:['n\tThe planet on which we live'],syns:['ground', 'soil', 'world'],ants:['sky', 'heaven', 'space']},
  {word:'EIGHT',defs:['n\tThe number 8']},
  {word:'ELDER',defs:['adj\tOf greater age; a respected older person']},
  {word:'ELITE',defs:['n\tA select group that is superior in some way'],syns:['superior', 'best', 'select'],ants:['inferior', 'common', 'average']},
  {word:'EMBER',defs:['n\tA small piece of burning coal or wood']},
  {word:'EMPTY',defs:['adj\tContaining nothing; unoccupied'],syns:['vacant', 'hollow', 'bare'],ants:['full', 'packed', 'occupied']},
  {word:'ENEMY',defs:['n\tA person who is hostile to another'],syns:['foe', 'opponent', 'rival'],ants:['friend', 'ally', 'supporter']},
  {word:'ENTER',defs:['v\tTo come or go into a place']},
  {word:'EQUAL',defs:['adj\tBeing the same in quantity size or degree'],syns:['same', 'identical', 'fair'],ants:['unequal', 'different', 'biased']},
  {word:'ERROR',defs:['n\tA mistake'],syns:['mistake', 'fault', 'blunder'],ants:['accuracy', 'correctness', 'success']},
  {word:'ESSAY',defs:['n\tA short piece of writing on a subject']},
  {word:'EVADE',defs:['v\tTo escape or avoid by cleverness'],syns:['avoid', 'escape', 'dodge'],ants:['face', 'confront', 'meet']},
  {word:'EVENT',defs:['n\tA thing that happens or takes place']},
  {word:'EXACT',defs:['adj\tNot approximated in any way; precise'],syns:['precise', 'accurate', 'strict'],ants:['approximate', 'loose', 'vague']},
  {word:'EXTRA',defs:['adj\tAdded to an existing amount; more than usual'],syns:['additional', 'bonus', 'spare'],ants:['basic', 'fewer', 'essential']},
  {word:'FABLE',defs:['n\tA short story with a moral']},
  {word:'FAINT',defs:['adj\tHardly perceptible; to lose consciousness briefly'],syns:['weak', 'dim', 'collapse'],ants:['strong', 'vivid', 'revive']},
  {word:'FAITH',defs:['n\tComplete trust or confidence in something'],syns:['belief', 'trust', 'devotion'],ants:['doubt', 'disbelief', 'distrust']},
  {word:'FANCY',defs:['adj\tElaborate in decoration; to desire']},
  {word:'FATAL',defs:['adj\tCausing death'],syns:['deadly', 'lethal', 'mortal'],ants:['harmless', 'safe', 'beneficial']},
  {word:'FAULT',defs:['n\tA weakness in a person\'s character']},
  {word:'FEAST',defs:['n\tA large meal with many courses']},
  {word:'FENCE',defs:['n\tA barrier enclosing an area of ground']},
  {word:'FEVER',defs:['n\tAn abnormally high body temperature']},
  {word:'FIBER',defs:['n\tA thread or strand forming a structure']},
  {word:'FIELD',defs:['n\tAn open area of land']},
  {word:'FIFTY',defs:['n\tThe number 50']},
  {word:'FIGHT',defs:['v\tTo take part in a violent struggle']},
  {word:'FINAL',defs:['adj\tComing at the end; conclusive'],syns:['last', 'ultimate', 'conclusive'],ants:['first', 'initial', 'beginning']},
  {word:'FIRST',defs:['adj\tComing before all others in time or order'],syns:['initial', 'primary', 'earliest'],ants:['last', 'final', 'ultimate']},
  {word:'FIXED',defs:['adj\tFastened securely; not changing'],syns:['permanent', 'stable', 'repaired'],ants:['broken', 'changeable', 'movable']},
  {word:'FLAME',defs:['n\tA hot burning gas during combustion']},
  {word:'FLARE',defs:['v\tTo burn with a sudden intensity']},
  {word:'FLASK',defs:['n\tA narrow-necked container for liquids']},
  {word:'FLEET',defs:['n\tA group of ships sailing together']},
  {word:'FLESH',defs:['n\tThe soft substance forming the body of an animal']},
  {word:'FLOCK',defs:['n\tA number of birds or sheep together']},
  {word:'FLOOD',defs:['n\tAn overflow of a large amount of water']},
  {word:'FLOOR',defs:['n\tThe lower surface of a room']},
  {word:'FLORA',defs:['n\tThe plants of a particular region']},
  {word:'FLOUR',defs:['n\tA powder made by grinding grain']},
  {word:'FLUTE',defs:['n\tA wind instrument producing high-pitched sounds']},
  {word:'FORGE',defs:['v\tTo make a metal object by heating and hammering']},
  {word:'FORUM',defs:['n\tA meeting for open discussion']},
  {word:'FRAIL',defs:['adj\tWeak and delicate']},
  {word:'FRANK',defs:['adj\tOpen and honest in expression'],syns:['honest', 'direct', 'candid'],ants:['deceptive', 'dishonest', 'indirect']},
  {word:'FRAUD',defs:['n\tWrongful deception for personal gain']},
  {word:'FRESH',defs:['adj\tNot previously known; newly made'],syns:['new', 'crisp', 'clean'],ants:['stale', 'old', 'dirty']},
  {word:'FRONT',defs:['n\tThe side or part facing forward']},
  {word:'FROST',defs:['n\tA deposit of ice crystals on surfaces']},
  {word:'FROWN',defs:['v\tTo furrow the brow in displeasure']},
  {word:'FRUIT',defs:['n\tThe sweet product of a plant']},
  {word:'FUNNY',defs:['adj\tCausing laughter; strange']},
  {word:'GAUGE',defs:['n\tAn instrument for measuring']},
  {word:'GENRE',defs:['n\tA style or category of art or literature']},
  {word:'GHOST',defs:['n\tAn apparition of a dead person']},
  {word:'GIANT',defs:['n\tAn imaginary being of human form but superhuman size'],syns:['huge', 'enormous', 'colossus'],ants:['tiny', 'dwarf', 'miniature']},
  {word:'GIVEN',defs:['v\tPast participle of give']},
  {word:'GLAND',defs:['n\tAn organ that secretes substances']},
  {word:'GLARE',defs:['v\tTo stare angrily; dazzlingly bright light']},
  {word:'GLASS',defs:['n\tA hard transparent substance made from sand']},
  {word:'GLOOM',defs:['n\tPartial or total darkness; despondency']},
  {word:'GLORY',defs:['n\tHigh renown or honor won by great achievements']},
  {word:'GLOVE',defs:['n\tA covering for the hand with separate parts for fingers']},
  {word:'GOING',defs:['v\tPresent participle of go']},
  {word:'GRACE',defs:['n\tSimple elegance or refinement of movement']},
  {word:'GRADE',defs:['n\tA particular level of rank or quality']},
  {word:'GRAIN',defs:['n\tWheat or other cereal crops; a granule']},
  {word:'GRAND',defs:['adj\tMagnificent and impressive'],syns:['magnificent', 'great', 'impressive'],ants:['modest', 'humble', 'small']},
  {word:'GRANT',defs:['v\tTo give formally; a sum of money given'],syns:['give', 'award', 'permit'],ants:['deny', 'refuse', 'take']},
  {word:'GRAPE',defs:['n\tA berry growing in clusters on a vine']},
  {word:'GRASP',defs:['v\tTo seize and hold firmly']},
  {word:'GRASS',defs:['n\tVegetation consisting of short plants']},
  {word:'GRAVE',defs:['n\tA hole dug in the ground to bury a corpse'],syns:['serious', 'solemn', 'tomb'],ants:['trivial', 'cheerful', 'light']},
  {word:'GREAT',defs:['adj\tOf an extent considerably above average'],syns:['excellent', 'huge', 'remarkable'],ants:['poor', 'tiny', 'ordinary']},
  {word:'GREED',defs:['n\tIntense selfish desire for wealth or power'],syns:['avarice', 'desire', 'selfishness'],ants:['generosity', 'giving', 'contentment']},
  {word:'GREEN',defs:['adj\tOf the color between blue and yellow']},
  {word:'GRIEF',defs:['n\tIntense sorrow caused by loss'],syns:['sorrow', 'sadness', 'anguish'],ants:['joy', 'happiness', 'comfort']},
  {word:'GROAN',defs:['v\tTo make a deep sound expressing pain']},
  {word:'GROOM',defs:['v\tTo clean and maintain an animal\'s coat']},
  {word:'GROVE',defs:['n\tA small group of trees']},
  {word:'GROWL',defs:['v\tTo make a low rumbling sound in the throat']},
  {word:'GUARD',defs:['n\tA person who watches over a place or person'],syns:['protect', 'defend', 'watch'],ants:['expose', 'abandon', 'neglect']},
  {word:'GUESS',defs:['v\tTo estimate without sufficient information'],syns:['estimate', 'suppose', 'assume'],ants:['know', 'confirm', 'calculate']},
  {word:'GUEST',defs:['n\tA person invited to visit someone\'s home']},
  {word:'GUIDE',defs:['n\tA person who shows others the way'],syns:['lead', 'direct', 'instruct'],ants:['follow', 'mislead', 'confuse']},
  {word:'GUSTO',defs:['n\tEnjoyment or vigor in doing something']},
  {word:'HABIT',defs:['n\tA settled or regular practice']},
  {word:'HARSH',defs:['adj\tUnpleasantly rough or jarring to the senses'],syns:['severe', 'rough', 'strict'],ants:['gentle', 'mild', 'lenient']},
  {word:'HASTE',defs:['n\tExcessive speed or urgency of movement']},
  {word:'HAUNT',defs:['v\tTo appear as a ghost; to be persistently present']},
  {word:'HAVEN',defs:['n\tA place of safety or refuge']},
  {word:'HEART',defs:['n\tThe organ pumping blood in vertebrates']},
  {word:'HEAVY',defs:['adj\tOf great weight'],syns:['weighty', 'dense', 'serious'],ants:['light', 'airy', 'trivial']},
  {word:'HEDGE',defs:['n\tA fence formed by closely growing bushes']},
  {word:'HERBS',defs:['n\tPlants with savory or aromatic properties']},
  {word:'HERON',defs:['n\tA large fish-eating wading bird']},
  {word:'HIPPO',defs:['n\tA large semi-aquatic African mammal']},
  {word:'HOARD',defs:['n\tA secret stock or store']},
  {word:'HOBBY',defs:['n\tAn activity done regularly for pleasure']},
  {word:'HONEY',defs:['n\tA sweet fluid made by bees']},
  {word:'HONOR',defs:['n\tHigh respect or great esteem']},
  {word:'HORSE',defs:['n\tA large solid-hoofed mammal used for riding']},
  {word:'HOTEL',defs:['n\tAn establishment providing paid lodging']},
  {word:'HOUSE',defs:['n\tA building for human habitation']},
  {word:'HUMAN',defs:['n\tA person; relating to people']},
  {word:'HURRY',defs:['v\tTo move or act with haste']},
  {word:'IDEAL',defs:['n\tA standard of perfection; most suitable']},
  {word:'IMAGE',defs:['n\tA representation of a person or thing']},
  {word:'IMPLY',defs:['v\tTo indicate without stating directly']},
  {word:'INDEX',defs:['n\tAn alphabetical list indicating content']},
  {word:'INFER',defs:['v\tTo deduce from evidence and reasoning']},
  {word:'INPUT',defs:['n\tWhat is put into a system']},
  {word:'ISSUE',defs:['n\tAn important subject for debate']},
  {word:'IVORY',defs:['n\tA hard white material from elephant tusks']},
  {word:'JUDGE',defs:['n\tA person who decides legal cases']},
  {word:'JUICE',defs:['n\tThe liquid obtained from fruit or vegetables']},
  {word:'JUMBO',defs:['adj\tVery large']},
  {word:'KARMA',defs:['n\tThe sum of a person\'s actions affecting their future']},
  {word:'KAYAK',defs:['n\tA canoe of a type used by Inuit people']},
  {word:'KNIFE',defs:['n\tAn instrument with a blade for cutting']},
  {word:'KNOCK',defs:['v\tTo strike a surface to attract attention']},
  {word:'KNOWN',defs:['adj\tRecognized and familiar']},
  {word:'LABEL',defs:['n\tA small piece of paper attached to identify something']},
  {word:'LANCE',defs:['n\tA long weapon with a metal point on a pole']},
  {word:'LARGE',defs:['adj\tOf considerable size or extent']},
  {word:'LASER',defs:['n\tA device emitting a narrow intense beam of light']},
  {word:'LATER',defs:['adv\tAt a time in the future']},
  {word:'LAUGH',defs:['v\tTo make sounds expressing amusement']},
  {word:'LAYER',defs:['n\tA sheet of material covering a surface']},
  {word:'LEARN',defs:['v\tTo gain knowledge or skill']},
  {word:'LEASE',defs:['n\tA contract granting use of property']},
  {word:'LEAVE',defs:['v\tTo go away from a place']},
  {word:'LEDGE',defs:['n\tA narrow horizontal surface projecting from a wall']},
  {word:'LEGAL',defs:['adj\tOf or relating to the law']},
  {word:'LEMON',defs:['n\tA pale yellow oval citrus fruit']},
  {word:'LEVEL',defs:['n\tA position on a scale; a flat surface']},
  {word:'LIGHT',defs:['n\tElectromagnetic radiation visible to the eye']},
  {word:'LIMIT',defs:['n\tA point beyond which something cannot go']},
  {word:'LOCAL',defs:['adj\tRelating to a particular area or neighborhood']},
  {word:'LOGIC',defs:['n\tReasoning conducted according to strict principles']},
  {word:'LOOSE',defs:['adj\tNot firmly fixed in place']},
  {word:'LOVER',defs:['n\tA person having a relationship with another']},
  {word:'LOWER',defs:['v\tTo move something to a less high position']},
  {word:'LUCKY',defs:['adj\tHaving or bringing good luck']},
  {word:'LUNAR',defs:['adj\tRelating to the moon']},
  {word:'MAGIC',defs:['n\tThe power of apparently supernatural forces']},
  {word:'MAJOR',defs:['adj\tImportant or serious; greater in size']},
  {word:'MANOR',defs:['n\tA large country house with lands']},
  {word:'MAPLE',defs:['n\tA tree with five-pointed leaves']},
  {word:'MARCH',defs:['v\tTo walk with a regular measured tread']},
  {word:'MATCH',defs:['n\tA short stick that produces fire when struck']},
  {word:'MAYOR',defs:['n\tThe elected head of a city or town']},
  {word:'MEDIA',defs:['n\tThe main means of mass communication']},
  {word:'MERIT',defs:['n\tThe quality of being particularly good or worthy']},
  {word:'METAL',defs:['n\tA hard shiny material such as iron or gold']},
  {word:'METER',defs:['n\tA unit of length; a device that measures']},
  {word:'MIGHT',defs:['modal\tUsed to express possibility; great power']},
  {word:'MINOR',defs:['adj\tLesser in importance; below legal age']},
  {word:'MINUS',defs:['prep\tWith the subtraction of']},
  {word:'MIRTH',defs:['n\tAmusement expressed in laughter']},
  {word:'MODEL',defs:['n\tA three-dimensional representation of something']},
  {word:'MONEY',defs:['n\tA medium of exchange in the form of coins or notes']},
  {word:'MONTH',defs:['n\tEach of the twelve divisions of the year']},
  {word:'MORAL',defs:['adj\tConcerned with principles of right and wrong']},
  {word:'MOTOR',defs:['n\tA machine supplying motive power']},
  {word:'MOUSE',defs:['n\tA small rodent; a computer input device']},
  {word:'MOVIE',defs:['n\tA story recorded on film']},
  {word:'MUSIC',defs:['n\tVocal or instrumental sounds combined in harmony']},
  {word:'NAIVE',defs:['adj\tShowing a lack of experience or wisdom']},
  {word:'NERVE',defs:['n\tA fiber transmitting impulses in the body']},
  {word:'NEVER',defs:['adv\tAt no time in the past or future']},
  {word:'NIGHT',defs:['n\tThe time from sunset to sunrise']},
  {word:'NOBLE',defs:['adj\tBelonging to the aristocracy; having high moral qualities'],syns:['honorable', 'grand', 'aristocratic'],ants:['base', 'common', 'ignoble']},
  {word:'NOISE',defs:['n\tA loud or unpleasant sound']},
  {word:'NORTH',defs:['n\tThe direction opposite to south']},
  {word:'NOTCH',defs:['n\tAn indentation in a surface; a level']},
  {word:'NOVEL',defs:['n\tA fictitious prose book; new and different'],syns:['new', 'original', 'book'],ants:['old', 'familiar', 'traditional']},
  {word:'NURSE',defs:['n\tA person trained to care for the sick']},
  {word:'OCEAN',defs:['n\tThe vast body of salt water']},
  {word:'OFFER',defs:['v\tTo present something for acceptance']},
  {word:'OFTEN',defs:['adv\tFrequently; many times'],syns:['frequently', 'regularly', 'usually'],ants:['rarely', 'seldom', 'never']},
  {word:'OLIVE',defs:['n\tA small oval fruit used as food or for oil']},
  {word:'ONION',defs:['n\tA vegetable with a pungent smell and taste']},
  {word:'ORDER',defs:['n\tThe arrangement of things in sequence'],syns:['arrange', 'command', 'sequence'],ants:['chaos', 'disorder', 'disobey']},
  {word:'OUTER',defs:['adj\tOutside; external'],syns:['external', 'outside', 'peripheral'],ants:['inner', 'internal', 'central']},
  {word:'OXIDE',defs:['n\tA compound of oxygen with another element']},
  {word:'OZONE',defs:['n\tA form of oxygen in the upper atmosphere']},
  {word:'PAINT',defs:['n\tA colored substance applied to a surface']},
  {word:'PANIC',defs:['n\tSudden uncontrollable fear'],syns:['fear', 'terror', 'alarm'],ants:['calm', 'courage', 'composure']},
  {word:'PAPER',defs:['n\tMaterial manufactured in thin sheets for writing']},
  {word:'PARTY',defs:['n\tA social gathering for celebration']},
  {word:'PASTA',defs:['n\tItalian food made from wheat flour dough']},
  {word:'PATCH',defs:['n\tA piece of material used to mend a hole']},
  {word:'PAUSE',defs:['n\tA temporary stop in activity']},
  {word:'PEACE',defs:['n\tFreedom from disturbance; tranquility'],syns:['harmony', 'calm', 'tranquility'],ants:['war', 'conflict', 'chaos']},
  {word:'PEARL',defs:['n\tA hard lustrous spherical mass from an oyster']},
  {word:'PENNY',defs:['n\tA coin worth one hundredth of a dollar']},
  {word:'PHASE',defs:['n\tA distinct period or stage in a process']},
  {word:'PHONE',defs:['n\tA device used to communicate by voice']},
  {word:'PHOTO',defs:['n\tA picture taken with a camera']},
  {word:'PIANO',defs:['n\tA large keyboard musical instrument']},
  {word:'PIECE',defs:['n\tA portion separated from a whole']},
  {word:'PILOT',defs:['n\tA person who operates an aircraft']},
  {word:'PITCH',defs:['n\tThe quality of a sound; a sports field']},
  {word:'PIXEL',defs:['n\tThe smallest element of an image on a screen']},
  {word:'PIZZA',defs:['n\tA flat round bread topped with tomato and cheese']},
  {word:'PLACE',defs:['n\tA particular position or area']},
  {word:'PLAIN',defs:['adj\tNot decorated; easy to understand'],syns:['simple', 'clear', 'ordinary'],ants:['fancy', 'complex', 'decorated']},
  {word:'PLANE',defs:['n\tAn aircraft; a flat surface']},
  {word:'PLANT',defs:['n\tA living organism that grows in soil']},
  {word:'PLATE',defs:['n\tA flat dish for eating from']},
  {word:'PLEAD',defs:['v\tTo make an emotional appeal']},
  {word:'PLUME',defs:['n\tA long soft feather or bunch of feathers']},
  {word:'PLUSH',defs:['adj\tRichly luxurious and expensive']},
  {word:'POINT',defs:['n\tA dot or very small mark; an idea in discussion'],syns:['tip', 'indicate', 'purpose'],ants:['base', 'ignore', 'purposeless']},
  {word:'POLAR',defs:['adj\tRelating to the North or South Pole']},
  {word:'PORCH',defs:['n\tA covered shelter at the entrance of a building']},
  {word:'POUND',defs:['n\tA unit of weight; a unit of British currency']},
  {word:'POWER',defs:['n\tThe ability to do something; force or energy'],syns:['strength', 'force', 'authority'],ants:['weakness', 'helplessness', 'submission']},
  {word:'PRANK',defs:['n\tA practical joke or mischievous act']},
  {word:'PRESS',defs:['v\tTo apply force to; newspapers collectively'],syns:['push', 'squeeze', 'urge'],ants:['pull', 'release', 'relax']},
  {word:'PRICE',defs:['n\tThe amount expected in payment'],syns:['cost', 'charge', 'value'],ants:['free', 'worthless', 'discount']},
  {word:'PRIDE',defs:['n\tA feeling of deep pleasure from achievements'],syns:['honor', 'dignity', 'vanity'],ants:['shame', 'humility', 'modesty']},
  {word:'PRIME',defs:['adj\tOf first importance; divisible only by itself and one'],syns:['main', 'first', 'best'],ants:['secondary', 'worst', 'composite']},
  {word:'PRISM',defs:['n\tA solid object that disperses light into its spectrum']},
  {word:'PROBE',defs:['v\tTo explore or examine thoroughly'],syns:['examine', 'investigate', 'explore'],ants:['ignore', 'overlook', 'accept']},
  {word:'PRONE',defs:['adj\tLying face downward; likely to do something'],syns:['likely', 'inclined', 'lying down'],ants:['unlikely', 'resistant', 'upright']},
  {word:'PROOF',defs:['n\tEvidence establishing a fact as true'],syns:['evidence', 'verification', 'confirm'],ants:['disproof', 'doubt', 'question']},
  {word:'PROSE',defs:['n\tWritten language in its ordinary form']},
  {word:'PROUD',defs:['adj\tFeeling pleasure from one\'s achievements'],syns:['confident', 'satisfied', 'dignified'],ants:['ashamed', 'humble', 'modest']},
  {word:'PROVE',defs:['v\tTo demonstrate the truth of something']},
  {word:'PULSE',defs:['n\tA rhythmical throbbing sensation in arteries']},
  {word:'PUPIL',defs:['n\tA student; the dark circle in the eye']},
  {word:'QUEST',defs:['n\tA long search for something']},
  {word:'QUICK',defs:['adj\tMoving fast; happening with little time'],syns:['fast', 'rapid', 'swift'],ants:['slow', 'sluggish', 'gradual']},
  {word:'QUIET',defs:['adj\tMaking little or no noise'],syns:['silent', 'calm', 'hushed'],ants:['loud', 'noisy', 'chaotic']},
  {word:'QUIRK',defs:['n\tA peculiarity of behavior or character']},
  {word:'QUOTA',defs:['n\tA limited quantity of something allocated']},
  {word:'QUOTE',defs:['v\tTo repeat words from a text']},
  {word:'RADAR',defs:['n\tA system for detecting objects using radio waves']},
  {word:'RADIO',defs:['n\tThe transmission of programs by electromagnetic waves']},
  {word:'RAINY',defs:['adj\tHaving a great deal of rainfall']},
  {word:'RALLY',defs:['n\tA mass meeting of people with shared views']},
  {word:'RANCH',defs:['n\tA large farm for raising cattle or other animals']},
  {word:'RANGE',defs:['n\tThe area between limits; a large open area']},
  {word:'RAPID',defs:['adj\tHappening in a short time; fast'],syns:['quick', 'fast', 'speedy'],ants:['slow', 'gradual', 'delayed']},
  {word:'RATIO',defs:['n\tThe quantitative relation between two amounts']},
  {word:'REACH',defs:['v\tTo stretch out a hand to get something']},
  {word:'REACT',defs:['v\tTo respond to something in a particular way']},
  {word:'REALM',defs:['n\tA kingdom; a field of activity or interest']},
  {word:'REBEL',defs:['n\tA person who resists authority']},
  {word:'REIGN',defs:['n\tThe period of a monarch\'s rule']},
  {word:'RIDER',defs:['n\tA person who rides a horse or bicycle']},
  {word:'RIDGE',defs:['n\tA long narrow hilltop or range of hills']},
  {word:'RIFLE',defs:['n\tA gun with a long barrel for accurate aiming']},
  {word:'RIGHT',defs:['adj\tMorally good; on the side opposite left']},
  {word:'RIGID',defs:['adj\tUnable to bend; strict'],syns:['stiff', 'inflexible', 'strict'],ants:['flexible', 'soft', 'lenient']},
  {word:'RISKY',defs:['adj\tInvolving the possibility of danger'],syns:['dangerous', 'hazardous', 'uncertain'],ants:['safe', 'secure', 'certain']},
  {word:'RIVAL',defs:['n\tA person competing with another']},
  {word:'RIVER',defs:['n\tA large natural stream of water']},
  {word:'ROBIN',defs:['n\tA small bird with a red breast']},
  {word:'ROBOT',defs:['n\tA machine capable of performing complex actions']},
  {word:'ROCKY',defs:['adj\tConsisting of rock; full of obstacles']},
  {word:'ROUGE',defs:['n\tRed powder or cream used as a cosmetic']},
  {word:'ROUGH',defs:['adj\tHaving an uneven or irregular surface'],syns:['coarse', 'uneven', 'harsh'],ants:['smooth', 'gentle', 'even']},
  {word:'ROUND',defs:['adj\tShaped like a circle; a sequence of events'],syns:['circular', 'curved', 'complete'],ants:['square', 'angular', 'partial']},
  {word:'ROUTE',defs:['n\tA way taken to reach a destination']},
  {word:'ROYAL',defs:['adj\tRelating to a king or queen'],syns:['regal', 'noble', 'majestic'],ants:['common', 'peasant', 'ordinary']},
  {word:'RURAL',defs:['adj\tRelating to the country']},
  {word:'SAINT',defs:['n\tA person acknowledged as holy by the church']},
  {word:'SALAD',defs:['n\tA dish of raw vegetables']},
  {word:'SANDY',defs:['adj\tCovered with sand; of a yellowish color']},
  {word:'SAUCE',defs:['n\tA liquid condiment served with food']},
  {word:'SCALE',defs:['n\tA weighing device; the relative size of a map']},
  {word:'SCENE',defs:['n\tThe place where something occurs']},
  {word:'SCENT',defs:['n\tA distinctive smell']},
  {word:'SCOPE',defs:['n\tThe opportunity to do something; extent of activity']},
  {word:'SCORE',defs:['n\tThe number of points achieved in a game']},
  {word:'SCOUT',defs:['n\tA person sent ahead to gather information']},
  {word:'SCREW',defs:['n\tA metal fastener with a spiral thread']},
  {word:'SEIZE',defs:['v\tTo take hold of suddenly and forcibly']},
  {word:'SENSE',defs:['n\tA faculty by which the body perceives stimuli']},
  {word:'SERVE',defs:['v\tTo perform duties or services for someone']},
  {word:'SEVEN',defs:['n\tThe number 7']},
  {word:'SHADE',defs:['n\tComparative darkness; a screen for blocking light']},
  {word:'SHAFT',defs:['n\tA long narrow part of an arrow or other object']},
  {word:'SHAKE',defs:['v\tTo move with rapid irregular motions']},
  {word:'SHAME',defs:['n\tA painful feeling of humiliation or distress']},
  {word:'SHAPE',defs:['n\tThe external form or outline of something']},
  {word:'SHARE',defs:['v\tTo have a portion of something with another']},
  {word:'SHARK',defs:['n\tA large predatory fish']},
  {word:'SHARP',defs:['adj\tHaving an edge that can cut; quick-witted'],syns:['keen', 'pointed', 'smart'],ants:['dull', 'blunt', 'stupid']},
  {word:'SHELF',defs:['n\tA flat board fixed to a wall for placing objects']},
  {word:'SHELL',defs:['n\tThe hard outer covering of something']},
  {word:'SHIFT',defs:['v\tTo move from one place to another']},
  {word:'SHINE',defs:['v\tTo give out a bright light']},
  {word:'SHOCK',defs:['n\tA sudden upsetting or surprising event']},
  {word:'SHORE',defs:['n\tThe land along the edge of a sea or lake']},
  {word:'SHORT',defs:['adj\tMeasuring a small amount from end to end'],syns:['brief', 'small', 'lacking'],ants:['tall', 'long', 'abundant']},
  {word:'SHOUT',defs:['v\tTo speak in a loud voice']},
  {word:'SIGHT',defs:['n\tThe faculty or power of seeing'],syns:['vision', 'view', 'spectacle'],ants:['blindness', 'ignore', 'invisible']},
  {word:'SILLY',defs:['adj\tLacking common sense; absurd'],syns:['foolish', 'absurd', 'childish'],ants:['sensible', 'serious', 'mature']},
  {word:'SINCE',defs:['prep\tIn the period between a past time and now'],syns:['because', 'from', 'after'],ants:['until', 'before']},
  {word:'SIXTH',defs:['adj\tConstituting number six in a sequence']},
  {word:'SKILL',defs:['n\tThe ability to do something well'],syns:['ability', 'talent', 'expertise'],ants:['incompetence', 'inability', 'clumsiness']},
  {word:'SKULL',defs:['n\tThe bony structure forming the head']},
  {word:'SLANT',defs:['n\tA sloping direction; a point of view']},
  {word:'SLAVE',defs:['n\tA person owned by and forced to work for another']},
  {word:'SLEEP',defs:['n\tA resting state with reduced consciousness'],syns:['slumber', 'rest', 'doze'],ants:['wake', 'arise', 'alert']},
  {word:'SLIDE',defs:['v\tTo move smoothly along a surface']},
  {word:'SLOPE',defs:['n\tA surface with one end higher than the other']},
  {word:'SMART',defs:['adj\tHaving quick intelligence; neat'],syns:['intelligent', 'clever', 'sharp'],ants:['stupid', 'dull', 'foolish']},
  {word:'SMELL',defs:['n\tThe faculty of perceiving odors; an odor'],syns:['scent', 'odor', 'aroma'],ants:[]},
  {word:'SMILE',defs:['v\tTo form an expression of pleasure by curving lips'],syns:['grin', 'beam', 'expression'],ants:['frown', 'scowl', 'cry']},
  {word:'SMOKE',defs:['n\tVisible suspension of carbon particles in air']},
  {word:'SNAIL',defs:['n\tA mollusk with a spiral shell']},
  {word:'SNAKE',defs:['n\tA legless reptile with a long body']},
  {word:'SNEAK',defs:['v\tTo move or act in a stealthy manner']},
  {word:'SOLAR',defs:['adj\tRelating to the sun']},
  {word:'SOLID',defs:['adj\tFirm and stable; not liquid or gas'],syns:['firm', 'dense', 'reliable'],ants:['liquid', 'hollow', 'fragile']},
  {word:'SOLVE',defs:['v\tTo find a solution to a problem'],syns:['resolve', 'answer', 'fix'],ants:['complicate', 'create', 'break']},
  {word:'SOUTH',defs:['n\tThe direction toward the south pole']},
  {word:'SPACE',defs:['n\tA continuous area or expanse; outer space'],syns:['room', 'area', 'vacuum'],ants:['clutter', 'full', 'solid']},
  {word:'SPARE',defs:['adj\tAdditional; not currently being used']},
  {word:'SPARK',defs:['n\tA small fiery particle thrown from a fire']},
  {word:'SPEAK',defs:['v\tTo say something; to talk']},
  {word:'SPEED',defs:['n\tThe rate at which someone or something moves'],syns:['velocity', 'pace', 'rush'],ants:['slowness', 'halt', 'crawl']},
  {word:'SPELL',defs:['v\tTo write words correctly; a magic formula']},
  {word:'SPEND',defs:['v\tTo pay money for goods or services'],syns:['use', 'pay', 'consume'],ants:['save', 'earn', 'accumulate']},
  {word:'SPICE',defs:['n\tA flavoring substance from plants']},
  {word:'SPIKE',defs:['n\tA thin pointed piece of metal or wood']},
  {word:'SPINE',defs:['n\tThe backbone; a pointed growth on an animal']},
  {word:'SPIRE',defs:['n\tA pointed structure at the top of a church']},
  {word:'SPOON',defs:['n\tAn implement with a bowl for eating or serving']},
  {word:'SPORT',defs:['n\tAn activity involving physical exertion and skill']},
  {word:'SPRAY',defs:['n\tWater flying in drops through the air']},
  {word:'STACK',defs:['n\tA pile of objects arranged one on top of another']},
  {word:'STAGE',defs:['n\tA platform in a theater; a point in development']},
  {word:'STAIN',defs:['n\tA colored patch from a foreign substance']},
  {word:'STAKE',defs:['n\tA pointed wooden post; something risked']},
  {word:'STALE',defs:['adj\tNo longer fresh; no longer new or interesting'],syns:['old', 'musty', 'expired'],ants:['fresh', 'new', 'crisp']},
  {word:'STALK',defs:['n\tThe stem of a plant; to pursue or approach']},
  {word:'STAMP',defs:['n\tA small adhesive label for affixing to mail']},
  {word:'STAND',defs:['v\tTo be in a vertical upright position'],syns:['upright', 'tolerate', 'position'],ants:['sit', 'fall', 'yield']},
  {word:'STARK',defs:['adj\tSevere or bare in appearance; complete']},
  {word:'START',defs:['v\tTo begin or set out']},
  {word:'STATE',defs:['n\tThe condition of something; a nation']},
  {word:'STEAM',defs:['n\tWater in the form of gas']},
  {word:'STEEL',defs:['n\tA hard strong alloy of iron and carbon']},
  {word:'STEEP',defs:['adj\tRising or falling sharply'],syns:['sharp', 'extreme', 'soak'],ants:['gentle', 'moderate', 'drain']},
  {word:'STIFF',defs:['adj\tNot easily bent; not relaxed'],syns:['rigid', 'formal', 'tense'],ants:['flexible', 'relaxed', 'soft']},
  {word:'STILL',defs:['adj\tNot moving; quiet; even now'],syns:['quiet', 'motionless', 'yet'],ants:['moving', 'noisy', 'already']},
  {word:'STOCK',defs:['n\tA supply of goods kept on hand']},
  {word:'STONE',defs:['n\tA small piece of rock']},
  {word:'STORE',defs:['n\tA place where things are sold; a stock of goods']},
  {word:'STORM',defs:['n\tA violent disturbance of atmosphere']},
  {word:'STORY',defs:['n\tAn account of imaginary or real events']},
  {word:'STRAW',defs:['n\tDried stalks of grain; a drinking tube']},
  {word:'STRIP',defs:['n\tA long narrow piece of material']},
  {word:'STUDY',defs:['v\tTo devote time to learning about a subject'],syns:['learn', 'examine', 'research'],ants:['ignore', 'overlook', 'neglect']},
  {word:'STYLE',defs:['n\tA manner of doing something; distinctive elegance'],syns:['fashion', 'manner', 'design'],ants:[]},
  {word:'SUGAR',defs:['n\tA sweet crystalline substance from plant juice']},
  {word:'SUITE',defs:['n\tA set of rooms; a piece of music']},
  {word:'SUNNY',defs:['adj\tBright with sunlight']},
  {word:'SUPER',defs:['adj\tEspecially good; of high quality']},
  {word:'SURGE',defs:['v\tTo move suddenly and powerfully forward']},
  {word:'SWEAR',defs:['v\tTo use profane language; to make a solemn statement'],syns:['vow', 'curse', 'promise'],ants:['retract', 'forgive', 'whisper']},
  {word:'SWEEP',defs:['v\tTo clean using a broom']},
  {word:'SWEET',defs:['adj\tHaving the taste of sugar; pleasant'],syns:['sugary', 'pleasant', 'kind'],ants:['sour', 'bitter', 'cruel']},
  {word:'SWIFT',defs:['adj\tHappening quickly or promptly'],syns:['fast', 'rapid', 'quick'],ants:['slow', 'sluggish', 'gradual']},
  {word:'SWIRL',defs:['v\tTo move in a twisting or spiraling pattern']},
  {word:'SWORD',defs:['n\tA weapon with a long metal blade']},
  {word:'TABOO',defs:['adj\tProhibited or restricted by social custom']},
  {word:'TALON',defs:['n\tA claw of a bird of prey']},
  {word:'TASTE',defs:['n\tThe sensation when something is in the mouth']},
  {word:'TEACH',defs:['v\tTo impart knowledge to someone']},
  {word:'TEMPO',defs:['n\tThe speed of music; the rate of activity']},
  {word:'TENSE',defs:['adj\tStretched tight; unable to relax'],syns:['stressed', 'rigid', 'anxious'],ants:['relaxed', 'calm', 'flexible']},
  {word:'THANK',defs:['v\tTo express gratitude to someone']},
  {word:'THEME',defs:['n\tThe subject of a talk or work of art']},
  {word:'THICK',defs:['adj\tWith opposite sides not close together'],syns:['dense', 'wide', 'heavy'],ants:['thin', 'sparse', 'light']},
  {word:'THINK',defs:['v\tTo have a particular belief or opinion']},
  {word:'THIRD',defs:['adj\tConstituting number three in a sequence']},
  {word:'THORN',defs:['n\tA stiff sharp-pointed projection on a plant']},
  {word:'THREE',defs:['n\tThe number 3']},
  {word:'THROW',defs:['v\tTo propel through the air with a movement']},
  {word:'TIGER',defs:['n\tA large carnivorous feline with striped fur']},
  {word:'TIGHT',defs:['adj\tFixed or fastened firmly; close-fitting']},
  {word:'TIRED',defs:['adj\tIn need of sleep or rest']},
  {word:'TITLE',defs:['n\tThe name of a book film or other work']},
  {word:'TOKEN',defs:['n\tA thing representing something else; a symbol']},
  {word:'TONIC',defs:['n\tA medicinal substance to invigorate the body']},
  {word:'TOOTH',defs:['n\tA hard structure in the mouth for biting']},
  {word:'TOPIC',defs:['n\tA matter dealt with in a discussion']},
  {word:'TOTAL',defs:['n\tThe whole number or amount; complete']},
  {word:'TOUCH',defs:['v\tTo come into contact with']},
  {word:'TOUGH',defs:['adj\tStrong enough to withstand strain'],syns:['hard', 'strong', 'resilient'],ants:['weak', 'soft', 'fragile']},
  {word:'TOWEL',defs:['n\tA cloth for drying oneself after washing']},
  {word:'TOWER',defs:['n\tA tall narrow building']},
  {word:'TOXIC',defs:['adj\tPoisonous']},
  {word:'TRACE',defs:['v\tTo follow the course or position of']},
  {word:'TRACK',defs:['n\tA rough path; a course for racing'],syns:['follow', 'trace', 'path'],ants:['lose', 'ignore', 'erase']},
  {word:'TRADE',defs:['n\tThe action of buying and selling goods']},
  {word:'TRAIL',defs:['n\tA path through the countryside']},
  {word:'TRAIN',defs:['n\tA connected series of railway carriages']},
  {word:'TRAIT',defs:['n\tA distinguishing quality of character']},
  {word:'TRASH',defs:['n\tWaste material; rubbish']},
  {word:'TRIAL',defs:['n\tA test of quality or performance']},
  {word:'TRIBE',defs:['n\tA social division in a traditional society']},
  {word:'TRICK',defs:['n\tA cunning act intended to deceive']},
  {word:'TRUCK',defs:['n\tA large motor vehicle for carrying goods']},
  {word:'TRULY',defs:['adv\tIn a truthful way; genuinely']},
  {word:'TRUNK',defs:['n\tThe main woody stem of a tree']},
  {word:'TRUST',defs:['n\tFirm belief in the reliability of someone'],syns:['believe', 'rely', 'confidence'],ants:['doubt', 'distrust', 'suspicion']},
  {word:'TRUTH',defs:['n\tThe quality of being true'],syns:['fact', 'reality', 'honesty'],ants:['lie', 'fiction', 'deception']},
  {word:'TUMMY',defs:['n\tInformal word for stomach']},
  {word:'TUNER',defs:['n\tA device for receiving broadcast signals']},
  {word:'TUTOR',defs:['n\tA private teacher']},
  {word:'TWIST',defs:['v\tTo wind or turn in a spiral']},
  {word:'ULTRA',defs:['adj\tExtreme; going beyond what is usual'],syns:['extreme', 'excessive', 'radical'],ants:['moderate', 'mild', 'central']},
  {word:'UNION',defs:['n\tThe action of joining together']},
  {word:'UNTIL',defs:['prep\tUp to the point in time or event mentioned']},
  {word:'UPPER',defs:['adj\tSituated above another part']},
  {word:'UPSET',defs:['v\tTo make someone unhappy; an unexpected result'],syns:['disturb', 'overthrow', 'distress'],ants:['calm', 'soothe', 'order']},
  {word:'URBAN',defs:['adj\tRelating to a city or town']},
  {word:'USUAL',defs:['adj\tHappening or done habitually'],syns:['normal', 'common', 'typical'],ants:['unusual', 'rare', 'exceptional']},
  {word:'UTTER',defs:['v\tTo make a sound or speech; complete and absolute']},
  {word:'VALID',defs:['adj\tActually supporting the intended point']},
  {word:'VALUE',defs:['n\tThe importance or worth of something']},
  {word:'VAPOR',defs:['n\tA substance diffused in the atmosphere']},
  {word:'VAULT',defs:['n\tA large room for storing valuables; an arched roof']},
  {word:'VICAR',defs:['n\tA Church of England priest']},
  {word:'VIDEO',defs:['n\tA recording or broadcast of moving visual images']},
  {word:'VIGOR',defs:['n\tPhysical strength and good health']},
  {word:'VIRUS',defs:['n\tA submicroscopic infectious agent']},
  {word:'VISIT',defs:['v\tTo go to see a person or place']},
  {word:'VITAL',defs:['adj\tAbsolutely necessary; essential'],syns:['essential', 'critical', 'alive'],ants:['trivial', 'minor', 'dead']},
  {word:'VIVID',defs:['adj\tProducing powerful feelings; bright and strong'],syns:['bright', 'intense', 'striking'],ants:['dull', 'faint', 'pale']},
  {word:'VOCAL',defs:['adj\tRelating to the voice; expressing views'],syns:['spoken', 'outspoken', 'audible'],ants:['silent', 'quiet', 'reserved']},
  {word:'VOICE',defs:['n\tThe sound produced in the larynx']},
  {word:'VOTER',defs:['n\tA person who votes in an election']},
  {word:'WAKEN',defs:['v\tTo rouse from sleep']},
  {word:'WASTE',defs:['v\tTo use carelessly or extravagantly'],syns:['squander', 'trash', 'deplete'],ants:['conserve', 'save', 'utilize']},
  {word:'WATCH',defs:['v\tTo look at attentively']},
  {word:'WATER',defs:['n\tA transparent liquid essential for life']},
  {word:'WEARY',defs:['adj\tFeeling tired from prolonged exertion'],syns:['tired', 'exhausted', 'fatigued'],ants:['energetic', 'fresh', 'alert']},
  {word:'WEAVE',defs:['v\tTo make fabric by interlacing threads']},
  {word:'WEDGE',defs:['n\tA piece of wood or metal with a thin edge']},
  {word:'WEIRD',defs:['adj\tSuggesting something supernatural; strange']},
  {word:'WHEAT',defs:['n\tA cereal plant whose grain is used for flour']},
  {word:'WHEEL',defs:['n\tA circular object that revolves on an axle']},
  {word:'WHOLE',defs:['adj\tAll of; in an unbroken state'],syns:['entire', 'complete', 'total'],ants:['partial', 'broken', 'incomplete']},
  {word:'WINDY',defs:['adj\tMarked by strong winds']},
  {word:'WITTY',defs:['adj\tShowing clever humor']},
  {word:'WORLD',defs:['n\tThe earth with all its countries and peoples']},
  {word:'WORRY',defs:['v\tTo feel anxious or troubled about something'],syns:['fret', 'concern', 'anxiety'],ants:['relax', 'trust', 'calmness']},
  {word:'WORSE',defs:['adj\tOf a poorer quality or lower standard']},
  {word:'WORTH',defs:['n\tThe level of value or importance']},
  {word:'WRATH',defs:['n\tExtreme anger'],syns:['anger', 'fury', 'rage'],ants:['calm', 'peace', 'kindness']},
  {word:'WRING',defs:['v\tTo squeeze and twist to extract liquid']},
  {word:'YACHT',defs:['n\tA medium-sized sailing boat']},
  {word:'YEARN',defs:['v\tTo have an intense longing for something']},
  {word:'YIELD',defs:['v\tTo produce or provide; to give way']},
  {word:'YOUNG',defs:['adj\tHaving lived for a short time'],syns:['youthful', 'new', 'immature'],ants:['old', 'mature', 'elderly']},
  {word:'YOUTH',defs:['n\tThe period between childhood and adult age']},
  {word:'ZONAL',defs:['adj\tRelating to or arranged in zones']},
  // 6-letter words
  {word:'ACROSS',defs:['prep\tFrom one side to the other of']},
  {word:'ACTION',defs:['n\tThe process of doing something']},
  {word:'ACTUAL',defs:['adj\tExisting in fact; real']},
  {word:'ALWAYS',defs:['adv\tAt all times; forever']},
  {word:'ANIMAL',defs:['n\tA living organism other than a plant']},
  {word:'ANSWER',defs:['n\tA solution to a question or problem']},
  {word:'APPEAR',defs:['v\tTo come into sight; to seem']},
  {word:'ATTACK',defs:['v\tTo take aggressive action against']},
  {word:'AUTUMN',defs:['n\tThe season after summer']},
  {word:'BATTLE',defs:['n\tA sustained fight between armed forces']},
  {word:'BEAUTY',defs:['n\tA combination of qualities pleasing to the senses']},
  {word:'BEFORE',defs:['prep\tDuring the period of time preceding']},
  {word:'BEHIND',defs:['prep\tAt the back of; supporting']},
  {word:'BESIDE',defs:['prep\tAt the side of; next to']},
  {word:'BEYOND',defs:['prep\tAt or to the further side of']},
  {word:'BITTER',defs:['adj\tHaving a sharp pungent taste or smell'],syns:['sour', 'resentful', 'sharp'],ants:['sweet', 'content', 'mild']},
  {word:'BORDER',defs:['n\tA line separating two countries or regions']},
  {word:'BOTTLE',defs:['n\tA container for liquids with a narrow neck']},
  {word:'BOTTOM',defs:['n\tThe lowest point or part']},
  {word:'BREATH',defs:['n\tAir taken into or expelled from the lungs']},
  {word:'BRIDGE',defs:['n\tA structure spanning and providing passage over a gap']},
  {word:'BRIGHT',defs:['adj\tGiving out or reflecting much light'],syns:['vivid', 'clever', 'luminous'],ants:['dull', 'dim', 'stupid']},
  {word:'BRONZE',defs:['n\tA yellowish-brown alloy of copper and tin']},
  {word:'BRUTAL',defs:['adj\tSavagely violent; without mercy'],syns:['savage', 'cruel', 'harsh'],ants:['gentle', 'kind', 'humane']},
  {word:'BUBBLE',defs:['n\tA thin sphere of liquid enclosing air']},
  {word:'BUDGET',defs:['n\tAn estimate of income and expenditure']},
  {word:'BUTTON',defs:['n\tA small disk sewn on clothing as a fastener']},
  {word:'CAMERA',defs:['n\tA device for recording images']},
  {word:'CANDLE',defs:['n\tA cylinder of wax with a central wick']},
  {word:'CASTLE',defs:['n\tA large medieval fortified building']},
  {word:'CHANGE',defs:['v\tTo make different; money returned as difference']},
  {word:'CHARGE',defs:['n\tThe price asked for goods or services']},
  {word:'CHOOSE',defs:['v\tTo pick out as being the best']},
  {word:'CIRCLE',defs:['n\tA round plane figure with all points equidistant from center']},
  {word:'CLEVER',defs:['adj\tQuick to understand or learn things'],syns:['smart', 'intelligent', 'witty'],ants:['stupid', 'dull', 'foolish']},
  {word:'CLOSED',defs:['adj\tNot open or not allowing entry']},
  {word:'COFFEE',defs:['n\tA drink made from roasted coffee beans']},
  {word:'COLLAR',defs:['n\tThe part of a shirt that folds around the neck']},
  {word:'COLUMN',defs:['n\tAn upright pillar; a vertical division of a page']},
  {word:'COMBAT',defs:['n\tFighting between armed forces']},
  {word:'COMMON',defs:['adj\tOccurring frequently; shared by all']},
  {word:'CORNER',defs:['n\tA place where two edges or lines meet']},
  {word:'COTTON',defs:['n\tA soft white fibrous substance from cotton plants']},
  {word:'CRISIS',defs:['n\tA time of intense difficulty or danger']},
  {word:'CRUISE',defs:['n\tA voyage on a ship as a holiday']},
  {word:'CUSTOM',defs:['n\tA traditional way of behaving in a society']},
  {word:'DAMAGE',defs:['n\tPhysical harm impairing value or usefulness'],syns:['harm', 'injure', 'destroy'],ants:['repair', 'protect', 'benefit']},
  {word:'DANGER',defs:['n\tThe possibility of suffering harm or injury'],syns:['risk', 'hazard', 'threat'],ants:['safety', 'security', 'protection']},
  {word:'DARING',defs:['adj\tAdventurous or audaciously bold']},
  {word:'DEBRIS',defs:['n\tScattered pieces of rubbish or remains']},
  {word:'DECADE',defs:['n\tA period of ten years']},
  {word:'DEFEAT',defs:['v\tTo win a victory over; to overcome'],syns:['loss', 'overcome', 'conquer'],ants:['victory', 'triumph', 'succeed']},
  {word:'DEFEND',defs:['v\tTo resist an attack; to protect'],syns:['protect', 'guard', 'shield'],ants:['attack', 'expose', 'abandon']},
  {word:'DEFINE',defs:['v\tTo give the exact meaning of a word']},
  {word:'DEGREE',defs:['n\tA unit of measurement for angles or temperature']},
  {word:'DESIGN',defs:['n\tA plan for the form and structure of something']},
  {word:'DETAIL',defs:['n\tA small individual feature of something']},
  {word:'DEVICE',defs:['n\tA thing made for a particular purpose']},
  {word:'DIRECT',defs:['adj\tGoing straight to the point; not roundabout']},
  {word:'DIVINE',defs:['adj\tOf or relating to God; excellent'],syns:['holy', 'sacred', 'perfect'],ants:['mortal', 'evil', 'imperfect']},
  {word:'DOLLAR',defs:['n\tThe basic monetary unit of the US']},
  {word:'DONKEY',defs:['n\tA domesticated hoofed mammal related to the horse']},
  {word:'DOUBLE',defs:['adj\tConsisting of two equal parts; twice as much']},
  {word:'EFFORT',defs:['n\tA vigorous or determined attempt']},
  {word:'ENABLE',defs:['v\tTo give the means or authority to do something']},
  {word:'ENERGY',defs:['n\tThe strength required for sustained activity']},
  {word:'ENGAGE',defs:['v\tTo occupy or attract someone\'s interest']},
  {word:'ENOUGH',defs:['det\tAs much as required']},
  {word:'ENSURE',defs:['v\tTo make certain that something will happen']},
  {word:'ENTIRE',defs:['adj\tWith no part excluded']},
  {word:'ESCAPE',defs:['v\tTo break free from confinement'],syns:['flee', 'evade', 'breakout'],ants:['capture', 'remain', 'confine']},
  {word:'ESTATE',defs:['n\tProperty consisting of land and buildings']},
  {word:'EVOLVE',defs:['v\tTo develop gradually']},
  {word:'EXPAND',defs:['v\tTo become or make larger'],syns:['grow', 'increase', 'extend'],ants:['shrink', 'reduce', 'contract']},
  {word:'EXPECT',defs:['v\tTo regard as likely to happen']},
  {word:'EXPERT',defs:['n\tA person with special skill or knowledge'],syns:['master', 'specialist', 'skilled'],ants:['novice', 'amateur', 'beginner']},
  {word:'EXTEND',defs:['v\tTo make longer or larger']},
  {word:'FABRIC',defs:['n\tWoven or knitted cloth']},
  {word:'FALCON',defs:['n\tA bird of prey with long pointed wings']},
  {word:'FAMOUS',defs:['adj\tKnown about by many people'],syns:['renowned', 'celebrated', 'notable'],ants:['unknown', 'obscure', 'ordinary']},
  {word:'FEMALE',defs:['adj\tOf the sex that can bear offspring']},
  {word:'FIERCE',defs:['adj\tHaving or displaying an intense aggressive nature'],syns:['violent', 'savage', 'intense'],ants:['gentle', 'mild', 'weak']},
  {word:'FIGURE',defs:['n\tA number or numerical symbol; a person\'s body shape']},
  {word:'FINGER',defs:['n\tEach of the four slender parts of the hand']},
  {word:'FINISH',defs:['v\tTo bring to an end; to complete'],syns:['complete', 'end', 'conclude'],ants:['begin', 'start', 'initiate']},
  {word:'FLAVOR',defs:['n\tThe distinctive quality of a food or drink']},
  {word:'FLIGHT',defs:['n\tThe action of flying; fleeing from danger']},
  {word:'FLOWER',defs:['n\tThe seed-bearing part of a plant']},
  {word:'FOLLOW',defs:['v\tTo go or come after'],syns:['pursue', 'obey', 'succeed'],ants:['lead', 'precede', 'defy']},
  {word:'FOREST',defs:['n\tA large area covered chiefly with trees'],syns:['woods', 'jungle', 'timber'],ants:['desert', 'clearing', 'city']},
  {word:'FORMAL',defs:['adj\tDone in accordance with rules; not casual'],syns:['official', 'proper', 'serious'],ants:['casual', 'informal', 'relaxed']},
  {word:'FOSSIL',defs:['n\tThe remains of a prehistoric plant or animal']},
  {word:'FROZEN',defs:['adj\tTurned into ice; made rigid by cold'],syns:['icy', 'rigid', 'motionless'],ants:['melted', 'flexible', 'moving']},
  {word:'FUTURE',defs:['n\tTime that is to come'],syns:['upcoming', 'destiny', 'tomorrow'],ants:['past', 'history', 'yesterday']},
  {word:'GALAXY',defs:['n\tA system of millions of stars']},
  {word:'GARLIC',defs:['n\tA plant of the onion family with pungent flavor']},
  {word:'GENTLE',defs:['adj\tMild in temperament or behavior'],syns:['mild', 'tender', 'soft'],ants:['rough', 'harsh', 'violent']},
  {word:'GLOBAL',defs:['adj\tRelating to the whole world']},
  {word:'GOLDEN',defs:['adj\tMade of or resembling gold'],syns:['precious', 'valuable', 'bright'],ants:['worthless', 'dark', 'base']},
  {word:'GOVERN',defs:['v\tTo conduct the policy and affairs of an organization']},
  {word:'GRAVEL',defs:['n\tSmall stones and pebbles for paths']},
  {word:'GROWTH',defs:['n\tThe process of increasing in physical size']},
  {word:'HANDLE',defs:['n\tThe part of a tool held in the hand']},
  {word:'HAPPEN',defs:['v\tTo take place; to occur']},
  {word:'HARBOR',defs:['n\tA sheltered port where ships can anchor']},
  {word:'HEALTH',defs:['n\tThe state of being free from illness']},
  {word:'HEAVEN',defs:['n\tA place regarded as the afterlife']},
  {word:'HIDDEN',defs:['adj\tKept out of sight; concealed']},
  {word:'HOLLOW',defs:['adj\tHaving a hole or empty space inside']},
  {word:'HONEST',defs:['adj\tFree of deceit; truthful and sincere'],syns:['truthful', 'sincere', 'frank'],ants:['dishonest', 'deceitful', 'lying']},
  {word:'HORROR',defs:['n\tAn intense feeling of fear or shock']},
  {word:'HUMBLE',defs:['adj\tHaving a modest view of oneself'],syns:['modest', 'meek', 'unassuming'],ants:['proud', 'arrogant', 'boastful']},
  {word:'HUNGER',defs:['n\tA feeling of discomfort from lack of food']},
  {word:'IMPACT',defs:['n\tThe action of one object coming into contact with another'],syns:['effect', 'collision', 'influence'],ants:['cause', 'irrelevance', 'miss']},
  {word:'IMPORT',defs:['v\tTo bring goods from another country']},
  {word:'INSECT',defs:['n\tA small arthropod with three body segments'],syns:['bug', 'creature', 'pest'],ants:[]},
  {word:'INSIDE',defs:['prep\tWithin; on the inner side of']},
  {word:'INVEST',defs:['v\tTo put money into something for profit']},
  {word:'ISLAND',defs:['n\tA piece of land surrounded by water'],syns:['isle', 'atoll', 'land mass'],ants:['continent', 'mainland']},
  {word:'JUNGLE',defs:['n\tAn area of land overgrown with dense vegetation'],syns:['forest', 'wilderness', 'tangle'],ants:['desert', 'city', 'clearing']},
  {word:'KEEPER',defs:['n\tA person who manages or looks after something'],syns:['guardian', 'protector', 'manager'],ants:['intruder', 'neglect']},
  {word:'KETTLE',defs:['n\tA container with a spout for boiling water']},
  {word:'KNIGHT',defs:['n\tA man given a rank for service; a chess piece']},
  {word:'LAUNCH',defs:['v\tTo set in motion; to start']},
  {word:'LAWYER',defs:['n\tA person who practices law']},
  {word:'LEAGUE',defs:['n\tA group of people with a common interest']},
  {word:'LEGEND',defs:['n\tA popular story from the past; a very famous person'],syns:['myth', 'hero', 'tale'],ants:['fact', 'truth', 'unknown']},
  {word:'LENGTH',defs:['n\tThe measurement of something from end to end'],syns:['distance', 'extent', 'duration'],ants:['width', 'brevity', 'shortness']},
  {word:'LESSON',defs:['n\tAn amount of teaching given at one time']},
  {word:'LETTER',defs:['n\tA character of an alphabet; a written message']},
  {word:'LIQUID',defs:['n\tA substance that flows and is not solid or gas'],syns:['fluid', 'flowing', 'water'],ants:['solid', 'gas', 'frozen']},
  {word:'LISTEN',defs:['v\tTo give attention to a sound']},
  {word:'LOCATE',defs:['v\tTo discover the exact position of']},
  {word:'LONELY',defs:['adj\tSad because of having no companions'],syns:['isolated', 'alone', 'desolate'],ants:['accompanied', 'social', 'crowded']},
  {word:'LOVELY',defs:['adj\tExquisitely beautiful or delightful'],syns:['beautiful', 'charming', 'delightful'],ants:['ugly', 'unpleasant', 'repulsive']},
  {word:'MAGNET',defs:['n\tA piece of metal that attracts iron']},
  {word:'MANAGE',defs:['v\tTo be in charge of; to succeed in doing something']},
  {word:'MANNER',defs:['n\tA way in which something is done']},
  {word:'MARBLE',defs:['n\tA hard crystalline rock used in sculpture']},
  {word:'MARGIN',defs:['n\tAn edge or border; a difference between two amounts']},
  {word:'MARKET',defs:['n\tA place where goods are bought and sold']},
  {word:'MASTER',defs:['n\tA person with the ability to use something skillfully'],syns:['expert', 'ruler', 'overcome'],ants:['novice', 'servant', 'submit']},
  {word:'MATURE',defs:['adj\tFully developed; having reached an advanced stage'],syns:['adult', 'developed', 'ripe'],ants:['immature', 'childish', 'unripe']},
  {word:'MEADOW',defs:['n\tA field of grass used for grazing animals']},
  {word:'MEMBER',defs:['n\tA person belonging to a group']},
  {word:'MEMORY',defs:['n\tThe faculty by which the mind stores information'],syns:['recall', 'recollection', 'thought'],ants:['forgetfulness', 'oblivion', 'amnesia']},
  {word:'MENTAL',defs:['adj\tRelating to the mind']},
  {word:'MIDDLE',defs:['n\tA point equidistant from extremities']},
  {word:'MIRROR',defs:['n\tA surface reflecting images']},
  {word:'MODEST',defs:['adj\tUnassuming in estimation of oneself'],syns:['humble', 'simple', 'reserved'],ants:['arrogant', 'extravagant', 'boastful']},
  {word:'MOMENT',defs:['n\tA very brief period of time']},
  {word:'MONKEY',defs:['n\tA primate with a long tail']},
  {word:'MORTAL',defs:['adj\tSubject to death; causing death'],syns:['deadly', 'human', 'temporal'],ants:['immortal', 'divine', 'eternal']},
  {word:'MOTHER',defs:['n\tA female parent']},
  {word:'MOTION',defs:['n\tThe action of moving; a formal proposal']},
  {word:'MUSEUM',defs:['n\tA building for displaying objects of historical interest']},
  {word:'MUTUAL',defs:['adj\tExperienced by each of two parties toward the other']},
  {word:'NATURE',defs:['n\tThe physical world; the basic qualities of something']},
  {word:'NEARBY',defs:['adj\tNot far away'],syns:['close', 'adjacent', 'local'],ants:['distant', 'far', 'remote']},
  {word:'NEARLY',defs:['adv\tVery close to; almost']},
  {word:'NEEDLE',defs:['n\tA slender pointed metal instrument for sewing']},
  {word:'NORMAL',defs:['adj\tConforming to a standard; usual'],syns:['typical', 'usual', 'average'],ants:['abnormal', 'unusual', 'exceptional']},
  {word:'NOTICE',defs:['v\tTo be aware of; a displayed announcement'],syns:['observe', 'see', 'inform'],ants:['ignore', 'overlook', 'miss']},
  {word:'NUMBER',defs:['n\tA mathematical value for counting']},
  {word:'OBJECT',defs:['n\tA material thing; to say one disagrees'],syns:['thing', 'oppose', 'protest'],ants:['agree', 'accept', 'approve']},
  {word:'OBTAIN',defs:['v\tTo come into possession of something'],syns:['get', 'acquire', 'gain'],ants:['lose', 'give', 'relinquish']},
  {word:'ONLINE',defs:['adj\tControlled by or connected to a computer']},
  {word:'ORANGE',defs:['n\tA round juicy citrus fruit; color between red and yellow']},
  {word:'ORCHID',defs:['n\tA plant with complex flowers']},
  {word:'ORIGIN',defs:['n\tThe point where something begins'],syns:['source', 'cause', 'beginning'],ants:['end', 'result', 'destination']},
  {word:'OYSTER',defs:['n\tA bivalve mollusk with a rough shell']},
  {word:'PALACE',defs:['n\tThe official residence of a sovereign'],syns:['mansion', 'castle', 'estate'],ants:['hut', 'cottage', 'shack']},
  {word:'PARENT',defs:['n\tA father or mother'],syns:['guardian', 'mother', 'father'],ants:['child', 'offspring', 'dependent']},
  {word:'PARTLY',defs:['adv\tTo some extent; not completely'],syns:['partially', 'somewhat', 'half'],ants:['fully', 'completely', 'entirely']},
  {word:'PATROL',defs:['v\tTo walk around an area to protect it'],syns:['guard', 'monitor', 'police'],ants:['neglect', 'abandon', 'ignore']},
  {word:'PENCIL',defs:['n\tAn instrument for writing consisting of graphite'],syns:['pen', 'draw', 'write'],ants:[]},
  {word:'PEOPLE',defs:['n\tHuman beings in general'],syns:['humans', 'folk', 'society'],ants:[]},
  {word:'PEPPER',defs:['n\tA hot-tasting spice from dried berries']},
  {word:'PERMIT',defs:['v\tTo officially allow something']},
  {word:'PERSON',defs:['n\tA human being regarded as an individual']},
  {word:'PHRASE',defs:['n\tA small group of words forming a unit']},
  {word:'PIRATE',defs:['n\tA person who attacks ships at sea']},
  {word:'PLANET',defs:['n\tA celestial body orbiting a star']},
  {word:'PLEDGE',defs:['n\tA solemn promise or undertaking']},
  {word:'POCKET',defs:['n\tA small bag sewn into clothing']},
  {word:'POISON',defs:['n\tA substance causing illness or death'],syns:['toxin', 'venom', 'corrupt'],ants:['antidote', 'cure', 'purify']},
  {word:'POLICY',defs:['n\tA course of action adopted by an organization']},
  {word:'PONDER',defs:['v\tTo think about something carefully']},
  {word:'PORTAL',defs:['n\tA doorway or gate; a website offering access to others']},
  {word:'POTATO',defs:['n\tA starchy root vegetable']},
  {word:'POWDER',defs:['n\tFine dry particles produced by grinding'],syns:['dust', 'grind', 'pulverize'],ants:['solid', 'coarsen']},
  {word:'PREFER',defs:['v\tTo like someone or something better than another']},
  {word:'PRIEST',defs:['n\tA person ordained to perform religious duties']},
  {word:'PRINCE',defs:['n\tA son of a monarch']},
  {word:'PRISON',defs:['n\tA building for confining criminals'],syns:['jail', 'cell', 'captivity'],ants:['freedom', 'liberty', 'release']},
  {word:'PROFIT',defs:['n\tA financial gain'],syns:['gain', 'benefit', 'earnings'],ants:['loss', 'deficit', 'expense']},
  {word:'PROPER',defs:['adj\tTruly what it is said to be; respectable'],syns:['correct', 'suitable', 'appropriate'],ants:['improper', 'wrong', 'unsuitable']},
  {word:'PUBLIC',defs:['adj\tOf or concerning the people as a whole']},
  {word:'PURPLE',defs:['adj\tOf a color intermediate between red and blue']},
  {word:'PURSUE',defs:['v\tTo follow in order to catch; to continue with'],syns:['chase', 'follow', 'seek'],ants:['flee', 'abandon', 'avoid']},
  {word:'PUZZLE',defs:['n\tA game that tests ingenuity or knowledge'],syns:['mystery', 'confuse', 'riddle'],ants:['solution', 'clarity', 'answer']},
  {word:'PYTHON',defs:['n\tA large constricting snake; a programming language']},
  {word:'RABBIT',defs:['n\tA small burrowing mammal with long ears']},
  {word:'RANDOM',defs:['adj\tMade without method or conscious decision']},
  {word:'RATTLE',defs:['v\tTo make a rapid series of short sharp sounds']},
  {word:'RAVINE',defs:['n\tA deep narrow gorge with steep sides']},
  {word:'REASON',defs:['n\tA cause explanation or justification']},
  {word:'RECORD',defs:['n\tA thing established as the best performance']},
  {word:'REDUCE',defs:['v\tTo make smaller or less in amount']},
  {word:'REGION',defs:['n\tAn area of land with common features']},
  {word:'RELATE',defs:['v\tTo make or show a connection between']},
  {word:'REMOTE',defs:['adj\tFar away; distant in time or space']},
  {word:'REMOVE',defs:['v\tTo take away from the position occupied']},
  {word:'REPAIR',defs:['v\tTo restore something to good condition'],syns:['fix', 'restore', 'mend'],ants:['break', 'damage', 'destroy']},
  {word:'REPEAT',defs:['v\tTo do or say again']},
  {word:'RESCUE',defs:['v\tTo save someone from danger']},
  {word:'RESULT',defs:['n\tA consequence or outcome of something']},
  {word:'RETURN',defs:['v\tTo come or go back to a place']},
  {word:'REVEAL',defs:['v\tTo make something known']},
  {word:'REVIEW',defs:['n\tA formal assessment of something']},
  {word:'RIBBON',defs:['n\tA long narrow strip of fabric used for tying']},
  {word:'RIDDLE',defs:['n\tA question requiring clever thinking']},
  {word:'SIMPLE',defs:['adj\tEasily understood; not complex'],syns:['easy', 'plain', 'basic'],ants:['complex', 'difficult', 'fancy']},
  {word:'SKETCH',defs:['n\tA rough drawing; a brief description']},
  {word:'SPRING',defs:['n\tThe season after winter; a source of water']},
  {word:'SQUARE',defs:['n\tA plane figure with four equal sides']},
  {word:'STREET',defs:['n\tA public road in a city or town']},
  {word:'STRIKE',defs:['v\tTo hit or reach with force']},
  {word:'STRING',defs:['n\tMaterial consisting of threads twisted together']},
  {word:'STRONG',defs:['adj\tHaving great power or physical ability'],syns:['powerful', 'sturdy', 'robust'],ants:['weak', 'frail', 'delicate']},
  {word:'SUDDEN',defs:['adj\tOccurring or done quickly and unexpectedly']},
  {word:'SUFFER',defs:['v\tTo experience something bad'],syns:['endure', 'ache', 'pain'],ants:['enjoy', 'flourish', 'recover']},
  {word:'SUMMER',defs:['n\tThe warmest season of the year']},
  {word:'SUPPLY',defs:['v\tTo provide something needed'],syns:['provide', 'stock', 'give'],ants:['demand', 'withhold', 'take']},
  {word:'SWITCH',defs:['v\tTo change direction; a device for turning electric current on']},
  {word:'SYMBOL',defs:['n\tA thing representing something else']},
  {word:'SYSTEM',defs:['n\tA set of things working together as a mechanism']},
  {word:'TALENT',defs:['n\tNatural aptitude or skill'],syns:['gift', 'skill', 'ability'],ants:['incompetence', 'disability', 'weakness']},
  {word:'TARGET',defs:['n\tA person or thing being aimed at']},
  {word:'TENDER',defs:['adj\tShowing gentleness; soft and delicate'],syns:['gentle', 'soft', 'offer'],ants:['rough', 'harsh', 'withdraw']},
  {word:'THEORY',defs:['n\tA supposition explaining something']},
  {word:'THRONE',defs:['n\tA ceremonial chair for a sovereign']},
  {word:'TICKET',defs:['n\tA piece of paper permitting access to something']},
  {word:'TIMBER',defs:['n\tWood prepared for building; trees for wood']},
  {word:'TONGUE',defs:['n\tThe muscular organ in the mouth for tasting']},
  {word:'TREATY',defs:['n\tA formally concluded agreement between countries']},
  {word:'TRIPLE',defs:['adj\tConsisting of three equal parts']},
  {word:'TROPHY',defs:['n\tA cup or other object awarded as a prize'],syns:['award', 'prize', 'reward'],ants:['defeat', 'punishment', 'penalty']},
  {word:'TUNDRA',defs:['n\tA vast flat treeless Arctic region']},
  {word:'TUNNEL',defs:['n\tAn underground passage'],syns:['passage', 'burrow', 'underground'],ants:['bridge', 'open', 'surface']},
  {word:'TURTLE',defs:['n\tA slow-moving reptile with a shell']},
  {word:'TYRANT',defs:['n\tA cruel and oppressive ruler'],syns:['dictator', 'oppressor', 'despot'],ants:['liberator', 'democrat', 'servant']},
  {word:'UNABLE',defs:['adj\tLacking ability to do something']},
  {word:'UNLESS',defs:['conj\tExcept if; on the condition that']},
  {word:'UPDATE',defs:['v\tTo bring to a more modern state'],syns:['revise', 'refresh', 'upgrade'],ants:['downgrade', 'obsolete', 'neglect']},
  {word:'VACUUM',defs:['n\tA space entirely devoid of matter'],syns:['void', 'empty', 'clean'],ants:['full', 'filled', 'mess']},
  {word:'VALLEY',defs:['n\tA low area between hills or mountains'],syns:['gorge', 'hollow', 'depression'],ants:['mountain', 'peak', 'summit']},
  {word:'VANISH',defs:['v\tTo disappear suddenly and completely'],syns:['disappear', 'fade', 'evaporate'],ants:['appear', 'emerge', 'materialize']},
  {word:'VELVET',defs:['n\tA soft fabric with a short dense pile'],syns:['smooth', 'soft', 'plush'],ants:['rough', 'coarse', 'harsh']},
  {word:'VENDOR',defs:['n\tA person who sells things']},
  {word:'VERIFY',defs:['v\tTo make sure or demonstrate that something is true'],syns:['confirm', 'check', 'prove'],ants:['doubt', 'disprove', 'deny']},
  {word:'VICTIM',defs:['n\tA person harmed or killed as a result of something'],syns:['sufferer', 'target', 'casualty'],ants:['perpetrator', 'culprit', 'aggressor']},
  {word:'VIOLIN',defs:['n\tA bowed stringed instrument']},
  {word:'VIRTUE',defs:['n\tBehavior showing high moral standards'],syns:['goodness', 'morality', 'strength'],ants:['vice', 'wickedness', 'weakness']},
  {word:'VISION',defs:['n\tThe faculty or state of being able to see'],syns:['sight', 'dream', 'foresight'],ants:['blindness', 'reality', 'ignorance']},
  {word:'VOLUME',defs:['n\tThe amount of space occupied by something'],syns:['size', 'book', 'loudness'],ants:['silence', 'small', 'quiet']},
  {word:'WANDER',defs:['v\tTo walk or move in a leisurely way'],syns:['roam', 'drift', 'stray'],ants:['stay', 'settle', 'remain']},
  {word:'WARMTH',defs:['n\tThe quality of being warm; friendliness']},
  {word:'WEEKLY',defs:['adj\tDone or occurring once a week']},
  {word:'WEIGHT',defs:['n\tA body\'s relative mass; heaviness']},
  {word:'WILLOW',defs:['n\tA tree with long drooping branches']},
  {word:'WINNER',defs:['n\tA person or thing that wins'],syns:['champion', 'victor', 'success'],ants:['loser', 'failure', 'defeated']},
  {word:'WISDOM',defs:['n\tThe quality of being wise'],syns:['knowledge', 'insight', 'judgment'],ants:['ignorance', 'foolishness', 'naivety']},
  {word:'WONDER',defs:['n\tA feeling of admiration and amazement'],syns:['amazement', 'marvel', 'curiosity'],ants:['boredom', 'indifference', 'certainty']},
  {word:'WOODEN',defs:['adj\tMade of wood; stiff and unnatural']},
  {word:'WORKER',defs:['n\tA person who does a specified type of work'],syns:['employee', 'laborer', 'toiler'],ants:['employer', 'boss', 'idle']},
  {word:'WORTHY',defs:['adj\tDeserving effort or respect'],syns:['deserving', 'excellent', 'valuable'],ants:['unworthy', 'inferior', 'worthless']},
  {word:'WRITER',defs:['n\tA person who writes books or articles'],syns:['author', 'scribe', 'journalist'],ants:['reader', 'illiterate']},
  {word:'YELLOW',defs:['adj\tOf the color between green and orange in the spectrum']},
  {word:'ZENITH',defs:['n\tThe time when something is most powerful'],syns:['peak', 'apex', 'summit'],ants:['nadir', 'bottom', 'low']},
  // 7-letter words
  {word:'ABANDON', defs:['v\tTo cease to support or look after; to desert'], syns:['desert', 'forsake', 'leave'], ants:['keep', 'maintain', 'stay']},
{word:'ABILITY', defs:['n\tPossession of the means or skill to do something'], syns:['capability', 'competence', 'talent'], ants:['inability', 'incapacity']},
{word:'ABSENCE', defs:['n\tThe state of being away from a place'], syns:['lack', 'nonattendance', 'omission'], ants:['presence', 'attendance']},
{word:'ACCOUNT', defs:['n\tA report or description; a bank record'], syns:['report', 'narrative', 'explanation']},
{word:'ACHIEVE', defs:['v\tTo successfully bring about a desired objective'], syns:['accomplish', 'attain', 'realize'], ants:['fail', 'lose']},
{word:'ANCIENT', defs:['adj\tBelonging to the very distant past'], syns:['old', 'historic', 'antique'], ants:['modern', 'new', 'recent']},
{word:'ANXIETY', defs:['n\tA feeling of worry or unease'], syns:['worry', 'apprehension', 'nervousness'], ants:['calm', 'ease']},
{word:'BLOSSOM', defs:['n\tA flower or mass of flowers on a tree'], syns:['flower', 'bloom', 'floret']},
{word:'CAPTAIN', defs:['n\tThe person in command of a ship or aircraft'], syns:['leader', 'commander', 'chief']},
{word:'CAPTURE', defs:['v\tTo take into one\'s possession by force'], syns:['seize', 'catch', 'arrest'], ants:['release', 'free']},
{word:'CENTURY', defs:['n\tA period of one hundred years'], syns:['hundred years','centennial']},
{word:'CHAPTER', defs:['n\tA main division of a book'], syns:['section', 'part', 'segment']},
{word:'CIRCUIT', defs:['n\tA roughly circular line or route'], syns:['loop', 'course', 'track']},
{word:'COMFORT', defs:['n\tA state of physical ease and freedom from pain'], syns:['ease', 'relief', 'wellbeing'], ants:['discomfort', 'hardship']},
{word:'CONCEPT', defs:['n\tAn abstract idea; a general notion'], syns:['idea', 'notion', 'conception']},
{word:'CONFIRM', defs:['v\tTo establish the truth or correctness of'], syns:['verify', 'validate', 'substantiate'], ants:['deny', 'contradict']},
{word:'CONTEXT', defs:['n\tThe circumstances surrounding an event'], syns:['background', 'setting', 'environment']},
{word:'COURAGE', defs:['n\tThe ability to confront danger or pain'], syns:['bravery', 'valor', 'nerve'], ants:['cowardice', 'timidity']},
{word:'CULTURE', defs:['n\tThe arts and manifestations of human achievement'], syns:['civilization', 'heritage', 'traditions']},
{word:'CURRENT', defs:['adj\tBelonging to the present time; a body of water moving'], syns:['present', 'contemporary', 'ongoing'], ants:['past', 'outdated']},
{word:'CURTAIN', defs:['n\tA piece of fabric hung to cover a window'], syns:['drape', 'screen', 'veil']},
{word:'DECLARE', defs:['v\tTo state formally; to announce openly'], syns:['announce', 'proclaim', 'assert'], ants:['conceal', 'withhold']},
{word:'DEFAULT', defs:['n\tA preselected option; failure to fulfill an obligation'], syns:['standard', 'failure', 'neglect'], ants:['payment', 'fulfillment']},
{word:'DEFENSE', defs:['n\tThe action of defending from attack'], syns:['protection', 'guard', 'security'], ants:['attack', 'offense']},
{word:'DELIVER', defs:['v\tTo bring and hand over to someone'], syns:['distribute', 'convey', 'hand over']},
{word:'DESERVE', defs:['v\tTo do something worthy of reward'], syns:['merit', 'earn', 'warrant']},
{word:'DEVELOP', defs:['v\tTo grow or cause to grow more advanced'], syns:['evolve', 'expand', 'advance'], ants:['regress', 'decline']},
{word:'DIAMOND', defs:['n\tA precious stone; the hardest natural substance'], syns:['gem', 'jewel']},
{word:'DIGITAL', defs:['adj\tRelating to computer technology'], syns:['electronic', 'computerized']},
{word:'DISCUSS', defs:['v\tTo talk about a topic in detail'], syns:['debate', 'converse', 'deliberate']},
{word:'DISPLAY', defs:['v\tTo put something in a prominent place'], syns:['show', 'exhibit', 'present'], ants:['hide', 'conceal']},
{word:'DISTANT', defs:['adj\tFar away in space or time'], syns:['far', 'remote', 'faraway'], ants:['near', 'close']},
{word:'DOLPHIN', defs:['n\tA small gregarious toothed whale'], syns:['porpoise']},
{word:'DYNAMIC', defs:['adj\tPositive in attitude and full of energy'], syns:['energetic', 'vigorous', 'active'], ants:['static', 'inactive']},
{word:'ECONOMY', defs:['n\tThe wealth and resources of a country'], syns:['financial system', 'market']},
{word:'ELEMENT', defs:['n\tA part or aspect of something abstract'], syns:['component', 'factor', 'constituent']},
{word:'EMOTION', defs:['n\tA strong feeling such as joy or anger'], syns:['feeling', 'sentiment', 'passion']},
{word:'EXPLORE', defs:['v\tTo travel through a place to learn about it'], syns:['investigate', 'survey', 'probe']},
{word:'EXPRESS', defs:['v\tTo convey a thought or feeling in words'], syns:['voice', 'communicate', 'declare'], ants:['suppress', 'conceal']},
{word:'EXTREME', defs:['adj\tReaching a high or the highest degree'], syns:['intense', 'severe', 'utmost'], ants:['moderate', 'mild']},
{word:'FACTORY', defs:['n\tA building where goods are manufactured'], syns:['plant', 'mill', 'workshop']},
{word:'FANTASY', defs:['n\tThe faculty of imagining impossible things'], syns:['imagination', 'dream', 'vision'], ants:['reality', 'fact']},
{word:'FASHION', defs:['n\tA popular style of clothing at a particular time'], syns:['trend', 'style', 'vogue']},
{word:'FEATURE', defs:['n\tA distinctive attribute or aspect of something'], syns:['characteristic', 'trait', 'attribute']},
{word:'FICTION', defs:['n\tLiterature in the form of prose describing imaginary events'], syns:['story', 'novel', 'tale'], ants:['nonfiction', 'fact']},
{word:'FITNESS', defs:['n\tThe condition of being physically fit and healthy'], syns:['health', 'strength', 'wellness'], ants:['illness', 'weakness']},
{word:'FOREIGN', defs:['adj\tOf from or in another country'], syns:['overseas', 'exotic', 'alien'], ants:['domestic', 'native']},
{word:'FORWARD', defs:['adv\tToward the front; onward in time'], syns:['onward', 'ahead', 'forth'], ants:['backward', 'reverse']},
{word:'FREEDOM', defs:['n\tThe power to act without constraint'], syns:['liberty', 'independence', 'autonomy'], ants:['captivity', 'oppression']},
{word:'GARBAGE', defs:['n\tWorthless or rubbish material'], syns:['trash', 'waste', 'refuse']},
{word:'GATEWAY', defs:['n\tAn opening that can be closed by a gate'], syns:['entrance', 'portal', 'doorway']},
{word:'GENERAL', defs:['adj\tAffecting or concerning all; a military officer'], syns:['widespread', 'common', 'universal'], ants:['specific', 'particular']},
{word:'GENETIC', defs:['adj\tRelating to genes and heredity'], syns:['hereditary', 'inherited']},
{word:'GENUINE', defs:['adj\tTruly what it is said to be; authentic'], syns:['real', 'authentic', 'true'], ants:['fake', 'counterfeit']},
{word:'GLACIER', defs:['n\tA slowly moving mass of ice'], syns:['ice sheet', 'iceberg']},
{word:'GLIMPSE', defs:['n\tA momentary or partial view'], syns:['glance', 'peek', 'look']},
{word:'GRANITE', defs:['n\tA very hard rock used in construction'], syns:['stone', 'rock']},
{word:'HARVEST', defs:['n\tThe process of gathering a crop'], syns:['reap', 'collect', 'gather'], ants:['sow', 'plant']},
{word:'HISTORY', defs:['n\tThe study of past events'], syns:['past', 'chronicle', 'record']},
{word:'HUSBAND', defs:['n\tA married man'], syns:['spouse', 'partner'], ants:['wife']},
{word:'IMAGINE', defs:['v\tTo form a picture in the mind'], syns:['picture', 'envision', 'conceive']},
{word:'IMPROVE', defs:['v\tTo make or become better'], syns:['enhance', 'upgrade', 'refine'], ants:['worsen', 'deteriorate']},
{word:'INCLUDE', defs:['v\tTo contain as part of a whole'], syns:['incorporate', 'comprise', 'encompass'], ants:['exclude', 'omit']},
{word:'INSPIRE', defs:['v\tTo fill with the urge to do something creative'], syns:['motivate', 'encourage', 'stimulate']},
{word:'INSTANT', defs:['n\tA very short space of time; happening immediately'], syns:['moment', 'second', 'flash'], ants:['delay', 'later']},
{word:'JOURNEY', defs:['n\tAn act of travelling from one place to another'], syns:['trip', 'voyage', 'expedition']},
{word:'KINGDOM', defs:['n\tA country ruled by a king or queen'], syns:['realm', 'empire', 'domain']},
{word:'LANTERN', defs:['n\tA lamp with a transparent case protecting the flame'], syns:['lamp', 'torch']},
{word:'LIBRARY', defs:['n\tA building containing a collection of books'], syns:['archive', 'reading room']},
{word:'LOYALTY', defs:['n\tThe quality of being loyal'], syns:['faithfulness', 'devotion', 'allegiance'], ants:['disloyalty', 'treachery']},
{word:'MACHINE', defs:['n\tAn apparatus using mechanical power'], syns:['device', 'mechanism', 'engine']},
{word:'MYSTERY', defs:['n\tSomething unexplained or secret'], syns:['puzzle', 'enigma', 'riddle']},
{word:'NETWORK', defs:['n\tA system of connected things'], syns:['web', 'grid', 'system']},
{word:'OBSERVE', defs:['v\tTo notice or perceive something'], syns:['watch', 'view', 'notice'], ants:['ignore', 'overlook']},
{word:'OPINION', defs:['n\tA view or judgement formed about something'], syns:['view', 'belief', 'judgment']},
{word:'PACKAGE', defs:['n\tAn object wrapped in paper or packaging'], syns:['parcel', 'bundle', 'packet']},
{word:'PATTERN', defs:['n\tA repeated decorative design'], syns:['design', 'motif', 'arrangement']},
{word:'PENALTY', defs:['n\tA punishment for breaking a rule'], syns:['fine', 'sanction', 'forfeit'], ants:['reward', 'award']},
{word:'PERFECT', defs:['adj\tHaving all required elements; without defect'], syns:['flawless', 'ideal', 'impeccable'], ants:['imperfect', 'flawed']},
{word:'PERFORM', defs:['v\tTo carry out or do something'], syns:['execute', 'accomplish', 'do']},
{word:'PERHAPS', defs:['adv\tUsed to express uncertainty'], syns:['maybe', 'possibly', 'potentially']},
{word:'PHYSICS', defs:['n\tThe branch of science concerned with matter and energy'], syns:['natural science']},
{word:'PICTURE', defs:['n\tA painting drawing or photograph'], syns:['image', 'photograph', 'painting']},
{word:'PIONEER', defs:['n\tA person who develops or is first to use something'], syns:['innovator', 'trailblazer', 'founder']},
{word:'PLASTIC', defs:['n\tA synthetic material that can be shaped when heated'], syns:['polymer', 'synthetic']},
{word:'PLATEAU', defs:['n\tAn area of relatively level high ground'], syns:['highland', 'tableland']},
{word:'POPULAR', defs:['adj\tLiked by many people'], syns:['fashionable', 'trendy', 'beloved'], ants:['unpopular', 'obscure']},
{word:'PORTION', defs:['n\tA part or share of something'], syns:['part', 'segment', 'share']},
{word:'POSSESS', defs:['v\tTo have as belonging to one'], syns:['own', 'hold', 'have']},
{word:'POVERTY', defs:['n\tThe state of being extremely poor'], syns:['destitution', 'indigence', 'penury'], ants:['wealth', 'affluence']},
{word:'PREDICT', defs:['v\tTo say what will happen in the future'], syns:['foretell', 'forecast', 'prophesy']},
{word:'PRESENT', defs:['n\tThe present time; a gift; to show or introduce'], syns:['now', 'gift', 'offer'], ants:['past', 'future']},
{word:'PREVENT', defs:['v\tTo keep from happening'], syns:['stop', 'avoid', 'deter'], ants:['allow', 'permit']},
{word:'PRIMARY', defs:['adj\tOf first importance; fundamental'], syns:['main', 'principal', 'chief'], ants:['secondary', 'minor']},
{word:'PRIVATE', defs:['adj\tBelonging to an individual; not for public use'], syns:['personal', 'confidential', 'secret'], ants:['public', 'open']},
{word:'PROBLEM', defs:['n\tA matter difficult to deal with'], syns:['issue', 'difficulty', 'dilemma']},
{word:'PROCESS', defs:['n\tA series of actions to achieve an end'], syns:['procedure', 'method', 'operation']},
{word:'PRODUCT', defs:['n\tAn article made to be sold'], syns:['goods', 'merchandise', 'output']},
{word:'PROGRAM', defs:['n\tA set of coded instructions for a computer'], syns:['software', 'application']},
{word:'PROJECT', defs:['n\tAn individual or collaborative enterprise'], syns:['plan', 'undertaking', 'scheme']},
{word:'PROTECT', defs:['v\tTo keep safe from harm'], syns:['defend', 'shield', 'guard'], ants:['attack', 'harm']},
{word:'PROVIDE', defs:['v\tTo make available; to supply'], syns:['supply', 'furnish', 'deliver']},
{word:'PURPOSE', defs:['n\tThe reason for which something exists'], syns:['intention', 'aim', 'goal']},
{word:'QUALIFY', defs:['v\tTo become eligible for something'], syns:['eligible', 'meet requirements']},
{word:'QUALITY', defs:['n\tThe standard of something'], syns:['excellence', 'caliber', 'standard']},
{word:'QUARTER', defs:['n\tEach of four equal parts; fifteen minutes'], syns:['fourth', 'portion']},
{word:'REALITY', defs:['n\tThe state of things as they actually exist'], syns:['actuality', 'fact', 'truth'], ants:['fantasy', 'illusion']},
{word:'REALIZE', defs:['v\tTo become fully aware of something'], syns:['recognize', 'understand', 'grasp']},
{word:'RECEIVE', defs:['v\tTo be given or paid something'], syns:['get', 'obtain', 'accept'], ants:['give', 'send']},
{word:'REPLACE', defs:['v\tTo take the place of; to substitute'], syns:['substitute', 'swap', 'supplant']},
{word:'REQUEST', defs:['n\tAn act of asking politely for something'], syns:['ask', 'petition', 'appeal']},
{word:'REQUIRE', defs:['v\tTo need for a particular purpose'], syns:['need', 'demand', 'necessitate']},
{word:'RESERVE', defs:['v\tTo retain for future use'], syns:['save', 'keep', 'hold'], ants:['use', 'spend']},
{word:'RESPECT', defs:['n\tA feeling of admiration for someone'], syns:['esteem', 'admiration', 'honor'], ants:['disrespect', 'contempt']},
{word:'RESTORE', defs:['v\tTo return to a former condition'], syns:['repair', 'renew', 'revive'], ants:['damage', 'destroy']},
{word:'RETREAT', defs:['v\tTo move back or withdraw'], syns:['withdraw', 'pull back', 'fall back'], ants:['advance', 'attack']},
{word:'ROMANCE', defs:['n\tA feeling of excitement associated with love'], syns:['love', 'affair', 'passion']},
{word:'SCHOLAR', defs:['n\tA person highly educated in a specific field'], syns:['intellectual', 'academic', 'expert']},
{word:'SCIENCE', defs:['n\tThe study of structure and behavior of the natural world'], syns:['knowledge', 'research']},
{word:'SECTION', defs:['n\tAny of the parts into which something is divided'], syns:['segment', 'part', 'division']},
{word:'SERVANT', defs:['n\tA person who performs duties for another'], syns:['attendant', 'maid', 'butler']},
{word:'SERVICE', defs:['n\tThe action of helping or doing work for someone'], syns:['assistance', 'help', 'support']},
{word:'SESSION', defs:['n\tA meeting for a particular purpose'], syns:['meeting', 'conference', 'assembly']},
{word:'SHELTER', defs:['n\tA place giving temporary protection from danger'], syns:['refuge', 'haven', 'sanctuary']},
{word:'SILENCE', defs:['n\tComplete absence of sound'], syns:['quiet', 'stillness', 'hush'], ants:['noise', 'sound']},
{word:'SIMILAR', defs:['adj\tResembling without being identical'], syns:['alike', 'comparable', 'akin'], ants:['different', 'dissimilar']},
{word:'SOCIETY', defs:['n\tThe community of people living in a country'], syns:['community', 'culture', 'civilization']},
{word:'SOLDIER', defs:['n\tA person who serves in an army'], syns:['warrior', 'fighter', 'troop']},
{word:'SPECIES', defs:['n\tA group of organisms sharing common characteristics'], syns:['type', 'kind', 'variety']},
{word:'STATION', defs:['n\tA regular stopping place on a route'], syns:['stop', 'depot', 'terminal']},
{word:'STORAGE', defs:['n\tThe action of storing something for future use'], syns:['warehousing', 'keeping']},
{word:'STRETCH', defs:['v\tTo extend; to lengthen'], syns:['extend', 'elongate', 'expand'], ants:['shrink', 'contract']},
{word:'STUDENT', defs:['n\tA person learning in school or university'], syns:['pupil', 'learner', 'scholar']},
{word:'SUBJECT', defs:['n\tA branch of knowledge studied'], syns:['topic', 'theme', 'discipline']},
{word:'SUCCESS', defs:['n\tThe accomplishment of a desired aim'], syns:['achievement', 'triumph', 'victory'], ants:['failure', 'defeat']},
{word:'SUGGEST', defs:['v\tTo propose an idea for consideration'], syns:['propose', 'recommend', 'advise']},
{word:'SUPPORT', defs:['v\tTo give assistance; to bear weight'], syns:['assist', 'help', 'back'], ants:['oppose', 'hinder']},
{word:'SURFACE', defs:['n\tThe outside part or uppermost layer'], syns:['face', 'top', 'exterior'], ants:['interior', 'inside']},
{word:'SURVIVE', defs:['v\tTo remain alive despite danger'], syns:['endure', 'live', 'persist'], ants:['perish', 'die']},
{word:'TEACHER', defs:['n\tA person who teaches in a school'], syns:['instructor', 'educator', 'professor']},
{word:'THOUGHT', defs:['n\tAn idea or opinion produced by thinking'], syns:['idea', 'notion', 'thinking']},
{word:'THUNDER', defs:['n\tA loud rumbling sound during a storm'], syns:['boom', 'roar', 'thunderclap']},
{word:'TOURISM', defs:['n\tThe commercial organization of holidays'], syns:['travel', 'visiting']},
{word:'TRAFFIC', defs:['n\tVehicles moving on a road'], syns:['vehicles', 'congestion']},
{word:'TROUBLE', defs:['n\tDifficulty or problems'], syns:['problem', 'difficulty', 'distress'], ants:['ease', 'solution']},
{word:'UNIFORM', defs:['n\tA distinctive outfit worn by members of a group'], syns:['outfit', 'attire', 'costume']},
{word:'UNUSUAL', defs:['adj\tNot habitually or commonly occurring'], syns:['rare', 'uncommon', 'extraordinary'], ants:['common', 'usual']},
{word:'VEHICLE', defs:['n\tA thing used for transporting people or goods'], syns:['transport', 'car', 'conveyance']},
{word:'VENTURE', defs:['n\tA risky or daring journey or undertaking'], syns:['enterprise', 'adventure', 'undertaking']},
{word:'VERSION', defs:['n\tA particular form of something'], syns:['variant', 'edition', 'form']},
{word:'VILLAGE', defs:['n\tA small community in a rural area'], syns:['hamlet', 'township', 'settlement']},
{word:'WARRIOR', defs:['n\tA brave or experienced soldier or fighter'], syns:['fighter', 'soldier', 'combatant']},
{word:'WEATHER', defs:['n\tThe state of the atmosphere at a particular time'], syns:['climate', 'conditions']},
{word:'WEBSITE', defs:['n\tA location on the internet with related web pages'], syns:['site', 'webpage']},
{word:'WELCOME', defs:['v\tTo greet someone in a warm manner'], syns:['greet', 'receive', 'embrace'], ants:['reject', 'ignore']},
{word:'WESTERN', defs:['adj\tSituated in or relating to the west'], syns:['westeward', 'westerly']},
{word:'WHISPER', defs:['v\tTo speak very softly'], syns:['murmur', 'hiss', 'speak softly'], ants:['shout', 'yell']},
{word:'WITNESS', defs:['n\tA person who sees an event; to observe'], syns:['observer', 'spectator', 'onlooker']},
{word:'WRITING', defs:['n\tThe activity or skill of marking letters on a surface'], syns:['script', 'handwriting', 'composition']}
];



// ============================================================
// Crossword Building
// ============================================================
function buildCrossword(rng, wordObjs, gridSize) {
  const grid = Array.from({length: gridSize}, () => Array(gridSize).fill(null));
  const placed = [];

  // Sort by length desc for better placement
  const sorted = [...wordObjs].sort((a,b) => b.word.length - a.word.length);

  function canPlace(word, row, col, dir) {
    const dr = dir === 'across' ? 0 : 1;
    const dc = dir === 'across' ? 1 : 0;
    // Check boundaries
    if (dir === 'across' && col + word.length > gridSize) return false;
    if (dir === 'down' && row + word.length > gridSize) return false;
    // Check before first letter
    const pr = row - dr, pc = col - dc;
    if (pr >= 0 && pc >= 0 && grid[pr][pc] !== null) return false;
    // Check after last letter
    const er = row + dr * word.length, ec = col + dc * word.length;
    if (er < gridSize && ec < gridSize && grid[er][ec] !== null) return false;

    let intersections = 0;
    for (let i = 0; i < word.length; i++) {
      const r = row + dr * i, c = col + dc * i;
      const existing = grid[r][c];
      if (existing !== null) {
        if (existing !== word[i]) return false;
        intersections++;
        // Check perpendicular neighbors don't conflict
      } else {
        // Check perpendicular cells aren't occupied (would create illegal adjacency)
        const pr2 = r + dc, pc2 = c + dr; // perpendicular
        const pr3 = r - dc, pc3 = c - dr;
        if (placed.length > 0) {
          if (pr2 >= 0 && pr2 < gridSize && pc2 >= 0 && pc2 < gridSize && grid[pr2][pc2] !== null) return false;
          if (pr3 >= 0 && pr3 < gridSize && pc3 >= 0 && pc3 < gridSize && grid[pr3][pc3] !== null) return false;
        }
      }
    }
    return placed.length === 0 || intersections > 0;
  }

  function placeWord(wordObj, row, col, dir) {
    const word = wordObj.word;
    const dr = dir === 'across' ? 0 : 1;
    const dc = dir === 'across' ? 1 : 0;
    for (let i = 0; i < word.length; i++) {
      grid[row + dr * i][col + dc * i] = word[i];
    }
    placed.push({ ...wordObj, row, col, dir, number: 0 });
  }

  // Place first word in center
  if (sorted.length === 0) return null;
  const firstWord = sorted[0];
  const startRow = Math.floor(gridSize / 2);
  const startCol = Math.floor((gridSize - firstWord.word.length) / 2);
  placeWord(firstWord, startRow, startCol, 'across');

  // Place remaining words
  for (let wi = 1; wi < sorted.length && placed.length < 20; wi++) {
    const wordObj = sorted[wi];
    const word = wordObj.word;
    let bestPlacements = [];

    // Find all valid placements using intersections
    for (const p of placed) {
      const pw = p.word;
      for (let li = 0; li < word.length; li++) {
        for (let pi = 0; pi < pw.length; pi++) {
          if (word[li] === pw[pi]) {
            const newDir = p.dir === 'across' ? 'down' : 'across';
            let r, c;
            if (newDir === 'across') {
              r = p.row + (p.dir === 'down' ? pi : 0);
              c = (p.dir === 'down' ? p.col : p.col + pi) - li;
            } else {
              r = (p.dir === 'across' ? p.row : p.row + pi) - li;
              c = p.col + (p.dir === 'across' ? pi : 0);
            }
            if (r >= 0 && c >= 0 && canPlace(word, r, c, newDir)) {
              bestPlacements.push({r, c, dir: newDir});
            }
          }
        }
      }
    }

    if (bestPlacements.length > 0) {
      const pick = bestPlacements[rng.nextMax(bestPlacements.length)];
      placeWord(wordObj, pick.r, pick.c, pick.dir);
    }
  }

  if (placed.length < 4) return null;

  // Number the cells
  let num = 1;
  const numbered = {};
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (grid[r][c] === null) continue;
      const startsAcross = (c === 0 || grid[r][c-1] === null) && c + 1 < gridSize && grid[r][c+1] !== null;
      const startsDown = (r === 0 || grid[r-1][c] === null) && r + 1 < gridSize && grid[r+1][c] !== null;
      if (startsAcross || startsDown) {
        numbered[`${r},${c}`] = num++;
      }
    }
  }

  // Assign numbers to placed words
  for (const p of placed) {
    p.number = numbered[`${p.row},${p.col}`] || 0;
  }

  return { grid, placed, gridSize, numbered };
}

// ============================================================
// Clue Generation
// ============================================================
function generateClue(wordObj, rng, encryptType) {
  const defs = wordObj.defs || [];
  const syns = wordObj.syns || [];
  const ants = wordObj.ants || [];

  // Decide clue type — fall back gracefully if no syns/ants
  let availableTypes = ['definition'];
  if (syns.length > 0) availableTypes.push('synonym');
  if (ants.length > 0) availableTypes.push('antonym');
  console.log("Available clue types for", wordObj.word, ":", availableTypes);
  const ctype = availableTypes[rng.nextMax(availableTypes.length)];

  let clueText = '';
  let displayType = ctype;

  if (ctype === 'definition' && defs.length > 0) {
    const rawDef = defs[rng.nextMax(defs.length)];
    clueText = rawDef.replace(/^[a-z]\t/, '').trim() || `Definition of ${wordObj.word}`;
  } else if (ctype === 'synonym' && syns.length > 0) {
    // Pick 1–2 synonyms as the clue
    const shuffled = [...syns].sort(() => rng.nextDouble() - 0.5);
    const count = Math.min(2, shuffled.length);
    clueText = shuffled.slice(0, count).join(' / ');
  } else if (ctype === 'antonym' && ants.length > 0) {
    // Pick 1–2 antonyms as the clue
    const shuffled = [...ants].sort(() => rng.nextDouble() - 0.5);
    const count = Math.min(2, shuffled.length);
    clueText = 'Opposite of: ' + shuffled.slice(0, count).join(' / ');
  } else {
    // Fallback
    const rawDef = defs.length > 0 ? defs[rng.nextMax(defs.length)] : '';
    clueText = rawDef.replace(/^[a-z]\t/, '').trim() || `${wordObj.word.length}-letter word`;
    displayType = 'definition';
  }

  // Encrypt if needed
  let encrypted = false;
  let encryptedText = clueText;
  let encryptLabel = '';

  if (encryptType === 'pigpen') {
    encryptedText = clueText;
    encrypted = true;
    encryptLabel = 'pigpen';
    displayType = 'answer';
  } else if (encryptType === 'caesar') {
    const shift = rng.nextMax(ASCII_CHARS.length);
    encryptedText = caesarEncrypt(clueText, shift);
    encrypted = true;
    encryptLabel = `caesar+${shift}`;
    displayType = 'answer';
  } else if (encryptType === 'playfair') {
    encryptedText = playfairEncrypt(clueText);
    encrypted = true;
    encryptLabel = 'playfair';
    displayType = 'answer';
  } else if (encryptType === 'hex') {
    encryptedText = hexEncrypt(clueText);
    encrypted = true;
    encryptLabel = 'hex';
    displayType = 'answer';
  }

  return { clueText, encryptedText, encrypted, encryptLabel, displayType };
}

// ============================================================
// Encryption Functions
// ============================================================
function caesarEncrypt(text, shift) {
  return text.split('').map(ch => {
    const idx = ASCII_CHARS.indexOf(ch);
    if (idx === -1) return ch;
    return ASCII_CHARS[(idx + shift) % ASCII_CHARS.length];
  }).join('');
}

function hexEncrypt(text) {
  return text.split('').map(c => c.charCodeAt(0).toString(16).padStart(2,'0')).join(' ').toUpperCase();
}

function playfairEncrypt(text) {
  // 10x9 Polybius square
  const square = [];
  for (let i = 0; i < 10; i++) {
    square[i] = [];
    for (let j = 0; j < 9; j++) {
      square[i][j] = ASCII_CHARS[i + j * 10];
    }
  }
  const findCoords = ch => {
    for (let i = 0; i < 10; i++)
      for (let j = 0; j < 9; j++)
        if (square[i][j] === ch) return [i, j];
    return null;
  };
  const coords = text.split('').map(findCoords);
  let result = '';
  for (let i = 0; i < coords.length; i += 2) {
    const a = coords[i];
    if (!a) { result += text[i] || ''; continue; }
    const b = coords[i+1];
    if (!b) { result += square[a[0]][a[1]]; continue; }
    if (a[0] === b[0] && a[1] === b[1]) {
      result += square[a[0]][a[1]] + square[b[0]][b[1]];
    } else if (a[1] === b[1]) {
      result += square[(a[0]+1)%10][a[1]] + square[(b[0]+1)%10][b[1]];
    } else if (a[0] === b[0]) {
      result += square[a[0]][(a[1]+1)%9] + square[b[0]][(b[1]+1)%9];
    } else {
      result += square[a[0]][b[1]] + square[b[0]][a[1]];
    }
  }
  return result;
}

function encryptWord(word, encryptType, rng) {
  switch (encryptType) {
    case 'caesar':
      const shift = rng.nextMax(ASCII_CHARS.length);
      return caesarEncrypt(word, shift);
    case 'playfair':
      return playfairEncrypt(word);
    case 'hex':
      return hexEncrypt(word);
    case 'pigpen':
      return word; // pigpen is a font, not a transformation; we'll keep the word as-is
    default:
      return word;
  }
}

// ============================================================
// Rendering
// ============================================================
function renderPuzzle(puzzle, rng, seed) {
  const { grid, placed, gridSize, numbered } = puzzle;
  const maxWidth = 480;
  const cellSize = Math.min(48, Math.floor(maxWidth / gridSize));

  

  // Determine which clues get encryption (rare — ~15%)
  const encryptCount = Math.min(2, placed.length);
  const encryptIndices = new Set();
  const placedCopy = [...placed];
  while (encryptIndices.size < encryptCount) {
    encryptIndices.add(rng.nextMax(placedCopy.length));
  }

  // Sort placed by number
  const acrossClues = placed.filter(p => p.dir === 'across').sort((a,b) => a.number - b.number);
  const downClues = placed.filter(p => p.dir === 'down').sort((a,b) => a.number - b.number);

  // Build grid HTML
  const gridEl = document.getElementById('cw-crosswordGrid');
  gridEl.style.gridTemplateColumns = `repeat(${gridSize}, ${cellSize}px)`;
  gridEl.style.gridTemplateRows = `repeat(${gridSize}, ${cellSize}px)`;
  gridEl.innerHTML = '';

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.r = r;
      cell.dataset.c = c;

      if (grid[r][c] === null) {
        cell.classList.add('black');
      } else {
        const numKey = `${r},${c}`;
        if (numbered[numKey]) {
          const numSpan = document.createElement('span');
          numSpan.className = 'cell-number';
          numSpan.textContent = numbered[numKey];
          cell.appendChild(numSpan);
        }
        const inp = document.createElement('input');
        inp.type = 'text';
        inp.maxLength = 1;
        inp.className = 'cell-input';
        inp.dataset.answer = grid[r][c];
        inp.dataset.r = r;
        inp.dataset.c = c;
        inp.addEventListener('input', onCellInput);
        inp.addEventListener('mousedown', () => onCellMousedown(r, c));
        inp.addEventListener('focus', () => onCellFocus(r, c));
        inp.addEventListener('keydown', onCellKeydown);
        cell.appendChild(inp);
      }
      gridEl.appendChild(cell);
    }
  }

  // Build clues
  const acrossEl = document.getElementById('cw-cluesAcross');
  const downEl = document.getElementById('cw-cluesDown');
  acrossEl.innerHTML = '';
  downEl.innerHTML = '';

  let encIdx = 0;
  const allPlaced = [...placed];

  function buildClueEl(p, idx) {
    const isEncrypted = encryptIndices.has(allPlaced.indexOf(p));
    const finalEncrypt = isEncrypted ? (['pigpen','caesar','playfair','hex'][rng.nextMax(4)]) : 'none';

    const clueData = generateClue(p, rng, finalEncrypt);

    const div = document.createElement('div');
    div.className = 'clue-item';
    div.style.userSelect = 'none';
    div.dataset.r = p.row;
    div.dataset.c = p.col;
    div.dataset.dir = p.dir;

    const numSpan = document.createElement('span');
    numSpan.className = 'clue-num';
    numSpan.textContent = p.number + '.';

    const typeSpan = document.createElement('span');
    typeSpan.className = `clue-type ${clueData.displayType}`;
    typeSpan.textContent = clueData.displayType;

    const textSpan = document.createElement('span');

    // If the clue is encrypted, we show the encrypted word (answer) instead of the encrypted clue
    if (clueData.encrypted) {
      const encryptedWord = encryptWord(p.word, finalEncrypt, rng);
      if (finalEncrypt === 'pigpen') {
        textSpan.className = 'pigpen-text';
        textSpan.style.fontFamily = 'ASCIIPigpen-Regular';
        textSpan.style.letterSpacing = '0.1em';
        textSpan.textContent = encryptedWord;
      } else {
        textSpan.innerHTML = `<span class="encryption-block">[${clueData.encryptLabel.toUpperCase()}] ${escHtml(encryptedWord)}</span>`;
      }
    } else {
      textSpan.textContent = clueData.clueText;
    }

    div.appendChild(numSpan);
    div.appendChild(typeSpan);
    if (clueData.encrypted) {
      const etag = document.createElement('span');
      etag.className = 'encrypt-tag';
      etag.textContent = clueData.encryptLabel;
      div.appendChild(etag);
    }
    div.appendChild(textSpan);

    div.addEventListener('click', () => {
      document.querySelectorAll('.clue-item').forEach(el => el.classList.remove('active'));
      div.classList.add('active');
      cwActiveDir = p.dir;
      const dr = p.dir === 'across' ? 0 : 1;
      const dc = p.dir === 'across' ? 1 : 0;
      // Find first empty cell (or first cell if all filled)
      let targetR = p.row, targetC = p.col;
      for (let i = 0; i < p.word.length; i++) {
        const inp = getCellInput(p.row + dr*i, p.col + dc*i);
        if (inp && !inp.value) { targetR = p.row + dr*i; targetC = p.col + dc*i; break; }
      }
      cwFocusedR = targetR;
      cwFocusedC = targetC;
      highlightWord(p.row, p.col, p.dir, p.word.length, targetR, targetC);
      const inp = getCellInput(targetR, targetC);
      if (inp) inp.focus();
    });
    return div;
  }

  acrossClues.forEach((p, i) => acrossEl.appendChild(buildClueEl(p, i)));
  downClues.forEach((p, i) => downEl.appendChild(buildClueEl(p, i)));

  // Show UI
  document.getElementById('cw-puzzleContainer').classList.add('visible');
  document.getElementById('cw-infoBar').style.display = 'flex';
  document.getElementById('cw-checkRow').style.display = 'flex';
  document.getElementById('cw-chipSize').textContent = `${gridSize}×${gridSize} grid`;
  document.getElementById('cw-chipWords').textContent = `${placed.length} words`;
  document.getElementById('cw-chipEncrypt').textContent = `${encryptCount} encrypted clue${encryptCount !== 1 ? 's' : ''}`;
  document.getElementById('cw-gridTitle').textContent = `Crossword — Seed ${seed}`;
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getCellInput(r, c) {
  return document.querySelector(`.cell-input[data-r="${r}"][data-c="${c}"]`);
}

function highlightWord(row, col, dir, len, focusedR, focusedC) {
  document.querySelectorAll('.cell').forEach(el => el.classList.remove('highlighted', 'active', 'focused-cell'));
  const dr = dir === 'across' ? 0 : 1;
  const dc = dir === 'across' ? 1 : 0;
  for (let i = 0; i < len; i++) {
    const r = row + dr*i, c = col + dc*i;
    const cell = document.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.classList.add('highlighted');
      if (focusedR === r && focusedC === c) cell.classList.add('focused-cell');
    }
  }
}

// Tracks the current typing direction ('across' or 'down') and focused cell
let cwActiveDir = 'across';
let cwFocusedR = -1;
let cwFocusedC = -1;

// Called only on genuine user click — handles direction toggling at intersections
function onCellMousedown(r, c) {
  if (!currentPuzzle) return;
  const acrossWord = currentPuzzle.placed.find(p => p.dir === 'across' && p.row === r && c >= p.col && c < p.col + p.word.length);
  const downWord   = currentPuzzle.placed.find(p => p.dir === 'down'   && p.col === c && r >= p.row && r < p.row + p.word.length);

  if (r === cwFocusedR && c === cwFocusedC && acrossWord && downWord) {
    // Same intersection cell clicked again — toggle direction
    cwActiveDir = cwActiveDir === 'across' ? 'down' : 'across';
  } else {
    // New cell — keep current direction if valid, otherwise use whichever exists
    if (cwActiveDir === 'across' && !acrossWord && downWord) cwActiveDir = 'down';
    else if (cwActiveDir === 'down' && !downWord && acrossWord) cwActiveDir = 'across';
  }
  cwFocusedR = r;
  cwFocusedC = c;
  // Explicitly re-highlight: if the input is already focused, the focus event won't re-fire
  onCellFocus(r, c);
}

// Called on every focus (including browser tab-back, programmatic advance) — only highlights, never toggles
function onCellFocus(r, c) {
  if (!currentPuzzle) return;
  const acrossWord = currentPuzzle.placed.find(p => p.dir === 'across' && p.row === r && c >= p.col && c < p.col + p.word.length);
  const downWord   = currentPuzzle.placed.find(p => p.dir === 'down'   && p.col === c && r >= p.row && r < p.row + p.word.length);

  // Only force a direction switch if the current direction has no word at this cell
  if (cwActiveDir === 'across' && !acrossWord && downWord) cwActiveDir = 'down';
  else if (cwActiveDir === 'down' && !downWord && acrossWord) cwActiveDir = 'across';

  const p = cwActiveDir === 'across' ? (acrossWord || downWord) : (downWord || acrossWord);
  if (p) {
    highlightWord(p.row, p.col, p.dir, p.word.length, r, c);
    document.querySelectorAll('.clue-item').forEach(el => el.classList.remove('active'));
    const clueEl = document.querySelector(`.clue-item[data-r="${p.row}"][data-c="${p.col}"][data-dir="${p.dir}"]`);
    if (clueEl) clueEl.classList.add('active');
  }
}

function onCellInput(e) {
  const inp = e.target;
  inp.value = inp.value.toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
  // Clear check highlights from every cell in the grid
  document.querySelectorAll('.cell-input').forEach(el => el.classList.remove('correct', 'incorrect'));
  const banner = document.getElementById('cw-completionBanner');
  if (banner) banner.remove();
  cw_setStatus('', '');
  // Auto-advance along the active direction only
  const r = parseInt(inp.dataset.r);
  const c = parseInt(inp.dataset.c);
  if (inp.value) {
    // Find the word in the active direction
    const activeWord = currentPuzzle?.placed.find(p =>
      p.dir === cwActiveDir &&
      (cwActiveDir === 'across'
        ? (p.row === r && c >= p.col && c < p.col + p.word.length)
        : (p.col === c && r >= p.row && r < p.row + p.word.length))
    );
    const p = activeWord;
    if (p) {
      const dr = p.dir === 'across' ? 0 : 1;
      const dc = p.dir === 'across' ? 1 : 0;
      const nr = r + dr, nc = c + dc;
      const stillInWord = cwActiveDir === 'across'
        ? (p.row === nr && nc >= p.col && nc < p.col + p.word.length)
        : (p.col === nc && nr >= p.row && nr < p.row + p.word.length);
      const nextInp = getCellInput(nr, nc);
      if (nextInp && stillInWord) {
        // Update focused coords before focusing so the toggle logic doesn't fire
        cwFocusedR = nr;
        cwFocusedC = nc;
        nextInp.focus();
      }
    }
  }
  // Auto-check for completion
  const allInputs = document.querySelectorAll('.cell-input');
  const allFilled = [...allInputs].every(i => i.value.length > 0);
  if (allFilled) {
    const allCorrect = [...allInputs].every(i => i.value.toUpperCase() === i.dataset.answer);
    if (allCorrect) showCompletionBanner();
  }
}

function onCellKeydown(e) {
  const inp = e.target;
  const r = parseInt(inp.dataset.r);
  const c = parseInt(inp.dataset.c);
  const moves = { ArrowRight:[0,1], ArrowLeft:[0,-1], ArrowDown:[1,0], ArrowUp:[-1,0] };
  if (moves[e.key]) {
    e.preventDefault();
    const [dr,dc] = moves[e.key];
    const nextInp = getCellInput(r+dr, c+dc);
    if (nextInp) nextInp.focus();
  }
  if (e.key === 'Backspace') {
    e.preventDefault();
    const activeWord = currentPuzzle?.placed.find(p =>
      p.dir === cwActiveDir &&
      (cwActiveDir === 'across'
        ? (p.row === r && c >= p.col && c < p.col + p.word.length)
        : (p.col === c && r >= p.row && r < p.row + p.word.length))
    );
    const p = activeWord;
    if (p) {
      const dr = p.dir === 'across' ? 0 : 1;
      const dc = p.dir === 'across' ? 1 : 0;
      if (inp.value) {
        // Cell has a value: delete it and stay on this cell
        inp.value = '';
        inp.classList.remove('correct', 'incorrect');
      } else {
        // Cell is empty: move to previous cell and clear it
        const pr = r - dr, pc = c - dc;
        const prevInp = getCellInput(pr, pc);
        if (prevInp) {
          prevInp.value = '';
          prevInp.classList.remove('correct', 'incorrect');
          cwFocusedR = pr;
          cwFocusedC = pc;
          prevInp.focus();
        }
      }
      const banner = document.getElementById('cw-completionBanner');
      if (banner) banner.remove();
      cw_setStatus('', '');
    }
  }
}


function cw_checkAnswers() {
  if (!currentPuzzle) return;
  let correct = 0, total = 0;
  document.querySelectorAll('.cell-input').forEach(inp => {
    total++;
    const isCorrect = inp.value.toUpperCase() === inp.dataset.answer;
    if (isCorrect) {
      inp.classList.add('correct');
      inp.classList.remove('incorrect');
      correct++;
    } else if (inp.value) {
      inp.classList.add('incorrect');
      inp.classList.remove('correct');
    } else {
      inp.classList.remove('correct', 'incorrect');
    }
  });

  if (correct === total) {
    showCompletionBanner();
  } else {
    // Remove any existing completion banner if present
    const banner = document.getElementById('cw-completionBanner');
    if (banner) banner.remove();
    cw_setStatus(`${correct}/${total} correct`, '');
  }
}

function showCompletionBanner() {
  if (document.getElementById('cw-completionBanner')) return;
  const phone = currentCompletionPhone || '(555) 000-0000';
  const banner = document.createElement('div');
  banner.id = 'cw-completionBanner';
  banner.style.cssText = 'background:#fff;border:2px solid #000;padding:12px 16px;text-align:center;margin:8px 0;border-radius:2px';
  banner.innerHTML = `
    <div style="font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#000;margin-bottom:6px">&#10003; Puzzle Complete!</div>
    <div style="font-size:0.7rem;color:#6b6b6b;margin-bottom:6px">A phone number has been provided. Call it to receive your next clue.</div>
    <div style="font-family:'Courier New',monospace;font-size:1.1rem;font-weight:700;color:#326891;letter-spacing:0.1em;margin:6px 0">${phone}</div>
    <button onclick="cwDialPhone('${phone}')" style="margin-top:8px;background:#1a1a1a;color:#fff;border:none;padding:5px 14px;font-size:0.7rem;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;cursor:pointer;border-radius:2px">Call Now &#128222;</button>
  `;
  const container = document.getElementById('cw-puzzleContainer');
  if (container) container.insertBefore(banner, container.firstChild);
}

function cw_revealAll() {
  document.querySelectorAll('.cell-input').forEach(inp => {
    inp.value = inp.dataset.answer;
	inp.style.color = 'var(--ink)';
  });
  cw_setStatus('Puzzle revealed!', '');
}

function cw_resetPuzzle() {
  document.querySelectorAll('.cell-input').forEach(inp => {
    inp.value = '';
    inp.style.color = 'var(--ink)';
    inp.classList.remove('correct', 'incorrect');
  });
  const banner = document.getElementById('cw-completionBanner');
  if (banner) banner.remove();
  cw_setStatus('Grid reset.', '');
}

function cw_setStatus(msg, cls) {
  const el = document.getElementById('cw-status');
  el.innerHTML = msg;
  el.className = 'status ' + (cls || '');
}

function wrdAppendGuessRow(countStr, len) {
  const ts = Math.max(11, Math.min(24, Math.floor(280 / len)));
  const fs = Math.max(7, ts - 4);
  const pad = n => String(n).padStart(2,"0");
  const cols = Array.from({length: len}, (_, i) => `
    <div class="wrd-col">
      <div class="wrd-tile" id="wt-${countStr}-${pad(i)}"
           style="width:${ts}px;height:${ts}px;font-size:${fs}px"></div>
      <div class="wrd-fb"  id="wf-${countStr}-${pad(i)}"
           style="width:${ts}px;height:${Math.max(6,fs)}px;font-size:${fs}px"></div>
    </div>`).join("");
  const row = document.createElement("div");
  row.style.cssText = "text-align:center;overflow-x:auto;margin-bottom:2px;white-space:nowrap";
  row.innerHTML = cols;
  document.getElementById("wrd-body").appendChild(row);
}

document.addEventListener("keydown", handleKeyDown);
const WORDLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789./";

function handleKeyDown(event) {
  if (!state.typable || !state.isWordle) return;
  const key = event.key;
  if (![...WORDLE_CHARS, "Backspace", "Enter"].includes(key)) return;

  const pad = n => String(n).padStart(2,"0");
  const countStr = pad(state.wordle1);

  if (key === "Backspace") {
    if (state.wordle2 > 0) {
      state.wordle2--;
      const tile = document.getElementById(`wt-${countStr}-${pad(state.wordle2)}`);
      if (tile) { tile.textContent = ""; tile.classList.remove("filled"); }
    }
    return;
  }

  if (key === "Enter") {
    if (state.wordle2 < state.linkLength) {
      const body = document.getElementById("wrd-body");
      const msg = document.getElementById("wrd-msg");
      if (!msg && body) {
        const m = document.createElement("p");
        m.id = "wrd-msg";
        m.style.cssText = "font-size:9px;text-align:center;color:#787c7e;margin:2px 0";
        m.textContent = "Not enough characters — try again.";
        body.appendChild(m);
        setTimeout(() => m.remove(), 1500);
      }
      return;
    }

    // Animate tiles and reveal feedback one by one
    state.typable = false;
    const FLIP_MS = 500, GAP_MS = 120;
    let allCorrect = true;
    for (let i = 0; i < state.linkLength; i++) {
      const tile = document.getElementById(`wt-${countStr}-${pad(i)}`);
      const fb   = document.getElementById(`wf-${countStr}-${pad(i)}`);
      const guess = tile?.textContent || "";
      const ans   = state.eventLink[i];
      const correct = guess === ans;
      if (!correct) allCorrect = false;

      const delay = i * GAP_MS;
      setTimeout(() => {
        if (!tile) return;
        tile.classList.add(correct ? "correct" : "wrong");
        // Show feedback after the flip completes
        setTimeout(() => {
          if (!fb) return;
          fb.textContent = correct ? "✓" : (WORDLE_CHARS.indexOf(guess) > WORDLE_CHARS.indexOf(ans) ? "←" : "→");
          fb.classList.add("visible", correct ? "correct" : "wrong");
        }, FLIP_MS);
      }, delay);
    }

    const totalDelay = (state.linkLength - 1) * GAP_MS + FLIP_MS + 100;
    setTimeout(() => {
      state.wordleCounter++;
      const newCount = pad(state.wordleCounter);
      if (allCorrect) {
        const body = document.getElementById("wrd-body");
        if (body) {
          const m = document.createElement("p");
          m.style.cssText = "font-size:9px;text-align:center;color:#538d4e;margin:4px 0;font-weight:700";
          m.textContent = "Correct! Navigate to the link.";
          body.appendChild(m);
        }
        state.typable = false;
      } else {
        wrdAppendGuessRow(newCount, state.linkLength);
        initialHTML = html.innerHTML;
        state.wordle2 = 0;
        state.wordle1 = state.wordleCounter;
        state.typable = true;
      }
    }, totalDelay);
    return;
  }

  if (state.wordle2 < state.linkLength) {
    const tile = document.getElementById(`wt-${countStr}-${pad(state.wordle2)}`);
    if (tile) { tile.textContent = key; tile.classList.add("filled"); }
    state.wordle2++;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZZINGTON
// ─────────────────────────────────────────────────────────────────────────────

const QUIZZINGTON_CONTACT = `<div class="qz-contact"><p>&#9993; quizzingtonj.puzzle@tormail.onion</p></div>`;

function prepQuizzington(n, seed, puzzle) {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; document.getElementsByClassName("monitor")[0].classList.remove("quizzingtonback"); });
  html.innerHTML = `${windowBar()}
  <div class="qz-wrap">
    <div class="qz-header">
      <div class="qz-logo">&#129504; Quizzington</div>
      <div class="qz-sub">COMMUNITY PUZZLE CONTEST</div>
    </div>
    <div class="qz-body"><div id="quizzington"></div></div>
  </div>`;
  setWinTitle("Quizzington");
  document.getElementsByClassName("monitor")[0].classList.add("quizzingtonback");
  initialHTML = html.innerHTML;
  const rng = new MonoRandom(combinedSeed(n));
  const puzzleFns = { sequence: quizzingtonSequence, find8: quizzingtonFind8, numbers: quizzingtonNumbers, static: quizzingtonStatic, colorbynumber: quizzingtonColorByNumber };
  (puzzleFns[puzzle] || quizzingtonSequence)(rng);
}

const QUIZ_DISCLAIMER = `<div class="qz-disclaimer">The <b>first person</b> to find the answer will win <b>25 cents</b>. Send answer via the contact below. <b>Multiple or incorrect answers</b> result in disqualification.</div>`;

function quizzingtonSequence(ruleseed) {
  const degree  = ruleseed.next(1,3);
  const formula = Array.from({length:3}, () => ruleseed.nextMax(10));
  const n       = ruleseed.next(50,200);
  const start   = ruleseed.next(1,99999);
  const seq     = Array.from({length:n}, (_,i) => (start + formula[0]*i + formula[1]*i*i + formula[2]*i*i*i) % 100000);
  document.getElementById("quizzington").innerHTML = QUIZ_DISCLAIMER + `<div class="qz-puzzle-box"><div class="qz-puzzle-label">Sequence Puzzle</div><div class="qz-puzzle-data">${seq.join(",")},???</div></div>` + QUIZZINGTON_CONTACT + `<div style="font-size:8px;color:#666;margin-top:4px">Subject: "Sequence" &nbsp;|&nbsp; Message: the next number</div>`;
}

function quizzingtonFind8(ruleseed) {
  const n      = ruleseed.next(1,30);
  const pairs  = ["03","69","25","17"];
  const pair   = pairs[ruleseed.nextMax(4)];
  const hidden = ruleseed.nextMax(8);
  const rows   = Array.from({length:30}, (_,r) =>
    Array.from({length:8}, (_,c) => r===n-1 && c===hidden ? "8" : pair[ruleseed.nextMax(2)]).join("")
  ).join("<br>");
  document.getElementById("quizzington").innerHTML = QUIZ_DISCLAIMER + `<div class="qz-puzzle-box"><div class="qz-puzzle-label">Find the 8</div><div class="qz-puzzle-data" style="line-height:1.3">${rows}</div></div>` + QUIZZINGTON_CONTACT + `<div style="font-size:8px;color:#666;margin-top:4px">Subject: "Find 8" &nbsp;|&nbsp; Message: row,col (1-indexed)</div>`;
}

function quizzingtonNumbers(ruleseed) {
  const missing = ruleseed.next(1,100);
  const pool    = Array.from({length:100}, (_,i) => String(i).padStart(2,"0")).filter(n=>n!==String(missing).padStart(2,"0"));
  shuffleArray(pool);
  document.getElementById("quizzington").innerHTML = QUIZ_DISCLAIMER + `<div class="qz-puzzle-box"><div class="qz-puzzle-label">Find the Missing Number</div><div class="qz-puzzle-data">${pool.join(" ")}</div></div>` + QUIZZINGTON_CONTACT + `<div style="font-size:8px;color:#666;margin-top:4px">Subject: "Numbers" &nbsp;|&nbsp; Message: ## (zero-padded)</div>`;
}

function shuffleArray(arr) {
  for (let i = arr.length-1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]] = [arr[j],arr[i]];
  }
  return arr;
}

let staticAnimRunning = false;

function quizzingtonStatic(ruleseed) {
  state.staticWord = getWordlist(ruleseed);
  document.getElementById("quizzington").innerHTML = QUIZ_DISCLAIMER +
    `<div class="qz-puzzle-box"><div class="qz-puzzle-label">Static — find the hidden word</div><canvas id="staticcanvas" width="300" height="200" style="display:block;margin:4px auto;border-radius:2px"></canvas></div>` +
    QUIZZINGTON_CONTACT + `<div style="font-size:8px;color:#666;margin-top:4px">Subject: "Static" &nbsp;|&nbsp; Message: the hidden word</div>`;
  updateTextStatic();
  if (!staticAnimRunning) animate();
}

function getWordlist(ruleseed) {
  const rng = new MonoRandom(ruleseed.seed);
  const idx = rng.nextMax(5);
  return wordlist[idx][rng.nextMax(wordlist[idx].length)];
}

function generateTextStatic(text, fontSize, w, h) {
  const c = document.createElement("canvas");
  c.width = w; c.height = h;
  const ctx = c.getContext("2d");

  let actualFontSize = fontSize;
  ctx.font = `${actualFontSize}px Arial`;
  while (ctx.measureText(text).width > w - 20 && actualFontSize > 10) {
    actualFontSize--;
    ctx.font = `${actualFontSize}px Arial`;
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "white";
  ctx.fillText(text, w/2, h/2);

  const img = ctx.getImageData(0, 0, w, h);
  for (let i = 0; i < img.data.length; i += 4)
    if (img.data[i] || img.data[i+1] || img.data[i+2]) { const g = Math.random() * 150; img.data[i] = img.data[i+1] = img.data[i+2] = g; }
  ctx.putImageData(img, 0, 0);
  return c;
}

function updateTextStatic() {
  const cv = document.getElementById("staticcanvas");
  if (cv) state.staticTextCanvas = generateTextStatic(state.staticWord, 70, cv.width, cv.height);
}

function animate() {
  staticAnimRunning = true;
  const cv = document.getElementById("staticcanvas");
  if (!cv) { staticAnimRunning = false; return; }
  const ctx = cv.getContext("2d");
  ctx.clearRect(0,0,cv.width,cv.height);
  const bg = ctx.createImageData(cv.width,cv.height);
  for (let i=0;i<bg.data.length;i+=4) { const g=Math.random()*150; bg.data[i]=bg.data[i+1]=bg.data[i+2]=g; bg.data[i+3]=255; }
  ctx.putImageData(bg,0,0);
  if (state.staticTextCanvas) ctx.drawImage(state.staticTextCanvas,0,0);
  if (++state.frameCount >= 7) { updateTextStatic(); state.frameCount = 0; }
  requestAnimationFrame(animate);
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZZINGTON — COLOR-BY-NUMBER  (v4)
// ─────────────────────────────────────────────────────────────────────────────
//
// INTEGRATION (puzzles.js):
//   1. Paste after the existing Quizzington section.
//   2. Add to prepQuizzington() puzzleFns: colorByNumber: quizzingtonColorByNumber
//   3. Add to validateQuizzingtonAnswer():
//        case "color-by-number":
//          if (!/^[0-9a-f]{6}$/i.test(message.trim()))
//            return "Answer must be a 6-digit hex color (e.g. a3f02b).";
//          return null;
//   4. Add "Color-By-Number" to subjects[] in mail.js.
//
// ─────────────────────────────────────────────────────────────────────────────
//
// DESIGN:
//   Five labeled regions: one per color (1–4) plus the unknown (?).
//   The ambassadors (1–4) are NOT required to be adjacent to ?.
//   Instead, uniqueness is verified by a constraint-propagation solver that
//   exactly simulates human logic:
//
//     Known set K = { ambassador regions with their colors }.
//     Repeat:
//       For each unlabeled region R not yet in K:
//         Count how many distinct colors appear among R's neighbors that are in K.
//         If 3 distinct colors appear → R's color is forced (the 4th). Add to K.
//     Until no progress.
//     ? is solvable iff it ends up in K.
//
//   Ambassador placement is chosen (from a small candidate search) to maximize
//   the number of propagation steps required before ? is forced, subject to
//   the puzzle being uniquely solvable. This produces the most "interesting"
//   puzzle while still guaranteeing a unique answer.
//
// ─────────────────────────────────────────────────────────────────────────────

const CBN_W = 360;
const CBN_H = 270;
 
// ── Color generation (unchanged) ──────────────────────────────────────────────
function cbnGenerateColors(rng) {
  const MIN_DIST = 120;
  function wDist(a, b) {
    const dr=a[0]-b[0], dg=a[1]-b[1], db=a[2]-b[2], rm=(a[0]+b[0])/2;
    return Math.sqrt((2+rm/256)*dr*dr + 4*dg*dg + (2+(255-rm)/256)*db*db);
  }
  for (;;) {
    const raw = Array.from({length:4}, () => [rng.nextMax(256), rng.nextMax(256), rng.nextMax(256)]);
    let ok = true;
    outer: for (let i=0;i<4;i++)
      for (let j=i+1;j<4;j++)
        if (wDist(raw[i],raw[j]) < MIN_DIST) { ok=false; break outer; }
    if (ok) return raw.map(([r,g,b]) => ((r<<16)|(g<<8)|b).toString(16).padStart(6,'0'));
  }
}
 
// ── Seed generation — jittered grid, integer arithmetic ───────────────────────
// RNG: GX*GY*2 nextMax calls + (GX*GY-1) shuffle calls.
// Seeds kept well inside canvas (MARGIN px from each edge) so all cells are
// large enough to label, and sentinels can anchor boundary circumcenters.
function cbnGenerateSeeds(rng, count) {
  const MARGIN = 20; // px from canvas edge — real seeds never closer than this
  const W = CBN_W - 2*MARGIN;
  const H = CBN_H - 2*MARGIN;
  const GX = Math.ceil(Math.sqrt(count * W / H));
  const GY = Math.ceil(count / GX);
  const cellW = Math.floor(W / GX);
  const cellH = Math.floor(H / GY);
  const inner = 2;
  const all = [];
  for (let gy=0; gy<GY; gy++) {
    for (let gx=0; gx<GX; gx++) {
      const xMin = MARGIN + gx*cellW + inner,  xMax = MARGIN + (gx+1)*cellW - inner;
      const yMin = MARGIN + gy*cellH + inner,  yMax = MARGIN + (gy+1)*cellH - inner;
      const x = xMin + rng.nextMax(Math.max(1, xMax - xMin));
      const y = yMin + rng.nextMax(Math.max(1, yMax - yMin));
      all.push({x, y});
    }
  }
  for (let i=all.length-1; i>0; i--) {
    const j = rng.nextMax(i+1);
    [all[i], all[j]] = [all[j], all[i]];
  }
  return all.slice(0, count);
}
 
// ── Sentinel seeds — mirror real seeds across each canvas edge ────────────────
// These anchor circumcenters near the canvas so no cell geometry flies off.
// Sentinels are appended after the real seeds; indices >= n are sentinel.
function cbnAddSentinels(seeds) {
  const extra = [];
  for (const s of seeds) {
    // Mirror across left edge (x=0): reflect x
    extra.push({x: -s.x,           y: s.y});
    // Mirror across right edge (x=CBN_W)
    extra.push({x: 2*CBN_W - s.x,  y: s.y});
    // Mirror across top edge (y=0)
    extra.push({x: s.x,            y: -s.y});
    // Mirror across bottom edge (y=CBN_H)
    extra.push({x: s.x,            y: 2*CBN_H - s.y});
  }
  return [...seeds, ...extra];
}
 
// ── Bowyer-Watson Delaunay triangulation ──────────────────────────────────────
// Operates on allPts (real + sentinel seeds).
// Returns triangles as {a,b,c} index triples — indices into allPts.
function cbnDelaunay(allPts) {
  const n = allPts.length;
  const mg = Math.max(CBN_W, CBN_H) * 4;
  // Super-triangle encloses everything
  const ST = [
    {x: CBN_W/2,  y: -mg},
    {x: -mg,      y:  mg*2},
    {x: CBN_W+mg, y:  mg*2},
  ];
  const pts = [...allPts, ...ST];
  const sn = pts.length;
 
  function circumcircle(i, j, k) {
    const ax=pts[i].x, ay=pts[i].y;
    const bx=pts[j].x, by=pts[j].y;
    const cx=pts[k].x, cy=pts[k].y;
    const D = 2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
    if (Math.abs(D) < 1e-10) return null;
    const ux = ((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/D;
    const uy = ((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/D;
    const r2 = (ax-ux)*(ax-ux)+(ay-uy)*(ay-uy);
    return {cx:ux, cy:uy, r2};
  }
 
  let tris = [{a:n, b:n+1, c:n+2}];
 
  for (let p=0; p<n; p++) {
    const px=pts[p].x, py=pts[p].y;
    const bad = tris.filter(t => {
      const cc = circumcircle(t.a, t.b, t.c);
      if (!cc) return false;
      const dx=px-cc.cx, dy=py-cc.cy;
      return dx*dx+dy*dy <= cc.r2 + 1e-7;
    });
    const em = new Map();
    for (const t of bad)
      for (const [u,v] of [[t.a,t.b],[t.b,t.c],[t.c,t.a]]) {
        const k = u<v ? `${u},${v}` : `${v},${u}`;
        em.set(k, (em.get(k)||0)+1);
      }
    tris = tris.filter(t => !bad.includes(t));
    for (const [k, c] of em)
      if (c===1) {
        const [u,v] = k.split(',').map(Number);
        tris.push({a:p, b:u, c:v});
      }
  }
  // Remove any triangle touching the super-triangle vertices
  return tris.filter(t => t.a<n && t.b<n && t.c<n);
}
 
// ── Sutherland-Hodgman polygon clip to canvas rectangle ───────────────────────
function cbnClip(poly) {
  function half(poly, p1x,p1y, p2x,p2y) {
    if (!poly.length) return [];
    const dx=p2x-p1x, dy=p2y-p1y;
    const inside = p => dx*(p.y-p1y) - dy*(p.x-p1x) >= -1e-9;
    const intersect = (a,b) => {
      const adx=b.x-a.x, ady=b.y-a.y;
      const den = dx*ady - dy*adx;
      if (Math.abs(den)<1e-10) return a;
      const t = ((p1x-a.x)*dy-(p1y-a.y)*dx)/den;
      return {x:a.x+t*adx, y:a.y+t*ady};
    };
    const out = [];
    for (let i=0; i<poly.length; i++) {
      const cur=poly[i], prev=poly[(i+poly.length-1)%poly.length];
      const ci=inside(cur), pi=inside(prev);
      if (ci) { if (!pi) out.push(intersect(prev,cur)); out.push(cur); }
      else if (pi) out.push(intersect(prev,cur));
    }
    return out;
  }
  let p = poly;
  p = half(p, 0,0,       CBN_W,0);
  p = half(p, CBN_W,0,   CBN_W,CBN_H);
  p = half(p, CBN_W,CBN_H, 0,CBN_H);
  p = half(p, 0,CBN_H,   0,0);
  return p;
}
 
// ── Voronoi cells from Delaunay dual ─────────────────────────────────────────
// For each real seed (index 0..n-1), collects the circumcenters of all
// triangles that contain it, sorts them angularly, and clips to the canvas.
// Returns { regions, adj } where regions[i] is an array of {x,y} vertices.
function cbnVoronoi(seeds, n, tris) {
  // allPts used during Delaunay = seeds (real+sentinel), so triangle vertex
  // indices directly index into seeds array.
 
  // Circumcenter of a triangle (indices into the full pts array used in Delaunay)
  // We stored tris with indices into allPts (real+sentinel), so we pass allPts.
  const allPts = seeds; // seeds here = real+sentinel combined
 
  function cc(t) {
    const ax=allPts[t.a].x, ay=allPts[t.a].y;
    const bx=allPts[t.b].x, by=allPts[t.b].y;
    const cx=allPts[t.c].x, cy=allPts[t.c].y;
    const D=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
    if (Math.abs(D)<1e-8) return {x:(ax+bx+cx)/3, y:(ay+by+cy)/3};
    const ux=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/D;
    const uy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/D;
    return {x:ux, y:uy};
  }
 
  // Map each real seed to the triangles it appears in
  const seedTris = Array.from({length:n}, () => []);
  tris.forEach((t,ti) => {
    if (t.a < n) seedTris[t.a].push(ti);
    if (t.b < n) seedTris[t.b].push(ti);
    if (t.c < n) seedTris[t.c].push(ti);
  });
 
  // Adjacency: two real seeds adjacent iff they share a Delaunay edge
  const adj = Array.from({length:n}, () => new Set());
  for (const t of tris) {
    // Only count edges between two real seeds
    const verts = [t.a, t.b, t.c].filter(v => v < n);
    for (let i=0; i<verts.length; i++)
      for (let j=i+1; j<verts.length; j++) {
        adj[verts[i]].add(verts[j]);
        adj[verts[j]].add(verts[i]);
      }
  }
 
  // Build each region
  const regions = seeds.slice(0, n).map((seed, si) => {
    const rawCC = seedTris[si].map(ti => cc(tris[ti]));
    // Sort angularly around seed
    rawCC.sort((a,b) => Math.atan2(a.y-seed.y,a.x-seed.x) - Math.atan2(b.y-seed.y,b.x-seed.x));
    // Deduplicate
    const dedup = rawCC.filter((v,i,arr) =>
      i===0 || Math.hypot(v.x-arr[i-1].x, v.y-arr[i-1].y) > 0.3
    );
    // Clip to canvas — gentle trim because sentinels kept circumcenters near canvas
    return cbnClip(dedup);
  });
 
  return {regions, adj};
}
 
// ── Polygon geometry helpers ──────────────────────────────────────────────────
function cbnArea(verts) {
  let a=0;
  for (let i=0;i<verts.length;i++) {
    const j=(i+1)%verts.length;
    a += verts[i].x*verts[j].y - verts[j].x*verts[i].y;
  }
  return Math.abs(a)/2;
}
 
function cbnCentroid(verts) {
  let cx=0, cy=0, area=0;
  for (let i=0;i<verts.length;i++) {
    const j=(i+1)%verts.length;
    const cross = verts[i].x*verts[j].y - verts[j].x*verts[i].y;
    cx += (verts[i].x+verts[j].x)*cross;
    cy += (verts[i].y+verts[j].y)*cross;
    area += cross;
  }
  area /= 2;
  if (Math.abs(area) < 1e-6)
    return {x: verts.reduce((s,v)=>s+v.x,0)/verts.length,
            y: verts.reduce((s,v)=>s+v.y,0)/verts.length};
  return {x:cx/(6*area), y:cy/(6*area)};
}
 
// Min distance from centroid to any polygon edge
function cbnInradius(verts) {
  if (verts.length<3) return 0;
  const {x:px, y:py} = cbnCentroid(verts);
  let minD = Infinity;
  for (let i=0;i<verts.length;i++) {
    const a=verts[i], b=verts[(i+1)%verts.length];
    const abx=b.x-a.x, aby=b.y-a.y, len2=abx*abx+aby*aby;
    if (len2===0) continue;
    const t=Math.max(0,Math.min(1,((px-a.x)*abx+(py-a.y)*aby)/len2));
    const dx=a.x+t*abx-px, dy=a.y+t*aby-py;
    minD=Math.min(minD,Math.sqrt(dx*dx+dy*dy));
  }
  return minD===Infinity ? 0 : minD;
}
 
// A region is label-ready if the polygon has enough area AND the centroid
// has enough clearance from all edges to fit the label text.
const CBN_MIN_AREA     = 600;  // px²
const CBN_MIN_INRADIUS = 10;   // px from centroid to nearest edge
 
function cbnLabelReady(verts) {
  return verts.length >= 3
      && cbnArea(verts) >= CBN_MIN_AREA
      && cbnInradius(verts) >= CBN_MIN_INRADIUS;
}
 
function cbnPolyPath(verts) {
  if (verts.length < 2) return '';
  return `M${verts[0].x.toFixed(2)},${verts[0].y.toFixed(2)}`
       + verts.slice(1).map(v=>`L${v.x.toFixed(2)},${v.y.toFixed(2)}`).join('')
       + 'Z';
}
 
// ── Greedy 4-coloring with backtracking ───────────────────────────────────────
function cbnColor4(adj, n) {
  const col = new Array(n).fill(-1);
  function bt(i) {
    if (i===n) return true;
    for (let c=0;c<4;c++) {
      if ([...adj[i]].every(nb=>col[nb]!==c)) {
        col[i]=c; if (bt(i+1)) return true; col[i]=-1;
      }
    }
    return false;
  }
  bt(0); return col;
}
 
// ── Constraint-propagation solver ─────────────────────────────────────────────
function cbnPropagate(known, target, adj, coloring) {
  const K=new Map(known);
  let changed=true, steps=0;
  while (changed) {
    if (K.has(target)) return {steps, solved:true};
    changed=false;
    for (let r=0;r<coloring.length;r++) {
      if (K.has(r)) continue;
      const nbC=new Set([...adj[r]].filter(x=>K.has(x)).map(x=>K.get(x)));
      if (nbC.size===3) {
        let f=-1; for (let c=0;c<4;c++) if(!nbC.has(c)){f=c;break;}
        K.set(r,f); changed=true;
      }
    }
    if (changed) steps++;
  }
  return {steps, solved:K.has(target)};
}
 
// ── Ambassador selection ───────────────────────────────────────────────────────
// Pass 1: find 4 ambassadors (one per color, all label-ready) that make the
//         puzzle uniquely solvable via propagation, maximising steps.
// Pass 2: if Pass 1 fails, add one label-ready hint region.
function cbnChooseAmbassadors(target, adj, coloring, n, regions) {
  const myColor=coloring[target];
 
  // BFS distance from target (graph hops)
  const bfsDist=new Array(n).fill(Infinity);
  bfsDist[target]=0;
  const q=[target];
  while (q.length) {
    const cur=q.shift();
    for (const nb of adj[cur])
      if (bfsDist[nb]===Infinity) { bfsDist[nb]=bfsDist[cur]+1; q.push(nb); }
  }
 
  // Candidates per color: label-ready, sorted farthest-first
  const MAX_CANDS=4;
  const byColor=[[],[],[],[]];
  for (let r=0;r<n;r++) {
    if (r===target) continue;
    if (!cbnLabelReady(regions[r])) continue;
    byColor[coloring[r]].push(r);
  }
  for (let c=0;c<4;c++) byColor[c].sort((a,b)=>bfsDist[b]-bfsDist[a]);
 
  if (!byColor[myColor].length) return null;
  const myAmb=byColor[myColor][0];
 
  const oc=[0,1,2,3].filter(c=>c!==myColor);
  const [c0,c1,c2]=oc;
  const ca0=byColor[c0].slice(0,MAX_CANDS);
  const ca1=byColor[c1].slice(0,MAX_CANDS);
  const ca2=byColor[c2].slice(0,MAX_CANDS);
  if (!ca0.length||!ca1.length||!ca2.length) return null;
 
  // Pass 1: 64 combos
  let bestSteps=-1, bestAmb=null, uSteps=-1, uAmb=null;
  for (const a0 of ca0) for (const a1 of ca1) for (const a2 of ca2) {
    const K=new Map([[myAmb,myColor],[a0,c0],[a1,c1],[a2,c2]]);
    const {steps,solved}=cbnPropagate(K,target,adj,coloring);
    if (solved&&steps>bestSteps){bestSteps=steps;bestAmb=[a0,a1,a2];}
    if (!solved&&steps>uSteps){uSteps=steps;uAmb=[a0,a1,a2];}
  }
 
  if (bestAmb) {
    const amb=new Array(4).fill(-1);
    amb[myColor]=myAmb; amb[c0]=bestAmb[0]; amb[c1]=bestAmb[1]; amb[c2]=bestAmb[2];
    return {ambassadors:amb, hint:-1, steps:bestSteps};
  }
 
  // Pass 2: hint
  const base=uAmb||[ca0[0],ca1[0],ca2[0]];
  const reserved=new Set([target,myAmb,...base]);
  let hSteps=-1, hId=-1;
  for (let h=0;h<n;h++) {
    if (reserved.has(h)||!cbnLabelReady(regions[h])) continue;
    const K=new Map([[myAmb,myColor],[base[0],c0],[base[1],c1],[base[2],c2],[h,coloring[h]]]);
    const {steps,solved}=cbnPropagate(K,target,adj,coloring);
    if (solved&&steps>hSteps){hSteps=steps;hId=h;}
  }
  if (hId===-1) return null;
 
  const amb=new Array(4).fill(-1);
  amb[myColor]=myAmb; amb[c0]=base[0]; amb[c1]=base[1]; amb[c2]=base[2];
  return {ambassadors:amb, hint:hId, steps:hSteps};
}
 
// ── Main puzzle function ──────────────────────────────────────────────────────
function quizzingtonColorByNumber(rng) {
 
  // 1. Colors
  const colors = cbnGenerateColors(rng);
 
  // 2. Region count 20–40
  const regionCount = rng.next(20, 41);
 
  // 3. Real seeds (inside canvas with margin)
  const seeds = cbnGenerateSeeds(rng, regionCount);
 
  // 4. Add sentinel seeds (mirrors across each edge) — no RNG used
  const allSeeds = cbnAddSentinels(seeds);
 
  // 5. Delaunay over real + sentinel seeds, then extract Voronoi for real seeds
  const tris = cbnDelaunay(allSeeds);
  const {regions, adj} = cbnVoronoi(allSeeds, regionCount, tris);
 
  // 6. 4-coloring
  const coloring = cbnColor4(adj, regionCount);
 
  // 7. Choose target + ambassadors
  const order = Array.from({length:regionCount},(_,i)=>i);
  for (let i=order.length-1;i>0;i--) {
    const j=rng.nextMax(i+1);
    [order[i],order[j]]=[order[j],order[i]];
  }
 
  let bestTarget=-1, bestAmb=null, bestHint=-1, bestSteps=-1;
  for (const r of order) {
    if (!cbnLabelReady(regions[r])) continue;
    const res=cbnChooseAmbassadors(r,adj,coloring,regionCount,regions);
    if (res&&res.steps>bestSteps) {
      bestSteps=res.steps; bestTarget=r; bestAmb=res.ambassadors; bestHint=res.hint;
      if (bestHint===-1&&bestSteps>=2) break;
    }
  }
 
  // Fallback: direct-neighbor
  if (bestTarget===-1) {
    for (const r of order) {
      if (!cbnLabelReady(regions[r])) continue;
      const mc=coloring[r], nb4=new Array(4).fill(-1);
      for (const nb of adj[r])
        if (coloring[nb]!==mc&&nb4[coloring[nb]]===-1&&cbnLabelReady(regions[nb]))
          nb4[coloring[nb]]=nb;
      if ([0,1,2,3].filter(c=>c!==mc&&nb4[c]!==-1).length===3) {
        bestTarget=r; bestAmb=nb4; bestHint=-1;
        for (let r2=0;r2<regionCount;r2++)
          if (r2!==r&&coloring[r2]===mc&&cbnLabelReady(regions[r2])){bestAmb[mc]=r2;break;}
        break;
      }
    }
  }
  if (bestTarget===-1){bestTarget=order[0];bestAmb=new Array(4).fill(-1);bestHint=-1;}
 
  // 8. Label map
  const labelMap=new Map();
  labelMap.set(bestTarget,'?');
  for (let c=0;c<4;c++) if (bestAmb[c]!==-1) labelMap.set(bestAmb[c],String(c+1));
  if (bestHint!==-1) labelMap.set(bestHint,String(coloring[bestHint]+1));
 
  // 9. Answer
  const answerHex=colors[coloring[bestTarget]];
  state.cbnAnswer=answerHex;
 
  // 10. Render
  const STROKE_DIM='#484848', STROKE_AMB='#b0b0b0', STROKE_HINT='#7ec8e3';
  const FILL='#222222', BG='#1a1a1a';
  let svgPaths='', svgLabels='';
 
  for (let i=0;i<regionCount;i++) {
    const verts=regions[i];
    if (!verts||verts.length<3) continue;
    const isLabeled=labelMap.has(i);
    const isHint=i===bestHint;
    const stroke=!isLabeled?STROKE_DIM:isHint?STROKE_HINT:STROKE_AMB;
    svgPaths+=`<path d="${cbnPolyPath(verts)}" fill="${FILL}"
      stroke="${stroke}" stroke-width="${isLabeled?1.8:1.0}" stroke-linejoin="round"/>`;
 
    if (isLabeled) {
      const cent=cbnCentroid(verts);
      const label=labelMap.get(i);
      const isQ=label==='?';
      const inrad=cbnInradius(verts);
      const fsize=Math.min(isQ?15:13, Math.floor(inrad*1.4));
      const fill=isQ?'#ff8c42':isHint?'#7ec8e3':'#e0e0e0';
      svgLabels+=`<text x="${cent.x.toFixed(1)}" y="${(cent.y+fsize*0.36).toFixed(1)}"
        text-anchor="middle" font-size="${fsize}" font-weight="bold"
        font-family="monospace" fill="${fill}" style="pointer-events:none">${label}</text>`;
    }
  }
 
  const LEGEND_Y=CBN_H+8, LEGEND_H=22;
  let legend='';
  for (let c=0;c<4;c++) {
    const lx=12+c*84, hex='#'+colors[c];
    const luma=0.299*parseInt(colors[c].slice(0,2),16)
              +0.587*parseInt(colors[c].slice(2,4),16)
              +0.114*parseInt(colors[c].slice(4,6),16);
    legend+=`<rect x="${lx}" y="${LEGEND_Y}" width="78" height="${LEGEND_H}" rx="3"
      fill="${hex}" stroke="#444" stroke-width="1"/>
      <text x="${lx+39}" y="${LEGEND_Y+15}" text-anchor="middle" font-size="10"
        font-weight="bold" font-family="monospace"
        fill="${luma>140?'#111':'#eee'}">${c+1} — #${colors[c]}</text>`;
  }
 
  const totalH=CBN_H+LEGEND_H+14;
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CBN_W} ${totalH}"
    style="display:block;margin:6px auto;border-radius:4px;border:1px solid #444;background:${BG};max-width:100%">
    ${svgPaths}${svgLabels}${legend}
  </svg>`;
 
  document.getElementById('quizzington').innerHTML=
    QUIZ_DISCLAIMER+
    `<div class="qz-puzzle-box">
      <div class="qz-puzzle-label">Color-By-Number</div>
      <div class="qz-puzzle-data" style="padding:4px 0">
        <div style="font-size:9px;color:#aaa;text-align:center;margin-bottom:2px">
          No two adjacent regions share a color. Use logic to find the color of
          <b style="color:#ff8c42">?</b>.${bestHint!==-1?' <span style="color:#7ec8e3">(highlighted region is an extra hint)</span>':''}
        </div>
        ${svg}
      </div>
    </div>`+
    QUIZZINGTON_CONTACT+
    `<div style="font-size:8px;color:#666;margin-top:4px">
      Subject: "Color-By-Number" &nbsp;|&nbsp; Message: 6-digit hex (no #, e.g. a3f02b)
    </div>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// TORMAIL
// ─────────────────────────────────────────────────────────────────────────────

function prepTormail() {
  const snap = html.innerHTML; pushHistory("Tor Browser", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="tm-wrap">
    <marquee class="tm-marquee" scrollamount="2"><span>&#9632; TORMAIL — SECURE ANONYMOUS EMAIL // YOUR MESSAGES CANNOT BE TRACED &#9632; TORMAIL &#9632; STAY HIDDEN &#9632; STAY SAFE &#9632;</span></marquee>
    <div class="tm-header">
      <div class="tm-logo-icon">&#9993;</div>
      <div>
        <div class="tm-logo-text">TORMAIL</div>
        <span class="tm-logo-sub">ANONYMOUS ENCRYPTED EMAIL</span>
      </div>
    </div>
    <div class="tm-body">
      <div class="tm-toolbar">
        <button class="tm-btn" onclick="composeEmail()">&#9998; COMPOSE</button>
      </div>
      <div class="tm-folder-label">&#9660; INBOX</div>
      <div id="emailInbox"><div class="tm-empty">no messages</div></div>
    </div>
  </div>`;
  setWinTitle("Tormail");
  renderInbox();
}

function validateQuizzingtonAnswer(subject, message) {
  switch (subject.toLowerCase()) {
    case "sequence":
      if (!/^\d+$/.test(message)) return "Sequence answer must be a whole number.";
      if (parseInt(message) < 0 || parseInt(message) > 99999) return "Sequence answer must be between 0 and 99999.";
      return null;
    case "find 8":
      if (!/^\d+,\d+$/.test(message)) return "Find 8 answer must be in the form r,c (e.g. 12,3).";
      const [r, c] = message.split(",").map(Number);
      if (r < 1 || r > 30) return "Find 8 row must be between 1 and 30.";
      if (c < 1 || c > 8)  return "Find 8 column must be between 1 and 8.";
      return null;
    case "numbers":
      if (!/^\d{2}$/.test(message)) return "Numbers answer must be exactly 2 digits (e.g. 07).";
      return null;
    case "static":
      if (!/^[a-zA-Z]+$/.test(message)) return "Static answer must be a single word containing only letters.";
      return null;
    case "color-by-number":
      if (!/^[0-9a-f]{6}$/i.test(message.trim()))
          return "Color-By-Number answer must be a 6-digit hex color without # (e.g. a3f02b).";
      return null;
    default:
      return null;
  }
}

function renderInbox() {
  const inbox = document.getElementById("emailInbox");
  if (!inbox) return;
  if (state.emails.length === 0) { inbox.innerHTML = '<div class="tm-empty">no messages</div>'; return; }
  inbox.innerHTML = [...state.emails].reverse().map((e, ri) => {
    const i = state.emails.length - 1 - ri;
    return `<div class="tm-email-row" id="email${i}">
      <div class="tm-email-dot"></div>
      <div class="tm-email-from">${e.from.length > 14 ? e.from.slice(0,12)+'..' : e.from}</div>
      <div class="tm-email-subject">${e.subject}</div>
    </div>`;
  }).join("");
  state.emails.forEach((_,i) => document.getElementById(`email${i}`)?.addEventListener("click", ()=>loadEmail(i)));
}

function composeEmail() {
  const win = window.open("tormail_compose.html", "childWindow", "width=400,height=300,menubar=no,toolbar=no,location=no,resizable=yes,scrollbars=yes,status=no");
  const handler = event => {
    if (event.data?.type !== "emailData") return;
    const { to, subject, message } = event.data;
    const sent = { to, subject, message: message.toLowerCase() };
    const error = createReply(sent);
    if (error) {
      win.postMessage({ type: "emailError", error }, "*");
    } else {
      renderInbox();
      win.postMessage({ type: "emailSuccess" }, "*");
      window.removeEventListener("message", handler);
    }
  };
  window.addEventListener("message", handler);
}

function createReply(sentEmail) {
  const error = validateQuizzingtonAnswer(sentEmail.subject, sentEmail.message.trim());
  if (error) return error;

  let seed = 0;
  for (const c of sentEmail.message.trim()) {
    const idx = WEBSITE_CHARS.indexOf(c);
    if (idx !== -1) seed += idx;
  }
  seed = (seed * state.userID) % 2147483647;
  const rng  = new MonoRandom(seed);
  const body = `Hello ${USERS[state.userID-1]}.\nYou are the lucky winner of the attached quarter. I have provided you the next step to solve this puzzle.\n${nextStep(rng)}\n\nCongrats.\nQuizzington J. Puzzle`;
  const subject = `Re: ${sentEmail.subject}`;
  state.emails.push({ from: sentEmail.to, subject, message: body, attachment: "img/quarter.png" });
  showNotification(subject, "📧", "New Tormail Message");
  return null;
}

function loadEmail(i) {
  const email = state.emails[i];
  const win   = window.open("tormail_reply.html","childWindow","width=400,height=300");
  const handler = event => {
    if (event.source !== win || event.data?.type !== "childReady") return;
    win.postMessage({ type:"emailReply", ...email }, "*");
    window.removeEventListener("message", handler);
  };
  window.addEventListener("message", handler);
}

// ─────────────────────────────────────────────────────────────────────────────
// LIBER PRIMUS
// ─────────────────────────────────────────────────────────────────────────────

function prepLiberHelp() {
  const snap = html.innerHTML; pushHistory("Tor Browser", () => { html.innerHTML = snap; });
  const liberLettersFull = ["F","V","TH","O","R","C/K","G","W","H","N","I","J","EO","P","X","S/Z","T","B","E","M","L","NG/ING","OE","D","A","AE","Y","IA/IO","EA"];
  const gematriaGrid = GEMATRIA_PRIMUS.map((rune, i) =>
    `<div class="lp-rune-cell"><span class="lp-rune-symbol">${rune}</span><span class="lp-rune-letter">${liberLettersFull[i]}</span><span class="lp-rune-index">${i}</span></div>`
  ).join("");

  html.innerHTML = `${windowBar()}
  <div class="lp-wrap">
    <div class="lp-header">
      <div class="lp-rune-banner">ᚠᚢᚦᚩᚱᚳᚷᚹᚻᚾ</div>
      <div class="lp-title">Liber Primus</div>
      <div class="lp-subtitle">THE BOOK OF THE FIRST // HELP CENTER</div>
    </div>
    <div class="lp-divider">&#9670; &#9670; &#9670;</div>
    <div class="lp-section">
      <div class="lp-section-title">&#9670; Encryption Methods</div>
      <div class="lp-method"><b>Direct Translation</b> — Convert each letter to its Gematria Primus rune. Digraphs TH, EO, NG, ING, OE, AE, IA, IO, EA map to one rune. C/K→ᚳ &nbsp; S/Z→ᛋ &nbsp; U→ᚢ &nbsp; Q→ᚳᚹ</div>
      <div class="lp-method"><b>Atbash</b> — Direct translate, then mirror each rune index: i → 28−i</div>
      <div class="lp-method"><b>Vigenere DIVINITY</b> — Direct translate name and key, add rune indices mod 29</div>
      <div class="lp-method"><b>Vigenere FIRFUMFERENFE</b> — Same with key FIRFUMFERENFE</div>
      <div class="lp-method"><b>Shift 3</b> — Direct translate, shift each index +3 mod 29, then Atbash</div>
      <div class="lp-method"><b>Subtract Prime − 1</b> — Direct translate, add (prime[i]−1) to index mod 29</div>
    </div>
    <div class="lp-section">
      <div class="lp-section-title">&#9670; Gematria Primus</div>
      <div class="lp-gematria-grid">${gematriaGrid}</div>
    </div>
    <div class="lp-divider">ᛁᛄᛇᛈᛉᛋᛏᛒᛖᛗ</div>
  </div>`;
  setWinTitle("Liber Primus");
}

const JSON_URL = "https://ktane.timwi.de/json/raw";

async function prepPrimus(n) {
  const snap = html.innerHTML; pushHistory("Tor Browser", () => { html.innerHTML = snap; });
  const dispRng = new MonoRandom(n);
  const dispSlug = Array.from({length:56}, () => RULESEED_CHARS[dispRng.nextMax(RULESEED_CHARS.length)]).join("");
  html.innerHTML = `${windowBar()}
  <div class="po-wrap">
    <div class="po-addr">&#128274; ${dispSlug}.onion</div>
    <div class="po-secure">&#128994; Authenticated hidden service</div>
    <div class="po-rune-header">
      <div class="po-rune-banner">ᚠᚢᚦᚩᚱᚳᚷᚹᚻᚾ</div>
      <div class="po-title">Liber Primus // Puzzle</div>
    </div>
    <div class="po-puzzle-label">Translate to find the module name:</div>
    <div class="po-puzzle-runes" id="gematriaRunes"><span class="po-loading">decoding...</span></div>
    <div class="po-module-name" id="gematriaModuleName"></div>
    <div class="po-method" id="gematriaMethod"></div>
  </div>`;
  setWinTitle("Liber Primus — Puzzle");
  const rng  = new MonoRandom(n);
  const resp = await fetch(JSON_URL);
  const data = await resp.json();
  const name = data.KtaneModules[rng.nextMax(data.KtaneModules.length)].Name;
  const methods = ["directTranslation","atbash","vigenereDIVINITY","shift3","vigenereFIRFUMFERENFE","subtractPrime-1"];
  const method = methods[rng.nextMax(methods.length)];
  const upper = name.toUpperCase();
  const translated = method === "directTranslation" ? directTranslation(upper)
    : method === "atbash" ? atbashTranslation(upper)
    : method === "vigenereDIVINITY" ? vigenereTranslation(upper,"DIVINITY")
    : method === "shift3" ? shift3Translation(upper)
    : method === "vigenereFIRFUMFERENFE" ? vigenereTranslation(upper,"FIRFUMFERENFE")
    : subPrimeTranslation(upper);
  const runesEl = document.getElementById("gematriaRunes");
  const nameEl  = document.getElementById("gematriaModuleName");
  const methEl  = document.getElementById("gematriaMethod");
  if (runesEl) runesEl.innerHTML = translated;
  if (nameEl)  nameEl.innerHTML  = "";
  if (methEl)  methEl.innerHTML  = "";
}

function translateLiber(ruleseed, name) {
  const methods = ["directTranslation","atbash","vigenereDIVINITY","shift3","vigenereFIRFUMFERENFE","subtractPrime-1"];
  const method  = methods[ruleseed.nextMax(methods.length)];
  const upper   = name.toUpperCase();
  return method === "directTranslation"     ? directTranslation(upper)
       : method === "atbash"                ? atbashTranslation(upper)
       : method === "vigenereDIVINITY"      ? vigenereTranslation(upper,"DIVINITY")
       : method === "shift3"                ? shift3Translation(upper)
       : method === "vigenereFIRFUMFERENFE" ? vigenereTranslation(upper,"FIRFUMFERENFE")
       :                                      subPrimeTranslation(upper);
}

function directTranslation(name) {
  const MULTI = [["TH",2],["EO",12],["NG",21],["ING",21],["OE",22],["AE",25],["IA",27],["IO",27],["EA",28]];
  let out = "", i = 0;
  while (i < name.length) {
    const multi = MULTI.find(([s])=>name.startsWith(s,i));
    if (multi) { out += GEMATRIA_PRIMUS[multi[1]]; i += multi[0].length; continue; }
    const ch = name[i];
    const idx = ch==="Q" ? null : ch==="C"||ch==="K" ? 5 : ch==="S"||ch==="Z" ? 15 : ch==="U" ? 1 : LIBER_LETTERS.indexOf(ch);
    out += ch==="Q" ? GEMATRIA_PRIMUS[5]+GEMATRIA_PRIMUS[7] : idx !== -1 ? GEMATRIA_PRIMUS[idx] : ch;
    i++;
  }
  return out;
}

function atbashTranslation(name) {
  return directTranslation(name).split("").map(c => { const i = GEMATRIA_PRIMUS.indexOf(c); return i>=0&&i<=28 ? GEMATRIA_PRIMUS[28-i] : c; }).join("");
}

function vigenereTranslation(name, key) {
  const dn = directTranslation(name), dk = directTranslation(key);
  return dn.split("").map((c,i) => { const ni=GEMATRIA_PRIMUS.indexOf(c),ki=GEMATRIA_PRIMUS.indexOf(dk[i%dk.length]); return ni>=0&&ni<=28 ? GEMATRIA_PRIMUS[(ni+ki)%29] : c; }).join("");
}

function shift3Translation(name) {
  const shifted = directTranslation(name).split("").map(c => { const i=GEMATRIA_PRIMUS.indexOf(c); if(i===-1)return c; const ni=(i+3)%29; return GEMATRIA_PRIMUS[ni>28?ni-29:ni]; }).join("");
  return atbashTranslation(shifted);
}

function subPrimeTranslation(name) {
  return directTranslation(name).split("").map((c,i) => { const gi=GEMATRIA_PRIMUS.indexOf(c); if(gi===-1)return c; return GEMATRIA_PRIMUS[(gi+(PRIMES[i]-1))%29]; }).join("");
}

// ─────────────────────────────────────────────────────────────────────────────
// PGP
// ─────────────────────────────────────────────────────────────────────────────

async function loadPGP(ruleseed) {
  // A downloaded .pgp file — like every other downloaded file type, this
  // just fills the #webApp shell that loadFileExplorer() already built
  // (light "GPG Keychain"-style viewer, proper filename/app title, and a
  // close button that returns to Downloads instead of the desktop).
  const app = getLeadTarget();
  app.innerHTML = `
    <div class="pgpv-body">
      <div class="pgpv-row">
        <div class="pgpv-label">Private Key</div>
        <div class="pgpv-box" id="pgpKeyBox"><span class="pgpv-hint">generating...</span></div>
      </div>
      <div class="pgpv-row">
        <div class="pgpv-label">Encrypted Message</div>
        <div class="pgpv-box" id="pgpHTML"><span class="pgpv-hint">encrypting...</span></div>
      </div>
    </div>`;
  await delay(300);
  generatePGPFile(ruleseed);
}

function generatePGPFile(ruleseed) {
  const pgpMethods = ["onion","reddit","4chan","imgur","pastebin","twitter","x","dropbox","phoneNumber","coordinates","hexToASCII","asciiCaesarCipher","nytimes","quizzington"];
  const key = state.traversals >= 20 ? "liber" : pgpMethods[ruleseed.nextMax(pgpMethods.length)];
  const message = key === "phoneNumber"       ? LINK_GENERATORS.phoneNumber(ruleseed)
                : key === "coordinates"       ? LINK_GENERATORS.coordinate(ruleseed)
                : key === "hexToASCII"        ? generateHexReturn(ruleseed)
                : key === "asciiCaesarCipher" ? generateCaesarReturn(ruleseed)
                : key === "nytimes"            ? LINK_GENERATORS.nytimes(ruleseed)
                : key === "quizzington"       ? LINK_GENERATORS.quizzington(ruleseed)
                : key === "liber"             ? LINK_GENERATORS.liber(ruleseed)
                : (LINK_GENERATORS[key] || LINK_GENERATORS.onion)(ruleseed);

  const passphrases = ["INSTAR","DIVINITY","CICADA","CAESAR"];
  const passphrase  = passphrases[ruleseed.nextMax(passphrases.length)];
  generateKeyPair(message, passphrase);
}

async function generateKeyPair(message, pgpPassphrase) {
  const pgpKeyBox = document.getElementById("pgpKeyBox");
  const pgpHTML   = document.getElementById("pgpHTML");
  try {
    const key = await openpgp.generateKey({ userIDs:[{name:"John Doe",email:"john.doe@example.com"}], curve:"ed25519", passphrase: pgpPassphrase });
    if (pgpKeyBox) pgpKeyBox.innerHTML = `<pre>${key.privateKey}</pre>`;
    await encryptMessage(message, key.publicKey);
  } catch (err) { console.error("Key generation failed:", err); }
}

async function encryptMessage(message, publicKey) {
  try {
    const pK  = await openpgp.readKey({ armoredKey: publicKey });
    const enc = await openpgp.encrypt({ message: await openpgp.createMessage({ text: message }), encryptionKeys: pK });
    const pgpHTML = document.getElementById("pgpHTML");
    if (pgpHTML) pgpHTML.innerHTML = `<pre>${enc}</pre>`;
  } catch (err) { console.error("Encryption failed:", err); }
}

async function decryptMessage(encryptedMessage, privateKeyArmored, passphrase) {
  try {
    const privateKey = await openpgp.decryptKey({ privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }), passphrase });
    const result     = await openpgp.decrypt({ message: await openpgp.readMessage({ armoredMessage: encryptedMessage }), decryptionKeys: privateKey });
    document.getElementById("result").innerHTML = `<pre>${result.data}</pre>`;
  } catch (err) { console.error("Decryption failed:", err); }
}

// ─────────────────────────────────────────────────────────────────────────────
// MIDI
// ─────────────────────────────────────────────────────────────────────────────

const BASE_MIDI_NOTE = 60, NOTE_RANGE = 24, BASE_LENGTH = 480;
const LENGTH_QUOTIENTS = [4, 3, 2.5, 2, 1.5, 1.25, 1.2];
const MIDI_VELOCITY = 100;

const notesSet = new Set();
while (notesSet.size < NOTE_RANGE) {
  const n = BASE_MIDI_NOTE - Math.floor(NOTE_RANGE/2) + Math.floor(Math.random() * NOTE_RANGE);
  notesSet.add(n);
}
let notesList = Array.from(notesSet);
shuffleArray(notesList);

let lengthsList = LENGTH_QUOTIENTS.map(q => {
  let len = Math.floor(BASE_LENGTH / q);
  len = Math.min(Math.max(len, 30), 480);
  return len;
});
lengthsList = [...new Set(lengthsList)];
if (lengthsList.length !== 7) {
  lengthsList = [120, 160, 192, 240, 320, 384, 400];
}
shuffleArray(lengthsList);

const NOTE_MAP = {};
WEBSITE_CHARS.split("").forEach((ch, i) => {
  NOTE_MAP[ch] = {
    note: notesList[i % notesList.length],
    length: lengthsList[i % lengthsList.length],
    velocity: MIDI_VELOCITY
  };
});

// Builds the note sequence for a piece of text directly from NOTE_MAP —
// the same {pitch,time,duration,velocity} shape midiStartPlayback() plays
// and onMidiFileSelected() used to reconstruct from a parsed .mid file.
// Encoding text straight to notes (instead of round-tripping through a
// real Standard MIDI File via the external Midi library) means both the
// media-player view below and the MIDI.Helper decoder can share one pure,
// dependency-free function of (ruleseed) — no CDN, no file parsing.
function buildMidiNotes(text) {
  const notes = [];
  const endTimes = {};
  let time = 0;
  for (const ch of text) {
    const mapped = NOTE_MAP[ch.toLowerCase()];
    if (!mapped || mapped.note === 0) continue;
    const { note, length, velocity } = mapped;
    const dur = length / BASE_LENGTH;
    if (endTimes[note] && time < endTimes[note]) time = endTimes[note];
    notes.push({ pitch: note, time, duration: dur, velocity });
    endTimes[note] = time + dur + 0.5;
    time += dur - 0.1;
  }
  return notes;
}

function midiFullTextFor(ruleseed) {
  const link = LINK_GENERATORS.liber(ruleseed);
  return `${PANGRAM} ${PI_DIGITS} ${link}`;
}

// The "opened from Downloads" view of a .mid file — a small media-player
// card (matching how a real OS previews an audio file) rather than a bare
// download-link chip. Play/Pause reuses the exact same Web Audio
// synthesizer MIDI.Helper's uploaded-file playback uses.
async function midiSubstitution(ruleseed) {
  const app = getLeadTarget();
  app.innerHTML += `<div id="midi-container"></div>`;
  await delay(300);
  const notes = buildMidiNotes(midiFullTextFor(ruleseed));
  const container = document.getElementById("midi-container");
  if (!container) return;

  const TEMPO    = 0.5;
  const totalSec = notes.length ? Math.max(...notes.map(n => n.time + n.duration)) * TEMPO : 0;
  const mm = Math.floor(totalSec / 60);
  const ss = Math.floor(totalSec % 60).toString().padStart(2, "0");

  container.innerHTML = `<div class="mp-player">
    <div class="mp-row">
      <button class="mp-play-btn" id="midiPlayBtn" onclick="midiStartPlayback()">&#9654; PLAY</button>
      <div class="mp-info">
        <div class="mp-title">Audio Track</div>
        <div class="mp-meta">MIDI &middot; ${notes.length} notes &middot; ${mm}:${ss}</div>
      </div>
      <span class="mp-icon">&#127925;</span>
    </div>
    <div class="mp-progress-track"><div class="mp-progress-fill" id="midiProgressFill"></div></div>
  </div>`;

  midiPlaybackNotes = notes;
  midiStopPlayback();
}

// ─────────────────────────────────────────────────────────────────────────────
// MIDI HELPER
// ─────────────────────────────────────────────────────────────────────────────

let midiAudioCtx = null;
let midiPlaybackNotes = [];
let midiPlaybackTimers = [];
let midiIsPlaying = false;

function midiNoteToFreq(midi) { return 440 * Math.pow(2, (midi - 69) / 12); }

function midiStopPlayback() {
  midiPlaybackTimers.forEach(t => clearTimeout(t));
  midiPlaybackTimers = [];
  midiIsPlaying = false;
  const btn = document.getElementById("midiPlayBtn");
  if (btn) btn.textContent = "▶ PLAY";
  // Reset the media-player scrubber, if one is present (only midiSubstitution's
  // media-player view has #midiProgressFill — MIDI.Helper's inline player
  // controls don't, and this is a harmless no-op there).
  const fill = document.getElementById("midiProgressFill");
  if (fill) { fill.style.transition = "none"; fill.style.width = "0%"; }
}

function midiStartPlayback() {
  if (!midiAudioCtx) midiAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (midiIsPlaying) { midiStopPlayback(); return; }
  if (!midiPlaybackNotes.length) return;
  midiIsPlaying = true;
  const btn = document.getElementById("midiPlayBtn");
  if (btn) btn.textContent = "■ STOP";

  const ctx = midiAudioCtx;
  const now = ctx.currentTime + 0.05;
  const TEMPO = 0.5;

  const fill = document.getElementById("midiProgressFill");
  if (fill && midiPlaybackNotes.length) {
    const lastTime = Math.max(...midiPlaybackNotes.map(n => n.time + n.duration));
    fill.style.transition = "none";
    fill.style.width = "0%";
    requestAnimationFrame(() => {
      fill.style.transition = `width ${Math.max(lastTime * TEMPO, 0.05)}s linear`;
      fill.style.width = "100%";
    });
  }

  midiPlaybackNotes.forEach(n => {
    const start = now + n.time * TEMPO;
    const dur   = Math.max(n.duration * TEMPO, 0.05);
    const t = setTimeout(() => {
      if (!midiIsPlaying) return;
      try {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "triangle";
        osc.frequency.setValueAtTime(midiNoteToFreq(n.pitch), ctx.currentTime);
        gain.gain.setValueAtTime(n.velocity / 127 * 0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + dur + 0.01);
      } catch(e) {}
    }, Math.max(0, (start - ctx.currentTime) * 1000));
    midiPlaybackTimers.push(t);
  });

  const lastTime = Math.max(...midiPlaybackNotes.map(n => n.time + n.duration));
  const stopT = setTimeout(() => midiStopPlayback(), (lastTime * TEMPO + 0.3) * 1000 + 50);
  midiPlaybackTimers.push(stopT);
}

function prepMidiHelper() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; midiStopPlayback(); });
  html.innerHTML = `${windowBar()}
  <div class="cic-wrap cic-theme-midi">
    <div class="cic-header">
      <div class="cic-logo">MIDI.Helper</div>
      <div class="cic-sub">MIDI substitution cipher decoder &mdash; Liber Primus link extractor</div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Load MIDI File</div>
      <button class="cic-btn" id="midiPickBtn" onclick="openFilePicker('midiSubstitution', loadMidiFromDownload)">&#128193; Choose File from Downloads</button>
      <span class="cic-hint" id="midiFileLabel" style="margin-left:6px">no file selected</span>
      <div id="midiPlayerWrap" style="display:none;margin-top:6px">
        <button class="cic-btn" id="midiPlayBtn" onclick="midiStartPlayback()">&#9654; Play</button>
        <span class="cic-hint" style="margin-left:6px" id="midiPlayInfo"></span>
      </div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Output</div>
      <div class="cic-result-box" id="midiResult"><span class="cic-hint">choose a .mid file from Downloads to begin decoding</span></div>
    </div>
  </div>`;
  setWinTitle("MIDI Helper");
  initialHTML = html.innerHTML;
  midiStopPlayback();
  midiPlaybackNotes = [];
}

function prepOutguessHelper() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  html.innerHTML = `${windowBar()}
  <div class="cic-wrap cic-theme-stego">
    <div class="cic-header">
      <div class="cic-logo">Outguess.Helper</div>
      <div class="cic-sub">Outguess steganography extractor &mdash; PNG hidden message tool</div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">How It Works</div>
      <div class="cic-rule-block">Outguess embeds hidden text inside PNG images using LSB steganography.<br>
      Choose the image and enter the passphrase to extract the hidden link.</div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Passphrase</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:4px">
        <span class="cic-ref-chip" style="color:var(--cic-accent);border-color:var(--cic-panel-accent);font-size:10px;padding:3px 10px;letter-spacing:2px">CICADA3301</span>
      </div>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Load Image</div>
      <button class="cic-btn" id="outguessPickBtn" onclick="openFilePicker('catOutguess', loadOutguessFromDownload)">&#128193; Choose File from Downloads</button>
      <span class="cic-hint" id="outguessFileLabel" style="margin-left:6px">no file selected</span>
    </div>
    <div class="cic-section">
      <div class="cic-section-title">Extracted Output</div>
      <div class="cic-result-box" id="outguessResult"><span class="cic-hint">choose a .png file from Downloads to begin extraction</span></div>
    </div>
  </div>`;
  setWinTitle("Outguess Helper");
  initialHTML = html.innerHTML;
}

// Both helper sites used to reach out to the player's real computer via a
// native <input type="file"> — but the only files that could ever mean
// anything to them are ones this fictional OS itself handed out through
// Downloads, so both now pull up openFilePicker() (ui.js) instead, filtered
// to the matching download type, and regenerate that file's content
// in-memory from its stored seed exactly the way loadFile() does when you
// double-click it in the Downloads folder.

async function loadOutguessFromDownload(i) {
  const name = state.downloadNames[i] || "unnamed.png";
  const label = document.getElementById("outguessFileLabel");
  if (label) label.textContent = name;
  const resultEl = document.getElementById("outguessResult");
  if (resultEl) resultEl.innerHTML = `<span class="cic-hint">Analysing image...</span>`;
  const rng = new MonoRandom(state.downloadRules[i]);
  const url = await renderCatOutguessImage(rng);
  await analyzeOutguessImage(url, resultEl);
}

async function analyzeOutguessImage(imgSrcUrl, resultEl) {
  if (!resultEl) return;
  try {
    const img = new Image();
    img.src = imgSrcUrl;
    await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; });
    const canvas = document.createElement('canvas');
    canvas.width  = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const extracted = lsbExtract(imgData);
    if (!extracted || extracted.trim() === '') {
      resultEl.innerHTML = `<p class="cic-status-err">&#x26A0; No steganographic payload detected in this image.</p>`;
      return;
    }

    resultEl.innerHTML = `
      <p class="cic-status-ok" style="margin-bottom:6px">&#x2713; Outguess extraction successful &mdash; passphrase accepted</p>
      <div class="cic-section-title" style="margin-bottom:4px">Hidden Message</div>
      <div style="font-family:'Courier New',monospace;font-size:12px;word-break:break-all;color:var(--cic-accent);padding:4px 0">${extracted.replace(/\n/g,'<br>')}</div>`;
  } catch(err) {
    resultEl.innerHTML = `<p class="cic-status-err">&#x26A0; Failed to read image: ${err.message}</p>`;
  }
}

function loadMidiFromDownload(i) {
  const name = state.downloadNames[i] || "unnamed.mid";
  const label = document.getElementById("midiFileLabel");
  if (label) label.textContent = name;
  const resultEl = document.getElementById("midiResult");
  if (resultEl) resultEl.innerHTML = "<p>Parsing...</p>";

  const rng   = new MonoRandom(state.downloadRules[i]);
  const notes = buildMidiNotes(midiFullTextFor(rng));
  midiPlaybackNotes = notes;
  midiStopPlayback();

  const wrap = document.getElementById("midiPlayerWrap");
  const info = document.getElementById("midiPlayInfo");
  if (wrap) wrap.style.display = "";
  if (info) info.textContent = `${notes.length} notes loaded`;

  analyzeMidiNotes(notes, resultEl);
}

function analyzeMidiNotes(notes, resultEl) {
  if (!resultEl) return;
  try {
    const knownFull = (PANGRAM + " " + PI_DIGITS).toLowerCase();
    const knownChars = [];
    for (const ch of knownFull) {
      if (WEBSITE_CHARS.includes(ch)) knownChars.push(ch);
    }
    const nKnown = knownChars.length;
    if (notes.length < nKnown) {
      resultEl.innerHTML = `<p style="color:red">MIDI has only ${notes.length} notes, but need at least ${nKnown} for known part.</p>`;
      return;
    }

    const charMap = new Map();
    for (let i = 0; i < nKnown; i++) {
      const note = notes[i];
      const pitch = note.pitch;
      const length = Math.round(note.duration * BASE_LENGTH);
      const velocity = note.velocity;
      const key = `${pitch}:${length}:${velocity}`;
      const ch = knownChars[i];
      if (!charMap.has(key)) charMap.set(key, new Set());
      charMap.get(key).add(ch);
    }

    let conflicts = 0;
    const mapRows = [];
    for (const [key, chars] of charMap.entries()) {
      const charList = Array.from(chars).sort().join('');
      const conflict = chars.size > 1;
      if (conflict) conflicts++;
      mapRows.push(`<tr${conflict ? ' style="background-color:#ffcccc"' : ''}><td>${key}</td><td>${charList}</td><td>${chars.size}</td></tr>`);
    }
    mapRows.sort();

    const decodeMap = new Map();
    for (let i = 0; i < nKnown; i++) {
      const note = notes[i];
      const pitch = note.pitch;
      const length = Math.round(note.duration * BASE_LENGTH);
      const velocity = note.velocity;
      const key = `${pitch}:${length}:${velocity}`;
      const ch = knownChars[i];
      if (!decodeMap.has(key)) decodeMap.set(key, ch);
    }

    let link = '';
    const ambiguousPositions = [];
    for (let i = nKnown; i < notes.length; i++) {
      const note = notes[i];
      const pitch = note.pitch;
      const length = Math.round(note.duration * BASE_LENGTH);
      const velocity = note.velocity;
      const key = `${pitch}:${length}:${velocity}`;
      if (decodeMap.has(key)) {
        const ch = decodeMap.get(key);
        link += ch;
        if (charMap.get(key).size > 1) ambiguousPositions.push(link.length - 1);
      } else {
        link += '?';
      }
    }

    let output = `<div class="cic-section-title">Decoded Link</div>
      <div style="font-family:'Courier New',monospace;font-size:12px;word-break:break-all;color:var(--cic-accent);padding:4px 0">${link}</div>`;
    if (ambiguousPositions.length > 0) {
      output += `<p class="cic-status-warn">⚠ Ambiguity at positions: ${ambiguousPositions.join(', ')} — characters may be incorrect</p>`;
    }
    if (conflicts > 0) {
      output += `<p class="cic-status-err">⚠ ${conflicts} conflicting key(s) in known part — mapping is not one-to-one</p>`;
    } else {
      output += `<p class="cic-status-ok">✓ Mapping consistent (${charMap.size} unique keys)</p>`;
    }
    output += `<details class="cic-details" style="margin-top:6px">
      <summary>Show mapping table (${charMap.size} entries)</summary>
      <table class="cic-table" style="margin-top:4px"><thead><tr><th>Pitch:Len:Vel</th><th>Char(s)</th><th>N</th></tr></thead>
      <tbody>${mapRows.join('')}</tbody></table>
    </details>`;
    resultEl.innerHTML = output;
  } catch (err) {
    resultEl.innerHTML = `<p class="cic-status-err">Failed to decode: ${err.message}</p>`;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLTIP PAGE
// ─────────────────────────────────────────────────────────────────────────────

function toolTips() {
  const snap = html.innerHTML; pushHistory(document.getElementById("win-title")?.textContent || "Google", () => { html.innerHTML = snap; });
  const links = [
    ["https://academo.org/demos/spectrum-analyzer/","Spectrum Analyzer"],
    ["https://www.rapidtables.com/convert/number/hex-to-ascii.html","Hex to ASCII"],
    ["https://www.boxentriq.com/code-breaking/atbash-cipher","Atbash Cipher"],
    ["https://cryptii.com/pipes/caesar-cipher","Caesar Cipher"],
    ["https://cryptii.com/pipes/vigenere-cipher","Vigenere Cipher"],
  ];

  const ASCII_DISPLAY = ["!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","/","0","1","2","3","4","5","6","7","8","9",":",";","&lt;","=","&gt;","?","@","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","{","|","}","~"];
  const polyTable = Array.from({length:10},(_,i)=>Array.from({length:9},(_,j)=>`<td class="cic-poly" onclick="this.classList.toggle('cic-poly-selected')">${ASCII_DISPLAY[i+j*10]}</td>`).join("")).map(r=>`<tr>${r}</tr>`).join("");
  const pigTable = [0,1,2,3].map(q=>{
    const start = q===0?0:q===1?Math.floor(ASCII_DISPLAY.length/4):q===2?ASCII_DISPLAY.length/2:Math.floor(ASCII_DISPLAY.length/4*3);
    const end   = q===0?ASCII_DISPLAY.length/4:q===1?ASCII_DISPLAY.length/2:q===2?ASCII_DISPLAY.length/4*3:ASCII_DISPLAY.length;
    const slice = ASCII_DISPLAY.slice(start,end);
    return `<tr>${slice.map(c=>`<td title="Index: ${ASCII_DISPLAY.indexOf(c)}">${c}</td>`).join("")}</tr><tr>${slice.map(c=>`<td style="font-family:ASCIIPigpen-Regular;font-size:14px" title="Index: ${ASCII_DISPLAY.indexOf(c)}">${c}</td>`).join("")}</tr>`;
  }).join("");
  const tapRows = TAP_CODES.map((row, r) =>
    `<tr><th>${r+1}</th>${row.map((ch,c) => `<td><b style="color:var(--cic-accent)">${r+1},${c+1}</b><br>${ch}</td>`).join("")}</tr>`
  ).join("");

  html.innerHTML = `${windowBar()}
  <div class="cic-wrap cic-theme-wiki">
    <div class="cic-topband"><b>CICADA3301SOLVED</b> &nbsp;wiki</div>
    <div class="cic-header">
      <div class="cic-logo">Uncovering Cicada3301Solved.com</div>
      <div class="cic-sub">Community wiki &amp; tool directory — maintained by solvers</div>
    </div>
    <div class="cic-toc">
      <a href="#sec-tools">Tool Websites</a>
      <a href="#sec-caesar">ASCII Caesar Cipher</a>
      <a href="#sec-playfair">ASCII Playfair Cipher</a>
      <a href="#sec-wordle">Wordle Rules</a>
      <a href="#sec-tapcode">Tap Code</a>
      <a href="#sec-pgp">PGP Passphrases</a>
      <a href="#sec-morse">Morse Code</a>
    </div>
    <div class="cic-body">
    <div class="cic-section" id="sec-tools">
      <div class="cic-section-title">Tool Websites</div>
      <ul class="cic-site-list">
        <li>www.cicada3301solved.com</li>
        <li>www.asciicaesarcipher.com</li>
        <li>decryptpgp.com</li>
        <li>tormail.onion</li>
        <li>liberprimus.onion</li>
        <li>midi.helper</li>
        <li>outguess.helper</li>
      </ul>
      <div class="cic-ref-links" style="margin-top:6px">
        ${links.map(([href,label])=>`<a class="cic-ref-chip" target="_blank" rel="noopener noreferrer" href="${href}">${label}</a>`).join("")}
        <span class="cic-ref-chip" style="color:var(--cic-text-faint)">Photoshop / paint.net</span>
      </div>
    </div>
    <div class="cic-section" id="sec-caesar">
      <div class="cic-section-title">ASCII Caesar Cipher</div>
      <div class="cic-rule-block">Shift each character through the <b>printable ASCII range</b> (! to ~, 94 chars total).<br>Alphabet wraps — shift 94 = shift 0.</div>
    </div>
    <div class="cic-section" id="sec-playfair">
      <div class="cic-section-title">ASCII Playfair Cipher</div>
      <div class="cic-rule-block"><b>10×9 Polybius square</b> of printable ASCII (! to ~).<br>
        Same row → shift right 1 &nbsp;|&nbsp; Same col → shift down 1 &nbsp;|&nbsp; Rectangle → swap columns.<br>
        Odd-length input: last character passes through unchanged.</div>
      <div class="cic-section-title" style="margin-top:6px">Polybius Square</div>
      <div style="overflow-x:auto"><table class="cic-table cic-poly"><tbody>${polyTable}</tbody></table></div>
      <div class="cic-section-title" style="margin-top:6px">Pigpen Table (Hover for Character Index)</div>
      <div style="overflow-x:auto"><table class="cic-table"><tbody>${pigTable}</tbody></table></div>
    </div>
    <div class="cic-section" id="sec-wordle">
      <div class="cic-section-title">Wordle Rules</div>
      <div class="cic-rule-block">
        Guess the hidden link one character at a time.<br>
        <b>&#10004;</b> = correct character &amp; position<br>
        <b>&#x2190;</b> = your guess is too high (correct char comes earlier in charset)<br>
        <b>&#x2192;</b> = your guess is too low (correct char comes later in charset)<br>
        <b>Charset order:</b> a–z → 0–9 → . → /
      </div>
    </div>
    <div class="cic-section" id="sec-tapcode">
      <div class="cic-section-title">Tap Code</div>
      <div class="cic-rule-block">Count taps in each group. <b>First group = row, second = column.</b></div>
      <table class="cic-table cic-tap-table"><thead><tr><th>#</th>${TAP_CODES[0].map((_,c)=>`<th>col ${c+1}</th>`).join("")}</tr></thead><tbody>${tapRows}</tbody></table>
    </div>
    <div class="cic-section" id="sec-pgp">
      <div class="cic-section-title">PGP Passphrases</div>
      <div class="cic-rule-block">The passphrase is one of four fixed words.</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px">
        <span class="cic-ref-chip" style="color:var(--cic-accent);border-color:var(--cic-panel-accent);font-size:10px;padding:3px 10px;letter-spacing:1px">INSTAR</span>
        <span class="cic-ref-chip" style="color:var(--cic-accent);border-color:var(--cic-panel-accent);font-size:10px;padding:3px 10px;letter-spacing:1px">DIVINITY</span>
        <span class="cic-ref-chip" style="color:var(--cic-accent);border-color:var(--cic-panel-accent);font-size:10px;padding:3px 10px;letter-spacing:1px">CICADA</span>
        <span class="cic-ref-chip" style="color:var(--cic-accent);border-color:var(--cic-panel-accent);font-size:10px;padding:3px 10px;letter-spacing:1px">CAESAR</span>
      </div>
    </div>
    <div class="cic-section" id="sec-morse">
      <div class="cic-section-title">Morse Code</div>
      <img class="cic-morse-img" src="img/morse_code.svg">
    </div>
    </div>
  </div>`;

  setWinTitle("Cicada3301Solved");
}

// ─── LSB steganography helpers ───────────────────────────────────────────────
// Embeds/extracts a UTF-8 string into the LSB of the red channel of an
// ImageData array.  Format: 4-byte big-endian payload length, then payload bits.

function lsbEmbed(imageData, text) {
  const bytes  = new TextEncoder().encode(text);
  const len    = bytes.length;
  // header: 4 bytes = length
  const bits = [];
  for (let i = 3; i >= 0; i--) bits.push(...byteToBits((len >> (i * 8)) & 0xff));
  for (const b of bytes) bits.push(...byteToBits(b));
  const data = imageData.data;
  if (bits.length > data.length / 4) throw new Error('Image too small to hold payload');
  for (let i = 0; i < bits.length; i++) {
    const px = i * 4; // red channel only
    data[px] = (data[px] & 0xfe) | bits[i];
  }
}

function lsbExtract(imageData) {
  const data = imageData.data;
  const totalPx = data.length / 4;
  // read 32 header bits → length
  let len = 0;
  for (let i = 0; i < 32; i++) len = (len << 1) | (data[i * 4] & 1);
  if (len <= 0 || len > totalPx - 4) return null;
  const bytes = new Uint8Array(len);
  for (let b = 0; b < len; b++) {
    let val = 0;
    for (let bit = 0; bit < 8; bit++) val = (val << 1) | (data[(32 + b * 8 + bit) * 4] & 1);
    bytes[b] = val;
  }
  return new TextDecoder().decode(bytes);
}

function byteToBits(b) {
  const bits = [];
  for (let i = 7; i >= 0; i--) bits.push((b >> i) & 1);
  return bits;
}
// ─────────────────────────────────────────────────────────────────────────────

// Draws the cat image onto a canvas, embeds the next-step URL via LSB
// steganography, and returns a PNG data URL. Pure function of the ruleseed
// (consumes it exactly once, via nextStep) — shared by the inline "here's
// a cat picture" lead (catOutguess, below) and by the Downloads-folder
// viewer that re-renders the same file from its stored seed.
async function renderCatOutguessImage(ruleseed) {
  const next = nextStep(ruleseed);

  const img = new Image();
  img.src = 'img/cat.png';
  await new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; });

  const canvas = document.createElement('canvas');
  canvas.width  = Math.max(img.naturalWidth  || 400, 400);
  canvas.height = Math.max(img.naturalHeight || 400, 400);
  const ctx = canvas.getContext('2d');
  if (img.naturalWidth) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  else { ctx.fillStyle = '#222'; ctx.fillRect(0, 0, canvas.width, canvas.height); }

  // Embed the next URL into the pixel LSBs
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  try { lsbEmbed(imgData, next); } catch(e) { /* image too small — skip embed silently */ }
  ctx.putImageData(imgData, 0, 0);

  return canvas.toDataURL('image/png');
}

async function catOutguess(ruleseed) {
  const app  = getLeadTarget();
  const seed = ruleseed.seed;
  const url  = await renderCatOutguessImage(ruleseed);

  const container = document.createElement('div');
  container.className = 'lead-block';
  container.style.cssText = 'text-align:center;padding:10px;';
  container.innerHTML = `
    <img src="${url}"
         oncontextmenu="return false"
         style="max-width:200px;max-height:200px;border:2px solid #444;display:block;margin:0 auto 8px;-webkit-user-drag:none;user-drag:none;">
    <button type="button" class="lead-midi-link" id="catDownloadBtn"
       style="display:inline-block;padding:4px 10px;background:#2a2a3a;border:1px solid #555;border-radius:3px;font-size:10px;color:#7fb3ff;cursor:pointer">
      &#11015; Download Image
    </button>`;

  app.innerHTML += '<div class="lead-wrap"></div>';
  app.lastElementChild.appendChild(container);

  // Like every other lead, this doesn't trigger an instant native browser
  // save — it stages the file into Downloads exactly like a real Dropbox
  // download would (state bookkeeping + sound + notification), so it opens
  // later from the Downloads folder (or the outguess.helper file picker)
  // instead of dropping straight onto the user's real disk.
  const btn = container.querySelector('#catDownloadBtn');
  if (btn) btn.addEventListener('click', () => {
    if (btn.disabled) return;
    btn.disabled = true;
    const name = generateDownloadName('catOutguess');
    state.downloads.push('catOutguess');
    state.downloadRules.push(seed);
    state.downloadNames.push(name);
    try { new Audio('audio/callend.mp3').play(); } catch(e) {}
    showNotification(name, fileTypeIcon('catOutguess'));
    btn.textContent = '✓ Downloaded';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'default';
  });
}

const RPG_WEAPONS = [
  // Real RPG references
  "Buster Sword","Masamune","Excalibur","Master Sword","Keyblade",
  "Monado","Dragonslayer","Frostmourne","Ashbringer","Thunderfury",
  "Ultima Weapon","Gungnir","Mjolnir","Gram","Kusanagi",
  // Elemental weapons
  "Flame Blade","Ice Brand","Thunder Spear","Earth Hammer","Wind Bow",
  "Light Saber","Dark Reaver","Poison Dagger","Holy Lance","Chaos Axe",
  // Procedural patterns
  "Ancient Relic","Cursed Blade","Sacred Staff","Mythril Sword","Orichalcum Edge",
  "Crystal Rapier","Demon Fang","Angel Wing","Dragon Claw","Phoenix Feather"
];
 
const RPG_ARMOR = [
  "Iron Armor","Steel Plate","Mithril Mail","Dragon Scale","Demon Hide",
  "Holy Vestment","Shadow Cloak","Crystal Shield","Aegis","Robe of Sages",
  "Leather Jerkin","Plate Mail","Chainmail","Royal Guard","Berserker's Fury"
];
 
const RPG_ACCESSORIES = [
  "Power Ring","Guard Bracer","Speed Boots","Magic Charm","Luck Pendant",
  "Focus Band","Barrier Orb","Regen Amulet","Counter Glove","Reflect Mirror",
  "Ribbon","Genji Glove","Celestial Anklet","Titan Belt","Mage Stone"
];
 
const RPG_PLAYER_NAMES = [
  "Cloud","Squall","Tidus","Lightning","Noctis","Terra","Cecil","Kain",
  "Sephiroth","Auron","Yuna","Aerith","Tifa","Rinoa","Vivi","Zidane",
  "Link","Zelda","Samus","Mega Man","Ryu","Ken","Chun-Li","Sonic",
  "Hero","Warrior","Mage","Thief","Cleric","Paladin","Ranger","Monk"
];
 
const RPG_ENEMIES = [
  "Goblin","Orc","Troll","Ogre","Dragon","Wyvern","Wyrm","Hydra",
  "Skeleton","Zombie","Wraith","Lich","Vampire","Werewolf","Demon","Devil",
  "Slime","Gel","Ooze","Chimera","Manticore","Basilisk","Cockatrice","Phoenix",
  "Golem","Elemental","Sprite","Imp","Fiend","Shadow","Specter","Revenant",
  "Behemoth","Leviathan","Bahamut","Ifrit","Shiva","Titan","Ramuh","Odin"
];
 
const RPG_BATTLE_THEMES = ["jrpg","modern","dnd","terminal"];
 
const RPG_FLAVOR_VICTORY = [
  "Your attacks carve ancient symbols in the air...",
  "The enemy's defeat writes a message in blood...",
  "Each strike echoes with hidden meaning...",
  "Victory reveals a pattern in the chaos...",
  "The battle itself was a cipher...",
  "Your blade traced a secret message..."
];
 
const RPG_FLAVOR_DEFEAT = [
  "As you fall, you glimpse truth in the pattern...",
  "Defeat reveals what victory concealed...",
  "The enemy's strikes spell out a hidden message...",
  "In your final moments, you understand...",
  "Their attacks were speaking all along..."
];

function rpgBattleLog(ruleseed) {
  const app = getLeadTarget();
  
  // Determine target URL/phone/coordinate
  const target = nextStep(ruleseed);
  
  // Choose what damage to read: 0=player, 1=ally, 2=enemy
  const readPattern = ruleseed.nextMax(3);
  
  // Choose battle theme
  const theme = RPG_BATTLE_THEMES[ruleseed.nextMax(RPG_BATTLE_THEMES.length)];
  
  // Setup combatants
  const player = RPG_PLAYER_NAMES[ruleseed.nextMax(RPG_PLAYER_NAMES.length)];
  const ally = ruleseed.nextMax(2) === 0 ? null : RPG_PLAYER_NAMES[ruleseed.nextMax(RPG_PLAYER_NAMES.length)];
  const enemyCount = ruleseed.next(1, 4); // 1-3 enemies
  const enemies = Array.from({length: enemyCount}, () => 
    RPG_ENEMIES[ruleseed.nextMax(RPG_ENEMIES.length)]
  );
  
  // Equipment
  const weapon = RPG_WEAPONS[ruleseed.nextMax(RPG_WEAPONS.length)];
  const armor = RPG_ARMOR[ruleseed.nextMax(RPG_ARMOR.length)];
  const accessory = ruleseed.nextMax(2) === 0 ? null : 
    RPG_ACCESSORIES[ruleseed.nextMax(RPG_ACCESSORIES.length)];
  
  // Build battle log
  let battleLog = [];
  let turnCount = 0;
  let encoded = "";

  // Generate turns to encode the target
  for (const char of target) {
    // Find damage value that encodes this character
    const charIndex = ASCII_CHARS.indexOf(char);
    const validIndex = charIndex === -1 ? 0 : charIndex;
    
    // Generate damage value: (damage % 94) === charIndex
    const damage = validIndex + (ruleseed.nextMax(20) * 94); // 0-1880 range
    
    turnCount++;
    let attacker = "";
    let defender = "";
    
    if (readPattern === 0) { // Player attacks encode
      attacker = player;
      defender = enemies[ruleseed.nextMax(enemies.length)];
    } else if (readPattern === 1) { // Ally attacks encode
      if (ally) {
        attacker = ally;
        defender = enemies[ruleseed.nextMax(enemies.length)];
      } else {
        attacker = player;
        defender = enemies[ruleseed.nextMax(enemies.length)];
      }
    } else { // Enemy attacks encode
      attacker = enemies[ruleseed.nextMax(enemies.length)];
      defender = ruleseed.nextMax(2) === 0 ? player : (ally || player);
    }

    const isCritRaw = ruleseed.nextMax(2) === 0;
    battleLog.push({
      turn: turnCount,
      attacker,
      defender,
      damage,
      isCrit: damage < 1000 && isCritRaw,
      encodes: true
    });
    encoded += char;
    
    // Add filler turns — the encoding attacker is never used as filler attacker
    const fillerCount = ruleseed.next(1, 3);
    for (let f = 0; f < fillerCount; f++) {
      turnCount++;
      const fillerDamage = ruleseed.next(10, 200);
      
      let fAttacker, fDefender;
      const useEnemy = f % 2 === 0;
      
      if (readPattern === 0) { // Player encodes — filler: enemy or ally (never player)
        if (useEnemy || !ally) {
          fAttacker = enemies[ruleseed.nextMax(enemies.length)];
          fDefender = ally || player;
        } else {
          fAttacker = ally;
          fDefender = enemies[ruleseed.nextMax(enemies.length)];
        }
      } else if (readPattern === 1) { // Ally encodes — filler: enemy or player (never ally)
        if (useEnemy) {
          fAttacker = enemies[ruleseed.nextMax(enemies.length)];
          fDefender = player;
        } else {
          fAttacker = player;
          fDefender = enemies[ruleseed.nextMax(enemies.length)];
        }
      } else { // Enemy encodes — filler: player or ally (never enemies)
        if (f % 2 === 0 || !ally) {
          fAttacker = player;
          fDefender = enemies[ruleseed.nextMax(enemies.length)];
        } else {
          fAttacker = ally;
          fDefender = enemies[ruleseed.nextMax(enemies.length)];
        }
      }

      const fCritRaw = ruleseed.nextMax(2) === 0;
      battleLog.push({
        turn: turnCount,
        attacker: fAttacker,
        defender: fDefender,
        damage: fillerDamage,
        isCrit: fillerDamage < 1000 && fCritRaw,
        encodes: false
      });
    }
  }
  
  // Battle outcome
  const victory = ruleseed.nextMax(2) === 0;
  const flavor = victory 
    ? RPG_FLAVOR_VICTORY[ruleseed.nextMax(RPG_FLAVOR_VICTORY.length)]
    : RPG_FLAVOR_DEFEAT[ruleseed.nextMax(RPG_FLAVOR_DEFEAT.length)];
  
  // Render the battle log
  const html = renderBattleLog(theme, player, ally, enemies, weapon, armor, accessory,
                                battleLog, victory, flavor, readPattern);
  
  // No .lead-block wrapper here on purpose — a battle log is a plain text
  // file, so it shouldn't get the boxed/backgrounded puzzle-card treatment
  // other lead types get. It just drops straight into the host page.
  app.innerHTML += html;
  
  console.log(`[RPG Battle] Theme: ${theme}, Pattern: ${readPattern === 0 ? "Player" : readPattern === 1 ? "Ally" : "Enemy"}`);
  console.log(`[RPG Battle] Encoded target: ${target}`);
  console.log(`[RPG Battle] Read pattern: Extract damage from ${readPattern === 0 ? player : readPattern === 1 ? (ally || player) : "enemy"} attacks only`);
}

function renderBattleLog(theme, player, ally, enemies, weapon, armor, accessory,
                         battleLog, victory, flavor, readPattern) {
  let html = `<div class="rpg-battle rpg-${theme}">`;
  
  // Header
  html += renderBattleHeader(theme, player, ally, enemies, weapon, armor, accessory);
  
  // Battle turns
  html += '<div class="rpg-log">';
  for (const turn of battleLog) {
    html += renderBattleTurn(theme, turn, weapon);
  }
  html += '</div>';
  
  // Footer
  html += renderBattleEnd(theme, victory, flavor);
  
  // Hint section
  const readHint = readPattern === 0 ? player : 
                   readPattern === 1 ? (ally || player) : 
                   "enemy";
  html += `<div class="rpg-hint">💡 Focus on damage dealt by ${readHint}</div>`;
  
  html += '</div>';
  return html;
}
 
function renderBattleHeader(theme, player, ally, enemies, weapon, armor, accessory) {
  let html = '<div class="rpg-header">';
  
  switch (theme) {
    case "jrpg":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">╔═══════════════════════════════════════════════╗</div>';
      html += '<div class="rpg-title">║           BATTLE COMMENCED                    ║</div>';
      html += '<div class="rpg-title">╚═══════════════════════════════════════════════╝</div>';
      html += '</div>';
      html += `<div class="rpg-combatant">${player} (Equipped: ${weapon}, ${armor}${accessory ? ", " + accessory : ""})</div>`;
      if (ally) html += `<div class="rpg-combatant">${ally} (Party member)</div>`;
      html += '<div class="rpg-vs">vs</div>';
      enemies.forEach(e => html += `<div class="rpg-enemy">${e}</div>`);
      break;
      
    case "modern":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>';
      html += '<div class="rpg-title">  COMBAT INITIATED</div>';
      html += '<div class="rpg-title">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>';
      html += '</div>';
      html += `<div class="rpg-combatant">▸ ${player} [${weapon}] [${armor}]${accessory ? " [" + accessory + "]" : ""}</div>`;
      if (ally) html += `<div class="rpg-combatant">▸ ${ally} [Support]</div>`;
      html += '<div class="rpg-vs">VS</div>';
      enemies.forEach(e => html += `<div class="rpg-enemy">▸ ${e}</div>`);
      break;
      
    case "dnd":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">═══════════════════════════════════════════════════</div>';
      html += `<div class="rpg-narrative">The party encounters ${enemies.join(", ")}!</div>`;
      html += '<div class="rpg-title">═══════════════════════════════════════════════════</div>';
      html += '</div>';
      html += `<div class="rpg-narrative">${player} readies their ${weapon} and ${armor}.</div>`;
      if (accessory) html += `<div class="rpg-narrative">Their ${accessory} glows with power.</div>`;
      if (ally) html += `<div class="rpg-narrative">${ally} stands ready at their side.</div>`;
      html += '<div class="rpg-narrative">Roll for initiative!</div>';
      break;
      
    case "terminal":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">┌─────────────────────────────────────────────────┐</div>';
      html += '<div class="rpg-title">│ COMBAT.EXE — SYSTEM ENGAGED                     │</div>';
      html += '<div class="rpg-title">└─────────────────────────────────────────────────┘</div>';
      html += '</div>';
      html += `<div class="rpg-terminal">&gt; LOAD_COMBATANT: ${player}</div>`;
      html += `<div class="rpg-terminal">&gt; EQUIP: ${weapon} | ${armor}${accessory ? " | " + accessory : ""}</div>`;
      if (ally) html += `<div class="rpg-terminal">&gt; ALLY_DETECTED: ${ally}</div>`;
      html += `<div class="rpg-terminal">&gt; HOSTILES: ${enemies.join(" | ")}</div>`;
      html += '<div class="rpg-terminal">&gt; INITIALIZING...</div>';
      break;
  }
  
  html += '</div>';
  return html;
}
 
function renderBattleTurn(theme, turn, weapon) {
  const {turn: turnNum, attacker, defender, damage, isCrit} = turn;
  
  let html = '<div class="rpg-turn';
  if (isCrit) html += ' rpg-crit';
  html += '">';
  
  switch (theme) {
    case "jrpg":
      html += isCrit
        ? `Turn ${turnNum}: ${attacker} uses ${weapon}! CRITICAL HIT! ${defender} takes <span class="rpg-dmg">${damage}</span> damage!`
        : `Turn ${turnNum}: ${attacker} attacks ${defender} for <span class="rpg-dmg">${damage}</span> damage.`;
      break;
      
    case "modern":
      html += isCrit
        ? `[${turnNum}] ${attacker} ⚔ ${defender} — ⚡CRITICAL⚡ <span class="rpg-dmg">${damage}</span> DMG`
        : `[${turnNum}] ${attacker} ⚔ ${defender} — <span class="rpg-dmg">${damage}</span> DMG`;
      break;
      
    case "dnd":
      html += isCrit
        ? `Turn ${turnNum}: ${attacker} strikes ${defender} with precision! Natural 20! <span class="rpg-dmg">${damage}</span> damage dealt.`
        : `Turn ${turnNum}: ${attacker} attacks ${defender}. Hit! <span class="rpg-dmg">${damage}</span> damage.`;
      break;
      
    case "terminal":
      html += isCrit
        ? `&gt; T${String(turnNum).padStart(3, '0')} | ${attacker} &gt;&gt; ${defender} | CRIT_HIT | DMG:<span class="rpg-dmg">${damage}</span>`
        : `&gt; T${String(turnNum).padStart(3, '0')} | ${attacker} &gt;&gt; ${defender} | DMG:<span class="rpg-dmg">${damage}</span>`;
      break;
  }
  
  html += '</div>';
  return html;
}
 
function renderBattleEnd(theme, victory, flavor) {
  let html = '<div class="rpg-footer">';
  
  switch (theme) {
    case "jrpg":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">╔═══════════════════════════════════════════════╗</div>';
      html += victory
        ? '<div class="rpg-title">║           ★ VICTORY ★                         ║</div>'
        : '<div class="rpg-title">║           ✕ DEFEAT ✕                          ║</div>';
      html += '<div class="rpg-title">╚═══════════════════════════════════════════════╝</div>';
      html += '</div>';
      html += `<div class="rpg-flavor">${flavor}</div>`;
      break;
      
    case "modern":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>';
      html += victory
        ? '<div class="rpg-title">  ⚔ COMBAT VICTORIOUS ⚔</div>'
        : '<div class="rpg-title">  ☠ COMBAT FAILED ☠</div>';
      html += '<div class="rpg-title">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>';
      html += '</div>';
      html += `<div class="rpg-flavor">${flavor}</div>`;
      break;
      
    case "dnd":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">═══════════════════════════════════════════════════</div>';
      html += victory
        ? '<div class="rpg-narrative">The battle is won! Experience gained.</div>'
        : '<div class="rpg-narrative">The party has fallen...</div>';
      html += `<div class="rpg-flavor">${flavor}</div>`;
      html += '<div class="rpg-title">═══════════════════════════════════════════════════</div>';
      html += '</div>';
      break;
      
    case "terminal":
      html += '<div class="rpg-title-box">';
      html += '<div class="rpg-title">┌─────────────────────────────────────────────────┐</div>';
      html += victory
        ? '<div class="rpg-title">│ STATUS: COMBAT_COMPLETE | RESULT: SUCCESS       │</div>'
        : '<div class="rpg-title">│ STATUS: COMBAT_COMPLETE | RESULT: FAILURE       │</div>';
      html += '<div class="rpg-title">└─────────────────────────────────────────────────┘</div>';
      html += '</div>';
      html += `<div class="rpg-terminal">&gt; ${flavor}</div>`;
      break;
  }
  
  html += '</div>';
  return html;
}