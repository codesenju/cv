'use client'

import { Award, Briefcase, GraduationCap, User, Code, Linkedin, Mail, MapPin, Phone, Users, Github, Menu, X, Gamepad2 } from 'lucide-react'
import { useState } from 'react'
import Tetris from './components/Tetris'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [tetrisOpen, setTetrisOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-3 glass-card rounded-full lg:hidden"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation */}
      <nav className={`fixed left-0 top-0 h-full w-72 glass-card backdrop-blur-xl p-6 overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="text-center mb-8">
          <div className="w-24 h-24 lg:w-36 lg:h-36 rounded-full mx-auto mb-4 overflow-hidden">
            <img 
              src="/profile.jpeg" 
              alt="Lehlogonolo Masubelele" 
              className="w-full h-full object-cover rounded-full border-2 border-primary/30" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-full border-2 border-primary/20 flex items-center justify-center" style={{display: 'none'}}>
              <User size={32} className="text-primary lg:w-14 lg:h-14" />
            </div>
          </div>
          <h1 className="text-lg lg:text-xl font-bold gradient-text">Lehlogonolo Masubelele</h1>
          <p className="text-xs lg:text-sm text-muted-foreground mt-2">AWS SRE/DevOps Engineer | CKA, AWS SAA</p>
        </div>
        <ul className="space-y-3">
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">About</a></li>
          <li><a href="#accomplishments" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">Accomplishments</a></li>
          <li><a href="#experience" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">Experience</a></li>
          <li><a href="#education" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">Education</a></li>
          <li><a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">Skills</a></li>
          <li><a href="#references" onClick={() => setMobileMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1">References</a></li>
          <li>
            <button 
              onClick={() => { setTetrisOpen(true); setMobileMenuOpen(false); }} 
              className="w-full text-left py-3 px-4 rounded-lg hover:bg-primary/10 transition-all duration-300 hover:translate-x-1 flex items-center gap-2"
            >
              <Gamepad2 size={16} /> Play Skills Tetris
            </button>
          </li>
        </ul>
      </nav>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="lg:ml-72 p-4 lg:p-8">
        {/* Floating Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-primary/5 rounded-full animate-float-medium"></div>
          <div className="absolute bottom-40 left-20 w-12 h-12 bg-primary/15 rounded-full animate-float-fast"></div>
          <div className="absolute top-60 left-1/3 w-8 h-8 bg-primary/8 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-60 right-1/4 w-14 h-14 bg-primary/12 rounded-full animate-float-medium"></div>
        </div>

        {/* About Section */}
        <section id="about" className="mb-20 fade-in relative z-10">
          <div className="max-w-5xl">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Lehlogonolo <span className="gradient-text">Masubelele</span>
            </h1>
            <div className="flex flex-wrap gap-6 mb-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary" />
                <span>Johannesburg, South Africa</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Phone size={18} className="text-primary" />
                <span>(+27) 61 460 6692</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-primary" />
                <span>codesenju@gmail.com</span>
              </div> */}
            </div>
            <div className="glass-card p-4 lg:p-8 rounded-2xl mb-8 hover-lift bounce-card relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full animate-morph"></div>
              <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground relative z-10">
                With <span className="text-primary font-semibold animate-pulse-glow">7 years in DevOps and Site Reliability Engineering</span>, I have built resilient, scalable systems on AWS and Kubernetes from cloud architecture to observability and incident management. I am passionate about <span className="text-foreground font-semibold animate-pulse-glow">open-source contributions</span> and thrive where ownership, automation, and measurable impact define engineering excellence.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/lmasubelele/" target="_blank" rel="noopener noreferrer" 
                 className="p-4 glass-card rounded-full hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Linkedin size={24} className="group-hover:text-blue-500 transition-colors relative z-10" />
              </a>
              <a href="https://github.com/codesenju" target="_blank" rel="noopener noreferrer" 
                 className="p-4 glass-card rounded-full hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-700/20 to-gray-800/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Github size={24} className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors relative z-10" />
              </a>
            </div>
          </div>
        </section>

        {/* Accomplishments Section */}
        <section id="accomplishments" className="mb-20 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 flex items-center gradient-text">
            <Award className="mr-2 lg:mr-4 text-primary" size={24} /> Accomplishments
          </h2>
          <div className="grid gap-6">
            <div className="glass-card rounded-2xl p-4 lg:p-8 hover-lift pulse-border bounce-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-slide-x"></div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-primary/10 rounded-full animate-bounce-gentle">
                  <Award className="text-primary animate-spin-slow" size={24} />
                </div>
                <div>
                  <h3 className="text-lg lg:text-2xl font-bold mb-3 text-primary animate-text-wave">AWS Awards - June 2023</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-default">🏆 MVP (Most Valuable Player Award) of March 2023</li>
                    <li className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-default">⭐ Rising Star Award for new hires</li>
                    <li className="flex items-center gap-2 hover:scale-105 transition-transform duration-200 cursor-default">🎯 All Rounder Award for Leadership Principles</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Code className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">FNB Containerization - November 2020</h3>
                  <p className="text-muted-foreground text-lg">Successfully containerized all 13 Java applications within SLA</p>
                </div>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Award className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">IBM MEA zBeez Madrid Challenge Winner - January 2019</h3>
                  <p className="text-muted-foreground text-lg">South Africa winner for innovative solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-20 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 flex items-center gradient-text">
            <Briefcase className="mr-2 lg:mr-4 text-primary" size={24} /> Experience
          </h2>
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-8 hover-lift relative overflow-hidden bounce-card group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16 animate-morph-slow"></div>
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-primary/10 to-transparent rounded-full animate-float-medium"></div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-2 relative z-10">
                <div>
                  <h3 className="text-lg lg:text-2xl font-bold mb-2 animate-text-wave">Senior SRE/DevOps Engineer</h3>
                  <p className="text-primary font-semibold text-base lg:text-lg">ABSA</p>
                </div>
                <span className="px-3 py-1 lg:px-4 lg:py-2 bg-primary/10 text-primary rounded-full font-medium text-sm lg:text-base self-start animate-bounce-gentle hover:animate-wiggle">April 2024 - Present</span>
              </div>
              <ul className="text-muted-foreground space-y-3 text-lg">
                <li className="flex items-start gap-3">📊 Implemented end-to-end monitoring for hybrid cloud systems (on-prem + AWS ECS/EKS)</li>
                <li className="flex items-start gap-3">🚨 Led OpsGenie integration reducing platform-team alerts by 60%</li>
                <li className="flex items-start gap-3">📈 Migrated 25+ applications to OpenSearch enabling self-service logging</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Senior AWS DevOps Engineer</h3>
                  <p className="text-primary font-semibold text-lg">EqualExperts (Consultant @ John Lewis Partnership)</p>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">November 2023 - March 2024</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background/50 rounded-xl p-4">
                  <h4 className="font-bold mb-3 text-primary">Platform</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Terraform & CloudFormation</li>
                    <li>• Kubernetes (EKS)</li>
                    <li>• Backstage</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-xl p-4">
                  <h4 className="font-bold mb-3 text-primary">Monitoring</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Prometheus + Grafana</li>
                    <li>• Jenkins/GitLab</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Cloud Support Engineer (Containers)</h3>
                  <p className="text-primary font-semibold text-lg">AWS</p>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">November 2022 - November 2023</span>
              </div>
              <p className="text-lg text-muted-foreground mb-4">Supported 1000+ customer container environments on EKS/ECS with on-call rotations.</p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-background/50 rounded-xl p-4">
                  <h4 className="font-bold mb-3 text-primary">Platform</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Amazon EKS/ECS</li>
                    <li>• AWS Fargate</li>
                    <li>• AWS CodePipeline</li>
                  </ul>
                </div>
                <div className="bg-background/50 rounded-xl p-4">
                  <h4 className="font-bold mb-3 text-primary">Monitoring</h4>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• CloudWatch</li>
                    <li>• Prometheus/Grafana</li>
                    <li>• AWS X-Ray</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">DevOps Engineer</h3>
                  <p className="text-primary font-semibold text-lg">FNB</p>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">September 2020 - November 2022</span>
              </div>
              <ul className="text-muted-foreground space-y-3 text-lg">
                <li className="flex items-start gap-3">🚀 Built CI/CD pipeline from scratch on Bamboo</li>
                <li className="flex items-start gap-3">📦 Containerized all 13 Java applications within SLA</li>
                <li className="flex items-start gap-3">📊 Leveraged Prometheus, Grafana, Elasticsearch for monitoring</li>
                <li className="flex items-start gap-3">🔐 Deployed Keycloak for centralized authentication</li>
                <li className="flex items-start gap-3">🗄️ Created version control for database SQL files using Liquibase</li>
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Software Engineer</h3>
                  <p className="text-primary font-semibold text-lg">IBM</p>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">August 2018 - September 2020</span>
              </div>
              <ul className="text-muted-foreground space-y-3 text-lg">
                <li className="flex items-start gap-3">☁️ Deployed Java EE applications on OpenShift using Open Liberty</li>
                <li className="flex items-start gap-3">⚡ Developed Node.js middleware exposing IBM DB2 to REST APIs</li>
                <li className="flex items-start gap-3">🐳 Built and deployed Docker containers for microservices</li>
                <li className="flex items-start gap-3">🏗️ Deployed IBM Cloud Private on x86 infrastructure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="mb-20 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 flex items-center gradient-text">
            <GraduationCap className="mr-2 lg:mr-4 text-primary" size={24} /> Education
          </h2>
          <div className="grid gap-6">
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Certified Kubernetes Administrator (CKA)</h3>
                    <p className="text-primary font-semibold text-lg">Linux Foundation</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">Sep 2023 - Sep 2026</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">AWS Certified Solutions Architect – Associate</h3>
                    <p className="text-primary font-semibold text-lg">Amazon Web Services</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">May 2025 - May 2028</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">B.Tech Information Technology</h3>
                    <p className="text-primary font-semibold text-lg">Vaal University of Technology</p>
                    <p className="text-muted-foreground">Majored in Software Engineering</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">2017</span>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <GraduationCap className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">National Senior Certificate</h3>
                    <p className="text-primary font-semibold text-lg">Tersia King Learning Academy</p>
                  </div>
                </div>
                <span className="px-4 py-2 bg-muted/20 rounded-full font-medium">2010</span>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-20 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 flex items-center gradient-text">
            <Code className="mr-2 lg:mr-4 text-primary" size={24} /> Skills
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card rounded-2xl p-8 hover-lift bounce-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-primary/10 rounded-full animate-bounce-gentle">
                  <Code className="text-primary animate-pulse-rotate" size={24} />
                </div>
                <h3 className="text-2xl font-bold animate-text-wave">Programming/Scripting</h3>
              </div>
              <div className="flex flex-wrap gap-3 relative z-10">
                {['Python', 'Bash', 'Java', 'JavaScript', 'Node.js', 'PowerShell'].map((skill, index) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default opacity-0 animate-fade-in bounce-tag" style={{animationDelay: `${index * 100}ms`, animationFillMode: 'forwards'}}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-8 hover-lift bounce-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="p-3 bg-primary/10 rounded-full animate-bounce-gentle">
                  <Briefcase className="text-primary animate-pulse-rotate" size={24} />
                </div>
                <h3 className="text-2xl font-bold animate-text-wave">DevOps</h3>
              </div>
              <div className="flex flex-wrap gap-3 relative z-10">
                {['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Prometheus', 'Grafana', 'OpenSearch', 'Jenkins', 'GitLab'].map((skill, index) => (
                  <span key={skill} className="px-4 py-2 bg-primary/10 text-primary rounded-full font-medium hover:bg-primary/20 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-default opacity-0 animate-fade-in bounce-tag" style={{animationDelay: `${index * 100}ms`, animationFillMode: 'forwards'}}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="mb-20 fade-in">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 flex items-center gradient-text">
            <Users className="mr-2 lg:mr-4 text-primary" size={24} /> References
          </h2>
          <div className="glass-card rounded-2xl p-8 hover-lift text-center bounce-card relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-slide-x"></div>
            <div className="flex items-center justify-center gap-4 mb-6 relative z-10">
              <div className="p-4 bg-primary/10 rounded-full animate-bounce-gentle">
                <Users className="text-primary animate-pulse-rotate" size={32} />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Professional References</h3>
            <p className="text-xl text-muted-foreground hover:text-foreground transition-colors duration-200">References are available on request</p>
            <div className="mt-4 flex justify-center">
              <div className="w-16 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-full"></div>
            </div>
          </div>
        </section>
      </main>
      
      <Tetris isOpen={tetrisOpen} onClose={() => setTetrisOpen(false)} />
    </div>
  )
}