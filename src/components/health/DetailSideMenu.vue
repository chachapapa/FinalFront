<template>
    <div style="padding: 25px; width: 800px">
        <v-card class="mx-auto rounded-xl pa-6" tile height="600" elevation="5">
            <v-list rounded-xl>
                <v-card-title>관련 영상</v-card-title>

                <v-list-item-group v-model="selectedItem" color="teal lighten-3" class="overflow-y-auto" style="max-height: 450px;">
                        <detail-side-menu-item v-for="video in videos" :key="video.id.videoId"
                            :video="video"></detail-side-menu-item>
                </v-list-item-group>
            </v-list>

        </v-card>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import DetailSideMenuItem from './DetailSideMenuItem.vue'
export default {
    components: { DetailSideMenuItem },

    data() {
        return {
            videoTitle: '',
            selectedItem: null,
        }
    },

    computed: {
        ...mapState([
            'videos'
        ])
    },




}
</script>

<style></style>