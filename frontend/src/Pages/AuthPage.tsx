import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { LoginForm, SigninForm } from '@/components/LoginSigninForm';
import { Boxes } from '@/components/ui/background-boxes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { OverlayProps } from '@/types/types';

const Overlay = ({ login_signin }: OverlayProps) => {
  const [isSignin, setIsSignin] = useState(login_signin === 'signin');
  // const [overlayMode, setOverlayMode] = useState<'login' | 'signin'>('signin');

  useEffect(() => {
    if (login_signin === 'signin') {
      setIsSignin(true);
    }
  }, []);

  return (
    <div
      className={`absolute inset-y-0 right-0 w-1/2 bg-card overflow-hidden rounded-2xl transition-transform duration-700 delay-75 cubic ${isSignin ? '-translate-x-full' : 'translate-x-0'}`}
    >
      {/* Boxes Background  */}
      <Boxes className="inset-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent to-background opacity-100 pointer-events-none" />

      {/* Content  */}
      <div className=" relative flex flex-col justify-center items-center mt-40 z-40">
        <p className="text-4xl font-mono font-bold mb-15">
          {!isSignin ? "Don't have an account." : 'Already have an account.'}
        </p>
        <Button
          className="w-1/2 "
          onClick={() => {
            setIsSignin(!isSignin);
          }}
        >
          {!isSignin ? 'Sign in' : 'Log in'}
        </Button>
      </div>
    </div>
  );
};

export const AuthPage = () => {
  const { login_signin } = useParams<OverlayProps>();
  return (
    <>
      <div className=" flex justify-center items-center h-screen w-full">
        <Card className="relative h-[60dvh] w-[80%] lg:w-[70%] border-primary overflow-hidden">
          <div className="flex">
            {/* Login Card  */}
            <LoginForm />

            {/* Signin Card  */}
            <SigninForm />
          </div>

          {/* Overlay  */}
          <Overlay login_signin={login_signin} />
        </Card>
      </div>
    </>
  );
};
