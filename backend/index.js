const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const admin = require("firebase-admin");
const excel = require("xlsx");
const fs = require("fs");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Function to submit scout form
const submitScoutForm = async (req, res, scoutType, collectionName) => {
  try {
    const { teamNumber } = req.params;
    const { username, ...formFields } = req.body;

    // Check if the teamNumber document exists in the specified collection
    const teamDocRef = admin.firestore().collection(collectionName).doc(teamNumber);
    const teamDoc = await teamDocRef.get();

    if (teamDoc.exists) {
      const scoutData = teamDoc.data()[scoutType] || {};

      // Create a new submission with the person's name
      const newSubmissionKey = `submission${Object.keys(scoutData).length + 1}`;
      const newSubmission = {
        [username]: formFields,
      };

      // Append the new submission to the existing scout data
      await teamDocRef.update({
        [`${scoutType}.${newSubmissionKey}`]: newSubmission,
      });
    } else {
      // If the document doesn't exist, create a new one
      const initialData = {
        [`submission1`]: {
          [username]: formFields,
        },
      };

      const dataToSet = {
        [scoutType]: initialData,
      };

      await teamDocRef.set(dataToSet);
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Endpoint for autoscout form
app.post("/submit-autoscout/:teamNumber", async (req, res) => {
  submitScoutForm(req, res, "autoscout", "matchscout");
});

// Endpoint for teleopscout form
app.post("/submit-teleopscout/:teamNumber", async (req, res) => {
  submitScoutForm(req, res, "teleopscout", "matchscout");
});

// Endpoint for pitscout form
app.post("/submit-pitscout/:teamNumber", async (req, res) => {
  submitScoutForm(req, res, "pitscout", "pitscout");
});

// Function to convert data to Excel and download
const downloadExcel = (data, filename) => {
  const ws = excel.utils.json_to_sheet(data);
  const wb = excel.utils.book_new();
  excel.utils.book_append_sheet(wb, ws, "Sheet 1");
  excel.writeFile(wb, filename);
};

// Endpoint to fetch pit scout data and download as Excel
app.get("/pitscout", async (req, res) => {
  try {
    const pitScoutCollection = admin.firestore().collection("pitscout");

    const pitScoutDocuments = await pitScoutCollection.listDocuments();
    const pitScoutData = await Promise.all(
      pitScoutDocuments.map(async (document) => {
        const documentRef = await document.get();
        const pitscout = documentRef.data().pitscout;
        const output = [];

        for (let submissionKey in pitscout) {
          const pitscoutData = pitscout[submissionKey];
          const person = pitscoutData[Object.keys(pitscoutData)[0]];

          output.push({
            teamNumber: document.id,
            name: Object.keys(pitscoutData)[0],
            ...person,
          });
        }
        return output;
      })
    );

    // Log the fetched data to inspect
    console.log("Pit Scout Data:", pitScoutData);

    // Download as Excel
    downloadExcel(pitScoutData, "pitscout.xlsx");

    // Send data as JSON response
    res.json(pitScoutData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Endpoint to fetch match scout data and download as Excel
app.get("/matchscout", async (req, res) => {
  try {
    const matchScoutCollection = admin.firestore().collection("matchscout");

    const matchScoutDocuments = await matchScoutCollection.listDocuments();
    const matchScoutData = await Promise.all(
      matchScoutDocuments.map(async (document) => {
        const documentRef = await document.get();
        const matchscout = documentRef.data();

        const autoscout = matchscout.autoscout || {};
        const teleopscout = matchscout.teleopscout || {};
        
        const autoscoutData = Object.entries(autoscout).map(([key, value]) => ({
          teamNumber: document.id,
          name: key,
          scoutType: 'autoscout',
          ...value,
        }));

        const teleopscoutData = Object.entries(teleopscout).map(([key, value]) => ({
          teamNumber: document.id,
          name: key,
          scoutType: 'teleopscout',
          ...value,
        }));

        return [...autoscoutData, ...teleopscoutData];
      })
    );

    // Download as Excel
    downloadExcel(matchScoutData, "matchscout.xlsx");

    // Send data as JSON response
    res.json(matchScoutData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
