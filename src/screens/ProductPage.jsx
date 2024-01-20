import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { btn1, btn2, colors, hr80, navbtn, navbtnin, navbtnout, nonveg, veg } from '../global/style';
import { AntDesign } from '@expo/vector-icons';

export default function ProductPage({ navigation, route }) {  // jab b navigation se data bhejte h to route set krna padta h

    const data = route.params;
    if (route.params == undefined) {
        navigation.navigate("home")
    }
    // console.log(data);

    return (
        <ScrollView style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate('home')} style={navbtnout}>
                <View style={navbtn}>
                    <AntDesign name="back" size={24} color="black" style={navbtnin} />
                </View>
            </TouchableOpacity>

                <View style={styles.container1}>
                    <View style={styles.s1}>
                        <Image source={{
                            uri: data.foodImageUrl
                        }} style={styles.cardimgin} />
                    </View>
                    <View style={styles.s2}>
                        <View style={styles.s2in}>
                            <Text style={styles.head1}>{data.foodName}</Text>
                            <Text style={styles.head2}>₹{data.foodPrice}/-</Text>
                        </View>
                        <View style={styles.s3}>
                            <Text style={styles.head3}>About Food</Text>
                            <Text style={styles.head4}>{data.foodDescription}</Text>
                            <View style={styles.s3in}>
                                {data.foodType == 'veg' ? <Text style={veg}></Text> : <Text style={nonveg}></Text>}
                                <Text style={styles.head5}>{data.foodType}</Text>
                            </View>
                        </View>
                    </View>
                    
                    <View style={styles.btncont}>
                        <TouchableOpacity style={btn2} onPress={() => { addTocart() }}>
                            <Text style={styles.btntxt}>Add to Cart</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={btn2}>
                            <Text style={styles.btntxt} onPress={() => navigation.navigate('placeorder', { cartdata })}>Buy Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        width: '100%',

    },
    container1: {
        // position: 'absolute',
        // top: 0,
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    s1: {
        width: '100%',
        height: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardimgin: {
        width: '100%',
        height: '100%',
    },
    s2: {
        width: '100%',
        padding: 20,
        position: 'relative',
        top: -30,
        backgroundColor: colors.col1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    s2in: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    head1: {
        fontSize: 30,
        fontWeight: '500',
        color: colors.text1,
        width: 220,
        marginRight: 10,
    },
    head2: {
        fontSize: 50,
        fontWeight: '200',
        color: colors.text3,
    },
    s3: {
        backgroundColor: colors.text1,
        padding: 20,
        borderRadius: 20,
    },
    head3: {
        fontSize: 30,
        fontWeight: '200',
        color: colors.col1,
    },
    head4: {
        marginVertical: 10,
        fontSize: 20,
        fontWeight: '400',
        color: colors.col1,
    },
    s3in: {
        backgroundColor: colors.col1,
        padding: 10,
        borderRadius: 10,
        width: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    head5: {
        color: colors.text3,
        fontSize: 20,
        fontWeight: '200',
        marginLeft: 10,
    },
    btntxt: {
        backgroundColor: colors.text1,
        color: colors.col1,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        textAlign: 'center',

    },
    btncont: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        flexDirection: 'row',
    },
})