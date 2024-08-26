import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PropertyView from '../views/PropertyView.vue'
import UserView from '../views/UserView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddPropertyView from '../views/AddPropertyView.vue'
import EditPropertyView from '../views/EditPropertyView.vue'
import EditProfileView from '../views/EditProfileView.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/properties/:id',
        name: 'property',
        component: PropertyView
    },
    {
        path: '/users/:id',
        name: 'user',
        component: UserView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/new',
        name: 'add-property',
        component: AddPropertyView
    },
    {
        path: '/properties/:id/edit',
        name: 'edit-property',
        component: EditPropertyView
    },
    {
        path: '/users/:id/edit',
        name: 'edit-profile',
        component: EditProfileView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
