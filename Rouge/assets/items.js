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
    foreground: 'brightGreen',
    background: 'white',
    foodValue: 35,
    consumptions: 4,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'brown',
    background: 'white',
});
