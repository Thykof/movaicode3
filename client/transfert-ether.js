var sendTransaction = require('./send-transaction')

module.exports = async (web3, from, privateKey, to, amount) => {
  var rawTx = {
    from: from,
    to: to,
    value: amount,
    gas: 2000000
  }

  return sendTransaction(web3, rawTx, privateKey).then(async receipt => {
    return {
      receipt,
      fromBalance: await web3.eth.getBalance(from),
      toBalance: await web3.eth.getBalance(to)
    }
  })
}
