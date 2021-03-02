var Web3 = require('web3')

var deployContract = require('./deploy-contract')
var compileContract = require('./compile-contract')
var contractCode = require('./contract-code')
var transfertEther = require('./transfert-ether')

const uri = "http://localhost:8545";
const web3 = new Web3(uri);
const provider = new Web3.providers.HttpProvider(uri);

const ADDRESS = '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'
const PRIVATE_KEY = '87e9b3b404d680a66d92dbd68a8b27ec8f182be0534d7206d600ae9c096b84af'
const TO = '0x59dCD96E84E042aE2ff8651D53F58A1dA63Fca08';

// web3.eth.defaultAccount = ADDRESS

// account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)


(async () => {
  // send some ether:
  console.log("\nsend some ether");
  let result = await transfertEther(web3, ADDRESS, PRIVATE_KEY, TO, '0x6')
  console.log(`balance of ${ADDRESS} is ${result.fromBalance}`);
  console.log(`balance of ${TO} is ${result.toBalance}`);

  // compile ans deploy a contract:
  console.log("\ncompile ans deploy a contract");
  var contractData = compileContract(contractCode)
  var receipt = await deployContract(web3, contractData, ADDRESS, PRIVATE_KEY)
  let contractAddress = receipt.contractAddress
  console.log("deployed at " + contractAddress);

  // run the split function:
  console.log("\n\nrun the split function");
  var instance;
  var contractName = Object.keys(contractData.contracts)[0].split('.')[0]

  instance = new web3.eth.Contract(
      contractData.contracts[contractName + '.sol'][contractName].abi,
      contractAddress
  )
  instance.methods.split("DAFT PUNK", 9).send({
      from: ADDRESS
  })
  .on('receipt', receipt => {
      let result = [
          receipt.events["Result"].returnValues["0"],
          receipt.events["Result"].returnValues["1"]
      ]
      console.log(result);
      console.log(`["${result[0]}", "${result[1]}"]`);
  })
  .on('error', function(error, receipt) {
    console.log(error, receipt);
  })
})()
