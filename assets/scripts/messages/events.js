'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const msgApi = require('./api.js')
const msgUi = require('./ui.js')
const io = require('socket.io-client/dist/socket.io')

// Makes the socket.io available to all functions
const socket = io('http://localhost:4741')

const newSocketMessage = function (msg) {

  console.log('socket says', msg)
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
  // Upon successful DB creation, emits the new message to the socket.io API for broadcast, and logs the socket response
    // .then(socket.emit('new message', formData, (response) => { console.log(response) }))
}
// ----------

// Get all messages
const onIndex = () => {
  msgApi.indexMsgs()
    .then(msgUi.onIndexSuccess)
    .catch(msgUi.onIndexFailure)
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

  const msgId = $(this).attr('id')
  const formData = getFormFields($('.update-message')[0])
  msgApi.updateMsg(msgId, formData)
    .then(msgUi.onUpdateMsgSuccess)
    .catch(msgUi.onUpdateMsgFailure)
  // Upon successful DB update, emits message to socket.io API for broadcast, and logs the socket response
    .then(socket.emit('update message', formData, msgId, (response) => { console.log(response) }))
}
// ----------

// Delete message
const onDeleteMsg = function (event) {
  event.preventDefault()

  // Gets the messge ID by the html attribute when the div is clicked
  const msgId = $(this).attr('id')
  msgApi.deleteMsg(msgId)
    .then(msgUi.onDeleteMsgSuccess)
    .catch(msgUi.onDeleteMsgFailure)
    // Upon successful DB delete, emits message to socket.io API for broadcast, and logs the socket response
    .then(socket('delete message', msgId, (response) => { console.log(response) }))
}
// ----------

module.exports = {
  onCreateMsg,
  onIndex,
  onGetMsg,
  onDeleteMsg,
  onUpdateMsg,
  newSocketMessage
}
