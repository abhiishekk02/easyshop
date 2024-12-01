import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import SearchBar from "../SearchBar";
import ProductCard from "../ProductCard";
import AppleImage from "../../assets/Apple.jpeg";
import BananaImage from "../../assets/Banana.jpeg";
import AvocadoImage from "../../assets/Avocado.jpeg";
import GrapesImage from "../../assets/Grape.jpeg";
import MangoImage from "../../assets/Mango.jpeg";
import OrangeImage from "../../assets/Orange.jpeg";
import Header from "./Header";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  updateCartQuantity,
} from "../../redux/cartSlice";

const products = [
  { id: 1, name: "Apple", price: 2.99, image: AppleImage },
  { id: 2, name: "Banana", price: 1.49, image: BananaImage },
  { id: 3, name: "Avocado", price: 3.0, image: AvocadoImage },
  { id: 4, name: "Grapes", price: 4.5, image: GrapesImage },
  { id: 5, name: "Mango", price: 5.0, image: MangoImage },
  { id: 6, name: "Orange", price: 2.0, image: OrangeImage },
];

const LandingPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleUpdateCart = (product, quantity) => {
    dispatch(updateCartQuantity({ id: product.id, quantity }));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const navigateToCart = () => {
    navigation.navigate("CartPage");
  };

  const navigateToScan = () => {
    navigation.navigate("Scan");
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to clear the cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => dispatch(clearCart()) }, // Dispatch clearCart action
    ]);
  };

  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        <SearchBar />
        {/* <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
          <Text style={styles.buttonText}>Clear Cart</Text>
        </TouchableOpacity> */}
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
            onUpdateCart={(quantity) => handleUpdateCart(product, quantity)}
          />
        ))}
        {/* <Text style={styles.totalText}>Total: ${totalAmount.toFixed(2)}</Text>
        <TouchableOpacity style={styles.ctaButton} onPress={navigateToCart}>
          <Text style={styles.ctaText}>Go to Cart</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: "#f8f8f8",
  },
  clearButton: {
    backgroundColor: "#ff6347",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  ctaButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 20,
  },
  ctaText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LandingPage;
