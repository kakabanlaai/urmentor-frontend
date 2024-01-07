import { createBrowserRouter } from 'react-router-dom';

import Index from '@/layout/admin-layout';
import DashboardLayout from '@/layout/dashboard-layout.tsx';
import MentorApplicationPage from '@/pages/admin/mentor-application-page.tsx';
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
        path: '/profile/:mentorId',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <Index />,
    children: [
      {
        path: 'mentor-applications',
        element: <MentorApplicationPage />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
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
