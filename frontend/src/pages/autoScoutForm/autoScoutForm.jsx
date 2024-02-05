// src/components/AutoScoutForm.js
import React, { useState } from "react";
import Header from "../../components/header/header";
import { useParams } from "react-router-dom";
import TextInput from "../../components/textInput/textInput";
import { toast } from "react-hot-toast";
import SubmitButton from "../../components/submitBtn/submitBtn";

const AutoScoutForm = () => {
  let { teamNumber } = useParams();
  const [formData, setFormData] = useState({
    yourName: "",
    teamName: "",
    allianceColor: "",
    matchNumber: "",
    // Add more form fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormIncomplete = Object.values(formData).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      console.log("Form is not filled out completely");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/submit-autoscout/${teamNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("AutoScout form submitted successfully");
        toast.success("AutoScout form submitted successfully");
        setFormData({
          yourName: "",
          teamName: "",
          allianceColor: "",
          matchNumber: "",
          // Reset other form fields as needed
        });
      } else {
        console.error("AutoScout form submission failed");
        toast.error("AutoScout form submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      <Header
        toWhere={`/matchscout-team-form/${teamNumber}`}
        headerText={
          <>
            <span style={{ color: "#FFFFFF" }}>Auto</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="pitForm">
        <TextInput
          label="Your Name"
          name="yourName"
          value={formData.yourName}
          onChange={handleChange}
        />

        <TextInput
          label="Team Name"
          name="teamName"
          value={formData.teamName}
          onChange={handleChange}
        />

        <TextInput
          label="Alliance Color"
          name="allianceColor"
          value={formData.allianceColor}
          onChange={handleChange}
        />

        <TextInput
          label="Match Number"
          name="matchNumber"
          value={formData.matchNumber}
          onChange={handleChange}
        />
        <SubmitButton label="Submit" />
      </form>
    </div>
  );
};

export default AutoScoutForm;
