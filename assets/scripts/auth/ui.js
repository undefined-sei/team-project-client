'use strict'
const store = require('./../store')
const index = require('../messages/events')

const successMessage = function (newText) {
  $('#message').html(newText)
  $('#message').show(500)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('#message').fadeOut(850)
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('form').trigger('reset')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  $('#message').show(500)
  $('#message').fadeOut(2000)
}

const onSignUpSuccess = responseData => {
  successMessage('Signed up successfully!')
  $('#message').css('color', 'green')
}

const onSignUpFailure = () => {
  failureMessage('Sign up failed')
  $('#message').css('color', 'red')
}

const onSignInSuccess = function (response) {
  successMessage('Signed in successfully')
  store.user = response.user
  index.onIndex()
  $('.changePasswordSection').show()
  $('.signOutSection').show()
  $('.messageSection').show()
  $('.signInSection').hide()
  $('.signUpSection').hide()
  $('.messages').show()
}

const onSignInFailure = function () {
  failureMessage('Sign in failed')
  $('#message').css('color', 'red')
}

const onChangePasswordSuccess = function () {
  successMessage('Changed password successfully!')
  $('#message').css('color', 'green')
}

const onChangePasswordFailure = function () {
  failureMessage('change password failed')
  $('#message').css('color', 'red')
}

const onSignOutSuccess = responseData => {
  successMessage('Signed out successfully!')
  $('#message').css('color', 'green')
  $('.changePasswordSection').hide()
  $('.messageSection').hide()
  $('.signInSection').show()
  $('.signOutSection').hide()
  $('.messages').hide()
}

const onSignOutFailure = function () {
  failureMessage('Sign out failed')
  $('#message').css('color', 'red')
}

module.exports = {
  successMessage,
  failureMessage,
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onSignOutSuccess,
  onSignOutFailure
}
