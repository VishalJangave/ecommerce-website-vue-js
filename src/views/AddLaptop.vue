<template>
  <div>
    <v-app>
      <v-main>
        <v-card width="500" class="mx-auto mt-9"   xs12 sm6 md6 lg6>
          <v-card-title class="display-2">Add_Laptop_Cart</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="Laptop_Company"
                type="text"
                name="laptopCompany"
                v-model="company"
                v-validate="'required'"
                :error-messages="errors.collect('laptopCompany')"
              />
              <v-text-field
                label="laptopModel"
                type="text"
                name="laptopModel"
                v-model="model"
                v-validate="'required'"
        
                :error-messages="errors.collect('laptopModel')"
              />
               <v-text-field
                label="Prize"
                type="number"
                name="Prize"
                v-model="prize"
                v-validate="'required'"
               
                :error-messages="errors.collect('Prize')"
              />
                  <input type="file" @change="onFile">
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
  name: "AddLaptop",
  data() {
    return {
      valid: true,

      company: "",
      model:'',
      prize:''
    };
  },
  methods: {
    ...mapActions(["addlaptop","showdata"]),
     onFile(event)
    {
   this.img =  event.target.files[0];
      console.log("imgg==",this.img.name);

    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        console.log("this is onsubmit mobile");
          const formdata =new FormData();
         formdata.append('img',this.img.name);
        this.addlaptop({
          company: this.company,
         model: this.model,
       prize: this.prize,
       img:this.img.name
        });
        // this.$router.push({ name: "AllProduct" }); 
      }
      this.company ="",
      this.model ="",
      this.prize = "",
      this.img = ""
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