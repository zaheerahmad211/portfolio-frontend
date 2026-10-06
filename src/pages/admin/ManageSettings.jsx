import { useEffect, useState } from 'react';
import api, { BACKEND_URL } from '../../utils/api';
import toast from 'react-hot-toast';
import { Settings, Image as ImageIcon } from 'lucide-react';

export default function ManageSettings() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    profileImage: ''
  });

  useEffect(() => {
    api.get('/settings').then(res => {
      if(res.data) setFormData(res.data);
    }).catch(console.error);
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData({...formData, profileImage: res.data.url});
      toast.success('Profile image uploaded successfully');
    } catch(err) { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put('/settings', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Profile settings updated successfully');
    } catch(err) { toast.error('Error updating settings'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-800">
        <Settings size={32} className="text-blue-600" />
        Profile Settings
      </h1>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Profile Image Section */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-8 border-b border-slate-100">
            <div className="w-32 h-32 rounded-full bg-slate-50 overflow-hidden border-4 border-white shadow-lg shrink-0 flex items-center justify-center">
              {formData.profileImage ? (
                <img src={`${BACKEND_URL}${formData.profileImage}`} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon size={40} className="text-slate-300" />
              )}
            </div>
            <div className="flex-1 w-full text-center sm:text-left">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Upload Profile Image</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange} 
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors cursor-pointer" 
              />
              <p className="text-xs text-slate-400 mt-3">Upload a square image (JPG, PNG) from your local computer for best results.</p>
            </div>
          </div>

          {/* Text Fields Section */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
              <input type="text" required value={formData.name || ''} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="e.g. Zaheer Ahmed" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Professional Title</label>
              <input type="text" required value={formData.title || ''} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="e.g. MERN Stack Developer" />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input type="email" value={formData.email || ''} onChange={e=>setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="e.g. zaheerastorian@gmail.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input type="text" value={formData.phone || ''} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="e.g. +92 300 1234567" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn URL</label>
                <input type="url" value={formData.linkedin || ''} onChange={e=>setFormData({...formData, linkedin: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="https://linkedin.com/in/zaheer..." />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">GitHub URL</label>
                <input type="url" value={formData.github || ''} onChange={e=>setFormData({...formData, github: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="https://github.com/zaheer..." />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vercel Profile URL</label>
                <input type="url" value={formData.vercel || ''} onChange={e=>setFormData({...formData, vercel: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="https://vercel.com/zaheer..." />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Bio / Short Intro</label>
              <textarea required rows="4" value={formData.bio || ''} onChange={e=>setFormData({...formData, bio: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-y" placeholder="A short introduction for your hero section..."></textarea>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="bg-blue-600 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-blue-700 transition shadow-md hover:shadow-lg w-full sm:w-auto">
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
