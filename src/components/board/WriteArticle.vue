<template>
    <v-card width="1300" class="mx-auto pa-12 rounded-xl mb-10 elevation-5">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="title" :rules="titleRules" label="제목" required class="mb-3"></v-text-field>
            <v-row>

                <v-col cols="12" md="12">
                    <v-textarea v-model="content" :rules="contentsRules" solo name="input-7-4" label="내용"></v-textarea>
                </v-col>

            </v-row>


            <v-file-input v-model="img" accept="image/*" label="File input">
                <!-- <v-icon slot="append" @click="uploadImg">mdi-upload</v-icon> -->
            </v-file-input>

            <v-row>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="weight" label="몸무게" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="kcal" label="소모한 칼로리" required></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                    <v-text-field v-model.number="threeMajor" label="3대 무게 합계" required></v-text-field>
                </v-col>
            </v-row>

            <v-btn :disabled="!valid" color="success" class="mr-4" @click="submit">
                제출
            </v-btn>

            <v-btn color="error" class="mr-4" @click="cancel">
                취소
            </v-btn>

        </v-form>
    </v-card>
</template>

<script>
import router from '@/router'
import { mapState } from 'vuex'
export default {
    data: () => ({
        valid: true,
        title: '',
        titleRules: [
            v => !!v || '제목을 입력하세요',
        ],
        content: '',
        contentsRules: [
            v => !!v || '내용을 입력하세요',
        ],
        days:[],
        img: [],
        combo:0,
        weight: 0,
        kcal: 0,
        threeMajor: 0,
        board: {},
        articleData: [],
        yesterday: null,
    }),

    computed: {
        ...mapState([
            'loginUser',
            'streak'
        ])

    },

    methods: {




        submit() {

            this.$refs.form.validate()

            this.$store.dispatch("getStreak", this.loginUser.idxKey);
            this.yesterday = new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate()-1
            );

            for (let i = 0; i < this.streak.length; i++) {
                this.days.push(new Date(this.streak[i].regDate + " 00:00:00").getTime());
            }

            for (let i = 1; i < this.days.length; i++) {
                if (this.days[this.days.length - i] === this.yesterday - 86400000 * (i - 1)) {
                    this.combo = this.combo + 1;
                } else {
                    console.log(this.combo);
                    break;
                }
            }

            this.$store.commit("COMBO_COUNT", this.combo+1);
            


            if (this.$refs.form.validate()) {
                this.board.title = this.title
                this.board.content = this.content
                this.board.weight = this.weight
                this.board.kcal = this.kcal
                this.board.threeMajor = this.threeMajor
                this.board.writerKey = this.loginUser.idxKey
                this.board.writerName = this.loginUser.name
                this.board.combo = this.combo+1
                this.articleData = [this.board, this.img]
                console.log(this.articleData)
                this.$store.dispatch("writeBoard", this.articleData)
            }
        },

        cancel() {
            router.push("/board")
        },

        // uploadImg(){
        //     this.$store.dispatch("uploadImg", this.img);
        // }
    },
}
</script>

<style></style>