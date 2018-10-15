'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  Linking,
  Button
} from 'react-native';

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

export default class MemberProfile extends Component<{}> {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.item.name,
      uri: 'http://mappy.dali.dartmouth.edu/' + this.props.item.iconUrl,
      url: this.props.item.url.includes('//') ? 'https:' + this.props.item.url: 'http://mappy.dali.dartmouth.edu/' + this.props.item.url,
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

  getAddress = () => {
    console.log("BEEANSNASNSD");
    Geocoder.init('AIzaSyAqZXuOwzTDwz-BLkLb4jrnKXB2Eyd-Pqc');

    Geocoder.from(this.state.region.latitude, this.state.region.longitude)
        .then(json => {
        	var addressComponent = json.results[0].address_components[0];
            console.log(addressComponent);
        })
        .catch(error => console.warn(error));
  }

  render() {

    this.getAddress();

    return (
       <ScrollView>
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
        <View style={styles.container}>
          <Text style={styles.name}>{this.state.name}</Text>
          <Text style={styles.description}>{this.state.message}</Text>
          <Text style={styles.description}>Unknown</Text>
          <Text style={styles.header}>Terms On:</Text>
          <Text style={styles.description}>{this.state.termsOn.toString()}</Text>
          <Text style={styles.header}>{this.state.project.length > 1 ? "Projects:" : "Project:"}</Text>
          <Text style={styles.description}>{this.state.project.toString()}</Text>
          <Text style={styles.header}>Personal Link:</Text>
          <Button title={this.state.url} style={styles.link} onPress={() => Linking.openURL(this.state.url)}></Button>


        </View>
      </ScrollView>
    );
  }

}
const styles = StyleSheet.create({
  description: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  link: {
    margin: 10,
    fontSize: 18,
    textAlign: 'center',
    color: '#48BBEC',
    textDecorationLine: 'underline',
  },
  container: {
    padding: 10,
    alignItems: 'center'
  },
  map: {
      height: 300,
      marginTop: 0
   },
   imageMarker: {
     width: 40,
     height: 40,
     borderRadius: 20
   },
   name: {
     fontSize: 30,
     fontWeight: 'bold',
     color: '#48BBEC'
   },
   header: {
     fontSize: 20,
     fontWeight: 'bold',
   }
});
