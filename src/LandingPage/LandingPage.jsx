import React from 'react'
import NavbarComponent from '../Components/NavbarComponent'
import HeroComponent from '../Components/HeroComponent'
import FeatureComponent from '../Components/FeatureComponent'
import HowItWorksComponent from '../Components/HowItWorksComponent'
import TestimonialsComponent from '../Components/TestimonialsComponent'
import PricingComponent from '../Components/PricingComponent'
import CTAComponent from '../Components/CTAComponent'
import FooterComponent from '../Components/FooterComponent'

function LandingPage() {
  return (
    <div>
        <NavbarComponent />
        <HeroComponent />
        <FeatureComponent />
        <HowItWorksComponent />
        <TestimonialsComponent />
        <PricingComponent />
        <CTAComponent />
        <FooterComponent />
    </div>
  )
}

export default LandingPage