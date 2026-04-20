import NavBar from '@/components/NavBar';
import { Boxes } from '@/components/ui/background-boxes';
import { Button } from '@/components/ui/button';

const LandingPage = () => {
  return (
    <>
      <main className="relative h-dvh overflow-hidden m-2 border-2 rounded-2xl flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full bg-gray-950 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none opacity-55" />
        <Boxes className="inset-0 "></Boxes>
        <NavBar />

        <div className="flex flex-col gap-10 z-20 items-center">
          <div className="flex gap-10 items-center">
            <div className="size-25 bg-white rounded-xl p-5 ">
              <img
                src="https://see.fontimg.com/api/rf5/6Y4Ov/ZDJjOWM2YzIyYWY3NDU3NmJmYWZmOTQ1ZTlmY2I2ZTEudHRm/Wg/urban-sketart.png?r=fs&h=133&w=1000&fg=000000&bg=FFFFFF&tb=1&s=133"
                alt="Graffiti fonts"
              ></img>
            </div>
            <h1 className="font-mono font-semibold text-7xl">Zync</h1>
          </div>
          <div className="flex flex-col gap-5 items-center">
            <h2 className="font-mono  text-4xl ">
              Seamless{' '}
              <span className="text-[#e80c90] italic text-5xl max-md:text-4xl">
                Video Conferencing{' '}
              </span>
            </h2>
            <h3 className="font-mono  text-4xl ">for effortless collaboration</h3>
          </div>
          <Button className="text-xl active:shadow-sm active:translate-y-1">Join a Meeting</Button>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
