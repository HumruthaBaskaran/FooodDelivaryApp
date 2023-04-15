import React from "react";
import { View, Image, TouchableOpacity,StyleSheet} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {COLORS, icons} from '../constants'
import { NavigationContainer } from '@react-navigation/native';
import Home from '../Screens/Home';
import Svg, {Path} from 'react-native-svg';
import Restaurant from "../Screens/Restaurant";

const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation, children }) {
    return (
      <View style={{ flexDirection: 'row',justifyContent:"center",alignItems:"center", position:'absolute', bottom:0}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          let iconName;
          if(route.name === 'Home'){
              iconName = icons.cutlery
          }
          else if(route.name === 'Search'){
              iconName = icons.search
          }
          else if(route.name === 'Like'){
              iconName = icons.like
          }
          else if(route.name === 'User'){
              iconName = icons.user
          }
        if(isFocused){
          return (
            <View style={{ flex: 1,alignItems: "center",justifyContent:'center'}}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: 0,}}>
                <View style={{ flex: 1, backgroundColor: COLORS.white}}></View>
                <Svg
                    width={75}
                    height={61}
                    viewBox="0 0 75 61"
                >
                    <Path
                        d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                        fill={COLORS.white}
                    />
                </Svg>
                <View style={{flex: 1,backgroundColor: COLORS.white}}></View>
            </View>

            <TouchableOpacity
                style={{
                    bottom:22.5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    // borderWidth:1,
                    // borderColor:COLORS.primary,
                    backgroundColor: COLORS.white,
                    ...styles.shadow
                }}
                onPress={onPress}
            >
                <Image source={iconName} resizeMode='contain' style={{width: 25, height: 25, tintColor:COLORS.primary}}/>
            </TouchableOpacity>
        </View>
          );
        }
        else{
            return (
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    activeOpacity={1}
                    onPress={onPress}
                >
                     <Image source={iconName} resizeMode='contain' style={{width: 25, height: 25, tintColor: COLORS.secondary}}/>
                </TouchableOpacity>
            )
        }})}
      </View>
    );
  }

const Tabs = ()=>{
    return (
        <Tab.Navigator
        tabBar={props=><MyTabBar {...props} />}
        screenOptions={({route})=>({
            headerShown:false,
            tabBarShowLabel: false,
            tabBarStyle: { 
                height:60,
                backgroundColor:'transparent',
                borderTopWidth: 0,
                position: 'absolute',
                elevation: 0
            },
            headerStyle: {
                backgroundColor:'transparent',
                elevation: 0
            },
        })}
        >
          <Tab.Screen 
            name="Home" 
            component={Home}
            />
            <Tab.Screen 
            name="Search" 
            component={Home}
            />
            <Tab.Screen 
            name="Like" 
            component={Home}
            />
            <Tab.Screen 
            name="User" 
            component={Home}
            />
        </Tab.Navigator>
    )
}

export default Tabs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingTop:35
  },
  shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 1,
  }
});


