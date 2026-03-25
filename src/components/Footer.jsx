const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-black mb-2 tracking-tighter">
            SUMANTH<span className="text-blue-500">.</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xs">
            Software Engineering Student & Flutter Full Stack Developer based in Andhra Pradesh, India.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 items-center md:items-end">
          <div className="flex gap-6 text-sm font-medium text-gray-400">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
          <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
            © 2026 Jallipalli Sumanth. Built with React & Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
