const createCard = ({
  suit = '',
  number = ''
} = {}) => ({
  suit,
  number,
  toString: () => `Card(${number + suit})`
})

module.exports = {
  createCard
}
