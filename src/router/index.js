import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import About from '@/components/about';
import Portfolio from '@/components/portfolio';
import PolitiVue from '@/components/politivue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio,
    },
    {
      path: '/portfolio/politivue',
      name: 'politivue',
      component: PolitiVue,
    },
  ],
});
