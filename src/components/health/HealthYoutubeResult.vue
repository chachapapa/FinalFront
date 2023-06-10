<template>
  <div class="body">
  <div class="videoBox">
    <div style="margin-bottom:20px; font-size: 25px; font-weight: bold;">검색 결과</div>

    <v-item-group>
      <v-container>
        <v-row>
          <HealthYoutubeItem v-for="video in videos" :key="video.id.videoId" :video="video"></HealthYoutubeItem>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
  <router-view></router-view>
</div>
</template>

<script>
import { mapState } from 'vuex'
import HealthYoutubeItem from './HealthYoutubeItem.vue';
export default {
  computed: {
    ...mapState([
      "videos"
    ])
  },
  components: { HealthYoutubeItem }
}
</script>

<style>

.body{
  display:flex;
  justify-content: space-between;
  width : 100%;
}
.videoBox {
  display: flex;
  flex-direction: column;
  flex-grow:1;
  margin-top: 30px;
  width: 1300px;
}
</style>