module.exports = async (web3, rawTx, privateKey) => {
  // let nonce =  await web3.eth.getTransactionCount(rawTx.from, "pending");
  // console.log(nonce);
  // let nonceHex = web3.utils.toHex(nonce);
  // console.log(nonceHex);
  //
  // rawTx.nonce = nonceHex

  const signPromise = web3.eth.accounts.signTransaction(rawTx, privateKey);

  return signPromise.then((signedTx) => {
    // raw transaction string may be available in .raw or
    // .rawTransaction depending on which signTransaction
    // function was called
    const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
    sentTx.on("error", err => {
      // do something on transaction error
      console.log(err)
    });
    return sentTx.on("receipt", receipt => {
      // do something when receipt comes back
      return receipt
    });
  }).catch((err) => {
    // do something when promise fails
    console.log(err)
  });
}
