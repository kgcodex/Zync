import { Check, Sparkles } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for quick syncs and community hangouts.',
      features: [
        'Unlimited Many-to-Many calls',
        'Screen sharing',
        'Real-time threaded chat',
        'Peer-to-peer privacy',
        'Mobile responsive UI',
      ],
      buttonText: 'Start for Free',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '12',
      description: 'The power of AI to supercharge your productivity.',
      features: [
        'AI Live Translation',
        'Auto-Summarization & Notes',
        'Digital Backgrounds',
        'Custom Meeting Links',
        'Priority Support',
      ],
      buttonText: 'Join Waitlist',
      highlighted: true,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125 bg-pink-500/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Host unlimited meetings for free, or unlock AI-driven insights with our Pro plan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-zinc-900 border-pink-500/50 shadow-[0_0_40px_-15px_rgba(236,72,153,0.3)]'
                  : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-r from-pink-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                  <Sparkles size={12} /> RECOMMENDED
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-zinc-500">/month</span>
                </div>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <Check size={18} className="text-blue-500 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-linear-to-r from-pink-600 to-blue-600 hover:opacity-90 text-white'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-white'
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Pricing;
