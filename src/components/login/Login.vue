<template>
  <div class="loginBox">
    <div class="loginTitle">로그인</div>
    <div style="margin-bottom: 30px">오늘 운동 시작!</div>

    <!-- v-model boolean형태로 받아서 입력값 유효한지 확인할 수 있음. 추가해야함 로그인정보 받으려면... 근데 이전엔 안그랬는데 굳이?-->
    <v-form style="display: flex; justify-content: center" ref="form" v-model="valid" lazy-validation>
      <v-card height="340" width="500" align="center" color="#f5f5f5" style="padding: 25px">
        <v-col>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="email"
              :rules="idRules"
              label="아이디"
              outlined
              color="teal lighten-3"
              background-color="white"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="8">
            <v-text-field
              type="password"
              v-model="password"
              :rules="passwordRules"
              label="비밀번호"
              outlined
              color="teal lighten-3"
              background-color="white"
              required
              @keyup.enter="login"
            ></v-text-field>
          </v-col>

          <v-btn color="teal lighten-3" @click="login" :disabled="!valid">로그인</v-btn>
        </v-col>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "LoginView",

  data: () => ({
    valid: true,
    loginUser: {},
    email: "",
    password: "",
    idRules: [v => !!v || "아이디를 입력해주세요"],
    passwordRules: [v => !!v || "비밀번호를 입력해주세요"]
  }),

  computed: {
    ...mapState(["user"])
  },

  created() {
    this.id = this.user.email;
    this.password = this.user.password;
  },

  methods: {
    login() {
      this.$refs.validate();

      if (this.$refs.validate()) {
        this.loginUser.email = this.email;
        this.loginUser.password = this.password;
        this.$store.dispatch("login", this.loginUser);
      }
    }
  }
};
</script>

<style scoped>
.loginBox {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}

.loginTitle {
  margin-top: 40px;
  margin-bottom: 10px;
  font-size: x-large;
  font-weight: 600;
}
</style>
