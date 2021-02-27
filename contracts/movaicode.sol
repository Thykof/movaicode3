pragma solidity 0.8.1;


contract MovaiCode {
    string public result0;
    string public result1;

    function split(string calldata value, uint256 l) public {
        uint256 i_;
        for (uint256 i = 0; i < l; i++) {
            if (bytes(value)[i] == " ") {
                i_ = i;
            }
        }

        result0 = value[:i_];
        result1 = value[i_+1:];
    }
}
