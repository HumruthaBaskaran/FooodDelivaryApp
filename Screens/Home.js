import React from "react";
import { View, Text, FlatList,Button, StyleSheet, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { icons, COLORS, images, SIZES, FONTS, } from "../constants";
import { initialCurrentLocation, categoryData, affordable, fairPrice, expensive, restaurantData } from "./Data";




const Home =({route, navigation})=>{
       
    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)
    const [orderItems , setOrderItem] = React.useState([]);
    const [restaurant, setRestaurant]=React.useState(null);
    const [orderItemCount , setOrderItemCount] = React.useState(0);

    React.useEffect(() => {
        if(route.params?.orderItems>0)
        {const { orderItemCount, orderItems, restaurant } = route.params;
        setRestaurant(restaurant);
        setOrderItemCount(orderItemCount)
        setOrderItem(orderItems)
    }
    })
    


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

    function renderHeader(){
        return(
            <View style={{flexDirection:'row',height:50}}>
                <TouchableOpacity style={{width:50, paddingLeft:SIZES.padding*2, justifyContent:'center'}}>
                    <Image source={icons.nearby} resizeMode='contain' style={{width:30, height:30}}/>
                </TouchableOpacity>
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View style={{width:'70%',height:'100%',backgroundColor:COLORS.lightGray3, alignItems:'center',justifyContent:'center',borderRadius:SIZES.radius}}>
                        <Text style={{...FONTS.h3}}>{initialCurrentLocation.streetName}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{width:50, paddingRight:SIZES.padding*2, justifyContent:'center', alignItems:'center'}}
                    onPress={()=> navigation.navigate({
                        name: 'Order',
                        params: {restaurant, orderItems}
                      })}
                >
                    <View style={{position:'absolute', top:0, right:10}}>
                        <Text style={{...FONTS.h4, fontSize:12}}>{route.params?.orderItems}</Text>
                    </View>
                    <Image source={icons.basket} resizeMode='contain' style={{width:30, height:30}}/>
                </TouchableOpacity>

            </View>
        )
    }
    
    function renderMainCategories(){
        const renderItem=({item})=>{
                const BackgroundColor= (item.id === selectedCategory?.id)? COLORS.primary : COLORS.white
                const Textcolor= (item.id === selectedCategory?.id)? COLORS.white : COLORS.black
                return(
                <TouchableOpacity
                    style=
                    {{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding,
                        justifyContent:'center',
                        alignItems:'center',
                        borderRadius:SIZES.radius,
                        backgroundColor: BackgroundColor,
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={()=> onSelectCategory(item)}
                >
                    <View
                        style={{
                            backgroundColor:COLORS.white,
                            borderRadius:25,
                            width:50,
                            height:50,
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                    <Image source={item.icon} resizeMode='contain' style={{width:30, height:30}}/>
                    </View>
                    <Text style={{marginTop:SIZES.padding, color:Textcolor, ...FONTS.body5}}>{item.name}</Text>
                </TouchableOpacity>
            )
            }
        return(
            <View style={{padding: SIZES.padding*2}}>
                <Text style={{...FONTS.h1}}>Main</Text>
                <Text style={{...FONTS.h1}}>categories</Text>
                <FlatList
                    data={categories}
                    renderItem={renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    // extraData={selectedCategory}
                    contentContainerStyle={{paddingVertical: SIZES.padding * 2}}
                />
            </View>
        )
    }
    
    
    function renderRestaurantList(){
        const renderItem = ({item}) =>{
        return(
            <TouchableOpacity 
            style={{marginBottom:SIZES.padding*2}}
            onPress={() => navigation.navigate('Restaurant', {
                item,
                currentLocation
            })}
            >
                <View style={{marginBottom:SIZES.padding}}>
                    <Image source={item.photo} resizeMode='cover' style={{width: "100%", height: 200, borderRadius:SIZES.radius,}}/>
                    <View style={{justifyContent:'center', alignItems:'center',backgroundColor:COLORS.white,borderTopRightRadius:SIZES.radius,
                    borderBottomLeftRadius:SIZES.radius, position:'absolute', bottom:0, width:SIZES.width*0.4, height:55,...styles.shadow
                }}>
                        <Text style={{...FONTS.h4, fontSize:16}}>{item.duration}</Text>
                    </View>
                </View>
                <Text style={{...FONTS.body2}}>{item.name}</Text>
                <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginTop:SIZES.padding, padding:5,}}>
                    <Image source={icons.star} resizeMode='contain' style={{width: 20, height: 20, tintColor:COLORS.primary, marginRight:10}}/>
                    <Text style={{...FONTS.h4,fontSize:16,}}>{item.rating}</Text>
                    <View style={{flexDirection:'row', marginLeft:10}}>
                        {item.categories.map((categoryId)=>{
                            return(
                                <View 
                                    style={{flexDirection:'row',}}
                                    key={categoryId}
                                >
                                    <Text style={{...FONTS.body3, marginRight:5}}>{getCategoryNameById(categoryId)}</Text>
                                    <Text style={{...FONTS.h3, color:COLORS.darkgray, marginRight:5}}>.</Text>
                                </View>
                            )
                        })}
                         {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
        return(
                <FlatList
                    data={restaurants}
                    renderItem={renderItem}
                    keyExtractor={item => `${item.id}`}
                    contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30,
                }}
                />
        )
    }
    return(
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

export default Home;

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