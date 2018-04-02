Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
    background: 'white'
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'brown',
    background: 'white',
});
