'use strict'

const io = require('socket.io-client/dist/socket.io')
// const msgApi = require('./api.js')
const store = require('../store')
const msgIndexTemplate = require('../templates/msg-listing.handlebars')
const msgApi = require('./api.js')
const io = require('socket.io-client')
// const socket = io('http://localhost/4741')

// Message creation success and failure UI
const onCreateMsgSuccess = responseData => {
  store.message = responseData.message
  console.log('Message created!')
  $('.message').val('')
}

const onCreateMsgFailure = () => {
  console.log('Failed to create message!')
}
// ----------

// Message index success and failure UI
const onIndexSuccess = responseData => {
  store.message = responseData.message
  console.log('Got all messages!')
  console.log(responseData)
  // Creates socket connection after successful log-in
  io('http://localhost:4741')
  // This will inovke the handlebars script to populate the user view with all messages
  const msgIndexHtml = msgIndexTemplate({ msgs: responseData.message })
  $('.messages').html(msgIndexHtml)
}

const onIndexFailure = () => {
  console.log('Failed to retrieve messages!')
}
// ----------

// Message update success and failure UI
const onUpdateMsgSuccess = () => {
  msgApi.indexMsgs()
    .then(onIndexSuccess)
}

const onUpdateMsgFailure = () => {
  console.log('Failed to update message.')
}
// ----------

// Message delete success and failure UI
const onDeleteMsgSuccess = () => {
  console.log('Made it here!')
}

const onDeleteMsgFailure = () => {
  console.log('Failed to delete message.')
}
// ----------

module.exports = {
  // Create exports
  onCreateMsgSuccess,
  onCreateMsgFailure,
  // Read (index) exports
  onIndexSuccess,
  onIndexFailure,
  // Update exports
  onUpdateMsgSuccess,
  onUpdateMsgFailure,
  // Delete exports
  onDeleteMsgSuccess,
  onDeleteMsgFailure
}
