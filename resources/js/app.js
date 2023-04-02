import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

import Master from './components/Master.vue';

const app = createApp({});

const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router);
  app.component("master-component", Master);
  app.mount('#app');
