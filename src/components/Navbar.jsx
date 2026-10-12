import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 left-0 transition-all duration-300 z-50 ${
      scrolled 
        ? 'bg-slate-900/85 backdrop-blur-md shadow-lg shadow-black/10 border-b border-slate-800/80 py-2.5' 
        : 'bg-slate-900/60 backdrop-blur-sm py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-500/30"
          >
            Z
          </motion.div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Zaheer<span className="text-blue-500 font-black">.</span>
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1 text-sm font-semibold text-slate-300">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ y: -1 }}
              className="px-3.5 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
            >
              {link.name}
            </motion.a>
          ))}
          <div className="pl-3 border-l border-slate-700/60 ml-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1.5 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 hover:border-transparent px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200"
              >
                Admin Portal
                <ArrowUpRight size={13} />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 px-6 py-5 space-y-2 shadow-2xl absolute w-full left-0"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-slate-800/80 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-800">
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-md shadow-blue-600/30 transition-colors"
              >
                Admin Portal
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}