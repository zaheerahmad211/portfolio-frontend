import { useEffect, useState } from 'react';
import api, { resolveImageUrl } from '../../utils/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  ExternalLink,
  Award,
  GraduationCap,
  Briefcase,
  Calendar,
  Building2,
  MapPin,
  Eye,
  Download,
  X,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Sparkles,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

/* ─── reusable section header ─── */
function SectionHeader({ eyebrow, title, subtitle, dark = false, showLine = true }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      className="text-center mb-16 md:mb-20"
    >
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-4 border ${
            dark
              ? 'text-blue-400 bg-blue-500/10 border-blue-500/20'
              : 'text-blue-600 bg-blue-50 border-blue-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {eyebrow}
        </span>
      )}
      <h2
        className={`text-3xl md:text-5xl font-extrabold tracking-tight ${
          dark ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
        {showLine && (
          <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
        )}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-2xl mx-auto text-base md:text-lg leading-relaxed ${
            dark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

/* ─── fallback defaults for authentic presentation ─── */
const defaultProjects = [
  {
    _id: 'p-1',
    title: 'E-Commerce Buy & Sell Platform',
    category: 'Full Stack Web App',
    description: 'A comprehensive modern e-commerce platform featuring dynamic product catalogs, advanced filtering, cart and checkout flows, Stripe payment integration, and administrative order management.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/zaheerahmad211'
  },
  {
    _id: 'p-2',
    title: 'Enterprise MERN ERP System',
    category: 'Enterprise App',
    description: 'A multi-module enterprise resource planning system designed to streamline internal company operations, inventory tracking, employee records, role-based access control, and reporting analytics.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Zustand', 'REST APIs'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/zaheerahmad211'
  },
  {
    _id: 'p-3',
    title: 'Super Admin Analytics Dashboard',
    category: 'Dashboard & CMS',
    description: 'A secure, feature-packed admin control panel with interactive metric charts, user moderation, database CRUD operations, file uploads, and JWT-authenticated session security.',
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/zaheerahmad211'
  }
];

const defaultExperiences = [
  {
    _id: 'exp-1',
    position: 'Full Stack MERN Developer',
    company: 'Independent & Freelance',
    location: 'Remote',
    startDate: '2023-01-01',
    current: true,
    description: 'Designed and engineered full-stack web applications from architecture to deployment. Built robust REST APIs with Node.js/Express, integrated MongoDB databases, and crafted responsive, performant user interfaces with React and Tailwind CSS.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'JWT', 'REST API']
  },
  {
    _id: 'exp-2',
    position: 'Certified MERN Stack Developer (Trainee)',
    company: 'NAVTTC Pakistan',
    location: 'Pakistan',
    startDate: '2023-01-01',
    endDate: '2023-07-01',
    current: false,
    description: 'Underwent intensive practical technical training covering enterprise MERN stack development, secure authentication, database indexing, state management, and agile software development workflows.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript ES6+', 'Git & GitHub']
  },
  {
    _id: 'exp-3',
    position: 'Frontend Web Developer',
    company: 'Tech Solutions & Client Projects',
    location: 'Remote / Pakistan',
    startDate: '2022-03-01',
    endDate: '2022-12-31',
    current: false,
    description: 'Developed modern web interfaces, converted Figma/wireframe designs into clean React components, integrated RESTful third-party APIs, and optimized page speed and cross-browser responsiveness.',
    technologies: ['React.js', 'JavaScript', 'HTML5/CSS3', 'Tailwind CSS', 'Responsive Design']
  }
];

const defaultEducation = [
  {
    _id: 'edu-1',
    degree: 'Bachelor of Science in Information Technology (BSIT)',
    institution: 'University Graduate',
    startDate: '2019-09-01',
    endDate: '2023-08-01',
    current: false,
    description: 'Rigorous curriculum covering Software Engineering, Database Management Systems, Data Structures, Computer Networks, and Full-Stack Web Technologies with strong academic distinction.',
    technologies: ['Software Engineering', 'Database Systems', 'Data Structures', 'Web Tech']
  },
  {
    _id: 'edu-2',
    degree: 'MERN Stack Development Certification',
    institution: 'National Vocational and Technical Training Commission (NAVTTC)',
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    current: false,
    description: 'Specialized national government certification program focusing on modern full-stack web architectures, practical capstone projects, and industry-standard coding practices.',
    technologies: ['Full Stack Web', 'REST APIs', 'NoSQL Databases', 'Cloud Deployment']
  }
];

const defaultCertifications = [
  {
    _id: 'cert-1',
    title: 'Certified MERN Stack Developer',
    organization: 'NAVTTC (Government of Pakistan)',
    issueDate: '2023-07-15',
    credentialUrl: 'https://navttc.gov.pk',
    description: 'Official national certification in Full Stack Web Development with MongoDB, Express.js, React, and Node.js.'
  },
  {
    _id: 'cert-2',
    title: 'Full-Stack Web Development Specialization',
    organization: 'Online Professional Certification',
    issueDate: '2023-03-10',
    credentialUrl: 'https://coursera.org',
    description: 'Comprehensive mastery of frontend state management, modern asynchronous JavaScript, REST APIs, and database modeling.'
  },
  {
    _id: 'cert-3',
    title: 'Modern React & Component Architecture',
    organization: 'Udemy / Professional Academy',
    issueDate: '2022-11-20',
    credentialUrl: 'https://udemy.com',
    description: 'In-depth specialization in React hooks, custom state management, performance optimization, and responsive design systems.'
  }
];

export default function Home() {
  const [projects,        setProjects]        = useState([]);
  const [settings,        setSettings]        = useState({});
  const [certifications,  setCertifications]  = useState([]);
  const [educationList,   setEducationList]   = useState([]);
  const [experienceList,  setExperienceList]  = useState([]);
  const [skills,          setSkills]          = useState([]);
  const [formData,        setFormData]        = useState({ name:'', email:'', subject:'', message:'' });
  const [sending,         setSending]         = useState(false);
  const [selectedCert,    setSelectedCert]    = useState(null);
  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleProjectExpand = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    api.get('/projects').then(r => setProjects(r.data)).catch(console.error);
    api.get('/settings').then(r => setSettings(r.data)).catch(console.error);
    api.get('/certifications').then(r => setCertifications(r.data)).catch(console.error);
    api.get('/education').then(r => setEducationList(r.data)).catch(console.error);
    api.get('/experience').then(r => setExperienceList(r.data)).catch(console.error);
    api.get('/skills').then(r => setSkills(r.data)).catch(console.error);
  }, []);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

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

  /* ─── unified accent color palettes ─── */
  const cardThemes = [
    {
      from: 'from-blue-500',
      to: 'to-indigo-600',
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      badge: 'bg-blue-600/10 text-blue-700',
      hoverBorder: 'hover:border-blue-200',
      glow: 'shadow-blue-500/10'
    },
    {
      from: 'from-violet-500',
      to: 'to-purple-600',
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
      badge: 'bg-violet-600/10 text-violet-700',
      hoverBorder: 'hover:border-violet-200',
      glow: 'shadow-violet-500/10'
    },
    {
      from: 'from-emerald-500',
      to: 'to-teal-600',
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      badge: 'bg-emerald-600/10 text-emerald-700',
      hoverBorder: 'hover:border-emerald-200',
      glow: 'shadow-emerald-500/10'
    },
    {
      from: 'from-orange-500',
      to: 'to-rose-500',
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      badge: 'bg-orange-600/10 text-orange-700',
      hoverBorder: 'hover:border-orange-200',
      glow: 'shadow-orange-500/10'
    },
    {
      from: 'from-cyan-500',
      to: 'to-blue-600',
      bg: 'bg-cyan-50',
      text: 'text-cyan-600',
      border: 'border-cyan-100',
      badge: 'bg-cyan-600/10 text-cyan-700',
      hoverBorder: 'hover:border-cyan-200',
      glow: 'shadow-cyan-500/10'
    },
    {
      from: 'from-pink-500',
      to: 'to-rose-600',
      bg: 'bg-pink-50',
      text: 'text-pink-600',
      border: 'border-pink-100',
      badge: 'bg-pink-600/10 text-pink-700',
      hoverBorder: 'hover:border-pink-200',
      glow: 'shadow-pink-500/10'
    }
  ];

  const displayedProjects = projects.length > 0 ? projects : defaultProjects;
  const displayedCertifications = certifications.length > 0 ? certifications : defaultCertifications;
  const displayedEducation = educationList.length > 0 ? educationList : defaultEducation;
  const displayedExperiences = experienceList.length > 0 ? experienceList : defaultExperiences;

  return (
    <div className="overflow-hidden bg-slate-900 text-slate-100 selection:bg-blue-500 selection:text-white">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen bg-slate-900 flex items-center overflow-hidden pt-20">
        {/* animated glowing orbs */}
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-700/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-700/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/30 rounded-full blur-[180px] pointer-events-none" />

        {/* tech grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 py-24 w-full relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-16">

            {/* text */}
            <motion.div initial="hidden" animate="visible" variants={fadeLeft} className="flex-1 text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-500/30 text-blue-300 text-sm font-semibold px-5 py-2 rounded-full mb-7 backdrop-blur-sm shadow-inner"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                Available for Full-Time & Freelance
              </motion.span>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-4 leading-[1.05] tracking-tight">
                {settings.name || 'Zaheer Ahmed'}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-6">
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-blue-500" />
                <h2 className="text-lg md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 tracking-wide">
                  {settings.title || 'MERN Stack Developer'}
                </h2>
                <div className="h-px flex-1 max-w-[60px] bg-gradient-to-l from-transparent to-blue-500" />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
                {settings.bio || 'Crafting scalable, high-performance web applications and sleek digital experiences with modern MERN architecture.'}
              </p>

              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <motion.a
                  href="#projects"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 text-center inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="relative z-10">Explore Projects</span>
                  <Code2 className="w-4 h-4 relative z-10 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="border-2 border-slate-700 hover:border-blue-500 text-slate-300 hover:text-white font-bold px-8 py-4 rounded-2xl transition-all text-center hover:bg-blue-600/10 backdrop-blur-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  Contact Me
                  <ArrowUpRight className="w-4 h-4" />
                </motion.a>
              </div>
            </motion.div>

            {/* avatar with floating levitation & floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative shrink-0"
            >
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="relative"
              >
                {/* decorative rings */}
                <div className="absolute -inset-6 rounded-full border border-blue-500/20 animate-[spin_24s_linear_infinite]" />
                <div className="absolute -inset-12 rounded-full border border-indigo-500/10 animate-[spin_36s_linear_infinite_reverse]" />
                {/* dots on ring */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-3.5 h-3.5 bg-blue-500 rounded-full shadow-lg shadow-blue-500/60" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6 w-2.5 h-2.5 bg-indigo-400 rounded-full" />

                <div className="w-56 h-56 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500/80 shadow-2xl shadow-blue-500/30 bg-slate-800 relative z-10 group">
                  <img
                    src={
                      settings.profileImage
                        ? resolveImageUrl(settings.profileImage)
                        : `https://ui-avatars.com/api/?name=Zaheer+Ahmed&size=512&background=2563eb&color=fff&bold=true`
                    }
                    alt="Zaheer Ahmed"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* floating badge top-left */}
                <motion.div
                  animate={{ y: [-4, 6, -4] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-3 -left-4 md:-left-6 bg-slate-900/95 backdrop-blur-md border border-blue-500/40 text-blue-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 z-20 pointer-events-none"
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  MERN Specialist
                </motion.div>

                {/* floating badge bottom-right */}
                <motion.div
                  animate={{ y: [6, -4, 6] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-3 -right-4 md:-right-6 bg-slate-900/95 backdrop-blur-md border border-indigo-500/40 text-indigo-300 text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 z-20 pointer-events-none"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Clean Code
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          ABOUT (SEAMLESS TOP - NO LINE)
      ══════════════════════════════════════ */}
      <section id="about" className="py-28 bg-slate-50 text-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/40 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader
            showLine={false}
            eyebrow="Who I Am"
            title="About Me"
            subtitle="Passionate developer building elegant, production-grade web solutions."
          />

          <div className="flex flex-col lg:flex-row gap-14 items-start">
            {/* bio */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeLeft} className="flex-1">
              <div className="relative bg-white rounded-[2rem] p-9 shadow-2xl shadow-slate-200/70 border border-slate-100 overflow-hidden">
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
                    I specialise in building full-stack web applications — from responsive and accessible frontends to
                    scalable and resilient backends — using <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">MongoDB, Express, React & Node.js</span>.
                  </p>
                  <p>
                    Driven by curiosity and engineering excellence, I turn challenging business requirements into clean, high-performance, and maintainable software systems.
                  </p>
                </div>

                {/* tag chips */}
                <div className="mt-8 pl-6 flex flex-wrap gap-2 relative z-10">
                  {['React.js','Node.js','MongoDB','Express.js','Tailwind CSS','JavaScript (ES6+)','REST APIs','State Management','Git & GitHub'].map(tag => (
                    <motion.span
                      key={tag}
                      whileHover={{ scale: 1.08, y: -2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-200 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* specialty cards */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeRight} className="flex-1 grid grid-cols-2 gap-5">
              {[
                { gradient:'from-blue-500 to-blue-700', glow:'shadow-blue-500/20', icon:<Code2 className="w-7 h-7" />, title:'Frontend Dev', desc:'React · Next.js · Tailwind', offset:'' },
                { gradient:'from-violet-500 to-purple-700', glow:'shadow-violet-500/20', icon:<Building2 className="w-7 h-7" />, title:'Backend Dev', desc:'Node · Express · MongoDB', offset:'mt-10' },
                { gradient:'from-emerald-500 to-teal-700', glow:'shadow-emerald-500/20', icon:<Sparkles className="w-7 h-7" />, title:'UI/UX & Motion', desc:'Framer Motion · Responsive', offset:'' },
                { gradient:'from-orange-500 to-rose-600', glow:'shadow-orange-500/20', icon:<ShieldCheck className="w-7 h-7" />, title:'API & DevOps', desc:'REST · JWT · Vercel · Git', offset:'mt-10' },
              ].map(c => (
                <motion.div
                  key={c.title}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-xl ${c.glow} hover:shadow-2xl transition-all duration-300 group ${c.offset}`}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                    className={`w-14 h-14 bg-gradient-to-br ${c.gradient} rounded-2xl flex items-center justify-center text-white mb-5 shadow-lg ${c.glow}`}
                  >
                    {c.icon}
                  </motion.div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">{c.title}</h3>
                  <p className="text-slate-400 text-sm">{c.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          SKILLS
      ══════════════════════════════════════ */}
      <section id="skills" className="py-28 bg-white text-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-60 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader eyebrow="My Stack" title="Tools & Technologies" subtitle="Technologies and frameworks I use every day to build software." />

          <div className="flex flex-wrap justify-center gap-3.5">
            {skills.map((skill, i) => (
              <motion.div
                key={skill._id || skill.name}
                initial={{ opacity:0, scale:0.8 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ duration:0.3, delay:(i % 14) * 0.04 }}
                whileHover={{ y:-6, scale:1.08, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                className="relative group bg-white border border-slate-200 hover:border-blue-400 px-5 py-3 rounded-2xl shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-blue-100 transition-all duration-200 flex items-center gap-3 cursor-default overflow-hidden"
              >
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
            {skills.length === 0 && (
              ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Tailwind CSS', 'Framer Motion', 'REST API', 'Git & GitHub', 'JWT Auth', 'Zustand', 'Postman'].map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity:0, scale:0.8 }}
                  whileInView={{ opacity:1, scale:1 }}
                  viewport={{ once:true }}
                  transition={{ duration:0.3, delay: i * 0.04 }}
                  whileHover={{ y:-6, scale:1.08, transition: { type: 'spring', stiffness: 400, damping: 15 } }}
                  className="relative group bg-white border border-slate-200 hover:border-blue-400 px-5 py-3 rounded-2xl shadow-md shadow-slate-100 hover:shadow-xl hover:shadow-blue-100 transition-all duration-200 flex items-center gap-3 cursor-default"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                    {name.charAt(0)}
                  </div>
                  <span className="font-semibold text-slate-700 text-sm group-hover:text-blue-700 transition-colors">{name}</span>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          PROJECTS (NO IMAGES AS REQUESTED)
      ══════════════════════════════════════ */}
      <section id="projects" className="py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            dark
            eyebrow="Portfolio Code"
            title="Featured Projects"
            subtitle="Engineered full-stack solutions built with clean architecture, modern APIs, and robust codebases."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((p, i) => {
              const theme = cardThemes[i % cardThemes.length];
              const projectTechs = Array.isArray(p.technologies) && p.technologies.length > 0
                ? p.technologies
                : ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'];
              const projectId = p._id || p.title || `proj-${i}`;
              const isExpanded = Boolean(expandedProjects[projectId]);
              const isLongDescription = Boolean(p.description && p.description.length > 110);

              return (
                <motion.div
                  key={projectId}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                  className="bg-slate-800/80 backdrop-blur-md rounded-[2rem] border border-slate-700/60 hover:border-blue-500/50 shadow-xl shadow-slate-950/40 hover:shadow-2xl hover:shadow-blue-900/30 flex flex-col justify-between group transition-all duration-300 relative overflow-hidden p-8"
                >
                  {/* top gradient bar indicator */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.from} ${theme.to} opacity-80 group-hover:opacity-100 transition-opacity`} />

                  <div>
                    {/* card header with icon & category badge */}
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to} flex items-center justify-center text-white shadow-lg ${theme.glow} group-hover:scale-110 transition-transform duration-300`}>
                        <Code2 className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/50 text-blue-300 tracking-wide">
                          {p.category || 'MERN Project'}
                        </span>
                      </div>
                    </div>

                    {/* title */}
                    <h3 className="font-extrabold text-2xl text-white mb-3 group-hover:text-blue-400 transition-colors leading-snug">
                      {p.title}
                    </h3>

                    {/* description with 'See more / See less' */}
                    {p.description && (
                      <div className="mb-6">
                        <p
                          className={`text-slate-400 text-sm leading-relaxed transition-all duration-300 ${
                            isExpanded ? '' : 'line-clamp-3'
                          }`}
                        >
                          {p.description}
                        </p>
                        {isLongDescription && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              toggleProjectExpand(projectId);
                            }}
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer group/btn"
                          >
                            <span>{isExpanded ? 'See less' : 'See more'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 group-hover/btn:translate-y-0.5 transition-transform" />
                            )}
                          </button>
                        )}
                      </div>
                    )}

                    {/* tech tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {projectTechs.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:border-slate-500 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* actions row */}
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-700/60 mt-auto">
                    {p.liveUrl && (
                      <motion.a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Live Demo
                      </motion.a>
                    )}
                    {p.githubUrl && (
                      <motion.a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white py-2.5 px-4 rounded-xl text-sm font-bold transition-all hover:bg-slate-700/50"
                      >
                        <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          EXPERIENCE (ELEVATED TO MATCH CERTIFICATION UI)
      ══════════════════════════════════════ */}
      <section id="experience" className="py-28 bg-slate-50 text-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Career Journey"
            title="Work Experience"
            subtitle="Hands-on software development roles, engineering contributions, and practical milestones."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedExperiences.map((exp, i) => {
              const col = cardThemes[i % cardThemes.length];
              const expTechs = Array.isArray(exp.technologies)
                ? exp.technologies
                : (typeof exp.technologies === 'string' && exp.technologies ? exp.technologies.split(',') : []);

              const startYear = exp.startDate ? new Date(exp.startDate).getFullYear() : '2023';
              const endYear = exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present');

              return (
                <motion.div
                  key={exp._id || exp.position}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {/* colored header band matching certification */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${col.from} ${col.to}`} />

                  <div className="p-8 flex-1 flex flex-col">
                    {/* icon + date row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 ${col.bg} ${col.text} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${col.badge} border ${col.border} flex items-center gap-1.5 shadow-sm`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {startYear} – {endYear}
                      </span>
                    </div>

                    {/* position title */}
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {exp.position}
                    </h3>

                    {/* company & location */}
                    <div className="flex flex-wrap items-center gap-3 mb-5 text-sm font-semibold text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                        <span>{exp.company}</span>
                      </div>
                      {exp.location && (
                        <div className="flex items-center gap-1 text-slate-400">
                          <span>•</span>
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                    </div>

                    {/* description */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                      {exp.description}
                    </p>

                    {/* tech tags pills */}
                    {expTechs.length > 0 && (
                      <div className="mt-auto pt-5 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {expTechs.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-100 transition-colors"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          EDUCATION (ELEVATED TO MATCH CERTIFICATION UI)
      ══════════════════════════════════════ */}
      <section id="education" className="py-28 bg-white text-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-50/80 rounded-full blur-[90px] pointer-events-none -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-indigo-50/80 rounded-full blur-[90px] pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Academic Background"
            title="Education & Qualifications"
            subtitle="My formal educational credentials, continuous studies, and foundational IT training."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {displayedEducation.map((edu, i) => {
              const col = cardThemes[i % cardThemes.length];
              const startYear = edu.startDate ? new Date(edu.startDate).getFullYear() : '2019';
              const endYear = edu.current ? 'Present' : (edu.endDate ? new Date(edu.endDate).getFullYear() : '2023');

              return (
                <motion.div
                  key={edu._id || edu.degree}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {/* colored header band matching certification */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${col.from} ${col.to}`} />

                  <div className="p-8 flex-1 flex flex-col">
                    {/* icon + year row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 ${col.bg} ${col.text} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <GraduationCap className="w-7 h-7" />
                      </div>
                      <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${col.badge} border ${col.border} flex items-center gap-1.5 shadow-sm`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {startYear} – {endYear}
                      </span>
                    </div>

                    {/* degree title */}
                    <h3 className="font-extrabold text-2xl text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {edu.degree}
                    </h3>

                    {/* institution */}
                    <div className="flex items-center gap-2 mb-5">
                      <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-600 font-bold text-sm">{edu.institution}</span>
                    </div>

                    {/* description */}
                    {edu.description && (
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1">
                        {edu.description}
                      </p>
                    )}

                    {/* coursework / tags */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Completed Degree & Credentials
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          CERTIFICATIONS (WITH VIEW MODAL)
      ══════════════════════════════════════ */}
      <section id="certifications" className="py-28 bg-slate-50 text-slate-800 relative overflow-hidden">
        <div className="absolute -left-40 top-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-40 bottom-20 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader
            eyebrow="Achievements"
            title="My Certifications"
            subtitle="Professional certifications and credentials verifying full-stack engineering expertise."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedCertifications.map((c, i) => {
              const col = cardThemes[i % cardThemes.length];
              return (
                <motion.div
                  key={c._id || c.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all duration-300 group overflow-hidden flex flex-col"
                >
                  {/* colored header band */}
                  <div className={`h-2.5 w-full bg-gradient-to-r ${col.from} ${col.to}`} />

                  <div className="p-8 flex-1 flex flex-col">
                    {/* icon + year row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-14 h-14 ${col.bg} ${col.text} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        <Award className="w-7 h-7" />
                      </div>
                      {c.issueDate && (
                        <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full ${col.badge} border ${col.border} shadow-sm`}>
                          {new Date(c.issueDate).getFullYear()}
                        </span>
                      )}
                    </div>

                    {/* title */}
                    <h3 className="font-extrabold text-xl text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                      {c.title}
                    </h3>

                    {/* organization */}
                    <div className="flex items-center gap-2 mb-4">
                      <Building2 className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="text-slate-500 font-semibold text-sm">{c.organization}</span>
                    </div>

                    {c.description && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {c.description}
                      </p>
                    )}

                    {/* actions with VIEW button as requested */}
                    <div className="mt-auto pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        onClick={() => setSelectedCert(c)}
                        className={`inline-flex items-center gap-2 text-sm font-bold text-white bg-gradient-to-r ${col.from} ${col.to} px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer`}
                      >
                        <Eye className="w-4 h-4" />
                        View Certificate
                      </motion.button>

                      {c.credentialUrl && (
                        <motion.a
                          href={c.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-blue-600 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors ml-auto"
                        >
                          Verify
                          <ExternalLink className="w-3.5 h-3.5" />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          CERTIFICATE PREVIEW MODAL
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCert(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
            />

            {/* modal dialogue */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden z-10"
            >
              {/* modal header */}
              <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white leading-tight">
                      {selectedCert.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Issued by <span className="text-slate-200 font-semibold">{selectedCert.organization}</span>
                      {selectedCert.issueDate && ` • ${new Date(selectedCert.issueDate).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* modal content / certificate document view */}
              <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center justify-center bg-slate-950/60 min-h-[350px]">
                {(() => {
                  const certUrl = selectedCert.certificateUrl || selectedCert.image;
                  const isPdf = Boolean(
                    certUrl && (
                      certUrl.toLowerCase().includes('.pdf') ||
                      certUrl.startsWith('data:application/pdf') ||
                      certUrl.toLowerCase().includes('application/pdf')
                    )
                  );

                  if (certUrl) {
                    if (isPdf) {
                      return (
                        <div className="w-full flex flex-col items-center gap-3">
                          <div className="w-full h-[60vh] rounded-2xl overflow-hidden border border-slate-700 bg-slate-900 shadow-2xl">
                            <object
                              data={resolveImageUrl(certUrl)}
                              type="application/pdf"
                              className="w-full h-full"
                            >
                              <iframe
                                src={resolveImageUrl(certUrl)}
                                title={selectedCert.title}
                                className="w-full h-full border-0"
                              />
                            </object>
                          </div>
                          <div className="flex items-center justify-between w-full text-xs text-slate-400 px-1">
                            <span className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
                              PDF Certificate Document
                            </span>
                            <a
                              href={resolveImageUrl(certUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                              Open Fullscreen
                            </a>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="relative max-h-[64vh] rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 flex items-center justify-center p-2">
                        <img
                          src={resolveImageUrl(certUrl)}
                          alt={selectedCert.title}
                          className="max-h-[60vh] w-auto max-w-full object-contain mx-auto rounded-xl shadow-lg"
                        />
                      </div>
                    );
                  }

                  /* elegant digital verified plaque if no certificate file was uploaded yet */
                  return (
                    <div className="w-full max-w-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border-2 border-amber-500/30 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-400/40 rounded-tl-2xl m-3 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-amber-400/40 rounded-tr-2xl m-3 pointer-events-none" />
                      <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-amber-400/40 rounded-bl-2xl m-3 pointer-events-none" />
                      <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-400/40 rounded-br-2xl m-3 pointer-events-none" />

                      <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center text-slate-900 shadow-xl shadow-amber-500/20">
                        <Award className="w-9 h-9" />
                      </div>

                      <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">
                        Verified Certificate of Completion
                      </span>

                      <h4 className="text-2xl md:text-3xl font-extrabold text-white mt-3 mb-2">
                        {selectedCert.title}
                      </h4>

                      <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                        Presented to <span className="font-bold text-white">Zaheer Ahmed</span> by{' '}
                        <span className="font-semibold text-blue-400">{selectedCert.organization}</span>
                      </p>

                      <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold">
                        <ShieldCheck className="w-4 h-4" />
                        Officially Verified & Recognized
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* modal footer */}
              <div className="px-6 py-4 border-t border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {selectedCert.credentialUrl && (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 bg-blue-500/10 border border-blue-500/20 px-4 py-2.5 rounded-xl hover:bg-blue-500/20 transition-all cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Verify Online
                    </a>
                  )}
                  {(selectedCert.certificateUrl || selectedCert.image) && (
                    <>
                      <a
                        href={resolveImageUrl(selectedCert.certificateUrl || selectedCert.image)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 border border-slate-700 px-4 py-2.5 rounded-xl hover:bg-slate-700 transition-all cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Open Original
                      </a>
                      <a
                        href={resolveImageUrl(selectedCert.certificateUrl || selectedCert.image)}
                        download
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl hover:shadow-lg transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download File
                      </a>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors ml-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* ══════════════════════════════════════
          CONTACT
      ══════════════════════════════════════ */}
      <section id="contact" className="py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <SectionHeader
            dark
            eyebrow="Let's Talk"
            title="Get In Touch"
            subtitle="Have a project in mind or looking for a talented MERN Stack Developer? Let's connect!"
          />

          <div className="flex flex-col lg:flex-row gap-10">
            {/* info */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeLeft} className="lg:w-2/5">
              <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-[2rem] border border-slate-700/50 shadow-2xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-8">Contact Details</h3>
                  <div className="space-y-4">
                    {[
                      { label:'Email', value: settings.email || 'zaheerastorian@gmail.com', href:`mailto:${settings.email||'zaheerastorian@gmail.com'}`, color:'from-blue-500 to-indigo-500', icon:<Mail className="w-4 h-4" /> },
                      { label:'Phone', value: settings.phone || '+92 3141709991', href:`tel:${settings.phone||'+923141709991'}`, color:'from-violet-500 to-purple-500', icon:<Phone className="w-4 h-4" /> },
                      { label:'LinkedIn', value:'Zaheer Ahmed', href: settings.linkedin || 'https://www.linkedin.com/in/zaheer-ahmed-44b5a72a4', color:'from-sky-500 to-blue-500', blank:true, icon:<ExternalLink className="w-4 h-4" /> },
                      { label:'GitHub', value:'GitHub Profile', href: settings.github || 'https://github.com/zaheerahmad211', color:'from-slate-400 to-slate-600', blank:true, icon:<Code2 className="w-4 h-4" /> },
                      { label:'Vercel', value:'Vercel Portfolio', href: settings.vercel || 'https://vercel.com/zaheers-projects-7e59edf9', color:'from-purple-500 to-pink-500', blank:true, icon:<Sparkles className="w-4 h-4" /> }
                    ].map(item => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        target={item.blank ? '_blank' : undefined}
                        rel="noreferrer"
                        whileHover={{ x: 6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-700/40 hover:border-slate-500/60 hover:bg-slate-900/80 transition-all group"
                      >
                        <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</p>
                          <p className="text-slate-200 font-semibold truncate group-hover:text-white transition-colors text-sm">{item.value}</p>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-slate-300 ml-auto transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    Available for immediate hire and contracts
                  </div>
                </div>
              </div>
            </motion.div>

            {/* form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once:true }} variants={fadeRight} className="lg:w-3/5">
              <div className="bg-white p-9 rounded-[2rem] shadow-2xl border border-slate-100 text-slate-800 h-full">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-7">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Subject</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-slate-900"
                      placeholder="What is this about?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
                    <textarea
                      required
                      rows="5"
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-y text-slate-900"
                      placeholder="Tell me about your project or inquiry..."
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-lg py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                  >
                    <span className="relative z-10">{sending ? '⏳ Sending...' : 'Send Message →'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black text-sm">
              Z
            </div>
            <div>
              <p className="text-white font-bold text-sm">{settings.name || 'Zaheer Ahmed'}</p>
              <p className="text-xs text-slate-500">MERN Stack Developer • Portfolio</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#education" className="hover:text-white transition-colors">Education</a>
            <a href="#certifications" className="hover:text-white transition-colors">Certifications</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} Zaheer Ahmed. All rights reserved.
            </p>
            <motion.button
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Scroll to top"
            >
              <ChevronUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </footer>

    </div>
  );
}