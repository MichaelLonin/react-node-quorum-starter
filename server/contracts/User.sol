pragma solidity ^0.4.15;


contract User {

    enum UserTypes {
        Warehouse,
        Trader,
        Bank
    }

    bytes32 public name;
    bytes public constKey;
    address public ethKey;
    UserTypes public actorType;
    bytes public whisperKey;

    function User(bytes32 _name, bytes _constKey, UserTypes _actorType, bytes _whisperKey) public {
        name = _name;
        constKey = _constKey;
        actorType = _actorType;
        ethKey = tx.origin;
        whisperKey = _whisperKey;
    }

    function setName(bytes32 _name) public isUser {
        name = _name;
    }

    function setConstKey(bytes _constKey) public isUser {
        constKey = _constKey;
    }

    function setUserType(UserTypes _actorType) public isUser {
        actorType = _actorType;
    }

    function setWhisperPubKey(bytes _whisperKey) public isUser {
        whisperKey = _whisperKey;
    }

    function getUserDetails() public constant returns (bytes32, bytes, address, UserTypes, bytes) {
        return (name, constKey, ethKey, actorType, whisperKey);
    }

    modifier isUser() {
        if (msg.sender != ethKey)
        revert();
        _;
    }
}