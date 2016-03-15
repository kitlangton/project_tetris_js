var model = {
  blocks: [],

  init: function() {
    this.height = 20;
    this.width = 10;

    this.addBlock(1, 18);
    this.addBlock(2, 18);
    this.addBlock(3, 18);
    this.addBlock(4, 18);
    this.addBlock(5, 18);
    this.addBlock(6, 18);
    this.addBlock(7, 18);
    this.addBlock(8, 18);
    this.addBlock(9, 18);
    this.addBlock(0, 0);
  },

  addBlock: function(x, y) {
    var block = new Block(x, y);
    this.blocks.push(block);
    this.activeBlock = block;
    return block;
  },

  tic: function() {
    var bottomed = false;

    if (this.activeBlock.reachedBottom) {
      this.addBlock(5, 0);
      bottomed = true;
    }

    this.blocks.forEach(function(block) {
      block.tic();
    });

    if (bottomed) {
      this.checkClear();
    }
  },

  isPathBlocked: function(block, dir) {
    var coord = this.nextCoordinate(block, dir);
    if (this.coordIsOutOfBounds(coord) || this.coordIsOccupied(coord)) {
      return true
    }
    return false
  },

  checkClear: function() {
    var rows = new Array(this.height);
    var that = this;

    _(this.height).times(function(i) {
      rows[i] = [];
    })

    this.blocks.forEach(function(block) {
      rows[block.y].push('1')
    });

    var fullRows = [];
    rows.forEach(function(row, index) {
      if (row.length == that.width) {
        fullRows.push(index);
      }
    })

    fullRows.forEach(function(index) {
      that.blocks = _.reject(that.blocks, function(block) { return block.y == index});
    })
  },

  destroyBlocks: function(blocks) {
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
    return coord.x < 0 || coord.x >= this.width || coord.y >= this.height;
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
  },

  moveDown: function() {
    this.activeBlock.moveDown();
  },

  drop: function() {
    this.activeBlock.drop();
  },
}

function Block(x, y) {
  this.x = x;
  this.y = y;
  this.reachedBottom = false;

  this.tic = function() {
    this.checkBottom();
    this.moveDown();
  };

  this.moveDown = function() {
    if (!model.isPathBlocked(this, 'down')) {
      this.y += 1;
    }
  };

  this.checkBottom = function() {
    if (!model.isPathBlocked(this, 'down')) {
      this.reachedBottom = false;
    } else {
      this.reachedBottom = true;
    }
  }

  this.moveRight = function() {
    if (!model.isPathBlocked(this, 'right')) {
      this.x += 1;
    }
    this.checkBottom();
  };

  this.moveLeft = function() {
    if (!model.isPathBlocked(this, 'left')) {
      this.x -= 1;
    }
    this.checkBottom();
  };

  this.drop = function() {
    while (!model.isPathBlocked(this, 'down')) {
      this.moveDown();
    }
  };
}
