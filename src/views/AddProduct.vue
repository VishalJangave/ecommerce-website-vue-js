<template>
  <div>
    <v-app>
      <v-main>
        <v-card width="500" class="mx-auto mt-9"   xs12 sm6 md6 lg6>
          <v-card-title class="display-2">Add_Product_Cart</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Product_Company"
                type="text"
                name="pCompanyName"
                v-model="pCompanyName"
                v-validate="'required'"
                :error-messages="errors.collect('pCompanyName')"
              />
              <v-text-field
                label="productname"
                type="text"
                name="pName"
                v-model="pName"
                v-validate="'required'"
        
                :error-messages="errors.collect('pName')"
              />
               <v-text-field
                label="Prize"
                type="number"
                name="Prize"
                v-model="pPrize"
                v-validate="'required'"
               
                :error-messages="errors.collect('Prize')"
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
  name: "AddProduct",
  data() {
    return {
      valid: true,
      pCompanyName: "",
      pName:'',
      pPrize:''
    };
  },
  methods: {
    ...mapActions(["addProduct"]),
    onSubmit() {
      if (this.$refs.form.validate()) {
        console.log("this is onsubmit mobile");
        this.addProduct({
        
          pCompanyName: this.pCompanyName,
         pName: this.pName,
       pPrize: this.pPrize,
        });
        this.$router.push({ name:"Product" });
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
</style>