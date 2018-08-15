import React from "react";
import addons from "@storybook/addons";
import StoryPanel from "./StoryPanel";
import { ADDON_ID, PANEL_ID, PANEL_TITLE } from "./env";

export function register() {
  addons.register(ADDON_ID, api => {
    const channel = addons.getChannel();
    addons.addPanel(PANEL_ID, {
      title: PANEL_TITLE,
      render: () => <StoryPanel channel={channel} api={api} />
    });
  });
}
