pragma solidity ^0.4.15;


contract Channel {

    enum EntityTypes {
        Type1,
        Type2,
        Type3
    }

    struct Entity {
        address entityAddress;
        EntityTypes entityType;
    }

    address public firstParty;
    address public secondParty;

    Entity[] public entities;

    function Channel(address _secondParty) public {
        firstParty = msg.sender;
        secondParty = _secondParty;
    }

    function addEntity(address _entityAddress, EntityTypes _entityType) public {
        entities.push(Entity(_entityAddress, _entityType));
    }

    function getAllEntities() public constant returns (address[], EntityTypes[]) {
        uint entitiesCount = entities.length;
        address[] memory entityAddresses = new address[](entitiesCount);
        EntityTypes[] memory entityTypes = new EntityTypes[](entitiesCount);
        for (uint i = 0; i < entitiesCount; i++) {
            entityAddresses[i] = entities[i].entityAddress;
            entityTypes[i] = entities[i].entityType;
        }
        return (entityAddresses, entityTypes);
    }

    function getEntitiesByType(EntityTypes _entityType) public constant returns (address[]) {
        address[] memory typeEntities;
        uint[] memory entityNumbers = new uint[](entities.length);
        uint typeEntitiesCount = 0;
        for (uint i = 0; i < entities.length; i++) {
            if (entities[i].entityType == _entityType) {
                entityNumbers[typeEntitiesCount] = i;
                typeEntitiesCount++;
            }
        }
        typeEntities = new address[](typeEntitiesCount);
        for (i = 0; i < typeEntitiesCount; i++) {
            typeEntities[i] = entities[entityNumbers[i]].entityAddress;
        }
        return typeEntities;
    }
}
