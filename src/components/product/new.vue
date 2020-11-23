<template>
  <div class="product-list-wrapper" style="min-height: 80vh">
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
                    <a href="/"
                       :class="subcategories.id === subcategory_id?'font-weight-bold':''"
                       @click.prevent="changeURL(getCategoryById(category_id).slug, subcategories.slug)">
                      {{ subcategories.name }}
                    </a>
                    <ul v-if="subcategories.id === subcategory_id">
                      <li v-for="sub_subcategories in sub_subcategory_list" :key="sub_subcategories.id">
                        <a href="/"
                           @click.prevent="changeURL(getCategoryById(category_id).slug, subcategories.slug,sub_subcategories.slug )"
                           :class="sub_subcategories.id === sub_subcategory_id?'font-weight-bold':''">
                          {{ sub_subcategories.name }}
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li v-for="category in category_list" :key="category.id">
                    <a href="#" @click.prevent="changeURL(category.slug)">
                      {{ category.name }}
                    </a>
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
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="page_info.busy"
               infinite-scroll-distance="page_info.distance">
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
                <span>View by:</span>
                <a href="" @click.prevent="viewBySelect('Products')" class="pro">Product</a>
                <span> | </span>
                <a href="" @click.prevent="viewBySelect('Suppliers')">Supplier</a>
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

            <div v-if="product_list.length > 0 && type === 'Suppliers'">
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
                                    {{
                                      products.product.priceType == 1 ? totalPrice(products.product.product_stock) : products.product.unit_price
                                    }}
                                  </h5>
                                </div>
                                <div class="price-verified-wrapper">
                                  <a target="_blank" v-if="products.product.video_link"
                                     :href="products.product.video_link"><i class="fab fa-youtube"></i> Company
                                    Video</a>
                                </div>
                              </div>
                              <p v-for="(property, k) in jsonDecode(products.product.property_options)" :key="k">
                                <span style="color: #888" v-if="property.name">{{ property.name }}:</span>
                                {{ property.value }}
                              </p>

                              <a href="" class="view-link">View Details</a>
                            </div>
                          </div>
                          <div class="col-sm-5" style="border-left: 1px solid #ddd;">
                            <div class="cat-2">
                              <h4><a href="">{{ products.supplier.name }}</a></h4>
                              <span style="color: #888"
                                    class="d-block">{{ products.supplier.address }}</span>
                              <span style="color: #888" v-if="false"
                                    class="d-block">Manufacturer, Trading Company</span>
                              <div class="call-center">
                                <a href="" class="mobile">
                                  <i class="fas fa-phone-alt"></i> Call
                                  <span
                                      style="background: #fff;padding: 5px;margin-left: 8px;">{{
                                      products.supplier.phone
                                    }}</span>
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

            <div class="item-container" v-if="type === 'Products'">
              <a class="product-item" title="Fila Exolize 2" v-for="products in product_list" :key="products.product.id"
                 href="#">
                <div class="item-box">
                  <div class="img-box">
                    <img class="equalHeightWidth" :src="showImage(products.product.thumbnail_img)" alt="Fila Exolize 2">
                  </div>
                  <div class="caption">
                    <div class="product-title">
                      <h6 title="Fila Exolize 2">{{ products.product.name }}</h6>
                    </div>
                    <h5 class="price">৳
                      {{
                        products.product.priceType == 1 ? totalPrice(products.product.product_stock) : products.product.unit_price
                      }}
                    </h5>
                  </div>
                </div>
              </a>
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
import {debounce} from "lodash";

export default {
  name: "new.vue",
  data() {
    return {
      page_info: {
        busy: false,
        total: '',
        current_page: 1,
        distance: 200,
      },
      category_list: [],
      category_id: '',
      subcategory_id: '',
      sub_subcategory_id: '',
      subcategory_list: [],
      sub_subcategory_list: [],
      child_id: '',
      child_position: '',
      product_list: [],
      type: 'Suppliers',
      keyword: '',
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    changeURL(category = false, subcategory = false, subsubcategory = false) {
      let param = '';
      let query = {};
      if (category) param += '/' + category;
      if (subcategory) param += '/' + subcategory;
      if (subsubcategory) param += '/' + subsubcategory;
      if (this.keyword !== '') query.pro = this.keyword;
      if (this.type !== '') query.type = this.type;

      this.$router.push({path: `/category${param}`, query: query});
    },
    viewBySelect(type) {
      this.$router.push({path: this.$router.currentRoute.fullPath, query: {type: type}});
    },
    loadMore: function () {
      if (this.product_list.length > 0) this.debounceName();
    },
    loadQuery() {
      if (this.$route.query.type) {
        this.$route.query.type === 'Suppliers' ? this.type = 'Suppliers' : this.$route.query.type === 'Products' ? this.type = 'Products' : alert('error');
        if (this.$route.query.pro) this.keyword = this.$route.query.pro;
      }
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
        if (this.categoryList.length > 0) {
          this.category_list = this.categoryList;
          this.child_position = 0;
          this.loadProduct();
        }
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
      if (this.keyword !== '') url += '&keyword=' + this.keyword;
      if (this.type !== '') url += '&type=' + this.type;
      if (!this.page_info.busy) url += '&page=' + this.page_info.current_page;
      url = 'product-listing?' + url;
      ApiService.get(url)
          .then(({data}) => {
            this.page_info.busy = true
            if (this.page_info.current_page === 1) {
              this.product_list = data.product_details;
              data.product_load.to === data.product_load.current_page ? this.page_info.busy = true : this.page_info.busy = false;
            } else {
              setTimeout(() => {
                for (let i = 0, j = data.product_details.length; i < j; i++) {
                  this.product_list.push(data.product_details[i]);
                }
                data.product_load.to === data.product_load.current_page ? this.page_info.busy = true : this.page_info.busy = false;
              }, 1000);
            }
            this.page_info.total = data.product_load.total;
            this.page_info.current_page = data.product_load.current_page + 1;
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
    this.debounceName = debounce(this.loadProduct, 1000)
    this.loadQuery();
    this.loadChild();
    window.addEventListener('scroll', this.handleScroll);
    this.subsubcategoryList.length < 1 ? this.$store.dispatch(SUBSUBCATEGORY_LIST) : '';
    this.subcategoryList.length < 1 ? this.$store.dispatch(SUBCATEGORY_LIST) : '';
    this.categoryList.length < 1 ? this.$store.dispatch(CATEGORY_LIST) : '';
    this.business_typeList.length < 1 ? this.$store.dispatch(BUSINESS_TYPE_LIST) : '';
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
    },
    '$route.query.type'() {
      this.loadQuery();
      this.loadProduct();
    },
    '$route.query.pro'() {
      this.loadQuery();
      this.loadProduct();
    }
  }
}
</script>

<style scoped>

</style>