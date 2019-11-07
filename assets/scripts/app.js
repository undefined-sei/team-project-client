'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')
const config = require('./config')
const io = require('socket.io-client/dist/socket.io')
const socket = io(config.apiUrl)
const authEvents = require('./auth/events.js')
const messageEvents = require('./messages/events.js')
// const chatroomEvents = require('./chatrooms/events.js')

$(() => {
  $('#sign-up').on('submit', authEvents.onSignUp)
  $('#sign-in').on('submit', authEvents.onSignIn)
  $('#change-password').on('submit', authEvents.onChangePassword)
  $('#sign-out').on('submit', authEvents.onSignOut)
  $('#send-message').on('submit', messageEvents.onCreateMsg)
  $('.changePasswordSection').hide()
  $('.signOutSection').hide()
  $('.messageSection').hide()
  $('.signUpSection').hide()
  $('#show-signup').click(function () {
    $('.signInSection').hide()
  })
  $('#show-signup').click(function () {
    $('.signUpSection').show()
  })
  $('#show-signin').click(function () {
    $('.signUpSection').hide()
  })
  $('#show-signin').click(function () {
    $('.signInSection').show()
  })

  // hide .messages on load
  $('.messages').hide()
  $('.goback').hide()

  // Socket.io event handlers
  socket.on('new message', messageEvents.newSocketMessage)
  socket.on('user-typing', messageEvents.userTyping)
  socket.on('update message', messageEvents.updateSocketMessage)
  socket.on('delete message', messageEvents.deleteSocketMessage)

  $('.message').on('input', () => {
    socket.emit('user-typing', $('.message').val())
    return false
  })
  // $('.make-chatroom').on('submit', chatroomEvents.onCreateChatroom)
  $('.chatroomSection').hide()
  $('.change-Password-Section').hide()
  $('.user-settings').hide()
  $('.user-settings').click(function () {
    $('.change-Password-Section').show()
    $('.messageSection').hide()
    $('.messages').hide()
    $('.goback').show()
    $('.user-settings').hide()
  })
  $('.goback').click(function () {
    $('.change-Password-Section').hide()
    $('.messageSection').show()
    $('.messages').show()
    $('.goback').hide()
    $('.user-settings').show()
  })
})
