<template>
  <div class="content pr-md-5">
    <!-- Page Header -->
    <div class="row mb-3">
      <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Product
        </span>
        <h3 class="page-title">Product List</h3>
      </div>
      <div class="col-12 col-sm-6 d-flex align-items-center">
        <div class="mx-auto ml-sm-auto mr-sm-0">
          <b-button variant="success"
                    @click="$router.push({name: 'product-request', params: { type: 'flash-deal' }})"
                    size="sm" class="text-white mr-2">Flash Deal Request</b-button>
          <b-button variant="success"
                    @click="$router.push({name: 'product-request', params: { type: 'ecommerce-zone' }})" size="sm"
                    class="text-white">Ecommerce Zone Request
          </b-button>
        </div>
      </div>
    </div>
    <hr>
    <!-- End Page Header -->

    <div class="row">
      <div class="col">
        <b-form-select class="mb-3">
          <b-form-select-option selected disabled>Select Category</b-form-select-option>
        </b-form-select>
      </div>
      <div class="col">
        <b-form inline>
          <label class="mr-sm-2" for="inline-form-custom-select-pref">Sort By</label>
          <b-form-select id="inline-form-custom-select-pref"
                         class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-select-option selected disabled>Select sort by</b-form-select-option>
            <b-form-select-option :value="null">Price - high to low</b-form-select-option>
            <b-form-select-option :value="null">Price - low to high</b-form-select-option>
            <b-form-select-option :value="null">Old items</b-form-select-option>
          </b-form-select>
        </b-form>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-6 col-12" v-for="(products, index) in product" :key="index">
        <section class="card" style="padding: 5px">
          <div class="corner-ribon black-ribon">
            <div class="dropdown">
                <span type="button" style="font-size: 12px"
                      data-toggle="dropdown" aria-haspopup="true"
                      aria-expanded="false">
                  <i class="fas fa-bars" style="color: #333"></i>
                </span>
              <div class="dropdown-menu dropdown-menu-right" style="font-size: 12px">
                <a class="dropdown-item" href="#">View Details</a>
                <a class="dropdown-item" href="Request-Flash-Deal" @click.prevent="addFlashDeal(products.id)">Request
                  Flash Deal</a>
                <a class="dropdown-item" href="Ecommerce-Zone" @click.prevent="addEcommerceZone(products.id)">Request
                  Ecommerce Zone</a>
                <a class="dropdown-item" href="#">Product Edit</a>
                <a class="dropdown-item" href="#">Product Delete</a>
              </div>
            </div>
          </div>
          <img class="card-img-top border" :src="showImage(products.thumbnail_img)" alt="Card image cap"
               height="150px">
          <h4 style="font-size: 12px">{{ products.name }}</h4>
          <p class="mb-0" style="font-size: 10px">SKU: {{ products.sku }}</p>
          <hr class="my-1">
          <div class="weather-category twt-category mt-0 pt-0">
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
        </section>
      </div>
    </div>

    <!-- Modal -->
    <b-modal id="brandModal" title="Please enter product discount" hide-footer>
      <b-form @submit.prevent="submit()">
        <b-row class="my-3">
          <b-col sm="8">
            <b-form-input id="input-small" size="sm" placeholder="Enter product discount" type="number"
                          v-model="$v.form.discount.$model" :state="validateState('discount')" min="0"
                          aria-describedby="input-1-live-feedback">
            </b-form-input>
            <b-form-invalid-feedback v-if="!$v.form.discount.required">
              Product discount required.
            </b-form-invalid-feedback>
            <b-form-invalid-feedback v-if="!$v.form.discount.maxLength">
              Product discount maximum 5 character.
            </b-form-invalid-feedback>
          </b-col>
          <b-col sm="4">
            <b-form-select v-model="form.discount_type" size="sm">
              <b-form-select-option value="flat">Flat</b-form-select-option>
              <b-form-select-option value="percent">Percent</b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="my-3 justify-content-end">
          <b-col cols="8" sm="6" md="4" class="mb-3 mb-xl-0">
            <b-button variant="primary"
                      type="submit" size="sm"
                      class="text-white">Submit
            </b-button>

            <b-button variant="secondary"
                      type="button" size="sm" @click="$bvModal.hide('brandModal')"
                      class="text-white float-right">Close
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
    <!-- End Modal -->

  </div>
</template>

<script>
import {api_base_url} from "@/core/config/app";
import ApiService from "@/core/services/api.service";
import {PRODUCT_REQUEST} from "@/core/services/store/module/product_request";
import {validationMixin} from "vuelidate";
import {maxLength, required} from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  name: "ProductList",
  data() {
    return {
      form: {
        'product_id': '',
        'discount': '',
        'discount_type': 'flat',
      },
      product: {},
    }
  },
  validations: {
    form: {
      discount: {
        required,
        maxLength: maxLength(5)
      },
    }
  },
  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
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
    addEcommerceZone(id) {
      const product_id = id;
      const user_id = this.$store.getters.currentUser.id;
      const request_type = 1;
      this.$store.dispatch(PRODUCT_REQUEST, {product_id, user_id, request_type})
          .then(() => toast.fire({
            icon: 'success',
            title: 'Product Add Ecommerce Zone'
          }))
          .catch((data) => console.log(data));
    },
    addFlashDeal(id) {
      this.form.product_id = id;
      this.$bvModal.show('brandModal');
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const product_id = this.form.product_id;
      const discount = this.form.discount;
      const discount_type = this.form.discount_type;
      const user_id = this.$store.getters.currentUser.id;
      const request_type = 2;
      this.$bvModal.hide('brandModal');
      this.$store.dispatch(PRODUCT_REQUEST, {product_id, user_id, request_type, discount, discount_type})
          .then(() => toast.fire({
            icon: 'success',
            title: 'Product Add Flash Deal'
          }))
          .catch((data) => console.log(data));
    }
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
