import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AppleImage from "../../assets/Apple.jpeg";
import BananaImage from "../../assets/Banana.jpeg";
import AvocadoImage from "../../assets/Avocado.jpeg";
import GrapesImage from "../../assets/Grape.jpeg";
import MangoImage from "../../assets/Mango.jpeg";
import OrangeImage from "../../assets/Orange.jpeg";
import {
  addToCart,
  clearCart,
  updateCartQuantity,
} from "../../redux/cartSlice";
export default function ProductLookup({ productName }) {
  const productDetails = {
    Apple: {
      image: AppleImage,
      description: "A fresh and juicy apple.",
    },
    Banana: {
      image: BananaImage,
      description: "A ripe banana, perfect for a quick snack.",
    },
    Orange: {
      image: OrangeImage,
      description: "A sweet and tangy orange full of vitamin C.",
    },
    Mango: {
      image: MangoImage,
      description: "A deliciously sweet tropical mango.",
    },
    Grapes: {
      image: GrapesImage,
      description: "Fresh grapes, perfect for a healthy snack.",
    },
    phone: {
      image: "https://example.com/phone.jpg",
      description: "A modern smartphone with advanced features.",
    },
  };

  const product = productDetails[productName] || {
    image: "https://example.com/default.jpg",
    description: "Product details not available.",
  };

  return (
    <View style={styles.card}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{productName}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 300,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
