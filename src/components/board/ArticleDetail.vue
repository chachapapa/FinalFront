<template>
    <v-card class="d-flex flex-row rounded-xl">
        <v-card width="600">
            <v-img height="400" :src="board.img"></v-img>

            <v-card-actions>
                <v-card-title>{{ board.title }}</v-card-title>
                <v-spacer></v-spacer>
                <v-icon color="grey lighten-2" text @click="smashLike(board.boardId)" class="mr-5" v-show="!this.isLiked"
                 >mdi-thumb-up-outline</v-icon>
                <v-icon color="teal lighten-2" text @click="smashDislike(board.boardId)" class="mr-5"
                    v-show="this.isLiked">mdi-thumb-up</v-icon>
            </v-card-actions>
            <v-card-text>
                <v-row align="center" class="mx-0" flex-grow="1">
                    <v-icon color="red lighten-2">mdi-fire</v-icon>

                    <div class="grey--text ms-4 subtitle-1">{{ board.combo }}일째 운동중...</div>

                    <div class="grey--text ms-4 subtitle-1" d-flex style="flex-grow:1; text-align: end;">{{ board.writerName
                    }}</div>
                </v-row>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-text style="height:100px; text-align:start; font-size: 17px;">{{ board.content }}</v-card-text>
            <v-card-subtitle style="text-align:end">{{ board.regDate }}</v-card-subtitle>
            <v-card-actions>
                <v-icon class="ml-2" color="red lighten-2" @click="deleteBoard(board.boardId)"
                    v-show="board.writerKey === loginUser.idxKey">mdi-delete</v-icon>
                <v-spacer></v-spacer>
                
            </v-card-actions>
            
        </v-card>

        <div class="overflow-y-auto"
            style="display:flex; flex-direction: column; width: 600px; margin: 10px 50px 0 50px; justify-content:center">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-icon color="red" text @click="closeDialog">mdi-close</v-icon>
            </v-card-actions>
            <v-list rounded-xl class="mb-5">
                <v-card-title h3 style="pading-bottom:6px !important">댓글</v-card-title>

                <v-list-item-group color="teal lighten-3" class="overflow-y-auto" style="height: 500px;">
                    <v-card v-for="review in reviews" :key="review.reviewId" style="width: 95%; text-align: end;"
                        class="ma-3 elevation-3">
                        <v-icon class="mt-2 mr-2" @click="deleteReview(review.reviewId)"
                            v-show="review.reviewWriter == loginUser.name" color="red lighten-2">mdi-close</v-icon>
                        <div class="d-flex flex-no-wrap justify-space-between">
                            <div style="width:100%">
                                <v-card-text class="text-body-1" style="text-align: left;">{{ review.content
                                }}</v-card-text>

                                <v-card-subtitle style="text-align:end">{{ review.reviewWriter }}</v-card-subtitle>
                            </div>
                        </div>
                    </v-card>
                </v-list-item-group>
            </v-list>

            <v-text-field v-model="reviewContent" label="댓글을 입력하세요" required style="width:99%"
                @keyup.enter="writeReview(board.boardId)">
                <v-icon slot="append" color="teal" @click="writeReview(board.boardId)">mdi-arrow-right</v-icon>
            </v-text-field>
        </div>
    </v-card>
</template>
 
<script>
import { mapState } from 'vuex'
export default {


    data() {
        return {
            review: {},
            reviewContent: "",
            reviewWriter: "",
            boardUser: {},
        }
    },


    props: {
        board: {
            type: Object,
            required: true,
        },

        isLiked:{
            type: Boolean,
            required: true,
        }
    },

    computed: {
        ...mapState([
            'loginUser',
            'reviews',
        ])
    },

    methods: {
        smashLike(boardId) {
            this.boardUser.boardId = boardId;
            this.boardUser.userKey = this.loginUser.idxKey;
            console.log("좋아요 누르기전 "+this.isLiked)
            this.$emit("smashLike", this.boardUser)
        },
        smashDislike(boardId) {
            this.boardUser.boardId = boardId;
            this.boardUser.userKey = this.loginUser.idxKey;
            console.log("싫어요 누르기전 "+this.isLiked)
            this.$emit("smashDislike", this.boardUser)
        },
        deleteBoard(boardId) {
            this.$store.dispatch("deleteBoard", boardId);
        },
        writeReview(boardId) {
            this.review.reviewWriter = this.reviewWriter;
            this.review.boardId = boardId;
            this.review.content = this.reviewContent;
            this.review.writerKey = this.loginUser.idxKey;
            this.review.reviewId = 0;
            this.reviewContent = "";
            this.$store.dispatch("writeReview", this.review);
        },
        deleteReview(reviewId) {
            this.$store.dispatch("deleteReview", reviewId);
        },

        closeDialog() {
            this.$emit('changeDialog', this.board.boardId)
        }
    },

    created() {
        this.reviewWriter = this.loginUser.name;
        
    },

    updated(){
        // this.isLiked=this.$store.state.isLiked
        // console.log("업데이티드" + this.isLiked)
    }


}
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