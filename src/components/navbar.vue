<template>
  <div id="navbar">
    <div id="nav-items">
      <router-link :to="{ name: 'home'}">
        <img src="../assets/logo.svg" alt="dillonschultz.design logo" id="logo">
      </router-link>
      <ul id="nav-links">
        <router-link :to="{ name: 'about'}">
          <li id="about">About</li>
        </router-link>
        <router-link :to="{ name: 'portfolio'}">
          <li id="portfolio">Portfolio</li>
        </router-link>
        <router-link :to="{ name: '', params: {} }">
          <li id="contact">Contact</li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
    };
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
  #navbar {
    box-sizing: border-box;
    lost-center: 1200px flex;
  }
  #nav-items{
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%;
  }
  #nav-links{
    display: flex;
    a {
      text-decoration: none;
      list-style: none;
    }
    li {
      color: $primary-shade;
      margin-left: 15px;
      margin-right: 15px;
      font-family: $heading-font;
      font-size: $heading-4-size;
    }
  }
  #logo {
    width: 50px;
    height: 50px;
  }
</style>
