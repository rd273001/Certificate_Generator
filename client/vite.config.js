import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// run package config
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [react()],
  server: {
    port: 3000,
  },
  // define process env
  define: {
    'process.env': process.env
  },
} );