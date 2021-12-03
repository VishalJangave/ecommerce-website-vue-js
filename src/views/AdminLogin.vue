<template>
  <div>
   <v-app >
      <v-main class="main">
           <v-container >
          <v-layout justify-center >
        <v-flex xs12 sm6 md6 lg6 >
       <v-card width="500" class="mt-3  mx-auto ml-0" height="450">
          <v-card-title class="display-2">AdminLogin</v-card-title>
          <v-card-text>
             <div v-for="err in errmsg" :key="err">
              <h3>{{err}}</h3>
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
              name='passWord'
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
               v-validate="'required|max:10|min:4'"
              :counter="10"
              :error-messages="errors.collect('passWord')"
            />
            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</v-card-text>
          <v-card-actions>
            <v-btn color="info" class="btn" @click="logIn()">Login</v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions>
            <p color="blue">
             New to Flipkart? 
              <router-link to="/adminsignup">
                <v-btn class="btn2" rounded text >Register</v-btn></router-link
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
import { mapMutations } from 'vuex';
export default {
  name: "AdminLogin",
  data() {
    return {
      showPassword: false,
      errmsg:[],
      login:{
        emailid: "",
        passWord: "",
      },
      inputrules:[
        v => !!v || 'Name is required',
        v => v.length >=4 ||'name must be greater than 4'
      ],
    };
  },
  methods: {
    ...mapMutations(["setadmintoken"]),
     async logIn() {
      this.errmsg=[];
        try{
          console.log("hii this is adminlogin method")
             let response = await axios.post("http://localhost:3003/admin/login", this.login);
               console.log(response);
   console.log("res data admin == ",response.data.Admin);
          var admintoken = response.data.jwt;
          console.log("AdminTOken==",admintoken);
           this.setadmintoken(admintoken);
          localStorage.setItem("admin",JSON.stringify(response.data.Admin))
          localStorage.setItem("jwtadmin",admintoken);
          localStorage.setItem("isadminLogin",true)
         this.$router.push({ name:"AllProduct" });

      }catch(err)
      {   
        this.errmsg.push(err.response.data)
        console.log("login err==",err.response.data );
        //  this.errmsg.push("username or password incorrect"); 
      }
    },
    
  },
};
</script>
<style  scoped >
.title {
  text-transform: uppercase;

}
.btn {
  width: 350px;
  padding: 40px;
  display: block;

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
</style>
