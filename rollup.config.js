import multiEntry from "rollup-plugin-multi-entry";
import babel from "rollup-plugin-babel";

export default [
  {
    input: "src/index.js",
    output: {
      file: "dist/index.js",
      format: "cjs"
    }
  },
  {
    input: "src/manager.js",
    output: {
      file: "dist/manager.js",
      format: "cjs"
    },
    plugins: [
      babel({
        exclude: "node_modules/**"
      })
    ]
  },
  {
    input: "src/loader/index.js",
    output: {
      file: "dist/loader/index.js",
      format: "cjs"
    }
  }
];
