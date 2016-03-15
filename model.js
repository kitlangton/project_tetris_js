var model = {

  blocks: [],

  init: function() {
    this.height = 20;
    this.width = 10;

    this.addBlock(4, 0);
    this.addBlock(9, 0);
    this.addBlock(0, 0);
  },

  addBlock: function(x, y) {
    var block = new Block(x, y);
    this.blocks.push(block);
  }
}


function Block(x, y) {

  this.x = x;
  this.y = y;

  this.move = function() {

  };

}