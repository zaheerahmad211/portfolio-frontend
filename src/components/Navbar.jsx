import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-800">Zaheer Ahmed</Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#skills" className="hover:text-blue-600">Skills</a>
          <a href="#projects" className="hover:text-blue-600">Projects</a>
          <a href="#education" className="hover:text-blue-600">Education</a>
          <a href="#certifications" className="hover:text-blue-600">Certifications</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
          <Link to="/admin/login" className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-800">Admin Login</Link>
        </div>

        {/* Mobile Toggle Button */}
        <button className="md:hidden p-2 text-slate-600 hover:text-slate-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-4 shadow-lg absolute w-full">
          <a href="#about" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">About</a>
          <a href="#skills" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">Skills</a>
          <a href="#projects" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">Projects</a>
          <a href="#education" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">Education</a>
          <a href="#certifications" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">Certifications</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-600 font-medium">Contact</a>
          <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block w-full text-center bg-slate-900 text-white px-4 py-3 rounded font-medium">Admin Login</Link>
        </div>
      )}
    </nav>
  )
}