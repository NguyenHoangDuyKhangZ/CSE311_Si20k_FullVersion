'use client';

import { useStore } from '@/context/store_context';

export default function Contact() {
  const { showNotification } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('Thank you for contacting us! We will respond soon.', 'success');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="section bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20" id="contact">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-bold text-pink-500 mb-2">Contact</h3>
          <h2 className="text-4xl font-bold text-white">Get in touch through these channels</h2>
        </div>

        {/* Info Grid (4 cột) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: 'fa-map-marker-alt', title: 'Address', text: 'HL601 Road, Binh Duong' },
            { icon: 'fa-phone', title: 'Phone', text: '(+84)123 456 789' },
            { icon: 'fa-envelope', title: 'Email', text: 'si20k@gmail.com' },
            { icon: 'fa-share-alt', title: 'Follow us', isSocial: true }
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-6 rounded-xl bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700/50 transition-all border border-slate-700 hover:border-pink-500/50 group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-red-500 text-white flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-pink-500/30">
                <i className={`fas ${item.icon}`}></i>
              </div>
              <div>
                <h6 className="font-bold text-pink-400 mb-1">{item.title}</h6>
                {item.isSocial ? (
                  <div className="flex gap-3 text-slate-400">
                    {['facebook-f', 'twitter', 'instagram', 'youtube'].map(social => (
                      <a key={social} href="#" className="hover:text-pink-400 transition-colors"><i className={`fab fa-${social}`}></i></a>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-300 text-sm">{item.text}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Map (Iframe) */}
          <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
            <iframe
              src="https://maps.google.com/maps?q=Binh%20Duong&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              loading="lazy"
              className="border-0 grayscale hover:grayscale-0 transition-all duration-300"
            ></iframe>
          </div>

          {/* Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  placeholder="Your name" 
                  required 
                  className="w-full p-4 rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none transition-all" 
                />
                <input 
                  type="email" 
                  placeholder="Your email" 
                  required 
                  className="w-full p-4 rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none transition-all" 
                />
              </div>
              <input 
                type="text" 
                placeholder="Subject" 
                className="w-full p-4 rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none transition-all" 
              />
              <textarea 
                placeholder="Message" 
                required 
                rows={4} 
                className="w-full p-4 rounded-xl bg-slate-900/70 border border-slate-600 text-white placeholder-slate-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 outline-none transition-all resize-none"
              ></textarea>
              
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/50 hover:-translate-y-1 transition-all duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}