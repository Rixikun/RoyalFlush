import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Header, Left, Button, Icon, Body, Right, Title, Fab} from 'native-base'
import * as Font from 'expo-font'

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
      initialPosition: {
        latitude: 0, 
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null
 
   componentDidMount(){
     Font.loadAsync({
      'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
    })
    this.setState({
      fontLoaded: true
    })

    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({initialPosition: initialRegion})
      this.setState({markerPosition: initialRegion})
    }, (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position)=> {
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      let lastRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount(){
    navigator.geolocation.clearWatch(this.watchID)
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
            {/* <Title>Find that restroom!!</Title> */}
          </Body>
          <Right>
            <Button transparent>
              <Icon name="power"/>
            </Button>
          </Right>

        </Header> 
        <MapView
         style={{flex: 1}} 
         region = {this.state.initialPosition}
         provider={MapView.PROVIDER_GOOGLE}
         customMapStyle={mapStyleColor}
        //  onRegionChangeComplete={(coordinate)=>this.recordEvent(coordinate)}
          >
            <MapView.Marker
              coordinate={this.state.initialPosition}
            >
              <View style={styles.radius}>
                <View style={styles.marker}/>
              </View>
            </MapView.Marker>

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
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(150,245,240,0.25)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,85,51,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 20,
    width: 20,
    borderWidth: 3,
    borderRadius: 20/2,
    borderColor: 'white',
    backgroundColor: '#007AFF'
  },
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
