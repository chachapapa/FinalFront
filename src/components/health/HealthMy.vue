<template>
  <div class="body">
    <div class="videoBox">
      <div style="margin-bottom:20px; font-size: 25px; font-weight: bold;">인기 동영상</div>
      <v-item-group>
        <v-container>
          <v-row>
            <health-youtube-item v-for="video in videos" :key="video.id.videoId" :video="video"></health-youtube-item>
          </v-row>
        </v-container>
      </v-item-group>
      <hr style="height:4px; background-color: #80cbc480; border:0;">
      <div style="margin-bottom:20px; font-size: 25px; font-weight: bold;">맞춤 동영상</div>
      <v-item-group>
        <v-container>
          <v-row>
            <health-youtube-item v-for="video in videos" :key="video.id.videoId" :video="video"></health-youtube-item>
          </v-row>
        </v-container>
      </v-item-group>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HealthYoutubeItem from './HealthYoutubeItem.vue';
export default {
  components: { HealthYoutubeItem },


  created() {
    this.$store.dispatch("getPopularVideo");
  },

  computed: {
    ...mapState([
      'videos'
    ]),

    videoUrl() {
      const videoId = this.video.id.videoId;
      return `http://www.youtube.com/embed/${videoId}`;
    }
  }
}
</script>

<style scoped>
.body{
  display:flex;
  justify-content: space-between;
  width : 100%;
}
.videoBox {
  display: flex;
  flex-direction: column;
  margin: 30px;
  flex-grow: 1;
  justify-self: center;
}

hr {
  width: 1200px;
  align-self: center;
  margin: 40px 0 40px 0;
}
</style>