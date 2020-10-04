<template>
  <div class="content pr-5">
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
        <div class="col-md-3">
          <section class="card" >
            <div class="corner-ribon black-ribon">
              <div class="dropdown">
                <span type="button" style="font-size: 12px"
                      data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                  <i class="fas fa-bars"></i>
                </span>
                <div class="dropdown-menu" style="font-size: 12px" aria-labelledby="dropdownMenuButton">
                  <a class="dropdown-item" href="#">View Details</a>
                  <a class="dropdown-item" href="#">Product Edit</a>
                  <a class="dropdown-item" href="#">Product Delete</a>
                </div>
              </div>
            </div>
            <img class="card-img-top" src="https://i.imgur.com/ue0AB6J.png" alt="Card image cap">
            <h4>Wheat Flour, Packaging: Bag</h4>
            <p class="mb-0" style="font-size: 12px">SKU: JDFJT656GD6FHGDF</p>
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
      projects: {},
    }
  },
  methods: {
    getProfilePhoto(e) {
      return api_base_url + e;
    },
    loadData() {
      ApiService.get('user/product')
          .then(({data}) => {
            this.loadActive = false;
            let response = data.data;
            if (this.tableData.draw == data.draw) {
              this.projects = response;
              this.serial_no = response.from;
            }
          })
          .catch(({response}) => {

          });
    },
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/dashboard/index';

.dropdown-menu:focus {
  outline: 0 !important;
}
</style>
