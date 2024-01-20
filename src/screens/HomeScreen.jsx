import { View, Text, StatusBar, TextInput, StyleSheet, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeadNav from '../components/HomeHeadNav'
import Categories from '../components/Categories'
import OfferSlider from '../components/OfferSlider'
import { Ionicons } from '@expo/vector-icons';
import { title, colors } from "../global/style";
// import firestore from "@react-native-firebase/firestore"
import { db, storage } from "../Firebase/FirebaseConfig";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import CardSlider from '../components/CardSlider'

const HomeScreen = ({navigation}) => {

  const [foodData, setFoodData] = useState([]);
  // const foodRef = firebase.firestore().collection("FoodData");
  const [VegData, setVegData] = useState([]);
  const [NonVegData, setNonVegData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foodCollectionRef = await collection(db, 'FoodData');
        const Snapshot = await getDocs(foodCollectionRef);

        const foodDataList = [];
        Snapshot.forEach((doc) => {
          foodDataList.push({ id: doc.id, ...doc.data() });
        });
        // console.log("list", foodDataList);
        setFoodData(foodDataList);
      } catch (error) {
        console.error('Error fetching food data: ', error);
      }
    };
    fetchData();

    // foodRef.onSnapshot(snapshot=>{
    //   setFoodData(snapshot.docs.map(doc => doc.data()))
    // })
    
  }, [])

  useEffect(() => {
    setVegData(foodData.filter(item => item.foodType == "veg"));
    setNonVegData(foodData.filter(item => item.foodType == "non-veg"))
  }, [foodData])

  // console.log("food",foodData);
  // console.log("veg",VegData);
  // console.log("non veg", NonVegData);
  // console.log(search);

  return (
    <ScrollView style={styles.container}>
      <StatusBar />
      <HomeHeadNav navigation={navigation}/>
      <View style={styles.searchbox}>
        <Ionicons name="search" size={24} color="black" style={styles.searchicon} />
        <TextInput style={styles.input} placeholder="Search" onChangeText={(text) => { setSearch(text) }} />
      </View>
      {search != '' && <ScrollView style={styles.seacrhresultsouter}>
        <FlatList style={styles.searchresultsinner}   
          data={foodData} 
          renderItem={({ item }) => {
            if (item.foodName.toLowerCase().includes(search.toLowerCase())) {
              return (
                <View style={styles.searchresult}>
                  <Text style={styles.searchresulttext}>{item.foodName}</Text>
                </View>
              )
            }
          }
        } />
      </ScrollView>}
      <Categories />
      <OfferSlider />
      <CardSlider title={"Today's Special"} data={foodData} navigation={navigation}/>
      <CardSlider title={"Non Veg Love"} data={NonVegData} navigation={navigation}/>
      <CardSlider title={"Veg Hunger"} data={VegData} navigation={navigation}/>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.col1,
    width: "100%",
    // alignItems: "center"
  },
  searchbox: {
    flexDirection: "row",
    width: "90%",
    backgroundColor: colors.col1,
    borderRadius: 30,
    alignItems: "center",
    padding: 10,
    margin: 20,
    elevation: 10
  },
  input: {
    fontSize: 18,
    marginLeft: 10,
    width: "90%",
    color: colors.text1,
  },
  searchicon: {
    color: colors.text1
  },
  seacrhresultsouter: {
      width: '100%',
      marginHorizontal: 30,
      height: '30%',
      backgroundColor: colors.col1,
  },
  searchresultsinner: {
      width: '100%',
  },
  searchresult: {
      width: '100%',
      flexDirection: 'row',
      // alignItems: 'center',
      padding: 5,
  },
  searchresulttext: {
      marginLeft: 10,
      fontSize: 18,
      color: colors.text1,
  },
  bottomnav: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: colors.col1,
      zIndex: 20,
  }
})

export default HomeScreen