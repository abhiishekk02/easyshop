// components/Header.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure you have expo/vector-icons installed
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();

  const navigateToCart = () => {
    navigation.navigate("Cart");
  };
  const navigateToScan = () => {
    navigation.navigate("Scan");
  };
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>EasyShop</Text>

      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={navigateToScan}>
          <Ionicons name="scan-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToCart}>
          <Ionicons name="cart-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#6200EE",
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 10,
  },
  logo: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
});

export default Header;
