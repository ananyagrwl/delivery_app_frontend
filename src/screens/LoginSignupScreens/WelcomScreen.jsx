import React from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native'
import logo from "../../../assets/logo.png"
import bg from "../../../assets/bg.jpg"
import { colors, hr80 } from "../../global/style"

export const WelcomScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" blurRadius={1.5} style={styles.image}>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to Foodie</Text>
          {/* <View style={styles.logobox}>
            <Image source={logo} style={styles.logo} />
        </View> */}
          {/* <View style={hr80}/> */}
          <Text style={styles.text}>Find the best food at lowest prices</Text>
          <View style={styles.btnout}>
            <TouchableOpacity onPress={()=>navigation.navigate('login')}>
              <Text style={styles.btn}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: 'center',

  },
  title: {
    fontSize: 50,
    color: "white",
    textAlign: "center",
    marginVertical: 10,
    // marginBottom:70,
    fontWeight: "400",
  },
  logobox: {
    width: "80%",
    height: "30%",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%"
  },
  text: {
    justifyContent: "center",
    fontSize: 18,
    width: "80%",
    color: "black",
    textAlign: "center",
  },
  btnout: {
    justifyContent: "center",
  },
  btn: {
    fontSize: 20,
    color: colors.col1,
    textAlign: "center",
    marginVertical: 30,
    marginHorizontal: 10,
    fontWeight: "200",
    // backgroundColor: "rgb(233, 161, 26)",
    backgroundColor: colors.text4,
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 90,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
  }
})

export default WelcomScreen