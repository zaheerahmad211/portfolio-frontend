import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', githubUrl: '', liveUrl: '', image: '' });
  const [editId, setEditId] = useState(null);

  const load = () => api.get('/projects').then(res => setProjects(res.data));
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
      setFormData({...formData, image: res.data.url});
      toast.success('Image uploaded');
    } catch(err) { toast.error('Upload failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/projects/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Project updated successfully');
      } else {
        await api.post('/projects', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Project added successfully');
      }
      setFormData({ title: '', description: '', githubUrl: '', liveUrl: '', image: '' });
      setEditId(null);
      load();
    } catch(err) { toast.error('Error saving project'); }
  };

  const handleEdit = (project) => {
    setEditId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      image: project.image || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ title: '', description: '', githubUrl: '', liveUrl: '', image: '' });
  };

  const handleDelete = async (id) => {
    if(!confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Project deleted');
      load();
    } catch(err) { toast.error('Error deleting'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Projects</h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border p-2 rounded" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Image</label><input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" /></div>
            <div className="col-span-1 md:col-span-2"><label className="block text-sm font-medium mb-1">Description</label><textarea required className="w-full border p-2 rounded" value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">GitHub URL</label><input className="w-full border p-2 rounded" value={formData.githubUrl} onChange={e=>setFormData({...formData, githubUrl: e.target.value})} /></div>
            <div><label className="block text-sm font-medium mb-1">Live URL</label><input className="w-full border p-2 rounded" value={formData.liveUrl} onChange={e=>setFormData({...formData, liveUrl: e.target.value})} /></div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? 'Update Project' : 'Save Project'}</button>
            {editId && <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-700 px-4 py-2 rounded hover:bg-slate-300">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Existing Projects</h2>
        <div className="space-y-4">
          {projects.map(p => (
            <div key={p._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-bold">{p.title}</h3>
                <p className="text-sm text-slate-500">{p.description.substring(0,50)}...</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}