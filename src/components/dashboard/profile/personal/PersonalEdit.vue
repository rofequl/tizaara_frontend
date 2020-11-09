<template>
  <div class="card-body">
    <div class="container">
      <b-form @submit.prevent="submit" @keydown="form.onKeydown($event)">
        <div class="row p-2">
          <div class="col-md-4">
            <image-uploader :image="form.photo" @update-parent="updateParent"></image-uploader>
            <input type="hidden" :class="{ 'is-invalid': form.errors.has('image') }">
          </div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-6 my-2">
                <b-form-group id="input-group-1" label="First name :" label-for="first_name">
                  <b-form-input
                      id="first_name" size="sm"
                      v-model="$v.form.first_name.$model" :state="validateState('first_name')"
                      placeholder="Enter your first name."
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.first_name.required">
                    First name required.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.first_name.maxLength">
                    First name maximum 255 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-md-6 my-2">
                <b-form-group id="input-group-2" label="Last name :" label-for="last_name">
                  <b-form-input
                      id="last_name" size="sm"
                      v-model="$v.form.last_name.$model" :state="validateState('last_name')"
                      placeholder="Enter your last name."
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.last_name.required">
                    Last name required.
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.form.last_name.maxLength">
                    Last name maximum 255 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-md-6 my-2">
                <b-form-group id="input-group-3" label="Job Title:" label-for="job_title">
                  <b-form-input
                      id="job_title" size="sm"
                      v-model="$v.form.job_title.$model" :state="validateState('job_title')"
                      placeholder="Enter your job title."
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.job_title.maxLength">
                    job title maximum 255 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-md-6 my-2">
                <b-form-group id="input-group-4" label="Telephone No:" label-for="telephone_no">
                  <b-form-input
                      id="telephone_no" size="sm"
                      v-model="$v.form.telephone_no.$model" :state="validateState('telephone_no')"
                      placeholder="Enter your telephone no."
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.telephone_no.maxLength">
                    Telephone No maximum 15 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <div class="row p-2">
          <div class="col-md-6 my-2">
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
          <div class="col-md-6 my-2">
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
          <div class="col-md-6 my-2">
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
          <div class="col-md-6 my-2">
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
          <div class="col-md-6 my-2">
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
          <div class="col-md-6 my-2">
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
import {required, maxLength} from "vuelidate/lib/validators";
import ImageUploader from "../../../helper/ImageUploader";
import {mapGetters} from "vuex";
import {api_base_url} from "@/core/config/app";
import {PERSONAL_LIST} from "@/core/services/store/module/personal";

export default {
  name: "PersonalEdit",
  mixins: [validationMixin],
  data() {
    return {
      form: new Form({
        photo: '',
        first_name: '',
        last_name: '',
        job_title: '',
        telephone_no: '',
        country: '',
        division: '',
        city: '',
        area: '',
        address: '',
        zip_code: '',
      }),
      divisionList: [],
      cityList: [],
      areaList: [],
    }
  },
  validations: {
    form: {
      first_name: {
        required,
        maxLength: maxLength(255)
      },
      last_name: {
        required,
        maxLength: maxLength(255)
      },
      job_title: {
        maxLength: maxLength(255)
      },
      telephone_no: {
        maxLength: maxLength(15)
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
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    loadPersonalInfo() {
      if (this.personalInfo.status === "old") {
        this.form.country = this.personalInfo.country;
        this.countrySelect(this.personalInfo.country);
        this.form.division = this.personalInfo.division;
        this.divisionSelect(this.personalInfo.division);
        this.form.city = this.personalInfo.city;
        this.citySelect(this.personalInfo.city);
        this.form.area = this.personalInfo.area;
        this.form.address = this.personalInfo.address;
        this.form.zip_code = this.personalInfo.zip_code;
      }
      this.form.first_name = this.personalInfo.first_name;
      this.form.last_name = this.personalInfo.last_name;
      this.form.job_title = this.personalInfo.job_title;
      this.form.telephone_no = this.personalInfo.telephone;
      this.personalInfo.photo_type == 0 ? this.form.photo = this.showImage(this.personalInfo.photo) : this.form.photo = this.personalInfo.photo;
    },
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    updateParent(variable) {
      this.form.photo = variable;
    },
    countrySelect(e) {
      this.form.division = '';
      this.form.city = '';
      this.form.area = '';
      this.cityList = [];
      this.areaList = [];
      this.divisionList = this.getDivisionById(e);
    },
    divisionSelect(e) {
      this.form.city = '';
      this.form.area = '';
      this.areaList = [];
      this.cityList = this.getCityById(e);
    },
    citySelect(e) {
      this.form.area = '';
      this.areaList = this.getAreaById(e);
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.form.post('personal')
          .then(({data}) => {
            this.$store.dispatch(PERSONAL_LIST);
            this.$emit('view');
          })
    }
  },
  components: {ImageUploader},
  created() {
    this.loadPersonalInfo();
  },
  computed: {
    ...mapGetters(["countryList", "getDivisionById", "getCityById", "getAreaById"]),
    personalInfo() {
      return this.$store.getters.personalInfo;
    },
  }
}
</script>

<style scoped>

</style>