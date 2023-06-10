<template>
    <div class="videoBox" v-if="video">
        <div style="padding: 25px">
            <iframe width="1000" height="600" :src="videoUrl" title="YouTube video player" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen style="border-radius: 10px;"></iframe>
            <div class="text-h6 ma-5" style="width:1000px">
                {{ this.videoDetailTitle }}
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'YoutubeVideoDetail',

    data() {
        return {
            videoDetailTitle: "",
        }
    },

    computed: {
        ...mapState([
            'video'
        ]),
        // 컴퓨티드는 끌어쓸 때 this.땡땡 안해줘도 되나봄.
        videoUrl() {
            const videoId = this.video.id.videoId;
            return `http://www.youtube.com/embed/${videoId}`;
        }
    },
    created() {
        let parser = new DOMParser()
        let newStr = parser.parseFromString(this.video.snippet.title, "text/html").body.innerText
        this.videoDetailTitle = newStr;
    }
}
</script>

<style scoped>
.videoBox {
    display: flex;
    flex-direction: row;
    margin-top: 40px;
    width: 1300px;
    flex-grow: 3
}


</style>