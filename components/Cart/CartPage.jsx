import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  updateCartQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleIncrement = (id, quantity) => {
    dispatch(updateCartQuantity({ id, quantity: quantity + 1 }));
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateCartQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    Alert.alert("Clear Cart", "Are you sure you want to clear the cart?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => dispatch(clearCart()) },
    ]);
  };
  const handleCheckOut = () => {
    if (cartItems.length === 0) {
      Alert.alert("Checkout Failed", "Your cart is empty.");
      return;
    }

    Alert.alert(
      "Order Placed",
      "Your order has been placed successfully!",
      [
        {
          text: "OK",
          onPress: () => dispatch(clearCart()),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Text style={styles.cartItemText}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>

              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>Quantity: </Text>
                <TouchableOpacity
                  onPress={() => handleDecrement(item.id, item.quantity)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleIncrement(item.id, item.quantity)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

      <Text style={styles.total}>Total: ${totalAmount.toFixed(2)}</Text>

      <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
        <Text style={styles.buttonText}>Clear Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  emptyText: {
    fontSize: 22,
    color: "#888",
    textAlign: "center",
    marginTop: 40,
  },
  cartItem: {
    paddingVertical: 20,
    marginBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#ddd",
    alignItems: "center",
  },
  cartItemText: {
    fontSize: 30,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  cartItemPrice: {
    fontSize: 30,
    color: "green",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  quantityButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 15,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#f44336",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
    width: "80%",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  total: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 30,
    textAlign: "center",
  },
  clearButton: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  checkoutButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default CartPage;
