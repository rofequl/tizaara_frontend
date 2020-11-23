<template>
  <aside id="left-panel" class="left-panel">
    <nav class="navbar navbar-expand-sm navbar-default">
      <div id="main-menu" class="main-menu collapse navbar-collapse">
        <ul class="nav navbar-nav" v-if="$store.getters.currentUser.status == 2">
          <li :class="$route.name === 'Dashboard'?'active':''">
            <router-link to="/dashboard"><i class="menu-icon fa fa-laptop"></i>Dashboard</router-link>
          </li>
          <li :class="$route.name === 'Message'?'active':''">
            <router-link to="/dashboard/message"><i class="menu-icon fas fa-sms"></i>Message</router-link>
          </li>
          <li :class="$route.name === 'Profile'?'active':''">
            <router-link to="/dashboard/profile"><i class="menu-icon fas fa-user"></i>Profile</router-link>
          </li>
          <li v-if="isSupplier" class="menu-title">Supplier</li>
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i
                class="menu-icon fa fa-shopping-cart"></i>Product</a>
            <ul class="sub-menu children dropdown-menu">
              <li>
                <i class="far fa-list-alt"></i>
                <router-link to="/dashboard/product-list">Product List</router-link>
              </li>
              <li>
                <i class="fas fa-cart-plus"></i>
                <router-link to="/dashboard/product-create">Post a Product</router-link>
              </li>
            </ul>
          </li>
          <li class="menu-item-has-children dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i
                class="menu-icon fas fa-bullhorn"></i>Marketing</a>
            <ul class="sub-menu children dropdown-menu">
              <li>
                <i class="fas fa-mail-bulk"></i>
                <router-link to="/dashboard/quotation">Quotation</router-link>
              </li>
            </ul>
          </li>
          <li v-if="isBuyer" class="menu-title">Buyer</li>
        </ul>
      </div>
    </nav>
  </aside>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters(["isSupplier", "isBuyer"])
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/dashboard/index';
</style>
