<template>
  <div class="home">
    <v-app class="hom">
      <v-main>

    
      <div>
        <nav>
   <v-container class="my-5">
          <v-layout  row>
        <router-link v-for="route in teams" :key="route.path" :to="route.path">
            <v-flex  xs12 sm6 md3 lg8 xl4>
              <v-card flat class="text-xs-center- ma-3" width="272" height="250">
                <v-responsive class="pt-5">
                  <v-avatar size="150" class="gery lighten-2">
                    <img :src="route.avatar" />
                  </v-avatar>
                </v-responsive>
                <v-card-text >
               
                  <h2 id = "GFG">{{ route.name }} </h2>
                
                </v-card-text>
              </v-card>
              </v-flex>
   
  </router-link>
          </v-layout>
        </v-container>

</nav>
      </div>
      <br><br>
      <v-layout xs12 sm6 md4 lg3 class="slide">
        <v-carousel
          cycle
          height="350"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item v-for="(slide, i) in team" :key="i">
            <v-sheet height="100%">
              <v-row class="fill-height" align="center" justify="center">
                <div class="text-h2">
                  <v-img max-height="750" max-width="100%" src="https://m.media-amazon.com/images/I/71FSVYGiPEL._SX3000_.jpg" width="1500" ></v-img>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-layout>
         <v-container class="my-5">
          <v-layout row wrap>
            
            <v-flex
              xs12
              sm6
              md4
              lg3
              v-for="(mobile ,index ) in getmobilelist"
              :key="mobile._id"
            >
            <div v-if="index  <4">
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
                  <v-btn class="buy" text>Buy</v-btn>
                </v-card-actions>
              </v-card>
                 </div>
            </v-flex>
          </v-layout>
        </v-container>
        </v-main>
    </v-app>
  </div>
</template>

<script>
import {mapActions ,mapGetters } from 'vuex'
export default {
  name: "Home",
  data() {
    return {
      team: [
        "images3.jpg",
        "mobile3.jpg",
        "mobile4.jpg",
        "mobile5.jpg",
        "mobile.jpg",
        "mobile2.jpg",
      ],
      teams: [
        { name: "Mobile", avatar: "mobile.jpg", path: "/mobilelist" },
        { name: "Fashion", avatar: "fashion.jpg", path: "/fashion" },
        { name: "Laptop", avatar: "laptop.png", path: "/laptop" },
        { name: "Footware", avatar: "footware.jpg", path: "/footware" },
      ],
      snackbar: false,
      text: 'This Product Add To The myCart',
      vertical: true,
      cnt: 1
    };
  },
   methods: {
    ...mapActions(["getmobiledata", "addmycart"]),
    addcart(mycart ,cnt) {
       this.snackbar = true;
      if (localStorage.getItem("jwt") != null) {
        this.addmycart({
          mycartdata: mycart,
          quantity:cnt++,
           userId:JSON.parse(localStorage.getItem("User"))._id,
           productId : mycart._id
        });
        // this.$router.push({ name: "MyCart" });
      } else {
        this.$router.push({ name: "LoginPage" });
      }
    },
    // numb(prize) {
    //   console.log("pp", prize);
    //   this.totalprize = this.num * prize;
    //   console.log("totalprize==", this.totalprize);
    // },
  },
  computed: {
    ...mapGetters(["getmobilelist"]),
  },
  mounted() {
    this.getmobiledata();
  },
};
</script>
<style scoped>
.table{
  flex-direction: row;
  position: sticky;
  color: #212121;
    box-sizing: border-box;
    margin: 0px;
    padding: 0px;
    /* background-color: turquoise; */
    display: flex;
}
.slide{
  margin-top: 5px;
}
#GFG {
  text-decoration: none;
  /* text-underline-offset: none; */
}
.hom{
  background-color:gold;
}
</style>
