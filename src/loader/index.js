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

  return `
  var withPackageJson = require('storybook-addon-package-json');
  var __PACKAGE_JSON__ = ${packageJsonFileContent};
  
  ${result.source}
  `;
}

export default transform;
