<template>
  <div>
    <v-app >
      <v-main>
        <v-card width="500" class="mx-auto mt-9"   xs12 sm6 md6 lg6>
          <v-card-title class="display-2">Update_Mobile_Cart</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid"  lazy-validation >
              <!-- <v-text-field
                label="id"
                type="number"
                name="id"
                v-model="id"
                v-validate="'required'"
                :error-messages="errors.collect('id')"
            
              /> -->
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
  name: "UpdateMobile",
  data() {
    return {
      valid: true,
      id: "",
      company: "",
      model:'',
      prize:''
    };
  },
  methods: {
    ...mapActions(["updateMobile"]),
      onFile(event)
    {
   this.img =  event.target.files[0];
      console.log("imgg==",this.img.name);

    },
    onSubmit() {
      if ( this.$refs.form.validate()) {
        console.log("this is onsubmit mobile");
          const formdata =new FormData();
         formdata.append('img',this.img.name);
        this.updateMobile({
          _id:this.id,
          company: this.company,
         model: this.model,
       prize:  this.prize,
       img : this.img.name
        });
        this.$router.push({ name: "AllProduct" });
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