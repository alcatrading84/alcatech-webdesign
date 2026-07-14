import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Code2, Cpu, Zap, Shield, Star, ChevronDown, ExternalLink, Briefcase, Layers, Monitor, Globe, Server, Check, Mail, Phone, Sparkles, Menu, X, Linkedin, Github, MessageSquare, Instagram, Facebook, Languages } from 'lucide-react';
import locales from './i18n';

const LANGS = ['es', 'en', 'it', 'de', 'fr'];
const PRICES = ['$200+', '$500+', '$1,200+', '$2,500+'];
const PRICE_RANGES = ['$200 — $500', '$500 — $1,200', '$1,200 — $2,500', '$2,500 — $6,000'];

export default function App() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState('es');
  const [showLang, setShowLang] = useState(false);
  const [loading, setLoading] = useState(null);
  const t = locales[lang];

  const tabs = [
    { id: 'inicio', label: t.nav.inicio, icon: <Star className="w-5 h-5" /> },
    { id: 'portafolio', label: t.nav.portafolio, icon: <Briefcase className="w-5 h-5" /> },
    { id: 'planes', label: t.nav.planes, icon: <Layers className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-dark-900 text-white font-body overflow-x-hidden relative">

      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[#08081a]" />
        <img src="/hero-bg.jpg" alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-drift" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#08081a]/30 to-[#08081a]/80" />
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
            {/* Language selector */}
            <div className="relative ml-2">
              <button onClick={() => setShowLang(!showLang)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
                <Languages className="w-4 h-4" /> {t.code}
              </button>
              {showLang && (
                <div className="absolute top-full right-0 mt-1 bg-dark-800 border border-white/10 rounded-xl p-1.5 shadow-2xl min-w-[140px]" onMouseLeave={() => setShowLang(false)}>
                  {LANGS.map(c => (
                    <button key={c} onClick={() => { setLang(c); setShowLang(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                        lang === c ? 'bg-accent/20 text-accent' : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}>
                      <span className="text-base">{locales[c].flag}</span> {locales[c].name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden items-center gap-2">
            <button onClick={() => setShowLang(!showLang)}
              className="p-2 text-white/40 hover:text-white/70 transition-all">
              <Languages className="w-5 h-5" />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-dark-900/80 backdrop-blur-md border-t border-white/5 p-4 space-y-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab.id ? 'bg-accent text-white' : 'bg-dark-700 text-white/50'
                }`}>
                {tab.label}
              </button>
            ))}
            <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-1">
              {LANGS.map(c => (
                <button key={c} onClick={() => { setLang(c); setMenuOpen(false); }}
                  className={`py-2 rounded-lg text-sm transition-all ${
                    lang === c ? 'bg-accent/20 text-accent' : 'text-white/50 hover:bg-white/5'
                  }`}>
                  {locales[c].flag} {locales[c].code}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'inicio' && (
          <motion.div key={lang + '-inicio'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* HERO */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
              <div className="absolute inset-0 bg-dark-900/40" />
              <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-green-400 font-mono text-[22px] tracking-wider">{t.hero.badge}</span>
                  </div>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1] tracking-tight mb-6">
                  <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">Kelvin</span><br />
                  <span className="bg-gradient-to-r from-accent via-accent2 to-accent3 bg-clip-text text-transparent">Alcántara</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-[22px] text-white/50 max-w-2xl mx-auto leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: t.hero.sub1 }} />
                <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-[24px] text-white/30 max-w-xl mx-auto leading-relaxed mb-10">{t.hero.sub2}</motion.p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <button onClick={() => setActiveTab('portafolio')}
                    className="px-8 py-4 bg-accent hover:bg-accent/80 rounded-xl font-bold text-[18px] transition-all flex items-center gap-2 shadow-lg shadow-accent/25">
                    {t.hero.btn} <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap justify-center gap-10 mt-16">
                  {[
                    { val: '30+', label: t.stats.proy, icon: <Code2 className="w-6 h-6 text-accent2" /> },
                    { val: '100%', label: t.stats.sat, icon: <Star className="w-6 h-6 text-accent" /> },
                    { val: '98', label: t.stats.light, icon: <Zap className="w-6 h-6 text-accent3" /> },
                    { val: 'SSL', label: t.stats.seg, icon: <Shield className="w-6 h-6 text-green-400" /> },
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
                    <span className="text-accent2 font-mono text-[22px] tracking-[0.3em] uppercase">{t.about.label}</span>
                    <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight"><span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{t.about.title}</span></h2>
                    <div className="space-y-4 text-white/50 leading-relaxed text-[22px]">
                      <p dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                      <p>{t.about.p2}</p>
                      <p>{t.about.p3}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* FOCUS */}
            <section className="py-24 relative">
              <div className="absolute inset-0 bg-dark-900/30" />
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent font-mono text-[22px] tracking-[0.3em] uppercase">{t.focus.label}</span>
                  <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">{t.focus.title1} <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{t.focus.title2}</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto text-[22px]">{t.focus.desc}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {t.focusCards.map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-6 space-y-3 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20 hover:border-accent/30">
                      <h4 className={`font-display font-bold text-[24px] ${['text-accent2','text-accent','text-accent3','text-green-400'][i]}`}>{item.title}</h4>
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
                  <span className="text-accent2 font-mono text-[22px] tracking-[0.3em] uppercase">{t.skills.label}</span>
                  <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">{t.skills.title1} <span className="bg-gradient-to-r from-accent2 to-accent3 bg-clip-text text-transparent">{t.skills.title2}</span></h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['React / Next.js', 'Node.js / Express', 'UI/UX Design', 'DevOps / Git', 'Tailwind CSS', 'TypeScript', 'Motion / GSAP', 'PostgreSQL'].map((skill, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                      className="glass rounded-xl p-5 flex flex-col items-center gap-3 text-center hover:border-accent/20 transition-all">
                      <Code2 className="w-6 h-6 text-accent" />
                      <span className="text-[22px] font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'portafolio' && (
          <motion.div key={lang + '-portafolio'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            {/* PLANS */}
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent font-mono text-[18px] tracking-[0.3em] uppercase">{t.plans.label}</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight">{t.plans.title1} <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{t.plans.title2}</span></h2>
                  <p className="text-white/40 max-w-2xl mx-auto text-[20px]">{t.plans.desc}</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {t.plansData.map((plan, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className={`relative glass rounded-xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/20 hover:border-accent/30 ${i === 2 ? 'ring-2 ring-accent shadow-lg shadow-accent/10' : ''}`}>
                      {plan.badge && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-accent text-white text-[15px] font-bold rounded-full whitespace-nowrap">{plan.badge}</span>}
                      <Monitor className="w-10 h-10 text-accent" />
                      <div>
                        <h3 className="font-display font-bold text-2xl">{plan.title}</h3>
                        <p className="text-[18px] text-white/40">{plan.subtitle}</p>
                      </div>
                      <p className="text-4xl font-display font-bold">{PRICES[i]}</p>
                      <p className="text-[18px] text-white/30">{PRICE_RANGES[i]}</p>
                      <ul className="space-y-3">
                        {plan.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-[17px] text-white/60"><Check className="w-5 h-5 text-green-400 shrink-0" />{f}</li>)}
                      </ul>
                      <div className="pt-4 border-t border-white/5 space-y-2">
                        <p className="text-[17px] text-white/30">{t.plans.entrega}: <span className="text-white/60">{plan.delivery}</span></p>
                        <p className="text-[17px] text-white/30">{t.plans.tecnologia}: <span className="text-accent2">{plan.tech}</span></p>
                      </div>
                      <a href={['https://buy.stripe.com/test_14AeVccBka2Z8ngauS0RG01',
                        'https://buy.stripe.com/test_6oU28qbxg0speLE8mK0RG03',
                        'https://buy.stripe.com/test_6oUcN41WG0sp47046u0RG04',
                        'https://buy.stripe.com/test_dRm4gy30K5MJfPIauS0RG05'][i]}
                        target="_blank"
                        className="w-full mt-2 py-3 rounded-xl font-bold text-[16px] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/25 bg-accent hover:bg-accent/80 hover:scale-[1.02] active:scale-95">
                        Contratar <ArrowRight className="w-4 h-4" />
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CASE STUDY */}
            <section className="py-20 bg-dark-900/30">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent2 font-mono text-[18px] tracking-[0.3em] uppercase">{t.caseStudy.label}</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight"><span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{t.caseStudy.title}</span></h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h4 className="font-display font-bold text-2xl">{t.caseStudy.reto}</h4>
                    <p className="text-white/50 leading-relaxed text-[18px]">{t.caseStudyData.reto}</p>
                    <h4 className="font-display font-bold text-2xl">{t.caseStudy.sol}</h4>
                    <p className="text-white/50 leading-relaxed text-[18px]">{t.caseStudyData.solucion}</p>
                  </div>
                  <div className="glass rounded-xl p-8 space-y-5">
                    <h4 className="font-display font-bold text-2xl">{t.caseStudy.res}</h4>
                    {t.caseStudyData.impacto.map((imp, j) => (
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
                  <span className="text-accent3 font-mono text-[18px] tracking-[0.3em] uppercase">{t.hosting.label}</span>
                  <h2 className="text-5xl font-display font-bold tracking-tight">{t.hosting.title1} <span className="bg-gradient-to-r from-accent2 to-accent3 bg-clip-text text-transparent">{t.hosting.title2}</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  {t.hostingData.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-8 space-y-5">
                      <Server className="w-10 h-10 text-accent" />
                      <h3 className="font-display font-bold text-2xl">{h.title}</h3>
                      <p className={`text-3xl font-display font-bold ${i === 0 ? 'text-accent2' : 'text-accent3'}`}>{['$0/mes', '$15 — $25/mes'][i]}</p>
                      <p className="text-[18px] text-white/40">{h.desc}</p>
                      <ul className="space-y-3">
                        {h.features.map((f, j) => <li key={j} className="flex items-center gap-2 text-[17px] text-white/60"><Check className="w-5 h-5 text-green-400 shrink-0" />{f}</li>)}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* TESTIMONIOS */}
            <section className="py-24 relative">
              <div className="absolute inset-0 bg-dark-900/20" />
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <span className="text-accent font-mono text-[22px] tracking-[0.3em] uppercase">{lang === 'es' ? 'Testimonios' : lang === 'en' ? 'Testimonials' : lang === 'it' ? 'Testimonianze' : lang === 'de' ? 'Testimonien' : 'Témoignages'}</span>
                  <h2 className="text-5xl sm:text-6xl font-display font-bold tracking-tight">{lang === 'es' ? 'Lo que dicen' : lang === 'en' ? 'What our' : lang === 'it' ? 'Cosa dicono' : lang === 'de' ? 'Was unsere' : 'Ce que disent'}{' '}<span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{lang === 'es' ? 'nuestros clientes' : lang === 'en' ? 'clients say' : lang === 'it' ? 'i nostri clienti' : lang === 'de' ? 'Kunden sagen' : 'nos clients'}</span></h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { stars: 5, text: lang === 'es' ? 'El plan Empresarial transformó nuestro negocio. La velocidad de carga aumentó un 200% y nuestras ventas se dispararon en solo 3 meses.' : lang === 'en' ? 'The Business plan transformed our business. Load speed increased 200% and sales skyrocketed in just 3 months.' : lang === 'it' ? 'Il piano Aziendale ha trasformato la nostra attività. La velocità di caricamento è aumentata del 200% e le vendite sono esplose in soli 3 mesi.' : lang === 'de' ? 'Der Unternehmensplan hat unser Geschäft verwandelt. Die Ladegeschwindigkeit stieg um 200% und die Verkäufe schossen in nur 3 Monaten in die Höhe.' : "Le plan Entreprise a transformé notre activité. La vitesse de chargement a augmenté de 200% et les ventes ont explosé en seulement 3 mois.", name: 'Pedro Martínez', role: lang === 'es' ? 'CEO de Inversiones del Sur' : lang === 'en' ? 'CEO of Inversiones del Sur' : lang === 'it' ? 'CEO di Inversiones del Sur' : lang === 'de' ? 'CEO von Inversiones del Sur' : 'CEO d\'Inversiones del Sur' },
                    { stars: 5, text: lang === 'es' ? 'Pasamos de una web estática a una plataforma con IA integrada. Ahora nuestros clientes reservan solos sin intervención humana.' : lang === 'en' ? 'We went from a static site to an AI-powered platform. Now our clients book autonomously.' : lang === 'it' ? 'Siamo passati da un sito statico a una piattaforma con IA integrata. I clienti prenotano da soli.' : lang === 'de' ? 'Wir gingen von einer statischen Website zu einer KI-gestützten Plattform. Kunden buchen selbstständig.' : "Nous sommes passés d'un site statique à une plateforme IA. Les clients réservent seuls.", name: 'Dra. Ana García', role: lang === 'es' ? 'Directora Médica - Clínica MediSalud' : lang === 'en' ? 'Medical Director - MediSalud Clinic' : lang === 'it' ? 'Direttrice Sanitaria - Clinica MediSalud' : lang === 'de' ? 'Medizinische Direktorin - MediSalud Klinik' : 'Directrice Médicale - Clinique MediSalud' },
                    { stars: 5, text: lang === 'es' ? 'El diseño cinematográfico superó todas nuestras expectativas. La experiencia 3D nos diferencia totalmente de la competencia.' : lang === 'en' ? 'The cinematic design exceeded all expectations. The 3D experience sets us apart from competitors.' : lang === 'it' ? 'Il design cinematografico ha superato le aspettative. L\'esperienza 3D ci distingue dalla concorrenza.' : lang === 'de' ? 'Das cineastische Design übertraf alle Erwartungen. Die 3D-Erfahrung hebt uns von der Konkurrenz ab.' : "Le design cinématographique a dépassé toutes les attentes. L'expérience 3D nous démarque.", name: 'Carlos Ruiz', role: lang === 'es' ? 'Propietario - Restaurante La Mesa' : lang === 'en' ? 'Owner - La Mesa Restaurant' : lang === 'it' ? 'Proprietario - Ristorante La Mesa' : lang === 'de' ? 'Inhaber - Restaurant La Mesa' : 'Propriétaire - Restaurant La Mesa' },
                    { stars: 5, text: lang === 'es' ? 'El panel admin me permite editar todo sin programador. La mejor inversión que he hecho para mi negocio.' : lang === 'en' ? 'The admin panel lets me edit everything without a programmer. The best investment for my business.' : lang === 'it' ? 'Il pannello admin mi permette di modificare tutto senza programmatore. Il miglior investimento.' : lang === 'de' ? 'Das Admin-Panel lässt mich alles ohne Programmierer bearbeiten. Die beste Investition.' : "Le panneau d'administration me permet de tout éditer sans programmeur. Le meilleur investissement.", name: 'María López', role: lang === 'es' ? 'Fundadora - NovaTech Solutions' : lang === 'en' ? 'Founder - NovaTech Solutions' : lang === 'it' ? 'Fondatrice - NovaTech Solutions' : lang === 'de' ? 'Gründerin - NovaTech Solutions' : 'Fondatrice - NovaTech Solutions' },
                    { stars: 5, text: lang === 'es' ? 'Migrar a AlcaTech fue la mejor decisión. Nuestra web ahora carga en 1.2 segundos y las conversiones subieron un 40%.' : lang === 'en' ? 'Migrating to AlcaTech was the best decision. Our site now loads in 1.2 seconds with 40% more conversions.' : lang === 'it' ? 'Migrare ad AlcaTech è stata la scelta migliore. Il sito carica in 1.2 secondi con un +40% di conversioni.' : lang === 'de' ? 'Der Wechsel zu AlcaTech war die beste Entscheidung. Die Seite lädt in 1,2 Sekunden mit 40% mehr Conversions.' : "Migrer vers AlcaTech a été la meilleure décision. Le site charge en 1,2 secondes avec +40% de conversions.", name: 'Roberto Sánchez', role: lang === 'es' ? 'Gerente General - Constructora MG' : lang === 'en' ? 'General Manager - MG Construction' : lang === 'it' ? 'Direttore Generale - Costruzioni MG' : lang === 'de' ? 'Geschäftsführer - MG Bau' : 'Directeur Général - Construction MG' },
                    { stars: 5, text: lang === 'es' ? 'El portal SaaS con IA nos ahorra 20 horas semanales en atención al cliente. Increíble resultado.' : lang === 'en' ? 'The SaaS portal with AI saves us 20 hours weekly in customer support. Amazing results.' : lang === 'it' ? 'Il portale SaaS con IA ci fa risparmiare 20 ore settimanali di assistenza. Risultato incredibile.' : lang === 'de' ? 'Das SaaS-Portal mit KI spart uns 20 Wochenstunden im Kundenservice. Unglaubliches Ergebnis.' : "Le portail SaaS avec IA nous fait économiser 20 heures par semaine en support. Résultat incroyable.", name: 'Laura Fernández', role: lang === 'es' ? 'Directora de Operaciones - LogiTrack' : lang === 'en' ? 'Operations Director - LogiTrack' : lang === 'it' ? 'Direttrice Operativa - LogiTrack' : lang === 'de' ? 'Betriebsdirektorin - LogiTrack' : 'Directrice des Opérations - LogiTrack' },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="glass rounded-xl p-8 space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10">
                      {/* Stars */}
                      <div className="flex gap-1 text-[28px]" style={{ color: '#fbbf24' }}>
                        {[...Array(item.stars)].map((_, s) => <span key={s}>★</span>)}
                      </div>
                      {/* Text */}
                      <p className="text-[22px] text-white/60 leading-relaxed italic">"{item.text}"</p>
                      {/* Client info */}
                      <div className="pt-2">
                        <p className="text-[20px] font-display font-bold text-white">{item.name}</p>
                        <p className="text-[18px] text-white/40">{item.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center text-green-400 text-[12px] font-bold">✓</span>
                          <span className="text-[18px] text-green-400 font-medium">{lang === 'es' ? 'Cliente Verificado' : lang === 'en' ? 'Verified Client' : lang === 'it' ? 'Cliente Verificato' : lang === 'de' ? 'Verifizierter Kunde' : 'Client Vérifié'}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CONTACT */}
            <section className="py-20 bg-dark-900/30">
              <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
                <h2 className="text-5xl font-display font-bold tracking-tight">{t.contact.title1} <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">{t.contact.title2}</span></h2>
                <p className="text-white/40 max-w-xl mx-auto text-[20px]">{t.contact.desc}</p>
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

        {activeTab === 'planes' && (
          <motion.div key={lang + '-planes'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            <section className="py-20">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-4xl sm:text-5xl font-display font-bold tracking-tight">{t.plansTable.title}</h2>
                  <p className="text-white/40 max-w-3xl mx-auto text-[20px]">{t.plansTable.subtitle}</p>
                </div>

                {/* Table wrapper for horizontal scroll on mobile */}
                <div className="overflow-x-auto pb-4">
                <table className="w-full min-w-[1000px] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-5 pr-6 text-[22px] font-display font-bold text-white/50">{t.plansTable.header}</th>
                      <th className="text-center py-5 px-4 text-[20px] font-display font-bold text-white/70">Landing Simple<br/><span className="text-[18px] font-normal text-white/30">$200 – $500</span></th>
                      <th className="text-center py-5 px-4 text-[20px] font-display font-bold text-accent">Landing Empresarial<br/><span className="text-[18px] font-normal text-white/30">$500 – $1,200</span></th>
                      <th className="text-center py-5 px-4 text-[20px] font-display font-bold text-white/70">Landing Cinematográfico<br/><span className="text-[18px] font-normal text-white/30">$1,200 – $2,500</span></th>
                      <th className="text-center py-5 px-4 text-[20px] font-display font-bold text-white/70">Portal SaaS<br/><span className="text-[18px] font-normal text-white/30">$2,500 – $6,000</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {t.plansTable.rows.map((row, i) => (
                      <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''} hover:bg-white/[0.04] transition-colors`}>
                        <td className="py-5 pr-6 text-[22px] font-medium text-accent2">{row.label}</td>
                        {row.vals.map((v, j) => (
                          <td key={j} className={`text-center py-5 px-4 text-[20px] text-white/60 ${j === 1 ? 'text-accent/80' : ''}`}>{v}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                </div>

                {/* Upgrade descriptions */}
                <div className="mt-20 space-y-8 max-w-5xl mx-auto">
                <div className="glass rounded-xl p-8 border-l-4 border-accent2">
                  <p className="text-[22px] text-white/60 leading-relaxed">{t.plansTable.upgrade1}</p>
                </div>
                <div className="glass rounded-xl p-8 border-l-4 border-accent">
                  <p className="text-[22px] text-white/60 leading-relaxed">{t.plansTable.upgrade2}</p>
                </div>
                <div className="glass rounded-xl p-8 border-l-4 border-accent3">
                  <p className="text-[22px] text-white/60 leading-relaxed">{t.plansTable.upgrade3}</p>
                </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
      </div>

      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-white/20 text-[22px]">© {new Date().getFullYear()} AlcaTech-WebDesign</p>
        <p className="text-white/10 text-[18px] font-mono mt-2">{t.footer}</p>

        {/* Legal links expandibles */}
        <div className="max-w-3xl mx-auto mt-8 space-y-2">
          <details className="group">
            <summary className="cursor-pointer text-[16px] text-white/30 hover:text-accent transition-colors list-none flex items-center justify-center gap-2">
              <span className="underline underline-offset-4 decoration-white/10 hover:decoration-accent/50">{t.legal.footerLinks[0]}</span>
              <span className="text-white/20 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 glass rounded-xl p-6 text-left space-y-3">
              <h4 className="text-[20px] font-display font-bold text-white">{t.legal.aviso.title}</h4>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.aviso.p1}</p>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.aviso.p2}</p>
            </div>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-[16px] text-white/30 hover:text-accent transition-colors list-none flex items-center justify-center gap-2">
              <span className="underline underline-offset-4 decoration-white/10 hover:decoration-accent/50">{t.legal.footerLinks[1]}</span>
              <span className="text-white/20 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 glass rounded-xl p-6 text-left space-y-3">
              <h4 className="text-[20px] font-display font-bold text-white">{t.legal.terminos.title}</h4>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.terminos.p1}</p>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.terminos.p2}</p>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.terminos.p3}</p>
            </div>
          </details>
          <details className="group">
            <summary className="cursor-pointer text-[16px] text-white/30 hover:text-accent transition-colors list-none flex items-center justify-center gap-2">
              <span className="underline underline-offset-4 decoration-white/10 hover:decoration-accent/50">{t.legal.footerLinks[2]}</span>
              <span className="text-white/20 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 glass rounded-xl p-6 text-left space-y-3">
              <h4 className="text-[20px] font-display font-bold text-white">{t.legal.privacidad.title}</h4>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.privacidad.p1}</p>
              <p className="text-[17px] text-white/60 leading-relaxed">{t.legal.privacidad.p2}</p>
            </div>
          </details>
        </div>
      </footer>
    </div>
  );
}
