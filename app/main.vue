<template>
  <div>
    <h1 class="red">{{ msg }}</h1>
    Hello!!!???
    <button @click="count++">{{ count }}</button>
    {{ reslt }}
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import axios from "axios";

  export default Vue.extend({
    data() {
      return {
        msg: "Hello? :)",
        count: 0,
        reslt: "no",
      };
    },
    async mounted() {
      const response = await axios.get("/");
      this.reslt = response.data;
    },
  });
</script>

<style lang="stylus" scoped>
  .red
    color: blue
    transform: all .2s
</style>
