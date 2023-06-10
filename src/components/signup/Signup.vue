<template>
  <div class="signupBox">
    <div class="signupTitle">회원가입</div>
    <div style="margin-bottom: 30px">
      싸핏에 가입하고 건강한 하루를 시작하세요!
    </div>
    <v-form style="display: flex; justify-content: center ">
      <v-card
        height="450"
        width="500"
        align="center"
        color="#f5f5f5"
        style="padding: 25px"
      >
        <v-col>
          <v-col cols="12" md="9">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="이메일"
              outlined
              color="teal lighten-3"
              background-color="white"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="9">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="비밀번호"
              outlined
              color="teal lighten-3"
              background-color="white"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="9">
            <v-text-field
              v-model="name"
              :rules="nameRules"
              label="이름"
              outlined
              color="teal lighten-3"
              background-color="white"
              required
            ></v-text-field>
          </v-col>

          <v-btn color="teal lighten-3" @click="createUserLoginInfo">다음으로</v-btn>
        </v-col>
      </v-card>
    </v-form>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SignupView",

  data: () => ({
    password: "",
    name: "",

    emailRules: [
      (v) => !!v || "이메일을 입력해주세요",
      (value) => /.+@.+/.test(value) || "이메일 형식에 맞게 입력하세요",
    ],
    passwordRules: [(v) => !!v || "비밀번호를 입력해주세요"],
    nameRules: [(v) => !!v || "이름을 입력해주세요"],
  }),

  computed: {
    ...mapState(["email"]),
  },

  methods: {
    createUserLoginInfo() {
      const user = {
        password: this.password,
        name: this.name,
      };

      this.$store.dispatch("createUserLoginInfo", user);
    },
  },
};
</script>

<style scoped>
.signupBox {
  display: flex;
  flex-direction: column;
  margin-top: 100px;
}

.signupTitle {
  margin-bottom: 10px;
  font-size: x-large;
  font-weight: 600;
}
</style>
