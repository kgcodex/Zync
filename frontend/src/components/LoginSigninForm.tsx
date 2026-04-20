import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import api from '@/api';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/store/hooks';
import { initUser } from '@/store/userSlice';
import type { LoginSigninFormProps } from '@/types/types';

const LoginSigninForm = ({ title, onSubmit, children }: LoginSigninFormProps) => {
  return (
    <div className="w-full h-full mt-10 md:mx-20">
      <CardHeader>
        <CardTitle className="text-4xl font-mono text-center mb-5">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <Button className="w-full mt-10 active:shadow-sm active:translate-y-1" onClick={onSubmit}>
          {title}
        </Button>
      </CardFooter>
    </div>
  );
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const from = location.state?.from?.pathname || '/meeting';

  const handleSubmit = async () => {
    try {
      const response = await api.post('users/login', {
        username: username,
        password: password,
      });

      localStorage.setItem('sessionToken', response.data?.sessionToken);
      toast.success(`Welcome: ${response?.data?.name}`);

      dispatch(initUser(response.data));
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error(err);
      //toast.error(`Log in Error: ${err.response?.data?.message || 'Log in failed'}`);
    }
  };

  return (
    <LoginSigninForm title="Log in" onSubmit={handleSubmit}>
      <form>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="login-Username" className="text-md">
              Username
            </Label>
            <Input
              id="login-Username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="login-Password" className="text-md">
              Password
            </Label>
            <Input
              id="login-Password"
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </form>
    </LoginSigninForm>
  );
};

export const SigninForm = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await api.post('users/register', {
        name: name,
        username: username,
        password: password,
      });
      toast.success(response.data.message);
    } catch (err: any) {
      toast.error(`Sign in Error: ${err.response?.data?.message}` || 'Sign in failed');
    }
  };

  return (
    <LoginSigninForm title="Sign in" onSubmit={handleSubmit}>
      <form>
        <div className="flex flex-col gap-5">
          <div className="space-y-2">
            <Label htmlFor="Name" className="text-md">
              Name
            </Label>
            <Input
              id="Name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="Username" className="text-md">
              Username
            </Label>
            <Input
              id="Username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Label htmlFor="Password" className="text-md">
              Password
            </Label>
            <Input
              id="Password"
              placeholder="Password"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </form>
    </LoginSigninForm>
  );
};
