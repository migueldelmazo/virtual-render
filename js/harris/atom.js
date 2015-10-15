define([], function () {

  return {

    attrs: {},

    set: function (key, val) {
      this.attrs[key] = val;
      this.onSet(key);
    },

    get: function (key) {
      return this.attrs[key];
    },

    listeners: [],

    onSet: function (key) {
      this.listeners.forEach(function (listener) {
        listener(key);
      });
    },

    on: function (callback) {
      if (this.listeners.indexOf(callback) < 0) {
        this.listeners.push(callback);
      }
    },

    off: function (callback) {
      var index = this.listeners.indexOf(callback);
      if (index >= 0) {
        this.listeners.splice(index, 1);
      }
    }

  };

});
