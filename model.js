var model = {
  blocks: [],

  init: function() {
    this.height = 20;
    this.width = 10;

    this.addBlock(4, 15);
    this.addBlock(4, 18);
    this.activeBlock = this.addBlock(0, 0);
  },

  addBlock: function(x, y) {
    var block = new Block(x, y);
    this.blocks.push(block);
    return block;
  },

  tic: function() {
    this.blocks.forEach(function(block) {
      block.tic();
    });
  },

  isPathBlocked: function(block, dir) {
    var coord = this.nextCoordinate(block, dir);
    if (this.coordIsOutOfBounds(coord) || this.coordIsOccupied(coord)) {
      return true
    }
    return false
  },

  nextCoordinate: function(coord, dir) {
    if (dir == 'down') {
      return {x: coord.x, y: coord.y + 1};
    } else if (dir == 'right') {
      return {x: coord.x + 1, y: coord.y};
    } else if (dir == 'left') {
      return {x: coord.x - 1, y: coord.y};
    }
  },

  coordIsOutOfBounds: function(coord) {
    return coord.x < 0 || coord.x >= this.width || coord.y < 0 || coord.y >= this.height;
  },

  coordIsOccupied: function(coord) {
    var occupied = false;
    this.blocks.forEach(function(block){
      if (block.x == coord.x && block.y == coord.y) {
        occupied = true;
      }
    })
    return occupied;
  },

  moveRight: function() {
    this.activeBlock.moveRight();
  },

  moveLeft: function() {
    this.activeBlock.moveLeft();
  }
}

function Block(x, y) {
  this.x = x;
  this.y = y;

  this.tic = function() {
    if (!model.isPathBlocked(this, 'down')) {
      this.y += 1;
    }
  };


  this.moveRight = function() {
    if (!model.isPathBlocked(this, 'right')) {
      this.x += 1;
    }
  };


  this.moveLeft = function() {
    if (!model.isPathBlocked(this, 'left')) {
      this.x -= 1;
    }
  };
}
