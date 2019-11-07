'use strict'
const store = require('../store.js')
const config = require('../config.js')

const getFormFields = require('../../../lib/get-form-fields.js')
const msgApi = require('./api.js')
const msgUi = require('./ui.js')
const msgIndexTemplate = require('../templates/msg-listing.handlebars')

// Require statements related to socket.io
const io = require('socket.io-client/dist/socket.io')

// Makes the socket.io available to all functions
const socket = io(config.apiUrl)

const userTyping = function (msg) {
  console.log(msg)
  if (msg) {
    $('#user-typing').show()
  } else {
    $('#user-typing').hide()
  }
}

// Logs new socket message to the console for debugging
const newSocketMessage = function (msg) {
  console.log('socket says', msg)
  const socketMsg = [msg]
  const msgIndexHtml = msgIndexTemplate({ msgs: socketMsg })
  console.log(msgIndexHtml)
  $('#user-typing').hide()
  $('.messages').append(`${msgIndexHtml}`)
  $('.update-form').hide()
  onIndex()
}

const newUpdateMessage = function () {
  onIndex()
}

const newDeleteMessage = function () {
  onIndex()
}
// Creates a message
const onCreateMsg = function (event) {
  event.preventDefault()
  // Creates new message in the database
  const formData = getFormFields(event.target)
  msgApi.createMsg(formData)
    .then((newMessage) => {
      socket.emit('new message', newMessage.message)
      return newMessage
    })
    .then(msgUi.onCreateMsgSuccess)
    .catch(msgUi.onCreateMsgFailure)
}
// ----------

// Get all messages
const onIndex = () => {
  msgApi.indexMsgs()
    .then(msgUi.onIndexSuccess)
    .catch(msgUi.onIndexFailure)
    .then(() => {
      $('.update-form').on('submit', onUpdateMsg)
      $('.delete-button').on('click', onDeleteMsg)
      $('.msg').on('click', toggleUpdate)
    })
}
// ----------

// Get single message, passed from app.js after receiving from socket.io
const onGetMsg = () => {
  msgApi.getMsg()
    .then(msgUi.onGetMsgSuccess)
    .catch(msgUi.onGetMsgFailure)
}
// ----------

// Update message
const onUpdateMsg = function (event) {
  event.preventDefault()
  const msgId = event.target.dataset.id
  const formData = getFormFields(event.target)
  console.log(msgId)
  console.log(formData)
  msgApi.updateMsg(msgId, formData)
    .then(msgUi.onUpdateMsgSuccess)
    .then(() => {
      socket.emit('update message', 'updated')
    })
    .catch(msgUi.onUpdateMsgFailure)
    .then(onIndex)
}
// ----------

// Delete message
const onDeleteMsg = function (event) {
  console.log(store)

  console.log(event.target)
  // Gets the messge ID by the html attribute when the div is clicked
  const msgId = event.target.dataset.id
  msgApi.deleteMsg(msgId)
    .then(msgUi.onDeleteMsgSuccess)
    .then(() => {
      socket.emit('delete message', 'deleted')
    })
    .catch(msgUi.onDeleteMsgFailure)
    .then(onIndex)
}
// ----------

// UI helper functions
const toggleUpdate = function (event) {
  if (this.dataset.id === store.user._id) {
    $('.update-form').hide()
    $('.msg-content').show()
    $(this).find('form').show()
    $(this).find('.msg-content').hide()
  }
}
// ----------

module.exports = {
  onCreateMsg,
  onIndex,
  onGetMsg,
  onDeleteMsg,
  onUpdateMsg,
  newSocketMessage,
  toggleUpdate,
  userTyping,
  newUpdateMessage,
  newDeleteMessage
}
