<template>
  <div>
    <v-app>
      <v-main class="main">
        <v-container>
          <v-layout justify-center row>
            <v-flex xs12 sm4 md2 lg2 class="first">
              <v-card class="mt-3 mx-auto red" width="500" height="480">
                <v-card-title class="display-3 white--text">
                  Login
                </v-card-title>
                <v-card-text class="black--text">
                  <h4>Looking likes Your Are new hear !!</h4>
                  <v-img
                    class="mx-auto mt-9"
                    max-height="250"
                    max-width="80%"
                    src="sumasoft.png"
                  ></v-img>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm6 md6 lg6 class="second">
              <v-card width="500" class="mt-3 mx-auto ml-0" height="480">
                <!-- <v-card-title class="display-2">Logi</v-card-title> -->
                <v-card-text>
                  <div v-for="err in errmsg" :key="err">
                    <h3>{{ err }}</h3>
                  </div>

                  <v-text-field
                    label="emailid"
                    type="text"
                    name="emailid"
                    :rules="inputrules"
                    v-model="login.emailid"
                    prepend-icon="mdi-account-circle"
                    required
                  />
                  <v-text-field
                    label="PassWord"
                    :type="showPassword ? 'text' : 'passWord'"
                    v-model="login.passWord"
                    name="passWord"
                    prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    v-validate="'required|max:10|min:4'"
                    :counter="10"
                    :error-messages="errors.collect('passWord')"
                  />
                </v-card-text>
                <v-divider></v-divider>
                <!-- <v-flex  xs12 sm6 md6 lg6> -->
                <div class="popup">
                  <popup @projectadd="snackbar = true" />
                </div>
                <!-- </v-flex> -->
                <v-divider></v-divider>
                <v-card-text
                  >By continuing, you agree to Flipkart's Terms of Use and
                  Privacy Policy.</v-card-text
                >
                <v-card-actions>
                  <v-btn color="info" class="btn" @click="logIn()" >Login</v-btn>
                </v-card-actions>
                <v-divider></v-divider>
                <v-card-actions>
                  <p color="blue" style="fontsize: bold">
                    New to Flipkart?
                    <router-link to="/signup">
                      <v-btn class="btn2" rounded text
                        >Register</v-btn
                      ></router-link
                    >
                  </p>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import { mapMutations } from "vuex";
import Popup from "../dialog/Popup.vue";
export default {
  name: "LoginPage",
  components: {
    Popup,
  },
  data() {
    return {
      showPassword: false,
      errmsg: [],
      snackbar: true,
      login: {
        emailid: "",
        passWord: "",
      },
      inputrules: [
        (v) => !!v || "Name is required",
        (v) => v.length >= 4 || "name must be greater than 4",
      ],
    };
  },
  methods: {
    ...mapMutations(["settoken"]),
    async logIn() {
      this.errmsg = [];
      try {
        let response = await axios.post(
          "http://localhost:3003/login",
          this.login
        );
        console.log(response);
        var token = response.data.jwt;
        this.settoken(token);
        localStorage.setItem("islogin", true);
        localStorage.setItem("User", JSON.stringify(response.data.User));
        localStorage.setItem("jwt", token);
        this.$router.push({ name: "Home" });
         location.reload();
      } catch (err) {
        this.errmsg.push(err.response.data);
        console.log("login err==", err.response.data);
        //  this.errmsg.push("username or password incorrect");
      }
    },
  },
};
</script>
<style  scoped>
.title {
  text-transform: uppercase;
}
.btn {
  width: 50%;
  padding: 40px;
  display: block;
  /* margin-bottom: 30px; */
  margin-left: auto;
  margin-right: auto;
}
.btn2 {
  float: right;
}
.main {
  margin-top: 0px;
  background-color: lightgreen;
}
.popup {
  margin-left: auto;
  margin-right: auto;
  width: 10px;
}
.second {
  margin-top: 0px;
  margin-left: 0px;
  margin-bottom: 0px;
  margin-top: 0px;
}
.first {
  margin-right: 0px;
  margin-top: 0px;
  margin-bottom: -12px;
  margin-left: -38px;
}
</style>
