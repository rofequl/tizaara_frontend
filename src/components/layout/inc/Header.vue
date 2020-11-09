<template>
  <div>
    <!-- Registration Modal -->
    <div class="modal fade" id="reg" tabindex="-1" role="dialog" aria-labelledby="reg" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crate an Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="onSubmit" @keydown="formReg.onKeydown($event)">
            <div class="modal-body">
              <fieldset style="background: #f9f9f9;padding: 10px 15px 0;margin-bottom: 15px;">
                <div class="form-group text-center">
                  <div class="form-check form-check-inline" style="margin-right: 8px;vertical-align: top;">
                    <label class="form-check-label"><b>I am a</b></label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="formReg.account_type" id="supplier" value="1">
                    <label class="form-check-label" for="supplier">Supplier</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="formReg.account_type" id="buyer" value="2">
                    <label class="form-check-label" for="buyer">Buyer</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" v-model="formReg.account_type" id="both" value="0">
                    <label class="form-check-label" for="both">Both</label>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <div class="form-row mb-4">
                  <div class="form-group col-md-6">
                    <b-form-input class="form-control" id="first-name"
                                  placeholder="First Name" type="text" v-model="$v.formReg.first_name.$model"
                                  :state="validateState('first_name')"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.formReg.first_name.required">
                      Enter your first name
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.formReg.first_name.maxLength">
                      First name not much then 255 letters
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group col-md-6">
                    <b-form-input class="form-control" id="last-name"
                                  placeholder="Last Name" type="text" v-model="$v.formReg.last_name.$model"
                                  :state="validateState('last_name')"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.formReg.last_name.required">
                      Enter your last name
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.formReg.last_name.maxLength">
                      Last name not much then 255 letters
                    </b-form-invalid-feedback>
                  </div>
                </div>
                <div class="form-group mb-4">
                  <b-form-input class="form-control" id="email-phone"
                                placeholder="Email or Phone Number" type="text"
                                v-model="$v.formReg.emailOrMobile.$model"
                                :class="{ 'is-invalid': formReg.errors.has('emailOrMobile') }"
                                :state="validateState('emailOrMobile')"></b-form-input>
                  <b-form-invalid-feedback v-if="!$v.formReg.emailOrMobile.required">
                    Enter your email address or phone number
                  </b-form-invalid-feedback>
                  <b-form-invalid-feedback v-if="!$v.formReg.emailOrMobile.maxLength">
                    Email or phone not much then 255 letters
                  </b-form-invalid-feedback>
                  <has-error :form="formReg" field="emailOrMobile"></has-error>
                </div>
                <div class="form-row mb-2">
                  <div class="form-group col-md-6 show_hide_password">
                    <b-form-input class="form-control" id="password"
                                  placeholder="Password" type="password" v-model="$v.formReg.password.$model"
                                  :state="validateState('password')"></b-form-input>
                    <password v-model="formReg.password" :strength-meter-only="true"/>
                    <b-form-invalid-feedback v-if="!$v.formReg.password.required">
                      Enter your password
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.formReg.password.minLength">
                      Password must have at least 8 letters.
                    </b-form-invalid-feedback>
                    <b-form-invalid-feedback v-if="!$v.formReg.password.maxLength">
                      Password not much then 16 letters
                    </b-form-invalid-feedback>
                  </div>
                  <div class="form-group col-md-6 show_hide_password">
                    <b-form-input class="form-control" id="confirm-password"
                                  placeholder="Confirm Password" type="password"
                                  v-model="$v.formReg.confirmPassword.$model"
                                  :state="validateState('confirmPassword')"></b-form-input>
                    <b-form-invalid-feedback v-if="!$v.formReg.confirmPassword.sameAsPassword">
                      Passwords must be identical.
                    </b-form-invalid-feedback>
                  </div>
                </div>
                <div class="form-check">
                  <input class="form-check-input" v-model="$v.formReg.termCondition.$model"
                         type="checkbox" value="accept" id="agree"
                         :class="{'is-invalid': termConditionError}">
                  <label class="form-check-label" for="agree">
                    Agree our <a href="" style="color: #f05a28">Terms & Condition</a>.
                  </label><br>
                  <b-form-invalid-feedback v-if="termConditionError">
                    You have to agree Terms & Condition
                  </b-form-invalid-feedback>
                </div>
              </fieldset>
            </div>
            <div class="modal-footer border-top-0">
              <div class="form-row">
                <div class="form-group col-md-7">
                  <vue-recaptcha ref="recaptcha" @expired="formReg.robot = false"
                                 @verify="response => response?formReg.robot = true:''"
                                 sitekey="6LdghNAZAAAAAK3iA9gR8N261fMwCTge0IdadAyO">
                  </vue-recaptcha>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-9" style="height: 42px;align-items: center;justify-content: flex-start;">
                  <a href="" class="facebook-btn">Sign Up with Facebook</a>
                  <div class="g-signin2" :data-onsuccess="onSignIn"></div>
                </div>
                <div class="form-group col-md-3 justify-content-end">
                  <button :disabled="formReg.busy || !formReg.robot" type="submit" class="btn reg-btn">
                    <span v-if="formReg.busy" class="spinner-border spinner-border-sm" role="status"
                          aria-hidden="true"></span>
                    <span v-if="formReg.busy" class="sr-only">Loading...</span>
                    <span v-if="!formReg.busy">Submit</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-row justify-content-center">
              <p><span style="color: #aaa">Already have an account?</span> <a @click="openLoginModal"
                                                                              style="cursor: pointer">Login Now</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Verification Modal -->
    <div class="modal fade" id="verify" tabindex="-1" role="dialog" aria-labelledby="reg" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Verify Email Address</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.prevent="verificationSubmit" @keydown="formVerify.onKeydown($event)">
            <div class="modal-body">
              <fieldset>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-4 text-sm-right col-form-label">Email: </label>
                  <div class="col-sm-8">
                    <input type="text" readonly class="form-control-plaintext" v-model="formVerify.emailOrMobile">
                  </div>
                </div>
                <div class="form-group row">
                  <label for="verificationToken" class="col-sm-4 text-sm-right col-form-label">Verification
                    Code: </label>
                  <div class="col-sm-5">
                    <input id="verificationToken" type="number" class="form-control"
                           v-model="formVerify.verificationToken"
                           :class="{ 'is-invalid': formVerify.errors.has('verificationToken') }" required>
                    <has-error :form="formVerify" field="verificationToken"></has-error>
                    <small id="passwordHelpBlock" class="form-text text-muted">
                      Verification code has been sent to your email, please check.
                    </small>
                  </div>
                  <div class="col-md-3">
                    <button @click="verificationResend" :disabled="!timerBusy" type="button"
                            class="btn btn-sm btn-info w-100">
                      <span v-if="!timerBusy">({{ timer }} s)</span>
                      <span v-if="timerBusy">Resend</span>
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
            <div class="modal-footer border-top-0">
              <div class="form-row">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                  <button :disabled="timerBusy || formVerify.busy" type="submit" class="btn btn-danger">
                    <span v-if="formVerify.busy" class="spinner-border spinner-border-sm" role="status"
                          aria-hidden="true"></span>
                    <span v-if="formVerify.busy" class="sr-only">Loading...</span>
                    <span v-if="!formVerify.busy">Submit</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <div class="modal fade" id="login" tabindex="-1" role="dialog" aria-labelledby="login" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="">Welcome back!</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form @submit.stop.prevent="loginSubmit">
            <div class="modal-body">
              <div role="alert" v-if="errors.length > 0" class="alert fade alert-danger show">
                <div class="alert-text">
                  {{ errors }}
                </div>
              </div>
              <div class="form-group mb-4">
                <b-form-input class="form-control" id="login-email-phone"
                              placeholder="Email or Phone Number" type="text"
                              v-model="$v.form.emailOrMobile.$model"
                              :state="validateState2('emailOrMobile')"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.emailOrMobile.required">
                  Enter your email address or phone number
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.emailOrMobile.maxLength">
                  Email or phone not much then 255 letters
                </b-form-invalid-feedback>
              </div>
              <div class="form-group mb-3">
                <b-form-input class="form-control" id="login-password"
                              placeholder="Password" type="password" v-model="$v.form.password.$model"
                              :state="validateState2('password')"></b-form-input>
                <b-form-invalid-feedback v-if="!$v.form.password.required">
                  Enter your password
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.password.minLength">
                  Password must have at least 8 letters.
                </b-form-invalid-feedback>
                <b-form-invalid-feedback v-if="!$v.form.password.maxLength">
                  Password not much then 16 letters
                </b-form-invalid-feedback>
              </div>
              <div class="form-group">
                <a href="" style="color: #f05a28;text-decoration: underline">Forget Password?</a>
              </div>
            </div>
            <div class="modal-footer border-top-0">
              <div class="form-row">
                <div class="form-group col-md-9" style="height: 42px;align-items: center;justify-content: flex-start;">
                  <a class="facebook-btn cursor-hand">Sign Up with Facebook</a>
                  <a class="google-btn cursor-hand" @click.prevent="loginWithGoogle">Sign Up with Google</a>
                </div>
                <div class="form-group col-md-3 justify-content-end">
                  <button type="submit" class="btn reg-btn">Log In</button>
                </div>
              </div>
            </div>
            <div class="form-row justify-content-center">
              <p><span style="color: #aaa">Don't have account?</span> <a @click="openRegistrationModal"
                                                                         style="cursor: pointer">Register Now</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="header-wrapper">
      <div class="header-top border-bottom">
        <div class="container-fluid">
          <ul class="nav justify-content-end">
            <li class="nav-item active">
              <a class="nav-link" href="#">Help <i class="fa fa-question" style="color: #444;"></i> </a>
            </li>
            <!--                <li class="nav-item">-->
            <!--                    <a href="" class="nav-link"><img src="images/13e178e.png" width="20" alt=""> BN/ENG</a>-->
            <!--                </li>-->
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                 data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user" style="color: #444;"></i> Account
              </a>
              <div class="dropdown-menu dropdown-menu-right p-3" aria-labelledby="navbarDropdown">
                <div class="welcome-part overflow-hidden mb-3" v-if="!userAuth">
                  <a class="dropdown-item d-block pb-3 font-weight-bold" href="#">Welcome To Tizaara</a>
                  <a id="sign-up" class="btn active btn-outline-success btn-sm mr-1"
                     style="background: #f05931;border-color: #f05931;" @click="openRegistrationModal">Join</a>
                  <a id="sign-in" class="btn active btn-outline-success btn-sm"
                     style="background: #f05931;border-color: #f05931;" @click="openLoginModal">Sign In</a>
                </div>
                <div class="media" v-if="userAuth">
                  <img width="64" height="64" :src="user.photo_type == 0? showImage(user.photo):user.photo"
                       class="mr-3 rounded-circle" alt="...">
                  <div class="media-body">
                    <h5 class="mt-0" style="font-size: 16px">Welcome back,<br>
                      <p class="text-ellipsis mb-0" style="max-width: 120px">{{ user.first_name }}
                        {{ user.last_name }}</p></h5>
                    <p class="text-right text-primary p-0 m-0" @click="onLogout"
                       style="font-size: 14px;cursor: pointer">Sign Out</p>
                  </div>
                </div>
                <hr>
                <router-link to="/dashboard" class="link-2">My {{$store.getters.generalList.site_name}}</router-link>
                <a href="" class="link-2">Message RFQ</a>
                <a href="" class="link-2">My Order</a>
                <a href="" class="link-2">My Favourites</a>
                <a href="" class="link-2">My Account</a>
                <a href="" class="link-2">Supplier Membership Plan</a>
                <div class="dropdown-divider"></div>
                <a href="" class="link-2">Submit RFQ</a>
                <a href="" class="link-2"><small>Get multiple quotes within 24 houres!</small></a>
              </div>
            </li>
          </ul>
        </div><!-- container end -->
      </div><!-- header-top end -->

      <div class="logo-search-section">
        <div class="container-fluid">
          <div class="row">
            <div class="col-6 col-md-3 col-lg-3 col-xl-3 col-sm-3">
              <router-link to="/"><img v-lazy="showImage($store.getters.generalList.logo)" width="200px" height="70px" class="logo" alt="Logo"></router-link>
            </div>
            <div class="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
              <div class="input-group cus-input-group">
                <div class="input-group-prepend">
                  <button class="btn dropdown-toggle" type="button" data-toggle="dropdown"
                          aria-haspopup="true" aria-expanded="false">Products
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Products</a>
                    <a class="dropdown-item" href="#">Suppliers</a>
                  </div>
                </div>
                <input type="text" class="form-control" aria-label="Text input with dropdown button">
                <button type="submit" class="btn btn-search"><i class="fa fa-search"></i></button>
              </div>
            </div>
            <div class="col-6 col-md-2 col-sm-2 col-lg-2 col-xl-2">
              <div class="add-to-card-wrapper">
                <a href="" title="Messages"><i class="far fa-comment-dots"></i> <span
                    class="badge badge-success">0</span></a>
                <a href="" title="Orders"><i class="fas fa-gift"></i> <sup class="badge badge-success">10</sup></a>
                <a href="" title="Card"><i class="fas fa-shopping-cart"></i> <sup
                    class="badge badge-success">10</sup></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from "vuex";
import {validationMixin} from "vuelidate";
import {required, maxLength, minLength, sameAs, email} from 'vuelidate/lib/validators';
import Password from 'vue-password-strength-meter';
import VueRecaptcha from 'vue-recaptcha';
import {REGISTER, LOGIN, LOGOUT, VERIFY_AUTH} from "@/core/services/store/auth.module";
import {api_base_url} from "@/core/config/app";
import ApiService from "@/core/services/api.service";

export default {
  mixins: [validationMixin],
  name: "Header",
  data() {
    return {
      formReg: new Form({
        account_type: "1",
        first_name: "",
        last_name: "",
        emailOrMobile: "",
        password: "",
        ip_address: "",
        confirmPassword: "",
        termCondition: false,
        robot: false
      }),
      formVerify: new Form({
        username: "nayemislammjm2",
        emailOrMobile: "mdnayemislam890@gmail.com",
        verificationToken: "",
        type: "email",
      }),
      form: {
        emailOrMobile: "",
        password: ""
      },
      termConditionError: false,
      ip_address: "",
      timer: 0,
      timerBusy: false,
      userAuth: false,
      googleSignInParams: {
        client_id: '541835342636-cpkgm0vn65eev3p1b3o3hngibfsd09ul.apps.googleusercontent.com'
      }
    };
  },
  validations: {
    formReg: {
      account_type: {
        required
      },
      first_name: {
        required,
        maxLength: maxLength(255)
      },
      last_name: {
        required,
        maxLength: maxLength(255)
      },
      emailOrMobile: {
        required,
        email,
        maxLength: maxLength(255)
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16)
      },
      confirmPassword: {
        sameAsPassword: sameAs('password')
      },
      termCondition: {
        sameAsTerm: sameAs(() => true)
      },
    },
    form: {
      emailOrMobile: {
        required,
        email,
        maxLength: maxLength(255)
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(16)
      }
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
    this.loadIp();
  },
  methods: {
    showImage(e) {
      return api_base_url + e;
    },
    validateState(name) {
      const {$dirty, $error} = this.$v.formReg[name];
      return $dirty ? !$error : null;
    },
    validateState2(name) {
      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    handleScroll() {
      if ($(window).scrollTop() > 10) {
        $(".logo-search-section").css("top", "0");
      } else {
        $(".logo-search-section").css("top", "38px");
      }
    },
    loadIp: function () {
      fetch('https://api.ipify.org?format=json')
          .then(x => x.json())
          .then(ip => this.ip_address = ip.ip);
    },
    openRegistrationModal: function () {
      this.resetForm();
      $('#reg').modal('show');
      $(`#login`).modal('hide');
    },
    verificationTimer() {
      let distance = 60;
      let that = this;
      that.timerBusy = false;
      var x = setInterval(function () {
        if (distance < 1) {
          that.timerBusy = true;
          clearInterval(x);
        }
        that.timer = distance;
        distance -= 1;
      }, 1000)
    },
    verificationResend() {
      this.formVerify.post('user/verify-send')
          .then(() => {
            this.verificationTimer();
          })
          .catch(error => {
            let data = error.response;
            if (data.status === 404) {
              $('#verify').modal('hide');
              swal.fire("Failed!", 'There was something wrong.', 'warning')
            }
          })
    },
    verificationSubmit() {
      this.formVerify.post('user/verify')
          .then(({data}) => {
            this.$store.dispatch(REGISTER, data)
                .then(() => {
                  $('#verify').modal('hide');
                  this.$store.dispatch(VERIFY_AUTH);
                })
                .catch((data) => console.log(data));
          })
          .catch(error => {
            let data = error.response;
            if (data.status === 404) {
              $('#verify').modal('hide');
              swal.fire("Failed!", 'There was something wrong.', 'warning')
            }
          })
    },
    openVerificationModal: function () {
      this.verificationTimer();
      $('#reg').modal('hide');
      $('#verify').modal('show');
    },
    openLoginModal: function () {
      this.resetForm();
      $('#reg').modal('hide');
      $(`#login`).modal('show');
    },
    resetForm() {
      this.formReg.reset();
      this.formReg.clear();
      this.termConditionError = false;
      this.form = {
        emailOrMobile: null,
        password: null
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.formReg.$touch();
      this.termConditionError = this.$v.formReg.termCondition.$anyError;
      if (this.$v.formReg.$anyError) {
        return;
      }
      this.formReg.ip_address = this.ip_address;
      this.formReg.post('user/register')
          .then(({data}) => {
            this.formVerify.reset();
            this.formVerify.fill(data);
            this.openVerificationModal();
          })
          .catch(error => {
            let data = error.response;
            if (data.status === 500) {
              $('#reg').modal('hide');
              swal.fire("Failed!", 'There was something wrong.', 'warning')
            }
          })


    },
    loginSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const emailOrMobile = this.$v.form.emailOrMobile.$model;
      const password = this.$v.form.password.$model;

      this.$store.dispatch(LOGOUT);

      this.$store.dispatch(LOGIN, {emailOrMobile, password})
          .then(() => {
            this.$store.dispatch(VERIFY_AUTH);
            $(`#login`).modal('hide');
          })
          .catch((data) => console.log(data));

    },
    onLogout() {
      this.$store.dispatch(LOGOUT)
    },
    loginWithGoogle() {
      $('#reg').modal('hide');
      $('#login').modal('hide');
      this.$gAuth.signIn()
          .then(GoogleUser => {
            let userInfo = {
              loginType: 'google',
              token: GoogleUser.getAuthResponse().id_token
            }

            ApiService.post('user/login-google', userInfo)
                .then(({data}) => {
                  this.$store.dispatch(REGISTER, data)
                      .then(() => {
                        this.$store.dispatch(VERIFY_AUTH);
                      })
                      .catch((data) => console.log(data));
                })
                .catch(error => {
                  let data = error.response;
                  if (data.status === 404) {
                    $('#verify').modal('hide');
                    swal.fire("Failed!", data.response.data.error, 'warning')
                  } else if (data.status === 404) {
                    swal.fire("Something wrong!", data.response.data.error, 'warning')
                  } else {
                    swal.fire("Failed!", 'There was something wrong.', 'warning')
                  }
                })
          })
          .catch(error => {
            console.log('error', error)
          })

    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

  },
  components: {Password, 'vue-recaptcha': VueRecaptcha},
  computed: {
    ...mapGetters([
      "isAuthenticated",
    ]),
    ...mapState({
      errors: state => state.auth.errors
    }),
    user() {
      return this.$store.getters.currentUser;
    },
  },
  watch: {
    user: function () {
      this.userAuth = !!this.isAuthenticated;
    }
  }
}
</script>

<style scoped>

</style>
