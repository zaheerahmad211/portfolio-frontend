import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';

export default function ManageCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({ title: '', organization: '', issueDate: '', credentialUrl: '', certificateUrl: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = () => api.get('/certifications').then(res => setCertifications(res.data));
  useEffect(() => { load(); }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    setUploading(true);
    try {
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFormData(prev => ({ ...prev, certificateUrl: res.data.url }));
      toast.success('Certificate file uploaded');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/certifications/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Certification updated successfully');
      } else {
        await api.post('/certifications', formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        toast.success('Certification added successfully');
      }
      setFormData({ title: '', organization: '', issueDate: '', credentialUrl: '', certificateUrl: '' });
      setEditId(null);
      load();
    } catch (err) { toast.error('Error saving certification'); }
  };

  const handleEdit = (c) => {
    setEditId(c._id);
    setFormData({
      title: c.title,
      organization: c.organization,
      issueDate: c.issueDate ? c.issueDate.split('T')[0] : '',
      credentialUrl: c.credentialUrl || '',
      certificateUrl: c.certificateUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditId(null);
    setFormData({ title: '', organization: '', issueDate: '', credentialUrl: '', certificateUrl: '' });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      await api.delete(`/certifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Certification deleted');
      load();
    } catch (err) { toast.error('Error deleting'); }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Certifications</h1>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-slate-200">
        <h2 className="text-xl font-bold mb-4">{editId ? 'Edit Certification' : 'Add New Certification'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium mb-1">Title</label><input required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} /></div>
            <div><label className="block text-sm font-medium mb-1">Organization</label><input required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} /></div>
            <div><label className="block text-sm font-medium mb-1">Issue Date</label><input type="date" required className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.issueDate} onChange={e => setFormData({ ...formData, issueDate: e.target.value })} /></div>
            <div><label className="block text-sm font-medium mb-1">Credential URL</label><input className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" value={formData.credentialUrl} onChange={e => setFormData({ ...formData, credentialUrl: e.target.value })} /></div>
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium mb-1">Certificate File (Upload PDF or Image)</label>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} disabled={uploading} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500" />
              {uploading && <p className="text-sm text-blue-600 mt-2 font-medium">⏳ Uploading...</p>}
              {!uploading && formData.certificateUrl && (
                <div className="flex items-center gap-2 mt-2">
                  <p className="text-sm text-green-600 font-medium">✓ File ready</p>
                  <a href={resolveImageUrl(formData.certificateUrl)} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline">Preview</a>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50">{editId ? 'Update Certification' : 'Save Certification'}</button>
            {editId && <button type="button" onClick={handleCancel} className="bg-slate-200 text-slate-700 px-4 py-2 rounded font-medium hover:bg-slate-300">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold mb-4">Existing Certifications</h2>
        <div className="space-y-4">
          {certifications.map(c => (
            <div key={c._id} className="flex justify-between items-center p-4 border rounded">
              <div>
                <h3 className="font-bold">{c.title}</h3>
                <p className="text-sm text-slate-500">{c.organization}</p>
                {c.certificateUrl && (
                  <a href={resolveImageUrl(c.certificateUrl)} target="_blank" rel="noreferrer" className="text-xs text-blue-500 underline">View Certificate</a>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded font-medium">Edit</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:bg-red-50 px-3 py-1 rounded font-medium">Delete</button>
              </div>
            </div>
          ))}
          {certifications.length === 0 && <p className="text-slate-400 text-center py-8">No certifications added yet.</p>}
        </div>
      </div>
    </div>
  );
}
