import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sh.alexi.harmony',
  appName: 'Harmony',
  webDir: 'dist/apps/client',
  server: {
    androidScheme: 'https'
  }
};

export default config;
