window.dom = {
  create(string) {
    //示例：create("<div><span>你好</span></div>")
    //自动创建好的div和span
    //实现思路，直接把字符串写进InnerHTML
    //用template标签可容纳所有标签
    //本来之前想用tr标签，但发现div不能放进去
    const container = document.createElement("template");
    container.innerHTML = string.trim();
    return container.content.firstChild;
  },

  after(node, node2) {
    // 目标是在Node节点后面插入node2节点
    // 但是DOM只提供了insertBefore接口
    // 1 -> 3
    // 在1后面插入2, 等价于在3的前面插入2
    // 所以转换为在node的下一个节点的前面插入node2
    node.parentNode.insertBefore(node2, node.nextSibling);
  },

  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },

  append(parent, node) {
    parent.appendChild(node);
  },

  wrap(node, parent) {
    // 把parent 放到node前面
    // 把node append到parent里
    // 目标: div1
    //        ↓----> div2
    // 变成  div1
    //        ↓----> div3
    //                ↓----> div2
    dom.before(node, parent);
    dom.append(parent, node);
  },

  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },

  empty(node) {
    // empty 把所有子节点删掉
    // 坑：childNodes.length每次的Length会变化
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },

  attr(node, name, value) {
    // 根据参数的个数，实现不同的函数，这叫函数的重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },

  text(node, string) {
    //适配浏览器
    if (arguments.length === 2) {
      if ("innerText" in node) {
        //ie
        node.innerText = string;
      } else {
        // firefox / chrome
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },

  html(node, string) {
    if (arguments.length === 2) {
      //修改
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      // 获取内容
      return node.innerHTML;
    }
  },

  style(node, name, value) {
    if (arguments.length === 3) {
      //改样式
      //dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        //得特定的样式
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //修改特定的样式
        // dom.style(div,{color:'red'})
        const object = name;
        for (let key in object) {
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },

  // 根据选择器获取元素
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },

  parent(node) {
    return node.parentNode;
  },

  children(node) {
    return node.children;
  },
  siblings(node) {
    // 父结点的所有孩子除了我以外的其他孩子都是siblings
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },

  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },

  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },

  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },

  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
