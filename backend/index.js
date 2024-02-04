const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const admin = require("firebase-admin");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // No need to specify databaseURL for Firestore
});

const db = admin.firestore();

app.post("/submit-form/:teamNumber", async (req, res) => {
  try {
    const teamNumber = req.params.teamNumber;
    const formData = req.body;

    // Use teamNumber as the document ID
    // Create a 'pitScout' field and store form data within it
    await db.collection("pitScout").doc(teamNumber).set({
      pitScout: formData,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
