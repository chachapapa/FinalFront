<template>
    <v-card class="mx-auto text-center rounded-xl  pt-5" elevation="5" height="400" width="1300">
        <v-card-text style="display:flex; padding-bottom: 0px !important">
            <div class="text-h5" style="width:250px; height:30px ;text-align: center;">
                몸무게
            </div>
            <v-spacer></v-spacer>
            <v-card-actions style="height: 30px; width:200px; align-items:end; padding: 0 0 0 0 !important">
                <router-link to="/health/my">
                    <v-btn style="heigth:30px !important">
                        운동하러 가기
                    </v-btn>
                </router-link>
            </v-card-actions>
        </v-card-text>
        <v-card-text style="display: flex; justify-content: center; height: 50px">
            <v-sheet color="teal lighten-2" height="280" class="rounded-xl" width="1200">
                <v-sparkline :value="value" color="rgba(255, 255, 255, .7)" height="60" padding="20" 
                    line-width="2">
                    <template v-slot:label="item">
                        {{ item.value }}kg
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>

    </v-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data: () => ({
        value: [],
    }),

    computed:{
        ...mapState([
            'loginUser',
            'weightHistory'
        ])
    },

    created(){
        this.$store.dispatch("getWeightHistory",this.loginUser.idxKey)
        for(let i = 6 ; i>=0 ; i--){
            this.value.push(this.weightHistory[this.weightHistory.length-1-i].weight);
        } 

    }
}
</script>

<style></style>