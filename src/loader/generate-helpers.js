import { handleSTORYOF } from "./parse-helpers";

const estraverse = require("estraverse");
const acorn = require("acorn");

require("acorn-stage3/inject")(acorn);
require("acorn-jsx/inject")(acorn);
require("acorn-es7")(acorn);

const acornConfig = {
  ecmaVersion: "9",
  sourceType: "module",
  ranges: true,
  locations: true,
  plugins: {
    jsx: true,
    stage3: true,
    es7: true
  }
};

function generateSourceWithDecorators(source, decorator) {
  const comments = [];

  const config = {
    ...acornConfig,
    onComment: comments
  };

  const ast = acorn.parse(source, config);

  let lastIndex = 0;
  const parts = [source];

  estraverse.traverse(ast, {
    fallback: "iteration",
    enter: node => {
      if (node.type === "CallExpression") {
        lastIndex = handleSTORYOF(node, parts, source, lastIndex);
      }
    }
  });

  const newSource = parts.join(decorator);

  return {
    changed: lastIndex > 0,
    source: newSource,
    comments
  };
}

export { generateSourceWithDecorators };
