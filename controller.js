var controller = {
  init: function() {
    model.init();
    view.init();
    this.loop();
  },

  loop: function() {
    setInterval(function() {
      model.tic()
      view.render()
    }, 500);
  },

  getHeight: function() {
    return model.height;
  },

  getWidth: function() {
    return model.width;
  },

  getBlocks: function() {
    return model.blocks;
  }
}
