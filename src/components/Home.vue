<template>
  <div>
    <CategoryMenu/>
    <Deal/>
    <Cat_product/>
    <Testimonial/>
    <Brands/>
    <Quotation/>
    <Newsletter/>
  </div>
</template>

<script>
import CategoryMenu from './home/Category_menu'
import Deal from './home/Deal'
import Brands from "@/components/home/Brands";
import Quotation from "@/components/home/Quotation";
import Cat_product from "@/components/home/Cat_product";
import Newsletter from "@/components/home/Newsletter";
import Testimonial from "@/components/home/Testimonial";
import {SUBCATEGORY_LIST} from "@/core/services/store/module/subcategory";
import {CATEGORY_LIST} from "@/core/services/store/module/category";
import {SUBSUBCATEGORY_LIST} from "@/core/services/store/module/subsubcategory";
import {HOMEBANNER_LIST} from "@/core/services/store/module/homeslider";
import {HOME_CATEGORY_PRODUCT} from "@/core/services/store/module/category";
import {BRAND_LIST} from "@/core/services/store/module/brand";
import {mapGetters} from "vuex";

export default {
  name: "Home",
  created() {
    this.getHomeBanner.length < 1 ? this.$store.dispatch(HOMEBANNER_LIST) : '';
    this.subsubcategoryList.length < 1 ? this.$store.dispatch(SUBSUBCATEGORY_LIST) : '';
    this.subcategoryList.length < 1 ? this.$store.dispatch(SUBCATEGORY_LIST) : '';
    this.categoryList.length < 1 ? this.$store.dispatch(CATEGORY_LIST) : '';
    this.homeCategoryProduct.length < 1 ? this.$store.dispatch(HOME_CATEGORY_PRODUCT) : '';
    this.brandList.length < 1 ? this.$store.dispatch(BRAND_LIST) : '';
  },
  components: {CategoryMenu, Deal, Brands, Quotation, Cat_product, Newsletter, Testimonial},
  computed: {
    ...mapGetters(["categoryList", "subcategoryList", "subsubcategoryList", "brandList", "homeCategoryProduct", "getHomeBanner"])
  },
}
</script>

<style scoped>

</style>
