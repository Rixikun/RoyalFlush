import { StyleSheet, Dimensions } from 'react-native';



const styles = StyleSheet.create({
    markerSize: {
      flex: 1,
      width: 30,
      height: 30,
      resizeMode: 'contain'
    },
    radiusCurr: {
      height: 40,
      width: 40,
      borderRadius: 40/2,
      overflow: 'hidden',
      backgroundColor: 'rgba(150,245,240,0.25)',
      borderWidth: 1,
      borderColor: 'rgba(0,122,255,0.25)',
      alignItems: 'center',
      justifyContent: 'center'
    },
    radiusInit: {
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
    markerCurr: {
      height: 15,
      width: 15,
      borderWidth: 2,
      borderRadius: 20/2,
      borderColor: 'white',
      backgroundColor: '#007AFF'
    },
    markerInit: {
      height: 20,
      width: 20,
      borderWidth: 3,
      borderRadius: 20/2,
      borderColor: 'white',
      backgroundColor: '#FF7B39'
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
  
  
export default styles