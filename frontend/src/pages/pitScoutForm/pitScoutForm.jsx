import React, { useState, useEffect } from "react";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import "./pitScoutForm.css";
import { toast } from "react-hot-toast"; // Import toast from react-hot-toast
import { useParams } from "react-router-dom";

function PitScoutForm() {
  let { teamNumber } = useParams();

  const [formState, setFormState] = useState({
    weight: "",
    drivetrain: "",
    numberOfMotors: "",
    dropdownValue: "", // Set the default value here
    teamNumber: teamNumber,
  });

  useEffect(() => {
    // Set the default value when the component mounts
    setFormState((prevState) => ({
      ...prevState,
      dropdownValue: "Something 1",
    }));
  }, []); // Empty dependency array to run this effect only once when the component mounts

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`handleChange - Event details:`, e);
    console.log(`handleChange - Setting ${name} to: ${value}`);
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownSelect = (selectedValue) => {
    setFormState((prevState) => ({
      ...prevState,
      dropdownValue: selectedValue,
    }));
    console.log(
      `handleDropdownSelect - Setting dropdownValue to: ${selectedValue}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormIncomplete = Object.values(formState).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      console.log("Form is not filled out completely");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/submit-form/${teamNumber}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        toast.success("Form submitted successfully");
        // Set default values or leave them blank based on your requirement
        setFormState({
          weight: "",
          drivetrain: "",
          numberOfMotors: "",
          dropdownValue: "Something 1", // Set the default value here
          teamNumber: teamNumber,
        });
      } else {
        console.error("Form submission failed");
        toast.error("Form submission failed");
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
          defaultOption={formState.dropdownValue} // Set the default value based on the state
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
}

export default PitScoutForm;
