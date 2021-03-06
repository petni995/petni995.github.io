
// Create our Mixins namespace
Game.EntityMixins = {};


// Main player's actor mixin
Game.EntityMixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function() {
      if (this._acting) {
          return;
      }
      this._acting = true;
      this.addTurnHunger();
      // Detect if the game is over
      if (!this.isAlive()) {
          Game.Screen.playScreen.setGameEnded(true);
          // Send a last message to the player
          Game.sendMessage(this, 'Press [Enter] to continue!');
      }        // Re-render the screen
      Game.refresh();
      // Lock the engine and wait asynchronously
      // for the player to press a key.
      this.getMap().getEngine().lock();
      // Clear the message queue
      this.clearMessages();
      this._acting = false;
    }
}


// This signifies our entity posseses a field of vision of a given radius.
Game.EntityMixins.Sight = {
    name: 'Sight',
    groupName: 'Sight',
    init: function(template) {
        this._sightRadius = template['sightRadius'] || 5;
    },
    getSightRadius: function() {
        return this._sightRadius;
    },
    canSee: function(entity) {
        // If not on the same map or on different floors, then exit early
        if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
            return false;
        }

        var otherX = entity.getX();
        var otherY = entity.getY();

        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if ((otherX - this._x) * (otherX - this._x) +
            (otherY - this._y) * (otherY - this._y) >
            this._sightRadius * this._sightRadius) {
            return false;
        }

        // Compute the FOV and check if the coordinates are in there.
        var found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(),
            this.getSightRadius(),
            function(x, y, radius, visibility) {
                if (x === otherX && y === otherY) {
                    found = true;
                }
            });
        return found;
    }
}

Game.EntityMixins.RestAndHeal = {
    name: 'RestAndHeal',
    groupName: 'Actor',
    init: function() {

    },
    act: function() {

    },
    rest: function() {
        var player = this.getMap().getPlayer();
        var map =this.getMap();

        var source = this;
        var x = source.getX();
        var y = source.getY();
        var z = source.getZ();
        var hp = source.getHp();
        var maxhp = source.getMaxHp();
        var diff = maxhp - hp
        var interval = 100;

        for (var i = 0; i < diff; i++) {


            var count = 0
            var timeouts = [];


            var timedstep = setTimeout(function(){

                 var seeEnemy = false

                 a = _.reject(Game.Screen.playScreen._map._entities, { '_char': "@" });

                 _.forEach(a, function(value, key) {
                   if(Game.Screen.playScreen._player.canSee(value)) {
                     seeEnemy = true
                   }
                 });

                 if (!seeEnemy) {
                   player._hp ++
                   map.getEngine().unlock();
                 } else {
                   timeouts.forEach(clearInterval)
                   return
                 }

            }, interval);

            timeouts.push(timedstep)
            interval += 100

        };

    }
};

Game.EntityMixins.TaskActor = {
    name: 'TaskActor',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['wander'];
    },
    act: function() {
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    canDoTask: function(task) {
        if (task === 'hunt') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task === 'wander') {
            return true;
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    hunt: function() {
        var player = this.getMap().getPlayer();

        // If we are adjacent to the player, then attack instead of hunting.
        var offsets = Math.abs(player.getX() - this.getX()) +
            Math.abs(player.getY() - this.getY());
        if (offsets === 1) {
            if (this.hasMixin('Attacker')) {
                this.attack(player);
                return;
            }
        }

        // Generate the path and move to the first tile.
        var source = this;
        var z = source.getZ();
        var path = new ROT.Path.AStar(player.getX(), player.getY(), function(x, y) {
            // If an entity is present at the tile, can't move there.
            var entity = source.getMap().getEntityAt(x, y, z);
            if (entity && entity !== player && entity !== source) {
                return false;
            }
            return source.getMap().getTile(x, y, z).isWalkable();
        }, {topology: 4});
        // Once we've gotten the path, we want to move to the second cell that is
        // passed in the callback (the first is the entity's strting point)
        var count = 0;
        path.compute(source.getX(), source.getY(), function(x, y) {
            if (count == 1) {
                source.tryMove(x, y, z);
            }
            count++;
        });
    },
    wander: function() {
        // Flip coin to determine if moving by 1 in the positive or negative direction
        var moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        // Flip coin to determine if moving in x direction or y direction
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.getX() + moveOffset, this.getY(), this.getZ());
        } else {
            this.tryMove(this.getX(), this.getY() + moveOffset, this.getZ());
        }
    }
};


Game.EntityMixins.AutoExplore = {
    name: 'AutoExplore',
    groupName: 'Actor',
    init: function() {
      this.exploring = 0;
      this.notexplored = [];
      this.timeouts = [];
      this.goal = [];
    },
    act: function() {

    },
    explore: function() {
        this.exploring = 1
        var player = this.getMap().getPlayer();
        var map =this.getMap();

        var source = this;
        var z = source.getZ();

        source.notexplored = [];

        for (var x = 0; x < 100; x++) {
            for (var y = 0; y < 48; y++) {
                 if (Game.Screen.playScreen._map.isNotExplored(x, y, z)) {
                   if (Game.Screen.playScreen._map.isEmptyFloor(x, y, z)) {
                   source.notexplored.push([x,y])
                    }
                 }
            }
        }

        source.goal[0] = source.notexplored[0][0]
        source.goal[1] = source.notexplored[0][1]

        if (source.notexplored.length > 0) {

            var path = new ROT.Path.AStar(source.goal[0], source.goal[1], function(x, y) {

              return source.getMap().getTile(x, y, z).isWalkable();

            }, {topology: 4});
            // Once we've gotten the path, we want to move to the second cell that is
            // passed in the callback (the first is the entity's strting point)

            var interval = 100;
            var count = 0

            path.compute(source.getX(), source.getY(), function(x, y) {

              if (count > 0) {

                var timedstep = setTimeout(function(){

                 var seeEnemy = false

                 a = _.reject(Game.Screen.playScreen._map._entities, { '_char': "@" });

                 _.forEach(a, function(value, key) {
                   if(Game.Screen.playScreen._player.canSee(value)) {
                     seeEnemy = true
                     source.exploring = 0
                   }
                 });

                 if (!seeEnemy) {

                   player.tryMove(x, y, z);
                   map.getEngine().unlock();
                   if (x == source.goal[0] && y == source.goal[1] ) {
                     source.timeouts.forEach(clearInterval)
                     source.timeouts = []
                     Game.Screen.playScreen._map._player.explore()
                   }

                 } else {
                   source.timeouts.forEach(clearInterval)
                   source.timeouts = []
                   return
                 }

                }, interval);
                source.timeouts.push(timedstep)
              }

               interval += 100
               count++;

            });


        } else {
          Game.sendMessage(Game.Screen.playScreen._map._player,"Done exploring!")
        }


    },
};



Game.EntityMixins.FungusActor = {
    name: 'FungusActor',
    groupName: 'Actor',
    init: function() {
        this._growthsRemaining = 5;
    },
    act: function() {
        // Check if we are going to try growing this turn
        if (this._growthsRemaining > 0) {
            if (Math.random() <= 0.02) {
                // Generate the coordinates of a random adjacent square by
                // generating an offset between [-1, 0, 1] for both the x and
                // y directions. To do this, we generate a number from 0-2 and then
                // subtract 1.
                var xOffset = Math.floor(Math.random() * 3) - 1;
                var yOffset = Math.floor(Math.random() * 3) - 1;
                // Make sure we aren't trying to spawn on the same tile as us
                if (xOffset != 0 || yOffset != 0) {
                    // Check if we can actually spawn at that location, and if so
                    // then we grow!
                    if (this.getMap().isEmptyFloor(this.getX() + xOffset,
                                                   this.getY() + yOffset,
                                                   this.getZ())) {
                        var entity = Game.EntityRepository.create('fungus');
                        entity.setPosition(this.getX() + xOffset,
                            this.getY() + yOffset, this.getZ());
                        this.getMap().addEntity(entity);
                        this._growthsRemaining--;
                        // Send a message nearby!
                        Game.sendMessageNearby(this.getMap(),
                            entity.getX(), entity.getY(), entity.getZ(),
                            'The fungus is spreading!');
                    }
                }
            }
        }

    }
}

Game.EntityMixins.Destructible = {
  name: 'Destructible',
  init: function(template) {
      this._maxHp = template['maxHp'] || 10;
      // We allow taking in health from the template incase we want
      // the entity to start with a different amount of HP than the
      // max specified.
      this._hp = template['hp'] || this._maxHp;
      this._defenseValue = template['defenseValue'] || 0;
  },
  getHp: function() {
      return this._hp;
  },
  getMaxHp: function() {
      return this._maxHp;
  },
  getDefenseValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into
        // consideration weapon and armor
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getDefenseValue();
            }
            if (this.getArmor()) {
                modifier += this.getArmor().getDefenseValue();
            }
        }
        return this._defenseValue + modifier;
    },
    takeDamage: function(attacker, damage) {
      this._hp -= damage;
      // If have 0 or less HP, then remove ourseles from the map
      if (this._hp <= 0) {
          Game.sendMessage(attacker, 'You kill the %s!', [this.getName()]);
          // If the entity is a corpse dropper, try to add a corpse
          if (this.hasMixin(Game.EntityMixins.CorpseDropper)) {
              this.tryDropCorpse();
          }
          this.kill();
      }
  }
}


Game.EntityMixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    init: function(template) {
      this._attackValue = template['attackValue'] || 1;
    },
    getAttackValue: function() {
        var modifier = 0;
        // If we can equip items, then have to take into
        // consideration weapon and armor
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getWeapon()) {
                modifier += this.getWeapon().getAttackValue();
            }
            if (this.getArmor()) {
                modifier += this.getArmor().getAttackValue();
            }
        }
        return this._attackValue + modifier;
    },
    attack: function(target) {
        // If the target is destructible, calculate the damage
        // based on attack and defense value
        if (target.hasMixin('Destructible')) {
            var attack = this.getAttackValue();
            var defense = target.getDefenseValue();
            var max = Math.max(0, attack - defense);
            var damage = 1 + Math.floor(Math.random() * max);

            Game.sendMessage(this, 'You strike the %s for %d damage!',
                [target.getName(), damage]);
            Game.sendMessage(target, 'The %s strikes you for %d damage!',
                [this.getName(), damage]);

            target.takeDamage(this, damage);
        }
    }
}

Game.EntityMixins.InventoryHolder = {
    name: 'InventoryHolder',
    init: function(template) {
        // Default to 10 inventory slots.
        var inventorySlots = template['inventorySlots'] || 10;
        // Set up an empty inventory.
        this._items = new Array(inventorySlots);
    },
    getItems: function() {
        return this._items;
    },
    getItem: function(i) {
        return this._items[i];
    },
    addItem: function(item) {
        // Try to find a slot, returning true only if we could add the item.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                this._items[i] = item;
                return true;
            }
        }
        return false;
    },
    removeItem: function(i) {
        // If we can equip items, then make sure we unequip the item we are removing.
        if (this._items[i] && this.hasMixin(Game.EntityMixins.Equipper)) {
            this.unequip(this._items[i]);
        }
        // Simply clear the inventory slot.
        this._items[i] = null;
    },
    canAddItem: function() {
        // Check if we have an empty slot.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                return true;
            }
        }
        return false;
    },
    pickupItems: function(indices) {
        // Allows the user to pick up items from the map, where indices is
        // the indices for the array returned by map.getItemsAt
        var mapItems = this._map.getItemsAt(this.getX(), this.getY(), this.getZ());
        var added = 0;
        // Iterate through all indices.
        for (var i = 0; i < indices.length; i++) {
            // Try to add the item. If our inventory is not full, then splice the
            // item out of the list of items. In order to fetch the right item, we
            // have to offset the number of items already added.
            if (this.addItem(mapItems[indices[i]  - added])) {
                mapItems.splice(indices[i] - added, 1);
                added++;
            } else {
                // Inventory is full
                break;
            }
        }
        // Update the map items
        this._map.setItemsAt(this.getX(), this.getY(), this.getZ(), mapItems);
        // Return true only if we added all items
        return added === indices.length;
    },
    dropItem: function(i) {
        // Drops an item to the current map tile
        if (this._items[i]) {
            if (this._map) {
                this._map.addItem(this.getX(), this.getY(), this.getZ(), this._items[i]);
            }
            this.removeItem(i);
        }
    }
};

Game.EntityMixins.FoodConsumer = {
    name: 'FoodConsumer',
    init: function(template) {
        this._maxFullness = template['maxFullness'] || 1000;
        // Start halfway to max fullness if no default value
        this._fullness = template['fullness'] || (this._maxFullness / 2);
        // Number of points to decrease fullness by every turn.
        this._fullnessDepletionRate = template['fullnessDepletionRate'] || 0.05;
    },
    addTurnHunger: function() {
        // Remove the standard depletion points
        this.modifyFullnessBy(-this._fullnessDepletionRate);
    },
    modifyFullnessBy: function(points) {
        this._fullness = this._fullness + points;
        if (this._fullness <= 0) {
            this.kill("You have died of starvation!");
        } else if (this._fullness > this._maxFullness) {
            this.kill("You choke and die!");
        }
    },
    getHungerState: function() {
        // Fullness points per percent of max fullness
        var perPercent = this._maxFullness / 100;
        // 5% of max fullness or less = starving
        if (this._fullness <= perPercent * 5) {
            return 'Starving';
        // 25% of max fullness or less = hungry
        } else if (this._fullness <= perPercent * 25) {
            return 'Hungry';
        // 95% of max fullness or more = oversatiated
        } else if (this._fullness >= perPercent * 95) {
            return 'Oversatiated';
        // 75% of max fullness or more = full
        } else if (this._fullness >= perPercent * 75) {
            return 'Full';
        // Anything else = not hungry
        } else {
            return 'Not Hungry';
        }
    }
};

Game.EntityMixins.CorpseDropper = {
    name: 'CorpseDropper',
    init: function(template) {
        // Chance of dropping a cropse (out of 100).
        this._corpseDropRate = template['corpseDropRate'] || 100;
    },
    tryDropCorpse: function() {
        if (Math.round(Math.random() * 100) < this._corpseDropRate) {
            // Create a new corpse item and drop it.
            this._map.addItem(this.getX(), this.getY(), this.getZ(),
                Game.ItemRepository.create('corpse', {
                    name: this._name + ' corpse',
                    foreground: this._foreground
                }));
        }
    }
};

Game.EntityMixins.Equipper = {
    name: 'Equipper',
    init: function(template) {
        this._weapon = null;
        this._armor = null;
    },
    wield: function(item) {
        this._weapon = item;
    },
    unwield: function() {
        this._weapon = null;
    },
    wear: function(item) {
        this._armor = item;
    },
    takeOff: function() {
        this._armor = null;
    },
    getWeapon: function() {
        return this._weapon;
    },
    getArmor: function() {
        return this._armor;
    },
    unequip: function(item) {
        // Helper function to be called before getting rid of an item.
        if (this._weapon === item) {
            this.unwield();
        }
        if (this._armor === item) {
            this.takeOff();
        }
    }
};

//
// SENDING AND RECEIVING MESSAGES
//

Game.EntityMixins.MessageRecipient = {
    name: 'MessageRecipient',
    init: function(template) {
        this._messages = [];
    },
    receiveMessage: function(message) {
        this._messages.push(message);
    },
    getMessages: function() {
        return this._messages;
    },
    clearMessages: function() {
        this._messages = [];
    }
}

Game.sendMessage = function(recipient, message, args) {
    // Make sure the recipient can receive the message
    // before doing any work.
    if (recipient.hasMixin(Game.EntityMixins.MessageRecipient)) {
        // If args were passed, then we format the message, else
        // no formatting is necessary
        if (args) {
            message = vsprintf(message, args);
        }
        recipient.receiveMessage(message);
    }
}

Game.sendMessageNearby = function(map, centerX, centerY, centerZ, message, args) {
    // If args were passed, then we format the message, else
    // no formatting is necessary
    if (args) {
        message = vsprintf(message, args);
    }
    // Get the nearby entities
    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    // Iterate through nearby entities, sending the message if
    // they can receive it.
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].hasMixin(Game.EntityMixins.MessageRecipient)) {
            entities[i].receiveMessage(message);
        }
    }
}
