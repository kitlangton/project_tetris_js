var controller = {
  init: function() {
    model.init();
    view.init();
  },

  getHeight: function() {
    return model.height;
  },

  getWidth: function() {
    return model.width;
  },
}
