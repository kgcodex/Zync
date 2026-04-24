import { Globe, MessageSquare, Monitor, Shield, Sparkles, Zap } from 'lucide-react';

const features = [
  {
    title: 'Low Latency P2P',
    description:
      'Direct peer-to-peer connections using WebRTC ensures your video and audio stay perfectly in sync.',
    icon: <Zap className="w-6 h-6 text-pink-500" />,
  },
  {
    title: 'Effortless Screen Sharing',
    description:
      'Share your entire screen or just a window with a single click. Perfect for presentations and coding.',
    icon: <Monitor className="w-6 h-6 text-blue-500" />,
  },
  {
    title: 'Real-time Threaded Chat',
    description:
      'Keep the conversation organized with message replies and instant updates during every meeting.',
    icon: <MessageSquare className="w-6 h-6 text-purple-500" />,
  },
  {
    title: 'Secure by Design',
    description:
      'Built on top of industry-standard protocols, ensuring your media streams never touch a central server.',
    icon: <Shield className="w-6 h-6 text-green-500" />,
  },
  {
    title: 'Developer First',
    description:
      'Built with a modern stack including React, TypeScript, Vite, Express for a robust and scalable experience.',
    icon: <Globe className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: 'AI-Powered (Pro)',
    description:
      'Unlock live translation, automated meeting summaries, and digital backgrounds to boost productivity.',
    icon: <Sparkles className="w-6 h-6 text-cyan-500" />,
  },
];

const FeatureGrid = () => {
  return (
    <section className="py-24 ">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything you need for <span className="text-pink-500">Zyncing</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A powerful tool designed to make remote collaboration feel like you're in the same room.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(236,72,153,0.2)]"
            >
              <div className="mb-6 p-3 bg-zinc-800 w-fit rounded-lg group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
