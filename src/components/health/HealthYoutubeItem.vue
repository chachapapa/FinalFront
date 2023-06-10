<template>
    <v-col cols="12" md="3">
        <v-card style="height: 260px;" class="rounded-lg" @click="clickVideo" hover>
            <v-item>
                <v-card class="d-flex align-center rounded-t-lg elevation-0" dark height="190">
                    <v-img :src="video.snippet.thumbnails.high.url" height="190"></v-img>
                </v-card>
            </v-item>
            <div class="titleSpace text-subtitle-1 flex-grow-1 text-center pa-2">
                {{ this.videoTitle }}
            </div>
        </v-card>
    </v-col>
</template>

<script>

export default {
    name: 'HealthYoutubeItem',

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
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    height:60px
}
</style>