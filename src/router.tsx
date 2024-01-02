import { createBrowserRouter } from 'react-router-dom';

import VerifyMail from '@/pages/authentication/verify-mail.tsx';

import App from './App';
import HomeLayout from './layout/home-layout';
import NotFoundPage from './pages/404';
import ForgotPasswordPage from './pages/authentication/forgot-password';
import ResetPasswordPage from './pages/authentication/reset-password';
import SignInPage from './pages/authentication/sign-in';
import SignUpPage from './pages/authentication/sign-up';
import ProfilePage from './pages/profile-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: '/profile/:id',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordPage />,
  },
  {
    path: '/verify-email',
    element: <VerifyMail />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
