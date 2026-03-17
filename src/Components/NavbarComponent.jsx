import { useState } from "react";


export default function NavbarComponent
() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <a href="/" className="text-2xl font-bold text-blue-600">AIHire</a>
        
        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-6 text-gray-700">
          <li><a href="#features" className="hover:text-blue-600">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-blue-600">How It Works</a></li>
          <li><a href="#testimonials" className="hover:text-blue-600">Testimonials</a></li>
          <li><a href="#pricing" className="hover:text-blue-600">Pricing</a></li>
        </ul>
        
        {/* CTA Buttons */}
        <div className="hidden md:flex md:items-center space-x-4">
          <a href="/login" className="text-gray-600 hover:text-blue-600">Login</a>
          <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Sign Up
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <ul className="space-y-4">
            <li><a href="#features" className="block">Features</a></li>
            <li><a href="#how-it-works" className="block">How It Works</a></li>
            <li><a href="#testimonials" className="block">Testimonials</a></li>
            <li><a href="#pricing" className="block">Pricing</a></li>
            <li><a href="/login" className="block">Login</a></li>
            <li><a href="/signup" className="block bg-blue-600 text-white px-4 py-2 rounded-lg">Sign Up</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
}
