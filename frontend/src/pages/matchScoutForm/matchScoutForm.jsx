import { useState } from "react";
import Header from "../../components/header/header";

const MatchScoutForm = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle form submission, e.g., send data to a server or perform local actions
    console.log("Form submitted:", formData);
  };

  return (
    <div>
      <Header
        toWhere="/matchscout-team-choice"
        headerText={
          <>
            <span style={{ color: "#FF7F23" }}>Match </span>
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
          Alliance Color:
          <input
            type="text"
            name="allianceColor"
            value={formData.allianceColor}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Match Number:
          <input
            type="text"
            name="matchNumber"
            value={formData.matchNumber}
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

export default MatchScoutForm;
