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

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

export default class MemberProfile extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.name,
      uri: 'http://mappy.dali.dartmouth.edu/' + this.props.item.iconUrl,
      message: this.props.item.message,
      termsOn: this.props.item.terms_on,
      project: this.props.item.project,
      region: {
        latitude: this.props.item.lat_long[0],
        longitude: this.props.item.lat_long[1],
        latitudeDelta: 40,
        longitudeDelta: 40,
      },
    }

  }


  render() {
    return (
       <View>
         <MapView
          region={this.state.region}
          style = {styles.map}
          showsUserLocation = {false}
          followUserLocation = {false}
          zoomEnabled = {true}
          >

            <Marker
              coordinate={{latitude: this.state.region.latitude,
              longitude: this.state.region.longitude}}>
              <Image
                source={{uri: this.state.uri}}
                style={styles.imageMarker}
              />
            </Marker>
        </MapView>
        <Text>{this.state.uri}</Text>
        <Text>{this.state.message}</Text>
        <Text>{this.state.termsOn.toString()}</Text>
        <Text>{this.state.project.toString()}</Text>
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
  map: {
      height: 400,
      marginTop: 80
   },
   imageMarker: {
     width: 40,
     height: 40,
     borderRadius: 20
   }
});
