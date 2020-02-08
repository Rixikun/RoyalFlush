import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Header, Left, Button, Icon, Body, Right, Title, Fab} from 'native-base'
import * as Font from 'expo-font'


export default class App extends React.Component {
  state = {
    fontLoaded: false,
    location: {
      latitude: 	40.730610, 
      longitude: -73.935242,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    }
  }
  async componentDidMount(){
    await Font.loadAsync({
      'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
    })
    this.setState({
      fontLoaded: true
    })
  }
recordEvent = (coordinate) =>{
  this.setState({
    location: coordinate
  })
}

  render() {
    return (
      <View style={{flex: 1}}>
       <Header>
          <Left>

          </Left>
          <Body>
            <Title>Find that restroom!</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="power"/>
            </Button>
          </Right>

        </Header> 
        <MapView
         style={{flex: 1}} 
         initialRegion = {this.state.location}
         provider={MapView.PROVIDER_GOOGLE}
         customMapStyle={mapStyleColor}
         onRegionChangeComplete={(coordinate)=>this.recordEvent(coordinate)}
          >
          </MapView>
          <Fab direction="left" position="bottomRight"
            style={{backgroundColor: 'green'}}>
              <Icon name="add"/>
          </Fab>
          <Fab direction="right" position="bottomLeft"
            style={{backgroundColor: 'red'}}>
              <Icon name="remove"/>
          </Fab>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

const mapStyleColor = [
  {
      "featureType": "all",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "lightness": "-100"
          },
          {
              "color": "#ffdac9"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "color": "#ffcab1"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#ffcab1"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": 100
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "lightness": 700
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#92e1dd"
          }
      ]
  }
]
