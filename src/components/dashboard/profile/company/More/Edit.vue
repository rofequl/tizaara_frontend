<template>
  <div class="card-body">
    <div class="container">
      <b-form @submit.prevent="submit" @keydown="form.onKeydown($event)">
        <div class="row p-2">
          <div class="col-12 col-md-4 my-3">
            <label>Company Logo :</label>
            <image-uploader :image="form.company_logo" @update-parent="updateParent"></image-uploader>
            <input type="hidden" :class="{ 'is-invalid': form.errors.has('company_logo') }">
          </div>
          <div class="col-12 col-md-8 my-3">
            <b-form-group id="input-group-2" label="About Us (Max 4000 Characters)* :" label-for="about_us">
              <b-form-textarea
                  id="about_us" size="sm"
                  rows="5" v-model="$v.form.about_us.$model"
                  :state="validateState('about_us')"
              ></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form.about_us.required">
                You can't leave this empty.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.about_us.maxLength">
                About Us Maximum 4000 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 my-3">
            <b-form-group id="input-group-3" label="Mission* :" label-for="mission">
              <b-form-textarea
                  id="mission" size="sm"
                  rows="4" v-model="$v.form.mission.$model"
                  :state="validateState('mission')"
              ></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form.mission.required">
                You can't leave this empty.
              </b-form-invalid-feedback>
              <b-form-invalid-feedback v-if="!$v.form.mission.maxLength">
                Maximum 4000 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 my-3">
            <b-form-group id="input-group-4" label="Vision :" label-for="vision">
              <b-form-textarea
                  id="vision" size="sm"
                  rows="4" v-model="$v.form.vision.$model"
                  :state="validateState('vision')"
              ></b-form-textarea>
              <b-form-invalid-feedback v-if="!$v.form.vision.maxLength">
                Maximum 4000 character.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
          <div class="col-12 col-md-4 my-3">
            <div class=""><label>Company Photos :</label>
              <vue-upload-multiple-image
                  @before-remove="(index, done, fileList) =>{ done(); form.company_photos = fileList}"
                  @upload-success="(formData, index, fileList) =>{ form.company_photos = fileList}"
                  @edit-image="(formData, index, fileList) =>{ form.company_photos = fileList}"
                  :data-images="company_photos" popupText="Product image, you can add only 9 image"
                  idUpload="myIdUpload" editUpload="myIdEdit" idEdit="myIdEdited"
                  dragText="Drag images (many)." browseText="Select multiple image"
                  primaryText="Product Image" accept="image/jpeg,image/png,image/bmp,image/jpg"
                  :maxImage="9" markIsPrimaryText=""
              ></vue-upload-multiple-image>
            </div>
          </div>
          <div class="col-12 col-md-8 my-3">
            <div class="row">
              <div class="col-12 my-2">
                <b-form-group id="input-group-7" label="Company Video :" label-for="company_video">
                  <b-form-input type="url"
                                id="company_video" size="sm" :state="validateState('company_video')"
                                v-model="$v.form.company_video.$model"
                                placeholder="Youtube link paste here"
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.company_video.maxLength">
                    Maximum 150 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
              <div class="col-12 my-2">
                <b-form-group id="input-group-8" label="Facebook Page :" label-for="facebook_url">
                  <b-form-input type="url"
                                id="facebook_url" size="sm" :state="validateState('facebook_url')"
                                v-model="$v.form.facebook_url.$model"
                                placeholder="Facebook page url"
                  ></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.form.facebook_url.maxLength">
                    Maximum 150 character.
                  </b-form-invalid-feedback>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
        <b-row class="justify-content-end">
          <b-col cols="12" sm="8" md="6" lg="4" class="my-4">
            <b-button type="button" @click="$emit('view')" class="mr-2" variant="info">Cancel</b-button>
            <b-button :disabled="form.busy" type="submit" variant="success">
              <span v-if="form.busy" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              Update
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate";
import {required, maxLength} from "vuelidate/lib/validators";
import ImageUploader from "@/components/helper/ImageUploader";
import {api_base_url} from "@/core/config/app";
import VueUploadMultipleImage from 'vue-upload-multiple-image'
import {mapGetters} from "vuex";
import {COMPANY_BASIC_LIST} from "@/core/services/store/module/companybasic";

export default {
  mixins: [validationMixin],
  name: "Edit",
  data() {
    return {
      form: new Form({
        company_logo: '',
        about_us: '',
        mission: '',
        vision: '',
        company_photos: [],
        company_video: '',
        facebook_url: '',
      }),
      company_photos: [],
    }
  },
  validations: {
    form: {
      about_us: {
        required,
        maxLength: maxLength(4000)
      },
      mission: {
        required,
        maxLength: maxLength(4000)
      },
      vision: {
        maxLength: maxLength(4000)
      },
      company_video: {
        maxLength: maxLength(150)
      },
      facebook_url: {
        maxLength: maxLength(150)
      },
    },
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    validateState(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    updateParent(variable) {
      this.form.company_logo = variable;
    },
    loadInfo(value) {
      if (value.company_details != null && value.company_details !== '' && !$.isEmptyObject(value.company_details)) {
        this.form.fill(value.company_details);
        this.form.company_logo = this.showImage(value.company_details.company_logo);
        this.company_photos = [];
        this.form.company_photos = [];
        let photos = JSON.parse(value.company_details.company_photos);
        for (let i = 0; i < photos.length; i++) {
          this.company_photos.push({
            path: this.showImage(photos[i]),
            default: 1,
            highlight: 1,
            caption: 'caption to display. receive',
          });
          this.form.company_photos.push({
            path: this.showImage(photos[i]),
            default: 1,
            highlight: 1,
            caption: 'caption to display. receive',
          });
        }
      }
    },
    submit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      this.form.post('factory-details')
          .then(({data}) => {
            this.$store.dispatch(COMPANY_BASIC_LIST)
            this.$emit('view');
          })

    }
  },
  components: {ImageUploader, VueUploadMultipleImage},
  computed: {
    ...mapGetters(["companyBasicInfo"]),
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