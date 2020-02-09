import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {Header, Left, Button, Icon, Body, Right, Title, Fab} from 'native-base'

import styles from '../styling/styles'
import spots from '../seed'

const {width, height} = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height

const coords = Object.keys(spots).map(spot=>{
    return spot.split(', ').map(coord => {
      return Number(coord)
    })
  })
  

export default class SpotInfo extends React.Component {

  render() {
      const test = Object.keys(spots).map(spot => {
          return (
            <Text key={spot}>    
                {'\n'}
                Place: {spots[spot].name} 
                {'\n'}
                Rating: {spots[spot].rating}
                {'\n'}
                {Object.keys(spots[spot].reviews).map(review => {
                    return(`\n ${review} \n ${spots[spot].reviews[review]} \n`)
                })}
            </Text>
          )
      })
      const displayCoord = coords.map(coord => {
          return(
              <Text key={coord}>
                  lat: {coord[0]} long: {coord[1]}
                  {'\n'}
              </Text>
          )
      })
    return (
      <View style={styles.container}>
          <Text>
              SpotInfo.js
                {'\n'}
                {displayCoord}
                {'\n'}
                {test}
          </Text>
      </View>
    );
  }
}
