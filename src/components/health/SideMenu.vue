<template>
  <v-card
    :class="isScrolled ? 'stickyMenu mx-auto' : 'mx-auto'"
    width="250"
    tile
    height="600"
    elevation="0"
    v-scroll="onScroll"
  >
    <v-list rounded>
      <v-subheader>운동 카테고리</v-subheader>

      <v-list-item-group v-model="selectedItem" color="teal lighten-3 ">
        <v-list-item v-for="(item, i) in items" :key="i" @click="getCategory(item.keyword)">
          <v-list-item-icon>
            <v-icon large>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <v-list rounded>
      <v-row>
        <v-subheader style="width:100px">마이 메뉴</v-subheader>
        <v-spacer></v-spacer>
        <div class="text-center ma-2">
          <v-icon class="mr-6" @click="snackbar=true">mdi-plus</v-icon>
          <v-snackbar v-model="snackbar" color="teal">
            <v-text-field
              v-model="keyword"
              label="키워드를 입력하세요"
              required
              style="width:99%"
              @keyup.enter="writeWatchList(keyword)"
            >
              <v-icon
                slot="append"
                color="grey lighten-2"
                @click="writeWatchList(keyword)"
              >mdi-arrow-right</v-icon>
            </v-text-field>
            <template v-slot:action="{ attrs }">
              <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
          </v-snackbar>
        </div>
      </v-row>
      <v-list-item-group v-model="selectedItem" color="teal lighten-3 ">
                <v-list-item v-for="(list, i) in watchList" :key="i" @click="getCategory('#'+list.interested)">
                    <v-list-item-icon>
                        <v-icon large>mdi-numeric-{{ i }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ list.interested }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "SideMenu",

  components: {},

  data: () => ({
    snackbar: false,
    keyword: "",
    selectedItem: 1,
    key: 0,
    items: [
      { text: "팔", icon: "mdi-arm-flex", keyword: "#팔" },
      { text: "하체", icon: "mdi-food-drumstick", keyword: "#하체" },
      { text: "가슴", icon: "mdi-sunglasses", keyword: "#가슴" },
      { text: "복근", icon: "mdi-dice-6", keyword: "#복근" },
      { text: "어깨", icon: "mdi-weight-lifter", keyword: "#어깨" },
      { text: "등", icon: "mdi-bag-personal", keyword: "#등" }
    ],
    isScrolled: false
  }),

  computed:{
    ...mapState([
        'loginUser',
        'watchList'
    ])
  },

  methods: {
    getCategory(keyword) {
      this.$store.dispatch("getCategory", keyword);
    },

    onScroll() {
      if (scrollY > 0) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },

    writeWatchList(keyword){
        const info  = {
        interested : keyword,
        userKey : this.loginUser.idxKey
      }
        this.$store.dispatch("writeWatchList", info);
    }
  },


  created(){
    console.log(this.loginUser)
    this.$store.dispatch("getWatchList", this.loginUser.idxKey)
  }
};
</script>

<style>
.stickyMenu {
  position: sticky !important;
  top: 76px;
}
</style>