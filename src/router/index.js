import VueRouter from 'vue-router'
import ReservationVue from '../components/ReservationPage/ReservationPage.vue'
import UserVue from '../components/UserPage/UserPage.vue'
import ManageVue from '../components/ManagePage/ManagePage.vue'
import StaticsPage from '../components/StaticsPage/StaticsPage.vue'
import LayoutPage from '../components/LayoutPage/LayoutPage.vue'
import TeamPage from '../components/TeamPage/TeamPage.vue'
import AddComponent from '../components/ReservationPage/AddComponent.vue'
import AddComponentLibrary from '../components/ReservationPage/AddComponentLibrary.vue'
export default new VueRouter({
    routes: [
        {
            path: '/'
        },
        {
            path: '/team',
            component: TeamPage
        },
        {
            path: '/user',
            component: UserVue
        },
        {
            path: '/layout',
            component: LayoutPage

        },
        {
            path: '/reservation',
            component: ReservationVue
        },
        {
            path: '/manage',
            component: ManageVue
        },
        {
            path: '/statics',
            component: StaticsPage
        },
        {
            path: '/component',
            component: AddComponent
        },
        {
            path:'/library',
            component: AddComponentLibrary
        }
    ]
})