import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { title, colors } from "../global/style";

const HomeHeadNav = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <EvilIcons name="navicon" size={24} color="black" style={styles.myicon} />
            <View style={styles.containerin}>
                <Text style={styles.mytext}>Foodie</Text>
                <MaterialCommunityIcons name="food-outline" size={24} color="black" style={styles.myicon} />
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("profile")}>
                <FontAwesome name="user-circle-o" size={24} color="black" style={styles.myicon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.col1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
        elevation: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    containerin: {
        flexDirection: "row",
        alignItems: "center"
    },
    myicon: {
        color: colors.text1
    },
    mytext: {
        color: colors.text1,
        fontSize: 24
    }
})

export default HomeHeadNav