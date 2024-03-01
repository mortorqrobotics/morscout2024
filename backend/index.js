User
// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./firebase");
const excel = require("xlsx")

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const submitScoutForm = async (req, res, scoutType, collectionName) => {
  try {
    const { teamNumber } = req.params;
    const { yourName, ...formFields } = req.body;

    // Check if the teamNumber document exists in the specified collection
    const teamDocRef = db.collection(collectionName).doc(teamNumber);
    const teamDoc = await teamDocRef.get();

    if (teamDoc.exists) {
      const scoutData = teamDoc.data()[scoutType] || {};

      // Create a new submission with the person's name
      const newSubmissionKey = `submission${Object.keys(scoutData).length + 1}`;
      const newSubmission = {
        [yourName]: formFields,
      };

      // Append the new submission to the existing scout data
      await teamDocRef.update({
        [`${scoutType}.${newSubmissionKey}`]: newSubmission,
      });
    } else {
      // If the document doesn't exist, create a new one
      const initialData = {
        [`submission1`]: {
          [yourName]: formFields,
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

app.get("/", async (req, res) => {
  const collection = db.collection("pitscout");
  const documents = await collection.listDocuments();
  const documentsData  = await Promise.all(
    documents.map(async (document) => {
      const documentRef = await document.get();
      const pitscout = documentRef.data().pitscout;
      const output = []
      for(let submissionKey in pitscout) {
        const pitscoutData = pitscout[submissionKey]
        const person = pitscoutData[Object.keys(pitscoutData)[0]]

        output.push( {
          teamNumber: document.id,
          name: Object.keys(pitscoutData)[0],
          ...person
        })

      }

      return output
    })
  )
  const data = [ ]
  for(let personCollection of documentsData) {
    for(let person of personCollection) {
      data.push(person)
    }
  }
  const workbook = excel.utils.book_new()
  const worksheet = excel.utils.json_to_sheet(data);
  excel.utils.book_append_sheet(workbook, worksheet, 'Sheet 1')
  excel.writeFile(workbook, 'PitScouts.xlsx')
    return res.json(data);
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});