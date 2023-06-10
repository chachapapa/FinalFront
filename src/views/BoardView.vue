<template>
    <div class="main">
        <nav-bar></nav-bar>
        <div style="align-self: center; display:flex; flex-direction:column; align-items:center;">
            <div class="boardTitle">
                <v-icon size="100px" class="insta mb-2" color="teal lighten-3">mdi-calendar-check</v-icon>
                <div>
                    오늘 운동 완료!<br>
                    게시글을 업로드하여 스트릭을 채워보세요
                </div>
            </div>

            <div class="buttonBox">

                <router-link to="../board/writearticle">
                    <v-btn color="white" elevation="0" class="mr-3" @click="changeBoard">
                        <v-icon color="grey darken-2" large>mdi-square-edit-outline</v-icon>
                    </v-btn>
                </router-link>

                <router-link to="/board/articlelist" v-show="!isList">
                    <v-btn color="white" elevation="0" class="mr-3" @click="changeBoard">
                        <v-icon color="teal lighten-2" large>mdi-menu</v-icon>
                    </v-btn>
                </router-link>
                <router-link to="/board" v-show="isList">
                    <v-btn color="white" elevation="0" class="mr-3" @click="changeBoard">
                        <v-icon color="red lighten-2" large>mdi-fire</v-icon>
                    </v-btn>
                </router-link>
            </div>

                <router-view />

        </div>



    </div>
</template>
  
<script>
import NavBar from "@/components/common/NavBar.vue";

export default {

    data() {
        return {
            changeSticky: false,
            isList: false
        }
    },

    components: {
        NavBar,
    },

    methods: {
        changeBoard() {
            this.isList = !this.isList;
        }
    },

    created(){
        this.$store.dispatch('getBoards')
    }
}
</script>
  
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    width: 1300px;
    height: 100%;
    align-self: center;
    align-content: center;
}

.buttonBox {
    display: flex;
    font-size: 35px;
    font-weight: bold;
    width: 100%;
    justify-content: right;
    margin-bottom: 20px;
}

.boardTitle {
    display: flex;
    font-size: 35px;
    font-weight: bold;
    width: 100%;
    text-align: left;
    margin-top: 100px;
    margin-bottom: 80px;
    /* border: 1px solid black */
}

.insta {
    background: radial-gradient(circle at 30% 107%,
            #fdf497 0%,
            #fdf497 5%,
            #84abf9 45%,
            #80cbc4 70%,
            #009688 90%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}


</style>
  