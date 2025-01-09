const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

const characters = [
  'beth',
  'jerry',
  'jessica',
  'morty',
  'pessoa-passaro',
  'pickle-rick',
  'rick',
  'summer',
  'meeseeks',
  'scroopy',
]

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = ''
let secondCard = ''

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length === 20 ) {
        clearInterval(this.loop);
        alert(`parabéns ${localStorage.getItem('player')} você ganhou! seu tempo foi de ${timer.innerText} segundos`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondharacter) {
        firstCard.firstChild.classList.add('disabled-card')
        secondCard.firstChild.classList.add('disabled-card')

        firstCard = '';
        secondCard = '';

        checkEndGame()

    } else {
        setTimeout(() =>{

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)
    }
}

const revealCard = ({target}) => {

    if(target.parentElement.className.includes('reveal-card')) {
        return;
    }

    if(firstCard === ''){
        target.parentElement.classList.add('reveal-card');
        firstCard = target.parentElement;
    } else if(secondCard === '') {
        target.parentElement.classList.add('reveal-card');
        secondCard = target.parentElement;

        checkCards();
        }
}


const createCard = (character) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../img/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard)
    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicatedCharacters = [ ...characters, ...characters];

    const shuffledArray = duplicatedCharacters.sort(() => Math.random() - 0.5);
    
    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}
const startTimer = () =>{
 this.loop = setInterval(() => {
        const currentTime = +timer.innerText;
        timer.innerText = currentTime + 1
    }, 1000)
}

window.onload = () => {
    spanPlayer.innerText = localStorage.getItem('player')

    startTimer();
    loadGame();
}

