import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import { title, colors } from "../global/style"

const OfferSlider = () => {
  return (
    <View style={styles.offerSlider}>
      <Swiper autoplay={true} autoplayTimeout={5} showsButtons={true}
        dotColor={colors.text2} activeDotColor={colors.text1}
        nextButton={<Text style={styles.buttonText}>›</Text>}
        prevButton={<Text style={styles.buttonText}>‹</Text>}
      >

        <View style={styles.slide}>
          <Image source={require('../../assets/offer1.jpeg')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../../assets/offer2.jpeg')} style={styles.image} />
        </View>
        <View style={styles.slide}>
          <Image source={require('../../assets/offer3.jpeg')} style={styles.image} />
        </View>
      </Swiper>
    </View>

  );
};

const styles = StyleSheet.create({
  offerSlider: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
},
slide: {
    width: '100%',
    height: 200,
    backgroundColor: colors.col1,
    justifyContent: 'center',
    alignItems: 'center',
},
image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
},
buttonText: {
    color: colors.text1,
    fontSize: 40,
    fontWeight: '500',
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
}
})

export default OfferSlider

