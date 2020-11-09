<template>
  <div>
    <CategoryMenu/>
    <Deal/>
    <Cat_product/>
    <Brands/>
    <Quotation/>
  </div>
</template>

<script>
import CategoryMenu from './home/Category_menu'
import Deal from './home/Deal'
import Brands from "@/components/home/Brands";
import Quotation from "@/components/home/Quotation";
import Cat_product from "@/components/home/Cat_product";
import {SUBCATEGORY_LIST} from "@/core/services/store/module/subcategory";
import {CATEGORY_LIST} from "@/core/services/store/module/category";
import {SUBSUBCATEGORY_LIST} from "@/core/services/store/module/subsubcategory";
import {HOMEBANNER_LIST} from "@/core/services/store/module/homeslider";
import {HOME_CATEGORY_PRODUCT} from "@/core/services/store/module/category";
import {BRAND_LIST} from "@/core/services/store/module/brand";

export default {
  name: "Home",
  created() {
    this.$store.dispatch(HOMEBANNER_LIST)
    this.$store.dispatch(SUBCATEGORY_LIST)
    this.$store.dispatch(CATEGORY_LIST)
    this.$store.dispatch(SUBSUBCATEGORY_LIST)
    this.$store.dispatch(HOME_CATEGORY_PRODUCT)
    this.$store.dispatch(BRAND_LIST)
  },
  components: {CategoryMenu, Deal, Brands, Quotation, Cat_product}
}
</script>

<style scoped>

</style>
