<template>
   
           <v-dialog
      v-model="dialog"
      persistent
      max-width="300"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
        
          rounded
          v-bind="attrs"
          v-model="dialog"
          v-on="on"
        >
      Continue
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Are u want do submit?
        </v-card-title>
        <v-card-text>Once data submit can not modified</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
             @click="dialog = false"
          >
           NO
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="addcart()"
          >
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</template>
<script>
export default {
    name:'AddDialog',
    data()
    {
        return{
            dialog:false
        }
    },
    methods:{
         addcart(){  
          this.$emit('addtocart')
         this.dialog=false
         }
    }
}
</script>