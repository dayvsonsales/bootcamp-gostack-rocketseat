import React, { Component } from 'react';

import { WebView } from 'react-native-webview';

export default class Repository extends Component {
  render() {
    const { route } = this.props;
    const html_url = route.params;

    return <WebView source={{ uri: html_url }} style={{ flex: 1 }} />;
  }
}
