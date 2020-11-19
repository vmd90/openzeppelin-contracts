// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract TokenData {
    string  public name = "{NAME}";
    string  public symbol = "{SYMBOL}";

    uint256 public decimals = 0;
    uint256 public totalSupply;

    struct Event {
        string data;
    }

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event EventAdded(
        address indexed _senderAddress,
        uint _eventId,
        string _data
    );

    mapping(address => uint256) public balanceOf;

    mapping(uint => Event) public eventList;
    mapping(address => bool) allowedList;

    constructor() public {
        totalSupply = 0;
        allowedList[msg.sender] = true;
    }

    function transfer(address _to, uint256 _value, string memory _data) public returns (bool success) {
        require(allowedList[_to]);

        balanceOf[_to] += _value;

        addEvent(_data);

        emit Transfer(msg.sender, _to, _value);

        return true;
    }

    function addEvent(string memory _data) private returns(uint eventId) {
        require(allowedList[msg.sender]);
        eventId = totalSupply++;
        eventList[eventId] = Event(_data);
        emit EventAdded(msg.sender, eventId, _data);
    }

    function allow(address _spender) public returns (bool success) {
        require(allowedList[msg.sender]);
        allowedList[_spender] = true;
        return true;
    }

    function disallow(address _spender) public returns (bool success) {
        require(allowedList[msg.sender]);
        allowedList[_spender] = false;
        return true;
    }
}