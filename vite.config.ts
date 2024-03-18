import { defineConfig } from 'vite';
import * as path from 'node:path';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3001,
    watch: {
      usePolling: true,
    },
  },
  plugins: [react(), viteTsconfigPaths()],
});
