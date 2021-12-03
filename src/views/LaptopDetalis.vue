<template>
  <div>
    <v-app>
      <v-main class="Teams">
        <h1 class="subheading gray --text">Laptop_List</h1>

        <v-container class="my-5">
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              lg3
              v-for="laptop in getlaptoplist"
              :key="laptop._id"
            >
              <v-card flat class="text-xs-center- ma-3">
                <v-responsive class="pt-7">
                  <v-avatar size="100" class="gery lighten-2">
                    <img :src="laptop.img" />
                  </v-avatar>
                </v-responsive>
                <v-card-text>
                  <div class="subheading">Name : {{ laptop.company }}</div>
                  <div class="grey--text">Model : {{ laptop.model }}</div>
                  <div class="grey--text">Prize : {{ laptop.prize }}</div>
                </v-card-text>
                <v-card-actions>
                
                  <v-btn
                    text
                    color="grey"
                    class="btn1"
                    @click="addcart(laptop)"
                  >
                    <v-icon small left>mdi-cart</v-icon>
                    <span>Add to Cart</span>
                  </v-btn>
                  <v-btn class="buy" text>Buy</v-btn>
                </v-card-actions>
                  <!-- <div  >quantity
                    <select
                      class="form-control"
                      aria-placeholder="quantity"
                      name="Select option"
                      id="dropdown"
                      v-model="quantity"
                    >
                      <option>Select Option</option>
                      <option
                        v-for="item in items"
                        :value="item"
                        :key="item"
                      >{{item}}</option>
                    </select>
                  </div> -->
              </v-card>
            </v-flex>
              
          </v-layout>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "LaptopDetalis",
  data() {
    return {
      cnt: 1,
      items: [1, 2, 3, 4],
      dropdownvalue: 0,
      quantity: 0,
    };
  },
  methods: {
    ...mapActions(["getlaptopdata", "addmycart"]),
    onChange(e) {
      console.log(e.target.value);
    },
    addcart(mycart) {
      console.log("quantity ==", this.quantity);
      if (localStorage.getItem("jwt") != null) {
        this.addmycart({
          mycartdata: mycart,
          quantity: this.quantity,
          userId: JSON.parse(localStorage.getItem("User"))._id,
          productId: mycart._id,
        });
        // this.$router.push({ name: "MyCart" });
      } else {
        this.$router.push({ name: "LoginPage" });
      }
    },
  },
  computed: {
    ...mapGetters(["getlaptoplist"]),
  },
  mounted() {
    this.getlaptopdata();
  },
};
</script>
<style scoped>
.Teams {
  background: cadetblue;
}
.buy {
  color: tomato;
}
.btn1 {
  margin-right: 10px;
}
.add {
  margin-left: 700px;
}
#dropdown {
 width: 100px;
  margin-bottom: 30px;
  margin-left: auto;
  margin-right: auto;
  border: 2px solid saddlebrown;
  background-color: wheat;

}
.dropdown option {
  background-color:yellow;
text-decoration-color:white;
 
}
</style>

