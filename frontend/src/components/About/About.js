import React from 'react'
import Footer from "../Footer/Footer";
import DefaultMessage from '../DefaultMessage/DefaultMessage'

function About() {
  return (
    <div>
      <DefaultMessage message="Horizon is a unique place where every guest finds comfort and inspiration."/>
      <DefaultMessage message="We strive for the highest quality of service, combining modern amenities with a unique atmosphere."/>
      <DefaultMessage message="Welcome to the world of Horizon, where your pleasure is our main goal."/>
      <Footer />
    </div>
  )
}

export default About
