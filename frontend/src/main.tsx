import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { PersistGate } from 'redux-persist/integration/react';

import { Toaster } from '@/components/ui/sonner';

import Loading from './components/Loading';
import './index.css';
import { router } from './routes';
import { persistor, store } from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    <Toaster />
  </StrictMode>
);
