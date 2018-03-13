
Game.Builder = function(width, height, depth) {
    this._width = width;
    this._height = height;
    this._depth = depth;
    this._tiles = new Array(depth);
    this._regions = new Array(depth);
    // Instantiate the arrays to be multi-dimension
    for (var z = 0; z < depth; z++) {
        // Create a new cave at each level
        this._tiles[z] = this._generateLevel();
        // Setup the regions array for each depth
        this._regions[z] = new Array(width);
        for (var x = 0; x < width; x++) {
            this._regions[z][x] = new Array(height);
            // Fill with zeroes
            for (var y = 0; y < height; y++) {
                this._regions[z][x][y] = 0;
            }
        }
    }
};


Game.Builder.prototype._generateLevel = function() {
    // Create the empty map
    var map = new Array(this._width);
    for (var w = 0; w < this._width; w++) {
        map[w] = new Array(this._height);
    }
    // Setup the cave generator
    var generator = new ROT.Map.Cellular(this._width, this._height);
    generator.randomize(0.5);
    var totalIterations = 3;
    // Iteratively smoothen the map
    for (var i = 0; i < totalIterations - 1; i++) {
        generator.create();
    }
    // Smoothen it one last time and then update our map
    generator.create(function(x,y,v) {
        if (v === 1) {
            map[x][y] = Game.Tile.floorTile;
        } else {
            map[x][y] = Game.Tile.wallTile;
        }
    });
    return map;
};
