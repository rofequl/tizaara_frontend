<template>
  <div>
    <div v-for="(flash, k) in flash_dealList" class="weekly-market-wrapper" :key="k">
      <div class="container-fluid">
        <div class="row">
          <h2 class="page-title"><a href="">{{ flash.name }}</a></h2>
        </div>
        <div class="row">
          <div class="col-sm-2">
            <div class="custom-feature-grid weekly-deals">
              <p>Deals end in:</p>
              <Timer
                  :starttime="new Date().getTime()"
                  :endtime="flash.end_date"
                  trans='{"status": {}}'></Timer>
              <router-link :to="'flash-deal/'+flash.slug" class="btn-more">View More</router-link>
            </div>
          </div>
          <div v-for="(product, i) in flash.product" class="col-sm-2" :key="i">
            <div class="card-wrapper">
              <a href="">
                <div class="card" style="">
                  <img class="card-img-top img-fluid zoom-in" v-lazy="showImage(product.thumbnail_img)"
                       alt="Card image cap">
                  <div class="card-body">
                    <p class="card-text price">৳ {{ product.price }}</p>
                    <p class="discount"><span>৳ {{ product.discount_price }}</span> <span
                        class="badge badge-pill badge-warning">-{{ product.discount }} {{product.discount_type === 'percent'?'%':'৳'}}</span></p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {FLASH_DEALS_LIST} from "@/core/services/store/module/flash_deals";
import {api_base_url} from "@/core/config/app";
import Timer from "@/components/helper/Timer";

export default {
  name: "Deal",
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
  },
  created() {
    this.flash_dealList.length < 1 ? this.$store.dispatch(FLASH_DEALS_LIST) : '';
  },
  computed: {
    ...mapGetters(["flash_dealList"])
  },
  components: {Timer}
}
</script>

<style scoped>

</style>
