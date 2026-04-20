import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const NavBar = () => {
  return (
    <nav className="border-primary absolute top-0 inset-x-0 z-20 p-2 border-b-2   flex items-center justify-between">
      <div className="flex items-center gap-5">
        <div className="size-12 bg-white rounded-xl p-3 ">
          <img
            src="https://see.fontimg.com/api/rf5/6Y4Ov/ZDJjOWM2YzIyYWY3NDU3NmJmYWZmOTQ1ZTlmY2I2ZTEudHRm/Wg/urban-sketart.png?r=fs&h=133&w=1000&fg=000000&bg=FFFFFF&tb=1&s=133"
            alt="Graffiti fonts"
          ></img>
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
  );
};

export default NavBar;
