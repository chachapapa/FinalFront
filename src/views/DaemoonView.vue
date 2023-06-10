<template>
  <div style="display: flex; flex-direction: row; height: 100%">
    <div class="blank"></div>
    <div class="daemoon">
      <div class="contents">
        <a href="/" style="text-decoration: none"
          ><h1 style="text-align: start; margin-bottom: 40px">MSJWFit</h1></a
        >
        <div
          style="
            text-align: start;
            font-size: 20px;
            font-weight: 500;
            margin-bottom: 5px;
          "
        >
          이메일을 입력해 운동을 시작하세요!
        </div>
        <div style="display: flex; width: 400px">
          <v-text-field
            label="이메일"
            :rules="rules"
            hide-details="auto"
            v-model="email"
            @keyup.enter="signup"
          >
            <v-icon slot="append" color="black" @click="signup"
              >mdi-arrow-right</v-icon
            ></v-text-field
          >
        </div>
        <div
          style="
            text-align: start;
            position: absolute;
            bottom: 200px;
            font-size: 30px;
            font-weight: 600;
            width: 300px;
          "
        >
          당신도 스트릭 1000일이면 3대 500?!
        </div>
      </div>

      <router-link to="/main/login" style="text-decoration: none"
        ><v-btn elevation="2" absolute right top color="teal lighten-3"
          >로그인</v-btn
        ></router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "DaemoonView",
  components: {},
  data: () => ({
    fade: false,
    rules: [(value) => /.+@.+/.test(value) || "이메일 형식에 맞게 입력하세요"],
    email: "",
  }),

  methods: {
    signup() {
      if (/.+@.+/.test(this.email)) {
        this.$store.dispatch("emailTransition", this.email);
      }else{
        alert("이메일 형식이 맞지 않습니다.")
      }
    },
  },

  created() {
    this.fade = true;
  },
};
</script>

<style scoped>
.blank {
  height: 100%;
  width: 250px;
}

.daemoon {
  display: flex;
  background: linear-gradient(
      300deg,
      rgba(20, 20, 20, 0) 10%,
      rgba(255, 255, 255, 0.25) 30%,
      rgba(255, 255, 255, 0.5) 40%,
      rgb(255, 255, 255) 60%
    ),
    url("../assets/Daemoon2.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.contents {
  display: flex;
  flex-direction: column;
  /* border: 2px solid yellow; */
  width: 700px;
}

h1 {
  color: #80cbc4;
  font-size: 100px;
  font-weight: bolder;
  padding-top: 100px;
  margin-bottom: 50px;
}
</style>
