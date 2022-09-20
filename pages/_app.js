import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from 'next/router';
import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthContextProvider } from '../context/AuthContext';
import { initFirebaseApp } from "../firebase/initFirebase";
import '../styles/globals.css';

initFirebaseApp();
const queryClient = new QueryClient()
const PUBLIC_ROUTES = ['/login', '/'];

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        {PUBLIC_ROUTES.includes(router.pathname)
          ?
          (<Component {...pageProps} />)
          : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )
        }

      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp