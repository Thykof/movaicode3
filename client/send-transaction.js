module.exports = (web3, from, privateKey, to, amount) => {
  var rawTx = {
    from: from,
    to: to,
    value: amount,
    gas: 2000000
  }

  const signPromise = web3.eth.accounts.signTransaction(rawTx, privateKey);

  signPromise.then((signedTx) => {
    // raw transaction string may be available in .raw or
    // .rawTransaction depending on which signTransaction
    // function was called
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);  sentTx.on("receipt", receipt => {
      // do something when receipt comes back
      console.log(receipt)
      web3.eth.getBalance(from).then(amount => console.log(from, amount))
      web3.eth.getBalance(to).then(amount => console.log(to, amount))
    });
    sentTx.on("error", err => {
      // do something on transaction error
      console.log(err)
    });
  }).catch((err) => {
    // do something when promise fails
    console.log(err)
  });
}
