import Vue from 'vue';
import './directive.js';
import './filter.js';
import url from './url.js';

import Http from './Http.js';
import './components.js';
import './Origin.js';
import ElementUI from 'element-ui';
import '../styles/element-variables.scss';
import { pcaa } from 'area-data';
import 'vue-area-linkage/dist/index.css'; // v2 or higher
import VueAreaLinkage from 'vue-area-linkage';
import VCharts from 'v-charts'

Vue.prototype.$pcaa = pcaa;

Vue.use(VueAreaLinkage)
Vue.use(VCharts)

Vue.use(ElementUI, {
    size: 'mini'
});

import '@/styles/styles.scss';

Vue.prototype.$Url = url;
Vue.prototype.$http = Http;


import VueDraggableResizable from 'vue-draggable-resizable'
// optionally import default styles
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component('vue-draggable-resizable', VueDraggableResizable)



import vdr from 'vue-draggable-resizable-gorkys'

// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)