define([
    'harris/react',
    'modules/child.view'],
    function (React, childView) {

  return {

    onBeforeInit: function () {
      for (var i = 0; i < 1; i++) {
        this.node.children[0].children[0].children.push({
          tag: 'li',
          text: function () {
            return '1:' + this.atomGet('foo');
          }
        });
      }
    },

    atomListeners: ['foo'],

    node: {
      children: [
        {
          tag: 'li',
          text: '1',
          children: [
            {
              tag: 'ul',
              children: [
                {
                  tag: 'li',
                  text: '1.1'
                },
                {
                  tag: 'li',
                  text: '1.2'
                },
                {
                  tag: 'li',
                  text: '1.3'
                },
                {
                  component: childView,
                  initOptions: {}
                }
              ]
            }
          ]
        },
        {
          tag: 'li',
          text: '2'
        }
      ]
    }
  };

});

/*

node: {
  text: '{atom.foo}'
  text: '{this.foo}'
  text: '{store.myStore.foo}'
  text: '{store.myStore.foo(this.foo)}'
  text: '{i18n.title}'
  text: '{i18n.title(this.foo)}'
  text: function () {}
  classes: {
    active: '{this.foo} up'
    active: '{this.foo}'
    active: this.foo
    active: function () {}
  }
  animatedClasses: {
    closed: false
    opened: true
  }
  onClick: '{this.foo(123)}'
  onClick: this.foo
  onClick: '{store.myStore.foo}'
  onClick: '{store.myStore.foo(123)}'
}

stores: [myStore]

components: [myComponent]

atomListeners: [this.stores.myStore]

onBeforeInit: function () {}
onInit: function () {}
onBeforeMount: function () {}
onMount: function () {}
onBeforeClose: function () {}
onClose: function () {}

*/
