<template>
  <div class="content pr-md-5">
    <div class="animated fadeIn">
      <!-- Page Header -->
      <div class="row mb-3">
        <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Product
        </span>
          <h3 class="page-title">Product List</h3>
        </div>
      </div>
      <!-- End Page Header -->

      <div class="row">
        <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="(products, index) in product" :key="index">
          <section class="card">
            <div class="corner-ribon black-ribon">
              <div class="dropdown">
                <span type="button" style="font-size: 12px"
                      data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                  <i class="fas fa-bars" style="color: #333"></i>
                </span>
                <div class="dropdown-menu" style="font-size: 12px" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">View Details</a>
                  <a class="dropdown-item" href="#">Product Edit</a>
                  <a class="dropdown-item" href="#">Product Delete</a>
                </div>
              </div>
            </div>
            <img class="card-img-top" :src="showImage(products.thumbnail_img)" alt="Card image cap">
            <h4>{{products.name}}</h4>
            <p class="mb-0" style="font-size: 12px">SKU: {{products.sku}}</p>
            <div class="weather-category twt-category">
              <ul>
                <li class="active">
                  <h5>0</h5>
                  Order
                </li>
                <li>
                  <h5>0</h5>
                  Sales
                </li>
                <li class="border-right-0">
                  <h5>0</h5>
                  Return
                </li>
              </ul>
            </div>
            <footer class="twt-footer">

            </footer>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {api_base_url} from "@/core/config/app";
import ApiService from "@/core/services/api.service";

export default {
  name: "ProductList",
  data() {
    return {
      product: {},
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadData() {
      ApiService.get('user/product')
          .then(({data}) => {
            this.product = data;
          })
          .catch(({response}) => {
            swal.fire("Failed!", 'There was something wrong.', 'warning');
          });
    },
  },
  created() {
    this.loadData();
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/dashboard/index';

.dropdown-menu:focus {
  outline: 0 !important;
}
</style>
