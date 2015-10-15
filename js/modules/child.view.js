define([], function () {

  return {
    node: {
      children: [
        {
          tag: 'li',
          text: function () {
            return 'child ' + new Date().getTime();
          }
        }
      ]
    }
  };

});
