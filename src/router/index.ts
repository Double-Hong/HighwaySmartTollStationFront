import { createRouter, createWebHistory } from 'vue-router'

import Login from "../views/Login.vue"
import MainView from "../views/MainView.vue"
import EquipmentMain from "../views/EquipmentMain.vue";
import PersonalLogMain from "../views/PersonalLogMain.vue";
import PeopleManage from "../views/PeopleManage.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path:'/mainView',
            name:'mainView',
            component:MainView
        },
        {
            path:'/equipmentMain',
            name:'equipmentMain',
            component:EquipmentMain,
        },
        {
            path:'/personalLog',
            name:'personalLog',
            component:PersonalLogMain
        },
        {
            path:'/peopleManage',
            name:'peopleManage',
            component:PeopleManage
        }
    ]
})

export default router

