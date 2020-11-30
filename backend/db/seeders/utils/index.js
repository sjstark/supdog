const faker = require('faker')

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const selectRandom = (list) => {
  return list[getRandomInt(0, list.length)]
}

const ticketTypes = [
  'General Admission',
  'VIP',
  'Basic',
  'Advanced Pricing',
  'Orchestra',
  'Balcony',
  'Early Acces',
  'All You Can Drink',
  'Front Row',
  'Multi-day Pass',
  'Early Bird Discount',
  'Reserved Seating',
  'One-Day Pass',
  'Coded Discount',
  'Group Package',
  'Table Seating',
  'Standing Room',
  'Special Package',
  'Virtual Pass',
  'Giveaway',
  'All-Access Pass',
]

const ticketType = () => {
    return selectRandom(ticketTypes)
}

const getNTicketTypes = (n) => {
  if (n > ticketTypes.length) return ticketTypes
  let types = []
  while (n > types.length) {
    let type = ticketType();
    if (!types.includes(type)) types.push(type)
  }
  return types
}

function _randomDate(start, end, startHour = 0, endHour = 20) {
  var date = new Date(+start + Math.random() * (end - start));
  var hour = startHour + Math.random() * (endHour - startHour) || 23;
  date.setHours(hour);
  return date;
}

function randomDate() {
  let start = new Date()
  let end = new Date().setFullYear(start.getFullYear() + 1)
  return _randomDate(start, end, 0, 12)
}

function getRandomFinish(start) {

  return _randomDate(start, start, start.getUTCHours(), 23)
}

function getRandomEventDate() {
  let start = randomDate();
  let end = getRandomFinish(start)
  return {start, end}
}

module.exports = {
  ticketType,
  getNTicketTypes,
  getRandomInt,
  randomDate,
  getRandomFinish,
  getRandomEventDate,
  selectRandom
}
