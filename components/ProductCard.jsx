import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQuantity } from "../redux/cartSlice";
import * as Speech from "expo-speech";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.cartItems.find((item) => item.id === product.id)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    } else {
      dispatch(updateCartQuantity({ id: product.id, quantity: quantity + 1 }));
    }
  };

  const speakProductDetails = () => {
    const message = `${product.name}. Price is ${product.price.toFixed(
      2
    )} dollars.`;
    Speech.speak(message);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={speakProductDetails}>
      <Image source={product.image} style={styles.productImage} />
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>
            {quantity === 0 ? "Add to Cart" : `Added (${quantity})`}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 30,
    padding: 20,
    alignItems: "center",
  },
  productImage: {
    width: 280,
    height: 280,
    borderRadius: 12,
    resizeMode: "cover",
    marginBottom: 20,
  },
  cardContent: {
    alignItems: "center",
  },
  productName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 36,
    color: "#6200EE",
    marginBottom: 20,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ProductCard;
