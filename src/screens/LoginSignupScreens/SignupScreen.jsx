import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { btn, colors } from "../../global/style"
// import { firebase } from '@react-native-firebase/firestore';
import { auth, googleProvider, db } from "../../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
// import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export const SignupScreen = ({ navigation }) => {

    const [emailfocus, setEmailFocus] = useState(false);
    const [passwordfocus, setPasswordFocus] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [userfocus, setUserFocus] = useState(false);
    const [phonefocus, setPhoneFocus] = useState(false);
    const [cpasswordfocus, setCpasswordFocus] = useState(false);
    const [showcpassword, setShowCpassword] = useState(false);

    // taking form data
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const [address, setAddress] = useState("")

    const [customError, setCustomError] = useState("")

    // const handleGoogleSignup = async () => {
    //     try {
    //         // const result = await signInWithPopup(auth, googleProvider);
    //         // // Handle the result here, for example, navigate to another screen after successful login
    //         // if(result)  navigation.navigate('welcome');
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
    //         await auth().signInWithCredential(googleCredential);
    //     } 
    //     catch (error) {
    //         console.error('Error signing in with Google:', error);
    //         // Handle error
    //     }
    // };

    const handleSignup = () => {
        // console.log("name", name);
        const FormData = {
            email: email,
            name: name,
            phone: phone,
            address: address,
            password: password
        }

        if (password != cpassword) setCustomError("Password Do Not Match")
        if (phone.length != 10) setCustomError("Invalid Phone Number")
        try {
            createUserWithEmailAndPassword(auth, email, password)
                .then((e) => {
                    if (e.user && e.user.uid) {
                        const userRef = addDoc(collection(db, "UserData"), {...FormData,uid:e.user.uid})
                        // console.log("User added succesfully", e.user.uid);
                        // setSuccess("user created");
                        navigation.navigate("home");
                    }
                    else{
                        console.log("Error in creating user");
                    }
                })
                .catch((error) => {
                    // alert("Error")
                    // console.log("Error", error.message);
                    const errorCode = error.code;
                    if (errorCode === 'auth/email-already-in-use') {
                        setCustomError('Email already in use');
                    } else if (errorCode === 'auth/invalid-email') {
                        setCustomError('Invalid email');
                    } else if (errorCode === 'auth/weak-password') {
                        setCustomError('Weak password');
                    } else {
                        console.error('Firebase Authentication Error:', errorCode, error.message);
                        setCustomError('Error creating user');
                    }
                })
        } catch (error) {
            alert("Error in firebase")
        }
    }

    const showToast = (customError) => {
        ToastAndroid.show(customError, ToastAndroid.SHORT);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Sign up</Text>
            {customError != "" && showToast(customError)}
            <View style={styles.inputbox}>
                <AntDesign name="user" size={24} color={userfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='User Name'
                    onChangeText={(e) => setName(e)}
                    onFocus={() => {
                        setUserFocus(true)
                        setEmailFocus(false)
                        setPhoneFocus(false)
                        setPasswordFocus(false)
                        setShowPassword(false)
                        setCpasswordFocus(false)
                        setShowCpassword(false)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
                <MaterialCommunityIcons name="email-outline" size={24} color={emailfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Email'
                    onChangeText={(e) => setEmail(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(true)
                        setPhoneFocus(false)
                        setPasswordFocus(false)
                        setShowPassword(false)
                        setCpasswordFocus(false)
                        setShowCpassword(false)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
                <Feather name="phone-call" size={24} color={phonefocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Phone Number'
                    onChangeText={(e) => setPhone(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(false)
                        setPhoneFocus(true)
                        setPasswordFocus(false)
                        setShowPassword(false)
                        setCpasswordFocus(false)
                        setShowCpassword(false)
                    }}
                ></TextInput>
            </View>

            <View style={styles.inputbox}>
                <Feather name="lock" size={24} color={passwordfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Password'
                    onChangeText={(e) => setPassword(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(false)
                        setPhoneFocus(false)
                        setPasswordFocus(true)
                        setCpasswordFocus(false)
                        setShowCpassword(false)
                    }}
                    secureTextEntry={showpassword == false ? true : false}
                ></TextInput>
                <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24}
                    onPress={() => {
                        setShowPassword(!showpassword)
                    }}></Octicons>
            </View>

            <View style={styles.inputbox}>
                <Feather name="lock" size={24} color={cpasswordfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Confirm Password'
                    onChangeText={(e) => setCpassword(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(false)
                        setPhoneFocus(false)
                        setPasswordFocus(false)
                        setCpasswordFocus(true)
                    }}
                    secureTextEntry={showcpassword == false ? true : false}
                ></TextInput>
                <Octicons name={showcpassword == false ? "eye-closed" : "eye"} size={24}
                    onPress={() => {
                        setShowCpassword(!showcpassword)
                    }}></Octicons>
            </View>

            <Text style={styles.address}>Please enter your address</Text>
            <View style={styles.inputbox}>
                <TextInput style={styles.input} placeholder='Enter your Address' onChangeText={(e) => setAddress(e)} />
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => handleSignup()}>
                <Text style={{ color: "white", fontSize: 18 }} >Register</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.googleBtn} >
                <Text style={{ color: "white", fontSize: 18 }} >Sign up with Google</Text>
            </TouchableOpacity> */}

            <Text style={{ color:colors.text1 }}>Already have an account?
                <Text style={{ color: "black"}} onPress={() => navigation.navigate('login')}> Login</Text>
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.col1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    head: {
        fontSize: 25,
        color: colors.text4,
        textAlign: "center",
        marginVertical: 40,
    },
    inputbox: {
        flexDirection: "row",
        width: "80%",
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: "80%",
    },
    btn: {
        fontSize: 20,
        color: "black",
        width: "80%",
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "200",
        backgroundColor: colors.text4,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    address: {
        fontSize: 18,
        color: colors.text2,
        textAlign: "center",
        marginTop: 30
    },
    googleBtn: {
        backgroundColor: "#DB4437",
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: "center",
        justifyContent: "center",
    },
})

export default SignupScreen
