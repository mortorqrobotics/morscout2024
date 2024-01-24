import React from 'react'
import "./pitButton.css"

const PitButton = (props) => {
  return (
    <div>
        <button className='pitButton'>
            {props.teamNum}
        </button>
    </div>
  )
}

export default PitButton