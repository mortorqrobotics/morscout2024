import { useState } from "react";
import Header from "../../components/header/header";
const PitScoutForm = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    robotName: "",
    robotWeight: "",
    // Add more form fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., send data to a server or perform local actions
    console.log("Pit Scout Form submitted:", formData);
  };

  return (
    <div>
      <Header
        toWhere="/pit-team-choice"
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Pit </span>
            <span style={{ color: "#FFFFFF" }}>Scout</span>
          </>
        }
      />

      <form onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Robot Name:
          <input
            type="text"
            name="robotName"
            value={formData.robotName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Robot Weight:
          <input
            type="text"
            name="robotWeight"
            value={formData.robotWeight}
            onChange={handleChange}
          />
        </label>
        {/* Add more form fields here as needed */}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PitScoutForm;
