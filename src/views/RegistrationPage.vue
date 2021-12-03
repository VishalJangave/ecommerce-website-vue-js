<template>
  <div>
    <v-app >
      <!-- <v-btn class="display-1" text  rounded >SignUP</v-btn> -->
      <v-main class="main">
        <v-card width="500" class="mx-auto mt-9">
          <v-card-title class="display-2">SignUP</v-card-title>
            <div v-if="geterrormsg == 3">
          <h3 style="color: red">Email id AllReady exits </h3>
          </div>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="name"
                type="text"
                name="name"
                v-model="name"
                v-validate="'required'"
                :error-messages="errors.collect('name')"
              />
              <v-text-field
                label="emailid"
                type="text"
                name="emailid"
                v-model="emailid"
                v-validate="'required|email'"
        
                :error-messages="errors.collect('emailid')"
              />
               <v-text-field
                label="MobileNumber"
                type="number"
                name="MobileNumber"
                v-model="mobileNumber"
                v-validate="'required'"
                :counter="10"
                :error-messages="errors.collect('MobileNumber')"
              />
              <v-text-field
                label="PassWord"
                :type="showPassword ? 'text' : 'passWord'"
                v-model="passWord"
                name="passWord"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                v-validate="'required|max:10|min:4'"
                :counter="10"
                :error-messages="errors.collect('passWord')"
              />
              <v-btn
                color="info"
                class="btn"
                @click="onSubmit()"
                :disabled="!valid"
                >SUBMIT</v-btn
              >
            </v-form>
          </v-card-text>
         
        </v-card>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "RegistrationPage",
  data() {
    return {
      valid: true,
      id: "",
      name: "",
     emailid: "",
      mobileNumber:'',
      passWord: "",
      showPassword: false,
    };
  },
  methods: {
    ...mapActions(["addUser"]),
    onSubmit() {
      if (this.$refs.form.validate()) {
        console.log("this is onsubmit");
        this.addUser({
          // id: this.id,
          name: this.name,
          passWord: this.passWord,
         emailid: this.emailid,
       mobileNumber:  this.mobileNumber,
        });
        this.$router.push({ name: "LoginPage" });
      }
    },
  },
};
</script>
<style scoped>
.display-2 {
  width: 500px;
  padding: 20px;
  display: block;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: cornflowerblue;
}
.main{
  background-color: lightgreen;
}
</style>