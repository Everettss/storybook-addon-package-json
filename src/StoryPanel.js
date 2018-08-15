import React, { Component } from "react";
import PropTypes from "prop-types";
import json from "react-syntax-highlighter/languages/prism/json";
import { darcula } from "react-syntax-highlighter/styles/prism";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/prism-light";
import { EVENT_ID } from "./env";

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
    return (
      <SyntaxHighlighter
        language="json"
        style={darcula}
        customStyle={{ width: "100%" }}
      >
        {this.state.packageJson}
      </SyntaxHighlighter>
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
