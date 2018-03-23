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
          <div class="info-container">
            <h3>Connect With Me</h3>
            <div class="location">
              <img src="../assets/svg-icons/location.svg" alt="location icon" class="icon">
              <p class="info">Arizona</p>
            </div>
            <div class="resume">
              <img src="../assets/svg-icons/download.svg" alt="download icon" class="icon">
              <a href="#" class="info">
                Résumé
              </a>
            </div>
            <div class="email">
              <img src="../assets/svg-icons/email.svg" alt="email icon" class="icon">
              <a href="mailto:hello@dillonschultz.design" class="info">
                hello@dillonschultz.design
              </a>
            </div>
            <div class="social-media">
              <a href="https://twitter.com/dill_schultz" target="_blank">
                <img src="../assets/svg-icons/twitter-logo.svg"
                alt="twitter logo" class="icon">
              </a>
              <a href="https://www.instagram.com/dill.schultz/" target="_blank">
                <img src="../assets/svg-icons/insta-logo.svg"
                alt="instagram logo" class="icon">
              </a>
              <a href="https://github.com/dillonschultz93" target="_blank">
                <img src="../assets/svg-icons/github-dark.svg"
                alt="github logo" class="icon">
              </a>
              <a href="https://www.linkedin.com/in/dillon-schultz-7a5b2bab/" target="_blank">
                <img src="../assets/svg-icons/linkedin-logo.svg"
                alt="linkedin logo" class="icon">
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
    align-items: center;
    display: flex;
    lost-column: 2/3;
    lost-utility: clearfix;
  }
  .paragraph{
    color: $primary-shade;
    font-family: $primary-font;
    font-size: $heading-4-size;
    font-weight: $light-weight;
    line-height: $primary-leading;
    lost-column: 1/2;
    margin-left: 30px;
  }
  .info-container{
    border-left: 0.1em solid $primary-shade;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    lost-column: 1/2;
    padding-left: 30px;
    h3{
      color: $primary-shade;
      font-family: $heading-font;
      font-weight: $primary-weight;
      margin-top: 0;
    }
  }
  .location{
    align-items: center;
    display: flex;
  }
  .email{
    align-items: center;
    display: flex;
  }
  .resume{
    align-items: center;
    display: flex;
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
    margin: 5px 0;
  }
  .social-media{
    margin-top: 30px;
  }
  .heading {
    color: $primary-shade;
    font-family: $heading-font;
    font-size: $heading-1-size;
    font-weight: $heavy-weight;
    margin-bottom: 80px;
    margin-top: 0;
  }
  // ==== Media queries =======================================================
  @media only screen and (max-width: 1199px){
    #about{
      lost-center: 980px;
      .container{
        padding: 0 30px;
      }
    }
  }
  @media only screen and (max-width: 1024px){
    .about-container{
      .portrait{
        lost-column: 1/3;
      }
      .text-container{
        lost-column: 2/3;
        flex-wrap: wrap;
        .paragraph{
          lost-column: 1/1;
          font-size: 1.1em;
        }
        .info-container{
          align-items: center;
          lost-column: 1/1;
          flex-direction: row;
          flex-wrap: wrap;
          border-left: 0;
          border-top: 0.1em solid $primary-shade;
          padding: 15px 30px 0 30px;
          margin: 15px;
          font-size: $paragraph;
          justify-content: center;
          h3{
            lost-column: 1/1;
            font-size: $paragraph;
            text-align: center;
            margin-bottom: 8px;
          }
          .icon{
            height:$paragraph;
            margin-right: 8px;
          }
          .location{
            margin-right: 15px;
          }
          .email{
            margin-right: 15px;
          }
          .resume{
            margin-right: 15px;
          }
          .social-media{
            margin-top: 10px;
          }
        }
      }
    }
    .heading{
      font-size: $heading-2-size;
    }
  }
  @media only screen and (max-width: 869px){
    .container{
      margin-top: 8vh;
    }
    .heading{
      margin-bottom: 40px
    }
    .social-media{
      margin-top: 0px;
    }
  }
  @media only screen and (max-width: 768px){
    .about-container{
      .portrait{
        lost-column: 1/2;
      }
      .text-container{
        lost-column: 1/2;
        .paragraph{
          font-size: $paragraph;
        }
      }
    }
  }
  @media only screen and (max-width: 650px){
    .container{
      margin-top: 8vh;
    }
    .heading{
      text-align: center;
      margin-bottom: 60px;
    }
    .about-container{
      flex-direction: column;
      .portrait{
        lost-column: 1/1;
        width: 60%;
      }
      .text-container{
        lost-column: 1/1;
        margin-top: 20px;
        .paragraph{
          lost-column: 2/3;
          margin-left: 0;
        }
        .info-container{
          lost-column: 1/3 flex;
          flex-direction: column;
          // border-left: 0.1em solid $primary-shade;
          justify-content: flex-start;
          border-top: 0;
          padding: 0;
        }
      }
    }
  }
  @media only screen and (max-width: 580px){
    .about-container{
      .text-container{
        .paragraph{
          lost-column: 1/2;
        }
        .info-container{
          lost-column: 1/2 flex;
          justify-content: flex-end;
          flex-direction: column;
        }
      }
    }
  }
  @media only screen and (max-width: 480px){
    .about-container{
      .text-container{
        .paragraph{
          lost-column: 1/1;
        }
        .info-container{
          lost-column: 1/1 flex;
          justify-content: center;
          flex-direction: row;
          border-top: 0.1em solid $primary-shade;
          h3{
            padding-top: 10px;
          }
        }
      }
    }
  }
</style>
