import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IntroPage = () => {
  const navigation = useNavigation();

  const handleStartShopping = () => {
    navigation.navigate("LandingPage");
  };

  const handleStartVoiceShopping = () => {
    navigation.navigate("Voice");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>EasyShop</Text>
      <Text style={styles.tagline}>Shop Smarter, Not Harder.</Text>

      <TouchableOpacity
        style={styles.manualShopping}
        onPress={handleStartShopping}
      >
        <Ionicons name="cart" size={40} color="white" style={styles.icon} />
        <Text style={styles.buttonText}>Start Shopping</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.manualShopping}
        onPress={handleStartVoiceShopping}
      >
        <Ionicons name="mic" size={40} color="white" style={styles.icon} />

        <Text style={styles.buttonText}>Voice Assisted Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",

    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 20,
    marginBottom: 20,
  },
  manualShopping: {
    // backgroundColor: "#6200EE",
    backgroundColor: "#000",
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    height: 240,
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    fontSize: 60,
    // justifyContent: "center",
    textAlign: "center",
    paddingBottom: 20,
  },
});

export default IntroPage;
