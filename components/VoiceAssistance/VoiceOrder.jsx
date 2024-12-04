import React, { useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as Speech from "expo-speech";

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [index, setIndex] = useState(1);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);

    switch (index) {
      case 1:
        Speech.speak("The price of Apple is 3 dollars");
        break;
      case 2:
        Speech.speak("The price of Banana is 2 dollars");
        break;
      case 3:
        Speech.speak(
          "3 Apples and 2 Mangos. The price is 14 dollars. Would you like to place the order?"
        );
        break;

      case 4:
        Speech.speak("Order Placed! Thank you. ");
        break;

      default:
        Speech.speak("Price information is not available");
    }

    setIndex((prevIndex) => (prevIndex === 4 ? 1 : prevIndex + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Assistant</Text>
      <Button
        title={isRecording ? "Stop Recording" : "Start Recording"}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  info: {
    marginTop: 20,
    fontSize: 18,
    color: "#555",
  },
});
