const path = require("path");
const fs = require("fs");
const sortPackageJson = require("sort-package-json");
const SERCHED_FILE = "package.json";

const traverseForFile = (pathSearch, rootPath) => {
  const filePath = path.resolve(pathSearch, SERCHED_FILE);

  if (fs.existsSync(filePath)) {
    return filePath;
  } else if (pathSearch === rootPath) {
    return false;
  }

  return traverseForFile(path.resolve(pathSearch, ".."), rootPath);
};

const searchForFile = filePath => {
  const rootPath = path.parse(filePath).root;
  const file = traverseForFile(filePath, rootPath);

  if (file) {
    return sortPackageJson(fs.readFileSync(file, "utf8"));
  }
  return `{
  "error": "This story has no package.json"
}`;
};

export default searchForFile;
