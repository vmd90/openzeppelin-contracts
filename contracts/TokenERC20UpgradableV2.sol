// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TokenERC20UpgradableV2 is ERC20Upgradeable, OwnableUpgradeable {

	event TransferComment(string comment);

    event Mint(string amount);
	
	function initialize(string memory initialSupply) initializer public {
        __ERC20_init_unchained('Super Token', 'SUPER');
        __Ownable_init_unchained();
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

    function mint(string memory amount) onlyOwner public returns (bool) {
        _mint(msg.sender, _stringToUint(amount) * 1000000000000000000);
        emit Mint(amount);
        return true;
    }
}