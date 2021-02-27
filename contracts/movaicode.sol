pragma solidity 0.8.1;


contract MovaiCode {
    string public result0;
    string public result1;

    function split(string calldata value, uint256 l) public {
        uint256 index;
        for (uint256 i = 0; i < l; i++) {
            if (bytes(value)[i] == " ") {
                index = i;
            }
        }

        result0 = value[:index];
        result1 = value[index+1:];
    }
}
