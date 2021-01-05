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
                    meta: {title: 'Flash Deal'},
                    path: "/flash-deal/:slug",
                    name: "Flash Deal",
                    component: () => import("@/components/page/FlashDeal")
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
                },
                {
                    meta: {title: 'Terms and Condition'},
                    path: "/terms-conditions",
                    name: "terms-conditions",
                    component: () => import("@/components/page/Terms"),
                },
                {
                    meta: {title: 'Privacy Policy'},
                    path: "/privacy-policy",
                    name: "privacy-policy",
                    component: () => import("@/components/page/Privacy"),
                },
                {
                    meta: {title: 'About Us'},
                    path: "/about-us",
                    name: "about-us",
                    component: () => import("@/components/page/About"),
                },
                {
                    meta: {title: 'Join our Sales Team'},
                    path: "/join-sales",
                    name: "join-sales",
                    component: () => import("@/components/page/JoinSales"),
                },
                {
                    meta: {title: 'Help Center'},
                    path: "/help-center",
                    name: "help-center",
                    component: () => import("@/components/page/Help"),
                },
                {
                    meta: {title: 'Help Center'},
                    path: "/help-category",
                    name: "help-category",
                    component: () => import("@/components/page/HelpCategory"),
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
                    meta: {title: 'Product Request'},
                    path: "/dashboard/product-request/:type?",
                    name: "product-request",
                    component: () => import("@/components/dashboard/product/ProductRequest")
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
                {
                    meta: {title: 'Quotation List'},
                    path: "/dashboard/quotation",
                    name: "quotation-list",
                    component: () => import("@/components/dashboard/marketing/Quotation")
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
