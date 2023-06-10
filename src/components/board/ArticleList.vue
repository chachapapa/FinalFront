<template>
  <div>

    <v-card width="1300" height="900" class="mx-auto rounded-xl">


      <v-container pa-10>

        <v-row dense>
          <v-col cols="12" v-for="(board, i) in pageList" :key="i" class="mb-3 mt-3">

            <v-dialog v-model="dialog[board.boardId]" width="1300">

              <template v-slot:activator="{ on, attrs }">
                <ArticleListItem :board="board" :on="on" :attrs="attrs" @likeStatus="likeStatus"></ArticleListItem>
              </template>


              <ArticleDetail :isLiked="isLiked" :board="board" @changeDialog="changeDialog" />


            </v-dialog>



          </v-col>
        </v-row>



      </v-container>

      <v-pagination v-model="currentPage" class="my-4" :length="5" @input="updatePage"></v-pagination>
    </v-card>


  </div>
</template>

<script>
import ArticleDetail from './ArticleDetail.vue'
import { mapState } from 'vuex'
import ArticleListItem from './ArticleListItem.vue';

export default {
    data() {
        return {
            dialog: {},
            pageSize: 4,
            currentPage: 1,
            pageList: [],
            listCount: 0,
            reviewContent: "",
            boardUser: {},
            isLiked: false,
        };
    },
    computed: {
        ...mapState([
            "loginUser",
            "boards",
            "reviews"
        ]),
        rows() {
            return this.boards.length;
        }
    },
    methods: {
        deleteBoard(boardId) {
            this.$store.dispatch("deleteBoard", boardId);
        },
        smashLike(boardId) {
          console.log("엥?"+boardId)
            this.boardUser.boardId = boardId;
            this.boardUser.userKey = this.loginUser.idxKey;
            this.$store.dispatch("smashLike", this.boardUser);
            return this.$store.state.isLiked;
        },
        smashDislike(boardId) {
          
            this.boardUser.boardId = boardId;
            this.boardUser.userKey = this.loginUser.idxKey;
            this.$store.dispatch("smashDisLike", this.boardUser);
            return this.$store.state.isLiked;
        },
        initPage: function () {
            this.listCount = this.boards.length;
            if (this.listCount < this.pageSize) {
                this.pageList = this.boards;
            }
            else {
                this.pageList = this.boards.slice(0, this.pageSize);
            }
        },
        updatePage: function (pageIndex) {
            let _start = (pageIndex - 1) * this.pageSize;
            let _end = pageIndex * this.pageSize;
            this.pageList = this.boards.slice(_start, _end);
            this.currentPage = pageIndex;
        },
        changeDialog(boardId) {
            this.dialog[boardId] = !this.dialog[boardId];
        },

       likeStatus(isLiked){
        this.isLiked=isLiked;
       }
    },
    created() {
        this.$store.dispatch("getBoards");
        this.initPage();
        this.updatePage(this.currentPage);
    },
    components: { ArticleDetail, ArticleListItem }
}
</script>

<style scoped>  .v-sheet .v-card {
    border-radius: 24px !important;
  }

  .v-dialog {
    border-radius: 24px !important;
  }
</style>