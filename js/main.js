'use strict';
let cardsTable = document.querySelector('.memory-cards');
let timerId;


//Еhis function is responsible for the event when clicking on the cards

function addPlayCards(length) {
	let counter = 1;
	let cards = document.querySelectorAll('.memory-card');
	let arrayActiveCards = [];
	let arrayClosedCards = [];
	length *= 2;
	let flag = false;


	for (let card of cards) {
		card.addEventListener('click', function clickCard() {
			if (flag === false) {
				startTime(length, arrayClosedCards);
				flag = true;
			}
			if( !(this.classList.contains('memory-card_active')) ) {
				switch(counter) {
					case 0:
					case 1:
						card.classList.add('memory-card_active');
						arrayActiveCards.push(card);
						++counter
					break;
					case 2:
						counter = undefined;
						card.classList.add('memory-card_active');
						arrayActiveCards.push(card);
						if (arrayActiveCards.length != 0) {
							if (arrayActiveCards[0].dataset.number === arrayActiveCards[1].dataset.number) {
								for (let elem of arrayActiveCards) {
									elem.classList.add('closed');
									arrayClosedCards.push(elem);
								}
							}
						}
							arrayActiveCards = [];
						waiteTime(1, () => {
							let activeCards = document.querySelectorAll('.memory-card_active');
	
							for (let activeCard of activeCards) {
								activeCard.classList.remove('memory-card_active');
							}
							if (checkLengthArrayElement(arrayClosedCards, length)) {
								arrayClosedCards = [];
								arrayActiveCards = [];
								removeMemoryCards()
							}	
							counter = 1;
						});
					break;
				}
			}
		});
	}
}


function removeMemoryCards() {
	let memoryCards = document.querySelectorAll('.memory-card');
	for (let i = memoryCards.length - 1; i >= 0; i--) {
		memoryCards[i].remove();
	}
}


//This function adds to wait
function waiteTime(seconds, func) {
	let acounter = seconds;
	
	let timerId = setInterval(function() {
		acounter--;
		if (acounter == 0) {
			clearInterval(timerId);
			func();
		}
	}, 1000)
}

// This function check length of array elements
function checkLengthArrayElement(arr, length) {
	return arr.length == length;
}

//control js//////////////////////////////////////////////////////

let controlForms = document.querySelectorAll('.control-form__box');
let controlButton = document.querySelector('.control-form__button');
let twelveInput = document.querySelector('#twelve')
let sixteenInput = document.querySelector('#sixteen');
let twentyInput = document.querySelector('#twenty')
let controlTime = document.querySelector('.control-time');	


for (let controlInput of controlForms) {
	controlInput.addEventListener('click', function() {
		for(let elem of controlForms) {
			elem.classList.remove('control-form__box_active');
		}
		controlInput.classList.add('control-form__box_active')
	})
}


let arrayImagesCards = [
	{
		pictureName: 'ball',
		id: 1
	},
	{
		pictureName: 'cocktail',
		id: 2
	},
	{
		pictureName: 'fan',
		id: 3
	},
	{
		pictureName: 'ice_cream',
		id: 4
	},
	{
		pictureName: 'juice',
		id: 5
	},
	{
		pictureName: 'pail',
		id: 6
	},
	{
		pictureName: 'palm-tree',
		id: 7
	},
	{
		pictureName: 'pineapple',
		id: 8
	},
	{
		pictureName: 'sun',
		id: 9
	},
	{
		pictureName: 'swimming_ballon',
		id: 10
	},
	{
		pictureName: 'umbrella',
		id: 11
	},
	{
		pictureName: 'weatermelon',
		id: 12
	}
];

//Создать функцию которая будет наблюдвать за длинной массива елементов с классом closed

controlButton.addEventListener('click', function() {
	if (twelveInput.checked) {
		clearInterval(timerId);
		changeValueDefault();
		removeMemoryCards();
		let length = 6;
		createCardTable(getCloneArray(arrayImagesCards), length)
		addPlayCards(length);
	}

	if (sixteenInput.checked) {
		clearInterval(timerId);
		changeValueDefault();
		removeMemoryCards();
		let length = 8;
		createCardTable(getCloneArray(arrayImagesCards), length)
		addPlayCards(length);
	}

	if (twentyInput.checked) {
		clearInterval(timerId);
		changeValueDefault();
		removeMemoryCards();
		let length = 10;
		createCardTable(getCloneArray(arrayImagesCards), length)
		addPlayCards(length);

		let cards = document.querySelectorAll('.memory-card');
		for (let card of cards) {
			card.classList.add('memory-card_width');
		}
	}
});



//This function return a random digit in the given range
function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

//This function create an array of the desired length
function getArrayDesiredLength(array, length) {
	let result = [];
	for (let i = 0; i < length; i++) {
		let elem = array.splice(getRandom(0, array.length - 1), 1);
		result.push(elem[0]);
	}

	return result;
}



//This function return a clone array in the given array
function getCloneArray(array) {
	let result = [];
	for (let elem of array) {
		result.push(elem);
	}

	return result;
}

//This function create and to return double array
function getDoubleArray(array) {
	let result = array.concat(getCloneArray(array));

	return result;
}


//This function return to change elem wiht to add a text
function addTextElem(elem, text) {
	return elem += text;
}

function createCardTable(array, amount) {
	let newArray = array;

	newArray = getArrayDesiredLength(newArray, amount);
	newArray = getDoubleArray(newArray);

	for (let elem of newArray) {
		createCard(elem.pictureName, elem.id);
	}
}


//This function create a card in document html. Also this function take two arguments. 
function createCard(name, id) {
	let memoryCard = document.createElement('div');
	memoryCard.classList.add(`memory-card`);
	memoryCard.setAttribute('data-number', id);
	memoryCard.insertAdjacentHTML('afterBegin', 
	`<div class="frond-card">
		<img class="frond-card__img" src="image/svg/stars.svg" alt="stars">
	</div>
	<div class="back-card">
		<img class="back-card__img" src="image/svg/icons/${name}.svg" alt="${name}">
	</div>`)

	cardsTable.appendChild(memoryCard);
}

//timer ==========================================================================================


function startTime(length, arr) {
	let counter = '0'
	let i = '0';
	let k = '0';
	timerId = setInterval(function() {
		k = Number(k) + 1;
		if (length === arr.length) clearInterval(timerId);
		controlTime.innerHTML = `${normaliseValueTime(counter)} : ${normaliseValueTime(i)}.${normaliseValueTime(k)}`;
		if(i == 60) {
			counter++;
			i = '0';
		}
		if(k == 100) {
			i++;
			k = '0';
		}
	},10);
}



function normaliseValueTime(value) {
	value = String(value);
	if (value.length <= 1) {
		value = '0' + value
	}
	return value; 
}

function changeValueDefault() {
	controlTime.innerHTML = '00 : 00.00';
}


