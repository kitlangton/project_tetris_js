var model = {
  grid: [],

  init: function() {
    this.createGrid(10, 20);
  },

  createGrid: function(width, height) {
    this.height = height;
    this.width = width;
    var that = this;
    _(height).times(function() {
      that.grid.push(new Array(width))
    })
  },
}
