import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateCartQuantity } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  // Get the product's quantity from the Redux store (instead of local state)
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

  return (
    <View style={styles.card}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
    flexDirection: "row",
    padding: 15,
  },
  productImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: "#6200EE",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductCard;
