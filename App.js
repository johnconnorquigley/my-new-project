'use strict';
import React, {Component} from 'react';
import { StyleSheet, Text, View, NavigatorIOS } from 'react-native';

import DaliMembers from './DaliMembers';

export default class App extends Component<{}> {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Dali Member Dashboard',
          component: DaliMembers,
        }}/>
    );
  }
}
const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 100,
  },
  container: {
  flex: 1,
},
});
