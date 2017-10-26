// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Dashboard from './components/Dashboard.vue'
import Issues from './components/Issues.vue'
import Profile from './components/Profile.vue'
import Signin from './components/Signin.vue'

import '@progress/kendo-ui'
import { KendoButtonGroup, KendoButtonsInstaller } from '@progress/kendo-buttons-vue-wrapper'
import { KendoDataSource, KendoDataSourceInstaller } from '@progress/kendo-datasource-vue-wrapper'
import { KendoGrid, KendoGridInstaller } from '@progress/kendo-grid-vue-wrapper'

Vue.use(Router)
Vue.use(KendoButtonsInstaller)
Vue.use(KendoGridInstaller)
Vue.use(KendoDataSourceInstaller)

const routes = [
  { path: '/', component: Dashboard },
  { path: '/dashboard', component: Dashboard },
  { path: '/issues', component: Issues },
  { path: '/profile', component: Profile },
  { path: '/signin', component: Signin }
]

const router = new Router({
  routes,
  linkActiveClass: 'active'
})

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(App),
  router,
  components: {
    KendoButtonGroup,
    KendoDataSource,
    KendoGrid
  }
})
