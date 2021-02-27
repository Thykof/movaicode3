var Web3 = require('web3')
var contract = require("@truffle/contract");

const uri = "http://localhost:8545";
const web3 = new Web3(uri);
const provider = new Web3.providers.HttpProvider(uri);

var MovaiCode = require('./build/contracts/MovaiCode.json')
const ADDRESS = '0x07B6151f7ad24acf2818Eed239d3f5039E430FA7'
var movaiCode = contract(MovaiCode)
movaiCode.setProvider(provider);
var instance;
instance = new web3.eth.Contract(
    MovaiCode.abi,
    MovaiCode.networks[Object.keys(MovaiCode.networks)[0]].address
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
    // console.log(`["${result[0]}", "${result[1]}"]`);
})
