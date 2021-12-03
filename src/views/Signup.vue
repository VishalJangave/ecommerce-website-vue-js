<template>
  <v-app>
    <v-main class="sign">
      <div class="signup-form">
        <form >
          <h2>Sign Up</h2>
          <p>Please fill in this form to create an account!</p>
            <div v-if="geterrormsg == 3">
          <h3 style="color: red">Email id AllReady exits </h3>
        </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <span class="fa fa-user"></span>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="username"
                placeholder="Username"
                required="required"
                v-model="name"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-paper-plane"></i>
                </span>
              </div>
              <input
                type="email"
                class="form-control"
                name="email"
                placeholder="Email Address"
                required="required"
                v-model="emailid"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div lass="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-mobile"></i>
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                name="mobileNumber"
                placeholder="mobileNumber"
                required="required"
                v-model="mobileNumber"
              />
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">
                  <i class="fa fa-lock"></i>
                </span>
              </div>
              <input
               type='text'
                class="form-control"
                   name="password"
                placeholder=" Password"
                required="required"
                v-model="passWord"
              />
            </div>
          </div>
        <div class="btn">
            <button v-on:submit.prevent="onSubmit">Sign Up</button>  
          </div>
        </form>
        <div class="text-center">
          Already have an account?
          <router-link to="/login">Login here</router-link>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
import { mapActions ,mapGetters } from "vuex";
// import swal from 'sweetalert'
export default {
  name: "Signup",
  data() {
    return {
      valid: true,
      id: "",
      name: "",
      emailid: "",
      mobileNumber: "",
      passWord: "",
      showPassword: false,
      errmsg :[]
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    onSubmit() {
     console.log(this.name ,this.passWord,this.emailid,this.mobileNumber)
        console.log("this is onsubmit");
        this.addUser({
           id: this.id,
          name: this.name,
          passWord: this.passWord,
          emailid: this.emailid,
          mobileNumber: this.mobileNumber,
        });
         
        
           
          //  swal({
          //      title: "Thank You!",
          //  text: "Registration successfully",
          //   icon: "success",
          //    });
          //  this.$router.push({ name: "LoginPage" });
        
      
    },
  },
  computed:{
    ...mapGetters(["geterrormsg", "getuserlist"])
  },
};
</script>
<style  scoped>
body {
  color: #fff;
  background-color: #19aa8d;
  font-family: "Roboto", sans-serif;
  margin-top: 0px;
}
.form-control {
  font-size: 15px;
}
.form-control,
.form-control:focus,
.input-group-text {
  border-color: #e1e1e1;
}
.form-control,
.btn {
  border-radius: 3px;
}
.signup-form {
  width: 400px;
  margin: 0 auto;
  padding: 30px 0;
}
.signup-form form {
  color: #999;
  border-radius: 3px;
  margin-bottom: 15px;
  background: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  padding: 30px;
}
.signup-form h2 {
  color: #333;
  font-weight: bold;
  margin-top: 0;
}
.signup-form hr {
  margin: 0 -30px 20px;
}
.signup-form .form-group {
  margin-bottom: 20px;
}
.signup-form label {
  font-weight: normal;
  font-size: 15px;
}
.signup-form .form-control {
  min-height: 38px;
  box-shadow: none !important;
}
.signup-form .input-group-addon {
  max-width: 42px;
  text-align: center;
}
.signup-form .btn,
.signup-form .btn:active {
  font-size: 16px;
  font-weight: bold;
  background: #19aa8d !important;
  border: none;
  min-width: 140px;
}
.signup-form .btn:hover,
.signup-form .btn:focus {
  background: #179b81 !important;
}
.signup-form a {
  color: #fff;
  text-decoration: underline;
}
.signup-form a:hover {
  text-decoration: none;
}
.signup-form form a {
  color: #19aa8d;
  text-decoration: none;
}
.signup-form form a:hover {
  text-decoration: underline;
}
.signup-form .fa {
  font-size: 21px;
}
.signup-form .fa-paper-plane {
  font-size: 18px;
}
.signup-form .fa-check {
  color: #fff;
  left: 17px;
  top: 18px;
  font-size: 7px;
  position: absolute;
}
.sign {
  background-color: lightgreen;
}
.btn {
  width: auto;
  margin-top: 0px;
  padding: 10px;
  height: 40px;
  /* margin-bottom: 30px;
  margin-left: 40px;
  margin-right: auto; */
}
</style>