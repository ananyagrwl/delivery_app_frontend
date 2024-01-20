import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import login from "../../../assets/login.jpg"
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { auth, db } from "../../Firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { colors } from '../../global/style';

export const LoginScreen = ({navigation}) => {

    const [emailfocus, setEmailFocus]=useState(false);
    const [passwordfocus, setPasswordFocus]=useState(false);
    const [showpassword, setShowPassword]=useState(false);

    // take form data
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [customError, setCustomError] = useState("")

    const handlelogin = ()=>{
        signInWithEmailAndPassword(auth, email, password)
        .then((e)=>{
            // alert("Logged in successfully");
            // console.log(e);
            navigation.navigate("home");
        })
        .catch((error)=>{
            // alert("Wrong credentials");
            // console.log("email",error.message);
            if(error.message == "Firebase: Error (auth/invalid-credential)."){
                setCustomError("Email Address not found")
            }
            else{
                setCustomError("Incorrect Email or Password")
            }
        })
    }

    const showToast = (customError) => {
        ToastAndroid.show(customError, ToastAndroid.SHORT);
    };

    //  IMPORTANT
    // To check the user exists or not or to get logged in users info, onAuthStateChanged
    // Logout : signOut()


    return (
        <View style={styles.container}>
            <Text style={styles.head}>Log in</Text>
            {customError!="" && showToast(customError)}
            <View style={styles.inputbox}>
                <AntDesign name="user" size={24} color={emailfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Email' 
                    onChangeText={(e)=>setEmail(e)}
                    onFocus={()=>{
                        setEmailFocus(true)
                        setPasswordFocus(false)
                        setShowPassword(false)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
            <Feather name="lock" size={24} color={passwordfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Password'
                onChangeText={(e)=>setPassword(e)}
                onFocus={()=>{
                    setEmailFocus(false)
                    setPasswordFocus(true)
                }}
                secureTextEntry={showpassword==false?true:false}
                ></TextInput>
                <Octicons name={showpassword==false?"eye-closed":"eye"} size={24} 
                onPress={()=>{
                    setShowPassword(!showpassword)
                }}></Octicons>
            </View>

            <TouchableOpacity  style={styles.btn} onPress={handlelogin}>
              <Text style={{color:colors.col1, fontSize:18}} >Login</Text>
            </TouchableOpacity>

            <Text style={{color:colors.text2}}>Forgot Password </Text>
            <Text style={{color:colors.text1, marginTop:10}}>New here?
            <Text style={{color:colors.text3, marginTop:10}} onPress={()=>navigation.navigate('signup')}> Sign up</Text>
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white",
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
        backgroundColor: "white",
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
        width:"80%",
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "200",
        backgroundColor:colors.text4,
        // backgroundColor: colors.text1,
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        alignItems:"center",
        justifyContent:"center",
      },

})

export default LoginScreen
