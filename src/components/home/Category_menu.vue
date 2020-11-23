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
                  <router-link to="/categories">View All</router-link>
                </div>
              </li>
              <li v-for="categories in categoryList.slice(0,13)" :key="categories.id">
                <router-link :to="'category/'+categories.slug">
                  <img v-lazy="showImage(categories.icon)" v-if="categories.icon" class="cat-image"
                       :class="getSubcategoryById(categories.id).length > 0? 'dropdown-toggle':''">
                  {{ categories.name }}
                </router-link>
                <ul v-if="getSubcategoryById(categories.id).length > 0">
                  <li>
                    <div class="row mb-3">
                      <div class="col-sm-12 ">
                        <a href="javascript:" class="mob-btn-back d-lg-none"><i
                            class="fa fa-arrow-left"></i> Back</a>
                      </div>
                      <div class="col-sm-4 my-2" v-for="subcategories in getSubcategoryById(categories.id).slice(0,6)"
                           :key="subcategories.id">
                        <h6 class="submenu-title">{{ subcategories.name }}</h6>
                        <router-link :to="'category/'+categories.slug+'/'+subcategories.slug+'/'+subsubcategories.slug"
                                     v-for="subsubcategories in getSubsubcategoryById(subcategories.id).slice(0,5)"
                                     :key="subsubcategories.id">{{ subsubcategories.name }}
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

              <div>
                <b-carousel
                    id="carousel-fade"
                    fade
                    img-width="100%"
                    img-height="100%"
                >
                  <b-carousel-slide v-for="(photo, k) in home_banner" :key="k"
                                    :img-src="photo"
                  ></b-carousel-slide>
                </b-carousel>
              </div>


              <div class="banner-fixed-feature" style="z-index: 1">
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
import {api_base_url} from "@/core/config/app";
import {mapGetters} from "vuex";

export default {
  name: "category_menu",
  data() {
    return {
      home_banner: [],
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadSlider(data) {
      if (!$.isEmptyObject(data)) {
        if (data.home_banner !== '') {
          this.home_banner = [];
          let photos = JSON.parse(data.home_banner);
          for (let i = 0; i < photos.length; i++) {
            this.home_banner.push(this.showImage(photos[i]));
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters(["getHomeBanner", "getSubcategoryById", "categoryList", "getSubsubcategoryById"])
  },
  created() {
    this.loadSlider(this.getHomeBanner);
  },
  watch: {
    getHomeBanner(data) {
      this.loadSlider(data);
    }
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
