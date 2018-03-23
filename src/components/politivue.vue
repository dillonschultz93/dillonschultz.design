<template>
  <div id="politivue">
    <router-link :to="{ name: 'portfolio'}" class="back">
      &lt;
    </router-link>
    <div class="component-container">
      <div class="top-section">
        <div class="project-title">
          <h1>PolitiVue</h1>
        </div>
        <div class="project-description">
          <p class="paragraph">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
            id est laborum.
          </p>
          <div class="project-info">
            <div class="tags">
              <p>UX</p>
              <p>&bull;</p>
              <p>Front-End</p>
              <p>&bull;</p>
              <p>Vue.js</p>
            </div>
            <div class="links">
              <a href="https://github.com/dillonschultz93/PolitiVue" target="_blank">
                <img src="../assets/svg-icons/github.svg" alt="github logo" class="icon">
              </a>
              <a href="https://politivue.herokuapp.com/" target="_blank">
                <img src="../assets/svg-icons/globe.svg" alt="globe icon" class="icon">
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="main-section">
        <!-- <img src="../assets/politivue-mock.png" alt="Mock up"> -->
        <div class="img-container">
          <img src="../assets/politivue-mock.png" alt="Mock up">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'politivue',
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
  .back{
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-2-size;
    font-weight: $heavy-weight;
    text-decoration: none;
    margin-left: 1em;
    margin-top: 25vh;
    position: fixed;
  }
  .component-container{
    lost-center: 1200px;
    lost-utility: clearfix;
    margin-top: 15vh;
  }
  .top-section{
    lost-column: 1/1;
    margin-bottom: 80px;
  }
  .project-title{
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-3-size;
    font-weight: $heavy-weight;
    lost-column: 1/2;
  }
  .project-description{
    color: $primary-shade;
    font-family: $primary-font;
    font-size: $heading-4-size;
    font-weight: $primary-weight;
    line-height: $primary-leading;
    lost-column: 1/2;
    .project-info{
      align-items: center;
      display: flex;
      lost-column: 1/1;
      .tags{
        lost-column: 1/2;
        display: flex;
        p{
          margin-right: 15px;
          color: $primary-shade-2;
          font-size: $paragraph;
          font-weight: $light-weight;
        }
      }
      .links{
        display: flex;
        lost-column: 1/2;
        .icon{
          width: $paragraph;
          height: $paragraph;
          margin-right: 15px;
        }
      }
    }
  }
  .main-section{
    lost-column: 1/1;
    .img-container{
      lost-align: top-left;
      img{
        lost-column: 1/2;
      }
    }
  }
</style>
