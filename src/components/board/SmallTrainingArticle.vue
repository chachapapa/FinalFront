

<template>
  <v-dialog v-model="dialog" width="1300" style="border-radius: 24px !important;">
    <template v-slot:activator="{ on, attrs }">
      <v-card class="mb-12 elevation-5 rounded-xl" width="300" height="144" v-bind="attrs" v-on="on"
        @click="getReviews(board.boardId)">


        <v-card-title style="height:80px">{{ board.title }}</v-card-title>

        <v-card-text>
          <v-row align="center" class=" mx-0" flex-grow="1">
            <v-icon color="red lighten-2">mdi-fire</v-icon>

            <div class="grey--text ms-1 subtitle-1">
              {{ board.combo }}일째 운동중...
            </div>

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
import ArticleDetail from './ArticleDetail.vue';
import { mapState } from 'vuex';

export default {
  data: () => ({
    dialog: false,
    writer: {},
    review: {},
    isLiked: false,
    boardUser: {}
  }),
  props: {
    board: {
      type: Object,
      required: true,
    }
  },
  computed: {
    ...mapState([
      "loginUser",
      "boards",
      "reviews"
    ])
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
  components: { ArticleDetail }
}
</script>

<style scoped>
.v-card--link:before {
  border-radius: 24px;
}

.v-sheet .v-card {
  border-radius: 24px !important;
}

.stickyCard {
  position: sticky !important;
  top: 110px
}</style>