<template>
  <div class="nav">
    <v-app>
      <v-app-bar light prominent height="100px"  app  row>
        <v-app-bar-nav-icon @click="drawer = !drawer"  xs12 sm6 md3 lg8 xl4></v-app-bar-nav-icon>

        <!-- <v-toolbar-title id="title" >FlipKart</v-toolbar-title> -->
        <v-img
          class="mx-auto mt-0 white--text"
          max-height="100"
          max-width="8%"
          light
          src="sumasoft.png"
        ></v-img>

        <v-spacer></v-spacer>
        <v-btn rounded text >
          <router-link to="/">Home</router-link>
        </v-btn>
        <div v-if="!Islogin">

     <v-menu offset-y open-on-hover  >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" rounded @click="onlogin()"> Login </v-btn>
        </template>
        <div class="r1">new customer?   <v-btn rounded text> <router-link to="/signup">Sign Up</router-link></v-btn></div>
        <v-list >
          <v-list-item
            v-for="link in links"
           
    
           :key="link.name"
            router
            :to="link.route"
          >
         <v-list-item-action>
              <v-icon >{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title 
              >{{link.name}}</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
       
        </div>
      <div v-else>

  <list @projectadd ="snackbar = true" />
  
      
</div>
        
        <v-btn rounded text>
          <router-link to="/mycart" >
           <v-badge
        :content="count.data"
        :value="count.data"
        color="red"
        overlap
      >
          <v-icon large>mdi-cart</v-icon>
            </v-badge>
          </router-link>
        </v-btn>
      <!-- {{carts}} -->
        <v-btn icon @click="logout()" >
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        app
        v-model="drawer"
        light
        class="deep-purple accent-4"
        v-if="Islogin==true|| isAdminLogin!=false"
      >
      <div v-if="Islogin">
        <v-list>
          <v-list-item
            v-for="link in linkList"
            :key="link.name"
            router
            :to="link.route"
            @click="drawer = !drawer"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text"
                ><v-btn text rounded>{{ link.name }}</v-btn></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
         </div>
          <div v-else>
        <v-list>
          <v-list-item
            v-for="link in linkList2"
            :key="link.name"
            router
            :to="link.route"
            @click="drawer = !drawer"
          >
            <v-list-item-action>
              <v-icon class="white--text">{{ link.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text"
                ><v-btn text rounded>{{ link.name }}</v-btn></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
         </div>
      </v-navigation-drawer>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import List from "./List.vue";
import { mapGetters } from 'vuex'

export default {
  name: "Header",
  components: {
    List,
  },
  data() {
    return {
      drawer: false,
      group: null,
      snackbar: false,
      count: 0,
      cnt: 0,
      cart: [],
      search: "",
      links: [
        { icon: "mdi-cart", name: "MyCart", route: "/mycart" },
        { icon: "mdi-account", name: "My Profile", route: "/myaccount" },
         {icon :"mdi-cart", name:"Myorders",route:"/orderdetails"},
      ],
      linkList: [
        { icon: "mdi-cart", name: "MyCart", route: "/mycart" },
        {icon :"mdi-cart", name: "Myorders",route:"/orderdetails"},
        { icon: "mdi-account", name: "My Profile", route: "/myaccount" },
      ],
      linkList2 :[
          { icon: "mdi-list", name: "All Product", route: "/productlist" },
          {icon :"mdi-list" ,name : "AorderDetails" ,route :"/aorderdetails"}
      ]
    }
  },
  methods: {
    async logout() {
      try {
        console.log("hiii this is logout");
        await axios.get("http://localhost:3003/logout");
        localStorage.clear();
        location.reload();
        this.$router.push({ name: "Home" });
      } catch (err) {
        console.log("logout err==", err);
      }
    },
    onlogin() {
      this.$router.push({ name: "LoginPage" });
    },
  },
   async mounted() {
    if (localStorage.getItem("jwt") != null) {
      const user = JSON.parse(localStorage.getItem("User"))._id;
      console.log("this is userId", user);
      try {
        this.count = await axios.get("http://localhost:3003/mobile/total", {
          headers: {
            userId: user,
          },
        });
        console.log("cnt==", this.count.data);
      } catch (err) {
        console.log("errr==", err);
      }
    } else {
      this.count = 0;
    }
  
},
computed: {
    ...mapGetters(["getmobilelist"]),
  Islogin()
  {
    return localStorage.getItem("islogin")
  },
   searchBy(){
      return this.getmobilelist.filter((prj) => {
        return prj.company.match(this.search);
      });
    },
    isAdminLogin()
    {
      return localStorage.getItem("isadminLogin")
    }
}
}
</script>
<style scoped>
.nav {
  height: 20px;
}
#title {
  font: italic;
}
.btn {
  font-size: 20px;
}
input {
  color: red;
  border-color: darkblue;
  background: white;
  margin-right: 70px;
}
.r1 {
  margin-top: 20px;
  text-decoration: none;
  justify-content: space-between;
}
</style>
