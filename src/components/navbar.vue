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
    #portfolio{
      margin-right: 0;
    }
  }
  #about:hover{
    color: $primary-shade-2;
    transition: color 0.3s;
  }
  #about:active{
    color: $primary-shade-2;
  }
  #portfolio:hover{
    color: $primary-shade-2;
    transition: color 0.3s;
  }
  #logo {
    width: 50px;
    height: 50px;
  }
  // ==== Media queries =======================================================
  @media only screen and (max-width: 1199px){
    #navbar{
      lost-center: 980px flex;
      padding: 0 30px;
    }
  }
  @media only screen and (max-width: 400px){
    #nav-links{
      li{
        font-size: $paragraph;
        margin-left: 8px;
        margin-right: 8px;
      }
      #portfolio{
        margin-right: 0;
      }
    }
    #logo{
      width: 35px;
      height: 35px;
    }
  }
  @media only screen and (max-width: 320px){
    #navbar{
      lost-center: 320px flex;
      padding: 0 20px;
    }
  }
</style>
