const div1 = dom.create("<div>我是div啊，你是谁</div>");
console.log(div1);
dom.after(test, div1);
const div3 = dom.create('<div id="parent">爸爸</div>');
dom.wrap(test, div3);

// const nodes = dom.empty(window.empty);
// console.log(nodes);

dom.attr(test, "title", "Hi,I am handSome");
const title = dom.attr(test, "title");
console.log(`title:${title}`);

dom.text(test, "你好，这是新的文本");
dom.text(test);

dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

let fn = () => {
  console.log("点击了");
};

dom.on(test, "click", fn);
dom.off(test, "click", fn);

const testDiv = dom.find("#test")[0];
console.log(testDiv);

console.log(dom.siblings(dom.find("#e2")[0]));
console.log(dom.next(dom.find("#e2")[0]));
console.log(dom.previous(dom.find("#e2")[0]));

const t = dom.find("#empty")[0];
dom.each(dom.children(t), (n) => dom.style(n, "color", "red"));
console.log(dom.index(dom.find("#e2")[0]));
