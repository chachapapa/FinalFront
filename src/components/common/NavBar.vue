<template>
  <v-banner class="rounded-b-lg rounded-tl-0" single-line :sticky="sticky" shaped :elevation="isScrolled ? '3' : '0'"
    color="white" v-scroll="onScroll">
    <router-link to="/" style="text-decoration: none; width: 100px; display: flex" v-show="!loginUser">
      <div class="logo">MSJWFit</div>
    </router-link>
    <router-link to="/main" style="text-decoration: none; width: 100px; display: flex" v-show="loginUser">
      <div class="logo">MSJWFit</div>
    </router-link>

    <template v-slot:actions>
      <input v-model="keyword" placeholder="검색" @keyup.enter="searchYoutube" v-show="cansearch" />
      <v-icon slot="append" color="black" @click="searchYoutube" v-show="cansearch"
        style="margin-right: 160px">mdi-arrow-right</v-icon>


      <v-btn text color="teal" min-width="40px" @click="logout" v-show="isLogedin">
        <v-icon color="grey darken-2">
          mdi-exit-run
        </v-icon>
      </v-btn>

      <router-link to="/main">
        <v-btn text color="teal" min-width="40px" :class="{ 'teal lighten-4': mypage }">
          <v-icon :color="mypage ? 'white' : 'grey darken-2'">
            mdi-account-circle
          </v-icon>
        </v-btn>
      </router-link>
      <router-link to="/board">
        <v-btn text color="teal" min-width="40px" :class="{ 'teal lighten-4': board }">
          <v-icon :color="board ? 'white' : 'grey darken-2'">
            mdi-bulletin-board
          </v-icon>
        </v-btn>
      </router-link>
      <router-link to="/health/my">
        <v-btn text color="teal" min-width="40px" :class="{ 'teal lighten-4 mr-6': cansearch }">
          <v-icon :color="cansearch ? 'white' : 'grey darken-2'">
            mdi-dumbbell
          </v-icon>
        </v-btn>
      </router-link>

      <!-- <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">

          <v-btn text color="teal" min-width="40px" v-bind="attrs" v-on="on" class="teal lighten-3">
            <v-icon color="black"> mdi-menu </v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
    </template>
  </v-banner>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data: () => ({
    keyword: "",
    sticky: true,
    cansearch: false,
    mypage: false,
    board: false,
    isScrolled: false,
    isLogedin: false,
  }),


  computed: {
    ...mapState([
      'loginUser'
    ])
  },


  // beforeCreate(){
  //   console.log("호출됨? 비포크리에이트")
  //   console.log(this.loginUser)
  //   if (this.loginUser) {
  //     this.isLogedin = true;
  //   }else{
  //     this.isLogedin = false;
  //   }
  // },

  beforeMount() {
    // console.log("호출됨? 비포마운트")
    if (this.loginUser) {
      this.isLogedin = true;
    }else{
      this.isLogedin = false;
    }
    // console.log(this.isLogedin)
    const pathName = new URL(document.location).pathname.split("/");
    // const id = pathName[pathName.length - 1];
    if (
      pathName[pathName.length - 1] === "health" ||
      pathName[pathName.length - 2] === "health"
    ) {
      this.cansearch = true;
    } else if (pathName[pathName.length - 1] === "main") {
      this.mypage = true;
    } else if (
      pathName[pathName.length - 1] === "board" ||
      pathName[pathName.length - 2] === "board"
    ) {
      this.board = true;
    }
  },

  methods: {
    searchYoutube() {
      this.$store.dispatch("searchYoutube", this.keyword);
    },
    onScroll() {
      if (scrollY > 2) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
    logout() {
      console.log("왜안돼")
      this.$store.commit("LOGOUT");
    },
  },

};
</script>

<style scoped>
.logo {
  display: flex;
  margin-right: 0px;
  width: 150px;
  height: 60px;
  color: #8ed2ce;
  font-size: 30px;
  font-weight: 600;
  align-items: center;
}

input {
  height: 40px;
  width: 300px;
  border: 2px solid black;
  border-radius: 5px;
  padding-left: 5px;
}

.styling {
  background-color: black;
}
</style>
