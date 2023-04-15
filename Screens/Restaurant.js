import React from "react";
import { icons, COLORS, images, SIZES, FONTS,CustomeFonts } from "../constants";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity,Image, Animated } from "react-native";
import { CommonActions } from '@react-navigation/native';
import { initialCurrentLocation, categoryData, affordable, fairPrice, expensive, restaurantData } from "./Data";


const Restaurant =({route, navigation})=>{

  const scrollX = new Animated.Value(0);
  let [count, setCount] = React.useState(0);
  const [restaurant, setRestaurant]=React.useState(null);
  const [orderItems , setOrderItem] = React.useState([]);
  React.useEffect(() => {
    let { item, currentLocation } = route.params;

    setRestaurant(item)
    // setCurrentLocation(currentLocation)
})

function editOrder(action, menuId, price){
      let orderList = orderItems.slice() 
      let item = orderList.filter(a => a.menuId === menuId);

      if(action === '+'){
        if(item.length >0){
          const newQty = item[0].qty+1;
          item[0].qty = newQty;
          item[0].total = item[0].qty*price;
        }else {
          const newItem = {
            menuId: menuId,
            qty: 1,
            price: price,
            total: price
          }
          orderList.push(newItem);
        }
      }
      else{
        if(item.length>0){
          if(item[0].qty>0){
          const newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = item[0].qty * price;
          }
        }
      }
      setOrderItem(orderList);
}

function getOrderInfo(menuId){
    let item = orderItems.filter(a => a.menuId === menuId);
    if(item.length>0){
      return item[0].qty;
    }
    return 0
}

function getBasketItemCount(){
  let itemCount= orderItems.reduce((a,b)=>b.qty>0?a+b.qty:a,0)
  return itemCount
}

function sumOrder(){
  let sum = orderItems.reduce((a,b)=>b.total>0?a+b.total:a,0);
  return sum.toFixed(2);
}



  function renderHeader(){
    return(
      <View style={{flexDirection:'row',paddingTop:40, paddingBottom:20}}>
        <TouchableOpacity style={{paddingLeft:SIZES.padding, width:50, justifyContent:'center'}}
        onPress={() => {
          // Pass and merge params back to home screen
          navigation.navigate({
            name: 'Home',
            params: { orderItemCount: getBasketItemCount(), orderItems, restaurant},
            merge: true,
          });
        }}>
          <Image source={icons.back} resizeMode='contain' style={{width:25, height:30}}/>
        </TouchableOpacity>
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <View
          style={{backgroundColor:COLORS.lightGray3, height:50, paddingHorizontal:SIZES.padding*3, justifyContent:'center', alignItems:'center',
          borderRadius:SIZES.radius
        }}        
        >
          <Text style={{...FONTS.h4,textAlign:'center', fontSize:16}}>{restaurant?.name}</Text>
        </View>
        </View>
        <TouchableOpacity style={{paddingLeft:SIZES.padding,paddingRight:SIZES.padding, width:50, justifyContent:'center'}}>
          <Image source={icons.list} resizeMode='contain' style={{width:30, height:30}}/>
        </TouchableOpacity>

      </View>
    )
  }


  function renderBody(){
    return(
      <Animated.ScrollView
      horizontal
      pagingEnabled
      scrollEventThrottle={16}
      snapToAlignment='start'
      snapToInterval={SIZES.width}
      showsHorizontalScrollIndicator={false}
      onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
      ], { useNativeDriver: false })}
      >
      {
      restaurant?.menu.map((item, index)=>(
      <View key={`menu-${index}`} style={{justifyContent:'flex-start', alignItems:'center', width:SIZES.width, 
      height:SIZES.height,paddingLeft:5, paddingRight:5, paddingTop:10}}>
        <View style={{justifyContent:'center', height:SIZES.height*0.35,}}>
          <Image source={item.photo} resizeMode='contain' style={{width:260, height:260, borderRadius:130}}/>
          <View style={{justifyContent:'center', alignItems:'center',backgroundColor:COLORS.white,borderRadius:SIZES.radius,
                    position:'absolute', bottom:-20,left:50, width:SIZES.width*0.4, height:55,...styles.shadow, flexDirection:'row'
                }}>
              <TouchableOpacity style={{justifyContent:'center', alignItems:'center',position:'absolute', left:20 , flex:1,height:55, width:20 }}
               onPress={()=>editOrder("-", item.menuId, item.price)}
              >
              <Text style={{...FONTS.body1, color:getOrderInfo(item.menuId)? COLORS.black: COLORS.darkgray}}>-</Text>
              </TouchableOpacity>
              <Text style={{...FONTS.h2, padding:5}}>{getOrderInfo(item.menuId)}</Text>
              <TouchableOpacity  style={{justifyContent:'center', alignItems:'center',position:'absolute', right:20, height:55, width:20 }} 
              onPress={()=>editOrder("+", item.menuId, item.price)}
              >
              <Text style={{...FONTS.body1,}}>+</Text>
              </TouchableOpacity>
          </View>
        </View>
        <Text style={{...FONTS.h2, textAlign:'center', paddingTop:20}}>{item.name} - ${item.price.toFixed(2)}</Text>
        <Text style={{...FONTS.body3, textAlign:'center', paddingBottom:SIZES.padding}}>{item.description}</Text>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
          <Image source={icons.fire} resizeMode='contain' style={{width:20, height:20}}/>
          <Text style={{...FONTS.body3, color:COLORS.darkgray, paddingLeft:SIZES.padding, paddingRight:SIZES.padding}}>{item.calories} cal</Text>
        </View>
      </View>
    ))}
    </Animated.ScrollView>
    )
  }
  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
        <View style={{ height: 10 }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {restaurant?.menu.map((item, index) => {

                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1, 0.3],
                        extrapolate: "clamp"
                    })

                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
                        extrapolate: "clamp"
                    })

                    const dotColor = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                        extrapolate: "clamp"
                    })

                    return (
                        <Animated.View
                            key={`dot-${index}`}
                            opacity={opacity}
                            style={{
                                borderRadius: SIZES.radius,
                                marginHorizontal: 6,
                                width: dotSize,
                                height: dotSize,
                                backgroundColor: dotColor
                            }}
                        />
                    )
                })}
            </View>
        </View>
    )
}

function renderOrder(){
  return(
    <View>
      { renderDots() }
        <View style={{paddingLeft:20,paddingRight:20, width:SIZES.width,height:70,borderTopLeftRadius:40, borderTopRightRadius:40, flexDirection:'row', justifyContent:'space-between',alignItems:'center'}}>
          <Text style={{...FONTS.h4, justifyContent:'flex-start'}}>{getBasketItemCount()} Items in Cart</Text>
          <Text style={{...FONTS.h4, justifyContent:'flex-end'}}>${sumOrder()}</Text>
        </View>
        <TouchableOpacity style={{backgroundColor:COLORS.primary, width:SIZES.width*0.9, height:60, borderRadius:25, marginLeft:20, marginBottom:20, justifyContent:'center', alignItems:'center'}}
          onPress={()=> navigation.navigate({
            name: 'Order',
            params: {restaurant, orderItems}
          })}
        >
          <Text style={{...FONTS.body3, color:COLORS.white}}>Order</Text>
        </TouchableOpacity>
    </View>
  )
}


  return(
  <View style={styles.container}>
    {renderHeader()}
    {renderBody()}
    {renderOrder()}
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

export default Restaurant;