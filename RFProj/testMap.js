import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from 'react-native-maps';

const apiURL = 'https://feeds.citibikenyc.com/stations/stations.json'


export default class testMap extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          markers: [],
        };
      }
    //   fetchMarkerData() {
    //     fetch('https://feeds.citibikenyc.com/stations/stations.json')
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    //         this.setState({ 
    //           isLoading: false,
    //           markers: responseJson.stationBeanList, 
    //         });
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    async fetchMarkerData(){
        try{
            const apiURL = 'https://feeds.citibikenyc.com/stations/stations.json'
            const res = await (await fetch(apiURL)).json()
            console.log(res)
            this.setState({
                isLoading: false,
                markers: res.stationBeanList
            })
        } catch (err) {
            console.log(err)
        }
    }
      componentDidMount() {
        this.fetchMarkerData();
    }
  render() {
    return (
        <MapView
        style={{ flex: 1 }}
        region={{
          latitude: 40.76727216,
          longitude: -73.99392888,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
            {/* {this.state.isLoading ? null : this.state.markers.map((marker, index) => {
                const coords = {
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                };
            
                const metadata = `Status: ${marker.statusValue}`;
            
                return (
                    <MapView.Marker
                        key={index}
                        coordinate={coords}
                        title={marker.stationName}
                        description={metadata}
                    />
                );
            })} */}
    </MapView>
    );
  }
}