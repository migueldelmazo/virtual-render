require([
  'harris/atom',
  'harris/react',
  'modules/main.view'
], function (atom, React, mainView) {

  var mainViewInstance = new React(mainView, { $el: $('ul#app') });

  console.time('render');
  mainViewInstance.render();
  console.timeEnd('render');

  window.atom = atom;
  window.mainViewInstance = mainViewInstance;

});
