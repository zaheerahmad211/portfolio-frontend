import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ManageEducation() {
  const [educationList, setEducationList] = useState([]);
  const [formData, setFormData] = useState({ degree: '', institution: '', startDate: '', endDate: '', current: false, description: '' });
  const [editId, setEditId] = useState(null);

  const load = () => api.get('/education').then(res => setEducationList(res.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/education/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Education updated successfully');
      } else {
        await api.post('/education', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Education added successfully');
      }
      setFormData({ degree: '', institution: '', startDate: '', endDate: '', current: false, description: '' });
      setEditId(null);
      load();
    } catch(err) { toast.error('Error saving education'); }
  };

  const handleEdit = (c) => {
    setEditId(c._id);
    setFormData({
      degree: c.degree || '',
      institution: c.institution || '',
      startDate: c.startDate ? c.startDate.split('T')[0] : '',
      endDate: c.endDate ? c.endDate.split('T')[0] : '',
      current: c.current || false,
      description: c.description || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ degree: '', institution: '', startDate: '', endDate: '', current: false, description: '' });
  };

  const handleDelete = async (id) => {
    if(!confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await api.delete(`/education/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Education deleted');
      load();
    } catch(err) { toast.error('Error deleting'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Education</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Education' : 'Add New Education'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Degree / Course</label><input required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.degree} onChange={e=>setFormData({...formData, degree: e.target.value})} placeholder="e.g. BS Information Technology" /></div>
            <div><label className="block text-sm font-medium mb-1">Institution</label><input required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.institution} onChange={e=>setFormData({...formData, institution: e.target.value})} placeholder="e.g. University Name" /></div>
            <div><label className="block text-sm font-medium mb-1">Start Date</label><input type="date" required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.startDate} onChange={e=>setFormData({...formData, startDate: e.target.value})} /></div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input type="date" disabled={formData.current} required={!formData.current} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400" value={formData.endDate} onChange={e=>setFormData({...formData, endDate: e.target.value})} />
              <div className="mt-2 flex items-center gap-2">
                <input type="checkbox" id="current" checked={formData.current} onChange={e=>setFormData({...formData, current: e.target.checked, endDate: e.target.checked ? '' : formData.endDate})} />
                <label htmlFor="current" className="text-sm font-medium">Currently studying here</label>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description (Optional)</label>
              <textarea rows="3" className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} placeholder="Relevant coursework, achievements, etc." />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">{editId ? 'Update Education' : 'Save Education'}</button>
            {editId && <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-700 px-4 py-2 rounded font-medium hover:bg-slate-300">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Existing Education</h2>
        <div className="space-y-4">
          {educationList.map(c => (
            <div key={c._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-bold">{c.degree}</h3>
                <p className="text-sm text-slate-500">{c.institution}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {c.startDate && new Date(c.startDate).toLocaleDateString()} - {c.current ? 'Present' : (c.endDate && new Date(c.endDate).toLocaleDateString())}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded font-medium">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded font-medium">Delete</button>
              </div>
            </div>
          ))}
          {educationList.length === 0 && <p className="text-slate-500">No education entries found.</p>}
        </div>
      </div>
    </div>
  )
}
