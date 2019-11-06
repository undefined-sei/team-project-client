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

// Updates the message using the <div> id to pass to socket.io
const updateMsg = (msgId, formData) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/messages/' + msgId,
    data: formData,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}
// ----------

// Delete message
const deleteMsg = msgId => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/messages/' + msgId,
    headers: {
      Authorization: `Bearer ${store.user.token}`
    }
  })
}
// ----------

module.exports = {
  createMsg,
  indexMsgs,
  updateMsg,
  deleteMsg
}
