////////////////////
// VARIALES //
////////////////////

const card = document.querySelector('.card');
const rateListe = document.querySelector('.card__rating');
const button = document.querySelector('.card__button');
const rateSate = document.querySelector('#rate-sate');
const template = document.querySelector('#thanks');

let rateValue = null;

////////////////////
// FONCTION //
////////////////////

function onClickRate(e) {
	const listeItems = Array.from(rateListe.children);
	const itemClicked = e.target;
	if (e.target.matches('[data-value]')) {
		//Remove the selected class from all the list items
		listeItems.forEach((item) => {
			if (item.classList.contains('selected')) {
				item.classList.remove('selected');
			}
		});

		//Add the selected class to the item clicked
		itemClicked.classList.add('selected');

		rateValue = itemClicked.dataset.value;
		button.disabled = false;
	}
}

function onClickSubmit(e) {
	const clone = document.importNode(template.content, true);
	const thankState = clone.querySelector('#thank-state');
	const rated_value = clone.querySelector('#rated_value');
	rated_value.innerText = rateValue;

	card.classList.add('fade-out');
	card.onanimationend = (e) => {
		console.log(e.animationName);
		if (e.animationName === 'fadeOut') {
			card.classList.add('fade-in');
			card.removeChild(rateSate);
			card.classList.remove('fade-out');
		} else if (e.animationName === 'fadeIn') {
			card.classList.remove('fade-in');
		}
		card.appendChild(clone);
	};
}

////////////////////
// CODE PRINCIPAL //
////////////////////

document.addEventListener('DOMContentLoaded', () => {
	if (!rateValue) {
		button.disabled = true;
	}

	rateListe.addEventListener('click', onClickRate);
	button.addEventListener('click', onClickSubmit);
});
