
//
// TEMPLATES
//

globalForegroundColor = "black"

Game.PlayerTemplate = {
    character: '@',
    foreground: 'black',
    background: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 6,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder,
             Game.EntityMixins.Sight, Game.EntityMixins.MessageRecipient]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'green',
    background: 'white',
    maxHp: 10,
    mixins: [Game.EntityMixins.FungusActor, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'b',
    foreground: 'black',
    background: 'white',
    maxHp: 5,
    attackValue: 4,
    mixins: [Game.EntityMixins.WanderActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('newt', {
    name: 'newt',
    character: ':',
    foreground: 'yellow',
    background: 'white',
    maxHp: 3,
    attackValue: 2,
    mixins: [Game.EntityMixins.WanderActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('kobolt', {
    name: 'kobolt',
    character: 'k',
    foreground: 'brown',
    background: 'white',
    maxHp: 15,
    attackValue: 6,
    mixins: [Game.EntityMixins.WanderActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible]
});
