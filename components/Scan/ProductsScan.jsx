import React, { useState, useRef } from "react";
import { CameraView } from "expo-camera";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";
import ProductLookup from "./ProductLookup";

export default function App() {
  const [facing, setFacing] = useState("back");
  const [capturedImage, setCapturedImage] = useState(null);
  const [recognizedProduct, setRecognizedProduct] = useState(null);
  const cameraRef = useRef(null);

  // List of products to recognize
  const productList = ["Apple", "Banana", "Orange", "Mango", "Grapes", "phone"];

  // Toggle between front and back camera
  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  // Capture the image from the camera
  const captureImage = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri);
      await recognizeProduct(photo.uri);
    }
  };

  // Send the captured image to Google Cloud Vision API
  const recognizeProduct = async (uri) => {
    const base64Image = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    try {
      const response = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDn1hXE87a2QxkBSMUmNhX4MhQJ7znhUMY`, // Use your API key here
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 15,
                },
              ],
            },
          ],
        }
      );

      const labels = response.data.responses[0].labelAnnotations;
      console.log(labels);
      const recognizedLabels = labels.map((label) =>
        label.description.toLowerCase()
      );

      // Check if any recognized label matches our product list
      const matchedProduct = productList.find((product) =>
        recognizedLabels.includes(product.toLowerCase())
      );

      if (matchedProduct) {
        setRecognizedProduct(matchedProduct);

        Speech.speak(`Product recognized: ${matchedProduct}`, {
          language: "en",
        }); // Announce product name
      } else {
        setRecognizedProduct(null);
        Alert.alert("Product not recognized!");
      }
    } catch (error) {
      console.error("Error recognizing product:", error);
      Alert.alert("Product recognition failed!");
    }
  };

  return (
    <View style={styles.container}>
      {!capturedImage ? (
        <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
      )}

      <View style={styles.captureContainer}>
        <TouchableOpacity
          style={styles.captureButton}
          onPress={capturedImage ? () => setCapturedImage(null) : captureImage}
        >
          <Text style={styles.captureText}>
            {capturedImage ? "Try Again" : "Capture"}
          </Text>
        </TouchableOpacity>
      </View>

      {recognizedProduct && (
        <View style={styles.productCard}>
          <Text style={styles.productText}>
            Product Recognized: {recognizedProduct}
          </Text>
          <ProductLookup productName={recognizedProduct} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  camera: { width: 300, height: 300, borderRadius: 20, overflow: "hidden" },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: { fontSize: 18, fontWeight: "bold", color: "white" },
  captureContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  captureText: { fontSize: 18, color: "white" },
  capturedImage: { width: 300, height: 300, borderRadius: 20 },
  productCard: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 5,
  },
  productText: { fontSize: 18, fontWeight: "bold", color: "white" },
});
