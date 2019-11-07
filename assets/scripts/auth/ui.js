'use strict'
const store = require('./../store')
const index = require('../messages/events')

const successMessage = function (newText) {
  $('#message').html(newText)
  $('#message').show(500)
  $('#message').removeClass('failure')
  $('#message').addClass('success')
  $('#message').css('color', 'green')
  $('#message').fadeOut(850)
  $('form').trigger('reset')
}

const failureMessage = function (newText) {
  $('#message').text(newText)
  $('form').trigger('reset')
  $('#message').addClass('failure')
  $('#message').removeClass('success')
  $('#message').css('color', 'red')
  $('#message').show(500)
  $('#message').fadeOut(2000)
}

const onSignUpSuccess = responseData => {
  successMessage('Signed up successfully!')
  console.log('hello')
}

const onSignUpFailure = () => {
  failureMessage('Sign up failed')
}

const onSignInSuccess = function (response) {
  successMessage('Signed in successfully')
  store.user = response.user
  console.log(store.user)
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
}

const onChangePasswordSuccess = function () {
  successMessage('Changed password successfully!')
}

const onChangePasswordFailure = function () {
  failureMessage('change password failed')
}

const onSignOutSuccess = responseData => {
  successMessage('Signed out successfully!')
  $('.changePasswordSection').hide()
  $('.messageSection').hide()
  $('.signInSection').show()
  $('.signUpSection').show()
  $('.signOutSection').hide()
  $('.messages').hide()
}

const onSignOutFailure = function () {
  failureMessage('Sign out failed')
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
