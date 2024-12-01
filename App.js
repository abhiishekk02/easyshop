import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import IntroPage from "./components/IntroPage/IntroPage";
import LandingPage from "./components/Landing/LandingPage";
import CartPage from "./components/Cart/CartPage";
import { store } from "./redux/store";
import { loadCart } from "./redux/cartSlice"; // Import the loadCart action
import ProductsScan from "./components/Scan/ProductsScan";
import VoiceAssistant from "./components/VoiceAssistance/VoiceOrder";

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Load cart from AsyncStorage when the app starts
    store.dispatch(loadCart());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="IntroPage">
          <Stack.Screen name="IntroPage" component={IntroPage} />
          <Stack.Screen name="LandingPage" component={LandingPage} />
          <Stack.Screen name="Cart" component={CartPage} />
          <Stack.Screen name="Scan" component={ProductsScan} />
          <Stack.Screen name="Voice" component={VoiceAssistant} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
