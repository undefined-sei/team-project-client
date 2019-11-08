'use strict'

const config = require('../config')
const io = require('socket.io-client/dist/socket.io')
const socket = io(config.apiUrl)
// const msgApi = require('./api.js')
const store = require('../store')
const msgIndexTemplate = require('../templates/msg-listing.handlebars')
const msgApi = require('./api.js')
// const io = require('socket.io-client')
// const socket = io('http://localhost/4741')

// Message creation success and failure UI
const onCreateMsgSuccess = responseData => {
  store.message = responseData.message
  $('.message').val('')

  $('#user-typing').hide()
}

const onCreateMsgFailure = () => {
}
// ----------

// Message index success and failure UI
const onIndexSuccess = responseData => {
  store.message = responseData.message
  // Creates new property of currentOwner in the store
  store.message.forEach(x => x.currentOwner = store.user._id)
  io(config.apiUrl)
  // This will inovke the handlebars script to populate the user view with all messages
  const msgIndexHtml = msgIndexTemplate({ msgs: store.message })
  $('.messages').html(msgIndexHtml)
  $('.update-form').hide()
  $('.messages').scrollTop($('.messages')[0].scrollHeight)
}

const onIndexFailure = () => {
}
// ----------

// Message update success and failure UI
const onUpdateMsgSuccess = () => {

}

const onUpdateMsgFailure = () => {
}
// ----------

// Message delete success and failure UI
const onDeleteMsgSuccess = () => {
}

const onDeleteMsgFailure = () => {
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
