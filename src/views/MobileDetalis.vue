<template>
  <div>
    <v-app>
      <v-main class="Teams">
        <h1 class="subheading gray --text">MOBILE_LIST</h1>
         <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                md4
              ></v-text-field>
        <v-container class="my-5">
          <v-layout row wrap>
            <v-flex
              xs12 sm6  md4 lg3
            v-for="mobile in searchBy " :key="mobile._id" :search="search"
          
            >
              <v-card flat class="text-xs-center- ma-3">
                <v-responsive class="pt-9">
                  <v-avatar size="120" class="gery lighten-2">
                    <img :src="mobile.img" />
                  </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">
                    MobileName : {{ mobile.company }}
                  </div>
                  <div class="grey--text">MobileModel : {{ mobile.model }}</div>
                   <div class="grey--text">MobilePrize : {{ mobile.prize }}</div>
              
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    text
                    color="grey"
                    class="btn1"
                    @click="addcart(mobile,cnt)"
                  >
                    <v-snackbar  top v-model="snackbar" :vertical="vertical">
                      {{ text }}

                      <template v-slot:action="{ attrs }">
                        <v-btn
                          color="indigo"
                          text
                          v-bind="attrs"
                          @click="snackbar = false"
                        >
                          Close
                        </v-btn>
                      </template>
                    </v-snackbar>
                    <v-icon small left>mdi-cart</v-icon>
                    <span>Add to Cart</span>
                  </v-btn>
                  <v-btn class="buy"  text @click="buyproduct(mobile)">Buy</v-btn>
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
import { mapActions ,mapGetters} from "vuex";

export default {
  name: "MobileDetalis",
  data() {
    return {
      msg: 0,
      num: 1,
      totalprize: 1,
       snackbar: false,
      text: 'This Product Add To The myCart',
      vertical: true,
      cnt: 1,
      search:''
    };
  },
  methods: {
    ...mapActions(["getmobiledata", "addmycart","addmyorder"]),
    addcart(mycart ,cnt) {
       this.snackbar = true;
      if (localStorage.getItem("jwt") != null) {
        this.addmycart({
          mycartdata: mycart,
          quantity:cnt  ,
           userId:JSON.parse(localStorage.getItem("User"))._id,
           productId : mycart._id,
           totalPrize :mycart.prize 
        });
        // this.$router.push({ name: "MyCart" });
      } else {
        this.$router.push({ name: "LoginPage" });
      }
    },
  buyproduct(mycart)
    {
      console.log("mycartdatta==" ,mycart)
      if (localStorage.getItem("jwt") != null){
      localStorage.setItem('myorderproductId',mycart._id)
     localStorage.setItem('myoderdata', JSON.stringify(mycart));
       this.addmyorder({
             company:mycart.company,
           model: mycart.model,
         prize: mycart.prize,
         img : mycart.img,
        userId:JSON.parse(localStorage.getItem("User"))._id,
           productId : mycart._id,
       })
       this.$router.push({ name: "MyOrders" });
      }
      else {
        this.$router.push({name:'LoginPage'})
      }
    }
  },
  computed: { 
    ...mapGetters(["getmobilelist"]),
     
      searchBy(){
      return this.getmobilelist.filter((prj) => {
        return prj.company.match(this.search) ||  prj.model.match(this.search)
      });
    },
    
  },
  mounted() {
    this.getmobiledata();
  },
};
</script>
<style scoped>
.Teams {
  background: lightgreen;
}
.buy {
  color: tomato;
  margin-left: 0px;
}
.btn1 {
  margin-right: 20px;
}
.num {
  width: 40px;
  margin-left: 0px;
  display: flex;
}
</style>

