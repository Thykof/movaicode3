var solc = require('solc');

module.exports = (contractCode) => {
  var input = {
    language: 'Solidity',
    sources: {
      'MovaiCode.sol': {
        content: contractCode
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  };

  var output = JSON.parse(solc.compile(JSON.stringify(input)));
  return output
}
