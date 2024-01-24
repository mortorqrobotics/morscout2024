import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./header.css";

const Header = (props) => {
  return (
    <div>
        <nav>
            <button >
                <ArrowBackIcon style={{fill: " #fff" , backgroundColor: "black"} }/>
            </button>
            <div>
                <h2>
                    {props.headerText}
                </h2>
            </div>
        </nav>
    </div>
  )
}

export default Header