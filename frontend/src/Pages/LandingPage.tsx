import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import FeatureGrid from '@/components/FeatureGrid';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import ProductPreview from '@/components/ProductPreview';
import TechStack from '@/components/TechStack';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  useEffect(() => {
    document.body.classList.add('bg-black');
    return () => {
      document.body.classList.remove('bg-black');
    };
  }, []);
  return (
    <>
      <nav className="border-primary px-8 py-2 border-b-2 flex items-center justify-between">
        <div className="flex items-center justify-center lg:justify-start gap-5">
          <div className="size-14 bg-white rounded-xl p-2 ">
            <img src="/logo.jpg" alt="Graffiti fonts"></img>
          </div>
          <p className="text-2xl font-extrabold text-white">Zync</p>
        </div>

        <div className="flex gap-5 ml-5">
          <Button className="font-semibold text-lg active:shadow-sm active:translate-y-1">
            <Link to={'/auth/login'}>Log in</Link>
          </Button>
          <Button className="font-semibold text-lg active:shadow-sm active:translate-y-1">
            <Link to={'/auth/signin'}>Sign in</Link>
          </Button>
        </div>
      </nav>

      <main className="flex lg:flex-row flex-col justify-between items-center lg:mx-20 mx-10 lg:mt-28 mt-14 gap-10">
        <div className="flex flex-col gap-10">
          <div className="flex items-center max-sm:justify-center gap-8">
            <div className="size-25 rounded-xl p-2 bg-white">
              <img src="/logo.jpg" alt="logo" />
            </div>
            <h1 className="font-mono font-semibold text-7xl">Zync</h1>
          </div>

          <div className="text-center">
            <h2 className="font-mono  text-3xl ">
              Seamless{' '}
              <span className="text-[#e80c90] italic text-4xl max-md:text-3xl">
                Video Conferencing{' '}
              </span>
            </h2>
            <h3 className="font-mono  text-3xl ">for effortless collaboration</h3>
          </div>
          <Button className="text-xl active:shadow-sm active:translate-y-1" asChild>
            <Link to={'/meeting'}>Join a Meeting</Link>
          </Button>
        </div>
        <video
          className="lg:w-1/2 w-[80%] rounded-2xl"
          src="/main_video.mp4"
          autoPlay
          loop
          playsInline
          preload="auto"
          muted
        >
          Hero Video
        </video>
      </main>

      <FeatureGrid />
      <ProductPreview />
      <Pricing />
      <TechStack />
      <Footer />
    </>
  );
};

export default LandingPage;
