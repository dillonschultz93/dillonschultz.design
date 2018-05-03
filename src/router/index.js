import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home';
import About from '@/components/about';
import Portfolio from '@/components/portfolio';
import PolitiVue from '@/components/politivue';
import Momento from '@/components/momento';
import Personal from '@/components/personal';
import ReelVue from '@/components/reelvue';
import Editorial from '@/components/editorial';
import Illustrations from '@/components/illustrations';

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
    {
      path: '/portfolio/momento',
      name: 'momento',
      component: Momento,
    },
    {
      path: '/portfolio/personal-portfolio',
      name: 'personal',
      component: Personal,
    },
    {
      path: '/portfolio/reelvue',
      name: 'reelvue',
      component: ReelVue,
    },
    {
      path: '/portfolio/editorial-design',
      name: 'editorial',
      component: Editorial,
    },
    {
      path: '/portfolio/illustrations',
      name: 'illustrations',
      component: Illustrations,
    },
  ],
  /* eslint no-unused-vars: 0 */
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ x: 0, y: 0 });
      }, 500);
    });
  },
});
