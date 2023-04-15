// import Test from './Test';
// export default Test;

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Screens/Home';
import Restaurant from './Screens/Restaurant';
import { NavigationContainer } from '@react-navigation/native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Tabs from './navigations/tabs';
// import {COLORS, icons, CustomeFonts} from './constants'
import * as Font from 'expo-font';
import Order from './Screens/Order';



const Stack = createNativeStackNavigator();
  const customFonts ={
      'Roboto-Regular':require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
      'Roboto-Bold':require('./assets/fonts/Roboto-Bold.ttf'),
  }




export default class App extends React.Component{
  state = {
    fontsLoaded: false,
  };
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }
    render()
     { 
      if (!this.state.fontsLoaded) {
        return(<View style={styles.container}><Text>Not loaded</Text></View>)}
      return(
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={
            {headerShown:false}
          }
        >
          <Stack.Screen name="Root" component={Tabs}/>
          <Stack.Screen name='Restaurant' component={Restaurant}/>
          <Stack.Screen name='Order' component={Order}/>
        </Stack.Navigator>
        </NavigationContainer>
      )}
    
}

// export default class App extends React.Component{
//   render(){
//     return(
//       <View style={styles.container}>
//         <Text>Hi There</Text>
//             <Image source={icons.cutlery} resizeMode='contain' style={{width:50, height:50}}/>

//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});