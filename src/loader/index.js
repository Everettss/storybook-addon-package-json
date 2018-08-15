import injectDecorator from "./inject-decorator";
import getPackageJson from "./get-package-json";

const ADD_DECORATOR_STATEMENT =
  ".addDecorator(withPackageJson(__PACKAGE_JSON__))";

function transform(source) {
  const result = injectDecorator(source, ADD_DECORATOR_STATEMENT);

  if (!result.changed) {
    return source;
  }

  const packageJsonFileContent = getPackageJson(this.resourcePath);
  const sourceJson = JSON.stringify(packageJsonFileContent)
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");

  return `
  var withPackageJson = require('storybook-addon-package-json').withPackageJson;
  var __PACKAGE_JSON__ = ${sourceJson};
  
  ${result.source}
  `;
}

export default transform;
