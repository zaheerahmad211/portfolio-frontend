import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

/* ─── animation variants ─── */
const fadeUp   = { hidden: { opacity: 0, y: 40 },  visible: { opacity: 1, y: 0,  transition: { duration: 0.65 } } };
const fadeLeft = { hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.65 } } };
const fadeRight= { hidden: { opacity: 0, x:  50 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.65 } } };

/* ─── reusable section header ─── */
function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeUp}
      className="text-center mb-20"
    >
      {eyebrow && (
        <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full mb-5">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
        {title}
        <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      </h2>
      {subtitle && (
        <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [projects,        setProjects]        = useState([]);
  const [settings,        setSettings]        = useState({});
  const [certifications,  setCertifications]  = useState([]);
  const [educationList,   setEducationList]   = useState([]);
  const [skills,          setSkills]          = useState([]);
  const [formData,        setFormData]        = useState({ name:'', email:'', subject:'', message:'' });
  const [sending,         setSending]         = useState(false);

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data)).catch(console.error);
    api.get('/settings').then(r => setSettings(r.data)).catch(console.error);
    api.get('/certifications').then(r => setCertifications(r.data)).catch(console.error);
    api.get('/education').then(r => setEducationList(r.data)).catch(console.error);
    api.get('/skills').then(r => setSkills(r.data)).catch(console.error);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault(); setSending(true);
    try {
      await api.post('/messages', formData);
      toast.success('Message sent successfully!');
      setFormData({ name:'', email:'', subject:'', message:'' });
    } catch { toast.error('Failed to send message.'); }
    finally { setSending(false); }
  };

  /* ─── gradient accent colors per index ─── */
  const certColors = [
    { from:'from-blue-500',   to:'to-indigo-600',  bg:'bg-blue-50',   text:'text-blue-600',   border:'border-blue-100',   badge:'bg-blue-600/10 text-blue-700' },
    { from:'from-violet-500', to:'to-purple-600',  bg:'bg-violet-50', text:'text-violet-600', border:'border-violet-100', badge:'bg-violet-600/10 text-violet-700' },
    { from:'from-emerald-500',to:'to-teal-600',    bg:'bg-emerald-50',text:'text-emerald-600',border:'border-emerald-100',badge:'bg-emerald-600/10 text-emerald-700' },
    { from:'from-orange-500', to:'to-rose-500',    bg:'bg-orange-50', text:'text-orange-600', border:'border-orange-100', badge:'bg-orange-600/10 text-orange-700' },
    { from:'from-cyan-500',   to:'to-blue-600',    bg:'bg-cyan-50',   text:'text-cyan-600',   border:'border-cyan-100',   badge:'bg-cyan-600/10 text-cyan-700' },
    { from:'from-pink-500',   to:'to-rose-600',    bg:'bg-pink-50',   text:'text-pink-600',   border:'border-pink-100',   badge:'bg-pink-600/10 text-pink-700' },
  ];

  return (
    <div className="overflow-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden">
        {/* animated blobs */}
        <div className="absolute top-[-10%] left-[-5%]  w-[600px] h-[600px] bg-blue-700/20   rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/30 rounded-full blur-[180px] pointer-events-none" />

        {/* grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-28 w-full relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">

            {/* text */}
            <motion.div initial="hidden" animate="visible" variants={fadeLeft} className="flex-1 text-center md:text-left">
              <motion.span
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
                className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-sm font-semibold px-5 py-2 rounded-full mb-7 backdrop-blur-sm"
              >
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping inline-block" />
                Available for Work
              </motion.span>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[1.05] tracking-tight">
                {settings.name || 'Zaheer Ahmed'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-blue-500" />
                <h2 className="text-lg md:text-xl font-semibold text-blue-400 tracking-wide">
                  {settings.title || 'MERN Stack Developer'}
                </h2>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-blue-500" />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
                {settings.bio || 'Crafting modern, responsive, and data-driven digital experiences with the MERN stack.'}
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <a href="#projects"
                  className="relative group overflow-hidden bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-1 text-center">
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="#contact"
                  className="border-2 border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-bold px-8 py-4 rounded-2xl transition-all text-center hover:bg-blue-600/10 backdrop-blur-sm">
                  Contact Me
                </a>
              </div>
            </motion.div>

            {/* avatar */}
            <motion.div
              initial={{ opacity:0, scale:0.75 }} animate={{ opacity:1, scale:1 }}
              transition={{ duration:0.8, delay:0.2 }}
              className="relative shrink-0"
            >
              {/* decorative rings */}
              <div className="absolute -inset-6 rounded-full border border-blue-500/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute -inset-12 rounded-full border border-blue-500/10 animate-[spin_30s_linear_infinite_reverse]" />
              {/* dots on ring */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/60" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-2 h-2 bg-indigo-400 rounded-full" />

              <div className="w-52 h-52 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/40 bg-slate-800 relative z-10">
                <img
                  src={settings.profileImage
                    ? resolveImageUrl(settings.profileImage)
                    : `https://ui-avatars.com/api/?name=Zaheer+Ahmed&size=512&background=2563eb&color=fff&bold=true`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* wave divider */}
        <div className="absolute bottom-0 left-0 right-0 leading-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L48 69.3C96 59 192 37 288 32C384 27 480 37 576 42.7C672 48 768 48 864 42.7C960 37 1056 27 1152 26.7C1248 27 1344 37 1392 42.7L1440 48V80H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>


      {/* ══════════════════════════════════════
          ABOUT
      ══════════════════════════════════════ */}
      <section id="about" className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="Who I Am" title="About Me" subtitle="Passionate developer building elegant solutions from the ground up." />

          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* bio */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeLeft} className="flex-1">
              <div className="relative bg-white rounded-[2rem] p-9 shadow-2xl shadow-slate-200/70 border border-slate-100 overflow-hidden">
                {/* corner accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-[6rem]" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-50 to-transparent rounded-tr-[4rem]" />
                <div className="absolute left-0 top-8 bottom-8 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-r-full" />

                <div className="pl-6 space-y-5 text-slate-600 text-[1.05rem] leading-relaxed relative z-10">
                  <p>
                    Hi! I'm <span className="font-extrabold text-slate-900">Zaheer Ahmed</span>, a{' '}
                    <span className="text-blue-600 font-bold">Bachelor of Science in Information Technology</span> graduate
                    and a <span className="font-bold text-slate-900">Certified MERN Stack Developer</span> from{' '}
                    <span className="font-bold text-slate-900">NAVTTC</span>, Pakistan.
                  </p>
                  <p>
                    I specialise in building full-stack web applications — from pixel-perfect frontends to
                    scalable backends — using <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">MongoDB, Express, React & Node.js</span>.
                  </p>
                  <p>
                    Driven by curiosity and a relentless pursuit of excellence, I turn complex problems
                    into clean, user-friendly digital experiences.
                  </p>
                </div>

                {/* tag chips */}
                <div className="mt-8 pl-6 flex flex-wrap gap-2 relative z-10">
                  {['React.js','Node.js','MongoDB','Express.js','Tailwind CSS','JavaScript','REST API','Git & GitHub'].map(tag => (
                    <span key={tag} className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-200 transition-colors cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* specialty cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeRight} className="flex-1 grid grid-cols-2 gap-5">
              {[
                { gradient:'from-blue-500 to-blue-700',    glow:'shadow-blue-500/20', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>,    title:'Frontend Dev',  desc:'React · Next.js · Tailwind', offset:'' },
                { gradient:'from-violet-500 to-purple-700',glow:'shadow-violet-500/20',icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>, title:'Backend Dev',  desc:'Node · Express · MongoDB', offset:'mt-10' },
                { gradient:'from-emerald-500 to-teal-700', glow:'shadow-emerald-500/20',icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>,title:'UI/UX Design', desc:'Figma · Responsive Design', offset:'' },
                { gradient:'from-orange-500 to-rose-600',  glow:'shadow-orange-500/20', icon:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>, title:'API & DevOps', desc:'REST · Git · Vercel · CI', offset:'mt-10' },
              ].map(c => (
                <div key={c.title} className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-xl ${c.glow} hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${c.offset}`}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg ${c.glow} group-hover:scale-110 transition-transform duration-300`}>
                    {c.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{c.title}</h3>
                  <p className="text-slate-400 text-sm">{c.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          TOOLS & TECHNOLOGIES
      ══════════════════════════════════════ */}
      <section id="skills" className="py-28 bg-white relative overflow-hidden">
        {/* subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="My Stack" title="Tools & Technologies" subtitle="Technologies I work with every day to bring ideas to life." />

          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill._id}
                initial={{ opacity:0, scale:0.75 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.3, delay:(i % 14) * 0.04 }}
                whileHover={{ y:-4, scale:1.05 }}
                className="relative group bg-white border border-slate-200 hover:border-blue-400 px-5 py-3 rounded-2xl shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-blue-100 transition-all duration-200 flex items-center gap-3 cursor-default overflow-hidden"
              >
                {/* hover shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center gap-3">
                  {skill.icon ? (
                    <img src={resolveImageUrl(skill.icon)} alt={skill.name} className="w-7 h-7 object-contain" />
                  ) : (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {skill.name.charAt(0)}
                    </div>
                  )}
                  <span className="font-semibold text-slate-700 text-sm group-hover:text-blue-700 transition-colors">{skill.name}</span>
                </div>
              </motion.div>
            ))}
            {skills.length === 0 && <p className="text-slate-400 py-8">No skills added yet.</p>}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════ */}
      <section id="projects" className="py-28 bg-slate-900 relative overflow-hidden">
        {/* background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* white header on dark */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="text-center mb-20">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-5">
              My Work
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Featured Projects
              <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            </h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">A showcase of my recent work and open‑source contributions.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity:0, y:50 }}
                whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true, margin:'-40px' }}
                transition={{ duration:0.5, delay:(i % 3) * 0.1 }}
                whileHover={{ y:-8 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-700/50 hover:border-blue-500/40 shadow-xl shadow-slate-900/50 hover:shadow-2xl hover:shadow-blue-900/40 flex flex-col group transition-all duration-300"
              >
                <div className="h-52 bg-slate-700/50 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent z-10" />
                  {p.image ? (
                    <img src={resolveImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-16 w-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Project</span>
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{p.description}</p>

                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700/50">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        Live Demo
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-slate-700/50">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-3xl">
                <p className="text-lg font-medium">No projects added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          EDUCATION
      ══════════════════════════════════════ */}
      <section id="education" className="py-28 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-50 rounded-full blur-[90px] opacity-80 pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-indigo-50 rounded-full blur-[90px] opacity-80 pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="Background" title="Education" subtitle="My academic journey and qualifications." />

          <div className="relative">
            {/* timeline spine */}
            <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-400 to-purple-300 hidden md:block rounded-full" />

            <div className="space-y-7">
              {educationList.map((edu, i) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity:0, x:-40 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true, margin:'-30px' }}
                  transition={{ duration:0.5, delay: i * 0.12 }}
                  className="md:pl-20 relative group"
                >
                  {/* timeline node */}
                  <div className="absolute left-[26px] top-1/2 -translate-y-1/2 hidden md:flex">
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-blue-500 shadow-lg shadow-blue-500/30 group-hover:scale-125 group-hover:border-indigo-500 transition-all duration-300 z-10" />
                  </div>

                  <div className="bg-white rounded-[1.75rem] p-7 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all duration-300 relative overflow-hidden group">
                    {/* animated gradient bar */}
                    <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center shrink-0 group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300">
                          <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">{edu.degree}</h3>
                          <p className="text-slate-500 font-semibold mt-0.5">{edu.institution}</p>
                          {edu.description && <p className="text-slate-400 text-sm mt-3 leading-relaxed">{edu.description}</p>}
                        </div>
                      </div>
                      <div className="shrink-0 self-start sm:self-center">
                        <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-bold px-5 py-2.5 rounded-full text-sm border border-blue-100 shadow-sm whitespace-nowrap">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          {edu.startDate && new Date(edu.startDate).getFullYear()} –{' '}
                          {edu.current ? 'Present' : (edu.endDate && new Date(edu.endDate).getFullYear())}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {educationList.length === 0 && (
                <div className="py-14 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="font-medium text-lg">No education details added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          CERTIFICATIONS
      ══════════════════════════════════════ */}
      <section id="certifications" className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -left-40 top-20  w-96 h-96 bg-blue-50/80   rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-indigo-50/80 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="Achievements" title="My Certifications" subtitle="Professional qualifications and credentials I've earned." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((c, i) => {
              const col = certColors[i % certColors.length];
              return (
                <motion.div
                  key={c._id}
                  initial={{ opacity:0, y:30 }}
                  whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true, margin:'-30px' }}
                  transition={{ duration:0.5, delay:(i % 3) * 0.1 }}
                  whileHover={{ y:-8, scale:1.01 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {/* colored header band */}
                  <div className={`h-2 w-full bg-gradient-to-r ${col.from} ${col.to}`} />

                  <div className="p-8 flex-1 flex flex-col">
                    {/* icon + year row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 ${col.bg} ${col.text} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                          <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                        </svg>
                      </div>
                      {c.issueDate && (
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${col.badge} border ${col.border}`}>
                          {new Date(c.issueDate).getFullYear()}
                        </span>
                      )}
                    </div>

                    {/* title */}
                    <h3 className="font-extrabold text-lg text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {c.title}
                    </h3>

                    {/* organization */}
                    <div className="flex items-center gap-2 mb-6">
                      <svg className="h-4 w-4 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                      <span className="text-slate-500 font-semibold text-sm">{c.organization}</span>
                    </div>

                    {/* actions */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                      {c.credentialUrl && (
                        <a href={c.credentialUrl} target="_blank" rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors group/link">
                          Verify Credential
                          <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        </a>
                      )}
                      {c.certificateUrl && (
                        <a href={resolveImageUrl(c.certificateUrl)} download target="_blank" rel="noreferrer"
                          className={`ml-auto inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r ${col.from} ${col.to} px-5 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
            {certifications.length === 0 && (
              <div className="col-span-full py-20 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="font-medium text-lg">No certifications added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" className="py-28 bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0    right-0 w-[600px] h-[600px] bg-blue-600/10   rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0  w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeUp} className="text-center mb-20">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-5">
              Let's Talk
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              Get In Touch
              <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
            </h2>
            <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">
              Have a project in mind? Let's build something great together.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeLeft} className="lg:w-2/5">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-700/50 shadow-2xl h-full">
                <h3 className="text-2xl font-extrabold text-white mb-8">Contact Details</h3>
                <div className="space-y-4">
                  {[
                    { label:'Email',    value: settings.email   || 'zaheerastorian@gmail.com', href:`mailto:${settings.email||'zaheerastorian@gmail.com'}`, color:'from-blue-500 to-indigo-500',   icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg> },
                    { label:'Phone',    value: settings.phone   || '+92 3141709991',           href:`tel:${settings.phone||'+923141709991'}`,                color:'from-violet-500 to-purple-500',  icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
                    { label:'LinkedIn', value:'Zaheer Ahmed',                                   href: settings.linkedin || 'https://www.linkedin.com/in/zaheer-ahmed-44b5a72a4', color:'from-sky-500 to-blue-500', blank:true, icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg> },
                    { label:'GitHub',   value:'GitHub Profile',                                  href: settings.github  || 'https://github.com/zaheerahmad211',                   color:'from-slate-400 to-slate-600', blank:true, icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> },
                    { label:'Vercel',   value:'Vercel Profile',                                 href: settings.vercel || 'https://vercel.com/zaheers-projects-7e59edf9', color:'from-purple-500 to-pink-500', blank:true, icon:<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M19 10l-7 7-7-7"/></svg> }
                  ].map(item => (
                    <a key={item.label} href={item.href} target={item.blank ? '_blank' : undefined} rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40 hover:border-slate-500/60 hover:bg-slate-900/80 transition-all group">
                      <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</p>
                        <p className="text-slate-200 font-semibold truncate group-hover:text-white transition-colors text-sm">{item.value}</p>
                      </div>
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-300 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeRight} className="lg:w-3/5">
              <div className="bg-white p-9 rounded-[2rem] shadow-2xl border border-slate-100 text-slate-800 h-full">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-7">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {[
                      { label:'Full Name', placeholder:'Your full name', type:'text', key:'name' },
                      { label:'Email',     placeholder:'your@email.com', type:'email', key:'email' },
                    ].map(f => (
                      <div key={f.key}>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">{f.label}</label>
                        <input type={f.type} required value={formData[f.key]}
                          onChange={e => setFormData({ ...formData, [f.key]: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900"
                          placeholder={f.placeholder} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Subject</label>
                    <input type="text" required value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                    <textarea required rows="5" value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y text-slate-900"
                      placeholder="Tell me about your project..." />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-lg py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 disabled:opacity-60 disabled:cursor-not-allowed group">
                    <span className="relative z-10">{sending ? '⏳ Sending...' : 'Send Message →'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}