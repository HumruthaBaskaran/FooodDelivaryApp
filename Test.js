import React from "react";
import { View, Button } from "react-native";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import Icon from 'react-native-vector-icons'
import {COLORS, icons} from './constants'



class Home extends React.Component{
    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'teal'}}>
                <Button title="Go to Details Screen" onPress={()=>this.props.navigation.navigate('routeTwo')}/>
            </View>
        )
    }
}
class Details extends React.Component{
    render(){
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'orange'}}>
                <Button title="Go to Home Screen" onPress={()=>this.props.navigation.navigate('routeOne')}/>
            </View>
        )
    }
}

// const MySwitchNavigator = createSwitchNavigator(
//       {
//       routeOne: Home,
//       routeTwo: Details,  
//       },
//       {
//         initialRouteName: 'routeTwo',
//       }
// );


// const MyNavigator = createSwitchNavigator(
//     {
//         x: Home,
//         y: Details
//     },
//     {
//         initialRouteName: 'x',
//     }
// );

// const Test = createAppContainer(MySwitchNavigator);
// export default Test;

export default function Test(){
    return(
        <View>
            <Text>HI</Text>
             <Icon name={icons.cutlery} color={'orange'} size={24} />
        </View>
    )
}