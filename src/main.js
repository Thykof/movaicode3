const ganache = require("ganache-core");
var Web3 = require('web3')

var deployContract = require('./deploy-contract')
var compileContract = require('./compile-contract')
var contractCode = require('./contract-code')
var transfertEther = require('./transfert-ether')
var api = require('./api')

const web3 = new Web3(ganache.provider({
    mnemonic: "can flip ocean logic case muffin expose ice truly correct brand budget"
}));
// web3.eth.defaultAccount = ADDRESS

const ADDRESS = '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'
const PRIVATE_KEY = '87e9b3b404d680a66d92dbd68a8b27ec8f182be0534d7206d600ae9c096b84af'
const TO = '0x59dCD96E84E042aE2ff8651D53F58A1dA63Fca08';

// account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)

let receipt;
let totalGasUsed = 0;

(async () => {
  let etherPrice = await api.getEtherPrice()
  let gasPrice = await api.getGasPrice()

  // send some ether:
  console.log("\nSend some ether");
  let result = await transfertEther(web3, ADDRESS, PRIVATE_KEY, TO, '0x6')
  console.log(`  balance of ${ADDRESS} is ${result.fromBalance}`);
  console.log(`  balance of ${TO} is ${result.toBalance}`);
  console.log(`  cost: $${result.receipt.gasUsed * gasPrice / 1000000000 * etherPrice}`);

  // compile and deploy a contract:
  console.log("\nCompile and deploy the contract");
  const contractData = compileContract(contractCode)
  receipt = await deployContract(web3, contractData, ADDRESS, PRIVATE_KEY)
  totalGasUsed += receipt.gasUsed
  const contractAddress = receipt.contractAddress
  console.log(`  deployed at ${contractAddress}, cost: $${receipt.gasUsed * gasPrice / 1000000000 * etherPrice}`);

  // run the split function:
  console.log("\n\nRun the split function");
  let instance;
  const contractName = Object.keys(contractData.contracts)[0].split('.')[0]

  instance = new web3.eth.Contract(
    contractData.contracts[contractName + '.sol'][contractName].abi,
    contractAddress
  )
  instance.methods.split("DAFT PUNK", 9).send({
    from: ADDRESS
  })
  .on('receipt', receipt => {
    totalGasUsed += receipt.gasUsed
    let result = [
      receipt.events["Result"].returnValues["0"],
      receipt.events["Result"].returnValues["1"]
    ]
    console.log('  ' + result);
    console.log(`  ["${result[0]}", "${result[1]}"]`);

    const costEther = receipt.gasUsed * gasPrice / 1000000000
    console.log(`  cost: ${costEther} ETHER, $${costEther * etherPrice}`);

    const totalCostEther = totalGasUsed * gasPrice / 1000000000
    console.log(`\n\nTotal Cost: ${totalCostEther} ETHER, $${totalCostEther * etherPrice}`);
  })
  .on('error', function(error, receipt) {
    console.log(error, receipt);
  })
})()
