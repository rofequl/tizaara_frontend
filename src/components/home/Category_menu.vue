<template>
  <div class="category-menu-section">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 col-lg-3 col-xl-3 col-sm-12 col-12" id="category">
          <div class="categorie-menu-wrapper">
            <ul>
              <li>
                <div class="menu-title">
                  <h6 class="mb-0">Categories</h6>
                  <a href="#">View All</a>
                </div>
              </li>
              <li v-for="categories in category.slice(0,13)" :key="categories.id">
                <router-link :to="'category/'+categories.slug">
                  <img :src="showImage(categories.icon)" v-if="categories.icon" class="cat-image"
                       :class="categories.subcategories.length > 0? 'dropdown-toggle':''">
                  {{ categories.name }}
                </router-link>
                <ul v-if="categories.subcategories.length !== 0" ref="userPanelMainContents">
                  <li>
                    <div class="row mb-3">
                      <div class="col-sm-12 ">
                        <a href="javascript:" class="mob-btn-back d-lg-none"><i
                            class="fa fa-arrow-left"></i> Back</a>
                      </div>
                      <div class="col-sm-4" v-for="subcategories in categories.subcategories" :key="subcategories.id">
                        <h6 class="submenu-title">{{ subcategories.name }}</h6>
                        <router-link :to="'category/'+categories.slug+'/'+subcategories.slug+'/'+subsubcategories.slug"
                                     v-for="subsubcategories in subcategories.subsubcategories"
                                     :key="subsubcategories.id">
                          {{ subsubcategories.name }}
                        </router-link>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div><!-- .col-3 end -->

        <div class="col-md-12 col-lg-9 col-xl-9 col-sm-12 col-12">
          <div class="main-menu">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link" href="#">Popular items</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Verified Supplier</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Top Supplier</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Submit RFQ</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Sell on Tizaara </a>
              </li>
            </ul>
          </div><!-- .main-menu end -->
          <div class="deal-of-the-day">
            <div class="banner-image">
              <img src="@/assets/image/home-banner-5.jpg" class="w-100 img-fluid" alt="">
              <div class="banner-fixed-feature">
                <div class="banner-fixed-feature-item">
                  <i class="fa fa-sm fa-tools"></i>
                  <div class="item-type">
                    <h6>Lorem ipsum dolor</h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
                <div class="banner-fixed-feature-item">
                  <i class="fa fa-sm fa-tools"></i>
                  <div class="item-type">
                    <h6>Lorem ipsum dolor</h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
                <div class="banner-fixed-feature-item">
                  <i class="fa fa-sm fa-tools"></i>
                  <div class="item-type">
                    <h6>Lorem ipsum dolor</h6>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </div>
                </div>
              </div>
            </div><!-- .banner-images end -->
          </div><!-- .deal-of-the-day end -->
        </div> <!-- .col-9 end -->
      </div> <!-- .row end -->
    </div><!-- .container end -->
  </div><!-- .category-menu-section end -->
</template>

<script>
import ApiService from "@/core/services/api.service";
import {api_base_url} from "@/core/config/app";

export default {
  name: "category_menu",
  data() {
    return {
      category: [],
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadCategory: function () {
      ApiService.get('category')
          .then(({data}) => {
            this.category = data;
          })
    },
    subHide(e) {
      console.log(e.element);
    }
  },
  created() {
    this.loadCategory();

  }
}
</script>

<style scoped>
.cat-image {
  width: 16px;
  opacity: .6;
  margin-right: 10px;
}
</style>
