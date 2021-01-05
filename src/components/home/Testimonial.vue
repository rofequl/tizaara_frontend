<template>
  <div class="weekly-market-wrapper our-brand-wrapper">
    <div class="container-fluid grid-bg-pad">
      <div class="row">
        <h2 class="page-title">OUR HAPPY CUSTOMER</h2>
      </div>
      <div class="row" v-if="getSingleTestimonial">
        <div class="col-sm-5">
          <h4>{{ getSingleTestimonial.name }}</h4>
          <p>{{ getSingleTestimonial.profession }}</p>
          <p>{{ getSingleTestimonial.message }}</p>
        </div>
        <div class="col-sm-7">
          <video-embed ref="youtube" :src="getSingleTestimonial.video"
                       style="height: 350px; border-radius: 15px"></video-embed>
        </div>
      </div>
      <div>
        <h4>More Review</h4>
        <hooper :itemsToShow="4">
          <slide v-for="(testimonial, index) in getTestimonial" :key="index" :index="index">
            <video-embed :ref="'youtube'+index" :src="testimonial.video"
                         class="slide-video"></video-embed>
          </slide>
        </hooper>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {TESTIMONIAL_LIST} from "@/core/services/store/module/testimonial";
import {Hooper, Slide} from 'hooper';
import 'hooper/dist/hooper.css';

export default {
  name: "Testimonial",
  created() {
    this.getTestimonial.length < 1 ? this.$store.dispatch(TESTIMONIAL_LIST) : '';
  },
  computed: {
    ...mapGetters(["getTestimonial", "getSingleTestimonial"])
  },
  components: {Hooper, Slide}
}
</script>

<style scoped>
.slide-video{
  padding: 5px;
  border-radius: 10px;
}
.hooper-slide {
  margin: 10px;
}

</style>