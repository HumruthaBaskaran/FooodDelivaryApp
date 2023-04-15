import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from "react-native";
import { icons, COLORS, images, SIZES, FONTS,CustomeFonts } from "../constants";


export default function Order({route, navigation}){
    const [orderItems, setOrderItem] = React.useState([])
    const [restaurant, setRestaurant]=React.useState(null);
    React.useEffect(()=> {
        const {restaurant, orderItems} = route.params;
        setOrderItem(orderItems);
        setRestaurant(restaurant)
    }
    )
    function getGrandTotal(){
        let total = orderItems.reduce((a,b)=>a+b.total, 0)
        return total
    }
    
    function renderItem({item}){
        let [arr] = restaurant?.menu.filter(a=>a.menuId === item.menuId)
        return(
            <View style={{justifyContent:'center', paddingTop:20, flexDirection:'row', alignItems:'center'}}>
                <View style={{justifyContent:'center', alignItems:'center', width:(SIZES.width)/6}}>
                    <Image source={arr.photo} resizeMode='cover' style={{width:60, height:60,borderRadius:25}} />
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:(SIZES.width)/2,}}>
                    <Text style={{...FONTS.body3, fontSize: 18,position:'absolute', left:10}}>{arr.name}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:(SIZES.width)/7}}>
                    <Text style={{...FONTS.body3, fontSize: 18}}>{item.qty}</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', width:(SIZES.width)/6}}>
                    <Text style={{...FONTS.body3, fontSize: 18}}>${item.total}</Text>
                </View>
            </View>
        )
    }

    return(
        <View style={{flex:1, justifyContent:'space-between', alignItems:'center'}}>
            <View style={{width:SIZES.width, height:80, paddingTop:40, justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
                <Text style={{...FONTS.h1, color:COLORS.primary, fontStyle:'italic',fontWeight:'bold', paddingRight:10}}>Your Basker</Text>
                <Image source={icons.basket} resizeMode='contain' style={{width:30, height:30, tintColor:COLORS.primary}}/>
            </View>
            <View style={{flexDirection:'row', paddingTop:20}}>
                <View style={{justifyContent:'center', alignItems:'center', paddingLeft:(SIZES.width)/3}}>
                    <Text style={{...FONTS.h3}}>ITEM</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingLeft:80}}>
                    <Text style={{...FONTS.h3}}>QTY</Text>
                </View>
                <View style={{justifyContent:'center', alignItems:'center', paddingRight:5, paddingLeft:15}}>
                    <Text style={{...FONTS.h3}}>AMT</Text>
                </View>
            </View>
            <FlatList 
                data={orderItems}
                renderItem={renderItem}
                keyExtractor={item =>`${item.menuId}`}
            />
            <View style={{width:SIZES.width}}>
                <View style={{flexDirection:'row', paddingLeft:(SIZES.width)/2.5}}>
                    <Text style={{...FONTS.h3, }}>Total Amount</Text>
                    <Text style={{...FONTS.h3,paddingLeft: 20}}>${getGrandTotal()}</Text>
                </View>
            <TouchableOpacity style={{backgroundColor:COLORS.primary, width:SIZES.width*0.9, height:60, borderRadius:25, marginLeft:20,marginTop:20, marginBottom:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{...FONTS.body3, color:COLORS.white}}>Order</Text>
            </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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