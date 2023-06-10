<template>
  <v-dialog v-model="dialog" width="1300" style="border-radius: 24px !important;">
    <template v-slot:activator="{ on, attrs }">
      <v-card :class="changeSticky ? 'stickyCard mb-12 elevation-5 rounded-xl' : 'mb-12 elevation-5 rounded-xl'"
        width="600" v-scroll="onScroll" v-bind="attrs" v-on="on" @click="getReviews(board.boardId)">
        <v-img height="350" :src="board.img" position="top"></v-img>

        <v-card-title>{{ board.title }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0" flex-grow="1">
            <v-icon color="red">mdi-fire</v-icon>

            <div class="grey--text ms-4 subtitle-1">{{ board.combo }}일째 운동중...</div>

            <div class="grey--text ms-4 subtitle-1" d-flex style="width: 100%; text-align: end;">{{ board.writerName }}
            </div>
          </v-row>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-subtitle>{{ board.regDate }}</v-card-subtitle>
      </v-card>
    </template>

    <ArticleDetail :board="board" @changeDialog="changeDialog" :isLiked="isLiked" @smashLike="smashLike"
      @smashDislike="smashDislike"></ArticleDetail>

  </v-dialog>
</template>

<script>
import ArticleDetail from "./ArticleDetail.vue";
import { mapState } from "vuex";

export default {
  data: () => ({
    review: {},
    reviewContent: "",
    reviewWriter: "",
    changeSticky: false,
    dialog: false,
    board: {},
    writer: {},
    isLiked: false,
    boardUser: {}
  }),
  computed: {
    ...mapState(["loginUser", "boards", "reviews"])
  },
  methods: {

    onScroll() {
      if (scrollY > 100) {
        this.changeSticky = true;
      }
      else {
        this.changeSticky = false;
      }
    },

    deleteBoard(boardId) {
      this.$store.dispatch("deleteBoard", boardId);
    },
    getReviews(boardId) {
      this.boardUser.boardId = boardId;
      this.boardUser.userKey = this.loginUser.idxKey;
      this.$store.dispatch("getLikeList", this.boardUser);
      this.isLiked = this.$store.state.isLiked;
      this.$store.dispatch("getReviews", boardId);

    },

    smashLike(boardUser) {
      this.$store.dispatch("getLikeList", boardUser);
      this.isLiked = true;
    },

    smashDislike(boardUser) {
      this.$store.dispatch("getLikeList", boardUser);
      this.isLiked = false;
    },
    changeDialog() {
      this.dialog = false;
    }
  },
  created() {
    this.board = this.boards[0];
    this.reviewWriter = this.loginUser.name;
  },

  components: { ArticleDetail }
};
</script>

<style scoped>
.v-card--link:before {
  border-radius: 24px;
}

.v-sheet .v-card {
  border-radius: 24px !important;
}

.v-dialog {
  border-radius: 24px !important;
}

.stickyCard {
  position: sticky !important;
  top: 110px;
}
</style>