const BASE_URL = 'http://swapi.co/api'

const PEOPLE_URL = `${BASE_URL}/people`
const STARSHIPS_URL = `${BASE_URL}/starships`

let playerScore = 0
let opponentScore = 0

let currentPlayerPerson = {}
let currentOpponentPerson = {}

// Find the buttons

const newPeopleGameButton = document.querySelector('#new-people-button')
const newStarshipsGameButton = document.querySelector('#new-starships-button')

// Add event listeners for new game buttons

newPeopleGameButton.addEventListener('click', () => newGame('people'))
newStarshipsGameButton.addEventListener('click', () => newGame('starships'))

// Find the cards

const playerCard = document.querySelector('#player-card')
const opponentCard = document.querySelector('#opponent-card')

const newGame = (type) => {

  if (type === 'people') {
    selectPeopleCard()
  } else {
    // selectStarshipCard()
  }
}

const selectPeopleCard = () => {
  const playerRandomPerson = getPerson(Math.floor(Math.random() * 87))
  const opponentRandomPerson = getPerson(Math.floor(Math.random() * 87))
  if (playerRandomPerson === opponentRandomPerson) {
    selectPeopleCard()
  } else {
    renderCards(playerRandomPerson, opponentRandomPerson)
  }
}

const getPerson = (id) => {
  fetch(`${PEOPLE_URL}/${id}`)
  .then(resp => resp.json())
}

const renderCards = (playerPerson, opponentPerson) => {
  currentPlayerPerson = playerPerson
  currentOpponentPerson = opponentPerson
  debugger
}