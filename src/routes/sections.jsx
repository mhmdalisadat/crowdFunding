/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const RequestPage = lazy(() => import('src/pages/request'));
export const ProfilePage = lazy(() => import('src/module/profile/page/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProcessProjectPage = lazy(() => import('src/pages/processProject'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Success = lazy(() => import('src/pages/resultpayment/paymentResualt'));
export const Failed = lazy(() => import('src/pages/resultpayment/Failed'));
export const Card = lazy(() => import('src/components/stepper'));
export const PaymentPage = lazy(() => import('src/module/plan/payment/page/pymentpage'));
export const Plans = lazy(() => import('src/module/plan/page/plans'));
export const Plan = lazy(() => import('src/module/plan/page/plan'));
export const CertificateSideBar = lazy(() => import('src/module/certificateSideBar/cerSideBar')); //
export const Sterpercrowd = lazy(() => import('src/components/stepper'));
export const PaymentResualt = lazy(() => import('src/pages/resultpayment/paymentResualt'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'plans', element: <Plans /> },
        { path: 'plan/:traceCode', element: <Plan /> },
        { path: 'process', element: <ProcessProjectPage /> },
        { path: 'ProfilePage', element: <ProfilePage /> },

        { path: 'card', element: <Sterpercrowd /> },
        { path: 'certificate', element: <CertificateSideBar /> },
        { path: 'PaymentPage', element: <PaymentPage /> },
      ],
    },

    {
      path: 'paymentresult',
      element: <PaymentResualt />,
    },

    {
      path: 'login',
      element: <LoginPage />,
    },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
