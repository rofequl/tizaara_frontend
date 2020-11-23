<template>
  <div class="weekly-market-wrapper newsletter-wrapper">
    <div class="container-fluid">
      <div class="row">
        <h2 class="page-title"><a href=""><img src="@/assets/image/rfq.png" class="img-fluid" width="40" alt=""> request
          for quotation</a>
        </h2>
      </div>
      <div class="row">
        <div class="col-sm-5">
          <div class="custom-feature-grid request-quotation">
            <h4>Global Sourcing Marketplace</h4>
            <div class="banner-number">
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">1107000 +</span>
                </div>
                <span>RFQs</span>
              </div>
              <div class="number-item">
                <div class="item-total" style="font-weight: 500;"> &lt;17h</div>
                <span>Avg Quotation Duration</span>
              </div>
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">139000 +</span>
                </div>
                <span>Active Suppliers</span>
              </div>
              <div class="number-item">
                <div class="item-total">
                  <span style="transition: all 0.8s ease-out 0s; font-size: 24px;font-weight: 500;">5234 </span>
                </div>
                <span>Industries</span>
              </div>
            </div>
            <a href="" class="btn-more" style="background: transparent;border: 1px solid #f23a3a;">Learn More</a>
          </div>
        </div>
        <div class="col-sm-7">
          <div class="card-wrapper">
            <div class="card request-form">
              <div class="card-body">
                <h3>One Request, Multiple Quotes</h3>
                <form @submit.prevent="submit" @keydown="form.onKeydown($event)">
                  <div class="form-group">
                    <b-form-input type="text" class="form-control" id="product" v-model="$v.form.product.$model"
                                  placeholder="Enter Product / Service name"
                                  :state="validateState('product')"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.product.required">
                      You can't leave this empty.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.product.maxLength">
                      Maximum 255 character.
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group">
                    <b-form-input type="email" class="form-control" v-model="$v.form.email.$model" id="email"
                                  aria-describedby="emailHelp" placeholder="Enter your email address"
                                  :state="validateState('email')"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.form.email.required">
                      You can't leave this empty.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.email.email">
                      Input type not email.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.form.email.maxLength">
                      Maximum 100 character.
                    </b-form-invalid-feedback>
                    <small id="emailHelp" class="form-text text-muted text-left">We'll never share your email with
                      anyone else.</small>
                  </div>
                  <div class="form-row mb-4">
                    <div class="form-group col-md-6">
                      <b-form-input type="number" class="form-control" placeholder="Quantity"
                                    v-model="$v.form.quantity.$model"
                                    id="quantity" :state="validateState('quantity')"></b-form-input>
                      <b-form-invalid-feedback v-if="!$v.form.quantity.maxLength">
                        Maximum 10 character.
                      </b-form-invalid-feedback>
                    </div>
                    <div class="form-group col-md-6">
                      <b-form-select v-model="form.unit" :options="Object.values(unitList)"
                                     size="sm" text-field="name" value-field="id" id="country">
                        <template v-slot:first>
                          <b-form-select-option value="" disabled>Select Units</b-form-select-option>
                        </template>
                      </b-form-select>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-main">Request For Quotation</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {maxLength, required, email} from "vuelidate/lib/validators";
import {validationMixin} from "vuelidate";
import {mapGetters} from "vuex";
import {UNIT_LIST} from "@/core/services/store/module/unit";

export default {
  mixins: [validationMixin],
  name: "quotation",
  data() {
    return {
      form: new Form({
        product: '',
        email: '',
        quantity: '',
        unit: '',
      }),
    }
  },
  validations: {
    form: {
      product: {
        required,
        maxLength: maxLength(255)
      },
      email: {
        required,
        email,
        maxLength: maxLength(100)
      },
      quantity: {
        maxLength: maxLength(10)
      }
    }
  },
  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.form.post('quotation')
          .then(() => {
            this.$v.$reset();
            this.form.reset();
            toast.fire({
              icon: 'success',
              title: 'Quotation send successfully'
            });
          })
          .catch(() => {
            swal.fire("Failed!", 'There was something wrong.', 'warning')
          });
    }
  },
  created() {
    this.$store.dispatch(UNIT_LIST)
  },
  computed: {
    ...mapGetters(["unitList"]),
  }
}
</script>

<style scoped>

</style>