const Card = {
  suit: '',
  number: ''
}

const gen =
  obj => props => Object.assign(Object.create(obj), props)

const suits = ['c', 'd', 'h', 's']
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']

const cardReducer =
  (
    deck = [],
    number = ''
  ) => deck.concat(suits.map(suit => gen(Card)({ suit, number })))

const newDeck =
  () => numbers.reduce(cardReducer, [])

module.exports = {
  Card,
  newDeck
}
