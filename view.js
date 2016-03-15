var view = {
  squareSize: 35,

  init: function() {
    this.setup();
    var two = this.two;
    var rect = two.makeRectangle(this.pixelWidth() / 2, this.pixelHeight() / 2, this.pixelWidth(), this.pixelHeight());
    rect.fill = 'rgb(0, 200, 255)';
    rect.noStroke();
    rect.opacity = 0.75;
    two.update();
    this.render();
  },

  setup: function() {
    var elem = document.getElementById('tetris');
    var params = { width: this.pixelWidth(), height: this.pixelHeight() };
    var two = new Two(params).appendTo(elem);
    this.two = two
  },

  pixelWidth: function() {
    return controller.getWidth() * this.squareSize;
  },

  pixelHeight: function() {
    return controller.getHeight() * this.squareSize;
  },

  render: function() {
    var blocks = controller.getBlocks();
    var that = this;

    blocks.forEach(function(block){

      var x = block.x * that.squareSize + (that.squareSize / 2);
      var y = block.y * that.squareSize + (that.squareSize / 2);
      var square = that.two.makeRectangle(x, y, that.squareSize, that.squareSize);
      square.fill = 'rgb(191, 34, 34)'
    } )

    this.two.update();
  }

}
