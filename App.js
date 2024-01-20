import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { WelcomScreen } from './src/screens/LoginSignupScreens/WelcomScreen';
import { LoginScreen } from './src/screens/LoginSignupScreens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/LoginSignupScreens/SignupScreen';
import HomeScreen from './src/screens/HomeScreen';
import Profile from './src/screens/Profile';
import ProductPage from './src/screens/ProductPage';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome'>
        <Stack.Screen name="welcome" component={WelcomScreen} options={{ headerShown: false }} />
        <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name='profile' component={Profile} options={{headerShown: false}}/>
        <Stack.Screen name='product' component={ProductPage} options={{headerShown: false}}/>
      </Stack.Navigator>
      {/* <Profile/> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
