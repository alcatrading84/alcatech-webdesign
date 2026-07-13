import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Code2, Cpu, Zap, Shield, Star, ChevronDown, ExternalLink, Briefcase, Layers, Monitor, Globe, Server, Check, Mail, Phone, Sparkles, Menu, X, Linkedin, Github, MessageSquare, Instagram, Facebook } from 'lucide-react';

// ===== DATOS DE PLANES Y SERVICIOS =====
const PLANES_WEB = [
  { id: 'landing', title: 'Landing Simple', subtitle: 'Presencia Profesional', price: '$200+', priceRange: '$200 — $500', delivery: '24 a 48 horas', tech: 'HTML + CSS + Animaciones', desc: 'Página profesional lista en 24h.', features: ['Diseño responsive completo', 'Animaciones scroll y hover', 'SEO on-page + Google Analytics', 'Deploy en Netlify gratis', 'SSL HTTPS incluido', '1 revisión de diseño'], destacado: false, badge: '' },
  { id: 'empresarial', title: 'Landing Empresarial', subtitle: 'Múltiples Secciones', price: '$500+', priceRange: '$500 — $1,200', delivery: '3 a 5 días', tech: 'React + Tailwind + Motion', desc: 'Landing profesional con React.', features: ['Todo lo del plan Simple', 'React + Tailwind + Motion', 'Formulario de contacto inteligente', 'Panel admin básico', 'Hasta 5 secciones personalizadas', 'Optimización Core Web Vitals', '2 revisiones de diseño'], destacado: true, badge: 'RECOMENDADO' },
  { id: 'cinematografico', title: 'Landing Cinematográfico', subtitle: 'Experiencia Inmersiva', price: '$1,200+', priceRange: '$1,200 — $2,500', delivery: '5 a 10 días', tech: 'React + Three.js + WebGL', desc: 'Experiencia 3D y WebGL inmersiva.', features: ['Todo lo del plan Empresarial', 'Animaciones 3D / WebGL', 'Efectos parallax cinematográficos', 'Modo oscuro/claro', 'Video background interactivo', 'Micro-interacciones premium', 'Hasta 8 secciones inmersivas', '3 revisiones de diseño'], destacado: false, badge: '' },
  { id: 'portal', title: 'Portal Interactivo SaaS', subtitle: 'Plataforma Autónoma', price: '$2,500+', priceRange: '$2,500 — $6,000', delivery: '2 a 4 semanas', tech: 'Full Stack + IA + DB', desc: 'Plataforma completa con IA.', features: ['Todo lo del plan Cinematográfico', 'Base de datos + API REST', 'Autenticación de usuarios', 'Panel de administración completo', 'Chat con IA integrado', 'Automatizaciones personalizadas', 'Dashboard analytics en vivo', 'Hasta 12 secciones + backend'], destacado: false, badge: '' },
];

const HOSTING_OPTIONS = [
  { id: 'netlify', title: 'Netlify (Gratuito)', price: '$0/mes', icon: 'Zap', desc: 'Para proyectos personales y landing pages.', features: ['Dominio .netlify.app gratis', 'SSL automático', 'Deploy desde Git', 'Sin costos de servidor'] },
  { id: 'hostinger', title: 'Hostinger Business', price: '$15 — $25/mes', icon: 'Server', desc: 'Para empresas consolidadas y comercios.', features: ['Dominio personalizado', 'SSL avanzados', 'Correo corporativo', 'Backups automáticos', 'Mantenimiento mensual'] },
];

const CASOS_EXITO = [
  { id: 'dental', title: 'Clínica Dental', subtitle: 'OdontoElite — Salud Digital', cliente: 'OdontoElite Dental', reto: 'Una clínica dental necesitaba una web que transmitiera confianza y permitiera reservar citas online de forma sencilla.', solucion: 'Diseñamos un sitio premium con video hero, sistema de reservas integrado, perfil de doctores y SEO local. La página carga en menos de 1.5 segundos.', impacto: ['+340% tráfico orgánico en 3 meses', 'Tasa de conversión del 12% en reservas', 'Lighthouse score 98/100', 'Integración WhatsApp Business'], techStack: ['React', 'Tailwind', 'Node.js', 'MongoDB', 'Stripe'] },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: <Star className="w-5 h-5" /> },
    { id: 'portafolio', label: 'Portafolio', icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white font-body overflow-x-hidden relative">

      {/* ===== FONDO DE PARTÍCULAS CON MOVIMIENTO ===== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#08081a]" />
        <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08081a]/30 to-[#08081a]/80" />
        {/* Partículas flotantes con movimiento libre */}
        <div className="absolute w-3 h-3 bg-accent/25 rounded-full blur-sm animate-float1" style={{ top: '12%', left: '18%' }} />
        <div className="absolute w-4 h-4 bg-accent2/20 rounded-full blur-sm animate-float2" style={{ top: '35%', right: '22%' }} />
        <div className="absolute w-2 h-2 bg-accent3/25 rounded-full blur-sm animate-float3" style={{ top: '55%', left: '28%' }} />
        <div className="absolute w-3.5 h-3.5 bg-accent4/20 rounded-full blur-sm animate-float4" style={{ bottom: '20%', right: '30%' }} />
        <div className="absolute w-2.5 h-2.5 bg-accent2/20 rounded-full blur-sm animate-float5" style={{ top: '70%', left: '55%' }} />
        <div className="absolute w-2 h-2 bg-accent/20 rounded-full blur-sm animate-float1" style={{ top: '80%', left: '10%', animationDelay: '-3s' }} />
        <div className="absolute w-3 h-3 bg-accent3/20 rounded-full blur-sm animate-float2" style={{ top: '25%', left: '45%', animationDelay: '-5s' }} />
        <div className="absolute w-2.5 h-2.5 bg-accent4/20 rounded-full blur-sm animate-float3" style={{ bottom: '40%', left: '70%', animationDelay: '-7s' }} />
      </div>

      <div className="relative z-10">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/60 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-bold">AlcaTech<span className="text-accent">-</span>WebDesign</span>
          </div>
          <div className="hidden md:flex items-center gap-1 bg-dark-900/30 rounded-xl p-1">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-[15px] font-medium transition-all ${
                  activeTab === tab.id ? 'bg-accent text-white shadow-lg shadow-accent/25' : 'text-white/50 hover:text-white'
                }`}>
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-dark-900/80 backdrop-blur-md border-t border-white/5 p-4 flex gap-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id ? 'bg-accent text-white' : 'bg-dark-700 text-white/50'
                }`}>
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'inicio' && (
          <motion.div key="inicio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
              <div className="absolute inset-0 bg-dark-900/40" />
              <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 font-mono text-[22px] tracking-wider">INGENIERÍA DE AUTOR • DISPONIBLE</span>
                  </div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1] tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Kelvin</span><br />
                  <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">Alcántara</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-[22px] text-white/50 max-w-2xl mx-auto leading-relaxed mb-4">
                  Fundador y director de <strong className="text-white">AlcaTech-WebDesign</strong>. Ingeniería frontend, arquitectura de experiencias digitales y soluciones web de alto impacto.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-[24px] text-white/30 max-w-xl mx-auto leading-relaxed mb-10">
                  Transformo ideas complejas en plataformas digitales rápidas, robustas e interactivas. No creo páginas genéricas; diseño sistemas autónomos que impulsan negocios.
                </motion.p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button onClick={() => setActiveTab('portafolio')}
                    className="px-8 py-4 bg-accent hover:bg-accent/80 rounded-xl font-bold text-[18px] transition-all flex items-center gap-2 shadow-lg shadow-accent/25">
                    Ver Portafolio <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-10 mt-16">
                  {[
                    { val: '30+', label: 'Proyectos', icon: <Code2 className="w-6 h-6 text-accent2" /> },
                    { val: '100%', label: 'Satisfacción', icon: <Star className="w-6 h-6 text-accent" /> },
                    { val: '98', label: 'Lighthouse', icon: <Zap className="w-6 h-6 text-accent3" /> },
                    { val: 'SSL', label: 'Seguro', icon: <Shield className="w-6 h-6 text-green-400" /> },
                  ].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="flex items-center justify-center gap-2 text-3xl font-display font-bold">{s.icon}<span>{s.val}</span></div>
                      <p className="text-[22px] text-white/30 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ABOUT */}
            <section id="about" className="py-32 relative">
              <div className="max-w-6xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
                    <div className="relative w-full max-w-md mx-auto">
                      <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 shadow-2xl shadow-accent/10">
                        <img src="/hero-photo.png" alt="Kelvin Alcántara" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                    <span className="text-accent2 font-mono text-[22px] tracking-[0.3em] uppercase">Quién Soy</span>
                    <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">Frontend de <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Alto Impacto</span></h2>
                    <div className="space-y-4 text-white/50 leading-relaxed text-[22px]">
                      <p><strong className="text-white">AlcaTech-WebDesign</strong> transforma ideas complejas en plataformas digitales de alto rendimiento. Ingeniería frontend de vanguardia con enfoque en resultados.</p>
                      <p>Me especializo en optimización técnica avanzada, despliegue eficiente de arquitecturas de software e ingeniería frontend con herramientas locales y de vanguardia.</p>
                      <p>No creo páginas web genéricas. Diseño soluciones rápidas, robustas e interactivas, integrando sistemas autónomos y automatizaciones a medida para que tu negocio destaque en el entorno digital.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* FOCUS AREAS */}
            <section className="py-24 relative">
              <div className="absolute inset-0 bg-dark-900/30" />
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent font-mono text-[22px] tracking-[0.3em] uppercase">Enfoques</span>
                  <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">Mi <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Metodología</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto text-[22px]">Cuatro pilares fundamentales que guían cada proyecto que emprendo.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: 'Rendimiento y Velocidad (WPO)', color: 'text-accent2', desc: 'Código Limpio, Cargas Instantáneas — Optimizo cada línea de código para garantizar velocidades de carga mínimas y una experiencia de usuario fluida. Un sitio rápido no solo retiene visitantes, sino que mejora directamente el posicionamiento en buscadores y las tasas de conversión.' },
                    { title: 'Automatización y Sistemas', color: 'text-accent', desc: 'Automatización Estratégica — Desarrollo integraciones y sistemas autónomos que reducen tareas repetitivas en tu negocio. Conecto tu frontend con flujos de trabajo inteligentes para que tu plataforma trabaje por ti en segundo plano las 24 horas del día.' },
                    { title: 'Escalabilidad y Futuro', color: 'text-accent3', desc: 'Arquitectura Escalable — Construyo soluciones preparadas para crecer. Utilizo estructuras modulares y tecnologías sólidas que permiten añadir nuevas funcionalidades en el futuro sin necesidad de reescribir el proyecto desde cero.' },
                    { title: 'Conversión y Negocio', color: 'text-green-400', desc: 'Diseño con Propósito Comercial — Más allá de la estética, cada elemento interactivo y decisión técnica está orientada a cumplir un objetivo claro: captar clientes, retener usuarios y potenciar el crecimiento de tu marca en el mercado digital.' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-6 space-y-3 hover:shadow-lg hover:shadow-accent/5 transition-all">
                      <h4 className={`${item.color} font-display font-bold text-[24px]`}>{item.title}</h4>
                      <p className="text-[22px] text-white/50 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* SKILLS */}
            <section className="py-24 relative">
              <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent2 font-mono text-[22px] tracking-[0.3em] uppercase">Habilidades</span>
                  <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">Tecnologías que <span className="bg-gradient-to-r from-accent2 to-accent3 bg-clip-text text-transparent">domino</span></h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'React / Next.js' }, { label: 'Node.js / Express' }, { label: 'UI/UX Design' }, { label: 'DevOps / Git' },
                    { label: 'Tailwind CSS' }, { label: 'TypeScript' }, { label: 'Motion / GSAP' }, { label: 'PostgreSQL' },
                  ].map((skill, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-accent/20 transition-all">
                      <Code2 className="w-6 h-6 text-accent" />
                      <span className="text-[22px] font-medium">{skill.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'portafolio' && (
          <motion.div key="portafolio" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            {/* PLANES */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent font-mono text-[18px] tracking-[0.3em] uppercase">Planes</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight">Planes de <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Desarrollo Web</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto text-[20px]">Soluciones profesionales para cada etapa de tu negocio.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {PLANES_WEB.map((plan, i) => (
                    <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className={`relative glass rounded-xl p-8 space-y-4 ${plan.destacado ? 'ring-2 ring-accent shadow-lg shadow-accent/10' : ''}`}>
                      {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-accent text-white text-[15px] font-bold rounded-full whitespace-nowrap">{plan.badge}</span>}
                      <Monitor className="w-10 h-10 text-accent" />
                      <div>
                        <h3 className="font-display font-bold text-2xl">{plan.title}</h3>
                        <p className="text-[18px] text-white/40">{plan.subtitle}</p>
                      </div>
                      <p className="text-4xl font-display font-bold">{plan.price}</p>
                      <p className="text-[18px] text-white/30">{plan.priceRange}</p>
                      <ul className="space-y-3">
                        {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-[17px] text-white/60"><Check className="w-5 h-5 text-green-400 shrink-0" />{f}</li>)}
                      </ul>
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <p className="text-[17px] text-white/30">Entrega: <span className="text-white/60">{plan.delivery}</span></p>
                        <p className="text-[17px] text-white/30">Tecnología: <span className="text-accent2">{plan.tech}</span></p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CASO DE ÉXITO */}
            <section className="py-20 bg-dark-900/30">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent2 font-mono text-[18px] tracking-[0.3em] uppercase">Caso de Éxito</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight">Clínica <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">Dental OdontoElite</span></h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h4 className="font-display font-bold text-2xl">El Reto</h4>
                    <p className="text-white/50 leading-relaxed text-[18px]">{CASOS_EXITO[0].reto}</p>
                    <h4 className="font-display font-bold text-2xl">La Solución</h4>
                    <p className="text-white/50 leading-relaxed text-[18px]">{CASOS_EXITO[0].solucion}</p>
                  </div>
                  <div className="glass rounded-xl p-8 space-y-5">
                    <h4 className="font-display font-bold text-2xl">Resultados</h4>
                    {CASOS_EXITO[0].impacto.map((imp, j) => (
                      <div key={j} className="flex items-center gap-3"><Check className="w-5 h-5 text-green-400 shrink-0" /><span className="text-white/70 text-[18px]">{imp}</span></div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* HOSTING */}
            <section className="py-20">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent3 font-mono text-[18px] tracking-[0.3em] uppercase">Infraestructura</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight">Hosting & <span className="bg-gradient-to-r from-accent2 to-accent3 bg-clip-text text-transparent">Despliegue</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {HOSTING_OPTIONS.map((h, i) => (
                    <motion.div key={h.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-8 space-y-5">
                      <Server className="w-10 h-10 text-accent" />
                      <h3 className="font-display font-bold text-2xl">{h.title}</h3>
                      <p className="text-3xl font-display font-bold text-accent2">{h.price}</p>
                      <p className="text-[18px] text-white/40">{h.desc}</p>
                      <ul className="space-y-3">
                        {h.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-[17px] text-white/60"><Check className="w-5 h-5 text-green-400 shrink-0" />{f}</li>)}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACTO */}
            <section className="py-20 bg-dark-900/30">
              <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
                <h2 className="text-5xl font-display font-bold tracking-tight">¿Listo para tu <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">próximo proyecto?</span></h2>
                <p className="text-white/40 max-w-xl mx-auto text-[20px]">Hablemos y creemos algo increíble juntos.</p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a href="https://wa.me/393801028239" target="_blank" className="px-8 py-4 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 hover:bg-green-500/30 transition-all flex items-center gap-2 text-[18px]"><MessageSquare className="w-5 h-5" />WhatsApp</a>
                  <a href="mailto:alcatechwebdesign@gmail.com" className="px-8 py-4 glass rounded-xl hover:bg-white/5 transition-all flex items-center gap-2 text-[18px]"><Mail className="w-5 h-5" />Email</a>
                  <a href="https://www.instagram.com/alcatechwebdesign" target="_blank" className="px-8 py-4 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-400/20 border border-pink-500/30 rounded-xl text-pink-400 hover:bg-pink-500/30 transition-all flex items-center gap-2 text-[18px]"><Instagram className="w-5 h-5" />Instagram</a>
                  <a href="https://www.facebook.com/profile.php?id=61591897798944" target="_blank" className="px-8 py-4 bg-blue-600/20 border border-blue-600/30 rounded-xl text-blue-400 hover:bg-blue-600/30 transition-all flex items-center gap-2 text-[18px]"><Facebook className="w-5 h-5" />Facebook</a>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-white/20 text-[22px]">© {new Date().getFullYear()} AlcaTech-WebDesign</p>
        <p className="text-white/10 text-[18px] font-mono mt-2">Optimización de alto impacto • Despliegue Git • SSL HTTPS Activo</p>
      </footer>
    </div>
  );
}