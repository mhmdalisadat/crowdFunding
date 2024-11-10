/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */

import { createTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from 'src/theme';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import Router from 'src/routes/sections';
import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

export default function App() {
  const queryClient = new QueryClient();
  useScrollToTop();

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location = window.self.location;
    }
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
