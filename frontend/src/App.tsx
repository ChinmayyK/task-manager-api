import { RouterProvider, createBrowserRouter, Outlet, Navigate } from 'react-router';
import { useAuthStore } from './store/authStore';
import { Toaster } from './components/ui/sonner';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';

const RootLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuthStore();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Placeholders for remaining pages
const NotFoundPage = () => <div className="flex h-screen items-center justify-center text-xl">404 Not Found</div>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      {
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          { path: 'dashboard', element: <DashboardPage /> },
          { path: 'tasks', element: <TasksPage /> },
        ],
      },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
