<template>
  <div>
    <div class="footer-top bg-light pb-5 border-bottom mt-3">
      <div class="container-fluid px-0 px-md-5 py-2" style="background-color: #e0eae8;border: 1px solid #9ebab6">
        <div class="row">
          <div class="col-12 col-md-6">
            <h6 class="mb-0 text-primary px-0 px-md-4">We are here to help you!</h6>
          </div>
          <div class="col-12 col-md-6">
            <p class="mb-0 text-center" >Follow us on:
            <a style="font-size: 18px"><i class="fab fa-facebook text-success"></i></a>
            <a style="font-size: 18px"><i class="fab fa-twitter-square mx-2 text-success"></i></a>
            <a style="font-size: 18px"><i class="fab fa-linkedin text-success"></i></a>
            </p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-12">
            <div class="row">
              <div class="col-12 col-md">
                <div class="quick-link">
                  <router-link to="/about-us" class="text-dark">About Us</router-link>
                  <router-link to="/join-sales" class="text-dark">Join Sales</router-link>
                  <a href="" class="text-dark">Success Stories</a>
                  <a href="" class="text-dark">Press Sections</a>
                  <a href="" class="text-dark">Advertise with Us</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md">
                <div class="quick-link">
                  <router-link to="/help-center" class="text-dark">Help</router-link>
                  <a href="" class="text-dark">Feedback</a>
                  <a href="" class="text-dark">Complaints</a>
                  <a href="" class="text-dark">Customer Care</a>
                  <a href="" class="text-dark">Jobs & Careers</a>
                  <a href="" class="text-dark">Contact US</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md">
                <div class="quick-link">
                  <h3 class="font-weight-bold h6 mb-5">Suppliers Tool Kit</h3>
                  <a href="" class="text-dark">Sell on Tizaara</a>
                  <a href="" class="text-dark">Latest BuyLead</a>
                  <a href="" class="text-dark">Learning Centre</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md">
                <div class="shopping-online">
                  <h3 class="font-weight-bold h6 mb-5">Buyers Tool Kit</h3>
                  <a href="" class="text-dark">Post Your Requirement</a>
                  <a href="" class="text-dark">Products You Buy</a>
                  <a href="" class="text-dark">Search Product & Suppliers</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md">
                <div class="shopping-online">
                  <h3 class="font-weight-bold h6 mb-5">Events</h3>
                  <a href="" class="text-dark">Trade Shows</a>
                  <a href="" class="text-dark">Conferences</a>
                  <a href="" class="text-dark">Events by Country</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
            </div><!-- .row end -->
          </div>
        </div><!-- .row end -->
      </div><!-- .container end -->
    </div><!-- .footer-top end -->

    <div class="footer-bottom bg-light overflow-hidden">
      <div class="container">
        <p class="float-left mt-2">&copy; 2020
          <router-link to="/" class="text-success">Tizaara</router-link>
          All Rights
          Reserved
        </p>
        <p class="float-right mt-2">
          <router-link to="/terms-conditions" class="text-success">Terms of Use - </router-link>
          <router-link to="/privacy-policy" class="text-success">Privacy Policy - </router-link>
          <router-link to="/" class="text-success">Link to Us</router-link>

        </p>
      </div>
    </div><!-- .footer-bottom end -->
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>

</style>
