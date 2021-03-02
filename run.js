var Web3 = require('web3')
const { Transaction } = require('@ethereumjs/tx')


const uri = "http://localhost:8545";
const web3 = new Web3(uri);
const provider = new Web3.providers.HttpProvider(uri);

const ADDRESS = '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'



// `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['MovaiCode.sol']) {
//   console.log(
//     contractName +
//       ': ' +
//       output.contracts['MovaiCode.sol'][contractName].evm.bytecode.object
//   );
// }

let accounts = [
  {
    address: '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7',
    key: '87e9b3b404d680a66d92dbd68a8b27ec8f182be0534d7206d600ae9c096b84af'
  }
]

var MovaiCode = output.contracts['MovaiCode.sol']['MovaiCode']

let gasPrice = web3.eth.gasPrice;
let gasPriceHex = web3.utils.toHex(gasPrice);
let gasLimitHex = web3.utils.toHex(6000000000000);
let nonce =  web3.eth.getTransactionCount(accounts[0].address, "pending");
let nonceHex = web3.utils.toHex(nonce);

// console.log(MovaiCode.abi);
var contract = new web3.eth.Contract(MovaiCode.abi)


// let txParams = {
//   nonce: nonceHex,
//   gasPrice: '0x09184e72a000',
//   gasLimit: '0x2710',
//   data: require('./build/contracts/MovaiCode.json').bytecode,
//   from: accounts[0].address
// };
let txParams = {
  to: '0x59dCD96E84E042aE2ff8651D53F58A1dA63Fca08',
  value: '0x6',
  from: '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'
};

// Get the account private key, need to use it to sign the transaction later.
let privateKey = Buffer.from('87e9b3b404d680a66d92dbd68a8b27ec8f182be0534d7206d600ae9c096b84af', 'hex')
console.log(privateKey);

let tx = new Transaction(txParams, {
  // chain: 4,//'rinkeby',
  hardfork: 'petersburg'
});

// Sign the transaction
tx.sign(privateKey);
let serializedTx = tx.serialize();

let receipt = null;

// Submit the smart contract deployment transaction
web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
  if (err) {
    console.log(err); return;
  }

  // Log the tx, you can explore status manually with eth.getTransaction()
  console.log('Contract creation tx: ' + hash);

  // Wait for the transaction to be mined
  while (receipt == null) {
      receipt = web3.eth.getTransactionReceipt(hash);
      // Simulate the sleep function
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 1000);
    }
    console.log('Contract address: ' + receipt.contractAddress);
})

// contract.deploy({
//   data: '0x' + MovaiCode.evm.bytecode.object,
//   // from: ADDRESS
//   gasPrice: gasPriceHex,
//   gasLimit: gasLimitHex,
//   gas: 9000000000000
// })
// .send({
//   from: ADDRESS
// })
// .then(instance => {
//   console.log(instance);
// })

console.log("Done");
