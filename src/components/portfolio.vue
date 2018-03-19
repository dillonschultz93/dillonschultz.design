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
          portfolio_name: 'PolitiVue',
          portfolio_type: 'Front-End',
          description: `PolitiVue is a simple app that displays local and federal
          government officials, their party affiliation, contact information,
          social media accounts, and where their offices are located.`,
          image: 'politivue',
          route: 'politivue',
        },
        {
          portfolio_name: 'Personal Portfolio',
          portfolio_type: 'Front-End',
          description: 'The process and design of this very portfolio website.',
          image: 'portfolio',
          route: '',
        },
        {
          portfolio_name: 'ReelVue',
          portfolio_type: 'Front-End',
          description: `ReelVue is a  web app that  provides information to movie
          fans regarding their favorite movies and movies that are currently
          playing in theaters`,
          image: 'ReelVue',
          route: '',
        },
        {
          portfolio_name: 'Center Pride',
          portfolio_type: 'Graphic Design',
          description: `A series of posters and flyers promoting a Pride Week event
          at hosted in the Arcadia housing community, located on Arizona State's 
          Tempe location.`,
          image: 'center-pride',
          route: '',
        },
        {
          portfolio_name: 'Editorial Design',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various layouts designs for single page
          use, or for full publications.`,
          image: 'editorial',
          route: '',
        },
        {
          portfolio_name: 'Illustrations',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various illustrations I have done over
          the years.`,
          image: 'illustration',
          route: '',
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
    .content-overlay{
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
  }
  .image-container:hover .content-overlay{
    opacity: 1;
  }
  .info-container{
    color: $secondary-color;
    position: absolute;
    text-align: center;
    width: 80%;
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate(-50%, -50%);
    transition: all 0.3s ease-in-out 0s;
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
</style>
