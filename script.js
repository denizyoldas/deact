function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter((c) => c != null && c !== false)
    .map((c) => (c instanceof Object ? c : createTextElement(c)));
  return { type, props };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type);

  const isProperty = (key) => key !== "children";
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

const Deact = {
  createElement,
  render,
};

/** @jsx Deact.createElement */
const element = (
  <div>
    <div id="foo" className="foo">
      as
    </div>
    <div className="bar">sa</div>
  </div>
);

const like = () => {
  console.log("like");
};

const container = document.getElementById("root");
Deact.render(element, container);
