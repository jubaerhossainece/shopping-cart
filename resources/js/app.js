import './bootstrap';
import { createApp } from 'vue';
import  router  from './routes';
import store from './store/index.js';

import Master from './pages/App.vue';

const app = createApp(Master);

app.use(router);
app.use(store);

app.component("master-component", Master);
app.mount('#app');
