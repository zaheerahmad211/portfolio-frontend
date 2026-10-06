import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Outlet />
      </main>
      <footer className="bg-slate-900 text-slate-300 py-8 text-center">
        <p>&copy; {new Date().getFullYear()} Zaheer Ahmed. All rights reserved.</p>
      </footer>
    </div>
  )
}