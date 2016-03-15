var view = {
  squareSize: 35,

  init: function() {
    this.setup();
    var two = this.two;
    var rect = two.makeRectangle(this.pixelWidth() / 2, this.pixelHeight() / 2, this.pixelWidth(), this.pixelHeight());
    rect.fill = 'rgb(0, 200, 255)';
    rect.noStroke();
    rect.opacity = 0.75;
    var circle = two.makeCircle(82, 100, 50);
    circle.fill = '#FF8000';
    two.update();
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

}
