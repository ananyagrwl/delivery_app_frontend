import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native'
import { useState } from 'react'
import { btn1, btn2, colors, hr80, incdecbtn, incdecinput, incdecout, navbtn, navbtnin, navbtnout, nonveg, veg } from '../global/style';
import { AntDesign } from '@expo/vector-icons';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase/FirebaseConfig';

export default function ProductPage({ navigation, route }) {  // jab b navigation se data bhejte h to route set krna padta h

    const data = route.params;
    if (route.params == undefined) {
        navigation.navigate("home")
    }
    // console.log(data);

    const [quantity, setQuantity] = useState("1");
    const [addOn, setAddOn] = useState("0");

    const addToCart = async () => {
        const docRef = doc(db, "UserCart", auth.currentUser.uid);
        try {
            const userCartRef = await getDoc(docRef);
            const data1 = { Addon: addOn, FoodQauntiy: quantity, data };

            if (userCartRef.exists()) {
                // await updateDoc(docRef, {cart:[data1]});
                const existingCart = userCartRef.data().cart || [];
                await updateDoc(docRef, { cart: [...existingCart, data1] });
                // console.log("existing user food added to cart");
                alert("Added to cart");
            }
            else {
                await setDoc(docRef, { cart: [data1] });
                // console.log("added to cart");
                alert("Added to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }

    const increaseQuantity = () => {
        setQuantity((parseInt(quantity) + 1).toString())
    }
    const decreaseQuantity = () => {
        if (parseInt(quantity) > 1) {
            setQuantity((parseInt(quantity) - 1).toString())
        }
    }
    const increaseAddonQuantity = () => {
        setAddOn((parseInt(addOn) + 1).toString())
    }
    const decreaseAddonQuantity = () => {
        if (parseInt(addOn) > 0) {
            setAddOn((parseInt(addOn) - 1).toString())
        }
    }

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

                    <View style={styles.container2}>
                        <Text style={styles.txt1}>Location</Text>
                        <Text style={styles.txt2}>{data.restaurantName}</Text>
                        <View style={styles.container2in}>
                            <Text style={styles.txt3}>{data.restrauntAddressBuilding}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.txt3}>{data.restrauntAddressStreet}</Text>
                            <View style={styles.dash}></View>
                            <Text style={styles.txt3}>{data.restrauntAddressCity}</Text>
                        </View>
                    </View>

                    {data.foodAddonPrice && <View style={styles.container3}>
                        <View style={hr80}></View>
                        <Text style={styles.txt3}>Add Extra </Text>
                        <View style={styles.c3in}>
                            <Text style={styles.text4}>{data.foodAddon}</Text>
                            <Text style={styles.text4}>₹{data.foodAddonPrice}/-</Text>
                        </View>
                        <View style={incdecout}>
                            <Text onPress={() => increaseAddonQuantity()} style={incdecbtn}>+</Text>
                            <TextInput value={addOn} style={incdecinput} />
                            <Text onPress={() => decreaseAddonQuantity()} style={incdecbtn}>-</Text>
                        </View>
                        {/* <View style={hr80}></View> */}

                    </View>}

                    <View style={styles.container3}>
                        <View style={hr80}></View>
                        <Text style={styles.txt3}>Food Quantity</Text>
                        <View style={incdecout}>
                            <Text onPress={() => increaseQuantity()} style={incdecbtn}>+</Text>
                            <TextInput value={quantity} style={incdecinput} />
                            <Text onPress={() => decreaseQuantity()} style={incdecbtn}>-</Text>
                        </View>
                        <View style={hr80}></View>
                    </View>

                </View>

                <View style={styles.container4}>
                    <View style={styles.c4in}>
                        <Text style={styles.txt2}>Total Price</Text>
                        {data.foodAddonPrice ?
                            <Text style={styles.txt6}>₹{
                                ((parseInt(data.foodPrice) * parseInt(quantity))
                                    + parseInt(addOn) * parseInt(data.foodAddonPrice)).toString()

                            }/-</Text>

                            :
                            <Text style={styles.txt6}>₹{
                                ((parseInt(data.foodPrice) * parseInt(quantity))).toString()
                            }/-</Text>
                        }
                    </View>

                    <View style={hr80}></View>
                </View>

                <View style={styles.btncont}>
                    <TouchableOpacity style={btn2} onPress={() => { addToCart() }}>
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
    container2: {
        width: '90%',
        backgroundColor: colors.col1,
        padding: 20,
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
        elevation: 10,
        alignItems: 'center',
    },
    txt1: {
        color: colors.text1,
        fontSize: 20,
        fontWeight: '200',

    },
    txt2: {
        color: colors.text3,
        fontSize: 30,
        fontWeight: '200',
        marginVertical: 10,

    },
    container2in: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txt3: {
        color: colors.text1,
        fontSize: 18,
    },
    dash: {
        width: 1,
        height: 20,
        backgroundColor: colors.text1,
        marginHorizontal: 10,
    },
    c3in: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    container3: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    text4: {
        color: colors.text3,
        fontSize: 20,
        marginHorizontal: 10,
    },
    container4:{
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
    },
    c4in: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    txt6:{
        color: colors.text1,
        fontSize: 35,
        textAlign:"center",
    }
})