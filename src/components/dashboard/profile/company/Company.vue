<template>
  <div class="card">
    <div class="card-header">
      {{ mode ? 'Company basic information' : 'Edit Company basic information' }}
      <a href="#" v-if="mode" @click.prevent="mode = !mode" class="float-right"><i
          class="fas fa-user-edit"></i>
        Edit</a>
    </div>
    <div v-if="mode && companyBasicInfo" class="card-body">
      <div class="container">
        <b-row class="p-2 border-bottom">
          <b-col cols="12" md="6" class="my-2">
            Company Name: {{ companyBasicInfo.name }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Display Name: {{ companyBasicInfo.display_name }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Establishment Date: {{ companyBasicInfo.establishment_date }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Office Space: {{ companyBasicInfo.office_space }}
          </b-col>
        </b-row>
        <b-row class="p-2">
          <b-col cols="12">
            <h6>Register Address</h6>
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Country: {{ addressFilter(getCountryNameById(companyBasicInfo.country), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Division: {{ addressFilter(getDivisionNameById(companyBasicInfo.division), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            City: {{ addressFilter(getCityNameById(companyBasicInfo.city), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Area: {{ addressFilter(getAreaNameById(companyBasicInfo.area), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Address: {{ companyBasicInfo.address }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Zip code: {{ companyBasicInfo.zip_code }}
          </b-col>
        </b-row>
        <b-row v-if="companyBasicInfo.address_type == 2" class="p-2 border-top">
          <b-col cols="12">
            <h6>Operation Address</h6>
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Country: {{ addressFilter(getCountryNameById(companyBasicInfo.country2), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Division: {{ addressFilter(getDivisionNameById(companyBasicInfo.division2), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            City: {{ addressFilter(getCityNameById(companyBasicInfo.city2), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Area: {{ addressFilter(getAreaNameById(companyBasicInfo.area2), 'name') }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Address: {{ companyBasicInfo.address2 }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Zip code: {{ companyBasicInfo.zip_code2 }}
          </b-col>
        </b-row>
        <b-row class="p-2 border-top">
          <b-col cols="12" md="6" class="my-2">
            Website: {{ companyBasicInfo.website }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Email: {{ companyBasicInfo.email }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Phone: {{ companyBasicInfo.phone }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Cell: {{ companyBasicInfo.cell }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Fax: {{ companyBasicInfo.fax }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Number of Employee: {{ companyBasicInfo.number_of_employee }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Ownership Type: {{ companyBasicInfo.ownership_type }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Revenue: {{ companyBasicInfo.revenue }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Main Product: {{ companyBasicInfo.main_product }}
          </b-col>
          <b-col cols="12" md="6" class="my-2">
            Other Product: {{ companyBasicInfo.other_product }}
          </b-col>
        </b-row>
      </div>
    </div>
    <CompanyEdit v-if="!mode" @view="mode = !mode"/>
  </div>
</template>

<script>
import CompanyEdit from "@/components/dashboard/profile/company/CompanyEdit";
import {mapGetters} from "vuex";

export default {
  name: "Company",
  data() {
    return {
      mode: true,
      editText: false,
    }
  },
  methods: {
    addressFilter(data, key) {
      return data ? data[key] : '';
    }
  },
  components: {
    CompanyEdit
  },
  computed: {
    ...mapGetters(["getDivisionNameById", "getCountryNameById", "getCityNameById", "getAreaNameById"]),
    companyBasicInfo() {
      return this.$store.getters.companyBasicInfo.company;
    },
  },
}
</script>

<style scoped>

</style>