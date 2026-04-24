const ProductPreview = () => {
  return (
    <section className="relative py-20 overflow-hidden ">
      <div className="max-md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-75 bg-pink-600/10 blur-[100px] rounded-full" />

      <div className="container relative mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <span className="px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 text-zinc-400 text-sm font-medium mb-4">
            Built-in Collaboration
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center">
            Crystal Clear Video. <span className="text-blue-500">Zero Configuration.</span>
          </h2>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 backdrop-blur-sm shadow-2xl">
            <img
              src="/preview.png"
              alt="Zync Meeting Interface"
              className="rounded-xl w-full h-auto object-cover border border-zinc-700/50"
            />
          </div>

          <div className="hidden lg:block absolute -right-8 top-1/4 animate-bounce-slow">
            <div className="bg-zinc-900/90 border border-zinc-700 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-zinc-200 font-medium">Live P2P Connection</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block absolute -left-12 bottom-1/4 animate-bounce-slow-delayed">
            <div className="bg-zinc-900/90 border border-zinc-700 p-4 rounded-xl backdrop-blur-md shadow-xl">
              <span className="text-sm text-zinc-200 font-medium">⚡️ Low Latency Chat</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
