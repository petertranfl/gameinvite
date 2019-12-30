import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from './views/LandingPage.vue'
import Profile from './views/Profile.vue'
import ErrorPage from './views/ErrorPage.vue'

Vue.use(Router)

export default new Router({
    routes: [ 
        {
            path: "/",
            name: "LandingPage",
            component: LandingPage
        },
        {
            path: "/profile/:summonerName",
            name: "Profile",
            component: Profile,
            props: true,
        },
        {
            path: "/error/",
            name: "ErrorPage",
            component: ErrorPage
        }
    ]
})