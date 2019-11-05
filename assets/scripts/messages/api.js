'use strict'

const config = require('../config.js')
const store = require('../store.js')

// Create a single message in the Messages table
const createMsg = formData => {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/messages',
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}
// ----------

// Get all messages from the Messages table
const indexMsgs = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/messages',
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}
// -----------

module.exports = {
  createMsg,
  indexMsgs
}
