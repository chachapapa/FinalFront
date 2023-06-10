<template>
  <v-dialog v-model="dialog" width="1300" style="border-radius: 24px !important;">
    <template v-slot:activator="{ on, attrs }">
      <v-card class="mb-12 elevation-5 rounded-xl pa-6" width="1300" height="300" v-bind="attrs" v-on="on"
        @click="getReviews(board.boardId)">
        <v-card-title>{{ board.title }}</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row align="center" class="mx-0" flex-grow="1">
            <v-card-text body-1 style="text-align: start; height: 120px">{{ board.content }}</v-card-text>
            <v-icon color="red">mdi-fire</v-icon>

            <div class="grey--text ms-4 subtitle-1">{{ board.combo }}일째 운동중...</div>

            <div class="grey--text subtitle-1 ms-1"
              style="display: flex; flex-direction : row; width: 100%; text-align: end;">{{ board.regDate
              }}<v-spacer></v-spacer>
              {{ board.writerName }}
            </div>
          </v-row>
        </v-card-text>
      </v-card>
    </template>

    <ArticleDetail :board="board" @changeDialog="changeDialog" :isLiked="isLiked" @smashLike="smashLike"
      @smashDislike="smashDislike"></ArticleDetail>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import ArticleDetail from "./ArticleDetail.vue";

export default {
  data: () => ({
    loading: false,
    selection: 1,
    changeSticky: false,
    dialog: false,
    writer: {},
    board: {},
    review: {},
    reviewContent: "",
    boardUser: {},
    isLiked: false,
  }),
  computed: {
    ...mapState(["loginUser", "boards", "reviews"])
  },
  methods: {
    reserve() {
      this.loading = true;
      setTimeout(() => (this.loading = false), 2000);
    },
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
    writeReview(boardId) {
      this.review.reviewWriter = this.loginUser.name;
      this.review.boardId = boardId;
      this.review.content = this.reviewContent;
      this.review.writerKey = this.loginUser.idxKey;
      this.reviewContent = "";
      this.$store.dispatch("writeReview", this.review);
    },
    deleteReview(reviewId) {
      this.$store.dispatch("deleteReview", reviewId);
    },
    changeDialog() {
      this.dialog = false;
    }
  },
  created() {
    this.board = this.boards[7];
  },
  components: { ArticleDetail }
};
</script>

<style scoped>
.v-sheet .v-card {
  border-radius: 24px !important;
}

.stickyCard {
  position: sticky !important;
  top: 110px;
}
</style>