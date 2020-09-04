window.dom = {
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  style(node, name, value) {
    if (arguments.length === 3) {
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        node.style[name];
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },

  each(nodeList, fn) {
    for (let i; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
};
