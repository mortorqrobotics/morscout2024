import React, { useState } from "react";
import Header from "../../components/header/header";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../../components/textInput/textInput";
import { toast } from "react-hot-toast";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Dropdown from "../../components/dropdown/dropdown";
import Counter from "../../components/counter/counter";
import Timer from "../../components/timer/timer"; // Import the Timer component
import { submitTeleop } from "../../api/server";

const CHOICEYESNO = ["Yes", "No"];
const DEFAULT_STATE = {
  speakerCounter: 0,
  ampCounter: 0,
  yourName: "",
  trap: "Yes",
  guyThrewTheRing: "",
  generalComments: "",
  robotSpeed: "Slow",
  didTheyDoDefense: "No",
  climbTime: 0, // Added climbTime to the default state
};

const TeleopScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isClimbCounterRunning, setIsClimbCounterRunning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Check form completeness, excluding climbTime
    const isFormIncomplete = Object.keys(formState)
      .filter((key) => key !== "climbTime")
      .some((key) => formState[key] === "" || formState[key] === undefined);

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      // Submit form data
      const response = await submitTeleop(teamNumber, {
        ...formState,
        username,
      });

      if (response.ok) {
        toast.success("TeleopScout form submitted successfully");
        setFormState({ ...DEFAULT_STATE });
        setIsClimbCounterRunning(false); // Stop the timer after form submission
        navigate("/");
      } else {
        toast.error("TeleopScout form submission failed");
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
        toWhere={`/matchscout-team-form/${teamNumber}`}
        headerText={
          <>
            <span style={{ color: "#FFFFFF" }}>Teleop</span>
          </>
        }
      />
      <form onSubmit={handleSubmit} className="pitForm">
        <TextInput
          label="Your Name"
          name="yourName"
          value={formState.yourName}
          onChange={(e) =>
            setFormState({ ...formState, yourName: e.target.value })
          }
        />

        <Counter
          label="Speaker Counter"
          name="speakerCounter"
          value={formState.speakerCounter}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />

        <Counter
          label="Amp Counter"
          name="ampCounter"
          value={formState.ampCounter}
          onChange={(name, value) =>
            setFormState({ ...formState, [name]: value })
          }
        />

        <Dropdown
          label="Trap?"
          options={CHOICEYESNO}
          onSelect={(value) => setFormState({ ...formState, trap: value })}
          defaultOption={formState.trap}
        />

        <TextInput
          label="Guy Threw the Ring"
          name="guyThrewTheRing"
          value={formState.guyThrewTheRing}
          onChange={(e) =>
            setFormState({ ...formState, guyThrewTheRing: e.target.value })
          }
        />

        <TextInput
          label="General Comments"
          name="generalComments"
          value={formState.generalComments}
          onChange={(e) =>
            setFormState({ ...formState, generalComments: e.target.value })
          }
        />

        <Dropdown
          label="Robot Speed"
          options={["Slow", "Medium", "Fast"]}
          onSelect={(value) =>
            setFormState({ ...formState, robotSpeed: value })
          }
          defaultOption={formState.robotSpeed}
        />

        <Dropdown
          label="Did they do defense?"
          options={CHOICEYESNO}
          onSelect={(value) =>
            setFormState({ ...formState, didTheyDoDefense: value })
          }
          defaultOption={formState.didTheyDoDefense}
        />

        {/* Timer */}
        <div>
          <label>Climb Timer</label>
        <Timer
          initialTime={0}
          isRunning={isClimbCounterRunning}
          onStart={() => console.log("Timer started")} // Add onStart prop
          onStop={(time) => {
            // Handle the stop action here
            console.log("Timer stopped at:", time, "seconds");
          }}
        />
        {/* Always display a stop button */}
        <button onClick={() => setIsClimbCounterRunning(false)}>Stop</button>
        </div>

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default TeleopScoutForm;
