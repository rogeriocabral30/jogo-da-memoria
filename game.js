const grid = document.querySelector('.grid');

const characters = [
    'lufy',
    'zoro',
    'nami',
    'usop',
    'choper',
    'sanji',
    'franky',
    'robin',
    'brok',
    'jimbo',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20){
        alert('Parabéns, voce venceu!');
    }

}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter === secondCharacter){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        firstCard = '';
        secondCard = '';
        checkEndGame();
    }else{
        setTimeout(() => {
        firstCard.classList.remove('reveal-card');
        secondCard.classList.remove('reveal-card');
        firstCard = '';
        secondCard = '';
    }, 500);
    }

}

const revealCard = ({target}) => {
    
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }
        if( firstCard =='' ){
            target.parentNode.classList.add('reveal-card');
            firstCard = target.parentNode;

        }else if (secondCard ==''){
            target.parentNode.classList.add('reveal-card');
            secondCard = target.parentNode;

            checkCards();
        }
    


}

const createCard = (character) => {

    const card = createElement ('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagem/${character}.png')`;


    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);

    card.setAttribute('data-character', character);

    return card;
}

const loadGame = () => {
    const duplicateCharacters = [...characters, ...characters];
    duplicateCharacters.sort(() => Math.random() - 0.5);
    duplicateCharacters.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
}

loadGame();