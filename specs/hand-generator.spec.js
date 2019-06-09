const { describe, Try } = require('riteway')
const R = require('ramda')

const Games = require('../lib/games')
const { deal, isADeck, newDeck, shuffle } = require('../lib/cards')

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
    actual: deck.every(R.pipe(
      R.toString,
      R.match(/^Card\([A|2|3|4|5|6|7|8|9|T|J|Q|K][c|d|h|s]\)$/g))
    ),
    expected: true
  })

  assert({
    given: 'no arguments',
    should: 'return a deck of 52 different cards',
    actual: R.uniq(deck).length,
    expected: 52
  })
})

describe('shuffle()', async assert => {
  const deck = newDeck()

  assert({
    given: 'no argument',
    should: 'throw',
    actual: Try(shuffle()),
    expected: new TypeError()
  })

  assert({
    given: 'a deck',
    should: 'return an actual deck',
    actual: isADeck(shuffle(deck)),
    expected: true
  })

  assert({
    given: 'a deck',
    should: 'return a different deck',
    actual: JSON.stringify(shuffle(deck)) !== JSON.stringify(deck),
    expected: true
  })
})

describe('deal()', async assert => {
  const deck = newDeck()

  assert({
    given: 'no argument',
    should: 'throw',
    actual: Try(deal()),
    expected: new TypeError()
  })

  assert({
    given: 'a Game type',
    should: 'throw',
    actual: Try(deal(Games.HOLDEM)),
    expected: new TypeError()
  })

  assert({
    given: 'a Game type and 2 players',
    should: 'throw',
    actual: Try(deal(Games.HOLDEM, 2)),
    expected: new TypeError()
  })

  assert({
    given: 'a Game type, 2 players and a deck',
    should: 'return a hand',
    actual: Array.isArray(deal(Games.HOLDEM, 2, deck)),
    expected: true
  })
})
