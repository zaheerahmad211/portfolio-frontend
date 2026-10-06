import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState({});
  const [certifications, setCertifications] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skills, setSkills] = useState([]);
  
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    api.get('/projects').then(res => setProjects(res.data)).catch(console.error);
    api.get('/settings').then(res => setSettings(res.data)).catch(console.error);
    api.get('/certifications').then(res => setCertifications(res.data)).catch(console.error);
    api.get('/education').then(res => setEducationList(res.data)).catch(console.error);
    api.get('/skills').then(res => setSkills(res.data)).catch(console.error);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/messages', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch(err) {
      toast.error('Failed to send message.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20 md:py-32 flex items-center justify-center min-h-[90vh]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-12 mt-8 md:mt-0">
          <motion.div 
            initial="hidden" animate="visible" variants={fadeInUp}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{settings.name || 'Zaheer Ahmed'}</h1>
            <h2 className="text-xl md:text-3xl text-blue-400 mb-6 font-medium">{settings.title || 'Website Developer | MERN Stack Developer'}</h2>
            <p className="text-base md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed">
              {settings.bio || 'Professional MERN stack developer crafting modern, responsive, and data-driven digital experiences.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
              <a href="#projects" className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 transition text-center shadow-lg hover:shadow-blue-600/30">View My Projects</a>
              <a href="#contact" className="w-full sm:w-auto border-2 border-slate-600 text-slate-300 px-8 py-3 rounded-md font-medium hover:bg-slate-800 transition text-center hover:border-slate-500">Contact Me</a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shrink-0 bg-slate-800"
          >
            <img 
              src={settings.profileImage ? resolveImageUrl(settings.profileImage) : "https://ui-avatars.com/api/?name=Zaheer+Ahmed&size=512&background=2563eb&color=fff&bold=true"} 
              alt="Zaheer Ahmed Profile" 
              className="w-full h-full object-cover" 
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative overflow-hidden">
        {/* Soft background glow effects */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold relative inline-block text-slate-900 tracking-tight">
              About Me
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1 space-y-6 text-lg text-slate-600 leading-relaxed"
            >
              <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative">
                <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-3xl"></div>
                <p className="mb-4">
                  Hi, I'm <strong className="text-slate-900 font-bold">Zaheer Ahmed</strong>, a recent <strong className="text-blue-600">Bachelor of Science in Information Technology</strong> graduate and a <strong className="text-slate-900">Certified MERN Stack Developer</strong> from <strong className="text-slate-900">NAVTTC</strong> (National Vocational & Technical Training Commission), Pakistan.
                </p>
                <p className="mb-4">
                  I'm a <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">JavaScript Specialist</strong> passionate about building modern, responsive websites and turning ideas into engaging digital experiences.
                </p>
                <p>
                  I'm always eager to explore new technologies, sharpen my skills, and create solutions that make an impact. My journey in tech is driven by curiosity and a relentless pursuit of excellence.
                </p>
              </div>
            </motion.div>
            
            {/* Visual Skill Cards */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 grid sm:grid-cols-2 gap-6 w-full"
            >
              <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.1)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-blue-100"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-2xl">Frontend</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">React.js, Tailwind CSS, Next.js, Modern JavaScript</p>
                </div>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(99,102,241,0.1)] hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden sm:mt-12">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-100"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-3 text-2xl">Backend</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">Node.js, Express.js, MongoDB, RESTful APIs</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section id="skills" className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold relative inline-block text-slate-900">
              Tools & Technologies
            </h2>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">Here are the technologies and tools I work with everyday to bring ideas to life.</p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 10) * 0.05 }}
                className="bg-white px-6 py-3.5 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-200 hover:border-blue-400 hover:shadow-[0_4px_15px_-3px_rgba(6,81,237,0.2)] hover:-translate-y-1 transition-all font-semibold text-slate-700 flex items-center gap-3 cursor-default"
              >
                {skill.icon ? (
                  <img src={resolveImageUrl(skill.icon)} alt={skill.name} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                )}
                {skill.name}
              </motion.div>
            ))}
            {skills.length === 0 && <p className="text-slate-500">No skills added yet.</p>}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight inline-block relative">
              Featured Projects
            </h2>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg">A showcase of my recent work, side projects, and open source contributions.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((p, index) => (
              <motion.div 
                key={p._id} 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 overflow-hidden border border-slate-100 flex flex-col transition-all duration-300 group"
              >
                <div className="h-64 bg-slate-100 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                  {p.image ? (
                    <img src={resolveImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col relative bg-white">
                  <div className="absolute -top-10 right-6 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/40 z-20 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </div>
                  <h3 className="font-bold text-2xl mb-3 text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-slate-600 text-base mb-8 line-clamp-3 flex-1 leading-relaxed">{p.description}</p>
                  
                  <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        Live Demo
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-700 border-2 border-slate-200 py-2.5 rounded-xl text-sm font-semibold hover:border-slate-900 hover:text-slate-900 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-lg">No projects added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight inline-block relative">
              Education
            </h2>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg">My academic background and qualifications.</p>
          </motion.div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {educationList.map((edu, index) => (
              <motion.div 
                key={edu._id} 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(59,130,246,0.1)] hover:border-blue-100 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute left-0 top-0 w-1.5 h-full bg-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{edu.degree}</h3>
                    <p className="text-lg text-slate-600 font-medium mt-1">{edu.institution}</p>
                    {edu.description && <p className="text-slate-600 mt-4 leading-relaxed">{edu.description}</p>}
                  </div>
                  <div className="shrink-0">
                    <span className="inline-block bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-full text-sm border border-blue-100 shadow-sm">
                      {edu.startDate && new Date(edu.startDate).getFullYear()} - {edu.current ? 'Present' : (edu.endDate && new Date(edu.endDate).getFullYear())}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
            {educationList.length === 0 && (
              <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-lg">No education details added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -left-40 top-40 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-40 bottom-10 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight inline-block relative">
              My Certifications
            </h2>
            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg">Professional qualifications and achievements I've earned.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((c, index) => (
              <motion.div 
                key={c._id} 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgb(59,130,246,0.1)] hover:border-blue-100 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-blue-500/30 group-hover:-rotate-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/></svg>
                  </div>
                  {c.issueDate && (
                    <span className="bg-slate-50 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-100">
                      {new Date(c.issueDate).getFullYear()}
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-xl mb-2 text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">{c.title}</h3>
                <p className="text-slate-600 font-medium mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  {c.organization}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-slate-50">
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 font-semibold text-sm hover:text-blue-800 transition-colors group/link">
                      Verify Credential 
                      <svg className="w-4 h-4 transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  )}
                  {c.certificateUrl && (
                    <a href={resolveImageUrl(c.certificateUrl)} download target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-700 font-semibold text-sm hover:text-white hover:bg-slate-900 transition-all bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm hover:shadow-md ml-auto">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {certifications.length === 0 && (
              <div className="col-span-full py-12 text-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-lg">No certifications added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-slate-300 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-white tracking-tight">Get In Touch</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Have a project in mind or just want to say hi? Feel free to reach out using the form or through my social profiles.</p>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact Information (Left Column) */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-1/3 space-y-8"
            >
              <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-colors">
                <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-medium mb-1">Email</p>
                      <a href={`mailto:${settings.email || 'zaheerastorian@gmail.com'}`} className="text-white hover:text-blue-400 font-medium transition-colors block truncate">
                        {settings.email || 'zaheerastorian@gmail.com'}
                      </a>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400 font-medium mb-1">Phone</p>
                      <a href={`tel:${settings.phone || '+92 3141709991'}`} className="text-white hover:text-blue-400 font-medium transition-colors">
                        {settings.phone || '+92 3141709991'}
                      </a>
                    </div>
                  </div>

                  {/* LinkedIn */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-medium mb-1">LinkedIn</p>
                      <a href={settings.linkedin || 'https://www.linkedin.com/in/zaheer-ahmed-44b5a72a4'} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 font-medium transition-colors block truncate">
                        Zaheer Ahmed
                      </a>
                    </div>
                  </div>

                  {/* GitHub */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-medium mb-1">GitHub</p>
                      <a href={settings.github || 'https://github.com/zaheerahmad211'} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 font-medium transition-colors block truncate">
                        GitHub Profile
                      </a>
                    </div>
                  </div>

                  {/* Vercel */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L24 22H0L12 2Z"/></svg>
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-medium mb-1">Vercel</p>
                      <a href={settings.vercel || 'https://vercel.com/zaheers-projects-7e59edf9'} target="_blank" rel="noreferrer" className="text-white hover:text-blue-400 font-medium transition-colors block truncate">
                        Vercel Profile
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form (Right Column) */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:w-2/3"
            >
              <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-800 text-slate-800 h-full">
                <form onSubmit={handleContactSubmit} className="space-y-6 h-full flex flex-col">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input type="text" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow" placeholder="How can I help you?" />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea required rows="6" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full h-full min-h-[150px] border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow resize-y" placeholder="Write your message here..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mt-auto">Send Message</button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}