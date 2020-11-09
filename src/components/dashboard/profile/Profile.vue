<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col my-4">
        <div class="row">
          <div class="col-12 col-md-4">
            <div class="card card-body py-4 p-md-4">
              <h4 class="text-center">Manage Profile</h4>
              <hr>
              <a href="#" :class="profileType==='personal'?'active':''" @click.prevent="profileType = 'personal'">Personal
                Info</a>
              <a href="#" :class="profileType==='company'?'active':''" @click.prevent="profileType = 'company'">Company
                Basic</a>
              <a href="#" :class="profileType==='company-more'?'active':''"
                 @click.prevent="profileType = 'company-more'">Company
                More</a>
            </div>
          </div>
          <div class="col-12 col-md-8">
            <Personal v-if="profileType==='personal'"/>
            <Company v-if="profileType==='company'"/>
            <Info v-if="profileType==='company-more'"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Personal from './personal/Personal'
import {COUNTRY_LIST} from "@/core/services/store/module/country";
import {DIVISION_LIST} from "@/core/services/store/module/division";
import {CITY_LIST} from "@/core/services/store/module/city";
import {AREA_LIST} from "@/core/services/store/module/area";
import {PERSONAL_LIST} from "@/core/services/store/module/personal";
import Company from "@/components/dashboard/profile/company/Company";
import {COMPANY_BASIC_LIST} from "@/core/services/store/module/companybasic";
import Info from "@/components/dashboard/profile/company/More/Info";

export default {
  name: "Profile",
  data() {
    return {
      profileType: 'personal'
    }
  },
  components: {Company, Personal, Info},
  created() {
    this.$store.dispatch(PERSONAL_LIST)
    this.$store.dispatch(COUNTRY_LIST)
    this.$store.dispatch(DIVISION_LIST)
    this.$store.dispatch(CITY_LIST)
    this.$store.dispatch(AREA_LIST)
    this.$store.dispatch(COMPANY_BASIC_LIST)
  }
}
</script>

<style scoped>
.active {
  color: #1c7430;
  font-weight: 500;

}
</style>
