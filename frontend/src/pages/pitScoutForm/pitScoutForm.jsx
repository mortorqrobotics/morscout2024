// PitScoutForm.jsx
import React, { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import "./PitScoutForm.css";
function PitScoutForm() {
  const [formState, setFormState] = useState({
    weight: "",
    drivetrain: "",
    numberOfMotors: "",
    example1: "",
    example2: "",
  });

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the submission here (e.g., send to an API or log to console)
    console.log(formState);
    // Reset form state if needed
    setFormState({
      weight: "",
      drivetrain: "",
      numberOfMotors: "",
      example1: "",
      example2: "",
    });
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
