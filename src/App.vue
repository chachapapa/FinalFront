<template>
  <v-app id="app">
    <Transition name="fade">
      <router-view />
    </Transition>
  </v-app>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss">



#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 937px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 0.5s ease-out;
}
</style>
