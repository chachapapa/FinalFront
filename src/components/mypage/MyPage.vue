<template>
  <div style="align-self: center; display:flex; flex-direction:column; align-items:center;">

    <streak-history style="margin:40px"/>
    <weight-history />
    <hr style="margin:40px" width="1000" />
    <ThreeMajorHistory />
    <hr style="margin:40px" width="1000" />
    <kcal-history style="margin-bottom:24px" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import KcalHistory from "./KcalHistory.vue";
import WeightHistory from "./WeightHistory.vue";
import ThreeMajorHistory from "./ThreeMajorHistory.vue";
import StreakHistory from "./StreakHistory.vue";

export default {
  components: { WeightHistory, KcalHistory, ThreeMajorHistory, StreakHistory },

  computed: {
    ...mapState([
      "loginUser",
      "kcalHistory",
      "threeMajorHistory",
      "weightHistory",
    ])
  },
};
</script>

<style scoped>
.myInfo {
  background: url(@/assets/Daemoon.jpg);
  background-position: right top;
  background-size: 1300px 600px;
  background-repeat: no-repeat;
  height: 300px;
  text-align: start;
  font-size: x-large;
  font-weight: 600;
  padding: 25px;
}



</style>