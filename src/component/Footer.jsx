import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
    <div className="text-center py-4">
      <p className="text-gray-600">Contact us: info@vidwize.com</p>
      <div className="mt-2">
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Terms of Service
        </a>
        <span className="mx-2">|</span>
        <a href="#" className="text-gray-700 hover:text-blue-600">
          Privacy Policy
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer