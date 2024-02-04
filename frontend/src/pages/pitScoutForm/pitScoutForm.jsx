// src/components/PitScoutForm.js
import React, { useState, useEffect } from "react";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const PitScoutForm = () => {
  let { teamNumber } = useParams();

  const [formState, setFormState] = useState({
    weight: "",
    yourName: "",
    drivetrain: "",
    numberOfMotors: "",
    dropdownValue: "",
    teamNumber: teamNumber,
  });

  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      dropdownValue: "Something 1",
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownSelect = (selectedValue) => {
    setFormState((prevState) => ({
      ...prevState,
      dropdownValue: selectedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormIncomplete = Object.values(formState).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/submit-pitform/${teamNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          yourName: formState.yourName,
          weight: formState.weight,
          drivetrain: formState.drivetrain,
          numberOfMotors: formState.numberOfMotors,
          dropdownValue: formState.dropdownValue,
          // Include other form fields here
        }),
      });

      if (response.ok) {
        console.log("Pit form submitted successfully");
        toast.success("Pit form submitted successfully");
        setFormState({
          weight: "",
          drivetrain: "",
          yourName: "",
          numberOfMotors: "",
          dropdownValue: "Something 1",
          teamNumber: teamNumber,
        });
      } else {
        console.error("Pit form submission failed");
        toast.error("Pit form submission failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  return (
    <div>
      <Header
        toWhere={"/pit-team-choice"}
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="pitForm">
        <TextInput
          label="Your Name"
          name="yourName"
          value={formState.yourName}
          onChange={handleChange}
        />

        <NumberInput
          label="Weight"
          name="weight"
          value={formState.weight}
          onChange={handleChange}
        />
        <TextInput
          label="Drivetrain"
          name="drivetrain"
          value={formState.drivetrain}
          onChange={handleChange}
        />

        <Dropdown
          label="Choose Something"
          options={["Something 1", "Something 2"]}
          onSelect={handleDropdownSelect}
          defaultOption={formState.dropdownValue}
        />

        <NumberInput
          label="Number of Motors"
          name="numberOfMotors"
          value={formState.numberOfMotors}
          onChange={handleChange}
        />
        <SubmitButton label="Submit" />
      </form>
    </div>
  );
};

export default PitScoutForm;
