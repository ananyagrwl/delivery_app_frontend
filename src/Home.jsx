import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase/FirebaseConfig';

const Home = () => {

    const [foodData, setFoodData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const foodCollectionRef = collection(db, 'FoodData');
            const Snapshot = await getDocs(foodCollectionRef);
    
            const foodDataList = [];
            Snapshot.forEach((doc) => {
              foodDataList.push({ id: doc.id, ...doc.data() });
            });
            console.log("list", foodDataList);
            setFoodData(foodDataList);
          } catch (error) {
            console.error('Error fetching food data: ', error);
          }
        };
        fetchData();
        
      }, [])

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})