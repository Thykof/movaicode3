var Web3 = require('web3')

var sendTransaction = require('./send-transaction')
var deployContract = require('./deploy-contract')
var compileContract = require('./compile-contract')
var contractCode = require('./contract-code')

const uri = "http://localhost:8545";
const web3 = new Web3(uri);
const provider = new Web3.providers.HttpProvider(uri);

const ADDRESS = '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'
const PRIVATE_KEY = '87e9b3b404d680a66d92dbd68a8b27ec8f182be0534d7206d600ae9c096b84af'
const TO = '0x59dCD96E84E042aE2ff8651D53F58A1dA63Fca08'

// web3.eth.defaultAccount = ADDRESS

// account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY)

// sendTransaction(web3, ADDRESS, PRIVATE_KEY, TO, '0x6')

var contractData = compileContract(contractCode)
deployContract(web3, contractData, ADDRESS, PRIVATE_KEY)
.then(console.log)
