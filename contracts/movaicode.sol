pragma solidity 0.8.1;


contract Counter {
    function split(bytes calldata value) public pure returns (bytes memory, bytes memory) {
        uint256 index;
        for (uint256 i = 0; i < value.length; i++) {
            if (value[i] == " ") {
                index = i;
            }
        }

        bytes memory part0 = value[:index];
        bytes memory part1 = value[index+1:];

        return (
            part0,
            part1
        );
    }
}
