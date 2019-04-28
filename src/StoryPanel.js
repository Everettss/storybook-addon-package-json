import React, { Component } from "react";
import PropTypes from "prop-types";
import json from "react-syntax-highlighter/languages/prism/json";
import { registerLanguage } from "react-syntax-highlighter/prism-light";
import { EVENT_ID } from "./env";

import { styled } from "@storybook/theming";
import { SyntaxHighlighter } from "@storybook/components";

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)(({ theme }) => ({
  fontSize: theme.typography.size.s2 - 1
}));

registerLanguage("json", json);

export default class StoryPanel extends Component {
  constructor(props) {
    super(props);

    this.state = { packageJson: "" };

    const { channel } = props;

    channel.on(EVENT_ID, ({ packageJson }) => {
      this.setState({
        packageJson
      });
    });
  }

  render() {
    const { active } = this.props;

    if (!active) return null;
    return (
      <StyledSyntaxHighlighter language="json" padded>
        {this.state.packageJson}
      </StyledSyntaxHighlighter>
    );
  }
}

StoryPanel.propTypes = {
  api: PropTypes.shape({
    selectStory: PropTypes.func.isRequired
  }).isRequired,
  channel: PropTypes.shape({
    emit: PropTypes.func,
    on: PropTypes.func,
    removeListener: PropTypes.func
  }).isRequired
};
