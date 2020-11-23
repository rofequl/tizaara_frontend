<template>
  <div class="content pr-md-5">
    <div class="animated fadeIn">
      <!-- Page Header -->
      <div class="row mb-3">
        <div class="col-12 col-sm-6 text-center text-sm-left mb-4 mb-sm-0">
        <span class="text-uppercase page-subtitle">Marketing
        </span>
          <h3 class="page-title">Quotation List</h3>
        </div>
      </div>
      <!-- End Page Header -->

      <div class="card card-body">
        <b-table responsive :items="Object.values(quotationList)"></b-table>
      </div>

    </div>
  </div>
</template>

<script>
import {QUOTATION_LIST} from "@/core/services/store/module/quotation";
import {mapGetters} from "vuex";

export default {
  name: "quotation",
  data() {
    return {
      items: [
        {age: 40, first_name: 'Dickerson', last_name: 'Macdonald'},
        {age: 21, first_name: 'Larsen', last_name: 'Shaw'},
        {age: 89, first_name: 'Geneva', last_name: 'Wilson'},
        {age: 38, first_name: 'Jami', last_name: 'Carney'}
      ]
    }
  },
  created() {
    this.$store.dispatch(QUOTATION_LIST)
  },
  computed: {
    ...mapGetters(["quotationList"]),
  }
}
</script>

<style scoped>

</style>