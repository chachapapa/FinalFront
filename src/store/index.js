import router from "@/router";
import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

const REST_API = "http://localhost:9999";
export default new Vuex.Store({
  state: {
    email: "",
    password: "",
    name: "",
    user: {},
    
    loginUser: null,

    combo:0,
    streak:[],
    kcalHistory: [],
    threeMajorHistory: [],
    weightHistory: [],

    boards: [],
    board: {},

    isLiked: false,
    reviews: [],

    videos: [],
    video: null,
    myInterest: null,
    article: {},
    watchList: [],
  },

  getters: {},

  mutations: {
    //회원가입 뮤테이션
    EMAIL_TRANSITION(state, email) {
      state.email = email;
    },

    CREATE_USER_LOGIN_INFO(state, user) {
      state.name = user.name;
      state.password = user.password;
    },

    CREATE_USER(state, user) {
      state.user = {
        email: state.email,
        password: state.password,
        name: state.name,
        height: user.height,
        weight: user.weight,
        gender: user.gender,
      };

      const API_URL = `${REST_API}/api-user/signup`;
      console.log(API_URL);
      axios({
        url: API_URL,
        method: "POST",
        params: state.user,
      }).then(() => {
        router.push("/main/login");
      });
    },

    //로그인 뮤테이션
    LOGIN(state, loginUser) {
      state.loginUser = Object.values(loginUser)[0];
      sessionStorage.setItem("access-token", Object.keys(loginUser)[0])
    },

    LOGOUT(state) {
      console.log("로그아웃 뮤테이션 호출됨");
      state.loginUser = null;
      window.localStorage.clear();
      sessionStorage.clear();
      router.push("/");
    },

    //히스토리 뮤테이션
    COMBO_COUNT(state, combo){
      state.combo=combo;
    },

    GET_STREAK(state, streak){
      state.streak = streak
    },


    GET_KCAL(state, kcalHistory) {
      state.kcalHistory = kcalHistory;
    },

    GET_THREEMAJOR(state, threeMajorHistory) {
      state.threeMajorHistory = threeMajorHistory;
    },

    GET_WEIGHT(state, weightHistory) {
      state.weightHistory = weightHistory;
    },

    //게시판 뮤테이션
    GET_BOARDS(state, boards) {
      state.boards = boards;
    },

    CREATE_BOARD(state, board) {
      state.boards.push(board);
      console.log(state.boards)
    },

    UPDATE_BOARD(state, board) {
      state.board = board;
    },

    DELETE_BOARD(state, boardId){
      for(let i = 0 ; i< state.boards.length ; i++){
        if(state.boards[i].boardId === boardId){
          state.boards.splice(i, 1);
        }
      }
    },

    //좋아요 뮤테이션
    GET_LIKE_LIST(state, data){
      if(data === 'yes'){
        state.isLiked = true;
      }else{
        state.isLiked = false;
      }
    },

    SMASH_LIKE(state){
      state.isLiked = !state.isLiked;
    },

    SMASH_DISLIKE(state){
      state.isLiked = !state.isLiked;
    },




    //리뷰 뮤테이션
    WRITE_REVIEW(state, review) {
      state.reviews.push(review);
    },

    GET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },

    DELETE_REVIEW(state, reviewId){
      for(let i = 0 ; i< state.reviews.length ; i++){
        if(state.reviews[i].reviewId === reviewId){
          state.reviews.splice(i, 1);
        }
      }
    },

    GET_WATCH_LIST(state, watchList){
      state.watchList=watchList;
    },

    WRITE_WATCH_LIST(state, info){
      state.watchList.push(info);
    },

    SEARCH_YOUTUBE(state, videos) {
      state.videos = videos;
    },

    CLICK_VIDEO(state, video) {
      state.video = video;
    },
  },

  actions: {
    // 회원가입 액션
    emailTransition({ commit }, email) {
      commit("EMAIL_TRANSITION", email);
      router.push("/main/signup");
    },

    createUserLoginInfo({ commit }, user) {
      commit("CREATE_USER_LOGIN_INFO", user);
      router.push("/main/signupsecond");
    },

    createUser({ commit }, user) {
      commit("CREATE_USER", user);
    },

    //로그인 액션
    login({ commit }, loginUser) {
      const API_URL = `${REST_API}/api-user/login`;
      console.log(API_URL);
      axios({
        url: API_URL,
        method: "POST",
        params: loginUser,
      })
        .then((res) => {
          commit("LOGIN", res.data);
          router.push("/main");
          router.go(0);
        })  
        .catch((err) => {
          alert("일치하는 로그인 정보가 없습니다.");
          console.log(err);
        });
    },

    //히스토리 액션
    getKcalHistory({ commit }, idxKey) {
      const KCAL_API_URL = `${REST_API}/api-history/history/kcal/${idxKey}`;
      axios({
        url: KCAL_API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_KCAL", res.data);
        })
        .catch((err) => console.log(err));
    },

    getThreeMajorHistory({ commit }, idxKey) {
      const THREEMAJOR_API_URL = `${REST_API}/api-history/history/threeMajor/${idxKey}`;
      axios({
        url: THREEMAJOR_API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_THREEMAJOR", res.data);
        })
        .catch((err) => console.log(err));
    },

    getWeightHistory({ commit }, idxKey) {
      const WEIGHT_API_URL = `${REST_API}/api-history/history/weight/${idxKey}`;
      axios({
        url: WEIGHT_API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_WEIGHT", res.data);
        })
        .catch((err) => console.log(err));
    },


    getStreak({ commit }, idxKey) {
      const API_URL = `${REST_API}/api-history/history/streak/${idxKey}`;

      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_STREAK", res.data);
          console.log(res.data)
        })
        .catch((err) => console.log(err));
      

    },

    //게시판 액션
    getBoards({ commit }) {
      const API_URL = `${REST_API}/api-board/board`;
      axios({
        url: API_URL,
        method: "GET",
      }).then((res) => {
        commit("GET_BOARDS", res.data);
      });
    },

    async writeBoard({ commit }, articleData) {
      const API_URL = `${REST_API}/api-board/write`;
      const formData = new FormData();
      formData.append("title", articleData[0].title);
      formData.append("content", articleData[0].content);
      formData.append("kcal", articleData[0].kcal);
      formData.append("weight", articleData[0].weight);
      formData.append("threeMajor", articleData[0].threeMajor);
      formData.append("writerName", articleData[0].writerName);
      formData.append("writerKey", articleData[0].writerKey);
      formData.append("combo", articleData[0].combo)
      formData.append("file", articleData[1]);
      
      commit

      try {
        console.log(formData)
        const { data } = await axios.post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.push("/board/articlelist")
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    },

    updateBoard({ commit }, board) {
      const API_URL = `${REST_API}/api-board/update`;
      axios({
        url: API_URL,
        method: "PUT",
        params: board,
      })
        .then(() => {
          commit("UPDATE_BOARD", board);
          router.push("/board");
        })
        .catch((err) => console.log(err));
    },

    deleteBoard({ commit }, boardId) {
      const API_URL = `${REST_API}/api-board/delete/${boardId}`;
      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then(() => {
          commit;
          router.go(0);
        })
        .catch((err) => console.log(err));
    },

    //좋아요 액션
    getLikeList({commit},boardUser){
      const API_URL = `${REST_API}/api-boardLike/likeList`;
      axios({
        url: API_URL,
        method: "GET",
        params: boardUser,
      }).then((res) => {
        commit("GET_LIKE_LIST", res.data);
      })
      .catch((err) => console.log(err));
    },

    smashLike({ commit }, boardUser) {
      const API_URL = `${REST_API}/api-boardLike/likeup`;
      axios({
        url: API_URL,
        method: "POST",
        params: boardUser,
      }).then(() => {
        commit("SMASH_LIKE")
      });
    },

    smashDislike({ commit }, boardUser) {
      const API_URL = `${REST_API}/api-boardLike/likeDown`;
      axios({
        url: API_URL,
        method: "Delete",
        params: boardUser,
      }).then(() => {
        commit("SMASH_DISLIKE")
      });
    },

    //리뷰 액션
    writeReview({ commit }, review) {
      const API_URL = `${REST_API}/api-review/write`;

      console.log(review);
      axios({
        url: API_URL,
        method: "POST",
        params: review,
      })
        .then(() => {
          commit("WRITE_REVIEW", review);
        })
        .catch((err) => console.log(err));
    },

    getReviews({ commit }, boardId) {
      const API_URL = `${REST_API}/api-review/list/${boardId}`;

      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_REVIEWS", res.data);
        })
        .catch((err) => console.log(err));
    },

    deleteReview({ commit }, reviewId) {
      const API_URL = `${REST_API}/api-review/delete/${reviewId}`;

      axios({
        url: API_URL,
        method: "DELETE",
      })
        .then(() => {
          commit("DELETE_REVIEW", reviewId)
        })
        .catch((err) => console.log(err));
    },



    getWatchList({commit}, idxKey){
      const API_URL = `${REST_API}/api-watchLIst/list/${idxKey}`;

      axios({
        url: API_URL,
        method: "GET",
      })
        .then((res) => {
          commit("GET_WATCH_LIST", res.data)
        })
        .catch((err) => console.log(err));

    },

    writeWatchList({commit}, info){
      const API_URL = `${REST_API}/api-watchLIst/write`;
      console.log(info)
      axios({
        url: API_URL,
        method: "POST",
        params: info
      })
        .then(() => {
          commit("WRITE_WATCH_LIST", info)
        })
        .catch((err) => console.log(err));
    },

    getPopularVideo({ commit }) {
      const URL = "https://www.googleapis.com/youtube/v3/search";
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
      const healthKeyword = "#헬스";
      axios({
        url: URL,
        method: "GET",
        params: {
          key: API_KEY,
          part: "snippet",
          q: healthKeyword,
          type: "video",
          maxResults: 12,
        },
      })
        .then((res) => {
          commit("SEARCH_YOUTUBE", res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    searchYoutube({ commit }, keyword) {
      const URL = "https://www.googleapis.com/youtube/v3/search";
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
      const healthKeyword = "#헬스 " + keyword;
      axios({
        url: URL,
        method: "GET",
        params: {
          key: API_KEY,
          part: "snippet",
          q: healthKeyword,
          type: "video",
          maxResults: 12,
        },
      })
        .then((res) => {
          commit("SEARCH_YOUTUBE", res.data.items);
          router.push("searchresult").catch(() => { });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    clickVideo({ commit }, video) {
      commit("CLICK_VIDEO", video);
      router.push("./detail").catch(() => { });
    },

    getCategory({ commit }, keyword) {
      const URL = "https://www.googleapis.com/youtube/v3/search";
      const API_KEY = process.env.VUE_APP_YOUTUBE_API_KEY;
      const healthKeyword = "#헬스 " + keyword;
      console.log(healthKeyword);
      axios({
        url: URL,
        method: "GET",
        params: {
          key: API_KEY,
          part: "snippet",
          q: healthKeyword,
          type: "video",
          maxResults: 12,
        },
      })
        .then((res) => {
          commit("SEARCH_YOUTUBE", res.data.items);
          router.push("searchresult").catch(() => { });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  plugins: [
    createPersistedState(
      // {paths: ["loginUser"],}
    ),
  ],

  modules: {},
});
