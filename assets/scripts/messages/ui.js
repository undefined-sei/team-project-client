'use strict'

// const msgApi = require('./api.js')
const store = require('../store')
const msgIndexTemplate = require('../templates/msg-listing.handlebars')
const msgApi = require('./api.js')

// Message creation success and failure UI
const onCreateMsgSuccess = responseData => {
  store.msg = responseData.msg
  console.log('Message created!')
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
  // This will inovke the handlebars script to populate the user view with all messages
  const msgIndexHtml = msgIndexTemplate({ msgs: responseData.message })
  $('.messages').append(msgIndexHtml)
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
  msgApi.indexMsgs()
    .then(onIndexSuccess)
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
