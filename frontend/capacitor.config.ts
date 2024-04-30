import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.healthymealz.app',
  appName: 'healthyMealz',
  webDir: 'build',

  server: {
    androidScheme: 'https'
  }
};

export default config;
