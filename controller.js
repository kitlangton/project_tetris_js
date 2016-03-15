var controller = {
  init: function() {
    model.init();
    view.init();
    this.loop();

    key('right', function() {
      model.moveRight();
      view.render();
    });
    key('left', function() {
      model.moveLeft();
      view.render();
    });
    key('down', function() {
      model.moveDown();
      view.render();
    });
    key('up', function() {
      model.rotate();
      view.render();
    });
    key('space', function() {
      model.drop();
      view.render();
    });
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
