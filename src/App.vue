<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    }
  },
  created() {
    console.log('-----router-----', this.$router.options.routes);
  }
}
</script>

<style>
</style>
