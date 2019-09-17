import { tsBigIntKeyword } from "@babel/types";

const BASE_URL = 'https://swapi.co/api'

const PEOPLE_URL = `${BASE_URL}/people`
const STARSHIPS_URL = `${BASE_URL}/starships`

let player1Score = 0
let player2Score = 0

const player1ScoreElement = document.querySelector('#player1-score')
const player2ScoreElement = document.querySelector('#player2-score')
const player1CardElement = document.querySelector('#player1-card-body')
const player2CardElement = document.querySelector('#player2-card-body')

let player1Current = {}
let player2Current = {}

// Find the buttons

const newPeopleGameButton = document.querySelector('#new-people-button')
const newStarshipsGameButton = document.querySelector('#new-starships-button')
const nextCardButton = document.querySelector('#next-card-button')

// Add event listeners for buttons

newPeopleGameButton.addEventListener('click', () => newGame('people'))
newStarshipsGameButton.addEventListener('click', () => newGame('starships'))

// New Game function depending on type of game

const newGame = (type) => {
  let title = document.querySelector('#game-title')
  title.innerText = `New ${type} game!`
  newPeopleGameButton.disabled = true
  newStarshipsGameButton.disabled = true
  nextCardButton.classList.remove('invisible')
  nextCardButton.disabled = true
  nextCardButton.addEventListener('click', () => nextCard(type))
  if (type === 'people') {
    selectPeopleCard('player1')
    selectPeopleCard('player2')
  } else {
    selectStarshipCard('player1')
    selectStarshipCard('player2')
  }
}

// Functions for selecting cards

const selectPeopleCard = (player) => {
  let random = Math.floor(Math.random() * 87)
  getPerson(random, player).then(person => renderCard(person, player, 'person'))
}

const selectStarshipCard = (player) => {
  let random = Math.floor(Math.random() * 35)
  getStarship(random, player).then(starship => renderCard(starship, player, 'starship'))
}

// Next card function - only available after a selection

const nextCard = (type) => {
  player2CardElement.classList.add('invisible')
  nextCardButton.disabled = true
  if (type === 'people') {
    selectPeopleCard('player1')
    selectPeopleCard('player2')
  } else {
    selectStarshipCard('player1')
    selectStarshipCard('player2')
  }
}

// Fetch requests for people and starships

const getPerson = (id, player) => {
  return fetch(`${PEOPLE_URL}/${id}`)
    .then(resp => resp.json())
    .then(person => {
      if (person.name && ((person.height !== 'unknown') && (person.mass !== 'unknown'))) return person
      else {
        selectPeopleCard(player)
      }
    })
}

const getStarship = (id, player) => {
  return fetch(`${STARSHIPS_URL}/${id}`)
    .then(resp => resp.json())
    .then(starship => {
      if (starship.name && ((starship.length !== 'unknown') && (starship.crew !== 'unknown'))) return starship
      else {
        selectStarshipCard(player)
      }
    })
}

// Render function that works for both people and starships

const renderCard = (data, player, type) => {
  if (!data) return
  updateCurrent(data, player, type)
  let firstOption
  let secondOption
  if (type === 'person') {
    firstOption = 'height'
    secondOption = 'mass'
  } else {
    firstOption = 'length'
    secondOption = 'crew'
  }
  let card = document.querySelector(`#${player}-card-body`)
  card.innerHTML = ''
  let cardTitle = document.createElement('h5')
  cardTitle.innerText = data.name
  let opt1 = document.createElement('p')
  opt1.innerText = `${firstOption}: ${data[firstOption]}`
  if (player === 'player1') {
    let opt1Button = document.createElement('button')
    opt1Button.innerText = `Choose ${firstOption}`
    opt1Button.addEventListener('click', () => select(firstOption))
    opt1.append(opt1Button)
  }
  let opt2 = document.createElement('p')
  opt2.innerText = `${secondOption}: ${data[secondOption]}`

  if (player === 'player1') {
    let opt2Button = document.createElement('button')
    opt2Button.innerText = `Choose ${secondOption}`
    opt2Button.addEventListener('click', () => select(secondOption))
    opt2.append(opt2Button)
  }

  card.append(cardTitle, opt1, opt2)
}

// Updates global value of current cards to check result

const updateCurrent = (data, player) => {
  if (player === 'player1') {
    player1Current = data
  } else {
    player2Current = data
  }
}

// Selection and checking result

const select = (option) => {
  player2CardElement.classList.remove('invisible')
  const selectButtons = player1CardElement.querySelectorAll('button')
  selectButtons.forEach(button => {
    button.classList.add('invisible')
  })
  const lastResult = document.querySelector('#last-result')
  nextCardButton.disabled = false
  let player1Result = parseInt(player1Current[option].replace(/,/g, ""))
  let player2Result = parseInt(player2Current[option].replace(/,/g, ""))
  if (player1Result > player2Result) {
    lastResult.innerText = 'Victory!'
    player1Score += 1
  } else if (player1Result < player2Result) {
    lastResult.innerText = 'Loss!'
    player2Score += 1
  } else if (player1Result === player2Result) {
    lastResult.innerText = 'Draw!'
  } else {
    window.alert('Something went wrong!')
  }
  updateScore()
}

// Updates the score in the DOM

const updateScore = () => {
  player1ScoreElement.innerText = player1Score
  player2ScoreElement.innerText = player2Score
}
