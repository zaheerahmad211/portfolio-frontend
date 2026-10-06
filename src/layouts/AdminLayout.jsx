import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, FolderKanban, Mail, Wrench, Settings, Book } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-100">
      <aside className="w-full md:w-64 bg-slate-900 text-white flex flex-col md:min-h-screen shrink-0">
        <div className="p-4 text-xl font-bold border-b border-slate-700 flex justify-between items-center">
          Admin CMS
          <button onClick={handleLogout} className="md:hidden text-red-400 hover:text-red-300 p-1"><LogOut size={20} /></button>
        </div>
        <nav className="flex md:flex-col overflow-x-auto p-2 md:p-4 gap-2 md:gap-0 md:space-y-2">
          <Link to="/admin" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><LayoutDashboard size={20} /> Dashboard</Link>
          <Link to="/admin/projects" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><FolderKanban size={20} /> Projects</Link>
          <Link to="/admin/certifications" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><FolderKanban size={20} /> Certifications</Link>
          <Link to="/admin/education" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><Book size={20} /> Education</Link>
          <Link to="/admin/skills" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><Wrench size={20} /> Skills</Link>
          <Link to="/admin/messages" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><Mail size={20} /> Messages</Link>
          <Link to="/admin/settings" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded whitespace-nowrap"><Settings size={20} /> Profile</Link>
        </nav>
        <div className="p-4 border-t border-slate-700 mt-auto hidden md:block">
          <button onClick={handleLogout} className="flex items-center gap-2 w-full p-2 hover:bg-slate-800 rounded text-red-400 font-medium"><LogOut size={20} /> Logout</button>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-8 overflow-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}