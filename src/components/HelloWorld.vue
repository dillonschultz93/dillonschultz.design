<template>
  <div class="hello">
    <p>{{ msg }}</p>
    <p>{{ msgTwo }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Hello World',
      msgTwo: 'Lorem Ipsum',
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  p {
    color: red;
    lost-column: 1/2;
  }
</style>
