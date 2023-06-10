<template>
    <v-list-item @click="clickVideo" class="mt-3 mb-3">
        <v-row class="d-flex flex-nowrap py-3">
            <v-card class="d-flex align-center" dark height="50" width="60" hover>
                <v-img :src="video.snippet.thumbnails.high.url" height="50" width="60"></v-img>
            </v-card>
            <div class="titleSpace">
                {{ this.videoTitle }}
            </div>
        </v-row>
    </v-list-item>
</template>

<script>
export default {

    name: "DetailSideMenuItem",

    data() {
        return {
            videoTitle: '',
        }
    },

    props: {
        video: {
            type: Object,
            required: true,
        }
    },

    methods: {
        clickVideo() {
            this.$store.dispatch('clickVideo', this.video);
        }
    },

    created() {
        let parser = new DOMParser()
        let newStr = parser.parseFromString(this.video.snippet.title, "text/html").body.innerText
        this.videoTitle = newStr;
    }
}
</script>

<style scoped>
.titleSpace {
    display:-webkit-box;
    width: 550px;
    height: 60px;
    padding-left: 10px;
    text-align: start;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>