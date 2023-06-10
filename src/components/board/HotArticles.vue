<template>
    <div>
        <div style="display: flex; flex-direction:row;">
            <div class="gongsajoong" style="width:650px;"><big-training-article /></div>
            <div class="gongsajoong2" style="width:325px;">
                <training-article :board="this.normalBoards[0]" /><training-article :board="this.normalBoards[1]" /><small-training-article :board="this.smallBoards[0]" />
            </div>
            <div class="gongsajoong2"
                style="display:flex; flex-direction:column; width:325px; align-items:end">
                <training-article :board="this.normalBoards[2]"/><small-training-article :board="this.smallBoards[1]" /><training-article :board="this.normalBoards[3]"/>
            </div>
        </div>
        <div style="display: flex; flex-direction:row;">
            <div class="gongsajoong" style="width:1300px; height: 400px"><wide-training-article /></div>
        </div>

    </div>
</template>

<script>
import TrainingArticle from './TrainingArticle.vue';
import SmallTrainingArticle from './SmallTrainingArticle.vue';
import BigTrainingArticle from './BigTrainingArticle.vue';
import WideTrainingArticle from './WideTrainingArticle.vue';
import { mapState } from 'vuex';

export default {

    components: {
        TrainingArticle,
        BigTrainingArticle,
        SmallTrainingArticle,
        WideTrainingArticle,
    },

    computed: {
        ...mapState([
            'boards'
        ])
    },

    data() {
        return {
            smallBoards: [],
            normalBoards: [],
        };
    },


    created() {
        this.$store.dispatch("getBoards");
        for (let i = 2; i < 4; i++) {
            this.smallBoards.push(this.boards[i-1])
        }

        for(let i = 4; i<8 ; i++){
            this.normalBoards.push(this.boards[i-1])
        }
    },
}
</script>

<style></style>