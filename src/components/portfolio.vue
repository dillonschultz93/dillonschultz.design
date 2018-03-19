<template>
  <div id="portfolio">
    <h1 class="heading">Portfolio</h1>
    <div class="portfolio-container"
    v-for="(item, index) in portfolio_items"
    :key="item.id">
      <div class="image-container">
        <img :src="item.img_src" alt="portfolio item image">
      </div>
      <div class="text-container"
      @mouseenter="mouseEnter(index)"
      @mouseleave="mouseLeave(index)">
        <p class="project-title">{{ item.portfolio_name }}</p>
        <p class="project-type">{{ item.portfolio_type }}</p>
        <transition name="fadeUp" mode="out-in">
          <p class="project-description" v-if="item.active">{{ item.description }}</p>
        </transition>
      </div>
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
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'dillonschultz.design',
          portfolio_type: 'Front-End',
          description: 'The process and design of this very portfolio website.',
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'ReelVue',
          portfolio_type: 'Front-End',
          description: `ReelVue is a  web app that  provides information to movie
          fans regarding their favorite movies and movies that are currently
          playing in theaters`,
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'Center Pride',
          portfolio_type: 'Graphic Design',
          description: `A series of posters and flyers promoting a Pride Week event
          at hosted in the Arcadia housing community, located on Arizona State's 
          Tempe location.`,
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'Logo Design',
          portfolio_type: 'Graphic Design',
          description: 'A compilation of various logos and brandmarks I have designed.',
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'Editorial Design',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various layouts designs for single page
          use, or for full publications.`,
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'Illustrations',
          portfolio_type: 'Graphic Design',
          description: `A compilation of various illustrations I have done over
          the years.`,
          img_src: 'http://placehold.it/350x350',
          active: false,
        },
        {
          portfolio_name: 'Photography',
          portfolio_type: 'Photography',
          description: `A compilation of various photographs I have captured over
          the years.`,
          img_src: 'http://placehold.it/350x350',
          active: false,
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
  },
};
</script>

<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";
  #portfolio{
    lost-center: 1200px;
    margin-top: 15vh;
  }
  .heading{
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-1-size;
    font-weight: $heavy-weight;
    margin-bottom: 80px;
    margin-top: 0;
  }
  .portfolio-container{
    align-items: center;
    display: flex;
    lost-column: 1/1;
    margin-bottom: 20px;
    margin-top: 20px;
    .image-container{
      lost-column: 1/3;
      img{
        border-radius: 8px;
        height: 100%;
        width: 100%;
      }
    }
    .text-container{
      lost-column: 2/3;
      .project-title{
        color: $primary-shade;
        font-family: $heading-font;
        font-size: $heading-2-size;
        font-weight: $heavy-weight;
        line-height: $primary-leading;
        margin-bottom: 10px;
      }
      .project-type{
        color: $primary-shade-2;
        font-family: $primary-font;
        font-size: $paragraph;
        font-weight: $light-weight;
        line-height: $primary-leading;
      }
      .project-description{
        color: $primary-shade;
        font-family: $primary-font;
        font-size: $paragraph;
        font-weight: $light-weight;
        line-height: $primary-leading;
      }
    }
  }
  // ANIMATIONS
  .fadeUp-enter-active, .fadeUp-leave-active {
    transition: opacity 1s, transform 1s;
  }
  .fadeUp-enter, .fadeUp-leave-to {
    opacity: 0;
    transform: translateY(30%);
  }
</style>
