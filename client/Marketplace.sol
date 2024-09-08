pragma solidity ^0.8.0;

contract Marketplace {
    address public owner;

    event Payment(address indexed _from, address indexed _to, uint256 _amount);

    constructor() {
        owner = msg.sender;
    }

    function pay(address _to) public payable {
        require(msg.value > 0, "Payment amount must be greater than 0");
        payable(_to).transfer(msg.value);
        emit Payment(msg.sender, _to, msg.value);
    }
}
