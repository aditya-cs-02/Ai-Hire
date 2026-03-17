import { FaBlog, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoIosContact } from "react-icons/io";



export default function FooterComponent() {
    return (
      <footer className="bg-gray-900 text-white py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          
          {/* Left Side - Branding */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">Job Seeker App</h2>
            <p className="text-gray-400 text-sm mt-1">Find your dream job with AI-powered automation.</p>
          </div>
  
          {/* Right Side - Quick Links */}
          <div className="flex flex-col md:flex-row items-center md:gap-8 mt-4 md:mt-0">
            <a href="/blog" className="text-gray-300 hover:text-white flex gap-2 items-center"><FaBlog />
            Blog</a>
            <a href="/contact" className="text-gray-300 hover:text-white flex gap-2 items-center"><IoIosContact />
            Contact Us</a>
            <a href="https://linkedin.com" className="text-gray-300 flex gap-2 items-center hover:text-white"><FaLinkedinIn />
            LinkedIn</a>
            <a href="https://twitter.com" className="text-gray-300 flex gap-2 items-center hover:text-white"><FaTwitter />
            Twitter</a>
            <div className="text-gray-400 text-sm mt-2 md:mt-0">
              <a href="/privacy" className="hover:text-white">Privacy Policy</a> | 
              <a href="/terms" className="hover:text-white"> Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  