<template>
  <div id="home">
    <div class="text-container">
      <h1 class="intro">Hi, I'm Dillon.</h1>
      <h2 class="outro">I'm a designer &amp;<br>front-end developer.</h2>
      <div class="shape"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<style lang="scss" scoped>
  @import "../assets/scss/styles.scss";

  .text-container {
    display: flex;
    flex-direction: column;
    lost-center: 1200px;
    margin-top: 25vh;
    .intro {
      color: $primary-shade;
      font-family: $heading-font;
      font-size: 4.5em;
      font-weight: $heavy-weight;
    }
    .outro {
      color: $primary-shade;
      font-family: $heading-font;
      font-size: $heading-1-size;
      font-weight: $light-weight;
      line-height: $primary-leading;
    }
  }
  .shape {
    background-color: $primary-shade;
    height: 0.5em;
    width: 10em;
  }
</style>
