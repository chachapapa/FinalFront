<template>
    <v-card hover class="rounded-xl"
        :color="board.combo > 10 ? 'grey' : board.combo > 5 ? 'teal darken-3' : board.combo > 4 ? 'blue darken-3' : board.combo > 1 ? 'yellow darken-3' : board.combo > 0 ? 'red lighten-2' : 'grey darken-3'"
        dark @click="getReviews(board.boardId)" v-on="on" v-bind="attrs">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div style="width:80%;" class="ml-4">
                <v-card-title class="text-h6">{{ board.title }}</v-card-title>
                <v-row align="center" class="mx-0 pl-2" flex-grow="1">
                    <v-icon color="red">mdi-fire</v-icon>
                    <div class="white--text ms-1 subtitle-1">{{ board.combo }}일째 운동중...</div>

                </v-row>
                <v-row class="d-flex flex-no-wrap justify-space-between">
                    <v-card-subtitle style="text-align:end; padding-top:30px; margin-left:10px">{{ board.regDate }}</v-card-subtitle>
                    <v-card-subtitle style="text-align:end; padding-top:30px">{{ board.writerName }}</v-card-subtitle>
                </v-row>
            </div>
            <div style="display: flex; height:154px; align-items:center; border-radius:24px">
                <v-avatar class="ma-3" size="125" tile>
                    <v-img :src="board.img" class="rounded-xl"></v-img>
                </v-avatar>
            </div>
        </div>
    </v-card>
</template>

<script>
import { mapState } from 'vuex';
export default {

    data() {
        return {
            isLiked: false,
            boardUser: {},
        }
    },

    props: {
        'board': {
            type: Object,
            required: true,
        },

        'on': {},

        'attrs': {}
    },

    computed: {
        ...mapState([
            'loginUser'
        ])
    },


    methods: {
        smashLike(boardId) {
            console.log("엥?" + boardId)
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
        getReviews(boardId) {
            console.log("겟리뷰 동작");
            this.$store.dispatch("getReviews", boardId);
            this.$emit("changeDialog", this.board.boardId)

            this.boardUser.boardId = boardId;
            this.boardUser.userKey = this.loginUser.idxKey;
            this.$store.dispatch("getLikeList", this.boardUser);
            this.isLiked=this.$store.state.isLiked;
            this.$emit("likeStatus", this.isLiked);
        },
    },



    created() {
        this.boardUser.boardId = this.board.boardId;
        this.boardUser.userKey = this.loginUser.idxKey;
        this.$store.dispatch("getLikeList", this.boardUser);
        console.log("스토어에는 어케돼있나여" + this.$store.state.isLiked)
        this.isLiked = this.$store.state.isLiked;
    },
}
</script>

<style></style>