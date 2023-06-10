<template>
  <div class="main">
    <nav-bar />
    <Transition name="fade" mode="out-in">
      <router-view />
    </Transition>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<style scoped>

.fade-enter{
  opacity: 0;
}

.fade-enter-active{
  transition: opacity 0.5s ease-out ;
}

.main {
  /* background-image: url("@/assets/Daemoon.jpg"); */
  background-size: 1300px 600px;
  width: 1300px;
  align-self: center;
  justify-content: center;
  align-content: center;
}
</style>
