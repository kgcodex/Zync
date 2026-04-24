import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12">
      <div className="container mx-auto px-6 border-t border-zinc-900 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="size-12 bg-white rounded-xl p-2 ">
            <img src="/logo.jpg" alt="Graffiti fonts"></img>
          </div>
          <p className="text-2xl font-extrabold text-white">Zync</p>
        </div>

        <p className="text-zinc-500 text-sm">
          Built with ❤️ by <span className="text-zinc-300">Kunal Goel</span>
        </p>

        <div className="flex items-center gap-6 text-zinc-400">
          <a href="https://github.com/kgcodex" className="hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/kunalgoel101"
            className="hover:text-white transition-colors"
          >
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
