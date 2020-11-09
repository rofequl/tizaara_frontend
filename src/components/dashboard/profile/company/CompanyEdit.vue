<template>
  <div class="card-body">
    <div class="container">
      <b-form @submit.prevent="submit" @keydown="form.onKeydown($event)">
        <div class="row border-bottom">
          <div class="col-12 my-3">
            <b-form-group id="input-group-1" label="Company Name* :" label-for="name">
              <b-form-input
                  id="first_name"
                  v-model="$v.form.name.$model" :state="validateState('name')"
                  placeholder="Enter your Company Name."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.name.required">
                Company name required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.name.maxLength">
                Company name maximum 150 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 my-3">
            <b-form-group id="input-group-2" label="Choose your unique business display name :"
                          label-for="display_name">
              <b-form-input
                  id="display_name"
                  v-model="$v.form.display_name.$model" :state="validateState('display_name')"
                  placeholder="Enter your display name."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.display_name.maxLength">
                Company name maximum 150 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <div class="form-group">
              <label for="example-datepicker">Year of Establishment : </label>
              <VueDatePicker v-model="form.establishment_date" placeholder="Choose your date of birth" no-header
                             :visible-years-number="50" class="form-control"
                             max-date="2019-31-31"/>
            </div>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-4" label="Office Size :" label-for="office_space">
              <b-form-input
                  id="office_space"
                  v-model="$v.form.office_space.$model" :state="validateState('office_space')"
                  placeholder="Enter your office size."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.office_space.maxLength">
                office size maximum 255 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <h6 class="mx-1 mt-2">Register Address</h6>
        <div class="row">
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-5" label="Select Country :" label-for="country">
              <b-form-select v-model="$v.form.country.$model" :options="Object.values(countryList)"
                             :state="validateState('country')" value-field="id" size="sm"
                             text-field="name" id="country" @input="countrySelect">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select Country --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.country.required">
                Country required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-6" label="Select Division :" label-for="division">
              <b-form-select v-model="$v.form.division.$model" :options="divisionList"
                             :state="validateState('division')" value-field="id" size="sm"
                             text-field="name" id="division" @input="divisionSelect">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your division --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.division.required">
                Division required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-7" label="Select City :" label-for="city">
              <b-form-select v-model="$v.form.city.$model" :options="cityList"
                             :state="validateState('city')" value-field="id" size="sm"
                             text-field="name" id="city" @input="citySelect">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your city --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.city.required">
                City required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-8" label="Select Area :" label-for="area">
              <b-form-select v-model="form.area" :options="areaList"
                             value-field="id" size="sm"
                             text-field="name" id="area">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your area --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-9" label="Address :" label-for="address">
              <b-form-textarea
                  id="address" size="sm"
                  placeholder="For Example: House# 123, Street# 123, ABC Road"
                  rows="1" v-model="$v.form.address.$model"
                  :state="validateState('address')"
              ></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form.address.required">
                You can't leave this empty.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.address.maxLength">
                Maximum 255 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-10" label="Zip code :" label-for="zip_code">
              <b-form-input
                  id="zip_code" size="sm" type="number"
                  placeholder="Enter your zip code"
                  v-model="$v.form.zip_code.$model"
                  :state="validateState('zip_code')"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.zip_code.maxLength">
                Maximum 10 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <h6 class="mx-1 mt-2">Operation Address</h6>
        <div class="row">
          <div class="col">
            <b-form-checkbox
                id="checkbox-1"
                v-model="form.address_type"
                name="checkbox-1"
                value="1" class="float-right"
                unchecked-value="2">
              Same as register address
            </b-form-checkbox>
          </div>
        </div>
        <div class="row border-bottom">
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-11" label="Select Country :" label-for="country2">
              <b-form-select v-model="$v.form.country2.$model" :options="Object.values(countryList)"
                             value-field="id" size="sm" :state="validateState('country2')"
                             text-field="name" id="country2" @input="countrySelect2" :disabled="form.address_type == 1">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select Country --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.country2.isUnique">
                Country required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-12" label="Select Division :" label-for="division2">
              <b-form-select v-model="$v.form.division2.$model" :options="divisionList2"
                             value-field="id" size="sm" :state="validateState('division2')"
                             text-field="name" id="division2" @input="divisionSelect2"
                             :disabled="form.address_type == 1">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your division --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.division2.isUnique">
                Division required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-13" label="Select City :" label-for="city2">
              <b-form-select v-model="$v.form.city2.$model" :options="cityList2" :disabled="form.address_type == 1"
                             value-field="id" size="sm" :state="validateState('city2')"
                             text-field="name" id="city2" @input="citySelect2">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your city --</b-form-select-option>
                </template>
              </b-form-select>
              <b-form-invalid-feedback v-if="!$v.form.city2.isUnique">
                City required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-14" label="Select Area :" label-for="area">
              <b-form-select v-model="form.area" :options="areaList2"
                             value-field="id" size="sm" :disabled="form.address_type == 1"
                             text-field="name" id="area">
                <template v-slot:first>
                  <b-form-select-option value="" disabled>-- Select your area --</b-form-select-option>
                </template>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-15" label="Address :" label-for="address2">
              <b-form-textarea
                  id="address2" size="sm" :state="validateState('address2')"
                  placeholder="For Example: House# 123, Street# 123, ABC Road"
                  rows="1" v-model="$v.form.address2.$model" :disabled="form.address_type == 1"
              ></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form.address2.isUnique">
                Address required.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-md-6 my-3">
            <b-form-group id="input-group-16" label="Zip code :" label-for="zip_code2">
              <b-form-input
                  id="zip_code2" size="sm" type="number" :state="validateState('zip_code2')"
                  placeholder="Enter your zip code" :disabled="form.address_type == 1"
                  v-model="$v.form.zip_code2.$model"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.zip_code2.maxLength">
                Maximum 10 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <div class="row border-bottom">
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-17" label="Company Website :" label-for="website">
              <b-form-input
                  id="website" type="url"
                  v-model="$v.form.website.$model" :state="validateState('website')"
                  placeholder="www.company.com"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.website.maxLength">
                Company website maximum 255 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-26" label="Company Email* :" label-for="email">
              <b-form-input
                  id="email" type="email"
                  v-model="$v.form.email.$model" :state="validateState('email')"
                  placeholder="xyz@gmail.com"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.email.required">
                Company email required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.email.email">
                Enter valid email.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.email.maxLength">
                Company email maximum 150 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-18" label="Company Phone Number* :" label-for="phone">
              <b-form-input
                  id="phone" type="number"
                  v-model="$v.form.phone.$model" :state="validateState('phone')"
                  placeholder="019XXXXXXXX"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.phone.required">
                Company phone number required.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.phone.maxLength">
                Company p hone number maximum 15 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-19" label="Company Cell :" label-for="cell">
              <b-form-input
                  id="cell" type="number"
                  v-model="$v.form.cell.$model" :state="validateState('cell')"
                  placeholder="01923456789"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.cell.maxLength">
                Company cell maximum 15 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-20" label="Company Fax :" label-for="fax">
              <b-form-input
                  id="fax" type="number"
                  v-model="$v.form.fax.$model" :state="validateState('fax')"
                  placeholder="01923456789"
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.fax.maxLength">
                Company fax maximum 15 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-21" label="Number of Employee :" label-for="number_of_employee">
              <b-form-select id="number_of_employee" v-model="form.number_of_employee" :options="employeeList"
                             size="sm"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-22" label="Ownership types :" label-for="ownership_type">
              <b-form-select id="ownership_type" v-model="form.ownership_type" :options="ownerList"
                             size="sm"></b-form-select>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 my-3">
            <b-form-group id="input-group-23" label="Annual revenue :" label-for="ownership_type">
              <b-form-select id="ownership_type" v-model="form.revenue" :options="revenueList"
                             size="sm"></b-form-select>
            </b-form-group>
          </div>
        </div>
        <h6 class="mx-1 mt-2">Company Products</h6>
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <b-form-group id="input-group-24" label="Company Main product :" label-for="main_product">
              <b-form-input
                  id="main_product"
                  v-model="$v.form.main_product.$model" :state="validateState('main_product')"
                  placeholder="Phone, Laptop, Computer...."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.main_product.maxLength">
                Maximum 255 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-6 mb-3">
            <b-form-group id="input-group-24" label="Company others product :" label-for="other_product">
              <b-form-input
                  id="main_product"
                  v-model="$v.form.other_product.$model" :state="validateState('other_product')"
                  placeholder="Ram. Processor, Memory....."
              ></b-form-input>
              <b-form-invalid-feedback v-if="!$v.form.other_product.maxLength">
                Maximum 255 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </div>
        <b-row class="justify-content-end">
          <b-col cols="12" sm="8" md="6" lg="4" class="my-4">
            <b-button type="button" @click="$emit('view')" class="mr-2" variant="info">Cancel</b-button>
            <b-button type="submit" variant="success">Update</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, maxLength, email} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";
import {COMPANY_BASIC_LIST} from "@/core/services/store/module/companybasic";

export default {
  mixins: [validationMixin],
  name: "CompanyEdit",
  data() {
    return {
      form: new Form({
        name: '',
        display_name: '',
        establishment_date: new Date(),
        office_space: '',
        website: '',
        email: '',
        phone: '',
        cell: '',
        fax: '',
        number_of_employee: '',
        ownership_type: '',
        revenue: '',
        main_product: '',
        other_product: '',
        address_type: 2,
        country: '',
        division: '',
        city: '',
        area: '',
        address: '',
        zip_code: '',
        country2: '',
        division2: '',
        city2: '',
        area2: '',
        address2: '',
        zip_code2: '',
      }),
      divisionList: [],
      cityList: [],
      areaList: [],
      divisionList2: [],
      cityList2: [],
      areaList2: [],
      employeeList: [
        {value: '', text: 'Please select', disabled: true},
        {value: '1', text: '1 - 5'},
        {value: '2', text: '5 - 10'},
        {value: '3', text: '1 - 100'}
      ],
      ownerList: [
        {value: '', text: 'Please select', disabled: true},
        {value: 'Public', text: 'Public'},
        {value: 'Private', text: 'Private'},
      ],
      revenueList: [
        {value: '', text: 'Please select', disabled: true},
        {value: '1', text: '1,00,000 - 5,00,000'},
        {value: '2', text: '5,00,000 - 10,00,000'},
      ],
    }
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(150)
      },
      display_name: {
        maxLength: maxLength(150)
      },
      office_space: {
        maxLength: maxLength(255)
      },
      country: {
        required
      },
      division: {
        required
      },
      city: {
        required
      },
      address: {
        required,
        maxLength: maxLength(255)
      },
      zip_code: {
        maxLength: maxLength(10)
      },
      website: {
        maxLength: maxLength(150)
      },
      email: {
        email,
        required,
        maxLength: maxLength(150)
      },
      phone: {
        required,
        maxLength: maxLength(15)
      },
      cell: {
        maxLength: maxLength(15)
      },
      fax: {
        maxLength: maxLength(15)
      },
      main_product: {
        maxLength: maxLength(255)
      },
      other_product: {
        maxLength: maxLength(255)
      },
      country2: {
        isUnique() {
          if (this.form.address_type == 1) return true
          return this.form.country2 !== '';
        }
      },
      division2: {
        isUnique() {
          if (this.form.address_type == 1) return true
          return this.form.division2 !== '';

        }
      },
      city2: {
        isUnique() {
          if (this.form.address_type == 1) return true
          return this.form.city2 !== '';

        }
      },
      address2: {
        isUnique() {
          if (this.form.address_type == 1) return true
          return this.form.address2 !== '';

        },
        maxLength: maxLength(255)
      },
      zip_code2: {
        maxLength: maxLength(10)
      },
    }
  },
  methods: {
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    loadInfo(value) {
      if (value.result === 'Success') {
        this.form.fill(value.company)
        this.divisionList = this.getDivisionById(value.company.country);
        this.cityList = this.getCityById(value.company.division);
        this.areaList = this.getAreaById(value.company.city);
        if (value.company.address_type == 2) {
          this.divisionList2 = this.getDivisionById(value.company.country2);
          this.cityList2 = this.getCityById(value.company.division2);
          this.areaList2 = this.getAreaById(value.company.city2);
        }
      }
    },
    countrySelect(e) {
      this.form.division = '';
      this.form.city = '';
      this.form.area = '';
      this.cityList = [];
      this.areaList = [];
      this.divisionList = this.getDivisionById(e);
    },
    countrySelect2(e) {
      this.form.division2 = '';
      this.form.city2 = '';
      this.form.area2 = '';
      this.cityList2 = [];
      this.areaList2 = [];
      this.divisionList2 = this.getDivisionById(e);
    },
    divisionSelect(e) {
      this.form.city = '';
      this.form.area = '';
      this.areaList = [];
      this.cityList = this.getCityById(e);
    },
    divisionSelect2(e) {
      this.form.city2 = '';
      this.form.area2 = '';
      this.areaList2 = [];
      this.cityList2 = this.getCityById(e);
    },
    citySelect(e) {
      this.form.area = '';
      this.areaList = this.getAreaById(e);
    },
    citySelect2(e) {
      this.form.area2 = '';
      this.areaList2 = this.getAreaById(e);
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.form.post('factory')
          .then(({data}) => {
            this.$store.dispatch(COMPANY_BASIC_LIST)
            this.$emit('view');
          })

    }
  },
  computed: {
    ...mapGetters(["companyBasicInfo", "countryList", "getDivisionById", "getCityById", "getAreaById"]),
  },
  watch: {
    'companyBasicInfo': {
      handler(value) {
        this.loadInfo(value);
      },
      immediate: true
    },
  }
}
</script>

<style scoped>

</style>