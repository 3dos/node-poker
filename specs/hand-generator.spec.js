const { describe } = require('riteway')
const R = require('ramda')

const { Card, newDeck } = require('../lib/cards')

describe('newDeck()', async assert => {
  const deck = newDeck()

  assert({
    given: 'no arguments',
    should: 'return a deck of 52 cards',
    actual: Array.isArray(deck) && deck.length,
    expected: 52
  })

  assert({
    given: 'no arguments',
    should: 'return a deck of Card prototypes',
    actual: deck.every(x => Card.isPrototypeOf(x)),
    expected: true
  })

  assert({
    given: 'no arguments',
    should: 'return a deck of 52 different cards',
    actual: R.uniq(deck).length,
    expected: 52
  })
})
