/* eslint-disable no-unused-vars */
import axios from 'axios'

export const getFromApi = async ({
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = '',
  type = '',
}) => {
  if (url == null || url === '' || onSuccess == null || typeof onSuccess !== 'function') {
    throw new Error("url and onSuccess can't be null or empty")
  }
  await onPending()
  let headers = {}
  switch (type) {
    case 'download':
      headers = { 'Content-Disposition': 'attachment' }
      break
    default:
      headers = {}
      break
  }
  return axios
    .get(url, { headers })
    .then((response) => {
      const { status, data } = response
      if (type === 'download') {
        window.open(response.config.url)
      }
      if (status === 200) {
        return onSuccess({ data, status })
      }
      return onError({ response, status })
    })
    .catch((error) => onError(error))
}

/**
 * Performs an AJAX request to the given URL with the given JSON data in its body and returns a Promise which eventually
 * resolves or rejects to one of the given callbacks onSuccess or onError. The function calls the onPending callback
 * before performing the request to the API.
 *
 * @param {object} json JSON Object to send to the API.
 * @param {string} url The URL string to send the request to.
 * @param {function(response: string)} onSuccess Callback to use when the request succeeds.
 * @param {function(string | ErrorEvent)} onError Callback to use when the request fails.
 * @param {function} onPending Callback without arguments to call before starting the request.
 * @param {string} token
 * @param {string} type
 * @returns {Promise<any>} Fulfills after the request succeeds or fails.
 */
export const postToApi = async ({
  body = {},
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = '',
  type = '',
}) => {
  if (url == null || url === '' || onSuccess == null || typeof onSuccess !== 'function') {
    throw new Error("url and onSuccess can't be null or empty")
  }
  let headers
  await onPending()
  switch (type) {
    case 'plain':
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }
      break
    default:
      headers = {}
  }

  return axios
    .post(url, body, { headers })
    .then((response) => {
      const { status, data } = response
      if (response.statusText) {
        return onSuccess({ data, status })
      }
      return onError({ data, status })
    })
    .catch((error) => {
      return onError({ data: error.response, status: 500 })
    })
}
/**
 *
 * @param {object} json JSON Object to send to the API.
 * @param {string} url The URL string to send the request to.
 * @param {function(response: string)} onSuccess Callback to use when the request succeeds.
 * @param {function(string | ErrorEvent)} onError Callback to use when the request fails.
 * @param {function} onPending Callback without arguments to call before starting the request.
 * @param {string} token
 * @param {string} type
 * @returns {Promise<any>} Fulfills after the request succeeds or fails.
 */
export const patchToApi = async ({
  body = {},
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = '',
  type = '',
}) => {
  if (url == null || url === '' || onSuccess == null || typeof onSuccess !== 'function') {
    throw new Error("url and onSuccess can't be null or empty")
  }
  let headers
  await onPending()
  switch (type) {
    case 'plain':
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }
      break
    default:
      headers = {}
  }
  return axios
    .patch(url, body, { headers })
    .then((response) => {
      const { status, data } = response
      if (response.statusText) {
        return onSuccess({ data, status })
      }
      return onError({ data, status })
    })
    .catch((error) => {
      const { status, data } = error.response
      return onError({ data, status })
    })
}

/**
 * Performs an AJAX request to the given URL with the given JSON data in its body and returns a Promise which eventually
 * resolves or rejects to one of the given callbacks onSuccess or onError. The function calls the onPending callback
 * before performing the request to the API.
 *
 * @param {object} json JSON Object to send to the API.
 * @param {string} url The URL string to send the request to.
 * @param {function(response: string)} onSuccess Callback to use when the request succeeds.
 * @param {function(string | ErrorEvent)} onError Callback to use when the request fails.
 * @param {function} onPending Callback without arguments to call before starting the request.
 * @returns {Promise<any>} Fulfills after the request succeeds or fails.
 */
export const putToApi = ({
  body = {},
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = '',
  type = 'request',
}) => {
  if (url == null || url === '' || onSuccess == null || typeof onSuccess !== 'function') {
    throw new Error("url and onSuccess can't be null or empty")
  }
  let headers
  switch (type) {
    case 'plain':
      headers = {
        'Content-Type': 'application/json; charset=utf-8',
      }
      break
    default:
      headers = {}
  }
  onPending()
  return fetch(url, {
    method: 'PUT',
    body,
    redirect: 'error',
    headers,
  })
    .then((response) => {
      return response.text().then((text) => {
        const { status } = response
        if (text) {
          // eslint-disable-next-line no-param-reassign
          text = JSON.parse(text)
        }
        if (response.ok) {
          return onSuccess({ text, status })
        }
        return onError({ text, status })
      })
    })
    .catch((error) => {
      return onError(error)
    })
}

/**
 * Performs an AJAX request to the given URL and returns a Promise which eventually
 * resolves or rejects to one of the given callbacks onSuccess or onError. The function calls the onPending callback
 * before performing the request to the API.
 *
 * @param {string} url The URL string to send the request to.
 * @param {function(response: string)} onSuccess Callback to use when the request succeeds.
 * @param {function(string | ErrorEvent)} onError Callback to use when the request fails.
 * @param {function} onPending Callback without arguments to call before starting the request.
 * @returns {Promise<any>} Fulfills after the request succeeds or fails.
 */
export const deleteToApi = ({
  url = null,
  onSuccess = null,
  onError = () => {},
  onPending = () => {},
  token = '',
  type = 'delete',
}) => {
  if (url == null || url === '' || onSuccess == null || typeof onSuccess !== 'function') {
    throw new Error("url and onSuccess can't be null or empty")
  }
  let headers = {}
  if (type === 'delete') {
    headers = {
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${token}`,
    }
  } else {
    headers = {
      'Content-Type': 'application/json; charset=utf-8',
    }
  }

  onPending()
  return fetch(url, {
    method: 'DELETE',
    redirect: 'error',
    headers,
  })
    .then((response) => {
      return response.text().then((text) => {
        const { status } = response
        if (text) {
          // eslint-disable-next-line no-param-reassign
          text = JSON.parse(text)
        }
        if (response.ok) {
          return onSuccess({ text, status })
        }
        return onError({ text, status })
      })
    })
    .catch((error) => {
      return onError(error)
    })
}
