<template>
  <div>
    <div class="boardTitle">
      <v-icon size="100px" class="insta mb-2" color="teal lighten-3">mdi-weight-lifter</v-icon>

      <div style="width:900px">
        {{ loginUser.name }}님 안녕하세요!
        <br />
        오늘까지 {{combo}}일 운동하셨습니다.
      </div>
    </div>

    <v-card class="mx-auto text-center rounded-xl pa-5" elevation="0" height="200" width="1300">
      <v-row v-for="(x, i) in 7" :key="i" :x="x">
        <v-col v-for="(y, i) in 52" :key="i" :y="y" style="padding: 0 0 0 0 !important">
          <v-btn :color="setColor(x,y)"></v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    days: [],
    today: null,
    combo: 0
  }),

  computed: {
    ...mapState(["loginUser", "streak"])
  },

  methods: {
    setColor(x, y) {
      const value = this.today - (7 - x) * 86400000 - (52 - y) * 7 * 86400000;

      for (let i = 0; i < this.days.length; i++) {
        if (this.days[i] == value) {
          return "teal lighten-2";
        }
      }
    }
  },

  created() {
    this.$store.dispatch("getStreak", this.loginUser.idxKey);
    console.log("로그인유저"+this.$store.state.loginUser[0])
    this.today = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );

    for (let i = 0; i < this.streak.length; i++) {
      this.days.push(new Date(this.streak[i].regDate + " 00:00:00").getTime());
    }

    for (let i = 1; i < this.days.length; i++) {
      if (this.days[this.days.length - i] === this.today - 86400000 * (i - 1)) {
        this.combo = this.combo + 1;
      } else{
        console.log(this.combo);
        break;
      }
    }

    this.$store.commit("COMBO_COUNT", this.combo);

  }
};
</script>

<style scoped>
.v-btn {
  color: white;
  min-width: 0 !important;
  width: 20px !important;
  height: 20px !important;
  padding: 0 0 0 0 !important;
  margin: 2px 2px 2px 2px !important;
}

.v-col {
  flex-grow: 0 !important;
}

.boardTitle {
  display: flex;
  font-size: 35px;
  font-weight: bold;
  width: 100%;
  text-align: left;
  margin-top: 100px;
  margin-bottom: 80px;
}

.insta {
  background: radial-gradient(
    circle at 30% 107%,
    #fdf497 0%,
    #fdf497 5%,
    #84abf9 45%,
    #80cbc4 70%,
    #009688 90%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.percentage {
  width: 100%;
  text-align: end;
  padding-top: 50px;
}
</style>