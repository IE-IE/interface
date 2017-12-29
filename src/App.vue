<script>
export default {
  name: 'app'
};
</script>

<template>
  <bg-app id="app" class="ieie-app">
    <router-view />
  </bg-app>
</template>

<style scoped>
.ieie-app {
  /* https://winterkeep.deviantart.com/ */
  background-image: url('~@/assets/images/dragon-study-by-winterkeep.jpg');
  background-position: center center;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
