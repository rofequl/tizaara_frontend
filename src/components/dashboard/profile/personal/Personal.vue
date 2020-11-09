<template>
  <div class="card">
    <div class="card-header">
      {{ mode ? 'Personal Info' : 'Edit your personal info' }}
      <a href="#" v-if="mode && editText" @click.prevent="mode = !mode" class="float-right"><i
          class="fas fa-user-edit"></i>
        Edit</a>
    </div>
    <div v-if="mode" class="card-body">
      <div class="container">
        <div class="row">
          <div class="col-4 p-md-4">
            <img :src="showImage(personalInfo.photo)" alt=""
                 class="img-fluid rounded">
          </div>
          <div class="col-8 p-md-4">
            <blockquote>
              <h5>{{ personalInfo.first_name + ' ' + personalInfo.last_name }}</h5>
              <small><cite title="Source Title">{{ addressFilter(getDivisionNameById(personalInfo.division), 'name') }}
                <i
                    class="fas fa-map-marker-alt"></i></cite></small>
            </blockquote>
            <p>
              <i class="fas fa-envelope"></i> {{ personalInfo.email }} <br>
              <i class="fas fa-phone"></i> {{ personalInfo.mobile }} <br>

            </p>
          </div>
        </div>
      </div>
    </div>
    <PersonalEdit v-if="!mode" @view="mode = !mode"/>
  </div>
</template>

<script>

import PersonalEdit from "@/components/dashboard/profile/personal/PersonalEdit";
import {mapGetters} from "vuex";
import {api_base_url} from "@/core/config/app";

export default {

  name: "Personal",
  data() {
    return {
      mode: true,
      editText: false,
    }
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    addressFilter(data, key) {
      return data ? data[key] : '';
    }
  },
  computed: {
    ...mapGetters(["getDivisionNameById", "countryList"]),
    personalInfo() {
      return this.$store.getters.personalInfo;
    },
  },
  created() {
    if (this.countryList.length > 0) {
      this.editText = true;
    }
  },
  watch: {
    countryList() {
      if (this.countryList.length > 0) {
        this.editText = true;
      }
    }
  },
  components: {
    PersonalEdit
  }


}
</script>

<style scoped>

</style>
