
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
    sightRadius: 7,
    inventorySlots: 22,
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper, Game.EntityMixins.AutoExplore,
             Game.EntityMixins.RestAndHeal]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'green',
    background: 'white',
    speed: 250,
    maxHp: 10,
    mixins: [Game.EntityMixins.FungusActor, Game.EntityMixins.Destructible]
});

Game.EntityRepository.define('bat', {
    name: 'bat',
    character: 'b',
    foreground: 'black',
    background: 'white',
    speed: 2000,
    maxHp: 5,
    attackValue: 4,
    sightRadius: 7,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper]
});

Game.EntityRepository.define('wolf', {
    name: 'wolf',
    character: 'w',
    foreground: 'darkgrey',
    background: 'white',
    maxHp: 3,
    attackValue: 2,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper]
});

Game.EntityRepository.define('kobolt', {
    name: 'kobolt',
    character: 'k',
    foreground: 'brown',
    background: 'white',
    maxHp: 15,
    attackValue: 6,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper]
});

Game.EntityRepository.define('orc', {
    name: 'orc',
    character: 'o',
    foreground: 'red',
    background: 'white',
    maxHp: 20,
    attackValue: 10,
    sightRadius: 5,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper]
});
