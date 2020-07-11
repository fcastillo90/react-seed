export const isEmptyArray = (array) => {
  // eslint-disable-next-line eqeqeq
  if (array === undefined || array.length == 0) {
    return false
  }
  return true
}
export const validateArg = (obj) => {
  return obj !== undefined && obj
}

/**
 * Checks if the given string is empty, null or undefined.
 * @param {string} text The text to match to.
 * @returns {boolean} True if the given argument is the empty string `""` or null. False otherwise.
 */
export const isEmptyString = (text) => {
  return text === '' || text == null
}
export const isValidSKU = (sku) => {
  return sku.length >= 6
}
/**
 * Uses a regular expression to check if the given argument is a valid formatted email.
 * @param {string} email The email value to check against.
 * @returns {boolean} True if the string is a valid email. False otherwise.
 */
export const isEmail = (email) => {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regex.test(String(email).toLowerCase())
}

export const validatePassword = (text) => {
  let msg
  if (text.length < 6) {
    msg = 'La contraseña debe contener al menos 6 caracteres'
    return msg
  }
  const regexNumber = /[0-9]/
  if (!regexNumber.test(String(text))) {
    msg = 'La contraseña debe contener al menos un número'
    return msg
  }
  const regexAlphabetLC = /[a-z]/
  if (!regexAlphabetLC.test(String(text))) {
    msg = 'La contraseña debe contener al menos una letra minúscula'
    return msg
  }
  const regexAlphabetUC = /[A-Z]/
  if (!regexAlphabetUC.test(String(text))) {
    msg = 'La contraseña debe contener al menos una letra mayúscula'
    return msg
  }
  return msg
}

/**
 *  returns the object with errors
 * @param {object} obj
 * @param {array} keys
 * @param {object} validationObj
 * @returns {object} Object with errors
 */
export const validateForm = async (obj = {}, keys = [], validationObj = {}) => {
  let validationResult = {}
  // eslint-disable-next-line array-callback-return
  keys.forEach((key) => {
    if (validationObj(obj)[key]() !== undefined)
      validationResult = {
        ...validationResult,
        [key]: validationObj(obj)[key](),
      }
  })
  return validationResult
}

/**
 *
 * @param {*} array
 * @param {*} arrayToAsk
 */
export const doesArrayContains = (array = undefined, arrayToAsk = []) => {
  if (arrayToAsk.length === 0) return true

  return arrayToAsk.includes(array)
}
export const doesObjectContains = (key = null, objectToAsk = {}) =>
  Object.prototype.hasOwnProperty.call(objectToAsk, key)

/**
 * returns de number of word in a string
 * @param {string} text
 * @return {number} number of words
 */
export const numberOfWords = (text) => {
  let result = text.replace(/(^\s*)|(\s*$)/gi, '')
  result = result.replace(/[ ]{2,}/gi, ' ')
  result = result.replace(/\n /, '\n')
  return result.split(' ').length
}

/**
 * Uses a regular expression to check if the given argument is a valid url.
 * @param {string} url The url value to check against.
 * @returns {boolean} True if the string is a valid url. False otherwise.
 */
export const isUrl = (url) => {
  const regex = /^[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/
  return regex.test(String(url).toLowerCase())
}
