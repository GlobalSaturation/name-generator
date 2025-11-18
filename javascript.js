let names = [
'Cheesy Feets',
'Bob McRoss',
'Chinnigan',
'Poopskidoo',
'Snacker',
'Harold Doogin',
'Smelly',
'Dude Guy',
'Fungus',
'Sir Fancy Pants',
'Weenie Junior',
'Beef Frank',
'Mr. Toots',
'Stinky Feets',
'Dorito Muncher',
'Pingus',
'Sniffer',
'Beef',
'Poongledorf',
'Bingle',
'Smackeroo',
'David',
'The peepinator',
'Keanu Oui',
'Peeperoni',
'Jeepers Peepers',
'Beanie Weenie'
]

let order = 2;//determine what size chunks we're breaking the words into
let beginnings = [];
let endings = [];
let ngrams = {};

function setup() {
	for (let i = 0; i < names.length; i++) {
		let txt = names[i];
		//get the ngrams from each array element
		for (let j = 0; j <= txt.length - order; j++) {
			let gram = txt.substring(j, j + order);
			//keep track of the beginnings/endings of words as well
			if (j == 0) {
				beginnings.push(gram);
			}
			if (j == txt.length - order) {
				endings.push(gram);
			}
			
			//store the characters that come after our ngrams
			//this is so that we can figure out the most likely char that follows
			if (!ngrams[gram]) {
				ngrams[gram] = [];
			}
			ngrams[gram].push(txt.charAt(j + order));
		}
	}

	let genBtn = document.getElementById("generate");
	genBtn.addEventListener("click", markovIt);
}

function getRandomArrayElem(array) {
	//generate a random number from 0 to length-1
	let index = Math.floor(Math.random() * array.length);
	return array[index];
}

function markovIt() {
	let currentGram = getRandomArrayElem(beginnings);
	let result = currentGram;

	for (let i = 0; i < 20; i++) {
		let possibilities = ngrams[currentGram];
		if (!possibilities) {
			break;
		}

		let next = getRandomArrayElem(possibilities);
		result += next;

		let len = result.length;
		currentGram = result.substring(len-order, len);

		//chance that the generating ends early
		let endChances = 4;
		if (endings.includes(currentGram)) {
			//generate a number from 1 to endChances
			let randomNum = Math.floor(Math.random() * endChances) + 1;
			if (randomNum == 1) {
				break;
			}
		}
	}

	console.log(result);
}

setup();
