<template>
  <div id="illustrations">
    <div class="component-container">
      <div class="top-section">
        <div class="project-title">
          <h1>Illustrations</h1>
          <!-- <router-link :to="{ name: 'portfolio'}" class="back">
            back
          </router-link> -->
        </div>
        <div class="project-description">
          <p class="paragraph">
            Vector illustrations drew me to graphic design initially. As such,
            my projects in that vein have influenced my personal aesthetic the
            most. I appreciate a seemingly minimalist approach that displays a
            skillful rendering of the object drawn. Projects displayed here
            include illustrations from a personal Hero’s Journey book I created
            as well as a daily iconography challenge.
          </p>
          <div class="project-info">
            <div class="tags">
              <p>Graphic Design</p>
              <p>&bull;</p>
              <p>Vector Illustrations</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-section">
        <hr>
        <div class="section-title">
          <h3 class="title">Icon per Day</h3>
        </div>
        <div class="content-container">
          <img src="../assets/Day-1-icon-.jpg" class="project-image">
          <img src="../assets/Day-3-icon-.jpg" class="project-image">
          <img src="../assets/Day-4-icon-.jpg" class="project-image">
          <img src="../assets/Day-7-icon-.jpg" class="project-image">
          <img src="../assets/Day-14-icon-.jpg" class="project-image">
          <img src="../assets/Day-17-icon-.jpg" class="project-image">
        </div>
        <hr>
        <div class="section-title">
          <h3 class="title">Miscellaneous Illustrations</h3>
        </div>
        <div class="content-container">
          <img src="../assets/page-1.jpg" class="project-image">
          <img src="../assets/page-2.jpg" class="project-image">
          <img src="../assets/page-5.jpg" class="project-image">
          <img src="../assets/page-6.jpg" class="project-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'illustrations',
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
        lost-column: 1/1;
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
      lost-column: 1/3;
      margin-bottom: 24px;
    }
  }

  //==== Media Queries ========================================================
  @media only screen and (max-width: 1199px){
    #illustrations {
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
