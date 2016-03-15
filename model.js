var model = {
  blocks: [],

  init: function() {
    this.height = 20;
    this.width = 10;

    this.addBlock(4, 15);
    this.addBlock(4, 18);
    this.addBlock(0, 0);
  },

  addBlock: function(x, y) {
    var block = new Block(x, y);
    this.blocks.push(block);
  },

  tic: function() {
    this.blocks.forEach(function(block) {
      block.tic();
    });
  },

  isPathBlocked: function(block) {
    var coord = this.nextCoordinate(block.x, block.y);
    if (this.coordIsOutOfBounds(coord) || this.coordIsOccupied(coord)) {
      return true
    }
    return false
  },

  nextCoordinate: function(x, y) {
    return {x: x, y: y + 1};
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
  }
}

function Block(x, y) {
  this.x = x;
  this.y = y;

  this.tic = function() {
    if (!model.isPathBlocked(this)) {
      this.y += 1;
    }
  };
}
