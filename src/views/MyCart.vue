<template>
  <div>
    <v-app class="Teams">
    <v-main>
      <h1>My_Carts</h1>
      <v-container class="my-5">
        <v-layout row wrap>
          <div></div>
          <v-flex
            xs12
            sm6
            md4
            lg3
            v-for="(cart, index) in getmycart"
            :key="cart._id"
          >

            <p v-for="mycart in getmycart[index].mycartdata" :key="mycart._id">
              <v-card flat class="text-xs-center- ma-3" >
                <v-responsive class="pt-7">
                  <v-avatar size="100" class="gery lighten-2">
                    <img :src="mycart.img" />
                  </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">
                    Name : {{ mycart.company}}
                  </div>
                  <div class="grey--text">
                    Model : {{ mycart.model }}
                  </div>
                  <div class="grey--text">Prize : {{ mycart.prize   }}</div>
                  <div>Quantity:{{cart.quantity}}</div>
                     <div>TotalPrize:{{cart.totalPrize}}</div>
                </v-card-text>  
                <v-card-actions>
                

                 
              

                <RemoveDialog @deleteid="deletecart(cart._id)" />
                  <!-- <MyOrders @showmycart ="showCart(mycart)" />  -->
                  <router-link to="/myorders">
                  
                  <v-btn  class="buy" text @click="myorder(mycart ,cart )">Buy</v-btn>
                  
                  </router-link>
            
                </v-card-actions>
              </v-card>
            </p>
          </v-flex>
        </v-layout>
      </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
// import axios from 'axios'
import { mapActions, mapGetters } from "vuex";

import RemoveDialog from '../dialog/RemoveDialog.vue'
export default {
  name: "MyCart",
  components:{
    RemoveDialog ,
    
  },
  data()
  {
    return {
      search :'',
      Quantity :0,
      count : 0
    }
  },

  methods: {
    ...mapActions(["getcart", "deletecart","addmyorder"]),
    myorder(mycart ,cart)
    {
      console.log("mycartdatta==" ,mycart)
      localStorage.setItem('myorderproductId',mycart._id)
     localStorage.setItem('myoderdata', JSON.stringify(mycart));
       this.addmyorder({
             company:mycart.company,
           model: mycart.model,
         prize: mycart.prize,
         img : mycart.img,
           quantity:this.cnt ,
           userId:JSON.parse(localStorage.getItem("User"))._id,
           productId : mycart._id,
           totalPrize :cart.totalPrize
       })
    },
   
  },

  computed: {
    ...mapGetters(["getmycart"]),
    user(){
      return JSON.parse(localStorage.getItem("User"))._id
    },
      searchBy:()=>{
      return this.getmycart.filter((cart) => {
        return cart.company.match(this.search) ||  cart.model.match(this.search)
      });
    },
     
    inc( cnt)
    {
      return  cnt++
    }
  },
  mounted() {
    this.getcart();
  },
};
</script>
<style scoped>
.display-1 {
  text-transform: uppercase;
  font-size: 15px;
}
.Teams {
  background:lightgreen;
}
.buy {
  color: tomato;
  margin-left: 140px;
  margin-top: 0%;
  width: 10px;
}
.btn {
  margin-right: 50px;
  width: 140px;
  font-size: 11px;
  font-weight: bold;
}
.inc{
font-style:italic;
justify-content: space-between;
}
.payment {
  text-align: center;
  margin-left: 280px;
  margin-bottom: 20px;
  width: 550px;
  height: "280px";
}
.btn1{
  color: red;
  font-size: 100px;
}
.v-btn {
  min-width: 0;
}
</style>