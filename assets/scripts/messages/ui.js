'use strict'

// const msgApi = require('./api.js')
const store = require('../store')
const msgIndexTemplate = require('../templates/msg-listing.handlebars')

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
  store.msgs = responseData.msgs
  console.log('Got all messages!')
  console.log(responseData)
  // This will inovke the handlebars script to populate the user view with all messages
  const msgIndexHtml = msgIndexTemplate({ msgs: responseData.message })
  $('.messages').html(msgIndexHtml)
}

const onIndexFailure = () => {
  console.log('Failed to retrieve messages!')
}
// ----------

module.exports = {
  onCreateMsgSuccess,
  onCreateMsgFailure,
  onIndexSuccess,
  onIndexFailure
}
