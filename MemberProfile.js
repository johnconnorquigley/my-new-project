'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  Text,
} from 'react-native';

export default class MemberProfile extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.item.name,
      uri: 'http://mappy.dali.dartmouth.edu/' + this.props.item.iconUrl
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.uri}</Text>
      </View>
    );
  }

}


const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center'
  },

});
