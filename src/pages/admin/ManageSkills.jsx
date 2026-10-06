import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Edit2, Trash2 } from 'lucide-react';

export default function ManageSkills() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({ name: '', icon: '' });
  const [editId, setEditId] = useState(null);

  const load = () => api.get('/skills').then(res => setSkills(res.data)).catch(console.error);
  useEffect(() => { load(); }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const data = new FormData();
    data.append('file', file);
    try {
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData({...formData, icon: res.data.url});
      toast.success('Logo uploaded successfully');
    } catch(err) { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/skills/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Skill updated successfully');
      } else {
        await api.post('/skills', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Skill added successfully');
      }
      setFormData({ name: '', icon: '' });
      setEditId(null);
      load();
    } catch(err) { toast.error('Error saving skill'); }
  };

  const handleEdit = (skill) => {
    setEditId(skill._id);
    setFormData({ name: skill.name, icon: skill.icon || '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ name: '', icon: '' });
  };

  const handleDelete = async (id) => {
    if(!confirm('Delete this skill?')) return;
    try {
      await api.delete(`/skills/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Skill deleted');
      load();
    } catch(err) { toast.error('Error deleting'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Manage Skills & Technologies</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Skill' : 'Add New Skill'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Skill Name (e.g., React.js)</label>
              <input required className="w-full border border-slate-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder="React.js" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700">Official Logo / Icon (Image Upload)</label>
              <input type="file" onChange={handleFileChange} className="w-full border border-slate-300 p-2 rounded-lg" />
              {formData.icon && (
                <div className="mt-3 flex items-center gap-3 bg-slate-50 p-2 rounded border border-slate-100">
                  <img src={`http://localhost:5000${formData.icon}`} alt="preview" className="w-8 h-8 object-contain" />
                  <span className="text-sm text-green-600 font-medium">Logo ready</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4 pt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition shadow-sm">{editId ? 'Update Skill' : 'Save Skill'}</button>
            {editId && <button type="button" onClick={handleCancel} className="bg-slate-100 text-slate-700 px-6 py-2.5 rounded-lg font-medium hover:bg-slate-200 transition">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Existing Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(s => (
            <div key={s._id} className="flex justify-between items-center p-4 border border-slate-100 rounded-xl bg-slate-50 hover:border-blue-200 transition">
              <div className="flex items-center gap-3">
                {s.icon ? (
                  <img src={`http://localhost:5000${s.icon}`} alt={s.name} className="w-8 h-8 object-contain" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold">{s.name.charAt(0)}</div>
                )}
                <h3 className="font-bold text-slate-800">{s.name}</h3>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(s)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition" title="Edit"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(s._id)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition" title="Delete"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
