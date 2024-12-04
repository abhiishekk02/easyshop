const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const { Storage } = require("@google-cloud/storage");
const vision = require("@google-cloud/vision");

const app = express();
const port = 3000;

app.use(morgan("dev"));
app.use(bodyParser.json());

app.post("/recognize-product", async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const imageBuffer = Buffer.from(image, "base64");

    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection({
      image: { content: imageBuffer },
    });
    const labels = result.labelAnnotations;

    if (labels.length > 0) {
      const recognizedProduct = labels[0].description;
      res.json({ productName: recognizedProduct });
    } else {
      res.status(404).json({ error: "No product detected" });
    }
  } catch (error) {
    console.error("Error recognizing product:", error);
    res.status(500).json({ error: "Product recognition failed" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
