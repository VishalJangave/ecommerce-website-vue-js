<template>
  <div>
    <v-app class="acc">
      <v-main>

     
      <v-layout column align-center xs12 sm6 md4 lg3>
        <v-flex class="mt-5">
          <h1>MyAccount</h1>
          <v-avatar size="100">
            <img src="avatar2.png" />
          </v-avatar>
          <h1 id="username">Name: {{ Isname }}</h1>
          <h3>EmailId : {{ isEmailid }}</h3>
          <h3>MobileNumber : {{ isNumber }}</h3>
        </v-flex>
      </v-layout>
      <v-layout justify-center>
        <v-card flat class="text-xs-center- mt-0" width="700" height="100">
          <v-responsive> </v-responsive>
          <v-flex>
            <v-card-text>
              <div class="subheading">
                <h2>MyOrders</h2>
              </div>
            </v-card-text>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-card-text>
              <div>
                <router-link to="/orderdetails">View All orders</router-link>
              </div>
            </v-card-text>
          </v-flex>
        </v-card>
      </v-layout>
      <v-layout justify-center>
        <v-card flat class="ma-7 mt-0" width="700" height="100">
          <v-responsive> </v-responsive>
          <v-flex>
            <v-card-text>
              <div class="subheading">
                <h2>MyAddress</h2>
              </div>
            </v-card-text>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-card-text>
              <div>
                <router-link to="/myorder">view Address</router-link>
              </div>
            </v-card-text>
          </v-flex>
        </v-card>
      </v-layout>
       </v-main>
    </v-app>
  </div>
</template>
<script>
export default {
  name: "MyAccount",
  computed: {
    Isname() {
      return JSON.parse(localStorage.getItem("User")).name;
    },
    isEmailid() {
      return JSON.parse(localStorage.getItem("User")).emailid;
    },
    isNumber() {
      return JSON.parse(localStorage.getItem("User")).mobileNumber;
    },
  },
};
</script>
<style scoped>
.acc {
  background-color:lightgreen;
}
</style>