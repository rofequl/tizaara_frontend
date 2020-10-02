<template>
  <div>
    <div class="footer-top bg-light pt-5 pb-5 border-bottom mt-3">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-5">
            <div class="footer-description">
              <div class="logo">
                <router-link to="/"><img src="@/assets/image/logo.png" alt=""></router-link>
              </div>
              <p class="pt-4 pb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>
              <a href="" title="Facebook"><i class="fab fa-facebook facebook"></i></a>
              <a href="" title="Twitter"><i class="fab fa-twitter twitter"></i></a>
              <a href="" title="Youtube"><i class="fab fa-youtube youtube"></i></a>
              <a href="" title="Instagram"><i class="fab fa-instagram instagram"></i></a>
            </div><!-- .footer-description end -->
          </div><!-- .col-12 end -->
          <div class="col-12 col-md-7">
            <div class="row">
              <div class="col-12 col-md-4">
                <div class="quick-link">
                  <h3 class="font-weight-bold h6 mb-5">Quick Link</h3>
                  <a href="" class="text-dark">Support Center</a>
                  <a href="" class="text-dark">Term & Conditions</a>
                  <a href="" class="text-dark">Shipping</a>
                  <a href="" class="text-dark">Privacy Policy</a>
                  <a href="" class="text-dark">Help</a>
                  <a href="" class="text-dark">Products Return</a>
                  <a href="" class="text-dark">FAQS</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md-4">
                <div class="shopping-online">
                  <h3 class="font-weight-bold h6 mb-5">Shopping Online</h3>
                  <a href="" class="text-dark">Support Center</a>
                  <a href="" class="text-dark">Term & Conditions</a>
                  <a href="" class="text-dark">Shipping</a>
                  <a href="" class="text-dark">Privacy Policy</a>
                  <a href="" class="text-dark">Help</a>
                  <a href="" class="text-dark">Products Return</a>
                  <a href="" class="text-dark">FAQS</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
              <div class="col-12 col-md-4">
                <div class="contact-us">
                  <h3 class="font-weight-bold h6 mb-5">Contact Us</h3>
                  <a href="" class="text-dark"><i class="fa fa-map-marker-alt"></i> Chromium Co , 25 Silicon
                    Road, London
                    D04 89GR</a>
                  <a href="" class="text-dark"><i class="fa fa-mobile-alt"></i> +27 34 66 2455-198</a>
                  <a href="" class="text-dark">Mon-Fri 8:00 to 19:00</a>
                  <a href="" class="text-dark"><i class="fa fa-envelope"></i> example@example.com</a>
                </div><!-- .footer-title end -->
              </div><!-- .col-12 end -->
            </div><!-- .row end -->
          </div>
        </div><!-- .row end -->
      </div><!-- .container end -->
    </div><!-- .footer-top end -->

    <div class="footer-bottom bg-light overflow-hidden">
      <div class="container">
        <p class="text-center mt-2">&copy; 2020
          <router-link to="/" class="text-success">Tizaara</router-link>
          All Rights
          Reserved
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
