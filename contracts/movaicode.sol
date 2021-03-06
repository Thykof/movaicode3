// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;


contract MovaiCode {
    event Result(string part0, string part1);

    function split(string calldata value, uint256 l) public returns (string memory, string memory) {
        uint256 i_;
        for (uint256 i = 0; i < l; i++) {
            if (bytes(value)[i] == " ") {
                i_ = i;
            }
        }

        string memory part0 = value[:i_];
        string memory part1 = value[i_+1:];

        emit Result(part0, part1);

        return (
            part0,
            part1
        );
    }
}
