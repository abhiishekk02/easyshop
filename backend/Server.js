// server.js
const express = require("express");
const morgan = require("morgan"); // HTTP request logger
const bodyParser = require("body-parser"); // For parsing JSON bodies
const { Storage } = require("@google-cloud/storage"); // If using Google Cloud Storage (Optional)
const vision = require("@google-cloud/vision"); // If using Google Vision API (Optional)

const app = express();
const port = 3000;

// Middleware
app.use(morgan("dev")); // Logs requests in 'dev' format
app.use(bodyParser.json()); // Middleware to parse JSON

// Endpoint to recognize product from an image
app.post("/recognize-product", async (req, res) => {
  try {
    // Extract base64 image data from the request body
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    // Decode the base64 image (optional, can be sent directly if needed)
    const imageBuffer = Buffer.from(image, "base64");

    // Use Google Cloud Vision API to recognize the image
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection({
      image: { content: imageBuffer },
    });
    const labels = result.labelAnnotations;

    if (labels.length > 0) {
      const recognizedProduct = labels[0].description; // Get the first label description
      res.json({ productName: recognizedProduct });
    } else {
      res.status(404).json({ error: "No product detected" });
    }
  } catch (error) {
    console.error("Error recognizing product:", error);
    res.status(500).json({ error: "Product recognition failed" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
