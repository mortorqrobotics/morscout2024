const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./firebase");
const excel = require("xlsx");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define function to get scout data
const getScoutData = async (scoutType) => {
  try {
    const collection = db.collection(scoutType);
    const documents = await collection.listDocuments();
    const documentsData = await Promise.all(
      documents.map(async (document) => {
        const documentRef = await document.get();
        return documentRef.data();
      })
    );
    return documentsData;
  } catch (error) {
    console.error("Error fetching scout data:", error);
    throw error;
  }
};

// Endpoint for getting match scout data
app.get("/get-matchscout-data", async (req, res) => {
  try {
    const matchScoutData = await getScoutData("matchscout");
    res.status(200).json({ success: true, data: matchScoutData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Endpoint for getting pit scout data
app.get("/get-pitscout-data", async (req, res) => {
  try {
    const pitScoutData = await getScoutData("pitscout");
    res.status(200).json({ success: true, data: pitScoutData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.get("/download-pitscout-data", async (req, res) => {
  try {
    const pitScoutData = await getScoutData("pitscout");

    // Transform the data into an array of objects if necessary
    const transformedData = pitScoutData.map((document) => ({
      teamNumber: document.id,
      ...document.data().pitscout,
    }));

    // Create Excel workbook and worksheet
    const workbook = excel.utils.book_new();
    const worksheet = excel.utils.json_to_sheet(transformedData);
    excel.utils.book_append_sheet(workbook, worksheet, "PitScouts");

    // Write the workbook to a buffer
    const buffer = excel.write(workbook, { type: "buffer" });

    // Set the appropriate headers for downloading the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=PitScouts.xlsx"
    );

    // Send the buffer as the response
    res.send(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});



// Define function to submit scout form
const submitScoutForm = async (req, res, scoutType, collectionName) => {
  try {
    const { teamNumber } = req.params;
    const { username, ...formFields } = req.body;

    // Check if the teamNumber document exists in the specified collection
    const teamDocRef = db.collection(collectionName).doc(teamNumber);
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

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
