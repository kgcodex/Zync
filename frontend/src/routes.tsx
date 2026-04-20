import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';

import Loading from './components/Loading';
import ProtectedRoute from './protectedRoute';

// Lazy Load Pages
const LandingPage = lazy(() => import('./Pages/LandingPage'));
const AuthPage = lazy(() =>
  import('./Pages/AuthPage').then((module) => ({ default: module.AuthPage }))
);
const Meeting = lazy(() => import('./Pages/Meeting'));
const MeetingDashboard = lazy(() => import('./Pages/MeetingDashboard'));

const Loadable = (Component: React.ComponentType) => (props: any) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

const LazyLanding = Loadable(LandingPage);
const LazyAuth = Loadable(AuthPage);
const LazyMeeting = Loadable(Meeting);
const LazyDashboard = Loadable(MeetingDashboard);

export const router = createBrowserRouter([
  {
    path: '',
    element: <LazyLanding />,
  },
  {
    path: 'auth/:login_signin',
    element: <LazyAuth />,
  },

  // Protected Route
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/meeting',
        element: <LazyDashboard />,
      },
      {
        path: '/meeting/:meetingCode',
        element: <LazyMeeting />,
      },
    ],
  },
  // Fallback for 404
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
