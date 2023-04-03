import './bootstrap';
import { createApp } from 'vue';
import { router } from './routes';

import Master from './components/Master.vue';

const app = createApp(Master);


  app.use(router);
  app.component("master-component", Master);
  app.mount('#app');
