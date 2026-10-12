import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { Award, Eye, X, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function ManageCertifications() {
  const [certifications, setCertifications] = useState([]);
  const [formData, setFormData] = useState({ title: '', organization: '', issueDate: '', credentialUrl: '', certificateUrl: '' });
  const [editId, setEditId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  const load = () => api.get('/certifications').then(res => setCertifications(res.data));
  useEffect(() => { load(); }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };
    if (previewCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [previewCert]);

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

  const isPdfFile = (url) => {
    if (!url) return false;
    const lower = url.toLowerCase();
    return lower.includes('.pdf') || lower.startsWith('data:application/pdf') || lower.includes('application/pdf');
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
              <label className="block text-sm font-medium mb-1">Certificate File (Upload PDF or Image - PNG, JPG, WebP)</label>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} disabled={uploading} className="w-full border p-2 rounded outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer" />
              {uploading && <p className="text-sm text-blue-600 mt-2 font-medium">⏳ Uploading...</p>}
              {!uploading && formData.certificateUrl && (
                <div className="flex items-center gap-3 mt-2.5 p-2.5 bg-blue-50/70 border border-blue-200/80 rounded-lg">
                  <span className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    File Ready
                  </span>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    onClick={() => setPreviewCert({
                      title: formData.title || 'Uploaded Certificate Preview',
                      organization: formData.organization || 'Preview',
                      certificateUrl: formData.certificateUrl,
                      credentialUrl: formData.credentialUrl
                    })}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 bg-white px-2.5 py-1 rounded border border-blue-200 hover:border-blue-300 shadow-2xs transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Preview Certificate
                  </button>
                  <span className="text-xs text-slate-500">
                    ({isPdfFile(formData.certificateUrl) ? 'PDF Document' : 'Image / PNG'})
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" disabled={uploading} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-sm transition">
              {editId ? 'Update Certification' : 'Save Certification'}
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
        <h2 className="text-xl font-bold mb-4">Existing Certifications</h2>
        <div className="space-y-4">
          {certifications.map(c => {
            const hasCert = Boolean(c.certificateUrl || c.image);
            const certUrl = c.certificateUrl || c.image;
            const isPdf = isPdfFile(certUrl);

            return (
              <div key={c._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-xl gap-4 hover:border-blue-200 transition">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    {hasCert && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isPdf ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        {isPdf ? 'PDF' : 'PNG / IMG'}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500">{c.organization}</p>
                  {hasCert && (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setPreviewCert(c)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Certificate
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button onClick={() => handleEdit(c)} className="text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg font-medium cursor-pointer transition border border-transparent hover:border-blue-200">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium cursor-pointer transition border border-transparent hover:border-red-200">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {certifications.length === 0 && <p className="text-slate-400 text-center py-8">No certifications added yet.</p>}
        </div>
      </div>

      {/* ══════════════════════════════════════
          IN-APP CERTIFICATE PREVIEW MODAL
      ══════════════════════════════════════ */}
      {previewCert && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewCert(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="truncate">
                  <h3 className="font-bold text-slate-900 text-base md:text-lg truncate">
                    {previewCert.title || 'Certificate Preview'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate">
                    {previewCert.organization || 'Certification Document'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 rounded-xl transition cursor-pointer shrink-0"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Viewer */}
            <div className="p-4 md:p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-100 min-h-[360px]">
              {(() => {
                const certUrl = previewCert.certificateUrl || previewCert.image;
                const isPdf = isPdfFile(certUrl);

                if (certUrl) {
                  if (isPdf) {
                    return (
                      <div className="w-full flex flex-col items-center gap-3">
                        <div className="w-full h-[62vh] rounded-xl overflow-hidden border border-slate-300 bg-white shadow-md">
                          <object
                            data={resolveImageUrl(certUrl)}
                            type="application/pdf"
                            className="w-full h-full"
                          >
                            <iframe
                              src={resolveImageUrl(certUrl)}
                              title={previewCert.title}
                              className="w-full h-full border-0"
                            />
                            <div className="p-8 text-center bg-white flex flex-col items-center justify-center h-full">
                              <FileText className="w-12 h-12 text-slate-400 mb-3" />
                              <p className="text-slate-700 font-semibold mb-2">PDF Document Ready</p>
                              <a
                                href={resolveImageUrl(certUrl)}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-blue-600 font-bold underline cursor-pointer"
                              >
                                Click here to open PDF in a new tab
                              </a>
                            </div>
                          </object>
                        </div>
                        <div className="flex items-center justify-between w-full text-xs text-slate-600 px-1">
                          <span className="flex items-center gap-1.5 font-medium">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                            PDF Certificate Document
                          </span>
                          <a
                            href={resolveImageUrl(certUrl)}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Open Fullscreen
                          </a>
                        </div>
                      </div>
                    );
                  }

                  // Image / PNG preview
                  return (
                    <div className="relative max-h-[66vh] rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white flex items-center justify-center p-3">
                      <img
                        src={resolveImageUrl(certUrl)}
                        alt={previewCert.title}
                        className="max-h-[60vh] w-auto max-w-full object-contain mx-auto rounded-lg shadow-sm"
                      />
                    </div>
                  );
                }

                return (
                  <div className="text-center py-12 text-slate-500">
                    <FileText className="w-12 h-12 mx-auto text-slate-400 mb-2" />
                    <p className="font-medium">No certificate document file uploaded yet.</p>
                  </div>
                );
              })()}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2">
                {previewCert.credentialUrl && (
                  <a
                    href={previewCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-2 rounded-lg hover:bg-blue-100 transition cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Verify Online
                  </a>
                )}
                {(previewCert.certificateUrl || previewCert.image) && (
                  <>
                    <a
                      href={resolveImageUrl(previewCert.certificateUrl || previewCert.image)}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-200 transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open in New Tab
                    </a>
                    <a
                      href={resolveImageUrl(previewCert.certificateUrl || previewCert.image)}
                      download
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition shadow-xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  </>
                )}
              </div>
              <button
                type="button"
                onClick={() => setPreviewCert(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-100 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

