module.exports = (web3, contractData, from, privateKey) => {
  var contractName = Object.keys(contractData.contracts)[0].split('.')[0]
  var contractCode = contractData.contracts[contractName + '.sol'][contractName]['evm']['bytecode']['object']
  // console.log(contractCode);
  var rawTx = {
    from: from,
    data: contractCode,
    gas: 2000000
  }

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
      // console.log(receipt)
      return receipt
    });
  }).catch((err) => {
    // do something when promise fails
    console.log(err)
  });
}
