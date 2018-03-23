<template>
  <div id="app">
    <Navbar />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import Navbar from './components/navbar';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    next();
  },
};
</script>

<style lang="scss">
  #app {
    height: 96vh;
  }
  // ANIMATIONS
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.55s, transform 0.60s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
    transform: translateX(30%);
  }
</style>
