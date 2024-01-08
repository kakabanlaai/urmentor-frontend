import { createBrowserRouter } from 'react-router-dom';

import Index from '@/layout/admin-layout';
import DashboardLayout from '@/layout/dashboard-layout.tsx';
import SessionRegisterLayout from '@/layout/session-register-layout.tsx';
import MentorApplicationPage from '@/pages/admin/mentor-application-page.tsx';
import VerifyMail from '@/pages/authentication/verify-mail.tsx';
import SessionRegisterPage from '@/pages/session-register-page.tsx';
import DetailSessionPage from '@/pages/user-dashboard/detail-session-page.tsx';
import MySessionPage from '@/pages/user-dashboard/my-session-page.tsx';
import PersonaPage from '@/pages/user-dashboard/persona-page.tsx';
import ProgramPage from '@/pages/user-dashboard/program-page.tsx';
import SessionPage from '@/pages/user-dashboard/session-page.tsx';

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
    children: [
      {
        index: true,
        element: <MySessionPage />,
      },
      {
        path: 'user-info',
        element: <PersonaPage />,
      },

      {
        path: 'sessions',
        element: <SessionPage />,
      },
      {
        path: 'sessions/:sessionId',
        element: <DetailSessionPage />,
      },
      {
        path: 'programs',
        element: <ProgramPage />,
      },
    ],
  },
  {
    path: '/session-register',
    element: <SessionRegisterLayout />,
    children: [
      {
        path: ':sessionId',
        element: <SessionRegisterPage />,
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
