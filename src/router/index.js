import Vue from 'vue'
import Router from 'vue-router'
import multiguard from 'vue-router-multiguard';
import store from '../core/services/store'

Vue.use(Router)

const isLoggedIn = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
    } else next({name: 'home'})
}

export default new Router({
    mode: 'history',
    routes: [
        {
            path: "/",
            component: () => import("@/components/layout/Layout"),
            children: [
                {
                    meta: {title: 'Home'},
                    path: "/",
                    name: "home",
                    component: () => import("@/components/Home")
                },
                {
                    meta: {title: 'Categories'},
                    path: "/category/:cat?/:sub?/:subcat?",
                    name: "category",
                    component: () => import("@/components/product/new")
                },
                // {
                //     meta: {title: 'Categories'},
                //     path: "/category/:cat/:sub",
                //     name: "category-sub",
                //     component: () => import("@/components/product/new")
                // },
                {
                    meta: {title: 'All Categories List'},
                    path: "/categories",
                    name: "All Categories",
                    component: () => import("@/components/others/Categories"),
                }
            ]
        },

        {
            path: "/dashboard",
            component: () => import("@/components/dashboard/layout/Layout"),
            beforeEnter: multiguard([isLoggedIn]),
            children: [
                {
                    meta: {title: 'Dashboard'},
                    path: "/",
                    name: "Dashboard",
                    component: () => import("@/components/dashboard/Dashboard")
                },
                {
                    meta: {title: 'User verify admin'},
                    path: "/dashboard/verify-admin",
                    name: "verify-admin",
                    component: () => import("@/components/dashboard/other/Verify")
                },
                {
                    meta: {title: 'Create new product'},
                    path: "/dashboard/product-create",
                    name: "product-create",
                    component: () => import("@/components/dashboard/product/ProductCreate")
                },
                {
                    meta: {title: 'Product List'},
                    path: "/dashboard/product-list",
                    name: "product-list",
                    component: () => import("@/components/dashboard/product/ProductList")
                },
                {
                    meta: {title: 'Message'},
                    path: "/dashboard/message",
                    name: "Message",
                    component: () => import("@/components/dashboard/message/Message")
                },
                {
                    meta: {title: 'Profile'},
                    path: "/dashboard/profile",
                    name: "Profile",
                    component: () => import("@/components/dashboard/profile/Profile")
                },
            ]
        },
        {
            path: "*",
            name: "error",
            meta: {title: 'Error'},
            component: () => import("@/components/others/Error"),
        },
    ]
})
