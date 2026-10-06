import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

/* ── reusable section-header component ── */
function SectionHeader({ title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight inline-block relative">
        {title}
        <span className="block mt-3 mx-auto h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
      </h2>
      {subtitle && (
        <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">{subtitle}</p>
      )}
    </motion.div>
  );
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  const [projects, setProjects]           = useState([]);
  const [settings, setSettings]           = useState({});
  const [certifications, setCertifications] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [skills, setSkills]               = useState([]);
  const [formData, setFormData]           = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending]             = useState(false);

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data)).catch(console.error);
    api.get('/settings').then(r => setSettings(r.data)).catch(console.error);
    api.get('/certifications').then(r => setCertifications(r.data)).catch(console.error);
    api.get('/education').then(r => setEducationList(r.data)).catch(console.error);
    api.get('/skills').then(r => setSkills(r.data)).catch(console.error);
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post('/messages', formData);
      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="overflow-hidden font-sans">

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-[92vh] flex items-center overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center gap-14 relative z-10 w-full">
          {/* text */}
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="flex-1 text-center md:text-left">
            <span className="inline-block bg-blue-500/20 border border-blue-500/40 text-blue-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide">
              👋 Welcome to my Portfolio
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">
              {settings.name || 'Zaheer Ahmed'}
            </h1>
            <h2 className="text-xl md:text-2xl text-blue-400 mb-6 font-semibold">
              {settings.title || 'Website Developer | MERN Stack Developer'}
            </h2>
            <p className="text-base md:text-lg text-slate-300 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
              {settings.bio || 'Professional MERN stack developer crafting modern, responsive, and data-driven digital experiences.'}
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a href="#projects" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 hover:-translate-y-0.5 text-center">
                View My Projects
              </a>
              <a href="#contact" className="border-2 border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-all text-center hover:bg-blue-600/10">
                Contact Me
              </a>
            </div>
          </motion.div>

          {/* avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative shrink-0"
          >
            <div className="w-52 h-52 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-2xl shadow-blue-500/40 bg-slate-800">
              <img
                src={settings.profileImage
                  ? resolveImageUrl(settings.profileImage)
                  : `https://ui-avatars.com/api/?name=Zaheer+Ahmed&size=512&background=2563eb&color=fff&bold=true`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* ring decoration */}
            <div className="absolute -inset-3 rounded-full border-2 border-blue-500/20 animate-pulse pointer-events-none" />
          </motion.div>
        </div>

        {/* bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>


      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section id="about" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-70 pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-70 pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader title="About Me" subtitle="A little background about who I am and what I do." />

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* bio card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/60 border border-slate-100 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-3xl" />
                <div className="pl-4 space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    Hi, I'm <strong className="text-slate-900">Zaheer Ahmed</strong>, a recent{' '}
                    <strong className="text-blue-600">Bachelor of Science in Information Technology</strong> graduate
                    and a <strong className="text-slate-900">Certified MERN Stack Developer</strong> from{' '}
                    <strong className="text-slate-900">NAVTTC</strong>, Pakistan.
                  </p>
                  <p>
                    I'm a{' '}
                    <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                      JavaScript Specialist
                    </strong>{' '}
                    passionate about building modern, responsive websites and turning ideas into engaging digital
                    experiences.
                  </p>
                  <p>
                    Always eager to explore new technologies, sharpen my skills, and create solutions that make an
                    impact.
                  </p>
                </div>

                {/* stats row */}
                <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
                  {[
                    { num: '1+', label: 'Years Exp.' },
                    { num: '10+', label: 'Projects Done' },
                    { num: '5+', label: 'Certifications' },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-2xl font-extrabold text-blue-600">{s.num}</p>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* skill area cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
              className="flex-1 grid sm:grid-cols-2 gap-6"
            >
              {[
                {
                  gradient: 'from-blue-500 to-blue-600',
                  shadow: 'shadow-blue-500/25',
                  border: 'border-blue-100',
                  hoverShadow: 'hover:shadow-blue-100',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                  ),
                  title: 'Frontend',
                  desc: 'React.js, Next.js, Tailwind CSS, Modern JavaScript (ES6+)',
                },
                {
                  gradient: 'from-indigo-500 to-purple-600',
                  shadow: 'shadow-indigo-500/25',
                  border: 'border-indigo-100',
                  hoverShadow: 'hover:shadow-indigo-100',
                  offset: 'sm:mt-10',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                  ),
                  title: 'Backend',
                  desc: 'Node.js, Express.js, MongoDB, REST APIs',
                },
                {
                  gradient: 'from-emerald-500 to-teal-600',
                  shadow: 'shadow-emerald-500/25',
                  border: 'border-emerald-100',
                  hoverShadow: 'hover:shadow-emerald-100',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/></svg>
                  ),
                  title: 'Dev Tools',
                  desc: 'Git, GitHub, VS Code, Postman, Vercel, Netlify',
                },
                {
                  gradient: 'from-orange-500 to-rose-500',
                  shadow: 'shadow-orange-500/25',
                  border: 'border-orange-100',
                  hoverShadow: 'hover:shadow-orange-100',
                  offset: 'sm:mt-10',
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>
                  ),
                  title: 'Databases',
                  desc: 'MongoDB, MySQL basics, REST & JSON',
                },
              ].map(card => (
                <div
                  key={card.title}
                  className={`bg-white p-7 rounded-3xl border ${card.border} shadow-lg ${card.shadow} hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group ${card.offset || ''}`}
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${card.gradient} text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg ${card.shadow} group-hover:scale-110 transition-transform duration-300`}>
                    {card.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 text-xl mb-2">{card.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          TOOLS & TECHNOLOGIES
      ════════════════════════════════════════ */}
      <section id="skills" className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader
            title="Tools & Technologies"
            subtitle="Technologies and tools I work with every day to bring ideas to life."
          />

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill._id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 12) * 0.04 }}
                className="bg-white border border-slate-200 hover:border-blue-400 px-5 py-3 rounded-2xl shadow-md shadow-slate-100 hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-200 flex items-center gap-3 cursor-default group"
              >
                {skill.icon ? (
                  <img src={resolveImageUrl(skill.icon)} alt={skill.name} className="w-7 h-7 object-contain group-hover:scale-110 transition-transform" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {skill.name.charAt(0)}
                  </div>
                )}
                <span className="font-semibold text-slate-700 text-sm">{skill.name}</span>
              </motion.div>
            ))}
            {skills.length === 0 && (
              <p className="text-slate-400 py-8">No skills added yet.</p>
            )}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          PROJECTS
      ════════════════════════════════════════ */}
      <section id="projects" className="py-24 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:18px_18px] opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            title="Featured Projects"
            subtitle="A showcase of my recent work, side projects, and open‑source contributions."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 flex flex-col group transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100/60"
              >
                {/* image */}
                <div className="h-56 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 z-10" />
                  {p.image ? (
                    <img src={resolveImageUrl(p.image)} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="h-14 w-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                  {/* floating badge */}
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">Project</span>
                  </div>
                </div>

                {/* body */}
                <div className="p-7 flex-1 flex flex-col">
                  <h3 className="font-bold text-xl mb-2 text-slate-900 group-hover:text-blue-600 transition-colors">{p.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">{p.description}</p>

                  <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-blue-600/20">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                        Live Demo
                      </a>
                    )}
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-md shadow-slate-900/20">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
            {projects.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-inner">
                <svg className="h-12 w-12 mx-auto mb-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                <p className="text-lg font-medium">No projects added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          EDUCATION
      ════════════════════════════════════════ */}
      <section id="education" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[80px] opacity-60 pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-50 rounded-full blur-[80px] opacity-60 pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionHeader title="Education" subtitle="My academic background and qualifications." />

          <div className="relative">
            {/* vertical timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-400 to-transparent hidden md:block" />

            <div className="space-y-8">
              {educationList.map((edu, i) => (
                <motion.div
                  key={edu._id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="md:pl-16 relative group"
                >
                  {/* timeline dot */}
                  <div className="absolute left-3.5 top-8 w-5 h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg shadow-blue-500/30 hidden md:block group-hover:scale-125 transition-transform duration-300" />

                  <div className="bg-white rounded-3xl p-7 border border-slate-100 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-blue-100/50 hover:border-blue-100 transition-all duration-300 relative overflow-hidden">
                    {/* accent bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-l-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                          </div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{edu.degree}</h3>
                        </div>
                        <p className="text-slate-600 font-semibold ml-13 pl-13">{edu.institution}</p>
                        {edu.description && <p className="text-slate-500 mt-3 text-sm leading-relaxed">{edu.description}</p>}
                      </div>
                      <div className="shrink-0">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 font-bold px-4 py-2 rounded-full text-sm border border-blue-100 shadow-sm whitespace-nowrap">
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
                <div className="py-12 text-center text-slate-400 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-lg font-medium">No education details added yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          CERTIFICATIONS
      ════════════════════════════════════════ */}
      <section id="certifications" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute -left-40 top-20 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            title="My Certifications"
            subtitle="Professional qualifications and achievements I've earned."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {certifications.map((c, i) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="bg-white rounded-3xl p-7 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-blue-100/60 hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden flex flex-col"
              >
                {/* top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-3xl transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                {/* cert image preview if it's an image type */}
                {c.certificateUrl && !c.certificateUrl.includes('application/pdf') && (
                  <div className="w-full h-32 mb-5 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shadow-inner">
                    <img src={resolveImageUrl(c.certificateUrl)} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300 shadow-md shadow-blue-100 group-hover:shadow-blue-500/30 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 15l-2 5L9 9l11 4-5 2z"/><circle cx="12" cy="8" r="4"/></svg>
                  </div>
                  {c.issueDate && (
                    <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full border border-blue-100">
                      {new Date(c.issueDate).getFullYear()}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg text-slate-900 mb-1.5 leading-snug group-hover:text-blue-700 transition-colors">
                  {c.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm mb-5 flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  {c.organization}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  {c.credentialUrl && (
                    <a href={c.credentialUrl} target="_blank" rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group/link">
                      Verify Credential
                      <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                    </a>
                  )}
                  {c.certificateUrl && (
                    <a href={resolveImageUrl(c.certificateUrl)} download target="_blank" rel="noreferrer"
                      className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-white bg-slate-50 hover:bg-slate-900 border border-slate-200 hover:border-slate-900 px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                      Download
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {certifications.length === 0 && (
              <div className="col-span-full py-16 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-inner">
                <p className="text-lg font-medium">No certifications added yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section id="contact" className="py-24 bg-slate-900 text-slate-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">Get In Touch</h2>
            <div className="mx-auto h-1.5 w-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-6" />
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Have a project in mind or just want to say hi? Feel free to reach out using the form or through my social profiles.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* contact info */}
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:w-2/5">
              <div className="bg-slate-800/60 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/60 shadow-2xl shadow-slate-900/50 h-full">
                <h3 className="text-2xl font-bold text-white mb-8">Contact Info</h3>
                <div className="space-y-5">
                  {[
                    {
                      label: 'Email', value: settings.email || 'zaheerastorian@gmail.com',
                      href: `mailto:${settings.email || 'zaheerastorian@gmail.com'}`,
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    },
                    {
                      label: 'Phone', value: settings.phone || '+92 3141709991',
                      href: `tel:${settings.phone || '+92 3141709991'}`,
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    },
                    {
                      label: 'LinkedIn', value: 'Zaheer Ahmed',
                      href: settings.linkedin || 'https://www.linkedin.com/in/zaheer-ahmed-44b5a72a4',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                    },
                    {
                      label: 'GitHub', value: 'GitHub Profile',
                      href: settings.github || 'https://github.com/zaheerahmad211',
                      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                    },
                  ].map(item => (
                    <a key={item.label} href={item.href} target={item.label !== 'Email' && item.label !== 'Phone' ? '_blank' : undefined} rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/50 border border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-900/80 transition-all group">
                      <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg border border-slate-700/50 shrink-0">
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{item.label}</p>
                        <p className="text-white font-medium truncate group-hover:text-blue-300 transition-colors">{item.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* contact form */}
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:w-3/5">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 text-slate-800 h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                        placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                      <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                        placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input type="text" required value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white"
                      placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea required rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-shadow bg-slate-50 focus:bg-white resize-y"
                      placeholder="Write your message here..." />
                  </div>
                  <button type="submit" disabled={sending}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed">
                    {sending ? '⏳ Sending...' : 'Send Message →'}
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