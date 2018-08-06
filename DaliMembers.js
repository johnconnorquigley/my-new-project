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
import MemberProfile from './MemberProfile';

class ListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { url: 'http://mappy.dali.dartmouth.edu/' }
  }

  _onPress = () => {
    this.props.navigator.push({
      component: MemberProfile,
      passProps: {item: this.props.item}
    })
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{uri: this.state.url.concat(item.iconUrl)}}/>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text >{item.message}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class DaliMembers extends Component <{}> {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => {
    return (
      <ListItem
        navigator = {this.props.navigator}
        item = {item}
        index = {index}
        onPressItem={this._onPressItem}
      />
    );

  };

  componentDidMount(){
    return fetch('http://mappy.dali.dartmouth.edu/members.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  render() {

      const spinner = this.state.isLoading ? <ActivityIndicator size='large'/> : null;
      return (
        <View style={styles.container}>
          {spinner}
          <FlatList
            data={this.state.dataSource}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}/>
        </View>
      );
    }

}


const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
