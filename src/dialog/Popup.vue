<template>
  <v-dialog max-width="550px" row>
    <template v-slot:activator="{ on }" class="btn" xs12 sm4 md2 lg2>
      <v-btn text v-on="on" rounded>Forgot PassWord</v-btn>
    </template>
    <v-card v-if="name">
      <v-card-title>
        <!-- <h2>Add New Project</h2> -->
      </v-card-title>
      <v-card-text>
        <div v-for="err in errmsg" :key="err">
          <p>{{ err }}</p>
        </div>
        <v-form class="px-3">
          <v-text-field
            label=" Enter  valid Email"
            v-model="Email"
            type="email"
          ></v-text-field>

          <v-btn
            text
            class="success mx-0 mt-3"
            @click="
              sendotp();
              submit();
            "
            >Submit</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
    <v-card v-if="pass">
      <v-card-title>
        <!-- <h2>Add New Project</h2> -->
      </v-card-title>
      <v-card-text>
        <div v-for="err in errmsg" :key="err">
          <p>{{ err }}</p>
        </div>
        <v-form class="px-3">
          <v-text-field label="Verify Your Otp" v-model="otp"></v-text-field>

          <v-btn text class="success mx-0 mt-3" @click="verifyOtp()"
            >Verify Otp</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
    <v-card v-if="votp">
      <v-card-title>
        <!-- <h2>Add New Project</h2> -->
      </v-card-title>
      <v-card-text>
        <div v-for="err in errmsg" :key="err">
          <p>{{ err }}</p>
        </div>
        <v-form class="px-3">
          <v-text-field
            label="Create New  Password"
            v-model="upassword"
            type="text"
          ></v-text-field>

          <v-btn text class="success mx-0 mt-3" @click="updatepassword()"
            >SavePassword</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
import axios from "axios";
import swal from "sweetalert";  
export default {
  name: "Popup",
  data() {
    return {
      Email: "",
      errmsg: [],
      due: null,
      pass: false,
      name: true,
      upassword: "",
      uemail: "",
      votp: false,
      otp: "",
      dbotp: "",
    };
  },
  methods: {
    async submit() {
      this.errmsg = [];
      try {
        if (this.Email != "") {
          const { err, data } = await axios.post(
            "http://localhost:3003/getemail",
            { email: this.Email }
          );
          if (err) {
            return err;
          }
          console.log("verify email", data);
          if (data == "1") {
            this.errmsg = [];
            this.name = false;
            this.pass = true;
            console.log("verify email", data);
          } else {
            return this.errmsg.push("Invalid Email Id");
          }
        } else {
          return this.errmsg.push(" Please Enter Email Id");
        }
      } catch (err) {
        return err;
      }

      this.$emit("projectadd");
    },
    async sendotp() {
      if (this.Email != "") {
        const genrateotp = await axios.post("http://localhost:3003/getmail", {
          Email: this.Email,
        });
        this.dbotp = genrateotp.data;
      }
    },
    async updatepassword() {
      try {
        if (this.upassword != "") {
          this.pass = false;
          this.votp = false;
          const { error, data } = await axios.post(
            "http://localhost:3003/upass",
            { password: this.upassword },
            {
              headers: {
                upateemail: this.uemail,
              },
            }
          );
          console.log("response", data);
          if (error) {
            return false;
          }
          if (data) {
            swal({
              title: "Thank You!",
              text: "PassWord is successfully Changed",
              icon: "success",
            });
            // location.reload();
          }
        } else {
          this.errmsg.push("Please Enter New Password");
        }
      } catch (err) {
        return err;
      }
    },
    async verifyOtp() {
      try {
        this.errmsg = [];
        if (this.otp != "") {
          const { err, data } = await axios.post(
            "http://localhost:3003/getotp",
            { otp: this.otp, email: this.Email }
          );
          console.log("otp data", data);
          if (err) {
            return false;
          }
          if (data == "1") {
            (this.pass = false), (this.votp = true);
            console.log("verify Successfully");
          } else {
            this.errmsg.push("Invalid Otp");
          }
        } else {
          this.errmsg.push("Please Enter OTP");
        }
      } catch (err) {
        return err;
      }
    },
  },
};
</script>
<style scoped>
p {
  font-size: 20px;
  color: red;
}
.btn {
  width: 20%;
  position: absolute;
  color: white;
  /* right:0px; */

  /* margin-bottom: 30px; */
}
</style>