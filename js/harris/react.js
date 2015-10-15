define(['harris/atom'], function (atom) {

  var React = Class.extend({

    init: function (view, options) {
      this.parseOptions(view, options);
      this.initAtomListeners();
    },

    parseOptions: function (view, options) {
      _.extend(this, view);
      options = options || {};
      this.node.$node = options.$el;
    },

    //render helpers

    render: function (node) {
      node = node || this.node;
      this.renderNode(node);
      this.renderChildren(node);
      this.appendNode(node);
    },

    renderNode: function (node) {
      if (this.getStatus(node)) {
        this.renderTag(node);
        this.renderText(node);
      }
    },

    renderTag: function (node) {
      if (!node.$node && node.tag) {
        node.$node = $('<' + node.tag + '/>');
      }
    },

    renderText: function (node) {
      var text = this.result(node, 'text');
      if (node._text != text) {
        node._text = text;
        node.$node.text(text);
      }
    },

    renderChildren: function (node) {
      _.each(node.children, this.render.bind(this));
    },

    //append helpers

    appendNode: function (node) {
      _.each(node.children, function (child) {
        (this.getStatus(child)) ? this.appendChild(node, child) : this.removeChild(node, child);
      }, this);
    },

    appendChild: function (node, child) {
      if (this.isComponent(child)) {
        this.ensureComponent(node, child);
      } else if (!this.isChildAppended(node, child)) {
        node.$node.append(child.$node);
      }
      this.appendNode(child);
    },

    isChildAppended: function (node, child) {
      var child$NodeDom = child.$node.get(0);
      return !!_.find(node.$node.children(), function (_child) {
        return child$NodeDom === _child;
      });
    },

    removeChild: function (node, child) {
      if (this.isComponent(child)) {
        this.removeComponent(node, child);
      } else {
        child.$node.remove();
      }
    },

    //components

    ensureComponent: function (node, child) {
      this.instanceComponent(node, child);
      this.renderComponent(child);
    },

    instanceComponent: function (node, child) {
      if (!child.instance) {
        child.instance = new React(child.component, { $el: node.$node });
      }
    },

    renderComponent: function (child) {
      child.instance.render();
    },

    removeComponent: function (node, child) {
      this.removeChild.call(child.instance, child, child.instance.node);
    },

    isComponent: function (node) {
      return !!node.component;
    },

    //status

    getStatus: function (node) {
      return node.status === undefined ? true : node.status;
    },

    //atom

    initAtomListeners: function () {
      if (this.atomListeners) {
        atom.on(this.onChangeAtom.bind(this));
      }
    },

    onChangeAtom: function () {
      this.render();
    },

    atomGet: function (key) {
      return atom.get(key);
    },

    //helpers

    set$El: function ($el) {
      this.node.$node = $el;
    },

    result: function (obj, attr, defaultValue) {
      var result = obj[attr];
      if (_.isFunction(result)) {
        result = result.call(this);
      }
      return (result != undefined) ? result : undefined;
    },

    hook: function (hook) {
      if (_.isFunction(this[hook])) {
        this[hook]();
      }
    }
  });

  return React;
});
