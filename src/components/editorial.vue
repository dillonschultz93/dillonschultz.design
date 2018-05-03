<template>
  <div id="editorial">
    <div class="component-container">
      <div class="top-section">
        <div class="project-title">
          <h1>Editorial Design</h1>
        </div>
        <div class="project-description">
          <p class="paragraph">
            Below is a sampling of my editorial and layout designs from the past
            few years. Coming into my latest role as designer for the Tucson-based
            <em>Well Being Journal</em>, I integrated my style with the
            established history of the publication. In design I value clarity
            and simplicity, bringing these qualities into each of my layouts.
          </p>
          <div class="project-info">
            <div class="tags">
              <p>Graphic Design</p>
              <p>&bull;</p>
              <p>Print</p>
            </div>
          </div>
        </div>
      </div>
      <div class="main-section">
        <hr>
        <div class="section-title">
          <h3 class="title">Well Being Journal</h3>
        </div>
        <div class="content-container">
          <img src="../assets/wbj1.png" class="project-image">
          <img src="../assets/wbj2.png" class="project-image">
          <img src="../assets/wbj3.png" class="project-image">
          <img src="../assets/wbj4.png" class="project-image">
        </div>
        <hr>
        <div class="section-title">
          <h3 class="title">Person, Place, Thing</h3>
        </div>
        <div class="content-container">
          <img src="../assets/layout1.png" class="project-image">
          <img src="../assets/layout2.png" class="project-image">
          <img src="../assets/layout3.png" class="project-image">
        </div>
        <hr>
        <div class="section-title">
          <h3 class="title">Derivation</h3>
        </div>
        <div class="content-container">
          <img src="../assets/derivation1.png" class="project-image">
          <img src="../assets/derivation2.png" class="project-image">
          <img src="../assets/derivation3.png" class="project-image">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editorial',
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
      lost-column: 1/1;
      margin-bottom: 24px;
      // width: 100%;
    }
  }

  //==== Media Queries ========================================================
  @media only screen and (max-width: 1199px){
    #editorial {
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
