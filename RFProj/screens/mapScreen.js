import React from 'react';
import MapView from 'react-native-maps';
import { View, Dimensions } from 'react-native';
import {Header, Left, Button, Icon, Body, Right, Title, Fab} from 'native-base'

import styles from '../styling/styles'
import mapStyleColor from '../styling/mapStyle'
import spots from '../seed'

const {width, height} = Dimensions.get('window')
// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const coords = Object.keys(spots).map(spot=>{
  return spot.split(', ').map(coord => {
    return Number(coord)
  })
})

export default class MapScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      initialPosition: {
        latitude: 0, 
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      },
      currentPosition: {
        latitude: 0, 
        longitude: 0,
      }
    }
  }

  watchID: ?number = null
  // watchID = null
 
   componentDidMount(){

    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = parseFloat(position.coords.latitude)
      let long = parseFloat(position.coords.longitude)
      let initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      } 
      this.setState({currentPosition: {latitude: lat, longitude: long}})
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
  console.log(coordinate)
  this.setState({
    initialPosition: coordinate
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
         onRegionChangeComplete={(coordinate)=>this.recordEvent(coordinate)}
          >
            <MapView.Marker
              coordinate={this.state.currentPosition}
            >
              <View style={styles.radiusCurr}>
                <View style={styles.markerCurr}/>
              </View>
            </MapView.Marker>
            <MapView.Marker
              coordinate={this.state.initialPosition}
            >
              <View style={styles.radiusInit}>
                <View style={styles.markerInit}/>
              </View>
            </MapView.Marker>

          </MapView>
          {/* <Fab direction="left" position="bottomRight"
            style={{backgroundColor: 'green'}}>
              <Icon name="add"/>
          </Fab>
          <Fab direction="right" position="bottomLeft"
            style={{backgroundColor: 'red'}}>
              <Icon name="remove"/>
          </Fab> */}
      </View>
    );
  }
}