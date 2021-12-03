<template>
  <div>
    <v-app >
      <v-main>
        <v-card width="500" class="mx-auto mt-9"   xs12 sm6 md6 lg6>
          <v-card-title class="display-2">Add_Mobile_Cart</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid"  enctype ="multipart/form-data">
              <v-text-field
                label="Mobile_Name"
                type="text"
                name="MobileName"
                v-model="company"
                v-validate="'required'"
                :error-messages="errors.collect('MobileName')"
              />
              <v-text-field
                label="Model"
                type="text"
                name="Model"
                v-model="model"
                v-validate="'required'"
        
                :error-messages="errors.collect('Model')"
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
             <!-- <v-file-input
                      v-model="img"
                      accept="image/png, image/jpeg"
                      label="Pick a Picture"
                      outlined
                      dense
                      prepend-icon=""
                      prepend-inner-icon="mdi-camera"
                      hide-details
                    >
                    </v-file-input> -->

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
  name: "Mobile",
  data() {
    return {
      valid: true,
      id: "",
      company: "",
      model:'',
      prize:'',
      img:null
    };
  },
  methods: {
    onFile(event)
    {
   this.img =  event.target.files[0];
      console.log("imgg==",this.img.name);

    },
    ...mapActions(["addMobile"]),
    onSubmit() {
      if(localStorage.getItem('jwtadmin')!=null)
      {

        if (this.$refs.form.validate()) {
          console.log("this is onsubmit mobile");
           const formdata =new FormData();
           formdata.append('img',this.img.name);
          this.addMobile({
          company: this.company,
           model: this.model,
         prize:  this.prize,
         img : this.img.name
          });
          this.$router.push({ name:"MobileDetalis" });
      }
      } else{
        this.$router.push({ name:"AdminLogin" });
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