import addons from "@storybook/addons";
import { EVENT_ID } from "./env";

function setPackageJson(context, packageJson) {
  const channel = addons.getChannel();

  channel.emit(EVENT_ID, {
    packageJson
  });
}

export function withPackageJson(packageJson) {
  return (story, context) => {
    setPackageJson(context, packageJson);
    return story();
  };
}
