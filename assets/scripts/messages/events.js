'use strict'

const getFormFields = require('../../../lib/get-form-fields.js')
const msgApi = require('./api.js')
const msgUi = require('./ui.js')

// Creates a message
const onCreateMsg = function (event) {
  event.preventDefault()

  const msg = new FormData(this)
  msgApi.createMsg(msg)
    .then(msgUi.onCreateMsgSuccess)
    .catch(msgUi.onCreateMsgFailure)
}
// ----------

// Get all messages
const onIndex = event => {
  event.preventDefault()

  msgApi.indexMsg()
    .then(msgUi.onIndexSuccess)
    .catch(msgUi.onIndexFailure)
}
// ----------

module.exports = {
  onCreateMsg,
  onIndex
}
