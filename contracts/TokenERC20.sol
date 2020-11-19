// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenERC20 is ERC20 {

	event TransferComment(string comment);
	
	constructor(string memory initialSupply) public ERC20("VIC2", "VIC2") {
        _mint(msg.sender, _stringToUint(initialSupply) * 1000000000000000000);
    }

    function _stringToUint(string memory s) pure internal returns (uint result) {
        bytes memory b = bytes(s);
        uint i;
        result = 0;
        for (i = 0; i < b.length; i++) {
            uint c = uint(uint8(b[i]));
            if (c >= 48 && c <= 57) {
                result = result * 10 + (c - 48);
            }
        }
    }

	function transferWithComment(address _to, uint256 _value, string memory _comment) public returns (bool success) {
        transfer(_to, _value);
        emit TransferComment(_comment);
        return true;
    }
}