import addons from "@storybook/addons";
import { EVENT_ID } from "./env";

function setPackageJson(context, packageJson) {
  const channel = addons.getChannel();

  channel.emit(EVENT_ID, {
    packageJson
  });
}

let storyName = "";

export function withPackageJson(packageJson) {
  return (story, context) => {
    const newStoryName = context.kind + context.story;

    if (newStoryName === storyName) {
      return story();
    }

    storyName = newStoryName;

    const sourceJson = JSON.stringify(packageJson, null, 2)
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
    setPackageJson(context, sourceJson);
    return story();
  };
}
