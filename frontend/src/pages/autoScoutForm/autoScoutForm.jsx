import { useState } from "react";
import SubmitButton from "../../components/submitBtn/submitBtn";
import Header from "../../components/header/header";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { submitTeleop } from "../../api/server";
import Counter from "../../components/counter/counter";
import Dropdown from "../../components/dropdown/dropdown";
import TextInput from "../../components/textInput/textInput";
import NumberInput from "../../components/numberInput/numberInput";
import "../teleopScoutForm/teleopScoutForm"
const CHOICEYESNO = ["Yes", "No"];
const DEFAULT_STATE = {
  speakerCounter: 0,
  ampCounter: 0,
  leftTheStation: "Yes"
};

const AutoScoutForm = ({ username }) => {
  const { teamNumber } = useParams();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_STATE });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const isFormIncomplete = Object.values(formState).some(
      (value) => value === "" || value === undefined
    );

    if (isFormIncomplete) {
      toast.error("Form is not filled out completely");
      return;
    }

    try {
      const response = await submitTeleop(teamNumber, {
        ...formState,
        username,
      });
      if (response.ok) {
        toast.success("Auto Scout form submitted successfully");
        setFormState({ ...DEFAULT_STATE });
        navigate("/");
      } else {
        toast.error("Auto Scout form submission failed");
        setFormSubmitted(false);
      }
    } catch (error) {
      toast.error("Internal Server Error");
      setFormSubmitted(false);
      console.error(error);
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
      <form onSubmit={handleSubmit} className="teleopScout">
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
          label="Robot left the station?"
          options={CHOICEYESNO}
          onSelect={(value) => setFormState({ ...formState, leftTheStation: value })}
          defaultOption={formState.leftTheStation}
        />

        <SubmitButton label={formSubmitted ? "Submitting..." : "Submit"} />
      </form>
    </div>
  );
};

export default AutoScoutForm;
