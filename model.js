var model = {
  blocks: [],
  pieces: [],


  playSound: function() {
    this.sounds[0].currentTime = 0;
    this.sounds[0].play();
  },

  shapes: ['leftL', 'rightL', 't', 'line', 'square', 'leftS', 'rightS'],

  init: function() {
    this.audioFiles = ['meow5.mp3'];
    this.sounds = [];
    this.sounds.push(new Audio(this.audioFiles[0]));
    this.height = 20;
    this.width = 10;

    this.addPiece(5, -2);
  },


  addPiece: function(x, y) {
    var piece = new Piece(x, y);
    var that = this;
    piece.blocks.forEach(function(block) {
      that.blocks.push(block);
    })
    this.pieces.push(piece);
    this.activePiece = piece;
    return piece;
  },

  tic: function() {
    var bottomed = false;

    if (this.activePiece.reachedBottom) {
      this.addPiece(5, -2);
      bottomed = true;
    }

    this.pieces.forEach(function(piece) {
      piece.tic();
    });

    if (bottomed) {
      this.checkClear();
    }
  },

  isPathBlocked: function(block, dir) {
    var coord = this.nextCoordinate(block, dir);
    if (this.coordIsOutOfBounds(coord) || this.coordIsOccupied(coord, block.piece)) {
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
      var blocks = _.filter(that.blocks, function(block) { return block.y == index});
      that.blocks = _.reject(that.blocks, function(block) { return block.y == index});
      that.destroyBlocks(blocks);
        that.playSound();
    })
  },

  destroyBlocks: function(blocks) {
    blocks.forEach(function(block) {
      block.piece.removeBlock(block);
    })
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

  coordIsOccupied: function(coord, piece) {
    var occupied = false;
    this.blocks.forEach(function(block){
      if (block.piece == piece) {
        return;
      }
      if (block.x == coord.x && block.y == coord.y) {
        occupied = true;
      }
    })
    return occupied;
  },

  rotate: function() {
    // this.playSound();
    this.activePiece.rotate();
  },

  moveRight: function() {
    this.activePiece.moveRight();
  },

  moveLeft: function() {
    this.activePiece.moveLeft();
  },

  moveDown: function() {
    this.activePiece.moveDown();
  },

  drop: function() {
    // this.playSound();
    this.activePiece.drop();
    this.checkClear();
    this.addPiece(5, -2);
  },
}

function Piece(x, y) {
  this.blocks = [];
  this.color = null;

  var shape = model.shapes[Math.floor(Math.random()* 7)];


  switch(shape){
    case 'rightL':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x, y + 1, this));
      this.blocks.push(new Block(x, y + 2, this));
      this.blocks.push(new Block(x + 1, y + 2, this));

      this.color = "#e99f0c";
      break;
    case 'leftL':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x, y + 1, this));
      this.blocks.push(new Block(x, y + 2, this));
      this.blocks.push(new Block(x - 1, y + 2, this));
      this.color = "#4444FF";
      break;
    case 't':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x + 1, y, this));
      this.blocks.push(new Block(x + 1, y + 1, this));
      this.blocks.push(new Block(x + 2, y, this));
      this.color = "#c431a3";
      break;
    case 'line':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x + 1, y, this));
      this.blocks.push(new Block(x + 2, y, this));
      this.blocks.push(new Block(x + 3, y, this));
      this.color = "#580dc5";
      break;
    case 'square':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x + 1, y, this));
      this.blocks.push(new Block(x, y + 1, this));
      this.blocks.push(new Block(x + 1, y + 1, this));
      this.color = "#880000";
      break;
    case 'leftS':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x, y + 1, this));
      this.blocks.push(new Block(x + 1, y + 1, this));
      this.blocks.push(new Block(x + 1, y + 2, this));
      this.color = "#FF0000";
      break;
    case 'rightS':
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x, y - 1, this));
      this.blocks.push(new Block(x + 1, y - 1, this));
      this.blocks.push(new Block(x + 1, y - 2, this));
      this.color = "#00FF00";
      break;
    default:
      this.blocks.push(new Block(x, y, this));
      this.blocks.push(new Block(x, y - 1, this));
      this.blocks.push(new Block(x + 1, y - 1, this));
      this.blocks.push(new Block(x + 1, y - 2, this));
      this.color = "#214541";
      break;

  };



  this.center = this.blocks[2];

  this.tic = function() {
    this.checkBottom();
    this.moveDown();
  };

  this.rotate = function() {
    var that = this;
    var blocked = false;
    var nextCoords = []
    this.blocks.forEach(function(block) {
      var x = block.x - that.center.x;
      var y = block.y - that.center.y;

      var newx = y * -1;
      var newy = x;

      var deltaX = newx - x
      var deltaY = newy - y

      var nextCoord = {}

      nextCoord.x = block.x + deltaX;
      nextCoord.y = block.y + deltaY;

      nextCoords.push(nextCoord)

      if (model.coordIsOccupied(nextCoord, block.piece) || model.coordIsOutOfBounds(nextCoord) ) {
        blocked = true;
      }
    })

    if (!blocked) {
      this.blocks.forEach(function(block, index) {
        var coord = nextCoords[index];
        block.x = coord.x;
        block.y = coord.y;
      })
    }
  };

  this.removeBlock = function(block) {
    var index = this.blocks.indexOf(block);
    this.blocks.splice(index, 1);
  };

  this.moveDown = function() {
    if (!this.isPathBlocked('down')) {
      this.blocks.forEach(function(block){
        block.moveDown();
      } )
    }
  };

  this.isPathBlocked = function(direction) {
    var blocked = false;
    this.blocks.forEach(function(block) {
      if (model.isPathBlocked(block, direction)) {
        blocked = true;
      }
    });
    return blocked;
  };

  this.checkBottom = function() {
    if (!this.isPathBlocked('down')) {
      this.reachedBottom = false;
    } else {
      this.reachedBottom = true;
    }
  };

  this.moveRight = function() {
    if (!this.isPathBlocked('right')) {
      this.blocks.forEach(function(block){
        block.moveRight();
      } )
    }
  };

  this.moveLeft = function() {
    if (!this.isPathBlocked('left')) {
      this.blocks.forEach(function(block){
        block.moveLeft();
      } )
    }
  };

  this.drop = function() {
    while (!this.isPathBlocked('down')) {
      this.moveDown();
    }
  };

  this.tic = function() {
    this.checkBottom();
    this.moveDown();
  };
}

function Block(x, y, piece) {
  this.x = x;
  this.y = y;
  this.piece = piece;
  this.tic = function() {
    this.checkBottom();
    this.moveDown();
  };

  this.moveDown = function() {
    this.y += 1;
  };

  this.moveRight = function() {
    this.x += 1;
  };

  this.moveLeft = function() {
    this.x -= 1;
  };
}
