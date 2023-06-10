import Vue from "vue";
import VueRouter from "vue-router";
import DaemoonView from "../views/DaemoonView.vue";
import MainView from "../views/MainView.vue";
import Signup from "../components/signup/Signup.vue";
import Login from "../components/login/Login.vue";
import MyPage from "../components/mypage/MyPage.vue";
import HealthView from "@/views/HealthView.vue";
import HealthMy from "@/components/health/HealthMy.vue";
import HealthYoutubeResult from "@/components/health/HealthYoutubeResult.vue";
import HealthYoutubeDetail from "@/components/health/HealthYoutubeDetail.vue";
import SignupSecond from "@/components/signup/SignupSecond.vue";
import BoardView from "@/views/BoardView.vue";
import DetailSideMenu from "@/components/health/DetailSideMenu.vue";
import SideMenu from "@/components/health/SideMenu.vue";
import HotArticles from "@/components/board/HotArticles.vue";
import ArticleList from "@/components/board/ArticleList.vue";
import WriteArticle from "@/components/board/WriteArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "daemoon",
    component: DaemoonView,
  },
  {
    path: "/main",
    name: "main",
    component: MainView,
    children: [
      {
        path: "",
        name: "mypage",
        component: MyPage,
      },
      {
        path: "login",
        name: "login",
        component: Login,
      },
      {
        path: "signup",
        name: "signup",
        component: Signup,
      },
      {
        path: "signupsecond",
        name: "signupsecond",
        component: SignupSecond,
      },
    ],
  },

  {
    path: "/health",
    name: "health",
    component: HealthView,
    children: [
      {
        path: "my",
        name: "my",
        component: HealthMy,
        children: [
          {
            path: "",
            component: SideMenu,
          },
        ],
      },

      {
        path: "searchresult",
        name: "searchresult",
        component: HealthYoutubeResult,
        children: [
          {
            path: "",
            component: SideMenu,
          },
        ],
      },

      {
        path: "detail",
        name: "detail",
        component: HealthYoutubeDetail,
        children: [
          {
            path: "",
            component: DetailSideMenu,
          },
        ],
      },
    ],
  },

  {
    path: "/board",
    name: "board",
    component: BoardView,
    children: [
      {
        path: "",
        component: HotArticles,
      },
      {
        path: 'articlelist',
        component : ArticleList
      },
      {
        path: 'writearticle',
        component : WriteArticle,
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
