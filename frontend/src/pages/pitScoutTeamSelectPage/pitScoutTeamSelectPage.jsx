import React from 'react'
import PitButton from '../../components/pitButton/pitButton'
import Header from '../../components/header/header'
import { Link } from 'react-router-dom'
const Pitscoutpage = () => {
  return (
    <div>
      <Header headerText={
        <> 
          <span style={{color:"#FF7F23"}}>Pit </span>
          <span style={{color:"#FFFFFF"}}>Scout</span>
        </>
      } />
      <Link to="/pit-team-choice/1515">
        <PitButton teamNum="1515"/>
      </Link>
      
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
      <PitButton teamNum="1515"/>
    </div>
  )
}

export default Pitscoutpage