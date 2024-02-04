// server.js
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
});

const db = admin.firestore();

const submitForm = async (req, res, formType) => {
  try {
    const { teamNumber } = req.params;
    const { yourName, ...formFields } = req.body;

    // Check if the teamNumber document exists in the specified collection
    const teamDoc = await db.collection(formType).doc(teamNumber).get();

    if (teamDoc.exists) {
      // If the document exists, create a new submission with the person's name
      const newSubmission = {
        [yourName]: formFields,
      };

      // Update the nested entry
      const submissionsCount = Object.keys(teamDoc.data() || {}).length + 1;
      await db.collection(formType).doc(teamNumber).update({
        [submissionsCount]: newSubmission,
      });
    } else {
      // If the document doesn't exist, create a new one
      await db.collection(formType).doc(teamNumber).set({
        1: {
          [yourName]: formFields,
        },
      });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Endpoint for pitScout form
app.post("/submit-pitform/:teamNumber", async (req, res) => {
  submitForm(req, res, "pitScout");
});

// Endpoint for autoScout and teleopScout form
app.post("/submit-scout/:teamNumber/:scoutType", async (req, res) => {
  const scoutType = req.params.scoutType; // Get the scout type from the URL parameter
  const formType = `${scoutType}`; // Create the form type based on the scout type
  submitForm(req, res, formType);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
