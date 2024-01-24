import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { colors, title } from '../global/style';
import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/FirebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const Profile = ({ navigation }) => {

    const [userlogged, setUserLogged] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const checkLogin = onAuthStateChanged(auth, (user) => {
            if (user) {
                // console.log(user);
                setUserLogged(user);
                // console.log("user uid", user.uid);
            }
            else {
                navigation.navigate("login")
                setUserLogged(null);
            }
        });
        return checkLogin;
    }, [])

    // console.log("user logged uid", userlogged?.uid);

    useEffect(() => {
        const getUserData = async () => {
            // console.log("Inside getUserData");
            if (userlogged) {
                const docRef = collection(db, 'UserData');
                const userRef = query(docRef, where("uid", "==", userlogged.uid))
                const doc = await getDocs(userRef);
                // console.log("Collected ref in doc");
                if (!doc.empty) {
                    doc.forEach((doc => {
                        console.log("user data",doc.data());
                        setUserData(doc.data());
                    }))
                }
                else {
                    navigation.navigate("login");
                }
            }
            else{
                console.log("User not logged to get data");
            }
        };
        getUserData();
    }, [userlogged])

    // console.log("User Data", userData);

    return (
        <View style={styles.container}>
            <StatusBar />
            <View style={styles.head}>
                <TouchableOpacity style={styles.back}>
                    <Ionicons name="arrow-back" size={24} color={colors.text1} />
                </TouchableOpacity>
                <View style={styles.imgContainer}>
                    <Image source={require("../../assets/logo2.png")} style={styles.img}></Image>
                </View>
                <Text style={styles.name}>{userData.name}</Text>
                {/* <Text style={styles.name}>Ananya</Text> */}
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Text style={styles.itemHead}>Email</Text>
                    <Text style={styles.itemContent}>{userData.email}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemHead}>Address</Text>
                    <Text style={styles.itemContent}>{userData.address}</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.itemHead}>Phone Number</Text>
                    <Text style={styles.itemContent}>{userData.phone}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.col1,
        alignItems: "center",
        // padding: 40,
    },
    head: {
        padding: 40,
        display: 'flex',
        alignItems: "center",
    },
    back: {
        position: "absolute",
        width: "10%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: 40,
        left: 20,
        backgroundColor: colors.col1,
        borderRadius: 5,
        padding: 5,
    },
    imgContainer: {
        borderRadius: 10,
        marginBottom: 4,
        // backgroundColor: colors.col1,
        width: 110,
        height: 110,
    },
    img: {
        width: "100%",
        height: "100%",
        borderRadius: 50,
        backgroundColor: colors.col1,
        resizeMode: "contain"
    },
    name: {
        marginBottom: 10,
        display: "flex",
        backgroundColor: colors.col1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        fontSize: 25
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        padding: 50,
        margin: 0,
        width: "100%",
        // justifyContent:"space-between",
        alignItems: "center",
        borderRadius: 50,
        // backgroundColor:colors.text1,
        backgroundColor: "#f4c162",
        flex: 1
    },
    item: {
        // width: "45%",
        alignSelf: 'flex-start',
        marginBottom: 20,
        display: "flex",
        flexDirection: "column",
    },
    itemHead: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        fontSize: 20,
    },
    itemContent: {
        fontSize: 18,
    }


})

export default Profile;
