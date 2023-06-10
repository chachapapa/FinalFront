<template>
    <div class="signupBox">
        <div class="signupTitle">회원가입</div>
        <div style="margin-bottom: 30px">
            싸핏에 가입하고 건강한 하루를 시작하세요!
        </div>
        <v-form style="display: flex; justify-content: center ">
            <v-card height="550" width="500" align="center" color="#f5f5f5" style="padding: 25px">
                <v-col cols="12" md="8">
                    <v-text-field v-model.number="height" label="키" outlined color="teal lighten-3" background-color="white"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                    <v-text-field v-model.number="weight" label="몸무게" outlined color="teal lighten-3" background-color="white"
                        required></v-text-field>
                </v-col>


                <v-radio-group v-model="gender" row style="width:250px">
                    <template v-slot:label>
                        <div style="font-size: large; margin-right: 20px;">성별</div>
                    </template>
                    <v-radio value=true>
                        <template v-slot:label>
                            <div><strong>남</strong></div>
                        </template>
                    </v-radio>
                    <v-radio value=false>
                        <template v-slot:label>
                            <div><strong>여</strong></div>
                        </template>
                    </v-radio>
                </v-radio-group>

                <v-container fluid style="width:300px">
                    <v-list-item-title style="font-size: large; margin-right: 20px; color: rgba(0,0,0,.6);">관심
                        부위</v-list-item-title>
                    <v-row>
                        <v-col cols="12" sm="4" md="4">
                            <v-checkbox v-model="interested" label="팔" color="red" value="팔" hide-details></v-checkbox>
                            <v-checkbox v-model="interested" label="하체" color="red darken-3" value="하체"
                                hide-details></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-checkbox v-model="interested" label="가슴" color="indigo" value="가슴"
                                hide-details></v-checkbox>
                            <v-checkbox v-model="interested" label="복근" color="indigo darken-3"
                                value="복근" hide-details></v-checkbox>
                        </v-col>
                        <v-col cols="12" sm="4" md="4">
                            <v-checkbox v-model="interested" label="등" color="orange" value="등"
                                hide-details></v-checkbox>
                            <v-checkbox v-model="interested" label="어깨" color="orange darken-3"
                                value="어깨" hide-details></v-checkbox>
                        </v-col>
                    </v-row>

                    <v-btn color="teal lighten-3" style="margin-top:30px" @click="createUser">회원가입</v-btn>
                </v-container>
            </v-card>
        </v-form>

    </div>
</template>

<script>
export default {
    data() {
        return {
            height: 0,
            weight: 0,
            gender: false,
            interested: [],
        }
    },

    methods: {

        createUser() {
            const user = {
                height: this.height,
                weight: this.weight,
                gender: this.gender,
                // interested: this.interested
            }
            this.$store.dispatch("createUser", user)
        }
    }
}
</script>

<style>
.signupBox {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
}

.signupTitle {
    margin-bottom: 10px;
    font-size: x-large;
    font-weight: 600;
}
</style>