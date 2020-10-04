import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

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
                    path: "/category/:cat/:sub?/:subcat?",
                    name: "category",
                    component: () => import("@/components/product/Product_list")
                },
                {
                    meta: {title: 'Categories'},
                    path: "/category/:cat/:sub",
                    name: "category-sub",
                    component: () => import("@/components/product/Product_list")
                },
            ]
        },

        {
            path: "/dashboard",
            component: () => import("@/components/dashboard/layout/Layout"),
            children: [
                {
                    meta: {title: 'Dashboard'},
                    path: "/",
                    name: "Dashboard",
                    component: () => import("@/components/dashboard/Dashboard")
                },
                {
                    meta: {title: 'User verify admin'},
                    path: "/verify-admin",
                    name: "verify-admin",
                    component: () => import("@/components/dashboard/other/Verify")
                },
                {
                    meta: {title: 'Create new product'},
                    path: "/product-create",
                    name: "product-create",
                    component: () => import("@/components/dashboard/product/ProductCreate")
                }, {
                    meta: {title: 'Product List'},
                    path: "/product-list",
                    name: "product-list",
                    component: () => import("@/components/dashboard/product/ProductList")
                },
            ]
        }
    ]
})
