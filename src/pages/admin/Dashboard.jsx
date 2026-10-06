import { useEffect, useState } from 'react';
import api from '../../utils/api';
import { Mail, FolderKanban, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, certifications: 0, messages: 0 });

  useEffect(() => {
    // Quick load of data lengths for stats
    Promise.all([
      api.get('/projects'),
      api.get('/certifications'),
      api.get('/messages', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    ]).then(([projRes, certRes, msgRes]) => {
      setStats({
        projects: projRes.data.length,
        certifications: certRes.data.length,
        messages: msgRes.data.length
      });
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Link to="/admin/projects" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Projects</h3>
              <p className="text-4xl font-bold text-slate-800">{stats.projects}</p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FolderKanban size={24} />
            </div>
          </div>
        </Link>
        
        <Link to="/admin/certifications" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Certifications</h3>
              <p className="text-4xl font-bold text-slate-800">{stats.certifications}</p>
            </div>
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Award size={24} />
            </div>
          </div>
        </Link>
        
        <Link to="/admin/messages" className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">Total Messages</h3>
              <p className="text-4xl font-bold text-slate-800">{stats.messages}</p>
            </div>
            <div className="p-3 bg-green-50 text-green-600 rounded-lg group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}