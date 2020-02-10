import React from 'react';
import * as Font from 'expo-font'

import MapScreen from './screens/mapScreen'
import SpotInfo from './screens/spotInfo';
import TestMap from './testMap'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fontLoaded: false,
    }
  }
  componentDidMount(){
    Font.loadAsync({
     'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
   })
   this.setState({
     fontLoaded: true
   })
  }
  render(){
    return(
      // <TestMap></TestMap>
      <MapScreen></MapScreen>
      // <SpotInfo></SpotInfo>
    )
  }
}
