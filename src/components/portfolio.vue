<template>
  <div id="portfolio">
    <h1 class="heading">Portfolio</h1>
    <div class="portfolio">
      <router-link :to="{ name: item.route}" class="portfolio-container"
      v-for="(item, index) in portfolio_items"
      :key="item.id">
        <div class="image-container">
          <div class="content-overlay"></div>
          <img :src="getPics(index)" alt="portfolio item image" class="project-image">
          <div class="info-container fadeIn-bottom">
            <p class="project-name">{{ item.portfolio_name }}</p>
            <div class="shape"></div>
            <p class="project-description">{{ item.description }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'portfolio',
  data() {
    return {
      portfolio_items: [
        {
          portfolio_name: 'Daily UI',
          portfolio_type: 'Front-End',
          description: 'Examples of my contribution to the Daily UI project',
          image: 'dailyui',
          route: 'personal',
        },
        {
          portfolio_name: 'Momento',
          portfolio_type: 'Front-End',
          description: `A micro social network that allows users to 
          upload pictures to online albums.`,
          image: 'momento',
          route: 'momento',
        },
        {
          portfolio_name: 'PolitiVue',
          portfolio_type: 'Front-End',
          description: `A simple app that displays local and federal
          government officials, their party affiliation, and their contact information.`,
          image: 'politivue',
          route: 'politivue',
        },
        {
          portfolio_name: 'ReelVue',
          portfolio_type: 'Front-End',
          description: `A web app that provides information to movie
          fans regarding their favorite movies and movies that are currently
          playing in theaters`,
          image: 'ReelVue',
          route: 'reelvue',
        },
        {
          portfolio_name: 'Editorial Design',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various layouts designs for single page
          use, or for full publications.`,
          image: 'editorial',
          route: 'editorial',
        },
        {
          portfolio_name: 'Illustrations',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various illustrations I have done over
          the years.`,
          image: 'illustration',
          route: 'illustrations',
        },
      ],
    };
  },
  methods: {
    mouseEnter(index) {
      if (!this.portfolio_items[index].active) {
        this.portfolio_items[index].active = true;
      }
    },
    mouseLeave(index) {
      if (this.portfolio_items[index].active) {
        this.portfolio_items[index].active = false;
      }
    },
    getPics(index) {
      const images = require.context('../assets/', false, /\.jpg$/);
      return images(`./${this.portfolio_items[index].image}.jpg`);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
  #portfolio{
    margin-top: 15vh;
  }
  .portfolio{
    lost-center: 1200px;
    lost-utility: clearfix;
  }
  .heading{
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-1-size;
    font-weight: $heavy-weight;
    margin-bottom: 80px;
    margin-top: 0;
    lost-center: 1200px;
  }
  .portfolio-container{
    lost-column: 1/3;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .project-image{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  .image-container{
    position: relative;
    &:before{
      content: '';
      background: rgba(88,124,163,0.85);
      position: absolute;
      height: 99%;
      width: 100%;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      transition: all 0.4s ease-in-out 0s;
      border-radius: 10px;
    }
    &:hover{
      &:before{
        opacity: 1;
      }
    }
  }
  .info-container{
    color: $secondary-color;
    position: absolute;
    text-align: center;
    width: 80%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate3d(-50%, -50%, 0);
    transition: all cubic-bezier(.62,.28,.23,.99) 0.60s;
    border-radius: 10px;
    .project-name{
      font-family: $primary-font;
      font-size: $heading-3-size;
      font-weight: $heavy-weight;
      text-align: left;
      margin: 0;
    }
    .shape{
      width: 4em;
      height: 0.25em;
      background-color: $secondary-color;
      margin: 8px 0 8px 0;
    }
    .project-description{
      font-family: $primary-font;
      font-size: $paragraph;
      font-weight: $light-weight;
      text-align: left;
      line-height: $primary-leading;
      margin: 0;
    }
  }
  .image-container:hover .info-container{
    top: 50%;
    left: 50%;
    opacity: 1;
  }
  // ANIMATIONS
  .fadeIn-bottom{
  top: 80%;
  }
  .fadeUp-enter-active, .fadeUp-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .fadeUp-enter, .fadeUp-leave-to {
    opacity: 0;
    transform: translateY(30%);
  }
  .fadeIn-enter-active, .fadeIn-leave-active {
    transition: opacity .5s;
  }
  .fadeIn-enter, .fadeIn-leave-to {
    opacity: 0;
  }
  //==== Media Queries ========================================================
  @media only screen and (max-width: 1199px){
    #portfolio{
      lost-center: 980px;
      padding: 0 30px;
      margin-top: 8vh;
    }
  }
  @media only screen and (max-width: 800px){
    .portfolio-container{
      lost-column: 1/2;
    }
  }
  @media only screen and (max-width: 480px){
    .portfolio-container{
      lost-column: 1/1;
    }
    .heading{
      font-size: $heading-2-size;
      text-align: center;
      margin-bottom: 40px;
    }
  }
</style>
