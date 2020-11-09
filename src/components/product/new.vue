<template>
  <div class="product-list-wrapper">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-2">
          <div class="sidebar-filter-wrapper">
            <div class="sidebar-item-wrapper">
              <h3><a data-toggle="collapse" href="#related-category" role="button" aria-expanded="true"
                     aria-controls="related-category">Related Category</a></h3>
              <div class="collapse show" id="related-category">
                <ul>
                  <li v-for="subcategories in subcategory_list" :key="subcategories.id">
                    <router-link
                        :class="subcategories.id === subcategory_id?'font-weight-bold':''"
                        :to="{name: 'category', params: { cat: getCategoryById(category_id).slug, sub: subcategories.slug }}">
                      {{ subcategories.name }}
                    </router-link>
                    <ul v-if="subcategories.id === subcategory_id">
                      <li v-for="sub_subcategories in sub_subcategory_list" :key="sub_subcategories.id">
                        <router-link
                            :class="sub_subcategories.id === sub_subcategory_id?'font-weight-bold':''"
                            :to="{name: 'category', params: { cat: getCategoryById(category_id).slug, sub: subcategories.slug, subcat: sub_subcategories.slug }}">
                          {{ sub_subcategories.name }}
                        </router-link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div class="sidebar-item-wrapper">
              <h3><a data-toggle="collapse" href="#business-type" role="button" aria-expanded="true"
                     aria-controls="business-type">Business Type</a></h3>
              <div class="collapse show" id="business-type">
                <ul>
                  <li v-for="businessType in business_typeList" :key="businessType.id">
                    <a href="">{{ businessType.name }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-8">
          <nav aria-label="breadcrumb" class="breadcrumb-nav border-0 mb-0">
            <div class="container d-flex align-items-center">
              <ol class="breadcrumb">
                <li class="breadcrumb-item" v-if="category_id !== ''">
                  <router-link :to="{name: 'category', params: { cat: getCategoryById(category_id).slug }}">
                    {{ getCategoryById(category_id).name }}
                  </router-link>
                </li>
                <li class="breadcrumb-item" v-if="subcategory_id !== ''">
                  <router-link
                      :to="{name: 'category', params: { cat: getCategoryById(category_id).slug, sub: getSubcategoryNameById(subcategory_id).slug, }}">
                    {{ getSubcategoryNameById(subcategory_id).name }}
                  </router-link>
                </li>
                <li class="breadcrumb-item" v-if="sub_subcategory_id !== ''">
                  {{ getSubsubcategoryNameById(sub_subcategory_id).name }}
                </li>
                <li class="breadcrumb-item" aria-current="page"><a>({{ product_list.length }} Results)</a></li>
              </ol>
            </div><!-- End .container -->
          </nav><!-- End .breadcrumb-nav -->

          <div class="top-filter">
            <div class="filters">
              <div class="filter-item mr-4">
                <span class="filter-label">Price </span>
                <input type="text" class="form-control text-center" style="width: 60px" placeholder="Min">
                <span> - </span>
                <input type="text" class="form-control text-center" style="width: 60px" placeholder="Max">
              </div>
              <div class="filter-item mr-4">
                <span class="filter-label">Sort by</span>
                <select class="form-control" title="Sort by">
                  <option>New items</option>
                  <option value="1">Price - high to low</option>
                  <option value="2">Price - low to high</option>
                  <option value="3">Old items</option>
                </select>
              </div>
              <div class="filter-item mr-4">
                <span class="filter-label">Items per page</span>
                <select class="form-control" id="" title="Items per page">
                  <option value="1">25</option>
                  <option value="2">50</option>
                  <option value="3">100</option>
                </select>
              </div>
            </div>
            <div class="filter-view-item">
              <label>View:</label>
              <svg viewBox="0 0 1024 1024">
                <path
                    d="M409.6 411.733333a2.133333 2.133333 0 0 0 2.133333-2.133333V204.8a2.133333 2.133333 0 0 0-2.133333-2.133333H204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64H204.8A66.133333 66.133333 0 0 1 138.666667 409.6V204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM819.2 411.733333a2.133333 2.133333 0 0 0 2.133333-2.133333V204.8a2.133333 2.133333 0 0 0-2.133333-2.133333h-204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64h-204.8a66.133333 66.133333 0 0 1-66.133333-66.133333V204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM409.6 821.333333a2.133333 2.133333 0 0 0 2.133333-2.133333v-204.8a2.133333 2.133333 0 0 0-2.133333-2.133333H204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64H204.8a66.133333 66.133333 0 0 1-66.133333-66.133333v-204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333zM819.2 821.333333a2.133333 2.133333 0 0 0 2.133333-2.133333v-204.8a2.133333 2.133333 0 0 0-2.133333-2.133333h-204.8a2.133333 2.133333 0 0 0-2.133333 2.133333v204.8c0 1.152 0.981333 2.133333 2.133333 2.133333h204.8z m0 64h-204.8a66.133333 66.133333 0 0 1-66.133333-66.133333v-204.8c0-36.522667 29.610667-66.133333 66.133333-66.133333h204.8c36.522667 0 66.133333 29.610667 66.133333 66.133333v204.8a66.133333 66.133333 0 0 1-66.133333 66.133333z"></path>
              </svg>
              <svg class="active" viewBox="0 0 1024 1024">
                <path d="M128 236.8v-64h768v64zM128 544v-64h768v64zM128 851.2v-64h768v64z"></path>
              </svg>
            </div>
          </div>

          <div class="top-filter">
            <div class="filters">
              <div class="filter-item mr-4">
                <div class="btn-group" role="group" aria-label="Basic example">
                  <button type="button" class="btn btn-filter">All Listings</button>
                  <button type="button" class="btn btn-filter">Buy It Now</button>
                </div>
              </div>
            </div>
            <div class="filter-view-item">
              <span>View by:</span>
              <a href="" class="pro">Product</a>
              <span> | </span>
              <a href="">Supplier</a>
            </div>
          </div>

          <div class="product-item-categoryHeader">
            <hr class="first">
            <div class="name" v-if="category_id !== '' && child_position === 1">{{
                getCategoryById(category_id).name
              }}
            </div>
            <div class="name" v-if="subcategory_id !== '' && child_position === 2">
              {{ getSubcategoryNameById(subcategory_id).name }}
            </div>
            <div class="name" v-if="sub_subcategory_id !== '' && child_position === 3">
              {{ getSubsubcategoryNameById(sub_subcategory_id).name }}
            </div>
            <hr class="last">
          </div>

          <div v-if="product_list.length > 0">
            <div class="items-lest-wrapper" v-for="products in product_list" :key="products.product.id">
              <div class="row">
                <div class="col-sm-2">
                  <div class="img-wrapper">
                    <img :src="showImage(products.product.thumbnail_img)" class="img-fluid" alt="">
                  </div>
                </div>
                <div class="col-sm-10">
                  <div class="item-key">
                    <div class="cat-wrapper">
                      <div class="row">
                        <div class="col-sm-7">
                          <div class="cat-1">
                            <h4><a href="">{{ products.product.name }}</a>
                            </h4>
                            <div class="price-cat">
                              <div class="price">
                                <h5 class="hot-price">৳
                                  {{ products.product.priceType == 1 ? totalPrice(products.product.product_stock) : products.product.unit_price }}
                                </h5>
                              </div>
                              <div class="price-verified-wrapper">
                                <a target="_blank" v-if="products.product.video_link" :href="products.product.video_link"><i class="fab fa-youtube"></i> Company Video</a>
                              </div>
                            </div>
                            <p v-for="(property, k) in jsonDecode(products.product.property_options)" :key="k">
                              <span style="color: #888" v-if="property.name">{{ property.name }}:</span> {{ property.value }}
                            </p>

                            <a href="" class="view-link">View Details</a>
                          </div>
                        </div>
                        <div class="col-sm-5" style="border-left: 1px solid #ddd;">
                          <div class="cat-2">
                            <h4 v-if="products.companyInfo"><a href="">{{products.companyInfo.name}}</a></h4>
                            <span v-if="products.address" style="color: #888" class="d-block">{{products.address.address}}</span>
                            <span style="color: #888" v-if="false"
                                  class="d-block">Manufacturer, Trading Company</span>
                            <div class="call-center" v-if="products.companyInfo">
                              <a href="" class="mobile">
                                <i class="fas fa-phone-alt"></i> Call
                                <span style="background: #fff;padding: 5px;margin-left: 8px;">{{products.companyInfo.phone}}</span>
                              </a>
                            </div>
                            <a href="" style="display: inline-block;
                                                    background: #f05931;
                                                    padding: 5px 10px;
                                                    margin-top: 25px;
                                                    font-size: 14px;
                                                    color: #fff;
                                                    border-radius: 3px;"><i class="far fa-envelope mr-1"></i> Contact
                              Supplier</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div class="col-sm-2">
          <div class="w-100 h-100" style="background: #e3e3e3"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {SUBCATEGORY_LIST} from "@/core/services/store/module/subcategory";
import {CATEGORY_LIST} from "@/core/services/store/module/category";
import {SUBSUBCATEGORY_LIST} from "@/core/services/store/module/subsubcategory";
import {mapGetters} from "vuex";
import {BUSINESS_TYPE_LIST} from "@/core/services/store/module/businesstype";
import ApiService from "@/core/services/api.service";
import {api_base_url} from "@/core/config/app";

export default {
  name: "new.vue",
  data() {
    return {
      category_id: '',
      subcategory_id: '',
      sub_subcategory_id: '',
      subcategory_list: [],
      sub_subcategory_list: [],
      child_id: '',
      child_position: '',
      product_list: [],
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadChild() {
      if (this.$route.params.subcat) {
        this.child_position = 3;
      } else {
        if (this.$route.params.sub) {
          this.child_position = 2;
        } else {
          this.child_position = 1;
        }
      }
    },
    handleScroll() {
      if ($(window).scrollTop() > 10) {
        $(".sidebar-filter-wrapper").css({"top": "71px", "height": "88vh"});
      } else {
        $(".sidebar-filter-wrapper").css({"top": "109px", "height": "80vh"});
      }
    },
    loadCategory() {
      if (this.$route.params.cat) {
        if (this.categoryList.length > 0) {
          let category = this.getCategoryBySlug(this.$route.params.cat);
          if (category) {
            this.category_id = category.id;
            this.child_position === 1 ? this.child_id = category.id : '';
          } else this.$router.push({name: "error"});
        }
      } else {
        this.$router.push({name: "All Categories"})
      }
    },
    loadSubcategory() {
      if (this.category_id !== '' && this.subcategoryList.length > 0) {
        this.subcategory_list = this.getSubcategoryById(this.category_id);
        if (this.$route.params.sub) {
          let subcategory = this.getSubcategoryNameBySlug(this.$route.params.sub);
          if (subcategory) {
            this.subcategory_id = subcategory.id;
            this.child_position === 2 ? this.child_id = subcategory.id : '';
          } else this.$router.push({name: "error"});
        }
      }
    },
    loadSubSubcategory() {
      if (this.subcategory_id !== '' && this.subsubcategoryList.length > 0) {
        this.sub_subcategory_list = this.getSubsubcategoryById(this.subcategory_id);
        if (this.$route.params.subcat) {
          let sub_subcategory = this.getSubsubcategoryNameBySlug(this.$route.params.subcat);
          if (sub_subcategory) {
            this.sub_subcategory_id = sub_subcategory.id;
            this.child_position === 3 ? this.child_id = sub_subcategory.id : '';
          } else this.$router.push({name: "error"});
        }
      }
    },
    loadProduct() {
      let url = '';
      if (this.child_position === 1) url += 'category=' + this.child_id;
      if (this.child_position === 2) url += '&subcategory=' + this.child_id;
      if (this.child_position === 3) url += '&subsubcategory=' + this.child_id;
      url = 'product-listing?' + url;
      ApiService.get(url)
          .then(({data}) => {
            this.product_list = data;
          })
    },
    totalPrice: function (e) {
      if (e.length == 0) return;
      let max = e.reduce((a, b) => Number(a.price) > Number(b.price) ? a : b)
      let min = e.reduce((a, b) => Number(a.price) < Number(b.price) && 0 !== Number(a.price) ? a : b)
      return max === min ? max.price : min.price + ' - ' + max.price;
    },
    jsonDecode(e) {
      return JSON.parse(e);
    },
  },
  created() {
    this.loadChild();
    window.addEventListener('scroll', this.handleScroll);
    this.$store.dispatch(SUBSUBCATEGORY_LIST)
    this.$store.dispatch(SUBCATEGORY_LIST)
    this.$store.dispatch(CATEGORY_LIST)
    this.$store.dispatch(BUSINESS_TYPE_LIST)
    this.loadCategory();
  },
  computed: {
    ...mapGetters(["categoryList", "getCategoryBySlug", "subcategoryList", "getSubcategoryById", "getCategoryById", "getSubcategoryNameBySlug", "subsubcategoryList",
      "getSubsubcategoryById", "getSubsubcategoryNameBySlug", "business_typeList", "getSubcategoryNameById", "getSubsubcategoryNameById"])
  },
  watch: {
    categoryList() {
      this.loadCategory();
    },
    subcategoryList() {
      this.loadSubcategory();
    },
    category_id() {
      this.loadSubcategory();
    },
    subsubcategoryList() {
      this.loadSubSubcategory();
    },
    subcategory_id() {
      this.loadSubSubcategory();
    },
    child_id() {
      this.loadProduct();
    }
  }
}
</script>

<style scoped>

</style>