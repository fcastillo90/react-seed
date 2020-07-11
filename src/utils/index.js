import moment from 'moment'
import Settings from '../services/Settings'

export const shouldReload = (loadedAt) =>
  loadedAt == null || new Date().getTime() - loadedAt.getTime() > Settings.listReloadTime
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)
export const titleCase = (string) => {
  if (typeof string === 'string') {
    const sentence = string.toLowerCase().split(' ')
    for (let i = 0; i < sentence.length; i += 1)
      if (sentence[i][0] !== undefined) {
        sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
      }
    return sentence.join(' ')
  }
  return string
}
export const stringToBreadcrumb = (string) =>
  (string.charAt(0).toUpperCase() + string.slice(1)).replace(/-/g, ' ')
/**
 * Function that returns a percentage value of parcial from total.
 * @param {int} total
 * @param {int} parcial
 * @returns {int} percentageValue
 */
export const getPercentage = (total, parcial) => {
  if (total == null || parcial == null || total === 0 || parcial === 0) {
    return 0
  }
  return Math.round((parseInt(parcial, 10) / parseInt(total, 10)) * 100) || 0
}
/**
 * Function that returns a formatted currency number
 * @param {int} amount
 * @param {int} decimalCount
 * @param {string} decimal
 * @param {string} thousands
 * @param {string} symbol
 */
export const currencyFormatter = (
  amount,
  decimalCount = 0,
  decimal = ',',
  thousands = '.',
  symbol = '$',
) => {
  const newDecimalCount = Number.isNaN(Math.abs(decimalCount)) ? 2 : Math.abs(decimalCount)
  const newAmount = Math.abs(Number(amount) || 0)
  const negativeSign = newAmount < 0 ? '-' : ''

  const i = parseInt(newAmount.toFixed(newDecimalCount), 10).toString()
  const j = i.length > 3 ? i.length % 3 : 0

  return `${symbol} ${negativeSign}${j ? i.substr(0, j) + thousands : ''}${i
    .substr(j)
    .replace(/(\d{3})(?=\d)/g, `$1${thousands}`)}${
    newDecimalCount
      ? decimal +
        Math.abs(newAmount - i)
          .toFixed(newDecimalCount)
          .slice(2)
      : ''
  }`
}
export const rutFormatter = (value) => {
  const actual = value.replace(/|,|^0+/g, '')
  let rutPuntos = ''
  if (actual !== '' && actual.length >= 1) {
    const sinPuntos = actual.replace(/\./g, '')
    const actualLimpio = sinPuntos.replace(/-/g, '')
    const inicio = actualLimpio.substring(0, actualLimpio.length - 1)
    let i = 0
    let j = 1
    for (i = inicio.length - 1; i >= 0; i -= 1) {
      const letra = inicio.charAt(i)
      rutPuntos = letra + rutPuntos
      if (j % 3 === 0 && j <= inicio.length - 1) {
        rutPuntos = `.${rutPuntos}`
      }
      j += 1
    }
    const dv = actualLimpio.substring(actualLimpio.length - 1)
    rutPuntos = `${rutPuntos}-${dv}`
  }
  return rutPuntos
}
/**
 * function that transforms the following format 'DD-MM-YYYY HH:MM:SS:mm' into 'DD-MM-YYYY'
 * @param {String} date in String format
 */
export const extractDate = (date) => date.substring(0, 10)

/**
 * Function that transform a number into percentage with 2 decimals.
 * @param {int} n number to be formatted as float number (e.g. 16.05%)
 */
export function formatNumberToPct(n) {
  if (Number.isNaN(n) || n == null) {
    return ''
  }
  return `${parseFloat(n).toFixed(2)}%`
}

/**
 * Difference between today and time ago
 * @param {String} date
 */
export function formatTimeAgo(date) {
  let time
  if (date) {
    const today = new Date().valueOf()
    const ms = today - moment(date).format('x')
    const sec = (ms / 1000).toFixed(0)
    const min = (ms / (1000 * 60)).toFixed(0)
    const hour = (ms / (1000 * 60 * 60)).toFixed(0)
    const days = (ms / (1000 * 60 * 60 * 24)).toFixed(0)
    const years = (ms / (1000 * 60 * 60 * 24 * 365)).toFixed(0)

    if (sec < 60) {
      time = ` hace ${sec} ${sec > 1 ? 'segundos' : 'segundo'}`
    } else if (min < 60) {
      time = ` hace ${min} ${min > 1 ? 'minutos' : 'minuto'}`
    } else if (hour < 24) {
      time = ` hace ${hour} ${hour > 1 ? 'horas' : 'hora'}`
    } else if (days < 365) {
      time = ` hace ${days} ${days > 1 ? 'días' : 'día'}`
    } else {
      time = ` hace ${years} ${years > 1 ? 'años' : 'año'}`
    }
  }
  return time
}

export function formatTimeForward(date) {
  let time

  if (date) {
    const today = new Date().valueOf()
    const ms = new Date(date.split('-').reverse().join('-')).valueOf() - today
    const sec = (ms / 1000).toFixed(0)
    const min = (ms / (1000 * 60)).toFixed(0)
    const hour = (ms / (1000 * 60 * 60)).toFixed(0)
    const days = (ms / (1000 * 60 * 60 * 24)).toFixed(0)
    const months = (ms / (1000 * 60 * 60 * 24 * 30)).toFixed(0)

    if (sec < 60) {
      time = ` ${sec} ${sec > 1 ? 'segundos' : 'segundo'}`
    } else if (min < 60) {
      time = ` ${min} ${min > 1 ? 'minutos' : 'minuto'}`
    } else if (hour < 24) {
      time = ` ${hour} ${hour > 1 ? 'horas' : 'hora'}`
    } else if (days < 30) {
      time = ` ${days} ${days > 1 ? 'días' : 'día'}`
    } else {
      time = ` ${months} ${months > 1 ? 'meses' : 'mes'}`
    }
  }
  return time
}
export const randomNumberBetween = (minValue, maxValue) =>
  Math.floor(Math.random() * (Math.floor(maxValue) - Math.ceil(minValue))) + Math.ceil(minValue)

export const chunk = (arr, chunkSize = 1, cache = []) => {
  const tmp = [...arr]
  if (chunkSize <= 0) return cache
  while (tmp.length) cache.push(tmp.splice(0, chunkSize))
  return cache
}
