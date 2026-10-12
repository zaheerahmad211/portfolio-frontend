import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ManageExperience() {
  const [experienceList, setExperienceList] = useState([]);
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    technologies: ''
  });
  const [editId, setEditId] = useState(null);

  const load = () => {
    api.get('/experience')
      .then(res => setExperienceList(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        technologies: typeof formData.technologies === 'string'
          ? formData.technologies.split(',').map(s => s.trim()).filter(Boolean)
          : formData.technologies
      };

      if (editId) {
        await api.put(`/experience/${editId}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Experience updated successfully');
      } else {
        await api.post('/experience', payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Experience added successfully');
      }
      setFormData({
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: ''
      });
      setEditId(null);
      load();
    } catch (err) {
      toast.error('Error saving experience');
    }
  };

  const handleEdit = (exp) => {
    setEditId(exp._id);
    setFormData({
      position: exp.position || '',
      company: exp.company || '',
      location: exp.location || '',
      startDate: exp.startDate ? exp.startDate.split('T')[0] : '',
      endDate: exp.endDate ? exp.endDate.split('T')[0] : '',
      current: exp.current || false,
      description: exp.description || '',
      technologies: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : (exp.technologies || '')
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      technologies: ''
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience entry?')) return;
    try {
      await api.delete(`/experience/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Experience deleted');
      load();
    } catch (err) {
      toast.error('Error deleting');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Experience</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Experience' : 'Add New Experience'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Position / Title</label>
              <input
                required
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.position}
                onChange={e => setFormData({ ...formData, position: e.target.value })}
                placeholder="e.g. MERN Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Company / Organization</label>
              <input
                required
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.company}
                onChange={e => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Tech Solutions"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g. Remote / City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Technologies (comma separated)</label>
              <input
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.technologies}
                onChange={e => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, Express, MongoDB"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                required
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.startDate}
                onChange={e => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                disabled={formData.current}
                required={!formData.current}
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400"
                value={formData.endDate}
                onChange={e => setFormData({ ...formData, endDate: e.target.value })}
              />
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="exp-current"
                  checked={formData.current}
                  onChange={e => setFormData({
                    ...formData,
                    current: e.target.checked,
                    endDate: e.target.checked ? '' : formData.endDate
                  })}
                />
                <label htmlFor="exp-current" className="text-sm font-medium">Currently working here</label>
              </div>
            </div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description / Key Responsibilities</label>
              <textarea
                rows="3"
                className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key achievements, technologies used, responsibilities..."
              />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 cursor-pointer shadow-sm transition">
              {editId ? 'Update Experience' : 'Save Experience'}
            </button>
            {editId && (
              <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-300 cursor-pointer transition">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Existing Experience</h2>
        <div className="space-y-4">
          {experienceList.map(exp => (
            <div key={exp._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-bold">{exp.position}</h3>
                <p className="text-sm text-slate-600">{exp.company} {exp.location ? `• ${exp.location}` : ''}</p>
                <p className="text-xs text-slate-400 mt-1">
                  {exp.startDate && new Date(exp.startDate).toLocaleDateString()} - {exp.current ? 'Present' : (exp.endDate && new Date(exp.endDate).toLocaleDateString())}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded font-medium cursor-pointer transition">Edit</button>
                <button onClick={() => handleDelete(exp._id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded font-medium cursor-pointer transition">Delete</button>
              </div>
            </div>
          ))}
          {experienceList.length === 0 && <p className="text-slate-500">No experience entries found.</p>}
        </div>
      </div>
    </div>
  );
}
