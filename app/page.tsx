import React from 'react';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      {/* hero Section with Split layout */}
      <section className="min-h-screen flex items-center px-10 md:px-20 pt-32 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* left Content */}
          <div className="space-y-6">
            <span className="uppercase tracking-widest text-xs font-bold text-gray-400">ARC TECH LAB</span>
            
          {/* headline */}
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-tight">
              We <span className="text-black">connect</span> <span className="text-[#0E9A5E]"> People Systems and Solutions</span>
            </h1>

          {/* sub-headline */}
            <p className="text-2xl font-bold text-black leading-relaxed">
              Architectually, arcs are <span className="text-[#0E9A5E]">strong, load-bearing</span> <span className="text-red-600">like us.</span>
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition">Explore Our Work →</button>
              <button className="border border-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition">Our Services</button>
            </div>
            
            {/* stats row */}
            <div className="flex gap-10 pt-8 border-t border-gray-100 mt-8">
              {[ { n: '120+', l: 'Projects' }, { n: '80+', l: 'Clients' }, { n: '12+', l: 'Awards' } ].map(s => (
                <div key={s.l}>
                  <div className="text-2xl font-black text-[#0E9A5E]">{s.n}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* right: Visual Element */}
              <div className="hidden md:block w-full h-full">
             <img 
                  src="/home.jpg" 
                  alt="Digital Experience Agency" 
              className="w-[300%] h-auto object-contain transition-transform duration-500 hover:scale-105" 
             />
        </div>
        </div>
      </section>

      {/* services Section */}
      <section className="py-24 px-10 bg-gray-50">
        <h2 className="text-5xl font-bold text-center mb-16 tracking-tight">Our Expertise</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { title: 'Web Development', icon: '🌐', desc: 'Crafting responsive, high-performance web applications.' },
            { title: 'Mobile Apps', icon: '📱', desc: 'Building intuitive mobile experiences for everyone.' },
            { title: 'Full Stack', icon: '💻', desc: 'Powering ecosystems with robust MERN integration.' }
          ].map((s) => (
            <div key={s.title} className="p-10 bg-white border border-gray-100 rounded-[2rem] shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="text-5xl mb-6">{s.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}