const R = require('ramda')

const Games = require('./games')

const { createCard } = require('./factory')

const suits = ['c', 'd', 'h', 's']
const numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K']

const isADeck =
  deck =>
    deck.length === 52 &&
    deck.every(R.pipe(
      R.toString,
      R.match(/^Card\([A|2|3|4|5|6|7|8|9|T|J|Q|K][c|d|h|s]\)$/g))
    ) &&
    R.uniq(deck).length === 52

const numReducer =
  (deck, number) => [
    ...deck,
    ...suits.map(
      suit => createCard({ suit, number })
    )
  ]

const newDeck =
  () => numbers.reduce(numReducer, [])

const shuffle =
  deck =>
    deck && isADeck(deck)
      ? [...deck].sort(() => Math.random() - 0.5)
      : new TypeError(`shuffle() received a \`${typeof deck}\` value, \`Card[]\` expected`)

const deal =
  (gameType, players, deck) => {
    if (!Object.values(Games).includes(gameType)) {
      return new TypeError(`deal() received a \`${typeof gameType}\` value, \`GameType\` expected`)
    }
    if (!(deck && isADeck(deck))) {
      return new TypeError(`deal() received a \`${typeof gameType}\` value, \`GameType\` expected`)
    }

    return deck
  }

module.exports = {
  deal,
  isADeck,
  newDeck,
  shuffle
}
