'use strict';

let cards = document.querySelectorAll('.memory-card');
let counter = 0;

for (let card of cards) {
	card.addEventListener('click', function clickCard() {
		if (counter == 2) {
			waiteTime(2, function() {
				card.removeEventListener('click', clickCard);
				for (let card of cards) {
					card.classList.remove('active');
				}
				card.addEventListener('click', clickCard);
				counter = 0;
			});
		} else if (counter <= 2) {
			card.classList.add('active');
		++counter;
		}


		
	});
}


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


 





