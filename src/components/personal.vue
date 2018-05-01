<template>
  <div id="personal">
    <div class="component-container">
      <div class="top-section">
        <div class="project-title">
          <h1>Personal Portfolio</h1>
          <!-- <router-link :to="{ name: 'portfolio'}" class="back">
            back
          </router-link> -->
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
        <hr>
        <div class="section-title">
          <h3 class="title">Low Fidelity Wireframes</h3>
        </div>
        <div class="content-container">
          <img src="../assets/politivue-mock.png" class="project-image">
          <img src="../assets/politivue-mock.png" class="project-image">
        </div>
        <hr>
        <div class="section-title">
          <h3 class="title">High Fidelity Comps</h3>
        </div>
        <div class="content-container">
          <img src="../assets/politivue-mock.png" class="project-image">
          <img src="../assets/politivue-mock.png" class="project-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'personal',
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
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
    .section-title{
      lost-column: 1/1;
      .title{
        color: $gray;
        font-family: $heading-font;
        font-size: $heading-3-size;
        margin: 0;
      }
    }
    .content-container{
      lost-column: 1/1;
      margin-top: 10vh;
      margin-bottom: 10vh;
    }
    .project-image{
      lost-column: 1/2;
      // width: 100%;
    }
  }

  //==== Media Queries ========================================================
  @media only screen and (max-width: 1199px){
    #personal {
      lost-center: 980px;
      padding: 0 30px;
    }
  }

  @media only screen and (max-width: 800px){
    .project-title {
      lost-column: 1/1;
    }
    .project-description {
      lost-column: 1/1;
    }
    .tags {
      lost-column: 1/1;
    }
    .links {
      lost-column: 1/1;
    }
  }

  @media only screen and (max-width: 500px){
    .project-title {
      font-size: $heading-4-size;
    }

    .project-description {
      font-size: $paragraph;
    }
    .tags {
      font-size: $small-paragraph;
    }
    .section-title{
      text-align: center;
    }
    .content-container {
      margin-top: 24px;
      .project-image{
        lost-column: 1/1;
        margin-bottom: 24px;
      }
    }
  }
</style>
