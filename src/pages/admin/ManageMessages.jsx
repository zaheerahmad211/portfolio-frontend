import { useEffect, useState } from 'react';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { Mail, Trash2, Calendar } from 'lucide-react';

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);

  const load = () => {
    api.get('/messages', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setMessages(res.data)).catch(console.error);
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if(!confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.delete(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Message deleted');
      load();
    } catch(err) { 
      toast.error('Error deleting message'); 
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <Mail size={32} className="text-blue-600" />
        Messages & Inquiries
      </h1>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        {messages.length === 0 ? (
          <div className="text-center py-12 flex flex-col items-center justify-center">
            <Mail size={48} className="text-slate-200 mb-4" />
            <p className="text-slate-500 text-lg">No messages received yet.</p>
            <p className="text-slate-400 text-sm">When someone uses your contact form, it will appear here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg._id} className="p-5 border border-slate-200 rounded-xl hover:border-blue-200 hover:shadow-md transition-all bg-slate-50">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-slate-800 mb-1">{msg.subject}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <p className="font-medium text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        From: <span className="text-blue-600">{msg.name}</span>
                      </p>
                      <a href={`mailto:${msg.email}`} className="font-medium text-slate-700 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm hover:text-blue-600 transition-colors">
                        {msg.email}
                      </a>
                      <p className="flex items-center gap-1 text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                        <Calendar size={14} />
                        {new Date(msg.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(msg._id)} 
                    className="text-red-500 hover:bg-red-100 p-2.5 rounded-lg transition-colors flex shrink-0" 
                    title="Delete Message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="p-4 bg-white rounded-lg border border-slate-100 text-slate-700 whitespace-pre-wrap leading-relaxed shadow-inner">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
