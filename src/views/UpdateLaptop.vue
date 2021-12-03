<template>
  <div>
    <v-app >
      <v-main>
        <v-card width="500" class="mx-auto mt-9"   xs12 sm6 md6 lg6>
          <v-card-title class="display-2">Update_Laptop_Cart</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
                 <!-- <v-text-field
                label="id"
                type="text"
                name="id"
                v-model="id"
                v-validate="'required'"
                :error-messages="errors.collect('id')"
            
              /> -->
              <v-text-field
                label="Laptop_Company"
                type="text"
                name="laptopCompany"
                v-model="company"
                v-validate="'required'"
                :error-messages="errors.collect('laptopCompany')"
              />
              <v-text-field
                label="Laptop_Model"
                type="text"
                name="laptopModel"
                v-model="model"
                v-validate="'required'"
        
                :error-messages="errors.collect('laptopModel')"
              />
               <v-text-field
                label="prize"
                type="number"
                name="prize"
                v-model="prize"
                v-validate="'required'"
               
                :error-messages="errors.collect('prize')"
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
  name: "UpdateLaptop",
  data() {
    return {
      valid: true,
      id:'',
       laptopCompany: "",
          laptopModel:'',
      prize:''
    };
  },
  methods: {
    ...mapActions(["updateLaptop"]),
      onFile(event)
    {
   this.img =  event.target.files[0];
      console.log("imgg==",this.img.name);

    },
    async onSubmit() {
      if (this.$refs.form.validate()) {

        console.log("this is onsubmit update mobile");
          const formdata =new FormData();
         formdata.append('img',this.img.name);
        await this.updateLaptop({
            _id:this.id,
          laptopCompany: this.laptopCompany,
         laptopModel: this.laptopModel,
       prize: this.prize,
        });
         this.$router.push({ name:"AllProduct" });
      }
    },
  },
   mounted() {
    this.id = this.$route.params.id;
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