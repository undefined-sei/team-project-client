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

// SOCKET.IO FUNCTIONS
// Logs new socket message to the console for debugging
const newSocketMessage = function (msg) {
  store.socketMsg = [msg]
  msg.currentOwner = store.user._id
  const msgIndexHtml = msgIndexTemplate({ msgs: store.socketMsg })
  $('.messages').append(msgIndexHtml)
  $('#user-typing').hide()
  addListeners()
  $('.messages').scrollTop($('.messages')[0].scrollHeight)
}

const updateSocketMessage = function (msg) {
  $(`#${msg[1]}`).find('.msg-content').text(msg[0])
  $(`#${msg[1]}`).find('.msg-content').show()
  $(`#${msg[1]}`).find('.update-form').hide()
}

const deleteSocketMessage = function (msg) {
  $(`#${msg}`).remove()
}

const userTyping = function (msg) {
  if (msg) {
    $('#user-typing').show()
  } else {
    $('#user-typing').hide()
  }
}
// ------------------------------

// CRUD functions
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
      addListeners()
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
  msgApi.updateMsg(msgId, formData)
    .then(msg => {
      socket.emit('update message', [formData.message.text, msgId])
      return msg
    })
    .then(msgUi.onUpdateMsgSuccess)
    .catch(msgUi.onUpdateMsgFailure)
    // .then(onIndex)
}
// ----------

// Delete message
const onDeleteMsg = function (event) {
  // Gets the messge ID by the html attribute when the div is clicked
  const msgId = event.target.dataset.id
  msgApi.deleteMsg(msgId)
    .then(msg => {
      socket.emit('delete message', msgId)
      return msg
    })
    .then(msgUi.onDeleteMsgSuccess)
    .catch(msgUi.onDeleteMsgFailure)
    // .then(onIndex)
}
// ----------
// ------------------------------

// UI helper functions
// Adds listeners onto divs to update messages
const addListeners = () => {
  $('.update-form').on('submit', onUpdateMsg)
  $('.delete-button').on('click', onDeleteMsg)
  $('.msg').on('click', toggleUpdate)
}
// ---------

const toggleUpdate = function (event) {
  if (this.dataset.id === store.user._id) {
    $('.update-form').hide()
    $('.msg-content').show()
    $(this).find('form').show()
    $(this).find('.msg-content').hide()
  }
}
// ------------------------------

module.exports = {
  onCreateMsg,
  onIndex,
  onGetMsg,
  onDeleteMsg,
  onUpdateMsg,
  toggleUpdate,
  userTyping,
  // Socket exports
  newSocketMessage,
  updateSocketMessage,
  deleteSocketMessage
}
