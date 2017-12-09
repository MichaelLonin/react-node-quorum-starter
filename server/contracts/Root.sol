pragma solidity ^0.4.15;

import "./User.sol";


contract Root {

    address[] public users;
    mapping (address => address) public ethToUser;

    uint contractID = 0;

    function Root() public payable {
    }

    function registerUser(bytes32 _name, bytes _constKey, User.UserTypes _actorType, bytes _whisperKey) public {
        if (ethToUser[msg.sender] != address(0)) {
            return;
        }
        address newUser = new User(_name, _constKey, _actorType, _whisperKey);
        ethToUser[msg.sender] = newUser;
        users.push(newUser);
    }

    function getAllUsers() public constant returns (address[]) {
        return users;
    }

    function getUsersByType(User.UserTypes _actorType) public constant returns (address[]) {
        address[] memory typeUsers;
        uint[] memory usersNumbers = new uint[](users.length);
        uint arrayLength = 0;
        for (uint i = 0; i < users.length; i++) {
            User actor = User(users[i]);
            if (actor.actorType() == _actorType) {
                usersNumbers[arrayLength] = i;
                arrayLength++;
            }
        }
        typeUsers = new address[](arrayLength);
        for (i = 0; i < arrayLength; i++) {
            typeUsers[i] = users[usersNumbers[i]];
        }
        return typeUsers;
    }

    function getMyUser() public constant returns (address) {
        return ethToUser[msg.sender];
    }
}
