Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
    background: 'white',
    foodValue: 50,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'green',
    background: 'white',
    foodValue: 35,
    consumptions: 4,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'brown',
    background: 'white'
});

Game.ItemRepository.define('corpse', {
    name: 'corpse',
    character: '%',
    background: 'white',
    foodValue: 75,
    consumptions: 1,
    mixins: [Game.ItemMixins.Edible]
}, {
    disableRandomCreation: true
});

// Weapons
Game.ItemRepository.define('dagger', {
    name: 'dagger',
    character: ')',
    foreground: 'gray',
    background: 'white',
    attackValue: 5,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sword', {
    name: 'sword',
    character: ')',
    foreground: 'black',
    background: 'white',
    attackValue: 10,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('staff', {
    name: 'staff',
    character: ')',
    foreground: 'yellow',
    background: 'white',
    attackValue: 5,
    defenseValue: 3,
    wieldable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

// Wearables
Game.ItemRepository.define('tunic', {
    name: 'tunic',
    character: '[',
    foreground: 'green',
    background: 'white',
    defenseValue: 2,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('chainmail', {
    name: 'chainmail',
    character: '[',
    foreground: 'black',
    background: 'white',
    defenseValue: 4,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail', {
    name: 'platemail',
    character: '[',
    foreground: 'aliceblue',
    background: 'white',
    defenseValue: 6,
    wearable: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('pumpkin', {
    name: 'pumpkin',
    character: '%',
    foreground: 'orange',
    background: 'white',
    foodValue: 50,
    attackValue: 2,
    defenseValue: 2,
    wearable: true,
    wieldable: true,
    mixins: [Game.ItemMixins.Edible, Game.ItemMixins.Equippable]
});
