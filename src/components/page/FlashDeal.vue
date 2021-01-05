<template>
  <div class="product-list-wrapper" style="min-height: 80vh">
    <div class="container-fluid">
      <div class="row" v-if="flash_details.banner">
        <img :src="showImage(flash_details.banner)" width="100%" height="100px">
      </div>
    </div>
    <div class="container">
      <div class="row" v-if="flash_details.banner">
        <div class="col-12">
          <h3 class="text-center my-2">{{ flash_details.name }}</h3>
          <div class="row justify-content-center">
            <div class="weekly-deals col-6 col-sm-4 col-md-3 col-lg-3 col-xl-2">
              <Timer
                  :starttime="new Date().getTime()"
                  :endtime="flash_details.end_date"
                  trans='{"status": {}}'></Timer>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="item mt-5">
            <div class="row">
              <div v-for="(product, i) in flash_details.product" class="col-6 col-sm-6 col-md-2 mb-5 box-shadow"
                   :key="i">
                <div class="card singel-item p-1" style="min-height: 242px">
                  <div class="card-header position-relative">
                    <img :src="showImage(product.thumbnail_img)" class="w-100" alt="">
                  </div>
                  <div class="off" v-if="product.discount_type === 'percent'">
                    <span class="bg-success p-1 text-white position-absolute">-{{ product.discount }}%</span>
                  </div>
                  <p class="text-center font-weight-bold pt-2" style="font-size: 12px">{{ product.name }}</p>
                  <p>
                    <span>৳ {{ product.price }}</span><br>
                    <del>৳ {{ product.discount_price }}</del>
                  </p>
                </div><!-- .singel-item end -->
              </div>
            </div><!-- .row end -->
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {FLASH_DEALS_LIST} from "@/core/services/store/module/flash_deals";
import {mapGetters} from "vuex";
import {api_base_url} from "@/core/config/app";
import Timer from "@/components/helper/Timer";

export default {
  name: "FlashDeal",
  data() {
    return {
      flash_details: [],
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadFlash() {
      if (this.flash_dealList.length > 0) {
        let flash = this.getFlashDealBySlug(this.$route.params.slug);
        if (flash) {
          this.flash_details = flash;
        } else this.$router.push({name: "error"});
      }
    }
  },
  created() {
    this.flash_dealList.length < 1 ? this.$store.dispatch(FLASH_DEALS_LIST) : '';
    this.loadFlash();
  },
  computed: {
    ...mapGetters(["flash_dealList", "getFlashDealBySlug"])
  },
  watch: {
    flash_dealList() {
      this.loadFlash();
    }
  },
  components: {Timer}
}
</script>

<style scoped>
.weekly-deals >>> span {
  color: yellow;
  padding: 4px;
  background-color: red;
  border-radius: 3px;
}
</style>