import VueRouter from 'vue-router'
import ReservationVue from '../components/ReservationPage/ReservationPage.vue'
import UserVue from '../components/UserPage/UserPage.vue'
import ManageVue from '../components/ManagePage/ManagePage.vue'
import StaticsPage from '../components/StaticsPage/StaticsPage.vue'
import LayoutPage from '../components/LayoutPage/LayoutPage.vue'
import TeamPage from '../components/TeamPage/TeamPage.vue'
import BaseFrame from "../components/BasePage/BaseFrame.vue"
import StartPage from "../components/StartPage/StartPage.vue"
import StationPage from "../components/StationPage/StationPage.vue"
export default new VueRouter({
    routes: [
        {
            path:'/start',
            component:StartPage
        },
        {
            path:'/base',
            component: BaseFrame,
            children:[
                {
                    path: 'team',
                    component: TeamPage
                },
                {
                    path: 'user',
                    component: UserVue
                },
                {
                    path: 'layout',
                    component: LayoutPage
        
                },
                {
                    path: 'station',
                    component: StationPage
        
                },
                {
                    path: 'reservation',
                    component: ReservationVue
                },
                {
                    path: 'manage',
                    component: ManageVue
                },
                {
                    path: 'statics',
                    component: StaticsPage
                },
            ]
        }
    ]
})