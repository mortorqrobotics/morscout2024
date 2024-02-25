import React, { useState } from "react";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import Dropdown from "../../components/dropdown/dropdown";
import { toast } from "react-hot-toast";
import { useParams, Link } from "react-router-dom";

const PitScoutForm = () => {
  let { teamNumber } = useParams();

  const [formState, setFormState] = useState({
    robotWeight: "",
    yourName: "",
    drivetrain: "Swerve Drive",
    estimatedCycleTime: "",
    pickupFromFloor: "Yes",
    climb: "Yes",
    trap: "Yes",
    auto: "Yes",
    frameSize: "",
    scoringPosition: "",
    teamNumber: teamNumber,
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDropdownSelect = (selectedValue, name) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: selectedValue,
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
      const response = await fetch(
        `http://localhost:8000/submit-pitscout/${teamNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        }
      );

      if (response.ok) {
        console.log("Pit form submitted successfully");
        toast.success("Pit form submitted successfully");
        setFormSubmitted(true);
        setFormState({
          robotWeight: "",
          yourName: "",
          drivetrain: "Swerve Drive",
          estimatedCycleTime: "",
          pickupFromFloor: "Yes",
          climb: "Yes",
          trap: "Yes",
          auto: "Yes",
          frameSize: "",
          scoringPosition: "",
          teamNumber: teamNumber,
        });
      } else {
        console.error("Pit form submission failed");
        toast.error("Pit form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
      setFormSubmitted(false);
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
          label="Your Name "
          name="yourName"
          value={formState.yourName}
          onChange={handleChange}
        />

        <NumberInput
          label="Robot Weight "
          name="robotWeight"
          value={formState.robotWeight}
          onChange={handleChange}
        />

        <Dropdown
          label="Drivetrain :"
          options={["Swerve Drive", "Westcoast/Tank drive", "Omni", "Mecanum"]}
          onSelect={(value) => handleDropdownSelect(value, "drivetrain")}
          defaultOption={formState.drivetrain}
        />

        <NumberInput
          label="Estimated Cycle Time"
          name="estimatedCycleTime"
          value={formState.estimatedCycleTime}
          onChange={handleChange}
        />

        <Dropdown
          label="Pickup from the floor :"
          options={["Yes", "No"]}
          onSelect={(value) => handleDropdownSelect(value, "pickupFromFloor")}
          defaultOption={formState.pickupFromFloor}
        />

        <Dropdown
          label="Climb :"
          options={["Yes", "No"]}
          onSelect={(value) => handleDropdownSelect(value, "climb")}
          defaultOption={formState.climb}
        />

        <Dropdown
          label="Trap :"
          options={["Yes", "No"]}
          onSelect={(value) => handleDropdownSelect(value, "trap")}
          defaultOption={formState.trap}
        />

        <Dropdown
          label="Auto :"
          options={["Yes", "No"]}
          onSelect={(value) => handleDropdownSelect(value, "auto")}
          defaultOption={formState.auto}
        />

        <TextInput
          label="Frame Size"
          name="frameSize"
          value={formState.frameSize}
          onChange={handleChange}
        />

        <TextInput
          label="Scoring Position"
          name="scoringPosition"
          value={formState.scoringPosition}
          onChange={handleChange}
        />
        {formSubmitted ? (
          <SubmitButton label="Submit" />
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
      {formSubmitted && (
        <Link to="/">
          <SubmitButton label="Go to Main Page" />
        </Link>
      )}
    </div>
  );
};

export default PitScoutForm;
