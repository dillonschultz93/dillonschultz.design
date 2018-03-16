<template>
  <div id="about">
    <div class="container">
      <h1 class="heading">About Me</h1>
      <div class="about-container">
        <div class="portrait">
          <img src="../assets/dillon.jpg" alt="dillon schultz's portrait">
        </div>
        <div class="text-container">
          <p class="paragraph">
            A result-driven Front-End Developer with an extensive background
            working in graphic design and editorial design. Looking to apply knowledge
            of front-end development and graphic design to create user-friendly
            and polished web applications.
          </p>
          <hr>
          <div class="info-container">
            <div class="location">
              <img src="../assets/svg-icons/location.svg" alt="location icon" class="icon">
              <p class="info">Arizona</p>
            </div>
            <div class="phone">
              <img src="../assets/svg-icons/phone.svg" alt="phone icon" class="icon">
              <p class="info">(520) 338-6259</p>
            </div>
            <div class="email">
              <img src="../assets/svg-icons/email.svg" alt="email icon" class="icon">
              <a href="mailto:hello@dillonschultz.design" class="info">
                hello@dillonschultz.design
              </a>
            </div>
            <div class="resume">
              <img src="../assets/svg-icons/download.svg" alt="download icon" class="icon">
              <a href="#" class="info">
                Résumé
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about',
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
  #about {
    lost-center: 1200px;
    lost-utility: clearfix;
  }
  .container{
    margin-top: 15vh;
  }
  .about-container{
    align-items: center;
    display: flex;
  }
  .portrait {
    lost-column: 1/3;
    lost-utility: clearfix;
    img {
      border-radius: 100%;
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }
  .text-container {
    lost-column: 2/3;
    lost-utility: clearfix;
  }
  .paragraph{
    color: $primary-shade;
    font-family: $primary-font;
    font-size: $heading-4-size;
    font-weight: $light-weight;
    line-height: $primary-leading;
  }
  hr {
    border-top: .1em solid $primary-shade;
  }
  .info-container{
    display: flex;
    lost-column: 1/1;
    justify-content: space-evenly;
  }
  .location{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .phone{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .email{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .resume{
    align-items: center;
    display: flex;
    justify-content: center;
  }
  .icon {
    height: $paragraph;
    margin-right: 15px;
  }
  .info{
    color: $primary-shade;
    font-family: $primary-font;
    font-size: $paragraph;
    font-weight: $light-weight;
    line-height: $primary-leading;
    text-decoration: none;
  }
  .heading {
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-1-size;
    font-weight: $heavy-weight;
    margin-bottom: 80px;
    margin-top: 0;
  }
</style>
