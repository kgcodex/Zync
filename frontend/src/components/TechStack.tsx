const technologies = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'WebRTC', icon: 'https://cdn.simpleicons.org/webrtc/333333' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'Express', icon: 'https://cdn.simpleicons.org/express/ffffff' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'Socket.io', icon: 'https://cdn.simpleicons.org/socketdotio/ffffff' },
  { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/06B6D4' },
];

const TechStack = () => {
  const doubleTech = [...technologies, ...technologies];

  return (
    <section className="py-20 overflow-hidden mx-10">
      <div className="container mx-auto px-6 mb-16 text-center">
        <h3 className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase italic">
          Powering the Experience
        </h3>
      </div>

      <div className="relative flex overflow-x-hidden">
        {/* Marquee Wrapper */}
        <div className="animate-marquee flex whitespace-nowrap gap-20 items-center">
          {doubleTech.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 group min-w-[120px]"
            >
              <div className="w-12 h-12 flex items-center justify-center transition-all duration-500 filter grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-110">
                <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain" />
              </div>

              <span className="text-[10px] font-bold tracking-widest text-zinc-600 uppercase transition-colors duration-300 group-hover:text-zinc-200">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
