// SubmitButton.jsx
import "./submitBtn.css"

const SubmitButton = ({ label }) => {
  return (
    <div>
      <button className='submitBtn' type="submit">{label}</button>
    </div>
  );
};

export default SubmitButton;
