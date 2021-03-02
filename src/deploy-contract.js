var sendTransaction = require('./send-transaction')

module.exports = (web3, contractData, from, privateKey) => {
  var contractName = Object.keys(contractData.contracts)[0].split('.')[0]
  var contractCode = contractData.contracts[contractName + '.sol'][contractName]['evm']['bytecode']['object']
  // console.log(contractCode);
  var rawTx = {
    from: from,
    data: contractCode,
    gas: 2000000
  }

  return sendTransaction(web3, rawTx, privateKey)
}
