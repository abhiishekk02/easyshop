import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import * as Speech from "expo-speech";

const VoiceAssistant = () => {
  const [step, setStep] = useState("start");
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentSpeech, setCurrentSpeech] = useState("");

  const fruits = [
    { name: "Apple", price: 2.99 },
    { name: "Grapes", price: 3.99 },
    { name: "Avocado", price: 1.99 },
    { name: "Banana", price: 1.49 },
    { name: "Orange", price: 1.29 },
  ];

  const addToConversation = (speaker, message) => {
    setConversation((prev) => [
      ...prev,
      { speaker, message, timestamp: Date.now() },
    ]);
  };

  const speakText = async (text) => {
    try {
      const isSpeaking = await Speech.isSpeakingAsync();
      if (isSpeaking) {
        await Speech.stop();
      }

      addToConversation("Assistant", text);
      await Speech.speak(text, {
        language: "en",
        pitch: 1.0,
        rate: 0.9,
        onDone: () => {
          console.log("Finished speaking");
        },
        onError: (error) => {
          console.error("Speech error:", error);
        },
      });
    } catch (error) {
      console.error("Speech error:", error);
      Alert.alert("Error", "Failed to speak. Please try again.");
    }
  };

  const handleInput = (input) => {
    if (!input) return;
    addToConversation("Customer", input);
    setCurrentSpeech(input);
    handleConversation(input);
  };

  const handleConversation = async (input) => {
    console.log("Processing:", input);
    input = input.toLowerCase();

    switch (step) {
      case "start":
        await speakText("Hello! How may I help you today?");
        setStep("fruit_selection");
        break;

      case "fruit_selection":
        if (input.includes("fruit")) {
          const fruitsList = fruits
            .map((f) => `${f.name} for $${f.price}`)
            .join(", ");
          await speakText(
            `Here are our available fruits: ${fruitsList}. What would you like to purchase?`
          );
          setStep("product_query");
        } else {
          await speakText("Would you like to browse our fruits?");
        }
        break;

      case "product_query":
        if (input.includes("price")) {
          const fruit = fruits.find((f) =>
            input.toLowerCase().includes(f.name.toLowerCase())
          );
          if (fruit) {
            await speakText(
              `${fruit.name} costs $${fruit.price}. Would you like to purchase some?`
            );
          } else {
            await speakText("Which fruit's price would you like to know?");
          }
        } else if (input.includes("want") || input.includes("take")) {
          await processOrder(input);
          setStep("checkout");
        } else {
          await speakText(
            "I didn't catch that. Could you please repeat what you'd like to order?"
          );
        }
        break;

      case "checkout":
        if (input.includes("yes")) {
          await speakText(
            "Thank you for your order! Your order will be ready for pickup soon."
          );
          setStep("start");
        } else if (input.includes("no")) {
          await speakText("What else would you like to know about our fruits?");
          setStep("product_query");
        }
        break;

      default:
        await speakText(
          "Sorry, I didn't understand that. How may I help you today?"
        );
        setStep("start");
    }
  };

  const processOrder = async (input) => {
    let total = 0;
    const items = input.split("and");
    const orderedItems = [];

    items.forEach((item) => {
      const match = fruits.find((fruit) =>
        item.trim().includes(fruit.name.toLowerCase())
      );
      if (match) {
        const quantity = parseInt(item.trim().split(" ")[1]) || 1;
        total += match.price * quantity;
        orderedItems.push(`${quantity} ${match.name}(s)`);
      }
    });

    if (total > 0) {
      await speakText(
        `I've added ${orderedItems.join(
          " and "
        )}. Your total is $${total.toFixed(
          2
        )}. Would you like to place your order?`
      );
    } else {
      await speakText(
        "I couldn't understand your order. Could you please repeat it?"
      );
    }
  };

  useEffect(() => {
    // Initial greeting
    speakText(
      "Welcome! Type your request or select from the common phrases below."
    );
  }, []);

  // Common phrases for quick testing
  const commonPhrases = [
    "I want to buy fruits",
    "What's the price of apples?",
    "I want 2 apples and 3 bananas",
    "Yes, place the order",
  ];

  return (
    <View style={styles.container}>
      {/* Conversation History */}
      <ScrollView
        style={styles.conversationContainer}
        ref={(ref) => {
          if (ref && conversation.length > 0) {
            ref.scrollToEnd({ animated: true });
          }
        }}
      >
        {conversation.map((msg, index) => (
          <View
            key={index}
            style={[
              styles.messageContainer,
              msg.speaker === "Assistant"
                ? styles.assistantMessage
                : styles.customerMessage,
            ]}
          >
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Status Display */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>Current Step: {step}</Text>
        {currentSpeech ? (
          <Text style={styles.statusText}>Last Input: {currentSpeech}</Text>
        ) : null}
      </View>

      {/* Common Phrases */}
      <ScrollView horizontal style={styles.phrasesContainer}>
        {commonPhrases.map((phrase, index) => (
          <TouchableOpacity
            key={index}
            style={styles.phraseButton}
            onPress={() => handleInput(phrase)}
          >
            <Text style={styles.phraseText}>{phrase}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: "80%",
  },
  assistantMessage: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-start",
  },
  customerMessage: {
    backgroundColor: "#34C759",
    alignSelf: "flex-end",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  statusContainer: {
    backgroundColor: "#e0e0e0",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  phrasesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  phraseButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  phraseText: {
    color: "white",
    fontSize: 14,
  },
});

export default VoiceAssistant;
