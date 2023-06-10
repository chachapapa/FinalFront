<template>
  <div class="main">
    <nav-bar></nav-bar>
    <div style="align-self: center; display:flex;flex-direction:row; width:100%; height: 2000px; justify-content: center;">
      <router-view />
      <!-- <side-menu></side-menu> -->
      <!-- <detail-side-menu ></detail-side-menu> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/common/NavBar.vue";

export default {
  components: {
    NavBar,
  },
    
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  width:100%;
  align-self: center;
  justify-content: center;
  align-content: center;
}
</style>
